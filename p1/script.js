document.addEventListener('DOMContentLoaded', () => {
    const buyTriggers = document.querySelectorAll('.buy-trigger');
const modal = document.getElementById('payment-modal');
const modalImg = document.querySelector('.modal-img');
const closeBtn = document.querySelector('.close-modal');

buyTriggers.forEach(trigger => {
    // DODATO 'e' OVDE U ZAGRADU
    trigger.addEventListener('click', function(e) { 
        // Sada 'e' radi i sprečava skok na vrh
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

    // Reveal animacija
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});