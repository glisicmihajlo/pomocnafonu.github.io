/*
 * Zajednička Firebase logika za javne stranice (početna, kursevi):
 * dugme Prijavi se / Odjavi se, link "Kupljeni kursevi", ograničenje na 2 uređaja.
 * Kada se korisnik prijavi, šalje događaj "pnf:user" sa listom kupljenih kurseva i podacima iz baze.
 * Ako body ima atribut data-require-auth, neprijavljen korisnik se šalje na /login.
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { guardDevice, MAX_DEVICES } from "/index_files/devices.js";

const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.appspot.com",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a",
    measurementId: "G-768582D9M9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const authBtn = document.getElementById("authBtn");
const authBtnText = document.getElementById("authBtnText");
const purchasedLink = document.getElementById("kupljeniKurseviLink");

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
        if (purchasedLink) purchasedLink.hidden = false;
        if (authBtnText) authBtnText.textContent = "Odjavi se";
        authBtn?.querySelector("i")?.setAttribute("class", "fas fa-arrow-right-from-bracket");

        const snap = await setupMaxTwoDevices(user);
        if (!snap) return;
        const kursevi = (snap.exists() && Array.isArray(snap.data().kursevi)) ? snap.data().kursevi : [];
        const data = snap.exists() ? snap.data() : {};
        document.dispatchEvent(new CustomEvent("pnf:user", { detail: { user, kursevi, data } }));
    } else {
        // Stranice sa <body data-require-auth> su samo za prijavljene korisnike
        if (document.body.hasAttribute("data-require-auth")) {
            window.location.href = "/login";
            return;
        }
        if (purchasedLink) purchasedLink.hidden = true;
        if (authBtnText) authBtnText.textContent = "Prijavi se";
        authBtn?.querySelector("i")?.setAttribute("class", "fas fa-user");
    }
});
