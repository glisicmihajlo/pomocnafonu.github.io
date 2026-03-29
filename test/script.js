const courseData = [{
        moduleTitle: "01. Osnove razvojnog okruženja",
        lessons: [
            { id: "l1", title: "Instalacija i podešavanje", url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32320CrE2mLiW4HZUOM3qU2HuycDmRMK0aniO8oik5pW4x0de&playbackInfo=eyJ2aWRlb0lkIjoiYjM2MTQyNzBlYmRiNDMwOGJhMzI2MjE5Yzk4ODAzZWUifQ==", desc: "Vodič kroz instalaciju alata." },
            { id: "l2", title: "Struktura projekta", url: "video2.mp4", desc: "Organizacija fajlova." }
        ]
    },
    {
        moduleTitle: "02. Napredne tehnike",
        lessons: [
            { id: "l3", title: "Funkcionalno programiranje", url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323233GoSKibuavvmr4btYblQYWT6pb1CpeaolrqyvZCSBlyn&playbackInfo=eyJ2aWRlb0lkIjoiODFmMmVmOGRmYmQ1NDRlNTgzYWYzN2Y0NTQwMjEyMWMifQ==", desc: "Napredni koncepti Java jezika." },
            { id: "l4", title: "Optimizacija algoritama", url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Tp1KAO13qRYPNb2otuYX1olk2tJ0uCzQ0AmcE0Kqa9a5B&playbackInfo=eyJ2aWRlb0lkIjoiZDQwZTQ0NGMxZmEzNDBlMWJkZGE5OGQ0YWZlNDVhZWIifQ==", desc: "Efikasnost koda." }
        ]
    }
];

let completedLessons = JSON.parse(localStorage.getItem('edu_vfinal_stable')) || [];
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
        const firstLesson = courseData[0].lessons[0];
        const firstModuleTitle = courseData[0].moduleTitle;

        // Umesto ručnog postavljanja src i teksta, samo pozovi selectLesson.
        // To će automatski srediti iframe, naslov, modul i stanje dugmeta.
        selectLesson(firstLesson, firstModuleTitle);

        // Pošto selectLesson automatski menja src na iframe-u, 
        // VdoCipher će se učitati, ali neće pustiti zvuk dok korisnik ne klikne "Play"
        // unutar samog plejera (browseri blokiraju auto-play sa zvukom).

        // Aktiviraj vizuelno prvo dugme u sidebaru i otvori prvi modul
        setTimeout(() => {
            const firstBtn = document.getElementById(`btn-${firstLesson.id}`);
            if (firstBtn) firstBtn.classList.add('active-lesson');

            const firstList = document.querySelector('.lesson-list');
            if (firstList) firstList.classList.add('active');
        }, 100);
    }

    updateGlobalProgress();
}

function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id;

    // Menjamo src na iframe-u - VdoCipher sam hendluje učitavanje
    if (vdoPlayer) {
        vdoPlayer.src = lesson.url;
    }

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
    if (index > -1) {
        completedLessons.splice(index, 1);
    } else {
        completedLessons.push(id);
    }

    localStorage.setItem('edu_vfinal_stable', JSON.stringify(completedLessons));
    updateUI();
    updateButtonState(); // Ažurira dugme odmah nakon klika
}

// Funkcija koja menja tekst i ikonicu na glavnom dugmetu
// Funkcija koja menja tekst i ikonicu na glavnom dugmetu, i uklanja direktne stilove
function updateButtonState() {
    if (!currentLessonId) return;

    const isDone = completedLessons.includes(currentLessonId);
    const btnTextSpan = btnComplete.querySelector('.button_text');

    if (isDone) {
        btnTextSpan.innerHTML = `<i class="fas fa-times"></i> Poništi završetak`;
        // Opciono: Promeni gradijent u sivkasti kada je lekcija završena
        btnComplete.style.backgroundImage = "linear-gradient(135deg, #666, #333)";
    } else {
        btnTextSpan.innerHTML = `<i class="fas fa-check"></i> Završi lekciju`;
        // Vrati originalni gradijent
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

                if (isDone) {
                    btn.classList.add('completed');
                    icon.className = 'fas fa-check-circle';
                } else {
                    btn.classList.remove('completed');
                    icon.className = 'far fa-circle';
                }
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
    if (allDone) {
        card.classList.add('module-done');
    } else {
        card.classList.remove('module-done');
    }
}

function updateGlobalProgress() {
    const totalLessons = courseData.reduce((acc, m) => acc + m.lessons.length, 0);
    const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

    if (progressFill) progressFill.style.width = progress + '%';
    if (percentText) percentText.innerText = progress + '%';
}

btnComplete.onclick = () => {
    toggleLessonStatus(currentLessonId);
};

if (menuToggle) {
    menuToggle.onclick = () => sidebar.classList.toggle('open');
}

init();