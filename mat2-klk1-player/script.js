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

const CURRENT_COURSE_ID = "mat2-klk1"; 

const courseData = [
    {
        moduleTitle: "01. Parcijalni izvodi",
        lessons: [
            { 
                id: "a1", 
                title: "Uvod", 
                vdoId: "00d45048474b41d9815f3de23f0148cf"
            },
            { 
                id: "a2", 
                title: "Zadatak 1", 
                vdoId: "90eb60e41e72443d9e66c2c666d84055"
            },
            { 
                id: "a3", 
                title: "Zadatak 2", 
                vdoId: "00cc0c2a4690404e993790d1631712b3"
            },
            { 
                id: "a4", 
                title: "Zadatak 3", 
                vdoId: "c03af50a5fde4c1282cb29f18a3d9f9e"
            },
            { 
                id: "a5", 
                title: "Zadatak 4", 
                vdoId: "69a93ab19f8b452cb13100625dfb11c6"
            },
            { 
                id: "a6", 
                title: "Zadatak 5", 
                vdoId: "c486371428bf455ba52b183fa0ad665c"
            },
        ]
    },
    {
        moduleTitle: "02. Totalni diferencijal",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod", 
                vdoId: "729043ebeb3441a3b6c306f90f048c00"
            },
            { 
                id: "b2", 
                title: "Zadatak 1", 
                vdoId: "1029013815864a93b4850a597f580bb4"
            },
            { 
                id: "b3", 
                title: "Zadatak 2", 
                vdoId: "a990d3fda5f1428b9ae36b2e50d965ed"
            },
            { 
                id: "b4", 
                title: "Zadatak 3", 
                vdoId: "15da7de4a4c24a879af1d593a41027d3"
            },
        ]
    },
    {
        moduleTitle: "03. Izvod i diferencijal implicitno zadate funkcije",
        lessons: [
            { 
                id: "c1", 
                title: "Uvod", 
                vdoId: "36b9b7342c57464baaf750923ff556b2"
            },
            { 
                id: "c2", 
                title: "Zadatak 1", 
                vdoId: "b8c89c02ffe542e58d5fa2decd747e43"
            },
            { 
                id: "c3", 
                title: "Zadatak 2", 
                vdoId: "3db28cea32ad4470803acc1e5436b07d"
            },
            { 
                id: "c4", 
                title: "Zadatak 3", 
                vdoId: "802725fe35104c91a667ad3e4a517b95"
            },
            { 
                id: "c5", 
                title: "Zadatak 4", 
                vdoId: "d39bf9196f3b42e8b70dbfb86d3177e3"
            },
            { 
                id: "c6", 
                title: "Zadatak 5", 
                vdoId: "fb7a4a036acf4fb6a993616ceedc6487"
            },
            { 
                id: "c7", 
                title: "Zadatak 6", 
                vdoId: "6e564f302e8441679adfe8b07061c9f4"
            },
        ]
    },
    {
        moduleTitle: "04. Parcijalni izvodi i diferencijali višeg reda",
        lessons: [
            { 
                id: "d1", 
                title: "Uvod", 
                vdoId: "979635227f7f4ba58434b989dc6bfb2a"
            },
            { 
                id: "d2", 
                title: "Zadatak 1", 
                vdoId: "5a769c19ae90400296744c5cc2b192de"
            },
            { 
                id: "d3", 
                title: "Zadatak 2", 
                vdoId: "231fac5b06a44f119fda0e0a325e56be"
            },
            { 
                id: "d4", 
                title: "Zadatak 3", 
                vdoId: "deb27b064d56460ab1c34a3eab8ce336"
            },
            { 
                id: "d5", 
                title: "Zadatak 4", 
                vdoId: "4a29890b87854b7abfc62104437db6c6"
            },
        ]
    },
    {
        moduleTitle: "05. Tejlorov i Maklorenov polinom",
        lessons: [
            { 
                id: "e1", 
                title: "Uvod", 
                vdoId: "1175cb8a947a49348f5831ec08bbcdb6"
            },
            { 
                id: "e2", 
                title: "Zadatak 1", 
                vdoId: "783429378c3c42bb9aa1b43468c9b9e0"
            },
            { 
                id: "e3", 
                title: "Zadatak 2", 
                vdoId: "c8298f72fe03452c93fc0c61c12b3aba"
            },
            { 
                id: "e4", 
                title: "Zadatak 3 (I klk 2009)", 
                vdoId: "f7a40af71ad548f48e83385a65ee3c29"
            },
            { 
                id: "e5", 
                title: "Zadatak 4 (Septembar 2009)", 
                vdoId: "9d980581df9545fbb03830ed79e4e69a"
            },
        ]
    },
    {
        moduleTitle: "06. Lokalni ekstremum funkcije 2 promenljive",
        lessons: [
            { 
                id: "f1", 
                title: "Uvod", 
                vdoId: "d8b1b86caf8d4c83826530b7b0a371de"
            },
            { 
                id: "f2", 
                title: "Zadatak 1", 
                vdoId: "d4753190854449f8a654a191c5a72d5f"
            },
            { 
                id: "f3", 
                title: "Zadatak 2", 
                vdoId: "0b6ef462fe8f4d609ae9023485d03e91"
            },
        ]
    },
    {
        moduleTitle: "07. Lokalni ekstremum funkcije 3 promenljive",
        lessons: [
            { 
                id: "g1", 
                title: "Uvod", 
                vdoId: "7ff72e898bbe4e1180f8ced265f1bc39"
            },
            { 
                id: "g2", 
                title: "Zadatak 1", 
                vdoId: "92a3245e54db4a82a7f3b3681da22502"
            },
            { 
                id: "g3", 
                title: "Zadatak 2", 
                vdoId: "85c47e1581e447da8dcb4884db396113"
            },
        ]
    },
    {
        moduleTitle: "08. Uslovni ekstremum funkcije 2 i 3 promenljive",
        lessons: [
            { 
                id: "h1", 
                title: "Uvod", 
                vdoId: "622fbed7b0e244b6a7f4cbfce38513cf"
            },
            { 
                id: "h2", 
                title: "Zadatak 1", 
                vdoId: "fd66d432936845e7b59559227694c4df"
            },
            { 
                id: "h3", 
                title: "Zadatak 2", 
                vdoId: "21179573b63048eaa1357b61f7b961bd"
            },
            { 
                id: "h4", 
                title: "Zadatak 3", 
                vdoId: "60d21064701b46c99838440934bb2d86"
            },
            { 
                id: "h5", 
                title: "Zadatak 4", 
                vdoId: "f1d7e7635fd74ff1866a248df165d7f2"
            },
        ]
    },
    {
        moduleTitle: "09. Najveća i najmanja vrednost",
        lessons: [
            { 
                id: "i1", 
                title: "Uvod", 
                vdoId: "16081d3f06b14d9db209f7a93f117cf1"
            },
            { 
                id: "i2", 
                title: "Zadatak 1", 
                vdoId: "26ea6c4e9b4440b59cde340e17f428d2"
            },
            { 
                id: "i3", 
                title: "Zadatak 2", 
                vdoId: "9a9e1548423047e9ae3ecacd439978f9"
            },
            { 
                id: "i4", 
                title: "Zadatak 3", 
                vdoId: "39db7dfdaa8a4a1b86cc4417ca3e3e42"
            },
            { 
                id: "i5", 
                title: "Zadatak 4", 
                vdoId: "a7844851923a483ea9ffe76e89ae6046"
            },
            { 
                id: "i6", 
                title: "Zadatak 5", 
                vdoId: "dd16d162279541c1800dc585a950abe6"
            },
        ]
    },
    {
        moduleTitle: "10. Kolokvijum 2007",
        lessons: [
            { 
                id: "j1", 
                title: "Zadatak 1", 
                vdoId: "7117271a5ad6433482f4e51faae00bfe"
            },
            { 
                id: "j2", 
                title: "Zadatak 2", 
                vdoId: "2e4462a0a9ec4de2aa0a424b34648662"
            },
            { 
                id: "j3", 
                title: "Zadatak 3", 
                vdoId: "30a5c023c7204a8f91627c107e062fd6"
            },
        ]
    },
    {
        moduleTitle: "11. Kolokvijum 2022 Grupa 5",
        lessons: [
            { 
                id: "k1", 
                title: "Zadatak 1", 
                vdoId: "448894b6e0f04aa185f35bddd765fb09"
            },
            { 
                id: "k2", 
                title: "Zadatak 2", 
                vdoId: "dabcd025bcd54161b5b40248575bf90e"
            },
            { 
                id: "k3", 
                title: "Zadatak 3", 
                vdoId: "9484e23038404544bd1e684e6e4f83e2"
            },
        ]
    },
    {
        moduleTitle: "12. Kolokvijum 2023 Grupa 1",
        lessons: [
            { 
                id: "l1", 
                title: "Zadatak 1", 
                vdoId: "490cbb8b579b48e8a57ee74c04b8f70e"
            },
            { 
                id: "l2", 
                title: "Zadatak 2", 
                vdoId: "7abd556f049e444c832d30d00d0efd93"
            },
            { 
                id: "l3", 
                title: "Zadatak 3", 
                vdoId: "d3a496b2dde04673ac408d7b93610c4d"
            },
        ]
    },
    {
        moduleTitle: "13. Kolokvijum 2023 Grupa 3",
        lessons: [
            { 
                id: "m1", 
                title: "Zadatak 1", 
                vdoId: "6eae1d2c1276427a8c5474388501bb45"
            },
            { 
                id: "m2", 
                title: "Zadatak 2", 
                vdoId: "07ecf47788044c96adb1a4fd4e408eae"
            },
            { 
                id: "m3", 
                title: "Zadatak 3", 
                vdoId: "c8e11215d1cd4a5f8da4b0dc2e2f8ad6"
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
            window.location.href = "/mat2";
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