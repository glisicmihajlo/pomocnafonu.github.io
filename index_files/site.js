/* Zajednički UI za početnu i stranicu kurseva: meni, padajući meni, animacije. */
(function () {
    var nav = document.getElementById('site-nav');
    var burger = document.getElementById('nav-burger');
    var dd = document.getElementById('nav-dd');
    var yearEl = document.getElementById('year');

    if (yearEl) yearEl.textContent = new Date().getFullYear();

    if (nav) {
        var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    if (nav && burger) {
        var setOpen = function (open) {
            nav.classList.toggle('menu-open', open);
            burger.setAttribute('aria-expanded', open);
            burger.innerHTML = open ? '<i class="fas fa-xmark"></i>' : '<i class="fas fa-bars"></i>';
        };
        burger.addEventListener('click', function () { setOpen(!nav.classList.contains('menu-open')); });
        nav.querySelectorAll('.nav-links a').forEach(function (a) {
            a.addEventListener('click', function () { setOpen(false); });
        });
    }

    if (dd) {
        var ddBtn = dd.querySelector('button');
        ddBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var open = dd.classList.toggle('open');
            ddBtn.setAttribute('aria-expanded', open);
        });
        document.addEventListener('click', function () { dd.classList.remove('open'); });
    }

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
