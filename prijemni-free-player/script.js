const courseData = [
    { id: "oblast1", title: "1. Brojevni izrazi", url: "", isLocked: true },
    { id: "oblast2", title: "2. Proporcije i procenti", url: "", isLocked: true },
    { id: "oblast3", title: "3. Algebarski izrazi", url: "", isLocked: true },
    { 
        id: "oblast4", 
        title: "4. Kompleksni brojevi", 
        url: "https://www.youtube.com/embed/TVOJ_YOUTUBE_ID_OVDE",
        isLocked: false
    },
    { id: "oblast5", title: "5. Linearne jednačine i nejednačine", url: "", isLocked: true },
    { id: "oblast6", title: "6. Kvadratne jednačine", url: "", isLocked: true },
    { id: "oblast7", title: "7. Kvadratna funkcija", url: "", isLocked: true },
    { id: "oblast8", title: "8. Iracionalne jednačine", url: "", isLocked: true },
    { id: "oblast9", title: "9. Eksponencijalne jednačine", url: "", isLocked: true },
    { id: "oblast10", title: "10. Logaritmi", url: "", isLocked: true },
    { id: "oblast11", title: "11. Trigonometrija", url: "", isLocked: true },
    { id: "oblast12", title: "12. Analitička geometrija", url: "", isLocked: true },
    { id: "oblast13", title: "13. Planimetrija", url: "", isLocked: true },
    { id: "oblast14", title: "14. Stereometrija", url: "", isLocked: true },
    { id: "oblast15", title: "15. Aritmetički i geometrijski niz", url: "", isLocked: true },
    { id: "oblast16", title: "16. Binomna formula", url: "", isLocked: true },
    { id: "oblast17", title: "17. Kombinatorika", url: "", isLocked: true },
    { id: "oblast18", title: "18. Polinomi", url: "", isLocked: true }
];

const courseList = document.getElementById('course-list');
const vdoPlayer = document.getElementById('vdo-player');
const lockedOverlay = document.getElementById('locked-overlay');
const lessonTitle = document.getElementById('lesson-title');
const videoContainer = document.getElementById('video-container');

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

function renderLessons() {
    courseList.innerHTML = '';
    
    courseData.forEach((lesson) => {
        const btn = document.createElement('div');
        btn.className = `lesson-btn ${lesson.isLocked ? 'locked' : ''}`;
        
        const leftIcon = lesson.isLocked ? 'fa-video' : 'fa-play-circle';
        const rightIconHtml = lesson.isLocked ? `<i class="fas fa-lock lock-icon-right"></i>` : '';

        btn.innerHTML = `
            <i class="fas ${leftIcon} status-icon"></i>
            <span>${lesson.title}</span>
            ${rightIconHtml}
        `;

        btn.onclick = () => selectLesson(lesson, btn);
        courseList.appendChild(btn);
    });
}

function selectLesson(lesson, clickedBtn) {
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active-lesson'));
    
    if (clickedBtn) {
        clickedBtn.classList.add('active-lesson');
    }

    lessonTitle.textContent = lesson.title;

    if (lesson.isLocked) {
        vdoPlayer.style.display = 'none';
        vdoPlayer.src = ''; 
        lockedOverlay.style.display = 'flex';
        videoContainer.classList.add('is-locked');
    } else {
        lockedOverlay.style.display = 'none';
        vdoPlayer.style.display = 'block';
        
        // Automatski postavlja link (bilo da je YouTube embed ili VdoCipher)
        vdoPlayer.src = lesson.url;
        
        videoContainer.classList.remove('is-locked');
    }

    if(window.innerWidth <= 992) {
        sidebar.classList.remove('open');
    }
}

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Učitavanje liste oblasti
    renderLessons();
    
    // Pronađi prvu lekciju koja NIJE zaključana (u ovom slučaju kompleksni brojevi, indeks 3)
    const firstUnlockedIndex = courseData.findIndex(lesson => !lesson.isLocked);
    const targetIndex = firstUnlockedIndex !== -1 ? firstUnlockedIndex : 0;
    
    // Selektuj je i učitaj automatski
    const targetLessonBtn = courseList.children[targetIndex];
    if (targetLessonBtn) {
        selectLesson(courseData[targetIndex], targetLessonBtn);
    }

    // 2. Tvoja logika za MODAL ZA UPLATU
    const buyTriggers = document.querySelectorAll('.buy-trigger');
    const modal = document.getElementById('payment-modal');
    const modalImg = document.querySelector('.modal-img');
    const closeBtn = document.querySelector('.close-modal');

    buyTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) { 
            e.preventDefault(); 
            const newImageSrc = this.getAttribute('data-image');
            if(newImageSrc) {
                modalImg.src = newImageSrc;
            }
            modal.style.display = 'flex';
        });
    });

    // Zatvaranje modala na X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Zatvaranje klika van modala
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});