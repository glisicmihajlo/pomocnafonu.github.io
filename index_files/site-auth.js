/*
 * Zajednička Firebase logika za javne stranice (početna, kursevi):
 * dugme Prijavi se / Odjavi se, link "Kupljeni kursevi", ograničenje na 2 uređaja.
 * Kada se korisnik prijavi, šalje događaj "pnf:user" sa listom kupljenih kurseva i podacima iz baze.
 * Ako body ima atribut data-require-auth, neprijavljen korisnik se šalje na /login.
 *
 * Brzina: Firebase (~400 KB JS) se učitava SAMO ako na ovom uređaju postoji sačuvana
 * Firebase prijava (proverava se direktno u pregledaču, bez Firebase-a) ili ako stranica
 * zahteva prijavu. Neprijavljeni posetioci ga uopšte ne preuzimaju.
 */
const FB = "https://www.gstatic.com/firebasejs/11.0.1";

const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.appspot.com",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a",
    measurementId: "G-768582D9M9"
};

const authBtn = document.getElementById("authBtn");
const authBtnText = document.getElementById("authBtnText");
const purchasedLink = document.getElementById("kupljeniKurseviLink");
const requireAuth = document.body.hasAttribute("data-require-auth");

function showLoggedIn(on) {
    if (purchasedLink) purchasedLink.hidden = !on;
    if (authBtnText) authBtnText.textContent = on ? "Odjavi se" : "Prijavi se";
    authBtn?.querySelector("i")?.setAttribute("class", on ? "fas fa-arrow-right-from-bracket" : "fas fa-user");
}

/*
 * Da li na ovom uređaju postoji sačuvana Firebase prijava — bez učitavanja Firebase-a.
 * Firebase je čuva u IndexedDB bazi "firebaseLocalStorageDb" (ili u localStorage ako
 * IndexedDB nije dostupan) pod ključem firebase:authUser:<apiKey>:[DEFAULT].
 */
function hasStoredSession() {
    const key = `firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`;
    try { if (localStorage.getItem(key)) return Promise.resolve(true); } catch { /* blokiran storage */ }
    if (!window.indexedDB) return Promise.resolve(false);

    return new Promise(resolve => {
        let req;
        try { req = indexedDB.open("firebaseLocalStorageDb"); } catch { resolve(false); return; }
        // Baza ne postoji: prekini, da je ne bismo napravili praznu (Firebase je pravi sam)
        req.onupgradeneeded = () => { req.transaction.abort(); resolve(false); };
        req.onerror = () => resolve(false);
        req.onblocked = () => resolve(false);
        req.onsuccess = () => {
            const db = req.result;
            try {
                if (!db.objectStoreNames.contains("firebaseLocalStorage")) { db.close(); resolve(false); return; }
                const get = db.transaction("firebaseLocalStorage", "readonly").objectStore("firebaseLocalStorage").get(key);
                get.onsuccess = () => { db.close(); resolve(Boolean(get.result)); };
                get.onerror = () => { db.close(); resolve(false); };
            } catch { db.close(); resolve(false); }
        };
    });
}

if (requireAuth) {
    start();
} else {
    hasStoredSession().then(found => {
        if (!found) return;
        showLoggedIn(true); // odmah, Firebase potvrdi kad se učita
        start();
    });
}

async function start() {
    const [{ initializeApp }, { getAuth, onAuthStateChanged, signOut }, { getFirestore }, { guardDevice, MAX_DEVICES }] = await Promise.all([
        import(`${FB}/firebase-app.js`),
        import(`${FB}/firebase-auth.js`),
        import(`${FB}/firebase-firestore.js`),
        import("/index_files/devices.js")
    ]);

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    authBtn?.addEventListener("click", async (e) => {
        if (auth.currentUser) {
            e.preventDefault();
            await signOut(auth);
            window.location.href = "/login";
        }
    });

    // Najviše 2 uređaja po nalogu. Vraća snapshot korisnika (ili null ako je odjavljen).
    function setupMaxTwoDevices(user) {
        return guardDevice({
            auth, db, user,
            onRemoved: () => {
                alert("Pristup ovom uređaju je uklonjen. Prijavi se ponovo.");
                window.location.href = "/login";
            },
            onLimit: () => {
                alert(`Dostignut je maksimalan broj uređaja za ovaj nalog (${MAX_DEVICES}). Javite se putem mejla pomocnafonu@gmail.com za sva dodatna pitanja.`);
                window.location.href = "/login";
            }
        });
    }

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            showLoggedIn(true);

            const snap = await setupMaxTwoDevices(user);
            if (!snap) return;
            const kursevi = (snap.exists() && Array.isArray(snap.data().kursevi)) ? snap.data().kursevi : [];
            const data = snap.exists() ? snap.data() : {};
            document.dispatchEvent(new CustomEvent("pnf:user", { detail: { user, kursevi, data } }));
        } else {
            // Stranice sa <body data-require-auth> su samo za prijavljene korisnike
            if (requireAuth) {
                window.location.href = "/login";
                return;
            }
            showLoggedIn(false);
        }
    });
}
