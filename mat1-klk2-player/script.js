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

const CURRENT_COURSE_ID = "mat1-klk2"; 

const courseData = [
    {
        moduleTitle: "01. Nizovi",
        lessons: [
            {
                id: "a1",
                title: "Zadatak 1",
                vdoId: "8b87615bec624e2fa6f3f5ea92dca57c"
            },
            {
                id: "a2",
                title: "Zadatak 2",
                vdoId: "5c097c5c49184e43be997bee0627aa4d"
            },
            {
                id: "a3",
                title: "Zadatak 3",
                vdoId: "b254d3432cc846e6b9e0e364094fac8b"
            },
            {
                id: "a4",
                title: "Zadatak 4",
                vdoId: "d48ba9aafddf4554ae5cda26da6222bb"
            },
            {
                id: "a5",
                title: "Zadatak 5",
                vdoId: "68340d649fa7427692b99ed30c71a8e6"
            },
            {
                id: "a6",
                title: "Zadatak 6",
                vdoId: "6a5d94a736c84b248c5c05fc984b366c"
            },
            {
                id: "a7",
                title: "Zadatak 7",
                vdoId: "95f223f8040e40c78c6b05dd22adab7b"
            },
        ]
    },
    {
        moduleTitle: "02. Tačke nagomilavanja",
        lessons: [
            {
                id: "b1",
                title: "Uvod",
                vdoId: "31a3e6b495ca47ca9873e0326d24636a"
            },
            {
                id: "b2",
                title: "Zadatak 1",
                vdoId: "7f02b7bc8efe4e7b9836f8dd50f0545b"
            },
            {
                id: "b3",
                title: "Zadatak 2",
                vdoId: "faf2de42f92a449091789ec3805cc8f3"
            },
            {
                id: "b4",
                title: "Zadatak 3",
                vdoId: "3c9aec30b9bc496798f1ad032d26db5a"
            },
            {
                id: "b5",
                title: "Zadatak 4",
                vdoId: "3e905dea6f1d42219d95761b1d2e4d26"
            },
            {
                id: "b6",
                title: "Zadatak 5",
                vdoId: "8503be039c5a4293b60bf1b48d3882c5"
            },
        ]
    },
    {
        moduleTitle: "03. Funkcije",
        lessons: [
            {
                id: "c1",
                title: "Uvod",
                vdoId: "75ae1f58cec342bc83865068479eec3a"
            },
            {
                id: "c2",
                title: "Zadatak 1",
                vdoId: "a4a78a09c190463ea02ef066b4d805bb"
            },
            {
                id: "c3",
                title: "Zadatak 2",
                vdoId: "d37b0599af6349909d1b3c0ec91589bc"
            },
        ]
    },
    {
        moduleTitle: "04. Maklorenov polinom",
        lessons: [
            {
                id: "d1",
                title: "Uvod",
                vdoId: "268766c82f6f42bcb4eb16c71b08ed8f"
            },
            {
                id: "d2",
                title: "Zadatak 1",
                vdoId: "a57885ffaab84945b4cbe69e5c68b601"
            },
            {
                id: "d3",
                title: "Zadatak 2",
                vdoId: "543b2d0c3cdd40b9b8dd4b4eaf897750"
            },
            {
                id: "d4",
                title: "Zadatak 3",
                vdoId: "0e84b36241a14143ba2f173c5d76d391"
            },
        ]
    },
    {
        moduleTitle: "05. Tejlorov polinom",
        lessons: [
            {
                id: "e1",
                title: "Uvod",
                vdoId: "57647892805246b7b5ab7e9e9a9c7612"
            },
            {
                id: "e2",
                title: "Zadatak 1",
                vdoId: "3c5762f65a9c418abffceb11d62ecb66"
            },
            {
                id: "e3",
                title: "Zadatak 2",
                vdoId: "5639fbdccb5749dea6b466cb6c0f6d57"
            },
        ]
    },
    /*{
        moduleTitle: "06. 2021 Februar G4",
        lessons: [
            {
                id: "f1",
                title: "Zadatak 1",
                vdoId: ""
            },
            {
                id: "f2",
                title: "Zadatak 2",
                vdoId: ""
            },
        ]
    },*/
    {
        moduleTitle: "07. 2021 Jun G1",
        lessons: [
            {
                id: "g1",
                title: "Zadatak 1",
                vdoId: "24da9c71cf0443979613b73b1f79b127"
            },
            /*{
                id: "g2",
                title: "Zadatak 2",
                vdoId: ""
            },*/
        ]
    },
    {
        moduleTitle: "08. 2021 Septembar G1",
        lessons: [
            {
                id: "h1",
                title: "Zadatak 1",
                vdoId: "6bea9fceb0ea4fc185984b6dc765bc88"
            },
            {
                id: "h2",
                title: "Zadatak 2",
                vdoId: "75dd5643d63a43f6b816fb85807b8a46"
            },
        ]
    },
    /*
    {
        moduleTitle: "09. 2022 Januar G2",
        lessons: [
            {
                id: "i1",
                title: "Zadatak 1",
                vdoId: ""
            },
            {
                id: "i2",
                title: "Zadatak 2",
                vdoId: ""
            },
        ]
    },*/
    {
        moduleTitle: "10. 2022 Januar G3",
        lessons: [
            {
                id: "j1",
                title: "Zadatak 1",
                vdoId: "3fe66dff0a994418892000379298fc77"
            },
            {
                id: "j2",
                title: "Zadatak 2",
                vdoId: "44f0759decdf47baac96c95a4fac8fcb"
            },
        ]
    },
    {
        moduleTitle: "11. 2022 Januar G4",
        lessons: [
            {
                id: "k1",
                title: "Zadatak 1",
                vdoId: "0a30da3cb3e4427c82c2b2e795604881"
            },
            {
                id: "k2",
                title: "Zadatak 2",
                vdoId: "0f40ff7741d24f4c90f401393bcec51c"
            },
        ]
    },
    {
        moduleTitle: "12. 2022 Jun G2",
        lessons: [
            {
                id: "l1",
                title: "Zadatak 1",
                vdoId: "cd32cd50cc424040a01c35d414211557"
            },
            {
                id: "l2",
                title: "Zadatak 2",
                vdoId: "b6e5fa5a44bd4dc9bc73e1fc5e4b3f63"
            },
        ]
    },
    {
        moduleTitle: "13. 2023 Jul G1",
        lessons: [
            {
                id: "m1",
                title: "Zadatak 1",
                vdoId: "28968219ca6a4f6ea0cdc89f1eaed81a"
            },
            {
                id: "m2",
                title: "Zadatak 2",
                vdoId: "78631805fbf84316b8b6d6905deda2a0"
            },
        ]
    },
    {
        moduleTitle: "14. 2023 Septembar G1",
        lessons: [
            {
                id: "n1",
                title: "Zadatak 1",
                vdoId: "fee4b97cf1ec45ba84d45c0ac5907017"
            },
            {
                id: "n2",
                title: "Zadatak 2",
                vdoId: "ee8d6969e19e40f189c346d8224ce0e7"
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