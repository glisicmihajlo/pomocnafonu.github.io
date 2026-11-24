import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { guardDevice, MAX_DEVICES } from "/index_files/devices.js";

const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.appspot.com",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a",
    measurementId: "G-768582D9M9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const getVideoAuth = httpsCallable(functions, 'getVideoAuth');

const CURRENT_COURSE_ID = "prijemni";
const NO_ACCESS_REDIRECT = "/prijemni";
const LAST_LESSON_KEY = `lastLesson_${CURRENT_COURSE_ID}`;

/*
 * Svaka oblast je jedan video:
 *   vdoId:   "..."  -> VdoCipher video (zaštićen, sa vodenim žigom)
 *   youtube: "..."  -> YouTube embed link
 * Ako nema ni jedno ni drugo, prikazuje se poruka "Video uskoro stiže".
 */
const lessons = [
    { id: "p1",  title: "1. Algebarski izrazi", vdoId: "97b214263c144a23839a3394e91840c4" },
    { id: "p2",  title: "2. Brojevni izrazi", vdoId: "a8396bd22ab34a3ba36117d456175c53" },
    { id: "p3",  title: "3. Proporcionalnost", vdoId: "ea95797f9c704e588620b88fdcc3ef50" },
    { id: "p4",  title: "4. Kompleksni brojevi", vdoId: "8771fcbdef6b48f5aaf7a8ffbdd188a9" },
    { id: "p5",  title: "5. Funkcije", vdoId: "807070d8a1f84a73a740e3c8ce9b95f1" },
    { id: "p6",  title: "6. Polinomi", vdoId: "1702def2949a4f1e84c42f79bb4ef8a1" },
    { id: "p7",  title: "7.1. Kvadratne jednačine", vdoId: "e42b75ca479249409af883613679b4b6" },
    { id: "p8",  title: "7.2. Kvadratne nejednačine", vdoId: "3ae2525f237c481a8544e457cc9ec194" },
    { id: "p9",  title: "7.3. Vijetove formule", vdoId: "c75afe4ec0964354bcabd0ba1ce05a08" },
    { id: "p10", title: "8. Iracionalne jednačine i nejednačine", vdoId: "c16b523730674bf88d6c4c5d267b704c" },
    { id: "p11", title: "9. Eksponencijalne jednačine i nejednačine", vdoId: "5a9e598d85ec454dbd0d950e28008106" },
    { id: "p12", title: "10. Logaritamski izrazi", vdoId: "b4d820cd0b5c42caa94a5720a0afa2b0" },
    { id: "p13", title: "11. Logaritamske jednačine i nejednačine", vdoId: "9c264ca7cbd74d68836c2224fed8eb8b" },
    { id: "p14", title: "12. Trigonometrijski izrazi", vdoId: "0e0487cc95c649f1a10248f8d77b72cc" },
    { id: "p15", title: "12.1. Trigonometrijske jednačine i nejednačine", vdoId: "7c1ce05bdd8d48bcba0515f7d1c2ac82" },
    { id: "p16", title: "13. Planimetrija", vdoId: "e8bf037bfc26407583c0862ebde5e360" },
    { id: "p17", title: "14. Stereometrija", vdoId: "c5033f2987e54cb484899b7020ad40b3" },
    { id: "p18", title: "15. Analitička geometrija", vdoId: "d33c30010ad84817b97741a8ec58d5c5" },
    { id: "p19", title: "16. Nizovi", vdoId: "" },
    { id: "p20", title: "17. Kombinatorika", vdoId: "" },
    { id: "p21", title: "18. Binomna formula", vdoId: "" },
    { id: "p22", title: "19. Primena izvoda", vdoId: "" },
];

let completedLessons = [];
let currentIndex = -1;
let loadToken = 0; // sprečava da sporiji odgovor prepiše noviji video

const $ = (id) => document.getElementById(id);
const nav = $('course-list');
const vdoPlayer = $('vdo-player');
const videoLoader = $('video-loader');
const videoEmpty = $('video-empty');
const titleDisplay = $('lesson-title');
const progressFill = $('progress-fill');
const percentText = $('percent-text');
const progressSub = $('progress-sub');
const sidebar = $('sidebar');
const menuToggle = $('menu-toggle');
const btnComplete = $('btn-complete');
const btnPrev = $('btn-prev');
const btnNext = $('btn-next');
const authGate = $('auth-gate');
const authGateText = $('auth-gate-text');
const toastEl = $('toast');

/* ---------------- UI pomoćne funkcije ---------------- */

let toastTimer;
function toast(msg, type = "info") {
    toastEl.textContent = msg;
    toastEl.className = `toast toast-${type}`;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3000);
}

function denyAccess(message, redirectTo) {
    authGateText.textContent = message;
    authGate.classList.add('denied');
    authGate.hidden = false;
    setTimeout(() => { window.location.href = redirectTo; }, 2500);
}

/* ---------------- Ograničenje na 2 uređaja ---------------- */

function setupMaxTwoDevices(user) {
    return guardDevice({
        auth, db, user,
        onRemoved: () => {
            vdoPlayer.src = "";
            denyAccess("Pristup ovom uređaju je uklonjen. Prijavi se ponovo.", "/login");
        },
        onLimit: () => denyAccess(`Dostignut je maksimalan broj uređaja (${MAX_DEVICES}).`, "/login")
    });
}

/* ---------------- Progres ---------------- */

function loadProgress(userSnap) {
    const all = userSnap.exists() ? userSnap.data().completedLessons : null;
    if (all && Array.isArray(all[CURRENT_COURSE_ID])) {
        completedLessons = all[CURRENT_COURSE_ID];
    } else {
        try {
            completedLessons = JSON.parse(localStorage.getItem(`progress_${CURRENT_COURSE_ID}`)) || [];
        } catch { completedLessons = []; }
    }
}

async function saveProgressToFirebase(userId) {
    const userRef = doc(db, "users", userId);
    localStorage.setItem(`progress_${CURRENT_COURSE_ID}`, JSON.stringify(completedLessons));
    try {
        await updateDoc(userRef, { [`completedLessons.${CURRENT_COURSE_ID}`]: completedLessons });
    } catch {
        await setDoc(userRef, { completedLessons: { [CURRENT_COURSE_ID]: completedLessons } }, { merge: true });
    }
}

/* ---------------- Renderovanje liste ---------------- */

function renderLessons() {
    nav.innerHTML = '';

    lessons.forEach((lesson, idx) => {
        const hasVideo = Boolean(lesson.vdoId || lesson.youtube);

        const btn = document.createElement('button');
        btn.className = `lesson-btn ${hasVideo ? '' : 'soon'}`;
        btn.id = `btn-${lesson.id}`;
        btn.innerHTML = `<i class="status-icon far fa-circle"></i><span class="lesson-name"></span>${hasVideo ? '' : '<span class="soon-tag">uskoro</span>'}`;
        btn.querySelector('.lesson-name').textContent = lesson.title;
        btn.onclick = () => selectLesson(idx);
        nav.appendChild(btn);
    });

    updateUI();
}

function updateUI() {
    lessons.forEach((lesson, idx) => {
        const btn = $(`btn-${lesson.id}`);
        if (!btn) return;
        const isDone = completedLessons.includes(lesson.id);
        btn.classList.toggle('completed', isDone);
        btn.classList.toggle('active-lesson', idx === currentIndex);
        btn.querySelector('.status-icon').className =
            `status-icon ${isDone ? 'fas fa-check-circle' : idx === currentIndex ? 'fas fa-play-circle' : 'far fa-circle'}`;
    });

    const total = lessons.length;
    const done = lessons.filter(l => completedLessons.includes(l.id)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    progressFill.style.width = pct + '%';
    percentText.textContent = pct + '%';
    progressSub.textContent = `${done} / ${total} oblasti završeno`;

    updateButtonState();
}

function updateButtonState() {
    const lesson = lessons[currentIndex];
    btnPrev.disabled = currentIndex <= 0;
    btnNext.disabled = currentIndex >= lessons.length - 1;
    if (!lesson) return;

    const isDone = completedLessons.includes(lesson.id);
    btnComplete.classList.toggle('is-done', isDone);
    btnComplete.innerHTML = isDone
        ? `<i class="fas fa-rotate-left"></i> <span>Poništi završetak</span>`
        : `<i class="fas fa-check"></i> <span>Završi lekciju</span>`;
}

/* ---------------- Izbor i učitavanje lekcije ---------------- */

async function selectLesson(idx) {
    const lesson = lessons[idx];
    if (!lesson) return;

    currentIndex = idx;
    localStorage.setItem(LAST_LESSON_KEY, lesson.id);
    titleDisplay.textContent = lesson.title;

    updateUI();
    $(`btn-${lesson.id}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });

    if (window.innerWidth <= 992) sidebar.classList.remove('open');

    const myToken = ++loadToken;
    vdoPlayer.src = "";
    videoEmpty.hidden = true;
    videoLoader.hidden = true;

    if (lesson.youtube) {
        vdoPlayer.src = lesson.youtube;
        return;
    }

    if (!lesson.vdoId) {
        videoEmpty.hidden = false;
        return;
    }

    videoLoader.hidden = false;
    try {
        const result = await getVideoAuth({ videoId: lesson.vdoId });
        if (myToken !== loadToken) return; // korisnik je u međuvremenu izabrao drugu lekciju
        const { otp, playbackInfo } = result.data;
        vdoPlayer.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
    } catch (error) {
        console.error("Greška kod backenda:", error);
        if (myToken === loadToken) toast("Došlo je do greške pri učitavanju videa. Pokušaj ponovo.", "error");
    } finally {
        if (myToken === loadToken) videoLoader.hidden = true;
    }
}

function toggleCurrentLesson() {
    const lesson = lessons[currentIndex];
    if (!lesson) return;

    const i = completedLessons.indexOf(lesson.id);
    if (i > -1) completedLessons.splice(i, 1);
    else completedLessons.push(lesson.id);

    if (auth.currentUser) saveProgressToFirebase(auth.currentUser.uid);
    updateUI();
}

/* ---------------- Događaji ---------------- */

btnComplete.onclick = toggleCurrentLesson;
btnPrev.onclick = () => selectLesson(currentIndex - 1);
btnNext.onclick = () => selectLesson(currentIndex + 1);
menuToggle.onclick = () => sidebar.classList.toggle('open');

document.addEventListener('keydown', (e) => {
    if (authGate.hidden === false || e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft' && currentIndex > 0) selectLesson(currentIndex - 1);
    else if (e.key === 'ArrowRight' && currentIndex < lessons.length - 1) selectLesson(currentIndex + 1);
    else if (e.key.toLowerCase() === 'c') toggleCurrentLesson();
});

/* ---------------- Provera pristupa ---------------- */

onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "/login";
        return;
    }

    try {
        const userSnap = await setupMaxTwoDevices(user);
        if (!userSnap) return;

        const kursevi = (userSnap.exists() && userSnap.data().kursevi) ? userSnap.data().kursevi : [];
        if (!kursevi.includes(CURRENT_COURSE_ID)) {
            denyAccess("Nemaš pristup ovom kursu. Preusmeravamo te na stranicu kursa...", NO_ACCESS_REDIRECT);
            return;
        }

        document.querySelector('#user-email span').textContent = user.email;

        loadProgress(userSnap);
        renderLessons();

        // Nastavi od poslednje gledane lekcije, inače od prve nezavršene
        const lastId = localStorage.getItem(LAST_LESSON_KEY);
        let startIdx = lessons.findIndex(l => l.id === lastId);
        if (startIdx === -1) startIdx = lessons.findIndex(l => !completedLessons.includes(l.id));
        if (startIdx === -1) startIdx = 0;

        authGate.hidden = true;
        selectLesson(startIdx);
    } catch (err) {
        console.error(err);
        denyAccess("Greška pri proveri pristupa. Pokušaj ponovo.", "/login");
    }
});
