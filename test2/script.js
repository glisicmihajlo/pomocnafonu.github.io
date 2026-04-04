document.addEventListener('DOMContentLoaded', () => {
    // 1. REVEAL ANIMACIJE
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. VIDEO SWITCHER
    const videoBtns = document.querySelectorAll('.v-item');
    const iframe = document.getElementById('main-video');

    videoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            videoBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            iframe.src = btn.getAttribute('data-src');
        });
    });

    // 3. FAIL-SAFE: Osiguranje da je hero vidljiv odmah
    setTimeout(() => {
        const hero = document.querySelector('.hero-section');
        if (hero) hero.classList.add('active');
    }, 100);
});