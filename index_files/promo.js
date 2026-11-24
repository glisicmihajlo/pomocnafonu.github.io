/*
 * Akcija "Crni petak" — sama se uključuje i isključuje po datumima ispod.
 * Cene se spuštaju na iznose za koje već postoje uplatnice (images/uplatnica-XXXX.png).
 * Posle kraja akcije ovaj fajl ne radi ništa (može se obrisati zajedno sa <script> tagovima).
 */
(function () {
    var START = Date.parse('2026-11-24T00:00:00+01:00');
    var END = Date.parse('2026-11-27T23:59:59+01:00');
    var NAME = 'Crni petak';

    // redovna cena -> akcijska cena
    var PRICES = {
        1500: 1200, 1800: 1500, 2000: 1500, 2200: 1800, 2400: 2000, 2500: 2000,
        2700: 2200, 3000: 2400, 3500: 2700, 3800: 3000, 4000: 3000, 5000: 4000,
        15000: 12000
    };

    var now = Date.now();
    if (now < START || now > END) return;

    var fmt = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); };

    /* ---------- Cene na stranicama kurseva ---------- */
    document.querySelectorAll('[data-pay]').forEach(function (btn) {
        var m = /uplatnica-(\d+)\.png/.exec(btn.dataset.image || '');
        if (!m) return;
        var regular = Number(m[1]);
        var sale = PRICES[regular];
        if (!sale) return;

        btn.dataset.image = '/images/uplatnica-' + sale + '.png';
        if (btn.dataset.label) {
            btn.dataset.label = btn.dataset.label.replace(fmt(regular) + ' RSD', fmt(sale) + ' RSD (' + NAME + ')');
        }
        if (btn.dataset.wa) btn.dataset.wa += ' (' + NAME + ')';

        var tier = btn.closest('.tier, .price-card');
        var price = tier && tier.querySelector('.price');
        if (!price) return;
        price.innerHTML = '<span class="old">' + fmt(regular) + '</span>' + fmt(sale) + ' <small>RSD</small>';

        var save = tier.querySelector('.save');
        if (!save) {
            save = document.createElement('span');
            save.className = 'save';
            price.insertAdjacentElement('afterend', save);
        }
        save.textContent = NAME + ' — uštediš ' + fmt(regular - sale) + ' RSD';
        save.classList.add('promo-save');

        var top = tier.querySelector('.tier-top');
        if (top && !top.querySelector('.label')) {
            top.innerHTML = '<span class="label promo-label">' + NAME + '</span>';
        }
    });

    // Tekst "Uplati X RSD" u koracima kupovine
    document.querySelectorAll('b').forEach(function (b) {
        var m = /^Uplati ([\d.]+) RSD$/.exec(b.textContent.trim());
        var sale = m && PRICES[Number(m[1].replace(/\./g, ''))];
        if (sale) b.textContent = 'Uplati ' + fmt(sale) + ' RSD';
    });

    /* ---------- Traka sa odbrojavanjem (dole, ne pomera sadržaj) ---------- */
    var css = document.createElement('style');
    css.textContent =
        '.promo-bar{position:fixed;left:12px;right:12px;bottom:12px;z-index:150;display:flex;align-items:center;gap:12px;' +
        'max-width:720px;margin:0 auto;padding:12px 12px 12px 18px;border-radius:16px;background:#000;color:#f6f1ea;' +
        'border:1px solid #FFC93C;box-shadow:0 10px 40px rgba(0,0,0,.5);font:600 .92rem/1.35 "Plus Jakarta Sans",system-ui,sans-serif}' +
        '.promo-bar p{margin:0;flex:1;min-width:0}' +
        '.promo-bar b{color:#FFC93C}' +
        '.promo-bar .promo-time{display:block;font-weight:500;font-size:.8rem;color:#bdb5aa;font-variant-numeric:tabular-nums}' +
        '.promo-bar a{flex:none;padding:10px 16px;border-radius:10px;background:#FFC93C;color:#000;font-weight:800;text-decoration:none;white-space:nowrap}' +
        '.promo-bar button{flex:none;width:36px;height:36px;border:0;border-radius:10px;background:transparent;color:#bdb5aa;font-size:1.3rem;cursor:pointer}' +
        '.promo-bar button:hover{color:#fff;background:rgba(255,255,255,.08)}' +
        '.promo-label{background:#000!important;color:#FFC93C!important;border:1px solid #FFC93C}' +
        '.promo-save{color:#FFC93C!important}' +
        '.price-card .old{font-size:1.1rem;font-weight:600;color:#8a8178;text-decoration:line-through;margin-right:8px;letter-spacing:0}' +
        '.price-card .save{display:inline-block;margin-top:8px;font-size:.85rem;font-weight:700}' +
        'body.has-promo{padding-bottom:96px}' +
        '@media (max-width:520px){.promo-bar{font-size:.85rem;left:8px;right:8px;bottom:8px;padding:10px 8px 10px 14px}.promo-bar a{padding:9px 12px}}';
    document.head.appendChild(css);

    try { if (sessionStorage.getItem('promoClosed') === String(END)) return; } catch (e) { /* storage blokiran */ }


    var onCourse = !!document.getElementById('cena');
    var bar = document.createElement('div');
    bar.className = 'promo-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Akcija ' + NAME);
    bar.innerHTML =
        '<p>🖤 <b>' + NAME + ':</b> do −25% na sve kurseve za FON' +
        '<span class="promo-time">Još <span id="promo-left"></span></span></p>' +
        '<a href="' + (onCourse ? '#cena' : '/kursevi') + '">' + (onCourse ? 'Vidi cene' : 'Vidi kurseve') + '</a>' +
        '<button type="button" aria-label="Zatvori obaveštenje o akciji">×</button>';
    document.body.appendChild(bar);
    document.body.classList.add('has-promo');

    var left = document.getElementById('promo-left');
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
        var s = Math.max(0, Math.floor((END - Date.now()) / 1000));
        if (s === 0) { bar.remove(); document.body.classList.remove('has-promo'); return false; }
        var d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), mi = Math.floor(s % 3600 / 60), se = s % 60;
        left.textContent = (d ? d + (d === 1 ? ' dan ' : ' dana ') : '') + pad(h) + ':' + pad(mi) + ':' + pad(se);
        return true;
    };
    tick();
    var timer = setInterval(function () { if (!tick()) clearInterval(timer); }, 1000);

    bar.querySelector('button').addEventListener('click', function () {
        clearInterval(timer);
        bar.remove();
        document.body.classList.remove('has-promo');
        try { sessionStorage.setItem('promoClosed', String(END)); } catch (e) { /* ignore */ }
    });
})();
