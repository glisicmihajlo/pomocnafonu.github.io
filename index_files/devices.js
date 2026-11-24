/*
 * Ograničenje na 2 uređaja po nalogu (zajedničko za sve stranice i playere).
 *
 * Svaki uređaj (pregledač) ima svoj token u localStorage, a nalog listu tokena
 * u users/{uid}.sessionTokens. Ako uređaj ima token koji više NIJE u listi,
 * znači da ga je admin uklonio (reset uređaja): token se briše, korisnik se
 * odjavljuje i šalje na prijavu. Tek posle nove prijave dobija novi token.
 *
 *   const snap = await guardDevice({ auth, db, user, onRemoved, onLimit });
 *   if (!snap) return;   // pristup nije dozvoljen, callback je već pozvan
 */
import { signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

export const MAX_DEVICES = 2;
const LEGACY_KEY = "sessionToken";
const keyFor = uid => `sessionToken_${uid}`;

function newToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function guardDevice({ auth, db, user, onRemoved, onLimit }) {
    const userRef = doc(db, "users", user.uid);
    const key = keyFor(user.uid);

    const snap = await getDoc(userRef);
    const tokens = (snap.exists() && Array.isArray(snap.data().sessionTokens)) ? snap.data().sessionTokens : [];

    // Stari zapis (jedan token za ceo pregledač) — preuzmi ga samo ako pripada ovom nalogu
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
        if (!localStorage.getItem(key) && tokens.includes(legacy)) localStorage.setItem(key, legacy);
        localStorage.removeItem(LEGACY_KEY);
    }

    let token = localStorage.getItem(key);
    let done = false;

    async function removed() {
        if (done) return;
        done = true;
        localStorage.removeItem(key);
        await signOut(auth).catch(() => {});
        onRemoved();
    }

    if (token && !tokens.includes(token)) {
        // Ovaj uređaj je uklonjen sa naloga
        await removed();
        return null;
    }

    if (!token) {
        if (tokens.length >= MAX_DEVICES) {
            done = true;
            await signOut(auth).catch(() => {});
            onLimit();
            return null;
        }
        token = newToken();
        await setDoc(userRef, { sessionTokens: [...tokens, token] }, { merge: true });
        localStorage.setItem(key, token);
    }

    // Ako admin resetuje uređaje dok je stranica otvorena — odmah odjava
    const unsubscribe = onSnapshot(userRef, docSnap => {
        const data = docSnap.data();
        if (!data) return;
        const now = Array.isArray(data.sessionTokens) ? data.sessionTokens : [];
        if (!now.includes(token)) {
            unsubscribe();
            removed();
        }
    }, () => { /* npr. posle odjave — ignoriši */ });

    return snap;
}
