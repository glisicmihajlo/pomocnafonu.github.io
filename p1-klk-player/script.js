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

const CURRENT_COURSE_ID = "p1-klk";

const courseData = [
    {
        moduleTitle: "01. Uvod u programiranje",
        lessons: [
            { 
                id: "a1",
                title: "Osnovni tipovi podataka",
                vdoId: "68f1dfc878b84b10bb13abd8343bcd50"
            },
            { 
                id: "a2",
                title: "Rad sa konzolom",
                vdoId: "06547df9a7004a02b7c80df73520e2a3"
            },
            { 
                id: "a3",
                title: "Matematičke operacije i Math biblioteka",
                vdoId: "65bddd7dde6148cf84141bc111361c63"
            },
            { 
                id: "a4",
                title: "Naredbe grananja",
                vdoId: "7401e62d1cee4095a352307f134c5bc7"
            },
            { 
                id: "a5",
                title: "Naredbe ponavljanja",
                vdoId: "f100bef47bfd475b957feb3ff5212b83"
            },
            { 
                id: "a6",
                title: "Metode/funkcije",
                vdoId: "4fafeceaf4ea48bc89bb4094ab7cd726"
            },
        ]
    },
    {
        moduleTitle: "02. Stringovi",
        lessons: [
            { 
                id: "b1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "03. Datumi",
        lessons: [
            { 
                id: "c1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "04. Objektno orijentisano programiranje",
        lessons: [
            { 
                id: "d1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "05. Nizovi",
        lessons: [
            { 
                id: "e1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "06. Nasleđivanje",
        lessons: [
            { 
                id: "f1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "07. Rok - Praznici",
        lessons: [
            { 
                id: "g1",
                title: "Enum VrstaPraznika",
                vdoId: "4c85dfe01e964deb8f2813f55d067b72"
            },
            { 
                id: "g2",
                title: "Klasa DnevnaStatistika",
                vdoId: "018654a73b144877863c25bd6c15c207"
            },
            { 
                id: "g3",
                title: "Klasa LunaPark",
                vdoId: "3bb383ab1b564dc789a4ef303d7815bc"
            },
            { 
                id: "g4",
                title: "Metoda unesiStatistikeZaDan",
                vdoId: "db3fb439d8d04f169d37312bbc00a804"
            },
            { 
                id: "g5",
                title: "Metoda vratiSumirano",
                vdoId: "0dc4d29fe2074804bdfa9383dd622496"
            },
            { 
                id: "g6",
                title: "Klasa TestLunaPark",
                vdoId: "058f1c4af0dd41559b81450b6a7588a0"
            },
        ]
    },
    {
        moduleTitle: "08. Rok - Zatvorenici",
        lessons: [
            { 
                id: "h1",
                title: "Klasa Zatvorenik",
                vdoId: "494489082a5e4827a264b1081d5b6a34"
            },
            { 
                id: "h2",
                title: "Klasa DozivotniZatvorenik",
                vdoId: "e667df64af2546338052aeac2377c22f"
            },
            { 
                id: "h3",
                title: "Klasa Zatvor",
                vdoId: "86b2f216267d4e518a13112583db4b19"
            },
            { 
                id: "h4",
                title: "Metoda uslovniOtpust",
                vdoId: "66119cf3fcea46059fbff341f72cbfe9"
            },
            { 
                id: "h5",
                title: "Metoda uvediZatvorenike",
                vdoId: "995642d4890e4053974674fad76bdd58"
            },
            { 
                id: "h6",
                title: "Klasa ProbaZatvor",
                vdoId: "5a1658e2817e495594deff5a9c7972b9"
            },
        ]
    },
    {
        moduleTitle: "09. Rok - Police sa džakovima",
        lessons: [
            { 
                id: "i1",
                title: "Klasa PolicaZaDzakove",
                vdoId: "a20b184cf9544b22a523d76bf846182a"
            },
            { 
                id: "i2",
                title: "Klasa MagacinSecera",
                vdoId: "661943e041d04a8d9f8622fc91774186"
            },
            { 
                id: "i3",
                title: "Metoda primi",
                vdoId: "98cbaacd348041bd889927792f606429"
            },
            { 
                id: "i4",
                title: "Metoda otpremi",
                vdoId: "3c5a530d0f314ad9a5ce08709aee6927"
            },
            { 
                id: "i5",
                title: "Klasa ProbaMagacinSecera",
                vdoId: "fa09afac02444666b575af72c7d16f9c"
            },
        ]
    },
    {
        moduleTitle: "10. Rok - Računarski centar",
        lessons: [
            { 
                id: "i1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "11. Rok - Plivači",
        lessons: [
            { 
                id: "k1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "12. Rok - Telefoni",
        lessons: [
            { 
                id: "l1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "13. Rok - Atrakcije",
        lessons: [
            { 
                id: "m1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "14. Rok - Teniseri",
        lessons: [
            { 
                id: "n1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "15. Rok - Prodavnica tastatura",
        lessons: [
            { 
                id: "o1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "16. Ispravka koda",
        lessons: [
            { 
                id: "p1",
                title: "",
                vdoId: ""
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
            window.location.href = "/p1";
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