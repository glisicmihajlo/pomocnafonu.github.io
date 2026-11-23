/*
 * Zajednička logika za stranice kurseva.
 *
 * Dugme za kupovinu:
 *   <button data-pay data-image="/images/uplatnica-1500.png" data-label="OIKT — 1. kolokvijum · 1.500 RSD"
 *           data-wa="Kupio/la sam OIKT 1. kolokvijum">…</button>
 *
 * Oznaka "već imaš kurs":
 *   <div id="owned-banner" hidden> … <a data-id="oikt-klk1" href="/oikt-klk1-player/">…</a> </div>
 *   Prikazuje se ako korisnik ima bar jedan od data-id kurseva; linkovi za nekupljene se sakrivaju.
 *   Element #hero-ctas se tada sakriva.
 */
(function () {
    var WA_NUMBER = '381659752402';

    var modal = document.getElementById('pay-modal');
    if (modal) {
        var closeBtn = document.getElementById('pay-close');
        var img = document.getElementById('pay-img');
        var sub = document.getElementById('pay-sub');
        var wa = document.getElementById('pay-wa');
        var lastFocus = null;

        var open = function (btn) {
            lastFocus = btn;
            if (btn.dataset.image) img.src = btn.dataset.image;
            if (btn.dataset.label) {
                sub.textContent = btn.dataset.label;
                img.alt = 'Uplatnica — ' + btn.dataset.label;
            }
            if (btn.dataset.wa) wa.href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(btn.dataset.wa);
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
            if (window.gtag) gtag('event', 'show_payment', { item: btn.dataset.label || '' });
        };

        var close = function () {
            modal.hidden = true;
            document.body.style.overflow = '';
            if (lastFocus) lastFocus.focus();
        };

        document.querySelectorAll('[data-pay]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                open(btn);
            });
        });
        closeBtn.addEventListener('click', close);
        modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
    }

    document.addEventListener('pnf:user', function (e) {
        var banner = document.getElementById('owned-banner');
        if (!banner) return;
        var owned = e.detail.kursevi || [];
        var any = false;
        banner.querySelectorAll('[data-id]').forEach(function (a) {
            var has = owned.indexOf(a.dataset.id) !== -1;
            a.hidden = !has;
            if (has) any = true;
        });
        if (!any) return;
        banner.hidden = false;
        var ctas = document.getElementById('hero-ctas');
        if (ctas) ctas.hidden = true;
    });
})();
