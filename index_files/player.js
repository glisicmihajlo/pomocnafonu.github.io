/*
 * Zajednički player za sve kurseve (plaćene i besplatne).
 *
 * Svaki folder *-player ima isti index.html i svoj script.js:
 *
 *   import { startPlayer } from "/index_files/player.js";
 *   startPlayer({
 *       mode: "paid",                 // "paid" = zaključan (Firebase + VdoCipher), "free" = javan (YouTube)
 *       courseId: "oikt-klk1",        // isto kao u bazi (users/{uid}.kursevi i completedLessons)
 *       title: "OIKT — 1. kolokvijum",
 *       coursePage: "/oikt/",         // stranica kursa (za nekupljen pristup i dugme "Kupi")
 *       modules: [ { moduleTitle, lessons: [ { id, title, vdoId | url | youtube, isLocked } ] } ]
 *       // ili lessons: [ ... ] za kurs bez modula (svaka oblast jedan video)
 *   });
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.appspot.com",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a",
    measurementId: "G-768582D9M9"
};

export function startPlayer(cfg) {
    const isPaid = cfg.mode !== "free";
    const COURSE_ID = cfg.courseId;
    const PROGRESS_KEY = `progress_${COURSE_ID}`;
    const LAST_KEY = `lastLesson_${COURSE_ID}`;

    /* ---------- podaci ---------- */

    const isFlat = !cfg.modules;
    const modules = isFlat ? [{ moduleTitle: cfg.title, lessons: cfg.lessons || [] }] : cfg.modules;
    const flat = modules.flatMap((m, mIndex) => m.lessons.map(l => ({ ...l, moduleTitle: m.moduleTitle, mIndex })));
    flat.forEach((l, i) => { l.idx = i; });

    let completed = [];
    let current = -1;
    let loadToken = 0;
    let firebase = null;

    /* ---------- DOM ---------- */

    const $ = id => document.getElementById(id);
    const nav = $("course-list");
    const player = $("vdo-player");
    const loader = $("video-loader");
    const empty = $("video-empty");
    const locked = $("video-locked");
    const titleEl = $("lesson-title");
    const moduleTag = $("module-tag");
    const progressFill = $("progress-fill");
    const percentText = $("percent-text");
    const progressSub = $("progress-sub");
    const sidebar = $("sidebar");
    const btnComplete = $("btn-complete");
    const btnPrev = $("btn-prev");
    const btnNext = $("btn-next");
    const gate = $("auth-gate");
    const gateText = $("auth-gate-text");
    const toastEl = $("toast");

    document.title = `${cfg.title} — Pomoć na fonu`;
    if (!isPaid) gate.hidden = true;

    /* ---------- pomoćne ---------- */

    let toastTimer;
    function toast(msg, type = "info") {
        toastEl.textContent = msg;
        toastEl.className = `toast toast-${type}`;
        toastEl.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3200);
    }

    function deny(message, redirectTo) {
        gateText.textContent = message;
        gate.classList.add("denied");
        gate.hidden = false;
        setTimeout(() => { window.location.href = redirectTo; }, 2500);
    }

    function embedUrl(url) {
        if (!url) return "";
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtube.com") && u.pathname === "/watch") return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
            if (u.hostname === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
        } catch { /* nije validan URL — vrati kako jeste */ }
        return url;
    }

    const hasVideo = l => Boolean(l.vdoId || l.url || l.youtube);

    /* ---------- napredak ---------- */

    function loadLocalProgress() {
        try { completed = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || []; }
        catch { completed = []; }
    }

    async function saveProgress() {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
        if (!firebase || !firebase.auth.currentUser) return;
        const userRef = doc(firebase.db, "users", firebase.auth.currentUser.uid);
        try {
            await updateDoc(userRef, { [`completedLessons.${COURSE_ID}`]: completed });
        } catch {
            await setDoc(userRef, { completedLessons: { [COURSE_ID]: completed } }, { merge: true });
        }
    }

    /* ---------- lista lekcija ---------- */

    function lessonButton(l) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lesson-btn";
        btn.id = `lesson-${l.idx}`;
        if (l.isLocked) btn.classList.add("locked");
        else if (!hasVideo(l)) btn.classList.add("soon");

        const icon = document.createElement("i");
        icon.className = "status-icon far fa-circle";
        const name = document.createElement("span");
        name.className = "lesson-name";
        name.textContent = l.title;
        btn.append(icon, name);

        if (l.isLocked) btn.insertAdjacentHTML("beforeend", '<i class="fas fa-lock lock-icon"></i>');
        else if (!hasVideo(l)) btn.insertAdjacentHTML("beforeend", '<span class="soon-tag">uskoro</span>');

        btn.onclick = () => select(l.idx);
        return btn;
    }

    function render() {
        nav.innerHTML = "";
        if (isFlat) {
            flat.forEach(l => nav.appendChild(lessonButton(l)));
        } else {
            modules.forEach((m, mIndex) => {
                const card = document.createElement("div");
                card.className = "module-card";
                card.id = `module-${mIndex}`;

                const head = document.createElement("button");
                head.type = "button";
                head.className = "module-head";
                head.innerHTML = '<span class="module-check"><i class="fas fa-check"></i></span><span class="module-title"></span><span class="module-count"></span><i class="fas fa-chevron-down chevron"></i>';
                head.querySelector(".module-title").textContent = m.moduleTitle;
                head.onclick = () => card.classList.toggle("open");

                const list = document.createElement("div");
                list.className = "lesson-list";
                flat.filter(l => l.mIndex === mIndex).forEach(l => list.appendChild(lessonButton(l)));

                card.append(head, list);
                nav.appendChild(card);
            });
        }
        refresh();
    }

    function refresh() {
        flat.forEach(l => {
            const btn = $(`lesson-${l.idx}`);
            if (!btn) return;
            const done = completed.includes(l.id);
            btn.classList.toggle("completed", done);
            btn.classList.toggle("active-lesson", l.idx === current);
            btn.querySelector(".status-icon").className = "status-icon " +
                (done ? "fas fa-check-circle" : l.idx === current ? "fas fa-play-circle" : "far fa-circle");
        });

        if (!isFlat) {
            modules.forEach((m, mIndex) => {
                const card = $(`module-${mIndex}`);
                const done = m.lessons.filter(l => completed.includes(l.id)).length;
                card.querySelector(".module-count").textContent = `${done}/${m.lessons.length}`;
                card.classList.toggle("module-done", m.lessons.length > 0 && done === m.lessons.length);
            });
        }

        const trackable = flat.filter(l => !l.isLocked);
        const done = trackable.filter(l => completed.includes(l.id)).length;
        const pct = trackable.length ? Math.round(done / trackable.length * 100) : 0;
        progressFill.style.width = pct + "%";
        percentText.textContent = pct + "%";
        progressSub.textContent = `${done} / ${trackable.length} lekcija završeno`;

        btnPrev.disabled = current <= 0;
        btnNext.disabled = current >= flat.length - 1;
        const l = flat[current];
        const isDone = l && completed.includes(l.id);
        btnComplete.disabled = !l || l.isLocked;
        btnComplete.classList.toggle("is-done", Boolean(isDone));
        btnComplete.innerHTML = isDone
            ? '<i class="fas fa-rotate-left"></i> <span>Poništi završetak</span>'
            : '<i class="fas fa-check"></i> <span>Završi lekciju</span>';
    }

    /* ---------- izbor lekcije ---------- */

    async function select(idx) {
        const l = flat[idx];
        if (!l) return;
        current = idx;
        localStorage.setItem(LAST_KEY, l.id);

        titleEl.textContent = l.title;
        moduleTag.textContent = isFlat ? cfg.title : l.moduleTitle;

        if (!isFlat) $(`module-${l.mIndex}`).classList.add("open");
        refresh();
        $(`lesson-${idx}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        if (window.innerWidth <= 992) sidebar.classList.remove("open");

        const token = ++loadToken;
        player.src = "";
        loader.hidden = true;
        empty.hidden = true;
        locked.hidden = true;

        if (l.isLocked) { locked.hidden = false; return; }

        const direct = l.youtube || l.url;
        if (direct) { player.src = embedUrl(direct); return; }

        if (!l.vdoId || !isPaid) { empty.hidden = false; return; }

        loader.hidden = false;
        try {
            const result = await firebase.getVideoAuth({ videoId: l.vdoId });
            if (token !== loadToken) return;
            const { otp, playbackInfo } = result.data;
            player.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
        } catch (err) {
            console.error("Greška kod backenda:", err);
            if (token === loadToken) toast("Došlo je do greške pri učitavanju videa. Pokušaj ponovo.", "error");
        } finally {
            if (token === loadToken) loader.hidden = true;
        }
    }

    function toggleCurrent() {
        const l = flat[current];
        if (!l || l.isLocked) return;
        const i = completed.indexOf(l.id);
        if (i > -1) completed.splice(i, 1);
        else completed.push(l.id);
        saveProgress();
        refresh();
    }

    function startAt() {
        const lastId = localStorage.getItem(LAST_KEY);
        let idx = flat.findIndex(l => l.id === lastId && !l.isLocked);
        if (idx === -1) idx = flat.findIndex(l => !l.isLocked && hasVideo(l) && !completed.includes(l.id));
        if (idx === -1) idx = flat.findIndex(l => !l.isLocked);
        select(idx === -1 ? 0 : idx);
    }

    /* ---------- dugmad, prečice ---------- */

    btnComplete.onclick = toggleCurrent;
    btnPrev.onclick = () => select(current - 1);
    btnNext.onclick = () => select(current + 1);
    $("menu-toggle").onclick = () => sidebar.classList.toggle("open");

    document.addEventListener("keydown", e => {
        if (!gate.hidden || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
        if (e.key === "ArrowLeft" && current > 0) select(current - 1);
        else if (e.key === "ArrowRight" && current < flat.length - 1) select(current + 1);
        else if (e.key.toLowerCase() === "c") toggleCurrent();
    });

    /* ---------- pokretanje ---------- */

    if (!isPaid) {
        loadLocalProgress();
        render();
        startAt();
        return;
    }

    const app = initializeApp(firebaseConfig);
    firebase = {
        auth: getAuth(app),
        db: getFirestore(app),
        getVideoAuth: httpsCallable(getFunctions(app), "getVideoAuth")
    };

    function generateSessionToken() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    // Najviše 2 uređaja po nalogu. Vraća snapshot korisnika, ili null ako pristup nije dozvoljen.
    async function setupMaxTwoDevices(user) {
        const userRef = doc(firebase.db, "users", user.uid);
        let sessionToken = localStorage.getItem("sessionToken");
        if (!sessionToken) {
            sessionToken = generateSessionToken();
            localStorage.setItem("sessionToken", sessionToken);
        }

        const snap = await getDoc(userRef);
        const sessionTokens = (snap.exists() && snap.data().sessionTokens) ? snap.data().sessionTokens : [];

        if (!sessionTokens.includes(sessionToken)) {
            if (sessionTokens.length >= 2) {
                await signOut(firebase.auth);
                deny("Dostignut je maksimalan broj uređaja (2).", "/login");
                return null;
            }
            sessionTokens.push(sessionToken);
            await setDoc(userRef, { sessionTokens }, { merge: true });
        }

        onSnapshot(userRef, docSnap => {
            const data = docSnap.data();
            if (data && (!data.sessionTokens || !data.sessionTokens.includes(sessionToken))) {
                player.src = "";
                signOut(firebase.auth);
                deny("Pristup ovom uređaju je uklonjen.", "/login");
            }
        });

        return snap;
    }

    onAuthStateChanged(firebase.auth, async user => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        try {
            const snap = await setupMaxTwoDevices(user);
            if (!snap) return;

            const kursevi = (snap.exists() && snap.data().kursevi) ? snap.data().kursevi : [];
            if (!kursevi.includes(COURSE_ID)) {
                deny("Nemaš pristup ovom kursu. Preusmeravamo te na stranicu kursa...", cfg.coursePage);
                return;
            }

            $("user-email").textContent = user.email;
            $("user-chip").hidden = false;

            const all = snap.exists() ? snap.data().completedLessons : null;
            // Isto kao ranije: ako u bazi postoji napredak, on važi; inače lokalni
            if (all) completed = Array.isArray(all[COURSE_ID]) ? all[COURSE_ID] : [];
            else loadLocalProgress();

            render();
            gate.hidden = true;
            startAt();
        } catch (err) {
            console.error(err);
            deny("Greška pri proveri pristupa. Pokušaj ponovo.", "/login");
        }
    });
}
