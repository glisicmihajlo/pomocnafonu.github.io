/*
 * Zajednički player za sve kurseve (plaćene i besplatne).
 *
 * Svaki folder *-player ima isti index.html i svoj script.js:
 *
 *   import { startPlayer } from "/index_files/player.js";
 *   startPlayer({
 *       mode: "paid",                 // "paid" = zaključan (Firebase + VdoCipher), "free" = javan (YouTube)
 *       courseId: "oikt-klk1",        // isto kao u bazi (users/{uid}.kursevi i completedLessons)
 *       title: "OIKT — 1. kolokvijum",
 *       coursePage: "/oikt/",         // stranica kursa (za nekupljen pristup i dugme "Kupi")
 *       modules: [ { moduleTitle, lessons: [ { id, title, vdoId | url | youtube, isLocked } ] } ]
 *       // ili lessons: [ ... ] za kurs bez modula (svaka oblast jedan video)
 *   });
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { guardDevice, MAX_DEVICES } from "/index_files/devices.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.appspot.com",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a",
    measurementId: "G-768582D9M9"
};

/* ------------------------------------------------------------------ */
/*  Plejer: naše kontrole preko VdoCipher-a (računar i telefon)         */
/* ------------------------------------------------------------------ */
// VdoCipher se učitava bez svojih kontrola (controls=off), a naše kontrole
// upravljaju videom preko VdoCipher Player API-ja (api.js).
//   - Računar: mejl ucrtava VdoCipher u sam video (annotate u functions/index.js),
//     to ne zavisi od kontrola i ostaje kao ranije.
//   - Telefon: VdoCipher-ov watermark tu ne radi, pa je mejl HTML sloj preko
//     videa koji se pomera na svakih 5 s. Sloj preko iframe-a prima sve dodire,
//     pa iPhone nikad ne otvara svoj plejer (u kome se ništa sa stranice ne vidi).
//   - "Ceo ekran" stavlja ceo okvir (video + kontrole + mejl) preko ekrana.

const IS_TOUCH = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const WM_MOVE_MS = 5000;
const CHROME_HIDE_MS = 3000;
const SEEK_STEP = 10;
const SPEEDS = [1, 1.25, 1.5, 1.75, 2, 0.75];

// iOS Safari sam pretvara mejl u link, što menja watermark
if (IS_TOUCH && !document.querySelector('meta[name="format-detection"]')) {
    const meta = document.createElement("meta");
    meta.name = "format-detection";
    meta.content = "telephone=no, date=no, email=no, address=no";
    document.head.append(meta);
}

let vdoApi = null;
function loadVdoApi() {
    if (!vdoApi) {
        vdoApi = new Promise((resolve, reject) => {
            if (window.VdoPlayer) return resolve(window.VdoPlayer);
            const s = document.createElement("script");
            s.src = "https://player.vdocipher.com/v2/api.js";
            s.async = true;
            s.onload = () => window.VdoPlayer ? resolve(window.VdoPlayer) : reject(new Error("VdoPlayer nije učitan"));
            s.onerror = () => reject(new Error("VdoCipher API nije učitan"));
            document.head.append(s);
        }).catch(err => { vdoApi = null; throw err; });
    }
    return vdoApi;
}

function formatTime(sec) {
    const s = Math.max(0, Math.floor(Number(sec) || 0));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = String(s % 60).padStart(2, "0");
    return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

// Podešavanja plejera koja važe za sve kurseve
const PREFS_KEY = "playerPrefs";
const NEXT_COUNTDOWN_S = 5;
function readPrefs() {
    let p = {};
    try { p = JSON.parse(localStorage.getItem(PREFS_KEY)) || {}; } catch { /* prazno */ }
    return {
        autoplay: p.autoplay !== false,
        speedIdx: Number.isInteger(p.speedIdx) && SPEEDS[p.speedIdx] ? p.speedIdx : 0,
        volume: typeof p.volume === "number" && p.volume >= 0 && p.volume <= 1 ? p.volume : 1,
        muted: p.muted === true
    };
}
function savePrefs(p) {
    try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch { /* pun storage */ }
}

const ALLOW_NATIVE = "autoplay; encrypted-media; fullscreen";
const ALLOW_CUSTOM = "autoplay; encrypted-media";
const FS_ATTRS = ["allowfullscreen", "webkitallowfullscreen", "mozallowfullscreen"];

function customPlayer(frame, iframe, { watermark, onPrev, onNext, onEnded, onPosition }) {
    const ui = document.createElement("div");
    ui.className = "vc";
    ui.classList.toggle("is-touch", IS_TOUCH);
    ui.hidden = true;
    ui.innerHTML = `
        <div class="vc-gesture"></div>
        <div class="vc-chrome">
            <div class="vc-shade"></div>
            <div class="vc-top">
                <button type="button" class="vc-switch" role="switch" aria-checked="true" data-act="autoplay" aria-label="Automatski pusti sledeću lekciju" title="Automatski pusti sledeću lekciju">
                    <span class="vc-switch-track"><span class="vc-switch-knob"><i class="fas fa-play"></i></span></span>
                </button>
            </div>
            <div class="vc-center">
                <button type="button" class="vc-btn vc-nav" data-act="prev" aria-label="Prethodna lekcija" title="Prethodna lekcija (Shift+P)"><i class="fas fa-backward-step"></i></button>
                <button type="button" class="vc-btn vc-skip" data-act="back" aria-label="${SEEK_STEP} sekundi nazad" title="${SEEK_STEP} s nazad (J)"><i class="fas fa-rotate-left"></i><span>${SEEK_STEP}</span></button>
                <button type="button" class="vc-btn vc-play" data-act="play" aria-label="Pusti" title="Pusti / pauza (razmak)"><i class="fas fa-play"></i></button>
                <button type="button" class="vc-btn vc-skip" data-act="fwd" aria-label="${SEEK_STEP} sekundi napred" title="${SEEK_STEP} s napred (L)"><i class="fas fa-rotate-right"></i><span>${SEEK_STEP}</span></button>
                <button type="button" class="vc-btn vc-nav" data-act="next" aria-label="Sledeća lekcija" title="Sledeća lekcija (Shift+N)"><i class="fas fa-forward-step"></i></button>
            </div>
            <div class="vc-bottom">
                <input type="range" class="vc-seek" min="0" max="0" step="0.1" value="0" aria-label="Pozicija u videu">
                <div class="vc-row">
                    <span class="vc-time">0:00 / 0:00</span>
                    <button type="button" class="vc-btn vc-desktop" data-act="mute" aria-label="Isključi zvuk" title="Zvuk (M)"><i class="fas fa-volume-high"></i></button>
                    <input type="range" class="vc-volume vc-desktop" min="0" max="1" step="0.05" value="1" aria-label="Jačina zvuka">
                    <button type="button" class="vc-btn" data-act="quality" aria-label="Kvalitet" title="Kvalitet" hidden><i class="fas fa-gear"></i></button>
                    <button type="button" class="vc-btn vc-speed" data-act="speed" aria-label="Brzina" title="Brzina">1x</button>
                    <button type="button" class="vc-btn" data-act="fs" aria-label="Ceo ekran" title="Ceo ekran (F)"><i class="fas fa-expand"></i></button>
                </div>
            </div>
            <div class="vc-menu" role="menu" aria-label="Kvalitet" hidden></div>
        </div>
        <div class="vc-next" hidden>
            <div class="vc-next-label">Sledeća lekcija za <b class="vc-next-count">${NEXT_COUNTDOWN_S}</b> s</div>
            <div class="vc-next-title"></div>
            <div class="vc-next-actions">
                <button type="button" class="vc-pill vc-pill-primary" data-act="next-now"><i class="fas fa-play"></i> Pusti odmah</button>
                <button type="button" class="vc-pill" data-act="next-cancel">Otkaži</button>
            </div>
        </div>
        <div class="vc-hud" aria-hidden="true"></div>`;
    frame.append(ui);

    const q = sel => ui.querySelector(sel);
    const gesture = q(".vc-gesture");
    const playBtn = q(".vc-play");
    const seek = q(".vc-seek");
    const timeEl = q(".vc-time");
    const muteBtn = q('[data-act="mute"]');
    const vol = q(".vc-volume");
    const qualityBtn = q('[data-act="quality"]');
    const speedBtn = q(".vc-speed");
    const fsBtn = q('[data-act="fs"]');
    const menu = q(".vc-menu");
    const hud = q(".vc-hud");
    const autoBtn = q('[data-act="autoplay"]');
    const prevBtn = q('[data-act="prev"]');
    const nextBtn = q('[data-act="next"]');
    const nextBox = q(".vc-next");
    const nextCount = q(".vc-next-count");
    const nextTitleEl = q(".vc-next-title");

    const prefs = readPrefs();

    let vp = null;          // VdoCipher player instanca
    let gen = 0;            // menja se pri svakom novom videu
    let email = "";
    let playing = false;
    let ended = false;
    let seeking = false;
    let duration = 0;
    let speedIdx = prefs.speedIdx;
    let volume = prefs.volume;
    let muted = prefs.muted;
    let opts = {};          // { autoplay, resumeAt, hasPrev, hasNext, nextTitle } za trenutni video
    let started = false;    // da li su brzina/zvuk/pozicija primenjeni na ovaj video
    let lastSaved = 0;
    let countdownTimer = null;
    let qualities = [];     // lista iz VdoCipher API-ja, redom kao u meniju
    let moveTimer = null;
    let hideTimer = null;
    let hudTimer = null;

    /* ---------- watermark (samo telefon) ---------- */

    let wm = null;
    if (watermark) {
        wm = document.createElement("div");
        wm.className = "video-watermark";
        wm.setAttribute("aria-hidden", "true");
        wm.setAttribute("translate", "no");
        wm.hidden = true;
        frame.append(wm);

        // Ako neko ukloni, sakrije ili promeni sloj, vrati ga
        const guard = () => {
            if (!email) return;
            if (wm.parentNode !== frame) frame.append(wm);
            if (wm.textContent !== email) wm.textContent = email;
            if (wm.hidden) wm.hidden = false;
        };
        new MutationObserver(guard).observe(frame, { childList: true });
        new MutationObserver(guard).observe(wm, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["hidden", "class"] });
    }

    function move() {
        if (!wm) return;
        wm.classList.add("is-moving");
        setTimeout(() => {
            const maxX = Math.max(0, frame.clientWidth - wm.offsetWidth - 12);
            const maxY = Math.max(0, frame.clientHeight - wm.offsetHeight - 12);
            wm.style.left = `${6 + Math.random() * maxX}px`;
            wm.style.top = `${6 + Math.random() * maxY}px`;
            wm.classList.remove("is-moving");
        }, 400);
    }

    /* ---------- prikaz kontrola ---------- */

    function idle() {
        clearTimeout(hideTimer);
        ui.classList.add("is-idle");
    }

    function showChrome() {
        ui.classList.remove("is-idle");
        clearTimeout(hideTimer);
        if (playing && menu.hidden && !seeking) hideTimer = setTimeout(idle, CHROME_HIDE_MS);
    }

    function flash(text) {
        hud.textContent = text;
        hud.classList.add("is-on");
        clearTimeout(hudTimer);
        hudTimer = setTimeout(() => hud.classList.remove("is-on"), 700);
    }

    function setPlaying(on) {
        playing = on;
        const icon = on ? "fa-pause" : (ended ? "fa-rotate-right" : "fa-play");
        playBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        playBtn.setAttribute("aria-label", on ? "Pauza" : "Pusti");
        showChrome();
    }

    function renderTime(t) {
        const pct = duration ? Math.min(100, (t / duration) * 100) : 0;
        seek.style.setProperty("--p", `${pct}%`);
        timeEl.textContent = `${formatTime(t)} / ${formatTime(duration)}`;
    }

    function renderVolume() {
        const level = muted ? 0 : volume;
        const icon = level === 0 ? "fa-volume-xmark" : level < 0.5 ? "fa-volume-low" : "fa-volume-high";
        muteBtn.innerHTML = `<i class="fas ${icon}"></i>`;
        muteBtn.setAttribute("aria-label", level === 0 ? "Uključi zvuk" : "Isključi zvuk");
        vol.value = level;
        vol.style.setProperty("--p", `${level * 100}%`);
    }

    /* ---------- upravljanje videom ---------- */

    const video = () => vp && vp.video;

    function togglePlay() {
        const v = video();
        if (!v) return;
        if (playing) v.pause();
        else {
            if (ended) v.currentTime = 0;
            v.play();
        }
    }

    function seekBy(delta) {
        const v = video();
        if (!v || !duration) return;
        const t = Math.min(duration, Math.max(0, (Number(v.currentTime) || 0) + delta));
        v.currentTime = t;
        seek.value = t;
        renderTime(t);
        flash(delta > 0 ? `+${delta} s` : `−${-delta} s`);
    }

    function persist() {
        savePrefs({ autoplay: prefs.autoplay, speedIdx, volume, muted });
    }

    function cycleSpeed() {
        const v = video();
        if (!v) return;
        speedIdx = (speedIdx + 1) % SPEEDS.length;
        v.playbackRate = SPEEDS[speedIdx];
        speedBtn.textContent = `${SPEEDS[speedIdx]}x`;
        flash(`${SPEEDS[speedIdx]}x`);
        persist();
    }

    function toggleMute() {
        const v = video();
        if (!v) return;
        muted = !muted;
        if (!muted && volume === 0) { volume = 0.5; v.volume = volume; }
        v.muted = muted;
        renderVolume();
        flash(muted ? "Zvuk isključen" : "Zvuk uključen");
        persist();
    }

    /* ---------- autoplay sledeće lekcije ---------- */

    function renderAutoplay() {
        autoBtn.setAttribute("aria-checked", String(prefs.autoplay));
        autoBtn.classList.toggle("is-on", prefs.autoplay);
        autoBtn.title = prefs.autoplay ? "Automatsko puštanje sledeće lekcije je uključeno" : "Automatsko puštanje sledeće lekcije je isključeno";
    }

    function toggleAutoplay() {
        prefs.autoplay = !prefs.autoplay;
        renderAutoplay();
        persist();
        flash(prefs.autoplay ? "Autoplay uključen" : "Autoplay isključen");
        if (!prefs.autoplay) cancelCountdown();
    }

    function cancelCountdown() {
        clearInterval(countdownTimer);
        countdownTimer = null;
        nextBox.hidden = true;
    }

    function startCountdown() {
        cancelCountdown();
        let left = NEXT_COUNTDOWN_S;
        nextCount.textContent = left;
        nextTitleEl.textContent = opts.nextTitle || "";
        nextBox.hidden = false;
        countdownTimer = setInterval(() => {
            left -= 1;
            nextCount.textContent = Math.max(0, left);
            if (left <= 0) { cancelCountdown(); onNext?.(); }
        }, 1000);
    }

    function renderNav() {
        prevBtn.disabled = !opts.hasPrev;
        nextBtn.disabled = !opts.hasNext;
    }

    /* ---------- kvalitet ---------- */
    // Dugme se vidi samo ako VdoCipher ponudi više od jednog kvaliteta.

    function qualityLabel(item) {
        if (!item) return "";
        const h = Number(item.height) || Number(item.resolution) || 0;
        if (h) return `${h}p`;
        if (item.label) return String(item.label);
        const b = Number(item.bitrate) || Number(item.bandwidth) || 0;
        return b ? `${Math.round(b / 1000)} kbps` : `#${item.id}`;
    }

    async function readQualities() {
        const api = vp && vp.api;
        if (!api) return null;
        try {
            const info = await api.getVideoQualities();
            const rank = item => Number(item.height) || Number(item.bitrate) || Number(item.bandwidth) || 0;
            qualities = (info && Array.isArray(info.qualities) ? info.qualities : []).slice().sort((a, b) => rank(b) - rank(a));
            qualityBtn.hidden = qualities.length < 2;
            return info;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    function closeMenu() {
        menu.hidden = true;
        showChrome();
    }

    async function openQualityMenu() {
        const info = await readQualities();
        if (!info || qualities.length < 2) { flash("Drugi kvaliteti nisu dostupni"); return; }

        const labels = qualities.map(qualityLabel);
        const auto = Boolean(info.adaptive);
        menu.innerHTML = `<button type="button" role="menuitemradio" data-q="auto" class="${auto ? "is-active" : ""}">Auto</button>` +
            qualities.map((item, i) => {
                // Ista rezolucija sa više bitrate-ova: dodaj kbps da se razlikuju
                const dup = labels.filter(l => l === labels[i]).length > 1;
                const b = Number(item.bitrate) || Number(item.bandwidth) || 0;
                const text = dup && b ? `${labels[i]} · ${Math.round(b / 1000)} kbps` : labels[i];
                const active = !auto && item.active;
                return `<button type="button" role="menuitemradio" data-q="${i}" class="${active ? "is-active" : ""}">${text}</button>`;
            }).join("");
        menu.hidden = false;
        clearTimeout(hideTimer);
    }

    async function pickQuality(value) {
        const api = vp && vp.api;
        menu.hidden = true;
        if (!api) return;
        try {
            if (value === "auto") {
                await api.enableAdaptiveVideo();
                flash("Kvalitet: Auto");
            } else {
                const item = qualities[Number(value)];
                if (!item) return;
                await api.setVideoQuality(item.id);
                flash(`Kvalitet: ${qualityLabel(item)}`);
            }
        } catch (err) {
            console.error(err);
            flash("Kvalitet nije promenjen");
        }
        showChrome();
    }

    /* ---------- događaji videa ---------- */

    function bind(inst) {
        const v = inst.video;
        const mine = fn => (...args) => { if (inst === vp) fn(...args); };
        // Prvi put kad je trajanje poznato: brzina, zvuk, nastavak i autoplay
        const start = () => {
            if (started) return;
            started = true;
            if (SPEEDS[speedIdx] !== 1) v.playbackRate = SPEEDS[speedIdx];
            v.volume = volume;
            v.muted = muted;
            const at = Number(opts.resumeAt) || 0;
            if (at > 10 && at < duration - 15) {
                v.currentTime = at;
                seek.value = at;
                renderTime(at);
                lastSaved = at;
                flash(`Nastavljeno od ${formatTime(at)}`);
            }
            if (opts.autoplay && !playing) v.play();
        };
        const readDuration = mine(() => {
            const d = Number(v.duration);
            if (d && isFinite(d)) {
                duration = d;
                seek.max = d;
                renderTime(Number(v.currentTime) || 0);
                start();
            }
        });
        const savePosition = () => {
            if (ui.hidden || !started) return;   // događaj starog videa posle promene lekcije
            const t = Number(v.currentTime) || 0;
            lastSaved = t;
            if (duration) onPosition?.(t, duration);
        };
        v.addEventListener("loadedmetadata", readDuration);
        v.addEventListener("durationchange", readDuration);
        v.addEventListener("play", mine(() => { ended = false; cancelCountdown(); setPlaying(true); }));
        v.addEventListener("playing", mine(() => {
            ui.classList.remove("is-buffering");
            setPlaying(true);
            if (qualities.length < 2) readQualities();
        }));
        v.addEventListener("pause", mine(() => { setPlaying(false); if (!ended) savePosition(); }));
        v.addEventListener("ended", mine(() => {
            if (ui.hidden || !started) return;
            ended = true;
            setPlaying(false);
            onEnded?.();
            if (prefs.autoplay && opts.hasNext) startCountdown();
        }));
        v.addEventListener("waiting", mine(() => ui.classList.add("is-buffering")));
        v.addEventListener("volumechange", mine(() => {
            const level = Number(v.volume);
            if (isFinite(level)) volume = level;
            muted = Boolean(v.muted);
            renderVolume();
        }));
        v.addEventListener("timeupdate", mine(() => {
            if (!duration) readDuration();
            if (seeking) return;
            const t = Number(v.currentTime) || 0;
            seek.value = t;
            renderTime(t);
            if (Math.abs(t - lastSaved) >= 5) savePosition();
        }));
    }

    /* ---------- klik / dodir na video ---------- */

    let lastTap = 0;
    let lastSide = 0;
    let tapTimer = null;

    if (IS_TOUCH) {
        // Jedan dodir: pokaži/sakrij kontrole. Dupli dodir levo/desno: ±10 s.
        gesture.addEventListener("click", e => {
            if (!menu.hidden) { closeMenu(); return; }
            const rect = gesture.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const side = x < 0.35 ? -1 : x > 0.65 ? 1 : 0;
            const now = Date.now();
            if (now - lastTap < 300 && side && side === lastSide) {
                clearTimeout(tapTimer);
                seekBy(side * SEEK_STEP);
                showChrome();
                lastTap = 0;
                return;
            }
            lastTap = now;
            lastSide = side;
            clearTimeout(tapTimer);
            tapTimer = setTimeout(() => {
                if (ui.classList.contains("is-idle")) showChrome();
                else if (playing) idle();
                else showChrome();
            }, side ? 300 : 0);
        });
    } else {
        // Klik: pusti/pauza. Dupli klik: ceo ekran. Kontrole se vide dok se miš pomera.
        gesture.addEventListener("click", () => {
            if (!menu.hidden) { closeMenu(); return; }
            togglePlay();
        });
        gesture.addEventListener("dblclick", () => toggleFull());
        frame.addEventListener("mousemove", () => { if (!ui.hidden) showChrome(); });
        frame.addEventListener("mouseleave", () => { if (playing && menu.hidden && !seeking) idle(); });
    }

    ui.addEventListener("click", e => {
        const opt = e.target.closest(".vc-menu [data-q]");
        if (opt) { pickQuality(opt.dataset.q); return; }
        const btn = e.target.closest("[data-act]");
        if (!btn) return;
        const act = btn.dataset.act;
        if (act === "quality") {
            if (menu.hidden) openQualityMenu();
            else closeMenu();
            return;
        }
        if (!menu.hidden) menu.hidden = true;
        if (act === "play") togglePlay();
        else if (act === "back") seekBy(-SEEK_STEP);
        else if (act === "fwd") seekBy(SEEK_STEP);
        else if (act === "prev") { if (opts.hasPrev) onPrev?.(); }
        else if (act === "next") { if (opts.hasNext) onNext?.(); }
        else if (act === "speed") cycleSpeed();
        else if (act === "mute") toggleMute();
        else if (act === "fs") toggleFull();
        else if (act === "autoplay") toggleAutoplay();
        else if (act === "next-now") { cancelCountdown(); onNext?.(); return; }
        else if (act === "next-cancel") { cancelCountdown(); }
        showChrome();
    });

    seek.addEventListener("input", () => {
        seeking = true;
        clearTimeout(hideTimer);
        renderTime(Number(seek.value));
    });
    seek.addEventListener("change", () => {
        const v = video();
        if (v) v.currentTime = Number(seek.value);
        seeking = false;
        showChrome();
    });

    vol.addEventListener("input", () => {
        const v = video();
        volume = Number(vol.value);
        muted = volume === 0;
        if (v) { v.volume = volume; v.muted = muted; }
        renderVolume();
        showChrome();
        persist();
    });

    /* ---------- tastatura (računar) ---------- */
    // Strelice levo/desno ostaju za prethodnu/sledeću lekciju, C za završetak lekcije.

    document.addEventListener("keydown", e => {
        if (ui.hidden || e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target;
        const k = e.key.toLowerCase();
        if (t && (t.isContentEditable || /^(TEXTAREA|SELECT)$/.test(t.tagName))) return;
        if (t && t.tagName === "INPUT" && t !== seek && t !== vol) return;
        if (t && t.tagName === "BUTTON" && (k === " " || k === "enter")) return;
        if (k === " " || k === "k") { e.preventDefault(); togglePlay(); }
        else if (k === "j") seekBy(-SEEK_STEP);
        else if (k === "l") seekBy(SEEK_STEP);
        else if (k === "f") toggleFull();
        else if (k === "m") toggleMute();
        else if (k === "n" && e.shiftKey) { if (opts.hasNext) onNext?.(); return; }
        else if (k === "p" && e.shiftKey) { if (opts.hasPrev) onPrev?.(); return; }
        else return;
        showChrome();
    });

    /* ---------- ceo ekran ---------- */

    const isFull = () => frame.classList.contains("is-fullscreen");

    function setFull(on) {
        frame.classList.toggle("is-fullscreen", on);
        document.documentElement.classList.toggle("video-fs-lock", on);
        fsBtn.innerHTML = on ? '<i class="fas fa-compress"></i>' : '<i class="fas fa-expand"></i>';
        fsBtn.setAttribute("aria-label", on ? "Izađi iz celog ekrana" : "Ceo ekran");
        move();
    }

    async function toggleFull() {
        if (isFull()) {
            if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
            setFull(false);
            return;
        }
        setFull(true);
        // Računar i Android: pravi fullscreen (Android se okreće u landscape).
        // iPhone ne podržava fullscreen za elemente, tamo okvir pokriva celu stranicu.
        if (frame.requestFullscreen) {
            try {
                await frame.requestFullscreen({ navigationUI: "hide" });
                if (IS_TOUCH) await screen.orientation?.lock?.("landscape");
            } catch { /* nije podržano */ }
        }
    }

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && isFull()) setFull(false);
    });
    window.addEventListener("resize", () => { if (email) move(); });

    /* ---------- javno ---------- */

    return {
        // o: { autoplay, resumeAt, hasPrev, hasNext, nextTitle }
        async load(src, userEmail, o = {}) {
            const myGen = ++gen;
            email = userEmail || "";
            opts = o;
            playing = false;
            ended = false;
            seeking = false;
            started = false;
            lastSaved = 0;
            duration = 0;
            qualities = [];
            cancelCountdown();
            seek.max = 0;
            seek.value = 0;
            speedBtn.textContent = `${SPEEDS[speedIdx]}x`;
            renderAutoplay();
            renderNav();
            qualityBtn.hidden = true;
            menu.hidden = true;
            renderTime(0);
            renderVolume();
            setPlaying(false);
            ui.classList.remove("is-idle", "is-buffering");
            ui.hidden = false;

            if (wm) {
                wm.textContent = email;
                wm.hidden = !email;
                move();
                clearInterval(moveTimer);
                moveTimer = setInterval(move, WM_MOVE_MS);
            }

            // Bez fullscreen dozvole iframe ne može sam preko celog ekrana
            iframe.setAttribute("allow", ALLOW_CUSTOM);
            FS_ATTRS.forEach(a => iframe.removeAttribute(a));
            iframe.src = `${src}&controls=off${o.autoplay ? "&autoplay=true" : ""}`;
            try {
                const VdoPlayer = await loadVdoApi();
                if (myGen !== gen) return;
                const inst = VdoPlayer.getInstance(iframe);
                if (inst !== vp) { vp = inst; bind(inst); }
            } catch (err) {
                // Bez API-ja naše kontrole ne rade, pa vraćamo VdoCipher-ove
                console.error(err);
                if (myGen !== gen) return;
                ui.hidden = true;
                iframe.setAttribute("allow", ALLOW_NATIVE);
                FS_ATTRS.forEach(a => iframe.setAttribute(a, ""));
                iframe.src = src;
            }
        },
        hide() {
            gen++;
            email = "";
            playing = false;
            clearInterval(moveTimer);
            clearTimeout(hideTimer);
            cancelCountdown();
            ui.hidden = true;
            if (wm) wm.hidden = true;
            if (isFull()) toggleFull();
        }
    };
}

export function startPlayer(cfg) {
    const isPaid = cfg.mode !== "free";
    const COURSE_ID = cfg.courseId;
    const PROGRESS_KEY = `progress_${COURSE_ID}`;
    const LAST_KEY = `lastLesson_${COURSE_ID}`;
    const POS_KEY = `positions_${COURSE_ID}`;

    /* ---------- podaci ---------- */

    const isFlat = !cfg.modules;
    const modules = isFlat ? [{ moduleTitle: cfg.title, lessons: cfg.lessons || [] }] : cfg.modules;
    const flat = modules.flatMap((m, mIndex) => m.lessons.map(l => ({ ...l, moduleTitle: m.moduleTitle, mIndex })));
    flat.forEach((l, i) => { l.idx = i; });

    let completed = [];
    let current = -1;
    let loadToken = 0;
    let firebase = null;

    /* ---------- DOM ---------- */

    const $ = id => document.getElementById(id);
    const nav = $("course-list");
    const player = $("vdo-player");
    const loader = $("video-loader");
    const empty = $("video-empty");
    const locked = $("video-locked");
    const titleEl = $("lesson-title");
    const moduleTag = $("module-tag");
    const progressFill = $("progress-fill");
    const percentText = $("percent-text");
    const progressSub = $("progress-sub");
    const sidebar = $("sidebar");
    const btnComplete = $("btn-complete");
    const btnPrev = $("btn-prev");
    const btnNext = $("btn-next");
    const gate = $("auth-gate");
    const gateText = $("auth-gate-text");
    const toastEl = $("toast");

    document.title = `${cfg.title} — Pomoć na fonu`;
    if (!isPaid) gate.hidden = true;

    const custom = isPaid ? customPlayer($("video-container"), player, {
        watermark: IS_TOUCH,
        onPrev: () => { const i = prevPlayable(current); if (i > -1) select(i, { autoplay: true }); },
        onNext: () => { const i = nextPlayable(current); if (i > -1) select(i, { autoplay: true }); },
        onEnded: () => lessonEnded(),
        onPosition: (t, d) => savePosition(t, d)
    }) : null;

    /* ---------- pomoćne ---------- */

    let toastTimer;
    function toast(msg, type = "info") {
        toastEl.textContent = msg;
        toastEl.className = `toast toast-${type}`;
        toastEl.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3200);
    }

    function deny(message, redirectTo) {
        gateText.textContent = message;
        gate.classList.add("denied");
        gate.hidden = false;
        setTimeout(() => { window.location.href = redirectTo; }, 2500);
    }

    function embedUrl(url) {
        if (!url) return "";
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtube.com") && u.pathname === "/watch") return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
            if (u.hostname === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
        } catch { /* nije validan URL — vrati kako jeste */ }
        return url;
    }

    const hasVideo = l => Boolean(l.vdoId || l.url || l.youtube);
    const playable = l => Boolean(l && !l.isLocked && hasVideo(l));

    function nextPlayable(from) {
        for (let i = from + 1; i < flat.length; i++) if (playable(flat[i])) return i;
        return -1;
    }
    function prevPlayable(from) {
        for (let i = from - 1; i >= 0; i--) if (playable(flat[i])) return i;
        return -1;
    }

    /* ---------- gde je korisnik stao (po lekciji, samo na ovom uređaju) ---------- */

    let positions = {};
    try { positions = JSON.parse(localStorage.getItem(POS_KEY)) || {}; } catch { positions = {}; }

    function storePositions() {
        try { localStorage.setItem(POS_KEY, JSON.stringify(positions)); } catch { /* pun storage */ }
    }

    function savePosition(t, d) {
        const l = flat[current];
        if (!l) return;
        if (t > 10 && t < d - 15) positions[l.id] = Math.floor(t);
        else delete positions[l.id];
        storePositions();
        renderResume(l);
    }

    function renderResume(l) {
        const el = $(`lesson-${l.idx}`)?.querySelector(".lesson-resume");
        if (!el) return;
        const at = positions[l.id];
        const show = Boolean(at) && !completed.includes(l.id);
        el.hidden = !show;
        el.textContent = show ? `Stao na ${formatTime(at)}` : "";
    }

    // Video odgledan do kraja: lekcija je završena
    function lessonEnded() {
        const l = flat[current];
        if (!l) return;
        delete positions[l.id];
        storePositions();
        if (!completed.includes(l.id)) {
            completed.push(l.id);
            saveProgress();
        }
        refresh();
    }

    /* ---------- napredak ---------- */

    function loadLocalProgress() {
        try { completed = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || []; }
        catch { completed = []; }
    }

    async function saveProgress() {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
        if (!firebase || !firebase.auth.currentUser) return;
        const userRef = doc(firebase.db, "users", firebase.auth.currentUser.uid);
        try {
            await updateDoc(userRef, { [`completedLessons.${COURSE_ID}`]: completed });
        } catch {
            await setDoc(userRef, { completedLessons: { [COURSE_ID]: completed } }, { merge: true });
        }
    }

    /* ---------- lista lekcija ---------- */

    function lessonButton(l) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "lesson-btn";
        btn.id = `lesson-${l.idx}`;
        if (l.isLocked) btn.classList.add("locked");
        else if (!hasVideo(l)) btn.classList.add("soon");

        const icon = document.createElement("i");
        icon.className = "status-icon far fa-circle";
        const name = document.createElement("span");
        name.className = "lesson-name";
        name.textContent = l.title;
        const resume = document.createElement("span");
        resume.className = "lesson-resume";
        resume.hidden = true;
        name.append(resume);
        btn.append(icon, name);

        if (l.isLocked) btn.insertAdjacentHTML("beforeend", '<i class="fas fa-lock lock-icon"></i>');
        else if (!hasVideo(l)) btn.insertAdjacentHTML("beforeend", '<span class="soon-tag">uskoro</span>');

        btn.onclick = () => select(l.idx, { autoplay: true });
        return btn;
    }

    function render() {
        nav.innerHTML = "";
        if (isFlat) {
            flat.forEach(l => nav.appendChild(lessonButton(l)));
        } else {
            modules.forEach((m, mIndex) => {
                const card = document.createElement("div");
                card.className = "module-card";
                card.id = `module-${mIndex}`;

                const head = document.createElement("button");
                head.type = "button";
                head.className = "module-head";
                head.innerHTML = '<span class="module-check"><i class="fas fa-check"></i></span><span class="module-title"></span><span class="module-count"></span><i class="fas fa-chevron-down chevron"></i>';
                head.querySelector(".module-title").textContent = m.moduleTitle;
                head.onclick = () => card.classList.toggle("open");

                const list = document.createElement("div");
                list.className = "lesson-list";
                flat.filter(l => l.mIndex === mIndex).forEach(l => list.appendChild(lessonButton(l)));

                card.append(head, list);
                nav.appendChild(card);
            });
        }
        refresh();
    }

    function refresh() {
        flat.forEach(l => {
            const btn = $(`lesson-${l.idx}`);
            if (!btn) return;
            const done = completed.includes(l.id);
            btn.classList.toggle("completed", done);
            btn.classList.toggle("active-lesson", l.idx === current);
            btn.querySelector(".status-icon").className = "status-icon " +
                (done ? "fas fa-check-circle" : l.idx === current ? "fas fa-play-circle" : "far fa-circle");
            renderResume(l);
        });

        if (!isFlat) {
            modules.forEach((m, mIndex) => {
                const card = $(`module-${mIndex}`);
                const done = m.lessons.filter(l => completed.includes(l.id)).length;
                card.querySelector(".module-count").textContent = `${done}/${m.lessons.length}`;
                card.classList.toggle("module-done", m.lessons.length > 0 && done === m.lessons.length);
            });
        }

        const trackable = flat.filter(l => !l.isLocked);
        const done = trackable.filter(l => completed.includes(l.id)).length;
        const pct = trackable.length ? Math.round(done / trackable.length * 100) : 0;
        progressFill.style.width = pct + "%";
        percentText.textContent = pct + "%";
        progressSub.textContent = `${done} / ${trackable.length} lekcija završeno`;

        btnPrev.disabled = current <= 0;
        btnNext.disabled = current >= flat.length - 1;
        const l = flat[current];
        const isDone = l && completed.includes(l.id);
        btnComplete.disabled = !l || l.isLocked;
        btnComplete.classList.toggle("is-done", Boolean(isDone));
        btnComplete.innerHTML = isDone
            ? '<i class="fas fa-rotate-left"></i> <span>Poništi završetak</span>'
            : '<i class="fas fa-check"></i> <span>Završi lekciju</span>';
    }

    /* ---------- izbor lekcije ---------- */

    // o.autoplay: pusti odmah (klik na lekciju, sledeća/prethodna). Pri otvaranju stranice ne.
    async function select(idx, o = {}) {
        const l = flat[idx];
        if (!l) return;
        current = idx;
        localStorage.setItem(LAST_KEY, l.id);

        titleEl.textContent = l.title;
        moduleTag.textContent = isFlat ? cfg.title : l.moduleTitle;

        if (!isFlat) $(`module-${l.mIndex}`).classList.add("open");
        refresh();
        $(`lesson-${idx}`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        if (window.innerWidth <= 992) sidebar.classList.remove("open");

        const token = ++loadToken;
        player.src = "";
        custom?.hide();
        loader.hidden = true;
        empty.hidden = true;
        locked.hidden = true;

        if (l.isLocked) { locked.hidden = false; return; }

        const direct = l.youtube || l.url;
        if (direct) { player.src = embedUrl(direct); return; }

        if (!l.vdoId || !isPaid) { empty.hidden = false; return; }

        loader.hidden = false;
        try {
            const result = await firebase.getVideoAuth({ videoId: l.vdoId });
            if (token !== loadToken) return;
            const { otp, playbackInfo } = result.data;
            // primaryColor: boja sajta za VdoCipher-ove kontrole ako se naše ne učitaju (vidi customPlayer)
            const src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&primaryColor=ffb020`;
            const nextIdx = nextPlayable(idx);
            if (custom) custom.load(src, firebase.auth.currentUser?.email, {
                autoplay: Boolean(o.autoplay),
                resumeAt: positions[l.id] || 0,
                hasPrev: prevPlayable(idx) > -1,
                hasNext: nextIdx > -1,
                nextTitle: nextIdx > -1 ? flat[nextIdx].title : ""
            });
            else player.src = src;
        } catch (err) {
            console.error("Greška kod backenda:", err);
            if (token === loadToken) toast("Došlo je do greške pri učitavanju videa. Pokušaj ponovo.", "error");
        } finally {
            if (token === loadToken) loader.hidden = true;
        }
    }

    function toggleCurrent() {
        const l = flat[current];
        if (!l || l.isLocked) return;
        const i = completed.indexOf(l.id);
        if (i > -1) completed.splice(i, 1);
        else completed.push(l.id);
        saveProgress();
        refresh();
    }

    function startAt() {
        const lastId = localStorage.getItem(LAST_KEY);
        let idx = flat.findIndex(l => l.id === lastId && !l.isLocked);
        if (idx === -1) idx = flat.findIndex(l => !l.isLocked && hasVideo(l) && !completed.includes(l.id));
        if (idx === -1) idx = flat.findIndex(l => !l.isLocked);
        select(idx === -1 ? 0 : idx);
    }

    /* ---------- dugmad, prečice ---------- */

    btnComplete.onclick = toggleCurrent;
    btnPrev.onclick = () => select(current - 1, { autoplay: true });
    btnNext.onclick = () => select(current + 1, { autoplay: true });
    $("menu-toggle").onclick = () => sidebar.classList.toggle("open");

    document.addEventListener("keydown", e => {
        if (!gate.hidden || /INPUT|TEXTAREA/.test(e.target.tagName)) return;
        if (e.key === "ArrowLeft" && current > 0) select(current - 1, { autoplay: true });
        else if (e.key === "ArrowRight" && current < flat.length - 1) select(current + 1, { autoplay: true });
        else if (e.key.toLowerCase() === "c") toggleCurrent();
    });

    /* ---------- pokretanje ---------- */

    if (!isPaid) {
        loadLocalProgress();
        render();
        startAt();
        return;
    }

    const app = initializeApp(firebaseConfig);
    firebase = {
        auth: getAuth(app),
        db: getFirestore(app),
        getVideoAuth: httpsCallable(getFunctions(app), "getVideoAuth")
    };

    // Najviše 2 uređaja po nalogu. Vraća snapshot korisnika, ili null ako pristup nije dozvoljen.
    function setupMaxTwoDevices(user) {
        return guardDevice({
            auth: firebase.auth,
            db: firebase.db,
            user,
            onRemoved: () => {
                player.src = "";
                deny("Pristup ovom uređaju je uklonjen. Prijavi se ponovo.", "/login");
            },
            onLimit: () => deny(`Dostignut je maksimalan broj uređaja (${MAX_DEVICES}).`, "/login")
        });
    }

    onAuthStateChanged(firebase.auth, async user => {
        if (!user) {
            window.location.href = "/login";
            return;
        }
        try {
            const snap = await setupMaxTwoDevices(user);
            if (!snap) return;

            const kursevi = (snap.exists() && snap.data().kursevi) ? snap.data().kursevi : [];
            if (!kursevi.includes(COURSE_ID)) {
                deny("Nemaš pristup ovom kursu. Preusmeravamo te na stranicu kursa...", cfg.coursePage);
                return;
            }

            $("user-email").textContent = user.email;
            $("user-chip").hidden = false;

            const all = snap.exists() ? snap.data().completedLessons : null;
            // Isto kao ranije: ako u bazi postoji napredak, on važi; inače lokalni
            if (all) completed = Array.isArray(all[COURSE_ID]) ? all[COURSE_ID] : [];
            else loadLocalProgress();

            render();
            gate.hidden = true;
            startAt();
        } catch (err) {
            console.error(err);
            deny("Greška pri proveri pristupa. Pokušaj ponovo.", "/login");
        }
    });
}
