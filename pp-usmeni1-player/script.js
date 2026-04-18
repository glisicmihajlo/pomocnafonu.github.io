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

const CURRENT_COURSE_ID = "pp-usmeni1"; 

const courseData = [
    {
        moduleTitle: "01. Osnove i operatori",
        lessons: [
            { 
                id: "a1", 
                title: "Tipovi i konverzija", 
                url: "https://www.youtube.com/watch?v=hBKAR9te_y8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            },
            { 
                id: "a2", 
                title: "Greške u kucanju", 
                url: "https://www.youtube.com/watch?v=hRgP-jWhQNU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=2" 
            },
            { 
                id: "a3", 
                title: "Uslovni i logički izraz", 
                url: "https://www.youtube.com/watch?v=K6x1Ims5owc&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=3" 
            },
            { 
                id: "a4", 
                title: "Tipovi podataka - uvod", 
                url: "https://www.youtube.com/watch?v=QrVnplDFa6Y&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=4" 
            },
            { 
                id: "a5", 
                title: "Veličina tipova podataka", 
                url: "https://www.youtube.com/watch?v=YoeGQTTmmJg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=5" 
            },
            { 
                id: "a6", 
                title: "Oduzimanje karaktera", 
                url: "https://www.youtube.com/watch?v=mYnLc5qwb90&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=6" 
            },
            { 
                id: "a7", 
                title: "Vidljivost promenljivih", 
                url: "https://www.youtube.com/watch?v=Uj27XrFnREY&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=7" 
            },
            { 
                id: "a8", 
                title: "Prioritet operatora dodele", 
                url: "https://www.youtube.com/watch?v=fIccTDgZhnU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=8" 
            },
            { 
                id: "a9", 
                title: "Vezani ternarni operatori", 
                url: "https://www.youtube.com/watch?v=gdSXrnkg-m8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=9" 
            },
            { 
                id: "a10", 
                title: "Logička dodela", 
                url: "https://www.youtube.com/watch?v=CJmIhC3CYRw&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=10" 
            },
            { 
                id: "a11", 
                title: "Logička poređenja", 
                url: "https://www.youtube.com/watch?v=MNeP-P_Qmtk&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=11" 
            },
            { 
                id: "a12", 
                title: "Prekoračenje opsega memorije", 
                url: "https://www.youtube.com/watch?v=BKAybBsKIEg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=12" 
            },
            { 
                id: "a13", 
                title: "Zamka u makroima", 
                url: "https://www.youtube.com/watch?v=t9yX3KP2JLo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=13" 
            },
            { 
                id: "a14", 
                title: "Inkrement u funkciji", 
                url: "https://www.youtube.com/watch?v=quKJIJlMBOQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=14" 
            },
            { 
                id: "a15", 
                title: "Makro i poređenje", 
                url: "https://www.youtube.com/watch?v=IObWvhHK5GQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=15" 
            },
            { 
                id: "a16", 
                title: "Makro za različitost", 
                url: "https://www.youtube.com/watch?v=h_UcJVTvzjo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=16" 
            },
            { 
                id: "a17", 
                title: "Granice tipova podataka", 
                url: "https://www.youtube.com/watch?v=P3VzHBV1lS4&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=17" 
            },
            { 
                id: "a18", 
                title: "Skraćena evaluacija izraza", 
                url: "https://www.youtube.com/watch?v=8DGijaLq0tE&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=18" 
            },
            { 
                id: "a19", 
                title: "Složeni uslovni izraz", 
                url: "https://www.youtube.com/watch?v=7_R6faFdghI&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            }
            
        ]
    },
    {
        moduleTitle: "02. Kontrola toka (petlje i grananje)",
        lessons: [
            {
                id: "b1",
                title: "While i break",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232wOli4H5aB4FJkOjjFL7MU7JyBzvIKcst319D5z2DybmLq&playbackInfo=eyJ2aWRlb0lkIjoiZTE3MjY4YTQ0Y2U5NDBjOTk0ZTViMWQ1YjBhZjVlYjYifQ=="
            },
            {
                id: "b2",
                title: "Do-while i uslov",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232H4nNYYGpMlSwgHP2acbJzyGfcSbMmmoxdiqNcHJO4srHC&playbackInfo=eyJ2aWRlb0lkIjoiM2U1ZDQ1ZTBlMTY5NDJlNjkzMzgxOTVjYzk0Mjg2NzMifQ=="
            },
            {
                id: "b3",
                title: "Unsigned tip u petlji",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE32323DIdRqLJ7chjWVMQNIip348keLCkK1dkTQVXbTqGtb5EN&playbackInfo=eyJ2aWRlb0lkIjoiYTEzNDA1ZGQwYjhmNGIzNWEwOTY0MzU2N2JhYjI2MjEifQ=="
            },
            {
                id: "b4",
                title: "Switch i enum",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232eyb7ohFCBTzc3wZMqgkSRjhUitfJx0zAAQPEgBtAL3bd2&playbackInfo=eyJ2aWRlb0lkIjoiM2IwMjRkZjQ0MDQ1NGFlNTkzMzgxOTk2OWUxNTQzNmUifQ=="
            },
            {
                id: "b5",
                title: "Ugneždene while petlje",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232c8yzvVxRygIBpygkGCdqannA27jElCUb4UFc1bEe3TU1v&playbackInfo=eyJ2aWRlb0lkIjoiNmQ3MmJjNjUzMjdiNDZiM2JlMWQwZTg0N2VjNjI5NjYifQ=="
            },
            {
                id: "b6",
                title: "For petlja i continue",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232vwY5p9C2GPDAld15LRAuXKPDk2jLkj884sPN5f2P5lmFh&playbackInfo=eyJ2aWRlb0lkIjoiYWU1MGZlMzk3N2I4NGJhMzhkMmZiNzRmOWI5N2JlYjEifQ=="
            },
            {
                id: "b7",
                title: "Switch sa default-om",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232mhPUDtwR6vVaiqOQ3buRGGhUYbMrAHQRkPFYodk8835iu&playbackInfo=eyJ2aWRlb0lkIjoiOTg4ZDhkZDgwNmIxNDNhZDlhZTY2NmRiMmUyYzE2NjUifQ=="
            },
            {
                id: "b8",
                title: "Redosled case grana",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232iUbth223SOBagndvgMxO36MLuYP38PqFIWPElF35kYmU7&playbackInfo=eyJ2aWRlb0lkIjoiNWIxMWMyOTg1YmNhNDk4MTkwYzJlYmRhMGY4MjEwOWUifQ=="
            },
            {
                id: "b9",
                title: "Crtanje oblika (trougao)",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232qOwZuE4kFkYfD8NWVVwF7Ki7sLugmYo4DdqTvMRvJUOiS&playbackInfo=eyJ2aWRlb0lkIjoiMWY0YzA2MDRiZDNlNGI0ZDhhNTYxYjAxYTRlMTdjMDMifQ=="
            },
            {
                id: "b10",
                title: "Crtanje šupljeg romba",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232fGZ8vr5qAu5nDPY91JmeS9Rp8Y4MxJKNsIwEKH7YbcYSH&playbackInfo=eyJ2aWRlb0lkIjoiY2YzM2RhYTQwZDQwNGRkMjkwNjJhMjAwYTFlMDllNjQifQ=="
            },
            {
                id: "b11",
                title: "While i dekrement",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232H4Zgdi0gDpkvfB5BfhhF1Jobw1NVUa2s8iVJOXsyTh09n&playbackInfo=eyJ2aWRlb0lkIjoiZjliNzU1ZTRiZTk0NGZiZDhiZmI2MzViZTRkYjE5NzQifQ=="
            },
            {
                id: "b12",
                title: "While i ternarni",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232CcWxWZrSgBKuiTPcgRN3soh1riY1IxyapzsmCNvcU2thd&playbackInfo=eyJ2aWRlb0lkIjoiNjM3ZjFjM2MwZDg1NDljMGEwMDNjOTFkNTc4YTFiNDMifQ=="
            },
            {
                id: "b13",
                title: "For i moduo",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232J2QkWScCCyJspqB62Unvw5bbl8XyYheVf2U9w7B9YkNMx&playbackInfo=eyJ2aWRlb0lkIjoiMjhlMTdjYmUyZjNkNDc4ZGFkZDY1Y2YxOGQ4MTgxNTkifQ=="
            },
            {
                id: "b14",
                title: "Crtanje okvira trougla",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232n2PX2pvDJsg8lt9ReD2TE90VzfZzQc0Iwp3EVUaEJAWiz&playbackInfo=eyJ2aWRlb0lkIjoiZGIwNGEyNzc0NDk2NGMxNGE2M2EyNzUwMGE1ZjkwODYifQ=="
            },
            {
                id: "b15",
                title: "Switch bez break-a",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232BdB0wrgITni9gfFlTyljnT6t6K0XwQA3PT1pWFZekrXMa&playbackInfo=eyJ2aWRlb0lkIjoiMTQ3OTBiNTEyYmM4NGU5OTg3NGE5YTNjMDUxMmJjMjQifQ=="
            },
            {
                id: "b16",
                title: "Jednostavna do-while petlja",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232AlXnOhK4RxCgIZeDOc9C6n9M9bDutnomEdw0cnmAm9XoC&playbackInfo=eyJ2aWRlb0lkIjoiZTE2YjNiYzViNTAzNDY0MTk5YjI1ZGU2OGYzYmU5MDUifQ=="
            },
            {
                id: "b17",
                title: "Switch unutar for-a",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232ZSGNvsKnmKNMu6W54xq46VBeSWdckrf8Kjh5JWihwphjT&playbackInfo=eyJ2aWRlb0lkIjoiOWQwZmMxYmIzMTg1NDg3Yjg0NmZhM2FlYjFkODFlMDUifQ=="
            },
            {
                id: "b18",
                title: "Rekurzivni ispis (n=4)",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232Ueai7Uzrocz9Y2Mr68dxPz1X9iG00a7UcDF8rzjEcU7td&playbackInfo=eyJ2aWRlb0lkIjoiMGI0YjQ0M2U0YTFkNDY1MjkxZDlkNTE0MGMzN2MwYWUifQ=="
            },
            {
                id: "b19",
                title: "Crtanje slovnog trougla",
                url:""
            }
        ]
    },
    {
        moduleTitle: "03. Funkcije i memorijski segmenti",
        lessons: [
            {
                id: "",
                title: "",
                url:""
            },
        ]
    },
    {
        moduleTitle: "04. Pokazivači",
        lessons: [
            {
                id: "",
                title: "",
                url:""
            },
        ]
    },
    {
        moduleTitle: "05. Nizovi",
        lessons: [
            {
                id: "",
                title: "",
                url:""
            },
        ]
    },
    {
        moduleTitle: "06. Matrice i višedimenzionalni nizovi",
        lessons: [
            {
                id: "",
                title: "",
                url:""
            },
        ]
    },
    {
        moduleTitle: "07. Stringovi",
        lessons: [
            {
                id: "",
                title: "",
                url:""
            },
        ]
    },
    {
        moduleTitle: "08. Rekurzija",
        lessons: [
            {
                id: "",
                title: "",
                url:""
            },
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

function getEmbedUrl(originalUrl) {
    if (originalUrl && originalUrl.includes("youtube.com/watch")) {
        const videoId = new URL(originalUrl).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return originalUrl; // Ako je VdoCipher ili već embed, ne menja ništa
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

function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id;
    if (vdoPlayer) vdoPlayer.src = getEmbedUrl(lesson.url);
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

onAuthStateChanged(auth, async (user) => {
    if (user) {
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