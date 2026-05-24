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

const CURRENT_COURSE_ID = "pp-usmeni1"; 

const courseData = [
    {
        moduleTitle: "01. Osnove i operatori",
        lessons: [
            { 
                id: "a1", 
                title: "Tipovi i konverzija", 
                vdoId: "06f52d13776a42eebbf7d36d04205916" 
            },
            { 
                id: "a2", 
                title: "Greške u kucanju", 
                vdoId: "4fa9f82cdadc46ab9b5f9c1ac0dfa10d" 
            },
            { 
                id: "a3", 
                title: "Uslovni i logički izraz", 
                vdoId: "c3212315d4a44799848ccb6bac702b33" 
            },
            { 
                id: "a4", 
                title: "Tipovi podataka - uvod", 
                vdoId: "58d922b9046a46f7815adf82c3bf5de9" 
            },
            { 
                id: "a5", 
                title: "Veličina tipova podataka", 
                vdoId: "0735641e8a724ff3920ef0658d2dc929" 
            },
            { 
                id: "a6", 
                title: "Oduzimanje karaktera", 
                vdoId: "91c6262c5a6d452b9043541bd5bf04ba" 
            },
            { 
                id: "a7", 
                title: "Vidljivost promenljivih", 
                vdoId: "ff2afa9d76cf43b49876583584f8b690" 
            },
            { 
                id: "a8", 
                title: "Prioritet operatora dodele", 
                vdoId: "8c781c67b7cc4072820a21fa62003943" 
            },
            { 
                id: "a9", 
                title: "Vezani ternarni operatori", 
                vdoId: "7a244fa7a3364c68855dc8e2e6326116" 
            },
            { 
                id: "a10", 
                title: "Logička dodela", 
                vdoId: "2724eb6eab6a469cac18f6ec77594488" 
            },
            { 
                id: "a11", 
                title: "Logička poređenja", 
                vdoId: "601b6831bc344ca5b6b7afd813960fc9" 
            },
            { 
                id: "a12", 
                title: "Prekoračenje opsega memorije", 
                vdoId: "3ad7d436b08d4b35b30caa01828cdfab" 
            },
            { 
                id: "a13", 
                title: "Zamka u makroima", 
                vdoId: "e3866335dfa74d4cabe5ed17563041f5" 
            },
            { 
                id: "a14", 
                title: "Inkrement u funkciji", 
                vdoId: "b31a836ae91940609d7a870b083737ef" 
            },
            { 
                id: "a15", 
                title: "Makro i poređenje", 
                vdoId: "09de736e6cf14ffcbb1288092bc33778" 
            },
            { 
                id: "a16", 
                title: "Makro za različitost", 
                vdoId: "32f7ed7a560c45a9af172717ff90f06a" 
            },
            { 
                id: "a17", 
                title: "Granice tipova podataka", 
                vdoId: "408ecfa378b84676aedfcb3138821c98" 
            },
            { 
                id: "a18", 
                title: "Skraćena evaluacija izraza", 
                vdoId: "cfc9b7a6eec94f2f8e1988d6f939d548" 
            },
            { 
                id: "a19", 
                title: "Složeni uslovni izraz", 
                vdoId: "4d02ab9180534f68a6c42f912053b817" 
            }
        ]
    },
    {
        moduleTitle: "02. Kontrola toka (petlje i grananje)",
        lessons: [
            {
                id: "b1",
                title: "While i break",
                vdoId: "e17268a44ce940c994e5b1d5b0af5eb6"
            },
            {
                id: "b2",
                title: "Do-while i uslov",
                vdoId: "3e5d45e0e16942e69338195cc9428673"
            },
            {
                id: "b3",
                title: "Unsigned tip u petlji",
                vdoId: "a13405dd0b8f4b35a09643567bab2621"
            },
            {
                id: "b4",
                title: "Switch i enum",
                vdoId: "3b024df440454ae5933819969e15436e"
            },
            {
                id: "b5",
                title: "Ugneždene while petlje",
                vdoId: "6d72bc65327b46b3be1d0e847ec62966"
            },
            {
                id: "b6",
                title: "For petlja i continue",
                vdoId: "ae50fe3977b84ba38d2fb74f9b97beb1"
            },
            {
                id: "b7",
                title: "Switch sa default-om",
                vdoId: "988d8dd806b143ad9ae666db2e2c1665"
            },
            {
                id: "b8",
                title: "Redosled case grana",
                vdoId: "5b11c2985bca498190c2ebda0f82109e"
            },
            {
                id: "b9",
                title: "Ternarni operator i unos",
                vdoId: "21db4425db7a412fb8653af400982e63"
            },
            {
                id: "b10",
                title: "Crtanje oblika (trougao)",
                vdoId: "1f4c0604bd3e4b4d8a561b01a4e17c03"
            },
            {
                id: "b11",
                title: "Crtanje šupljeg romba",
                vdoId: "cf33daa40d404dd29062a200a1e09e64"
            },
            {
                id: "b12",
                title: "While i dekrement",
                vdoId: "f9b755e4be944fbd8bfb635be4db1974"
            },
            {
                id: "b13",
                title: "While i ternarni",
                vdoId: "637f1c3c0d8549c0a003c91d578a1b43"
            },
            {
                id: "b14",
                title: "For i moduo",
                vdoId: "28e17cbe2f3d478dadd65cf18d818159"
            },
            {
                id: "b15",
                title: "Crtanje okvira trougla",
                vdoId: "db04a27744964c14a63a27500a5f9086"
            },
            {
                id: "b16",
                title: "Switch bez break-a",
                vdoId: "14790b512bc84e99874a9a3c0512bc24"
            },
            {
                id: "b17",
                title: "Jednostavna do-while petlja",
                vdoId: "e16b3bc5b503464199b25de68f3be905"
            },
            {
                id: "b18",
                title: "Switch unutar for-a",
                vdoId: "9d0fc1bb3185487b846fa3aeb1d81e05"
            },
            {
                id: "b19",
                title: "Rekurzivni ispis",
                vdoId: "0b4b443e4a1d465291d9d5140c37c0ae"
            },
            {
                id: "b20",
                title: "Logički izrazi i prioritet",
                vdoId: "a10d54cdbdcb47e6a99bf7360b0130b8"
            }
        ]
    },
    {
        moduleTitle: "03. Funkcije i memorijski segmenti",
        lessons: [
            {
                id: "c1",
                title: "Memorijski segmenti",
                vdoId: "7f2569d97ab3472a88b5fb64e9a6e233"
            },
            {
                id: "c2",
                title: "Povratna vrednost funkcije",
                vdoId: "2c36a853e60b49b78614b2a51a7afbc8"
            },
            {
                id: "c3",
                title: "Statičke i lokalne promenljive",
                vdoId: "da178a9e103f42208b658dfaa71b6a19"
            },
            {
                id: "c4",
                title: "Eksterne promenljive",
                vdoId: "f450239c561b4303b22734e5868b3632"
            }
        ]
    },
    {
        moduleTitle: "04. Pokazivači",
        lessons: [
            {
                id: "d1",
                title: "Zamena lokalnih pokazivača",
                vdoId: "0e579c948f7e4f24b97fab531bf58f30"
            },
            {
                id: "d2",
                title: "Dereferenciranje pokazivača",
                vdoId: "15e06f4590504fec92232d6e75c295c6"
            },
            {
                id: "d3",
                title: "Inkrementiranje i adrese",
                vdoId: "41b85277ea984a7b81493d0f94209f4a"
            },
            {
                id: "d4",
                title: "Pokazivači na niz",
                vdoId: "bf58ccdf0adf4bf3a6b4ba621da30b09"
            },
            {
                id: "d5",
                title: "Veličina pokazivača",
                vdoId: "a75eb13619d847f19e2a21aec66adf86"
            },
            {
                id: "d6",
                title: "Inkrement NULL pokazivača",
                vdoId: "f1fc9cbc46fa4353a34006afbe8a1b44"
            },
            {
                id: "d7",
                title: "Prenos po vrednosti",
                vdoId: "4619004fbcdb4d2b99feb3c37d57e4d7"
            },
            {
                id: "d8",
                title: "Izostanak dodele vrednosti",
                vdoId: "dde4deecb8dd4a6a8854c4c106312dd0"
            },
            {
                id: "d9",
                title: "Dvostruki pokazivači",
                vdoId: "1b3ac58c06494fe9aeedf1046a2faeaf"
            },
            {
                id: "d10",
                title: "Pokazivačka aritmetika",
                vdoId: "b35ba06d08304d2b9ef9af303f14579a"
            }
        ]
    },
    {
        moduleTitle: "05. Nizovi",
        lessons: [
            {
                id: "e1",
                title: "Prolaz pokazivačem kroz niz",
                vdoId: "261dbbfd6f004a24b1428f7fe17aa9cc"
            },
            {
                id: "e2",
                title: "Dinamička alokacija niza",
                vdoId: "d958388363584c88a94cd9d852e9661a"
            },
            {
                id: "e3",
                title: "Niz sa enum konstantama",
                vdoId: "1dd79f235b7d4000ba170dcedfcf7d9d"
            },
            {
                id: "e4",
                title: "Osnovna inicijalizacija niza",
                vdoId: "fdfbb622569c4fffacb117bb0c3f8a79"
            },
            {
                id: "e5",
                title: "Indeksirana inicijalizacija elemenata",
                vdoId: "6078c00c441d4665b2878db745957965"
            },
            {
                id: "e6",
                title: "Pristup preko indeksa",
                vdoId: "1e0969553f564c3b98b2ab6166260560"
            },
            {
                id: "e7",
                title: "Alternativna sintaksa (digrafi)",
                vdoId: "708ee117dd6f4ac3bd0940374ba54bee"
            },
            {
                id: "e8",
                title: "Sizeof niza u funkciji",
                vdoId: "2d8c763b1c2f4cba9bdaf59ad188c01e"
            },
            {
                id: "e9",
                title: "Adresni pristup elementu",
                vdoId: "85c5bd5450df448199ea7ad9c6aea907"
            },
            {
                id: "e10",
                title: "Provera adrese niza",
                vdoId: "c2ea7c6e795a490dac40c2733c13837a"
            }
        ]
    },
    {
        moduleTitle: "06. Stringovi",
        lessons: [
            {
                id: "g1",
                title: "Mala u velika slova",
                vdoId: "2fc747df3f5946fb8c07aff657010125"
            },
            {
                id: "g2",
                title: "Različiti zapisi indeksa",
                vdoId: "77b09afb2e52438ebd8a653a8f179959"
            },
            {
                id: "g3",
                title: "ASCII vrednosti i ciklus",
                vdoId: "62fdfb53271d436b99c1a7a0112b3ecb"
            },
            {
                id: "g4",
                title: "Opseg tipa char",
                vdoId: "1013c92cb680489b85df96f832794fe9"
            },
            {
                id: "g5",
                title: "Opseg unsigned char",
                vdoId: "15c97c605e9841ef88c99c9e84292733"
            },
            {
                id: "g6",
                title: "Ispis stringa pokazivačem",
                vdoId: "6ce47eec07a74bde8f8fe0bb20320b9b"
            },
            {
                id: "g7",
                title: "Pomeranje početka stringa",
                vdoId: "198ecb80c866440fa3b1f3019990f9fb"
            },
            {
                id: "g8",
                title: "Modifikacija parnih pozicija",
                vdoId: "e05fc608bf45432f8f3c48eaaee46f23"
            },
            {
                id: "g9",
                title: "Inkrementiranje string pokazivača",
                vdoId: "df8437e54b984a7597192ec91c4ebc19"
            },
            {
                id: "g10",
                title: "Strlen vs sizeof stringa",
                vdoId: "71bdc06d96364d6ab817e41d7806df7b"
            },
            {
                id: "g11",
                title: "Funkcija za kapitalizaciju",
                vdoId: "e17b83e8f2ca41c291fcd048360dceff"
            },
            {
                id: "g12",
                title: "Piramidalni ispis stringa",
                vdoId: "17d034f956474b3b88b921d14da82e11"
            },
            {
                id: "g13",
                title: "Dodela adrese stringu",
                vdoId: "e6a3750622b948f5ab7bfdc2827414b2"
            },
            {
                id: "g14",
                title: "Trougao od karaktera",
                vdoId: "cd37f27131d940099b52652b2c0f5237"
            },
            {
                id: "g15",
                title: "String kroz više redova",
                vdoId: "73c5a1d665cd459a9a05553623bb40d3"
            },
            {
                id: "g16",
                title: "Strlen i strcpy",
                vdoId: "53d905d9230544ec8562908b8cd09440"
            },
            {
                id: "g17",
                title: "Adrese karaktera u nizu",
                vdoId: "5cb735adf6fd4d6a8356801abfdc24a5"
            },
            {
                id: "g18",
                title: "Poređenje dužina stringova",
                vdoId: "3a0f3353b48c4ccb9302ec09d4bcd4c0"
            }
        ]
    },
    {
        moduleTitle: "07. Rekurzija",
        lessons: [
            {
                id: "h1",
                title: "Rekurzivni faktorijel",
                vdoId: "cee975017ff04ae8a0c2a658b41576f1"
            },
            {
                id: "h2",
                title: "Rekurzivna suma cifara",
                vdoId: "90449a7b0c1b45188ff8621873401a0a"
            },
            {
                id: "h3",
                title: "Redosled rekurzivnog ispisa",
                vdoId: "68cf674436074225a37d2f2815ab29a7"
            },
            {
                id: "h4",
                title: "Rekurzivni poziv main-a",
                vdoId: "4251049f331f486abb9e99477b3a3174"
            }
        ]
    },
    {
        moduleTitle: "08. Primer usmenog",
        lessons: [
            {
                id: "i1",
                title: "Indirektna dodela vrednosti",
                vdoId: "b8b890290e9d49569f37d8709d643f73"
            },
            {
                id: "i2",
                title: "Adrese 3D niza",
                vdoId: "7386e74425b84e438927a5679cd328f9"
            },
            {
                id: "i3",
                title: "Stanje steka pri pozivu",
                vdoId: "7431748b5ffb4e79bb3a972f70a9f093"
            },
            {
                id: "i4",
                title: "Eksplicitni null terminator",
                vdoId: "b3c2abfa5dab4cedac1827374652b543"
            },
            {
                id: "i5",
                title: "Indeksirana 3D inicijalizacija",
                vdoId: "ab2cf65ce2e54a1f8dec81b949980509"
            },
            {
                id: "i6",
                title: "Redosled case-a i fall-through",
                vdoId: "ea39da3e1d9449e1993765a7db62be15"
            },
            {
                id: "i7",
                title: "ASCII aritmetika",
                vdoId: "166d46d03b9c4eeaab45c9c2455d0c6a"
            },
            {
                id: "i8",
                title: "Prekid funkcije u petlji",
                vdoId: "e0299a6920ce49eb9aeb896e2e9153fb"
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