/* SVI FIREBASE IMPORTI SU UKLONJENI */

const CURRENT_COURSE_ID = "mat1"; 

const courseData = [
    {
        moduleTitle: "PRVI KLK - Algebarske strukture",
        lessons: [
            { 
                id: "a1",
                title: "Uvod",
                url: "https://www.youtube.com/watch?v=hToQzaAJ0V0&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=1"
            },
            { 
                id: "a2",
                title: "Osobine",
                url: "https://www.youtube.com/watch?v=3b4b9Zs_BQo&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=2"
            },
            { 
                id: "a3",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=X4l6H325zxc&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=3"
            },
            { 
                id: "a4",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=3_DUpVCbn54&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=4"
            },
            { 
                id: "a5",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=UryY5Ww6mWA&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=5"
            },
            { 
                id: "a6",
                title: "Zadatak 4",
                url: "https://www.youtube.com/watch?v=I-wydu8jOeU&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=6"
            },
        ]
    },
    {
        moduleTitle: "PRVI KLK - 2023 Grupa 3",
        lessons: [
            {
                id: "b1",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=FdFJMu6EJvM&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=5"
            },
            {
                id: "b2",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=F-BT8KilCR0&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=6"
            },
            {
                id: "b3",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=EMTDXvl8spo&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=7"
            },
        ]
    },
    {
        moduleTitle: "DRUGI KLK - Nizovi",
        lessons: [
            { 
                id: "c1",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=bLFUMnNFWn4&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=7"
            },
            { 
                id: "c2",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=kMp1V3E5Zjo&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=8"
            },
            { 
                id: "c3",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=zyCVbj6Y4mI&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=9"
            },
            { 
                id: "c4",
                title: "Zadatak 4",
                url: "https://www.youtube.com/watch?v=Dtdq8AkWddc&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=10"
            },
            { 
                id: "c5",
                title: "Zadatak 5",
                url: "https://www.youtube.com/watch?v=WL3YUVO0E7w&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=11"
            },
            { 
                id: "c6",
                title: "Zadatak 6",
                url: "https://www.youtube.com/watch?v=VpYpemkVGaY&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=12"
            },
            { 
                id: "c7",
                title: "Zadatak 7",
                url: "https://www.youtube.com/watch?v=UMwIsmiydDY&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=13"
            },
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