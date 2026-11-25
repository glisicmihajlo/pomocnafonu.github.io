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
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { guardDevice, MAX_DEVICES } from "/index_files/devices.js";
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

/* ------------------------------------------------------------------ */
/*  Plejer za telefon / tablet                                         */
/* ------------------------------------------------------------------ */
// Na računaru VdoCipher sam ucrtava mejl u video (annotate u functions/index.js).
// Na telefonu to ne radi, a iPhone pušta video u svom ugrađenom plejeru preko
// celog ekrana, gde se ništa sa naše stranice ne vidi. Zato na telefonu:
//   - VdoCipher-ove kontrole su ugašene (controls=off), a naše kontrole
//     upravljaju videom preko VdoCipher Player API-ja;
//   - preko iframe-a je sloj koji hvata dodire, pa iPhone nikad ne otvara
//     svoj plejer;
//   - mejl je HTML sloj preko videa koji se pomera na svakih 5 sekundi;
//   - "ceo ekran" stavlja ceo okvir (video + kontrole + mejl) preko ekrana.

const IS_TOUCH = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const WM_MOVE_MS = 5000;
const CHROME_HIDE_MS = 3000;
const SEEK_STEP = 10;
const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.75];

// iOS Safari sam pretvara mejl u link, što menja watermark
if (IS_TOUCH && !document.querySelector('meta[name="format-detection"]')) {
    const meta = document.createElement("meta");
    meta.name = "format-detection";
    meta.content = "telephone=no, date=no, email=no, address=no";
    document.head.append(meta);
}

let vdoApi = null;
function loadVdoApi() {
    if (!vdoApi) {
        vdoApi = new Promise((resolve, reject) => {
            if (window.VdoPlayer) return resolve(window.VdoPlayer);
            const s = document.createElement("script");
            s.src = "https://player.vdocipher.com/v2/api.js";
            s.async = true;
            s.onload = () => window.VdoPlayer ? resolve(window.VdoPlayer) : reject(new Error("VdoPlayer nije učitan"));
            s.onerror = () => reject(new Error("VdoCipher API nije učitan"));
            document.head.append(s);
        }).catch(err => { vdoApi = null; throw err; });
    }
    return vdoApi;
}

function formatTime(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

function mobilePlayer(frame, iframe) {
    // Bez fullscreen dozvole iframe ne može sam da ode preko celog ekrana
    iframe.setAttribute("allow", "autoplay; encrypted-media");
    ["allowfullscreen", "webkitallowfullscreen", "mozallowfullscreen"].forEach(a => iframe.removeAttribute(a));

    const ui = document.createElement("div");
    ui.className = "vc";
    ui.hidden = true;
    ui.innerHTML = `
        <div class="vc-gesture"></div>
        <div class="vc-chrome">
            <div class="vc-shade"></div>
            <div class="vc-center">
                <button type="button" class="vc-btn vc-skip" data-act="back" aria-label="${SEEK_STEP} sekundi nazad"><i class="fas fa-rotate-left"></i><span>${SEEK_STEP}</span></button>
                <button type="button" class="vc-btn vc-play" data-act="play" aria-label="Pusti"><i class="fas fa-play"></i></button>
                <button type="button" class="vc-btn vc-skip" data-act="fwd" aria-label="${SEEK_STEP} sekundi napred"><i class="fas fa-rotate-right"></i><span>${SEEK_STEP}</span></button>
            </div>
            <div class="vc-bottom">
                <input type="range" class="vc-seek" min="0" max="0" step="0.1" value="0" aria-label="Pozicija u videu">
                <div class="vc-row">
                    <span class="vc-time">0:00 / 0:00</span>
                    <button type="button" class="vc-btn vc-speed" data-act="speed" aria-label="Brzina">1x</button>
                    <button type="button" class="vc-btn" data-act="fs" aria-label="Ceo ekran"><i class="fas fa-expand"></i></button>
                </div>
            </div>
        </div>
        <div class="vc-hud" aria-hidden="true"></div>`;

    const wm = document.createElement("div");
    wm.className = "video-watermark";
    wm.setAttribute("aria-hidden", "true");
    wm.setAttribute("translate", "no");
    wm.hidden = true;

    frame.append(ui, wm);

    const q = sel => ui.querySelector(sel);
    const gesture = q(".vc-gesture");
    const playBtn = q(".vc-play");
    const seek = q(".vc-seek");
    const timeEl = q(".vc-time");
    const speedBtn = q(".vc-speed");
    const fsBtn = q('[data-act="fs"]');
    const hud = q(".vc-hud");

    let vp = null;          // VdoCipher player instanca
    let gen = 0;            // menja se pri svakom novom videu
    let email = "";
    let playing = false;
    let ended = false;
    let seeking = false;
    let duration = 0;
    let speedIdx = 0;
    let moveTimer = null;
    let hideTimer = null;
    let hudTimer = null;

    /* ---------- watermark ---------- */

    function move() {
        wm.classList.add("is-moving");
        setTimeout(() => {
            const maxX = Math.max(0, frame.clientWidth - wm.offsetWidth - 12);
            const maxY = Math.max(0, frame.clientHeight - wm.offsetHeight - 12);
            wm.style.left = `${6 + Math.random() * maxX}px`;
            wm.style.top = `${6 + Math.random() * maxY}px`;
            wm.classList.remove("is-moving");
        }, 400);
    }

    // Ako neko ukloni, sakrije ili promeni sloj, vrati ga
    function guard() {
        if (!email) return;
        if (wm.parentNode !== frame) frame.append(wm);
        if (wm.textContent !== email) wm.textContent = email;
        if (wm.hidden) wm.hidden = false;
    }
    new MutationObserver(guard).observe(frame, { childList: true });
    new MutationObserver(guard).observe(wm, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class"] });

    /* ---------- prikaz kontrola ---------- */

    function showChrome() {
        ui.classList.remove("is-idle");
        clearTimeout(hideTimer);
        if (playing) hideTimer = setTimeout(() => ui.classList.add("is-idle"), CHROME_HIDE_MS);
    }

    function flash(text) {
        hud.textContent = text;
        hud.classList.add("is-on");
        clearTimeout(hudTimer);
        hudTimer = setTimeout(() => hud.classList.remove("is-on"), 700);
    }

    function setPlaying(on) {
        playing = on;
        const icon = on ? "fa-pause" : (ended ? "fa-rotate-right" : "fa-play");
        playBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        playBtn.setAttribute("aria-label", on ? "Pauza" : "Pusti");
        showChrome();
    }

    function renderTime(t) {
        const pct = duration ? Math.min(100, (t / duration) * 100) : 0;
        seek.style.setProperty("--p", `${pct}%`);
        timeEl.textContent = `${formatTime(t)} / ${formatTime(duration)}`;
    }

    /* ---------- upravljanje videom ---------- */

    const video = () => vp && vp.video;

    function togglePlay() {
        const v = video();
        if (!v) return;
        if (playing) v.pause();
        else {
            if (ended) v.currentTime = 0;
            v.play();
        }
    }

    function seekBy(delta) {
        const v = video();
        if (!v || !duration) return;
        const t = Math.min(duration, Math.max(0, (Number(v.currentTime) || 0) + delta));
        v.currentTime = t;
        seek.value = t;
        renderTime(t);
        flash(delta > 0 ? `+${delta} s` : `−${-delta} s`);
    }

    function cycleSpeed() {
        const v = video();
        if (!v) return;
        speedIdx = (speedIdx + 1) % SPEEDS.length;
        v.playbackRate = SPEEDS[speedIdx];
        speedBtn.textContent = `${SPEEDS[speedIdx]}x`;
        flash(`${SPEEDS[speedIdx]}x`);
    }

    function bind(inst) {
        const v = inst.video;
        const mine = fn => (...args) => { if (inst === vp) fn(...args); };
        const readDuration = mine(() => {
            const d = Number(v.duration);
            if (d && isFinite(d)) {
                duration = d;
                seek.max = d;
                renderTime(Number(v.currentTime) || 0);
            }
        });
        v.addEventListener("loadedmetadata", readDuration);
        v.addEventListener("durationchange", readDuration);
        v.addEventListener("play", mine(() => { ended = false; setPlaying(true); }));
        v.addEventListener("playing", mine(() => { ui.classList.remove("is-buffering"); setPlaying(true); }));
        v.addEventListener("pause", mine(() => setPlaying(false)));
        v.addEventListener("ended", mine(() => { ended = true; setPlaying(false); }));
        v.addEventListener("waiting", mine(() => ui.classList.add("is-buffering")));
        v.addEventListener("timeupdate", mine(() => {
            if (!duration) readDuration();
            if (seeking) return;
            const t = Number(v.currentTime) || 0;
            seek.value = t;
            renderTime(t);
        }));
    }

    /* ---------- dodiri ---------- */

    // Jedan dodir: pokaži/sakrij kontrole. Dupli dodir levo/desno: ±10 s.
    let lastTap = 0;
    let lastSide = 0;
    let tapTimer = null;
    gesture.addEventListener("click", e => {
        const rect = gesture.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const side = x < 0.35 ? -1 : x > 0.65 ? 1 : 0;
        const now = Date.now();
        if (now - lastTap < 300 && side && side === lastSide) {
            clearTimeout(tapTimer);
            seekBy(side * SEEK_STEP);
            showChrome();
            lastTap = 0;
            return;
        }
        lastTap = now;
        lastSide = side;
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => {
            if (ui.classList.contains("is-idle")) showChrome();
            else if (playing) { clearTimeout(hideTimer); ui.classList.add("is-idle"); }
            else showChrome();
        }, side ? 300 : 0);
    });

    ui.addEventListener("click", e => {
        const btn = e.target.closest("[data-act]");
        if (!btn) return;
        const act = btn.dataset.act;
        if (act === "play") togglePlay();
        else if (act === "back") seekBy(-SEEK_STEP);
        else if (act === "fwd") seekBy(SEEK_STEP);
        else if (act === "speed") cycleSpeed();
        else if (act === "fs") toggleFull();
        showChrome();
    });

    seek.addEventListener("input", () => {
        seeking = true;
        clearTimeout(hideTimer);
        renderTime(Number(seek.value));
    });
    seek.addEventListener("change", () => {
        const v = video();
        if (v) v.currentTime = Number(seek.value);
        seeking = false;
        showChrome();
    });

    /* ---------- ceo ekran ---------- */

    const isFull = () => frame.classList.contains("is-fullscreen");

    function setFull(on) {
        frame.classList.toggle("is-fullscreen", on);
        document.documentElement.classList.toggle("video-fs-lock", on);
        fsBtn.innerHTML = on ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
        fsBtn.setAttribute("aria-label", on ? "Izađi iz celog ekrana" : "Ceo ekran");
        move();
    }

    async function toggleFull() {
        if (isFull()) {
            if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
            setFull(false);
            return;
        }
        setFull(true);
        // Android: pravi fullscreen + landscape. iPhone ne podržava fullscreen
        // za elemente, tamo okvir pokriva celu stranicu (okreni telefon).
        if (frame.requestFullscreen) {
            try {
                await frame.requestFullscreen({ navigationUI: "hide" });
                await screen.orientation?.lock?.("landscape");
            } catch { /* nije podržano */ }
        }
    }

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && isFull()) setFull(false);
    });
    window.addEventListener("resize", () => { if (email) move(); });

    /* ---------- javno ---------- */

    return {
        async load(src, userEmail) {
            const myGen = ++gen;
            email = userEmail || "";
            playing = false;
            ended = false;
            seeking = false;
            duration = 0;
            speedIdx = 0;
            seek.max = 0;
            seek.value = 0;
            speedBtn.textContent = "1x";
            renderTime(0);
            setPlaying(false);
            ui.classList.remove("is-idle", "is-buffering");
            ui.hidden = false;

            wm.textContent = email;
            wm.hidden = !email;
            move();
            clearInterval(moveTimer);
            moveTimer = setInterval(move, WM_MOVE_MS);

            iframe.src = `${src}&controls=off`;
            try {
                const VdoPlayer = await loadVdoApi();
                if (myGen !== gen) return;
                const inst = VdoPlayer.getInstance(iframe);
                if (inst !== vp) { vp = inst; bind(inst); }
            } catch (err) {
                // Bez API-ja naše kontrole ne rade, pa vraćamo VdoCipher-ove
                console.error(err);
                if (myGen !== gen) return;
                ui.hidden = true;
                iframe.src = src;
            }
        },
        hide() {
            gen++;
            email = "";
            playing = false;
            clearInterval(moveTimer);
            clearTimeout(hideTimer);
            ui.hidden = true;
            wm.hidden = true;
            if (isFull()) toggleFull();
        }
    };
}

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

    const mobile = isPaid && IS_TOUCH ? mobilePlayer($("video-container"), player) : null;

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
        mobile?.hide();
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
            // primaryColor boji VdoCipher-ove kontrole (računar) u boju sajta (--primary u player.css)
            const src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&primaryColor=ffb020`;
            if (mobile) mobile.load(src, firebase.auth.currentUser?.email);
            else player.src = src;
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

    // Najviše 2 uređaja po nalogu. Vraća snapshot korisnika, ili null ako pristup nije dozvoljen.
    function setupMaxTwoDevices(user) {
        return guardDevice({
            auth: firebase.auth,
            db: firebase.db,
            user,
            onRemoved: () => {
                player.src = "";
                deny("Pristup ovom uređaju je uklonjen. Prijavi se ponovo.", "/login");
            },
            onLimit: () => deny(`Dostignut je maksimalan broj uređaja (${MAX_DEVICES}).`, "/login")
        });
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
