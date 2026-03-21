const courseData = [{
        moduleTitle: "01. Osnove razvojnog okruženja",
        lessons: [
            { id: "l1", title: "Instalacija i podešavanje", url: "video1.mp4", desc: "Naučite kako da pravilno konfigurišete svoj IDE za rad." },
            { id: "l2", title: "Struktura projekta", url: "video2.mp4", desc: "Razumevanje fajlova i direktorijuma u modernom projektu." }
        ]
    },
    {
        moduleTitle: "02. Napredne tehnike kodiranja",
        lessons: [
            { id: "l3", title: "Funkcionalno programiranje", url: "video3.mp4", desc: "Duboki uvid u lambda izraze i stream-ove." },
            { id: "l4", title: "Optimizacija algoritama", url: "video4.mp4", desc: "Kako pisati kod koji se izvršava brže i troši manje memorije." }
        ]
    }
];

let completedLessons = JSON.parse(localStorage.getItem('pro_lms_progress')) || [];
let currentLessonId = null;

function init() {
    const nav = document.getElementById('course-accordion');
    nav.innerHTML = '';

    courseData.forEach((module, mIndex) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.id = `module-container-${mIndex}`;

        const header = document.createElement('div');
        header.className = 'module-header';
        header.innerHTML = `<h3>${module.moduleTitle}</h3> <i class="fas fa-chevron-down"></i>`;

        const list = document.createElement('div');
        list.className = 'lesson-list';

        module.lessons.forEach(lesson => {
            const isDone = completedLessons.includes(lesson.id);
            const btn = document.createElement('div');
            btn.className = `lesson-btn ${isDone ? 'completed' : ''}`;
            btn.id = `btn-${lesson.id}`;
            btn.innerHTML = `<i class="${isDone ? 'fas fa-check-circle' : 'far fa-circle'}"></i> ${lesson.title}`;

            btn.onclick = (e) => {
                e.stopPropagation();
                loadVideo(lesson, module.moduleTitle);
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

        checkModuleCompletion(mIndex); // Proveri status pri učitavanju
    });

    updateGlobalProgress();
}

function loadVideo(lesson, moduleName) {
    currentLessonId = lesson.id;
    const player = document.getElementById('main-video');
    player.src = lesson.url;
    document.getElementById('lesson-title').innerText = lesson.title;
    document.getElementById('lesson-desc').innerText = lesson.desc;
    document.getElementById('module-tag').innerText = moduleName;

    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active-lesson'));
    document.getElementById(`btn-${lesson.id}`).classList.add('active-lesson');

    player.play();
}

document.getElementById('btn-complete').onclick = () => {
    if (currentLessonId && !completedLessons.includes(currentLessonId)) {
        completedLessons.push(currentLessonId);
        localStorage.setItem('pro_lms_progress', JSON.stringify(completedLessons));

        // Update lekcije UI
        const btn = document.getElementById(`btn-${currentLessonId}`);
        btn.classList.add('completed');
        btn.querySelector('i').className = 'fas fa-check-circle';

        // Proveri sve module da li su završeni
        courseData.forEach((_, index) => checkModuleCompletion(index));
        updateGlobalProgress();
    }
};

function checkModuleCompletion(moduleIndex) {
    const module = courseData[moduleIndex];
    const moduleContainer = document.getElementById(`module-container-${moduleIndex}`);

    // Proveri da li su ID-jevi svih lekcija iz ovog modula u listi završenih
    const allDone = module.lessons.every(lesson => completedLessons.includes(lesson.id));

    if (allDone) {
        moduleContainer.classList.add('module-done');
    } else {
        moduleContainer.classList.remove('module-done');
    }
}

function updateGlobalProgress() {
    const total = courseData.reduce((acc, m) => acc + m.lessons.length, 0);
    const progress = Math.round((completedLessons.length / total) * 100);
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('percent-text').innerText = progress + '%';
}

init();