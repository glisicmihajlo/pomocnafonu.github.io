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

const CURRENT_COURSE_ID = "mat2-klk2"; 

const courseData = [
    {
        moduleTitle: "01. Neodređeni integral - metoda smene",
        lessons: [
            { 
                id: "a1", 
                title: "Uvod", 
                vdoId: "b5cc7089219b439c8457c1448a5c5125"
            },
            { 
                id: "a2", 
                title: "Pojam i osobine", 
                vdoId: "396957ff3f204cc6ac2f4c069b2dbc6b"
            },
            { 
                id: "a3", 
                title: "Tablica integrala", 
                vdoId: "087fd4d6720446978deed8fb070a7bce"
            },
            { 
                id: "a4", 
                title: "Metoda smene i zadatak 1", 
                vdoId: "0e6472d8f18b4598904b0b291f38ec30"
            },
            { 
                id: "a5", 
                title: "Zadatak 2", 
                vdoId: "d735cd6db8054e56a405c6070d679ad0"
            },
            { 
                id: "a6", 
                title: "Zadatak 3", 
                vdoId: "4f1201b54ecd4d02ab3f16ed85ccc94e"
            },
            { 
                id: "a7", 
                title: "Zadatak 4", 
                vdoId: "724236bf48ae4180af32ffda1c54ca70"
            },
            { 
                id: "a8", 
                title: "Zadatak 5", 
                vdoId: "8a732cbbd6b3442abb60d457810b3115"
            },
            { 
                id: "a9", 
                title: "Zadatak 6", 
                vdoId: "dde3b5e2bca145d3ba625797f3420094"
            },
            { 
                id: "a10", 
                title: "Zadatak 7", 
                vdoId: "f9b48e08c67a40f5afc41bb2e768cbfd"
            },
            { 
                id: "a11", 
                title: "Zadatak 8", 
                vdoId: "51864cc18c8942d9821704f2d87405e8"
            },
            { 
                id: "a12", 
                title: "Zadatak 9", 
                vdoId: "a778ed0f745b42438fe48b66562519a6"
            },
            { 
                id: "a13", 
                title: "Zadatak 10", 
                vdoId: "c3cb26034b164bdf90f3a9821bc42b62"
            },
            { 
                id: "a14", 
                title: "Zadatak 11", 
                vdoId: "36f897d7247b4da8988388be77028a4d"
            },
            { 
                id: "a15", 
                title: "Zadatak 12", 
                vdoId: "d824313d58854425ac5e2951d35ce360"
            },
        ]
    },
    {
        moduleTitle: "02. Neodređeni integral - parcijalna integracija",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod", 
                vdoId: "0ed71b93a1fa41688cb44ffca3b6e124"
            },
            { 
                id: "b2", 
                title: "Zadatak 1", 
                vdoId: "9c02c85c06f14955b6f06c00484b8e05"
            },
            { 
                id: "b3", 
                title: "Zadatak 2", 
                vdoId: "47b585c93b27411ba308b77c7efab680"
            },
            { 
                id: "b4", 
                title: "Zadatak 3", 
                vdoId: "d50f9df724514d35bbfce59526407887"
            },
            { 
                id: "b5", 
                title: "Zadatak 4", 
                vdoId: "91e05ed087c940e7ad51a98a9f54ccb1"
            },
            { 
                id: "b6", 
                title: "Zadatak 5", 
                vdoId: "eddf2d24f6594924b0047e143509b3b5"
            },
            { 
                id: "b7", 
                title: "Zadatak 6", 
                vdoId: "dada4a997e3c471db0eeb41709543dee"
            },
            { 
                id: "b8", 
                title: "Zadatak 7", 
                vdoId: "e555a37293a745618a0b8bc4ed08259a"
            },
            { 
                id: "b9", 
                title: "Zadatak 8", 
                vdoId: "29ff0527bc3645578ba6dfa097d682a4"
            },
            { 
                id: "b10", 
                title: "Zadatak 9", 
                vdoId: "701ad7e073fe42a1b58cbaf99f2fe7ac"
            },
            { 
                id: "b11", 
                title: "Zadatak 10", 
                vdoId: "8ddcb2669c034796883ab9de949c66db"
            },
        ]
    },
    {
        moduleTitle: "03. Neodređeni integral - integracija racionalnih funkcija",
        lessons: [
            { 
                id: "c1", 
                title: "Uvod", 
                vdoId: "f660d9c85cb04c3db83497b2f72b9611"
            },
            { 
                id: "c2", 
                title: "Zadatak 1", 
                vdoId: "ad941e55de04456fb585dc0701f3c1fa"
            },
            { 
                id: "c3", 
                title: "Zadatak 2", 
                vdoId: "eeb541196b1f478d8a912d5ebb9aee60"
            },
            { 
                id: "c4", 
                title: "Zadatak 3", 
                vdoId: "53581370ebd0442ba434e30081e0c831"
            },
            { 
                id: "c5", 
                title: "Zadatak 4", 
                vdoId: "8786fa354a67478ea880c303fef9eeb4"
            },
            { 
                id: "c6", 
                title: "Zadatak 5", 
                vdoId: "3d5be70573bb4f97ba91613dae0d7c5c"
            },
            { 
                id: "c7", 
                title: "Zadatak 6", 
                vdoId: "12d8e34d5e87409499d6b4db16835d3d"
            },
            { 
                id: "c8", 
                title: "Zadatak 7", 
                vdoId: "0e9c6ecddc0740728ed383315974e8b7"
            },
            { 
                id: "c9", 
                title: "Zadatak 8", 
                vdoId: "c192ac76484a48bbaec9b788aeead0e6"
            },
            { 
                id: "c10", 
                title: "Zadatak 9", 
                vdoId: "98d3725a79b14120ab359141373ec10d"
            },
        ]
    },
    {
        moduleTitle: "04. Neodređeni integral - trigonometrijske smene",
        lessons: [
            { 
                id: "d1", 
                title: "Uvod", 
                vdoId: "63a10cef064b409eabc1c3a4b229b7aa"
            },
            { 
                id: "d2", 
                title: "Zadatak 1", 
                vdoId: "edeea83ac1af4ddaa4b5c1a2d646d417"
            },
            { 
                id: "d3", 
                title: "Zadatak 2", 
                vdoId: "ed3455b262984ef6976f636391d19875"
            },
            { 
                id: "d4", 
                title: "Zadatak 3", 
                vdoId: "f2ff8de971a64d08841da1849e54c09b"
            },
            { 
                id: "d5", 
                title: "Zadatak 4", 
                vdoId: "0d804d906c6c4856aa5f9a7bdcffdcb8"
            },
            { 
                id: "d6", 
                title: "Zadatak 5", 
                vdoId: "ce35be4980cd4aada535a9f67745fae4"
            },
        ]
    },
    {
        moduleTitle: "05. Neodređeni integral - integracija iracionalnih funkcija",
        lessons: [
            { 
                id: "e1", 
                title: "Uvod i zadatak 1", 
                vdoId: "317ae837bb564ad096db9d50cb15c172"
            },
            { 
                id: "e2", 
                title: "Zadatak 2", 
                vdoId: "6e6d61ffb31b49b3bce4b64829f7a5b7"
            },
            { 
                id: "e3", 
                title: "Zadatak 3", 
                vdoId: "bbd1a03d59b34a8480b541a48f99595f"
            },
            { 
                id: "e4", 
                title: "Zadatak 4", 
                vdoId: "de14e2b36b6f4772be04d70060ae54d1"
            },
            { 
                id: "e5", 
                title: "Zadatak 5", 
                vdoId: "8ce7a2d0c8234556ad8c2cd22066e922"
            },
            { 
                id: "e6", 
                title: "Zadatak 6", 
                vdoId: "41f22ca232e04d4abc1f62494913ecde"
            },
        ]
    },
    {
        moduleTitle: "06. Određeni integral - smena promenljive i parcijalna integracija",
        lessons: [
            { 
                id: "f1", 
                title: "Uvod", 
                vdoId: "632ae26903ec45a79948df62986f5c10"
            },
            { 
                id: "f2", 
                title: "Zadatak 1", 
                vdoId: "aa4f2ee77b484a1083c264fb1fbeccf7"
            },
            { 
                id: "f3", 
                title: "Zadatak 2", 
                vdoId: "4e67b20238fa40bdbeccd8dd8a229494"
            },
            { 
                id: "f4", 
                title: "Zadatak 3", 
                vdoId: "fd8b800a02b744ee80975a1bfec3b4cf"
            },
            { 
                id: "f5", 
                title: "Zadatak 4", 
                vdoId: "5a7f61449d6b461c800f5ac10b732961"
            },
            { 
                id: "f6", 
                title: "Zadatak 5", 
                vdoId: "bcf9f6f55d4e489291ddb03b191a7ec6"
            },
            { 
                id: "f7", 
                title: "Zadatak 6", 
                vdoId: "b3236e981cb74314b7c39b60c29aaafc"
            },
            { 
                id: "f8", 
                title: "Zadatak 7", 
                vdoId: "6e208c1144754a9d884114ffb5b04c36"
            },
            { 
                id: "f9", 
                title: "Zadatak 8", 
                vdoId: "28da6ed2d2fc46f0a1e44fcba404c044"
            },
            { 
                id: "f10", 
                title: "Zadatak 9", 
                vdoId: "a67701a120534c52b65a4bc637e99d6a"
            },
        ]
    },
    {
        moduleTitle: "07. Određeni integral - površina ravnih likova",
        lessons: [
            { 
                id: "g1", 
                title: "Uvod", 
                vdoId: "82272efdb8ff4f4db12e2afaf54bda55"
            },
            { 
                id: "g2", 
                title: "Zadatak 1", 
                vdoId: "dc8e68b2a35d48b6a0ddef142c555986"
            },
            { 
                id: "g3", 
                title: "Zadatak 2", 
                vdoId: "759bc630b7ee42f882ee82675751efd0"
            },
        ]
    },
    {
        moduleTitle: "08. Određeni integral - dužina luka krive",
        lessons: [
            { 
                id: "h1", 
                title: "Uvod", 
                vdoId: "c9582aaf7cbe4765a4e254a7c2355f09"
            },
            { 
                id: "h2", 
                title: "Zadatak 1", 
                vdoId: "63c02efceb414a5ea474a134a9b130e9"
            },
            { 
                id: "h3", 
                title: "Zadatak 2", 
                vdoId: "6083cc83e07841eaa519f48dc990bdf2"
            },
            { 
                id: "h4", 
                title: "Zadatak 3", 
                vdoId: "0d7b9d03210f4e9c9c9a3f92445155a7"
            },
            { 
                id: "h5", 
                title: "Zadatak 4", 
                vdoId: "5d3f4a19ad8f4561aa14bde681949420"
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