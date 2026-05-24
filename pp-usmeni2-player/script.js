import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

const CURRENT_COURSE_ID = "pp-usmeni2"; 

const courseData = [
    {
        moduleTitle: "01. Pokazivači (isto kao za 1. klk)",
        lessons: [
            {
                id: "d1",
                title: "Zamena lokalnih pokazivača",
                vdoId: "0e579c948f7e4f24b97fab531bf58f30"
            },
            {
                id: "d2",
                title: "Dereferenciranje pokazivača",
                vdoId: "15e06f4590504fec92232d6e75c295c6"
            },
            {
                id: "d3",
                title: "Inkrementiranje i adrese",
                vdoId: "41b85277ea984a7b81493d0f94209f4a"
            },
            {
                id: "d4",
                title: "Pokazivači na niz",
                vdoId: "bf58ccdf0adf4bf3a6b4ba621da30b09"
            },
            {
                id: "d5",
                title: "Veličina pokazivača",
                vdoId: "a75eb13619d847f19e2a21aec66adf86"
            },
            {
                id: "d6",
                title: "Inkrement NULL pokazivača",
                vdoId: "f1fc9cbc46fa4353a34006afbe8a1b44"
            },
            {
                id: "d7",
                title: "Prenos po vrednosti",
                vdoId: "4619004fbcdb4d2b99feb3c37d57e4d7"
            },
            {
                id: "d8",
                title: "Izostanak dodele vrednosti",
                vdoId: "dde4deecb8dd4a6a8854c4c106312dd0"
            },
            {
                id: "d9",
                title: "Dvostruki pokazivači",
                vdoId: "1b3ac58c06494fe9aeedf1046a2faeaf"
            },
            {
                id: "d10",
                title: "Pokazivačka aritmetika",
                vdoId: "b35ba06d08304d2b9ef9af303f14579a"
            }
        ]
    },
    {
        moduleTitle: "02. Matrice i višedimenzionalni nizovi",
        lessons: [
            {
                id: "f1",
                title: "Popunjavanje elemenata matrice",
                vdoId: "7e9814b6d18544b1af2deb67afff438c"
            },
            {
                id: "f2",
                title: "Modifikacija elemenata kolone",
                vdoId: "99b44702c0c24ec888b902505f1f68a5"
            },
            {
                id: "f3",
                title: "Aritmetika pokazivača u matrici",
                vdoId: "c2bf31f197754150a9eef7cd7556e968"
            },
            {
                id: "f4",
                title: "Linearizacija matrice pokazivačem",
                vdoId: "b83292e15eef45fabe9066a83aa6e509"
            },
            {
                id: "f5",
                title: "Analiza dvoimenzionalnog niza",
                vdoId: "0ec5f45d0b874766bb4a65a2f0977b40"
            },
            {
                id: "f6",
                title: "Iteracija kroz celu matricu",
                vdoId: "e9890b6f7270499ba178bfe19dc2379c"
            },
            {
                id: "f7",
                title: "Inicijalizacija 3D niza",
                vdoId: "325d00fae6a3453aace698a075663d2a"
            },
            {
                id: "f8",
                title: "Pristup 3D elementima",
                vdoId: "e8c096f1815448e39aa810531122bbeb"
            },
        ]
    },
    {
        moduleTitle: "03. Strukture i unije",
        lessons: [
            { 
                id: "a1", 
                title: "Uvod", 
                vdoId: "7868247fba564b19a4d22c80d9d40003"
            },
            { 
                id: "a2", 
                title: "Unije u C-u", 
                vdoId: "b0086bf37c954a58940cb047c29a7393"
            },
            { 
                id: "a3", 
                title: "Kopiranje struktura memcpy", 
                vdoId: "f7b72cbf452a4227bbea32f4fc7d453e"
            },
            { 
                id: "a4", 
                title: "Delimično kopiranje stringa", 
                vdoId: "69bcdb170ec54492b6faf69aef87a1e5"
            },
            { 
                id: "a5", 
                title: "Greške u strukturama", 
                vdoId: "e7ff5fbbf9cc4e2bac9e2372924b4f5a"
            },
            { 
                id: "a6", 
                title: "Kopiranje delova stringa", 
                vdoId: "dcfb378c07164bf69e7efd569474cdb3"
            },
            { 
                id: "a7", 
                title: "Inicijalizacija struktura", 
                vdoId: "e0657c20a35344c99736bf39ae35a876"
            },
        ]
    },
    {
        moduleTitle: "04. Datoteke",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod", 
                vdoId: "71284e470c114b39afb28b5c4e8eb2c2"
            },
            { 
                id: "b2", 
                title: "Pisanje u datoteku", 
                vdoId: "6686155ea4f24212ada05902ffa80b95"
            },
            { 
                id: "b3", 
                title: "Pisanje u stdin", 
                vdoId: "ed2aa385afaf4d35930d61557a6a7cfc"
            },
            { 
                id: "b4", 
                title: "Ispis preko pokazivača", 
                vdoId: "49e0cf7043dd4492b99caeb003a85d09"
            },
            { 
                id: "b5", 
                title: "Čitanje do EOF-a", 
                vdoId: "15eef79c07814dd58d4d69b6fcf97184"
            },
            { 
                id: "b6", 
                title: "Kretanje unazad fseek", 
                vdoId: "81d420cf469e455eb4f96dd7cb766e53"
            },
            { 
                id: "b7", 
                title: "Čitanje karaktera datoteke", 
                vdoId: "20e6ede6c6514813a704e86771e3425c"
            },
            { 
                id: "b8", 
                title: "Izmena karaktera datoteke", 
                vdoId: "2c232be6b0694b3f928d2acd1b668fdc"
            },
            { 
                id: "b9", 
                title: "Kopiranje bez razmaka", 
                vdoId: "041edc7f251d4c92af04ceff6609a8d1"
            },
            { 
                id: "b10", 
                title: "Brojanje linija datoteke", 
                vdoId: "858723ff8f0143398edf2b1d08926418"
            },
            { 
                id: "b11", 
                title: "Zamena razmaka tarabom", 
                vdoId: "741705f722bd4e8d9cf6ffaf8ab68eed"
            },
            { 
                id: "b12", 
                title: "Čitanje unazad fread", 
                vdoId: "03d7542cea404d118899a4b5fac61a36"
            },
            { 
                id: "b13", 
                title: "Funkcija ftell strukture", 
                vdoId: "bc60b46f6cb14cd19c25de9dfe368699"
            },
        ]
    },
    {
        moduleTitle: "05. Liste",
        lessons: [
            { 
                id: "c1", 
                title: "Kretanje kroz listu", 
                vdoId: "e2d225b93a5d4498a873fe9e6557ad47"
            },
            { 
                id: "c2", 
                title: "Rekurzivni ispis liste", 
                vdoId: "24ab760e5a2a4c8b90e43b943270f1df"
            },
            { 
                id: "c3", 
                title: "Dvostruko povezana lista", 
                vdoId: "d781102db89545f5b69ba77c528aa770"
            },
            { 
                id: "c4", 
                title: "Vrednost čvora liste", 
                vdoId: "533cd3801f8842d08c6da77352a3cb9f"
            },
            { 
                id: "c5", 
                title: "Sortiranje povezane liste", 
                vdoId: "fcf33c0e210a42b0b35a49dd8b2d1617"
            },
            { 
                id: "c6", 
                title: "Beskonačna kružna petlja", 
                vdoId: "d7bd1378c3b14d3d848d4e2c4346ae9a"
            },
            { 
                id: "c7", 
                title: "Gubljenje glave liste", 
                vdoId: "c41af39c91c2457ea746f5c8ca43e5f6"
            },
        ]
    },
    {
        moduleTitle: "06. Primer kolokvijuma",
        lessons: [
            { 
                id: "d6", 
                title: "Adrese 3D niza", 
                vdoId: "7386e74425b84e438927a5679cd328f9"
            },
            { 
                id: "d7", 
                title: "Indeksirana 3D inicijalizacija", 
                vdoId: "ab2cf65ce2e54a1f8dec81b949980509"
            },
            { 
                id: "d1", 
                title: "Kopije naspram originala", 
                vdoId: "bb468294247042e09898e9cd0d6174f8"
            },
            { 
                id: "d2", 
                title: "Pravila sa strelicom", 
                vdoId: "2362dd1fdd3645e5ac9c44b9190b5b6b"
            },
            { 
                id: "d3", 
                title: "Šetnja kroz čvorove", 
                vdoId: "7e2b83f667ec478ca5e7df6df4d168b3"
            },
            { 
                id: "d4", 
                title: "Preskakanje karaktera fajla", 
                vdoId: "69a03040b30b441d954e21b066fe4b68"
            },
            { 
                id: "d5", 
                title: "Pozicija kursora", 
                vdoId: "b21df1f012a04217a683b22423fd3eb8"
            },
        ]
    },
];

let completedLessons = [];
let currentLessonId = null;

const nav = document.getElementById('course-accordion');
const vdoPlayer = document.getElementById('vdo-player');
const titleDisplay = document.getElementById('lesson-title');
const descDisplay = document.getElementById('lesson-desc');
const moduleTag = document.getElementById('module-tag');
const progressFill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent-text');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const btnComplete = document.getElementById('btn-complete');

function generateSessionToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function setupMaxTwoDevices(user) {
    const userRef = doc(db, "users", user.uid);
    let sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken) {
        sessionToken = generateSessionToken();
        localStorage.setItem("sessionToken", sessionToken);
    }

    const snap = await getDoc(userRef);
    let sessionTokens = (snap.exists() && snap.data().sessionTokens) ? snap.data().sessionTokens : [];

    if (!sessionTokens.includes(sessionToken)) {
        if (sessionTokens.length >= 2) {
            alert("Dostignut je maksimalan broj uređaja (2).");
            await signOut(auth);
            window.location.href = "/login";
            return false;
        }
        sessionTokens.push(sessionToken);
        await setDoc(userRef, { sessionTokens }, { merge: true });
    }

    onSnapshot(userRef, (docSnap) => {
        const data = docSnap.data();
        if (data && (!data.sessionTokens || !data.sessionTokens.includes(sessionToken))) {
            alert("Pristup ovom uređaju je uklonjen.");
            signOut(auth);
            window.location.href = "/login";
        }
    });
    return true;
}

async function syncProgress(userId) {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    
    if (snap.exists() && snap.data().completedLessons) {
        const allProgress = snap.data().completedLessons;
        completedLessons = allProgress[CURRENT_COURSE_ID] || [];
    } else {
        completedLessons = JSON.parse(localStorage.getItem(`progress_${CURRENT_COURSE_ID}`)) || [];
    }
}

async function saveProgressToFirebase(userId) {
    const userRef = doc(db, "users", userId);
    const updatePath = `completedLessons.${CURRENT_COURSE_ID}`;
    
    await updateDoc(userRef, {
        [updatePath]: completedLessons
    }).catch(async (error) => {
        await setDoc(userRef, { 
            completedLessons: { [CURRENT_COURSE_ID]: completedLessons } 
        }, { merge: true });
    });

    localStorage.setItem(`progress_${CURRENT_COURSE_ID}`, JSON.stringify(completedLessons));
}

function init() {
    nav.innerHTML = '';
    courseData.forEach((module, mIndex) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.id = `m-b-${mIndex}`;

        const header = document.createElement('div');
        header.className = 'module-header';
        header.innerHTML = `<h3>${module.moduleTitle}</h3> <i class="fas fa-chevron-down" style="font-size:0.7rem"></i>`;

        const list = document.createElement('div');
        list.className = 'lesson-list';

        module.lessons.forEach(lesson => {
            const isDone = completedLessons.includes(lesson.id);
            const btn = document.createElement('div');
            btn.className = `lesson-btn ${isDone ? 'completed' : ''}`;
            btn.id = `btn-${lesson.id}`;
            const iconClass = isDone ? 'fas fa-check-circle' : 'far fa-circle';
            btn.innerHTML = `<i class="${iconClass}"></i> ${lesson.title}`;

            btn.onclick = (e) => {
                e.stopPropagation();
                selectLesson(lesson, module.moduleTitle);
            };

            list.appendChild(btn);
        });

        header.onclick = () => {
            const isOpen = list.classList.contains('active');
            document.querySelectorAll('.lesson-list').forEach(l => l.classList.remove('active'));
            if (!isOpen) list.classList.add('active');
        };

        moduleCard.appendChild(header);
        moduleCard.appendChild(list);
        nav.appendChild(moduleCard);
        checkModuleCompletion(mIndex);
    });

    if (courseData.length > 0 && courseData[0].lessons.length > 0) {
        selectLesson(courseData[0].lessons[0], courseData[0].moduleTitle);
        setTimeout(() => {
            const firstList = document.querySelector('.lesson-list');
            if (firstList) firstList.classList.add('active');
        }, 100);
    }
    updateGlobalProgress();
}

async function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id; // Važno da bi "Završi lekciju" dugme znalo šta završava
    titleDisplay.innerText = lesson.title;
    moduleTag.innerText = moduleTitle;

    vdoPlayer.src = ""; 

    try {
        const result = await getVideoAuth({ videoId: lesson.vdoId });
        const { otp, playbackInfo } = result.data;
        vdoPlayer.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
    } catch (error) {
        console.error("Greška kod backenda:", error);
        alert("Došlo je do greške pri autorizaciji videa.");
    }

    // Dodajemo "active-lesson" klasu na kliknuto dugme
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active-lesson'));
    const activeBtn = document.getElementById(`btn-${lesson.id}`);
    if (activeBtn) activeBtn.classList.add('active-lesson');

    updateButtonState();
    
    // Zatvori sidebar na mobilnom nakon klika
    if (window.innerWidth <= 992) sidebar.classList.remove('open');
}

function toggleLessonStatus(id) {
    if (!id) return;
    const index = completedLessons.indexOf(id);
    if (index > -1) completedLessons.splice(index, 1);
    else completedLessons.push(id);

    if (auth.currentUser) saveProgressToFirebase(auth.currentUser.uid);
    updateUI();
    updateButtonState();
}

function updateButtonState() {
    if (!currentLessonId) return;
    const isDone = completedLessons.includes(currentLessonId);
    const btnTextSpan = btnComplete.querySelector('.button_text');

    if (isDone) {
        btnTextSpan.innerHTML = `<i class="fas fa-times"></i> Poništi završetak`;
        btnComplete.style.backgroundImage = "linear-gradient(135deg, #666, #333)";
    } else {
        btnTextSpan.innerHTML = `<i class="fas fa-check"></i> Završi lekciju`;
        btnComplete.style.backgroundImage = "linear-gradient(135deg, #ffcf23, #ff8d3a)";
    }
}

function updateUI() {
    courseData.forEach((module, mIndex) => {
        module.lessons.forEach(lesson => {
            const btn = document.getElementById(`btn-${lesson.id}`);
            if (btn) {
                const isDone = completedLessons.includes(lesson.id);
                const icon = btn.querySelector('i');
                btn.className = `lesson-btn ${isDone ? 'completed' : ''} ${currentLessonId === lesson.id ? 'active-lesson' : ''}`;
                icon.className = isDone ? 'fas fa-check-circle' : 'far fa-circle';
            }
        });
        checkModuleCompletion(mIndex);
    });
    updateGlobalProgress();
}

function checkModuleCompletion(index) {
    const module = courseData[index];
    const card = document.getElementById(`m-b-${index}`);
    if (!card) return;
    const allDone = module.lessons.every(l => completedLessons.includes(l.id));
    if (allDone) card.classList.add('module-done');
    else card.classList.remove('module-done');
}

function updateGlobalProgress() {
    const totalLessons = courseData.reduce((acc, m) => acc + m.lessons.length, 0);
    const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
    if (progressFill) progressFill.style.width = progress + '%';
    if (percentText) percentText.innerText = progress + '%';
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const watermarkEl = document.getElementById('video-watermark');
        if (watermarkEl) {
            watermarkEl.innerText = user.email; // Uzima email direktno iz Firebase Auth-a
        }

        const deviceOk = await setupMaxTwoDevices(user);
        if (!deviceOk) return;

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const kursevi = (userSnap.exists() && userSnap.data().kursevi) ? userSnap.data().kursevi : [];

        if (!kursevi.includes(CURRENT_COURSE_ID)) {
            alert("Nemate pristup ovom kursu.");
            window.location.href = "/pp";
            return;
        }

        await syncProgress(user.uid);
        init();
    } else {
        window.location.href = "/login";
    }
});

btnComplete.onclick = () => toggleLessonStatus(currentLessonId);
if (menuToggle) menuToggle.onclick = () => sidebar.classList.toggle('open');