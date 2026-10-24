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

const CURRENT_COURSE_ID = "aros-klk1"; 

const courseData = [
    {
        moduleTitle: "01. Adrese",
        lessons: [
            { 
                id: "a1",
                title: "Zadatak 1",
                vdoId: "466397372acb47379c03b9de5a975697"
            },
            { 
                id: "a2",
                title: "Zadatak 2",
                vdoId: "6e10f0a217354981ac0b9dc3760cd0f6"
            },
            { 
                id: "a3",
                title: "Zadatak 3",
                vdoId: "dd721a34c8a94cea89d5769937b736cf"
            },
            { 
                id: "a4",
                title: "Zadatak 4",
                vdoId: "666d174675c24563b0afeff7a336b04d"
            },
            { 
                id: "a5",
                title: "Zadatak 5",
                vdoId: "e026e7e00b3446b2b447f188d4c8210a"
            },
            { 
                id: "a6",
                title: "Zadatak 6",
                vdoId: "0579cabce2724f6d8d0782e2f42d5785"
            },
            { 
                id: "a7",
                title: "Zadatak 7",
                vdoId: "0831e09c70f44466b3e7648f5c890385"
            },
            { 
                id: "a8",
                title: "Zadatak 8",
                vdoId: "5772ade3412146cba948076a60271048"
            },
        ]
    },
    {
        moduleTitle: "02. Proširenje opkoda",
        lessons: [
            { 
                id: "b1",
                title: "Zadatak 1",
                vdoId: "81b90ec819e743d193cde515480824db"
            },
            { 
                id: "b2",
                title: "Zadatak 2",
                vdoId: "29bb87102e0349d994d98478718bb8f3"
            },
            { 
                id: "b3",
                title: "Zadatak 3",
                vdoId: "bc3fd5f923234dd2b48281fddd034ded"
            },
            { 
                id: "b4",
                title: "Zadatak 4",
                vdoId: "347d14681d414742a1aadfd2985afeae"
            },
            { 
                id: "b5",
                title: "Zadatak 5",
                vdoId: "3bc89640d5a54877815b8639e3439f26"
            },
            { 
                id: "b6",
                title: "Zadatak 6",
                vdoId: "d95e608c33d346449553187b614cd400"
            },
            { 
                id: "b7",
                title: "Zadatak 7",
                vdoId: "f4e29a2f1dfa4834a193eab190fb79d6"
            },
            { 
                id: "b8",
                title: "Zadatak 8",
                vdoId: "d0ec6b66c8ba45d1ad049dc85f4806d0"
            },
        ]
    },
    {
        moduleTitle: "03. Stek",
        lessons: [
            { 
                id: "c1",
                title: "Zadatak 1",
                vdoId: "2ffa2c164d2f459d9aa8f030cf0c232a"
            },
            { 
                id: "c2",
                title: "Zadatak 2",
                vdoId: "b3329710871844efac27a999fa24b185"
            },
            { 
                id: "c3",
                title: "Zadatak 3",
                vdoId: "a9be5e8306264bacbd7dd533359a8d8f"
            },
            { 
                id: "c4",
                title: "Zadatak 4",
                vdoId: "bc5896f7249049189607fb9867be6634"
            },
            { 
                id: "c5",
                title: "Zadatak 5",
                vdoId: "27f57db8874c4d71b22e8b5f8a8a6ff2"
            },
            { 
                id: "c6",
                title: "Zadatak 6",
                vdoId: "741ddc11d591449eabe6423dce1b6e32"
            },
        ]
    },
    {
        moduleTitle: "04. Registri",
        lessons: [
            { 
                id: "d1",
                title: "Zadatak 1",
                vdoId: "b526560c94784b50a98d5944a6999d17"
            },
            { 
                id: "d2",
                title: "Zadatak 2",
                vdoId: "744fb26223834a7aa6418c5d1dca9134"
            },
            { 
                id: "d3",
                title: "Zadatak 3",
                vdoId: "80baa1ebf12c4a589a1c05cb95ee87ea"
            },
            { 
                id: "d4",
                title: "Zadatak 4",
                vdoId: "b5626d93ff444ab789b2bbfda4f48534"
            },
            { 
                id: "d5",
                title: "Zadatak 5",
                vdoId: "1d15e04e060243ffbce954cceee69e94"
            },
            { 
                id: "d6",
                title: "Zadatak 6",
                vdoId: "0b6cda60b3fc446f8ee8a80366572acd"
            },
            { 
                id: "d7",
                title: "Zadatak 7",
                vdoId: "365673616da54b06bfc6d2fcccd3c97a"
            },
            { 
                id: "d8",
                title: "Zadatak 8",
                vdoId: "bd2f678396fc4a74bd054f879f6c041a"
            },
            { 
                id: "d9",
                title: "Zadatak 9",
                vdoId: "81eb09918be640719c5593e1f2eaf3ac"
            },
            { 
                id: "d10",
                title: "Zadatak 10",
                vdoId: "a2850c2d3ae541b48195a534d6e34cf9"
            },
            { 
                id: "d11",
                title: "Zadatak 11",
                vdoId: "919d5d4c77644803a3307163d4291e5a"
            },
        ]
    },
    {
        moduleTitle: "05. Akumulator",
        lessons: [
            { 
                id: "e1",
                title: "Zadatak 1",
                vdoId: "3993eb7d9a0d480890f8e6ee105fac89"
            },
            { 
                id: "e2",
                title: "Zadatak 2",
                vdoId: "4b6bf45284a4422f941befae3816ed03"
            },
        ]
    },
    {
        moduleTitle: "06. Pakovanje i izvlačenje bitova",
        lessons: [
            { 
                id: "f1",
                title: "Zadatak 1",
                vdoId: "4b92b5fad88a44249d7a76e5949182a5"
            },
            { 
                id: "f2",
                title: "Zadatak 2",
                vdoId: "ff22871b833745c5898a24a6049af356"
            },
            { 
                id: "f3",
                title: "Zadatak 3",
                vdoId: "9ade1d209f57430895a2777f2e4cd4c2"
            },
            { 
                id: "f4",
                title: "Zadatak 4",
                vdoId: "7f6a1a5aee194da894b0ec365d853a00"
            },
        ]
    },
    {
        moduleTitle: "07. Procesor",
        lessons: [
            { 
                id: "g1",
                title: "Zadatak 1",
                vdoId: "dbaa910e5b4b460ab7fa407e167e7c29"
            },
            { 
                id: "g2",
                title: "Zadatak 2",
                vdoId: "4f820f6168e74f4b8d9c4c319658ccca"
            },
            { 
                id: "g3",
                title: "Zadatak 3",
                vdoId: "a4cc846ad4ee46daadabfce1ed7f9e8a"
            },
            { 
                id: "g4",
                title: "Zadatak 4",
                vdoId: "dacda483c7554e41a621b043e9203859"
            },
            { 
                id: "g5",
                title: "Zadatak 5",
                vdoId: "f3c5eba3073a42bd887db77a5a0eb2c1"
            },
            { 
                id: "g6",
                title: "Zadatak 6",
                vdoId: "4f2928916148482ebf59e9157b145319"
            },
            { 
                id: "g7",
                title: "Zadatak 7",
                vdoId: "1a93f7285a17431c8a61a9a897ca986b"
            },
        ]
    },
    {
        moduleTitle: "08. Amdalov zakon (U izradi)",
        lessons: [
            { 
                id: "h1",
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
            window.location.href = "/aros";
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