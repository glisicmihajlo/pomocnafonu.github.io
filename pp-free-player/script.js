/* SVI FIREBASE IMPORTI SU UKLONJENI */

const CURRENT_COURSE_ID = "pp-pismeni"; 

const courseData = [
    {
        moduleTitle: "USMENI - 01. Osnove i operatori",
        lessons: [
            { 
                id: "c1", 
                title: "Tipovi i konverzija", 
                url: "https://www.youtube.com/watch?v=hBKAR9te_y8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            },
            { 
                id: "c2", 
                title: "Greške u kucanju", 
                url: "https://www.youtube.com/watch?v=hRgP-jWhQNU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=2" 
            },
            { 
                id: "c3", 
                title: "Uslovni i logički izraz", 
                url: "https://www.youtube.com/watch?v=K6x1Ims5owc&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=3" 
            },
            { 
                id: "c4", 
                title: "Tipovi podataka - uvod", 
                url: "https://www.youtube.com/watch?v=QrVnplDFa6Y&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=4" 
            },
            { 
                id: "c5", 
                title: "Veličina tipova podataka", 
                url: "https://www.youtube.com/watch?v=YoeGQTTmmJg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=5" 
            },
            { 
                id: "c6", 
                title: "Oduzimanje karaktera", 
                url: "https://www.youtube.com/watch?v=mYnLc5qwb90&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=6" 
            },
            { 
                id: "c7", 
                title: "Vidljivost promenljivih", 
                url: "https://www.youtube.com/watch?v=Uj27XrFnREY&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=7" 
            },
            { 
                id: "c8", 
                title: "Prioritet operatora dodele", 
                url: "https://www.youtube.com/watch?v=fIccTDgZhnU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=8" 
            },
            { 
                id: "c9", 
                title: "Vezani ternarni operatori", 
                url: "https://www.youtube.com/watch?v=gdSXrnkg-m8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=9" 
            },
            { 
                id: "c10", 
                title: "Logička dodela", 
                url: "https://www.youtube.com/watch?v=CJmIhC3CYRw&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=10" 
            },
            { 
                id: "c11", 
                title: "Logička poređenja", 
                url: "https://www.youtube.com/watch?v=MNeP-P_Qmtk&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=11" 
            },
            { 
                id: "c12", 
                title: "Prekoračenje opsega memorije", 
                url: "https://www.youtube.com/watch?v=BKAybBsKIEg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=12" 
            },
            { 
                id: "c13", 
                title: "Zamka u makroima", 
                url: "https://www.youtube.com/watch?v=t9yX3KP2JLo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=13" 
            },
            { 
                id: "c14", 
                title: "Inkrement u funkciji", 
                url: "https://www.youtube.com/watch?v=quKJIJlMBOQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=14" 
            },
            { 
                id: "c15", 
                title: "Makro i poređenje", 
                url: "https://www.youtube.com/watch?v=IObWvhHK5GQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=15" 
            },
            { 
                id: "c16", 
                title: "Makro za različitost", 
                url: "https://www.youtube.com/watch?v=h_UcJVTvzjo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=16" 
            },
            { 
                id: "c17", 
                title: "Granice tipova podataka", 
                url: "https://www.youtube.com/watch?v=P3VzHBV1lS4&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=17" 
            },
            { 
                id: "c18", 
                title: "Skraćena evaluacija izraza", 
                url: "https://www.youtube.com/watch?v=8DGijaLq0tE&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=18" 
            },
            { 
                id: "c19", 
                title: "Složeni uslovni izraz", 
                url: "https://www.youtube.com/watch?v=7_R6faFdghI&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            }
            
        ]
    },
    {
        moduleTitle: "PISMENI - 01. Linijski programi",
        lessons: [
            { 
                id: "a1", 
                title: "Prvi program u C-u", 
                url: "https://www.youtube.com/watch?v=JKAfk1pDcCE&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=1" 
            },
            { 
                id: "a2", 
                title: "Promenljive i tipovi", 
                url: "https://www.youtube.com/watch?v=VXbOQF3UIrY&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=2" 
            },
            { 
                id: "a3", 
                title: "Formatiran ispis (printf)", 
                url: "https://www.youtube.com/watch?v=Z3_MncZwErQ&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=3" 
            },
            { 
                id: "a4", 
                title: "Unos podataka (scanf)", 
                url: "https://www.youtube.com/watch?v=9JBCgM-qsh0&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=4" 
            },
            { 
                id: "a5", 
                title: "Matematičke operacije i funkcije", 
                url: "https://www.youtube.com/watch?v=997kajCXpqg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=5" 
            },
            { 
                id: "a6", 
                title: "Ispis tekstualnih poruka", 
                url: "https://www.youtube.com/watch?v=klDUzJ2XlFM&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=6" 
            },
            { 
                id: "a7", 
                title: "Konverzija valuta (dolar-dinar)", 
                url: "https://www.youtube.com/watch?v=_PmbxSmRQ0M&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=7" 
            },
            { 
                id: "a8", 
                title: "Obim i površina kruga", 
                url: "https://www.youtube.com/watch?v=5hXyOaQgnLM&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=8" 
            },
            { 
                id: "a9", 
                title: "Program za kusur", 
                url: "https://www.youtube.com/watch?v=HrGEp2eIfNg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=9" 
            },
            { 
                id: "a10", 
                title: "Pretvaranje ugla (stepeni-minuti-sekunde)", 
                url: "https://www.youtube.com/watch?v=oep-N-GOwIk&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=10" 
            },
            { 
                id: "a11", 
                title: "Proizvod cifara četvorocifrenog broja", 
                url: "https://www.youtube.com/watch?v=Ix9rmCL4Wcg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=11"
            },
            { 
                id: "a12", 
                title: "Verovatnoća izvlačenja loptica", 
                url: "https://www.youtube.com/watch?v=xg6bNooDI7M&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=12"
            },
            { 
                id: "a13", 
                title: "Stepenovanje slučajnih brojeva", 
                url: "https://www.youtube.com/watch?v=Q39oCsCS2OI&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=13"
            },
            { 
                id: "a14", 
                title: "Nasumičan izbor iz intervala", 
                url: "https://www.youtube.com/watch?v=MbqNBQMBVgs&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=14"
            }
            
        ]
    },
    {
        moduleTitle: "PISMENI - 02. If naredba",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod i parnost broja", 
                url: "https://www.youtube.com/watch?v=lO6uxQzv1dA&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=15"
            },
            { 
                id: "b2", 
                title: "Poređenje broja sa nulom", 
                url: "https://www.youtube.com/watch?v=AJMY_nOfaBg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=16"
            },
            { 
                id: "b3", 
                title: "Određivanje ocene na ispitu", 
                url: "https://www.youtube.com/watch?v=zI184gBzf_o&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=17"
            },
            { 
                id: "b4", 
                title: "Najveći od tri broja", 
                url: "https://www.youtube.com/watch?v=Ak_4cnl7wL0&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=18"
            },
            { 
                id: "b5", 
                title: "Koren i provera greške", 
                url: "https://www.youtube.com/watch?v=e5HfmFtvFG0&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=19"
            },
            { 
                id: "b6", 
                title: "Zbir ili razlika (uslovna)", 
                url: "https://www.youtube.com/watch?v=JucmQ04cSFE&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=20"
            },
            { 
                id: "b7", 
                title: "Deljivost broja M sa N", 
                url: "https://www.youtube.com/watch?v=ARWZSKSMcKI&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=21"
            },
            { 
                id: "b8", 
                title: "Provera Armstrongovog broja", 
                url: "https://www.youtube.com/watch?v=eEqdBDxn_Hg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=22"
            },
            { 
                id: "b9", 
                title: "Opisni prikaz ocena", 
                url: "https://www.youtube.com/watch?v=HhUae2gkRec&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=23"
            }
        ]
    },
];

// Inicijalizacija iz localStorage-a (ako postoji progres od ranije)
let completedLessons = JSON.parse(localStorage.getItem(`progress_${CURRENT_COURSE_ID}`)) || [];
let currentLessonId = null;

const nav = document.getElementById('course-accordion');
const vdoPlayer = document.getElementById('vdo-player');
const titleDisplay = document.getElementById('lesson-title');
const moduleTag = document.getElementById('module-tag');
const progressFill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent-text');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const btnComplete = document.getElementById('btn-complete');

function saveProgressLocally() {
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

    saveProgressLocally();
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

// Pokretanje odmah bez provere autentifikacije
init();

btnComplete.onclick = () => toggleLessonStatus(currentLessonId);
if (menuToggle) menuToggle.onclick = () => sidebar.classList.toggle('open');