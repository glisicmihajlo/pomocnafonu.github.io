/* Zajednički UI za početnu i stranicu kurseva: meni, padajući meni, animacije. */
(function () {
    var nav = document.getElementById('site-nav');
    var burger = document.getElementById('nav-burger');
    var dd = document.getElementById('nav-dd');


    if (nav) {
        var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (nav && burger) {
        var setOpen = function (open) {
            nav.classList.toggle('menu-open', open);
            burger.setAttribute('aria-expanded', open);
            burger.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
            burger.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
        };
        burger.addEventListener('click', function () { setOpen(!nav.classList.contains('menu-open')); });
        nav.querySelectorAll('.nav-links a').forEach(function (a) {
            a.addEventListener('click', function () { setOpen(false); });
        });
    }

    if (dd) {
        var ddBtn = dd.querySelector('button');
        var closeDd = function () {
            dd.classList.remove('open');
            ddBtn.setAttribute('aria-expanded', 'false');
        };
        ddBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = dd.classList.toggle('open');
            ddBtn.setAttribute('aria-expanded', open);
        });
        document.addEventListener('click', closeDd);
        // Zatvori kad fokus (Tab) izađe iz padajućeg menija
        dd.addEventListener('focusout', function (e) {
            if (!dd.contains(e.relatedTarget)) closeDd();
        });
    }

    // Escape zatvara padajući meni, pa mobilni meni, i vraća fokus na dugme koje ga je otvorilo
    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        if (dd && dd.classList.contains('open')) {
            dd.classList.remove('open');
            var b = dd.querySelector('button');
            b.setAttribute('aria-expanded', 'false');
            b.focus();
        } else if (nav && burger && nav.classList.contains('menu-open')) {
            burger.click();
            burger.focus();
        }
    });

    var items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('in'); });
        return;
    }
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
})();
