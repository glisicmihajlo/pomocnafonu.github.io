// Stranica: Prijemni — modal sa uplatnicom i oznaka ako korisnik već ima kurs
(function () {
    var modal = document.getElementById('pay-modal');
    var openBtn = document.getElementById('buy-btn');
    var closeBtn = document.getElementById('pay-close');
    var lastFocus = null;

    function open() {
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
        if (window.gtag) gtag('event', 'prijemni_show_payment');
    }

    function close() {
        modal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    openBtn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });

    // Ako je korisnik već kupio kurs, umesto "Kupi" prikaži "Nastavi gledanje"
    document.addEventListener('pnf:user', function (e) {
        if ((e.detail.kursevi || []).indexOf('prijemni') === -1) return;
        document.getElementById('owned-banner').hidden = false;
        document.getElementById('hero-ctas').hidden = true;
    });
})();
