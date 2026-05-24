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

const CURRENT_COURSE_ID = "oikt-klk2"; 

const courseData = [
    {
        moduleTitle: "01. SQL",
        lessons: [
            { 
                id: "a1", 
                title: "Zadatak 1", 
                vdoId: "f49e88ea42be4171963b52322d5a4322" 
            },
            { 
                id: "a2", 
                title: "Zadatak 2", 
                vdoId: "6c037972d4c046198cb8c182a0ea72d7" 
            },
            { 
                id: "a3", 
                title: "Zadatak 3", 
                vdoId: "27aa4396c563478ea85a58b3053dee0e" 
            },
            { 
                id: "a4", 
                title: "Zadatak 4", 
                vdoId: "8ab42a8564e54519ba5f5a39c421d002" 
            },
            { 
                id: "a5", 
                title: "Zadatak 5", 
                vdoId: "def4c5d289864a5d9986e309ba2f7a84" 
            },
            { 
                id: "a6", 
                title: "Zadatak 6", 
                vdoId: "e5812802867c4055ac42c8adddd2b426" 
            },
            { 
                id: "a7", 
                title: "Zadatak 7", 
                vdoId: "c8aba1442d874d5bbc8dc63c913df468" 
            },
            { 
                id: "a8", 
                title: "Zadatak 8", 
                vdoId: "973232c98d8648c38a75b87759b17244" 
            },
            { 
                id: "a9", 
                title: "Zadatak 9", 
                vdoId: "708a2591cc2041bc92a8528f40ce7ed2" 
            },
            { 
                id: "a10", 
                title: "Zadatak 10", 
                vdoId: "853c71804888419bad472eb270cbdd30" 
            },
            { 
                id: "a11", 
                title: "Zadatak 11", 
                vdoId: "2d8891a3b4af402ea014d2881191d3a6" 
            },
            { 
                id: "a12", 
                title: "Zadatak 12", 
                vdoId: "fccbe3afed154d139a3d1394c84eb75e" 
            },
            { 
                id: "a13", 
                title: "Zadatak 13", 
                vdoId: "d9e463f624b548fbb1b47496a1b02151" 
            },
            { 
                id: "a14", 
                title: "Zadatak 14", 
                vdoId: "4f9e46dc1479472db1da59865979ffb7" 
            },
            { 
                id: "a15", 
                title: "Zadatak 15", 
                vdoId: "853277096f7244f38d37dd4ced648212" 
            },
            { 
                id: "a16", 
                title: "Zadatak 16", 
                vdoId: "181bc7cf28b741d2a88e352359cca5c5" 
            },
            { 
                id: "a17", 
                title: "Zadatak 17", 
                vdoId: "e507bb8a33694205b86717f5d64d13e1" 
            },
            { 
                id: "a18", 
                title: "Zadatak 18", 
                vdoId: "7fb92c27b2294d508bff407b13f0c5b7" 
            },
            { 
                id: "a19", 
                title: "Zadatak 19", 
                vdoId: "901bec25d8634e0c808bfb7fa9222b1c" 
            },
            { 
                id: "a20", 
                title: "Zadatak 20", 
                vdoId: "0ee1e57a10124a6492b2df3fd472cd4b" 
            },
            { 
                id: "a21", 
                title: "Zadatak 21", 
                vdoId: "dca36e4dd4264c2aa45fa8d713c2b81d" 
            },
            { 
                id: "a22", 
                title: "Zadatak 22", 
                vdoId: "5e07ba65c80944a89806dbcd32bd4ea7" 
            }
        ]
    },
    {
        moduleTitle: "02. Magnetni diskovi",
        lessons: [
            { 
                id: "b1", 
                title: "Zadatak 1", 
                vdoId: "baa1b5552ff74e288118a69c4fcae5ed" 
            },
            { 
                id: "b2", 
                title: "Zadatak 2", 
                vdoId: "d14dd86c82af429a8769f396f969bf90" 
            },
            { 
                id: "b3", 
                title: "Zadatak 3", 
                vdoId: "433b8051deb140abb98b0183a5fcff84" 
            }
        ]
    },
    {
        moduleTitle: "03. Java",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "d7c80cd5f10c4749a4d021e57ea0e8ba" 
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "3183e1824d95479e9cd38f99883e964b" 
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "2c526fdb39eb4dbbbf2b8287b53c7a61" 
            },
            { 
                id: "c4", 
                title: "Zadatak 4", 
                vdoId: "632d9130a5764deaaded52579b76734b" 
            },
            { 
                id: "c5", 
                title: "Zadatak 5", 
                vdoId: "3a4121a05a0849378fddfb405247f1ad" 
            },
            { 
                id: "c6", 
                title: "Zadatak 6", 
                vdoId: "da4ef190bc4343698e0f4336b2ea251a" 
            },
            { 
                id: "c7", 
                title: "Zadatak 7", 
                vdoId: "92902b572f9540a99e2a2c6d761554b8" 
            },
            { 
                id: "c8", 
                title: "Zadatak 8", 
                vdoId: "ffc5bb816e01447aa7c67ccdb1e43234" 
            },
            { 
                id: "c9", 
                title: "Zadatak 9", 
                vdoId: "b619bdf7a28d4d858643b48e594b526b" 
            },
            { 
                id: "c10", 
                title: "Zadatak 10", 
                vdoId: "b2cc6cd912aa43449a0489b8c3d08aea" 
            },
            { 
                id: "c11", 
                title: "Zadatak 11", 
                vdoId: "f182d153cc7f4234941f57334e85db72" 
            },
            { 
                id: "c12", 
                title: "Zadatak 12", 
                vdoId: "04998853737e49f1947c0a50180c3c1a" 
            },
            { 
                id: "c13", 
                title: "Zadatak 13", 
                vdoId: "2ba4e9739e6b4ab39221ea42d3cb5b60" 
            },
            { 
                id: "c14", 
                title: "Zadatak 14", 
                vdoId: "2bf59cbb3a274391b70331184fb4ad8e" 
            }
        ]
    },
    {
        moduleTitle: "04. IP adrese",
        lessons: [
            { 
                id: "d1", 
                title: "Zadatak 1", 
                vdoId: "152bfb8e5aaa4abebc35eb5b307fc99e" 
            },
            { 
                id: "d2", 
                title: "Zadatak 2", 
                vdoId: "3a5b8665f8ea4e0380754b495a4e3f86" 
            },
            { 
                id: "d3", 
                title: "Zadatak 3", 
                vdoId: "54233bf767814493a8427be229e482e9" 
            },
            { 
                id: "d4", 
                title: "Zadatak 4", 
                vdoId: "972645423a004ac5825395bb0cc5c1dc" 
            },
            { 
                id: "d5", 
                title: "Zadatak 5", 
                vdoId: "57041745e8694d89807f7902012548a7" 
            }
        ]
    }
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
            window.location.href = "/oikt";
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