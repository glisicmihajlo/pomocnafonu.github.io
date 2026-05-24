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

const CURRENT_COURSE_ID = "oikt-klk1"; 

const courseData = [
    {
        moduleTitle: "01. Konverzija brojeva",
        lessons: [
            { 
                id: "a1", 
                title: "Konverzija iz dekadnog u binarni sistem", 
                vdoId: "68c07918ff5b43d3a5ce6ff01a5e169b" 
            },
            { 
                id: "a2", 
                title: "Konverzija iz binarnog u dekadni sistem", 
                vdoId: "1aa0db34974d443bad6a268254b70f30" 
            },
            { 
                id: "a3", 
                title: "Konverzija iz dekadnog u heksadecimalni sistem", 
                vdoId: "f218fd62e20c4a02a4af94d4a5736bb9" 
            },
            { 
                id: "a4", 
                title: "Konverzija iz binarnog u heksadecimalni sistem", 
                vdoId: "f0a35ff0e1864edf9f481da8db9033cf" 
            },
            { 
                id: "a5", 
                title: "Konverzija iz binarnog u oktalni sistem", 
                vdoId: "5c0b3c3ccee145a5a15958d14a07ee59" 
            },
            { 
                id: "a6", 
                title: "Konverzija iz oktalnog u dekadni sistem", 
                vdoId: "4f9249da64c14da5b4a363dbdbb5e3d5" 
            },
            { 
                id: "a7", 
                title: "Konverzija iz heksadecimalnog u dekadni sistem", 
                vdoId: "60607b6534cb499ca2ee3599a3757690" 
            },
            { 
                id: "a8", 
                title: "Oduzimanje binarnih brojeva", 
                vdoId: "34fd8912f85d4ce4be7428a7586869e4" 
            },
            { 
                id: "a11", 
                title: "Konverzija negativnog broja", 
                vdoId: "bce49eec334446978dfa837456cbcba7" 
            },
            { 
                id: "a9", 
                title: "Zadatak 1", 
                vdoId: "76f0384f43914a56adae0f07be1ec50a" 
            },
            { 
                id: "a10", 
                title: "Zadatak 2", 
                vdoId: "136c707a6090474d9ba8513043b00b88" 
            },
            { 
                id: "a12", 
                title: "Zadatak 3", 
                vdoId: "df0eceebfa994788a13bd78d33ec5dad" 
            },
            { 
                id: "a15", 
                title: "Zadatak 4", 
                vdoId: "a7315f2ebd57456cb37a2b3fa38a6b4c" 
            },
            { 
                id: "a13", 
                title: "Konverzija decimalnog - Zadatak 1", 
                vdoId: "a36de11205624c6280150f24a8c444aa" 
            },
            { 
                id: "a14", 
                title: "Konverzija decimalnog - Zadatak 2", 
                vdoId: "4e0939b712e04886a857bc94fa9f571a" 
            }
        ]
    },
    {
        moduleTitle: "02. BCD kod",
        lessons: [
            { 
                id: "b1", 
                title: "Zadatak 1", 
                vdoId: "f3437a61d84147eea470b6ddfd2159bc" 
            },
            { 
                id: "b2", 
                title: "Zadatak 2", 
                vdoId: "b7c5dde677ce4350bc6525da744b7ae8" 
            },
            { 
                id: "b3", 
                title: "Decimalni broj", 
                vdoId: "b91ee791d1d242f1993f6940567ab80b" 
            }
        ]
    },
    {
        moduleTitle: "03. IP adrese",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "e1e2e3677b8e465ab1ad8f58b27322ff" 
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "d18732604a514edcbbca995cb0af3a0d" 
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "1cc8e4ecab64424a962c90adb18fe7cb" 
            },
            { 
                id: "c4", 
                title: "Zadatak 4", 
                vdoId: "087bf337b023419db059e59be3b10df4" 
            },
            { 
                id: "c5", 
                title: "Zadatak 5", 
                vdoId: "5ed8a11a46b042eeabaeaf98bce77d69" 
            }
        ]
    },
    {
        moduleTitle: "04. Big Endian",
        lessons: [
            { 
                id: "d1", 
                title: "Zadatak 1", 
                vdoId: "1f94b24a66504f72b8f5473337eb1c34" 
            },
            { 
                id: "d2", 
                title: "Zadatak 2", 
                vdoId: "d3c8125fb41c4282a846f22a5642ded7" 
            },
            { 
                id: "d3", 
                title: "Zadatak 3", 
                vdoId: "90884d31e10e49f4be6a8587da6b7b14" 
            },
            { 
                id: "d4", 
                title: "Zadatak 4", 
                vdoId: "8de8b871bdf34f649480490a466f62da" 
            },
            { 
                id: "d5", 
                title: "Zadatak 5", 
                vdoId: "09e0d8385f1c4c2f98744f702a82f7f8" 
            },
            { 
                id: "d6", 
                title: "Zadatak 6", 
                vdoId: "b4853750ec124168b9e0266ec4f1e8bd" 
            }
        ]
    },
    {
        moduleTitle: "05. Little Endian",
        lessons: [
            { 
                id: "e1", 
                title: "Zadatak 1", 
                vdoId: "bc8e0684b2384940ba3f4bcb2a6277c0" 
            },
            { 
                id: "e2", 
                title: "Zadatak 2", 
                vdoId: "6a05fd46fded43bcba2e6a4a7d81145d" 
            },
            { 
                id: "e3", 
                title: "Zadatak 3", 
                vdoId: "93bb6491608e4c528ec3369ad891ba55" 
            }
        ]
    },
    {
        moduleTitle: "06. Količina informacije",
        lessons: [
            { 
                id: "f1", 
                title: "Zadatak 1", 
                vdoId: "b5ec4b2227bc4098b5d85ecc66d49442" 
            },
            { 
                id: "f2", 
                title: "Zadatak 2", 
                vdoId: "1819295d63fd439bb200efa966f789c2" 
            },
            { 
                id: "f3", 
                title: "Zadatak 3", 
                vdoId: "4abe9e3501b9430186fc42c5a2632da5" 
            }
        ]
    },
    {
        moduleTitle: "07. Entropija",
        lessons: [
            { 
                id: "g1", 
                title: "Zadatak 1", 
                vdoId: "1af360f0c64742ad97869693f9e0bde1" 
            },
            { 
                id: "g2", 
                title: "Zadatak 2", 
                vdoId: "d97e61149def4633a7174affdd605f4d" 
            },
            { 
                id: "g3", 
                title: "Zadatak 3", 
                vdoId: "d668a54435ac467fafb30770b2e2b50a" 
            },
            { 
                id: "g4", 
                title: "Zadatak 4", 
                vdoId: "80ff206268bc48ed9c240ce2c6e8a2f5" 
            }
        ]
    },
    {
        moduleTitle: "08. Algoritmi sortiranja",
        lessons: [
            { 
                id: "h1", 
                title: "Bubble sort - Zadatak 1", 
                vdoId: "47e78cded118429fbca27fbaff4eda71" 
            },
            { 
                id: "h2", 
                title: "Bubble sort - Zadatak 2", 
                vdoId: "1457c55463d744bc82a55fdcc385efb2" 
            },
            { 
                id: "h3", 
                title: "Selection sort - Zadatak 1", 
                vdoId: "13a2070bfaca49bd9a9a20edd055a2f6" 
            },
            { 
                id: "h4", 
                title: "Selection sort - Zadatak 2", 
                vdoId: "0a488b022e9c4b74897f2d06c700c920" 
            },
            { 
                id: "h5", 
                title: "Insertion sort - Zadatak 1", 
                vdoId: "79c4911aaf96456b8af51014c2de65c2" 
            },
            { 
                id: "h6", 
                title: "Insertion sort - Zadatak 2", 
                vdoId: "34a75c87166c4b96976bae60fe65eeaa" 
            },
            { 
                id: "h7", 
                title: "Merge sort - Zadatak 1", 
                vdoId: "d5eafe17b24b4c9599b0947fe4a2aea3" 
            },
            { 
                id: "h8", 
                title: "Merge sort - Zadatak 2", 
                vdoId: "4acb798ef26142709a7e3e14b9a4cee1" 
            },
            { 
                id: "h9", 
                title: "Radix sort - Zadatak 1", 
                vdoId: "118e8708ff024cacb72472325b177c9c" 
            },
            { 
                id: "h10", 
                title: "Radix sort - Zadatak 2", 
                vdoId: "31f0f1697a504a56b3892a626cb50e72" 
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