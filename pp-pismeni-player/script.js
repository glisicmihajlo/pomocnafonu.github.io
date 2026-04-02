import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// --- 1. KONFIGURACIJA ---
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

// KLJUČNO: Ovde definišeš koji je ovo kurs. 
// Ako praviš stranicu za SPA, ovde upiši "spa-klk1"
const CURRENT_COURSE_ID = "pp-pismeni"; 

// --- 2. PODACI O KURSU ---
const courseData = [
    {
        moduleTitle: "01. Uvod",
        lessons: [
            { 
                id: "a1", 
                title: "Uvod", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BCsgBnflDFgzgh7zI2qUMDrCfMGI8W8RCt3xnQdmsttfV&playbackInfo=eyJ2aWRlb0lkIjoiYjQzNmE4MDY0YThkNDgxZWE5MTQ0Nzk4MDBjMDVlYWEifQ==" 
            },
            { 
                id: "a2", 
                title: "Zadatak 1", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232TOrT7SbRxV3X7LE0ifsJnxFCIGSGh7vLEgK7ekz2UW63g&playbackInfo=eyJ2aWRlb0lkIjoiMmUyZjdiMjcxYTg0NDVmMGEyZjc3ZDQwMThhMTA4MmMifQ==" 
            },
            { 
                id: "a3", 
                title: "Zadatak 2", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323280G3VT86qHFQTedAWj7S1zfKfbLpTZZrZflUnXNbnp2Bm&playbackInfo=eyJ2aWRlb0lkIjoiYTMyNzViMGZlNWU1NGQ3NDk5NmEwZmY3Nzk2ZDg5YTIifQ==" 
            },
            { 
                id: "a4", 
                title: "Zadatak 3", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232IfA9tag0TanfPX8JW4aYI1wfIvn1PIkVzeFICqJFdnZPl&playbackInfo=eyJ2aWRlb0lkIjoiODg2NzUzYTlmZjYzNDUzNDgzZWQ1YTU3YWU3NTY3YjAifQ==" 
            },
            { 
                id: "a5", 
                title: "Zadatak 4", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232k2QG0NU2ixVMk6lClt7VhzAjclTLKp5NNNKDZBmIxl8fT&playbackInfo=eyJ2aWRlb0lkIjoiZmQ5YmZiN2ZmMmVlNGZhNmI0ZTRjNDk4ZjA0ZDlhZTcifQ==" 
            },
            { 
                id: "a6", 
                title: "Zadatak 5", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BxHrbD47KIxxXGAp0QQJQSFf0QX7og1nBSNWPhzRdISB1&playbackInfo=eyJ2aWRlb0lkIjoiOGVmOGE4ODdlNzZiNDY5Yzg5MmRjNzc0NGNmNzQzOWEifQ==" 
            },
            { 
                id: "a7", 
                title: "Zadatak 6", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232jV9irOgPu25V5G6KfjtWqeaeRbtvBJyWwu97ANDt4BPiE&playbackInfo=eyJ2aWRlb0lkIjoiZDFkOWUzYzRmZjhjNGZkYTk1ZDMzMTQwNzBiMGQwNzMifQ==" 
            },
            { 
                id: "a8", 
                title: "Zadatak 7", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232hH9W4yyXP1xSFyJtGICYaOjPVLp7bswVv4FpythwgGFsf&playbackInfo=eyJ2aWRlb0lkIjoiNGNkYzNkMmJhZjM0NGUwMzlhY2EzMWI5YzJhMjgyMDAifQ==" 
            },
            { 
                id: "a9", 
                title: "Zadatak 8", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232HYuu55VSX9A7lqLLtAQ2xSgMLWzSfGjBidct5WLOBMZup&playbackInfo=eyJ2aWRlb0lkIjoiNmZmOTAxNjM3OTczNDYwNjg0MWI1OTQ2YmRiOWEwYmMifQ==" 
            },
            { 
                id: "a10", 
                title: "Zadatak 9", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232XmASvqyFxRDdV3IYLVDLOUHsk0jmYCtkd3U1xD5rLeWKg&playbackInfo=eyJ2aWRlb0lkIjoiYTBiYTk5Y2M3ODhjNDI5OThhZTk5NTIwZjRjMjlmOWIifQ==" 
            },
            { 
                id: "a11", 
                title: "Zadatak 10", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232qP4ZLQpYzf5Ww9HwBIUGMKbeos6tyltBQEarz3gSlPDnv&playbackInfo=eyJ2aWRlb0lkIjoiYWE1YTFlODExY2VjNGExMjkwY2YwMDBhNmMxM2E4NTEifQ==" 
            },
            { 
                id: "a12", 
                title: "Zadatak 11", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232fhHK5GpX3xq3JMtQQypZJxkqJNH6n6JaFPxgvQEA7q2gg&playbackInfo=eyJ2aWRlb0lkIjoiZWI5MmE2NjFmMzkxNDBhODllMDljYzYyYTRiZmY1N2UifQ==" 
            },
            { 
                id: "a13", 
                title: "Zadatak 12", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232kMXFM3iNlCtwtX0lu1grhZtpFAIldU8K3xwmdP4aEZlWR&playbackInfo=eyJ2aWRlb0lkIjoiODExMmI1MzhhNTI2NDhlOTllODIyNDdhNDJlNDhkZDQifQ==" 
            },
            { 
                id: "a14", 
                title: "Zadatak 13", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232M8TO9jftwleQOdRiaxldyAx2dO6CRKEFp9SV8HYUeiE9w&playbackInfo=eyJ2aWRlb0lkIjoiZmY1YzBjNTAxOWFjNGQ4ZTlhMTBkMmZjNGMyMDMzN2MifQ==" 
            }
            
        ]
    },
    {
        moduleTitle: "02. If naredba",
        lessons: [
            { id: "l3", title: "Funkcionalno programiranje", url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232DJCitVRaGo5tCf0xoBI2awklWUbOL9sN90nNRZU04qmqH&playbackInfo=eyJ2aWRlb0lkIjoiMmE1NWU3ZTY5YWQzNGNmMjliODFmZmM4Y2UwZWQyMDIifQ==", desc: "Napredni koncepti Java jezika." },
            { id: "l4", title: "Optimizacija algoritama", url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Tp1KAO13qRYPNb2otuYX1olk2tJ0uCzQ0AmcE0Kqa9a5B&playbackInfo=eyJ2aWRlb0lkIjoiZDQwZTQ0NGMxZmEzNDBlMWJkZGE5OGQ0YWZlNDVhZWIifQ==", desc: "Efikasnost koda." }
        ]
    }
];

// --- 3. VARIJABLE I DOM ELEMENTI ---
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

// --- 4. SIGURNOST (MAX 2 UREĐAJA) ---
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

// --- 5. SINHRONIZACIJA PROGRESA PO KURSU ---
async function syncProgress(userId) {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    
    if (snap.exists() && snap.data().completedLessons) {
        const allProgress = snap.data().completedLessons;
        // Uzimamo samo niz za trenutni kurs iz Map-a u bazi
        completedLessons = allProgress[CURRENT_COURSE_ID] || [];
    } else {
        // Ako nema u bazi, pokušaj LocalStorage (ali specifičan za kurs)
        completedLessons = JSON.parse(localStorage.getItem(`progress_${CURRENT_COURSE_ID}`)) || [];
    }
}

async function saveProgressToFirebase(userId) {
    const userRef = doc(db, "users", userId);
    const updatePath = `completedLessons.${CURRENT_COURSE_ID}`;
    
    // updateDoc cilja tačno određeno polje u mapi bez brisanja ostalih kursa
    await updateDoc(userRef, {
        [updatePath]: completedLessons
    }).catch(async (error) => {
        // Ako dokument ne postoji ili polje nije inicijalizovano
        await setDoc(userRef, { 
            completedLessons: { [CURRENT_COURSE_ID]: completedLessons } 
        }, { merge: true });
    });

    localStorage.setItem(`progress_${CURRENT_COURSE_ID}`, JSON.stringify(completedLessons));
}

// --- 6. UI LOGIKA ---
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

function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id;
    if (vdoPlayer) vdoPlayer.src = lesson.url;
    titleDisplay.innerText = lesson.title;
    if (descDisplay) descDisplay.innerText = lesson.desc;
    moduleTag.innerText = moduleTitle;

    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active-lesson'));
    const b = document.getElementById(`btn-${lesson.id}`);
    if (b) b.classList.add('active-lesson');

    updateButtonState();
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

// --- 7. AUTH LISTENER (POKRETAČ) ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const deviceOk = await setupMaxTwoDevices(user);
        if (!deviceOk) return;

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const kursevi = (userSnap.exists() && userSnap.data().kursevi) ? userSnap.data().kursevi : [];

        // Provera pristupa tačno za ovaj kurs
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