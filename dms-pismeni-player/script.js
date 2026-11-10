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

const CURRENT_COURSE_ID = "dms-pismeni"; 

const courseData = [
    {
        moduleTitle: "01. Iskazni račun",
        lessons: [
            { 
                id: "a1", 
                title: "Uvod", 
                vdoId: "14171668cb5b409bba064a40b525092f"
            },
            { 
                id: "a2", 
                title: "Pretvaranje teksta u iskazne formule", 
                vdoId: "bf00bf6e9f3c4708a0b027663112cc4c"
            },
            { 
                id: "a3", 
                title: "Osnovne operacije", 
                vdoId: "379cf83cebef48bbb7916d147a586b2f"
            },
            { 
                id: "a4", 
                title: "DNF, KNF, SDNF, SKNF", 
                vdoId: "f172a825141d43338a01542d46b62c71"
            },
            { 
                id: "a5", 
                title: "SDNF i SKNF pravila", 
                vdoId: "8e825bf376e74938bf843709724b4a5f"
            },
            { 
                id: "a6", 
                title: "Minimalna formula", 
                vdoId: "3803d5d275474e08888e33b562d56d43"
            },
            { 
                id: "a7", 
                title: "Zadatak 1", 
                vdoId: "0b323fe802cc41b6b8c8347104520049"
            },
            { 
                id: "a8", 
                title: "Zadatak 2", 
                vdoId: "5439956cdac5444881ba9b2e8702d95b"
            },
            { 
                id: "a9", 
                title: "Zadatak 3", 
                vdoId: "ded991749f024544bc12f7ad5660005f"
            },
        ]
    },
    {
        moduleTitle: "02. Predikatski račun",
        lessons: [
            { 
                id: "b1", 
                title: "Zadatak 1", 
                vdoId: "c6da224e7ac8489aadb041c942907d70"
            },
            { 
                id: "b2", 
                title: "Zadatak 2", 
                vdoId: "42acf382f5814dc8b14d371f9fc00181"
            },
            { 
                id: "b3", 
                title: "Zadatak 3", 
                vdoId: "21b2d44934be42bb9cfe6a91b8791095"
            },
            { 
                id: "b4", 
                title: "Zadatak 4", 
                vdoId: "e063e91c6eb6468e9ddae68234d8c3ea"
            },
            { 
                id: "b5", 
                title: "Zadatak 5", 
                vdoId: "39128f95fa6d4dc7b4b9b6eae6422c40"
            },
            { 
                id: "b6", 
                title: "Zadatak 6", 
                vdoId: "6f9d9feec6f440c4a09f145e6fc17cb9"
            },
            { 
                id: "b7", 
                title: "Zadatak 7", 
                vdoId: "0629bd1adb5846f599db8880869b8a83"
            },
            { 
                id: "b8", 
                title: "Rokovi - Zadatak 1", 
                vdoId: "77957dadd98d4840a0ed045e9425576c"
            },
            { 
                id: "b9", 
                title: "Rokovi - Zadatak 2", 
                vdoId: "d769ebb3a98a46608d0673fb111775ff"
            },
            { 
                id: "b10", 
                title: "Rokovi - Zadatak 3", 
                vdoId: "b1273ca306234c87abebe1d4ab28f053"
            },
            { 
                id: "b11", 
                title: "Rokovi - Zadatak 4", 
                vdoId: "cd8cfa8f06e945ffbd160eb5e82f214f"
            },
        ]
    },
    {
        moduleTitle: "03. Relacije",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "548ac8f3edf743639f941c9cb3582281"
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "7e31c969f06e413aa64d57739e43795f"
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "41df4265908a4bcf98c2775e69e07282"
            },
            { 
                id: "c4", 
                title: "ROKOVI - Zadatak 1", 
                vdoId: "bdff7496237f4bcd849a80271e82beed"
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
            window.location.href = "/dms";
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