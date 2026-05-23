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
                url: "https://www.youtube.com/watch?v=JKAfk1pDcCE&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=1&pp=iAQB0gcJCQYLAYcqIYzvsAgC" 
            },
            { 
                id: "a2", 
                title: "Promenljive i tipovi", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232TOrT7SbRxV3X7LE0ifsJnxFCIGSGh7vLEgK7ekz2UW63g&playbackInfo=eyJ2aWRlb0lkIjoiMmUyZjdiMjcxYTg0NDVmMGEyZjc3ZDQwMThhMTA4MmMifQ==" 
            },
            { 
                id: "a3", 
                title: "Formatiran ispis (printf)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323280G3VT86qHFQTedAWj7S1zfKfbLpTZZrZflUnXNbnp2Bm&playbackInfo=eyJ2aWRlb0lkIjoiYTMyNzViMGZlNWU1NGQ3NDk5NmEwZmY3Nzk2ZDg5YTIifQ==" 
            },
            { 
                id: "a4", 
                title: "Unos podataka (scanf)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232IfA9tag0TanfPX8JW4aYI1wfIvn1PIkVzeFICqJFdnZPl&playbackInfo=eyJ2aWRlb0lkIjoiODg2NzUzYTlmZjYzNDUzNDgzZWQ1YTU3YWU3NTY3YjAifQ==" 
            },
            { 
                id: "a5", 
                title: "Matematičke operacije i funkcije", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232k2QG0NU2ixVMk6lClt7VhzAjclTLKp5NNNKDZBmIxl8fT&playbackInfo=eyJ2aWRlb0lkIjoiZmQ5YmZiN2ZmMmVlNGZhNmI0ZTRjNDk4ZjA0ZDlhZTcifQ==" 
            },
            { 
                id: "a6", 
                title: "Ispis tekstualnih poruka", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BxHrbD47KIxxXGAp0QQJQSFf0QX7og1nBSNWPhzRdISB1&playbackInfo=eyJ2aWRlb0lkIjoiOGVmOGE4ODdlNzZiNDY5Yzg5MmRjNzc0NGNmNzQzOWEifQ==" 
            },
            { 
                id: "a7", 
                title: "Konverzija valuta (dolar-dinar)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232jV9irOgPu25V5G6KfjtWqeaeRbtvBJyWwu97ANDt4BPiE&playbackInfo=eyJ2aWRlb0lkIjoiZDFkOWUzYzRmZjhjNGZkYTk1ZDMzMTQwNzBiMGQwNzMifQ==" 
            },
            { 
                id: "a8", 
                title: "Obim i površina kruga", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232hH9W4yyXP1xSFyJtGICYaOjPVLp7bswVv4FpythwgGFsf&playbackInfo=eyJ2aWRlb0lkIjoiNGNkYzNkMmJhZjM0NGUwMzlhY2EzMWI5YzJhMjgyMDAifQ==" 
            },
            { 
                id: "a9", 
                title: "Program za kusur", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232HYuu55VSX9A7lqLLtAQ2xSgMLWzSfGjBidct5WLOBMZup&playbackInfo=eyJ2aWRlb0lkIjoiNmZmOTAxNjM3OTczNDYwNjg0MWI1OTQ2YmRiOWEwYmMifQ==" 
            },
            { 
                id: "a10", 
                title: "Pretvaranje ugla (stepeni-minuti-sekunde)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232XmASvqyFxRDdV3IYLVDLOUHsk0jmYCtkd3U1xD5rLeWKg&playbackInfo=eyJ2aWRlb0lkIjoiYTBiYTk5Y2M3ODhjNDI5OThhZTk5NTIwZjRjMjlmOWIifQ==" 
            },
            { 
                id: "a11", 
                title: "Proizvod cifara četvorocifrenog broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232qP4ZLQpYzf5Ww9HwBIUGMKbeos6tyltBQEarz3gSlPDnv&playbackInfo=eyJ2aWRlb0lkIjoiYWE1YTFlODExY2VjNGExMjkwY2YwMDBhNmMxM2E4NTEifQ==" 
            },
            { 
                id: "a12", 
                title: "Verovatnoća izvlačenja loptica", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232fhHK5GpX3xq3JMtQQypZJxkqJNH6n6JaFPxgvQEA7q2gg&playbackInfo=eyJ2aWRlb0lkIjoiZWI5MmE2NjFmMzkxNDBhODllMDljYzYyYTRiZmY1N2UifQ==" 
            },
            { 
                id: "a13", 
                title: "Stepenovanje slučajnih brojeva", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232kMXFM3iNlCtwtX0lu1grhZtpFAIldU8K3xwmdP4aEZlWR&playbackInfo=eyJ2aWRlb0lkIjoiODExMmI1MzhhNTI2NDhlOTllODIyNDdhNDJlNDhkZDQifQ==" 
            },
            { 
                id: "a14", 
                title: "Nasumičan izbor iz intervala", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232M8TO9jftwleQOdRiaxldyAx2dO6CRKEFp9SV8HYUeiE9w&playbackInfo=eyJ2aWRlb0lkIjoiZmY1YzBjNTAxOWFjNGQ4ZTlhMTBkMmZjNGMyMDMzN2MifQ==" 
            }
            
        ]
    },
    {
        moduleTitle: "PISMENI - 02. If naredba",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod i parnost broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323D8UZp6MrrqSeFS2ZlM2CcJofN7XBVGiZgN9ROzHxjZLI&playbackInfo=eyJ2aWRlb0lkIjoiM2ZiYjRhYjc5MjU1NDY4MzhlZDZlZjg1M2YzNjQyNDQifQ==" 
            },
            { 
                id: "b2", 
                title: "Poređenje broja sa nulom", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Ltr7TK4xYSYooJ6eBIos5WctYFAfwqcCn7Lvwzdfgotqs&playbackInfo=eyJ2aWRlb0lkIjoiYmYwYWY3YjJjNmVkNGRjNDllMzI4ZWY2M2ZjYzQzNmYifQ==" 
            },
            { 
                id: "b3", 
                title: "Određivanje ocene na ispitu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232s9jbSqv8qgWTj37Jckis7zQSSMdEIkcpWM7DI9TTkf0ym&playbackInfo=eyJ2aWRlb0lkIjoiZDg1NzI4NTMwZmM5NGQzZWI2YjMzYjdjNzI1NmZlOGQifQ==" 
            },
            { 
                id: "b4", 
                title: "Najveći od tri broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32329FeCQJLDBfoqth3FajjKXPF6zSlENkdsaOUTQ9lim2ml7&playbackInfo=eyJ2aWRlb0lkIjoiMTFjNDJlNWUyMTMyNDE2ZDg2NWJjZTRhYTMxOTNmMGYifQ==" 
            },
            { 
                id: "b5", 
                title: "Koren i provera greške", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325Qh6SZyYaRgHuhNOgQwZLtIW1y34jlYv2qUmG9VVf8zGo&playbackInfo=eyJ2aWRlb0lkIjoiOTcwZDk0NWIyM2JmNGIyNTg1OTQ4NDA2NTEyZDdhYjAifQ==" 
            },
            { 
                id: "b6", 
                title: "Zbir ili razlika (uslovna)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232OaHaxP5Dz1FsS69zvUrYx27AhcfbxwCaXoXilbd53NP2U&playbackInfo=eyJ2aWRlb0lkIjoiMGI0ODg1NDA4MzI4NGJiMGI1N2Y3ZTYyMjQ0Mjk2YzUifQ==" 
            },
            { 
                id: "b7", 
                title: "Deljivost broja M sa N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232U7yUmFO8k5Qm4HB6Ynrx3qQCVfehyzTIi0tzv2oQqmwmN&playbackInfo=eyJ2aWRlb0lkIjoiNTdiMmUyNWRkYzIzNDU1M2JiOTc1NGQxODQxYWFlYjUifQ==" 
            },
            { 
                id: "b8", 
                title: "Provera Armstrongovog broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232G4aPSAh6WxpiJmhpJ7cGDNf2UHJ2NaQJHe0C7nSYjRhFZ&playbackInfo=eyJ2aWRlb0lkIjoiYjdlZGQzY2QyNDEzNDU2NGI2NjA1ZGRhNjE4YTYzYjMifQ==" 
            },
            { 
                id: "b9", 
                title: "Opisni prikaz ocena", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232gq0vAualegZ9CY8Y3MvkiSQztMWGE4iETwqYDo3pU84h7&playbackInfo=eyJ2aWRlb0lkIjoiZTkwOTg1NGU2MmU2NDdiODliZDczMjc2ZjdlOGI4NWYifQ==" 
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