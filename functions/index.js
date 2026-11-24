const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const axios = require("axios");

// { courseId: [vdoId, ...] } — pravi se iz *-player/script.js (functions/scripts/build-video-map.js)
const VIDEO_MAP = require("./videoMap.json");

admin.initializeApp();
const db = admin.firestore();

// VdoCipher ključ se čuva u Firebase Secret Manager-u, nikad u kodu:
//   firebase functions:secrets:set VDOCIPHER_API_SECRET
const VDOCIPHER_API_SECRET = defineSecret("VDOCIPHER_API_SECRET");

// Samo ovaj nalog može da koristi admin panel (/admin)
const ADMIN_EMAILS = ["mihajloglisic05@gmail.com"];

// Svi plaćeni kursevi (automatski iz mape, pa se novi kurs sam pojavi u admin panelu)
const COURSE_IDS = Object.keys(VIDEO_MAP);
const MAX_DEVICES = 2;

function isAdmin(auth) {
    const email = (auth && auth.token && auth.token.email || "").toLowerCase();
    return Boolean(email) && ADMIN_EMAILS.includes(email);
}

function requireAdmin(request) {
    if (!request.auth) throw new HttpsError("unauthenticated", "Moraš biti ulogovan.");
    if (!isAdmin(request.auth)) throw new HttpsError("permission-denied", "Nemaš pristup.");
}

function requireUid(data) {
    const uid = data && data.uid;
    if (typeof uid !== "string" || !uid || uid.length > 128) {
        throw new HttpsError("invalid-argument", "Nedostaje uid korisnika.");
    }
    return uid;
}

/* ------------------------------------------------------------------ */
/*  Video                                                             */
/* ------------------------------------------------------------------ */

exports.getVideoAuth = onCall({ secrets: [VDOCIPHER_API_SECRET] }, async (request) => {
    // 1. Provera autentifikacije
    if (!request.auth) {
        throw new HttpsError("unauthenticated", "Moraš biti ulogovan.");
    }

    const videoId = request.data && request.data.videoId;
    if (typeof videoId !== "string" || !/^[0-9a-f]{32}$/.test(videoId)) {
        throw new HttpsError("invalid-argument", "Neispravan video.");
    }

    // 2. Provera da li je korisnik kupio kurs kome ovaj video pripada (admin vidi sve)
    if (!isAdmin(request.auth)) {
        const courses = COURSE_IDS.filter(id => VIDEO_MAP[id].includes(videoId));
        if (!courses.length) throw new HttpsError("not-found", "Video ne postoji.");

        const snap = await db.collection("users").doc(request.auth.uid).get();
        const kursevi = (snap.exists && Array.isArray(snap.get("kursevi"))) ? snap.get("kursevi") : [];
        if (!courses.some(id => kursevi.includes(id))) {
            throw new HttpsError("permission-denied", "Nemaš pristup ovom kursu.");
        }
    }

    const userEmail = request.auth.token.email;

    try {
        const response = await axios.post(
            `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
            {
                "ttl": 3600,
                // Koristimo annotate jer on bolje radi na mobilnim uređajima
                "annotate": JSON.stringify([
                    {
                        "type": "rtext",
                        "text": userEmail,
                        "alpha": 0.35,
                        "color": "0x000000",
                        "size": 15,
                        "interval": 5000,
                        "skip_on_hls": false
                    }
                ]),
                "request": {
                    "useStaticFilters": true
                }
            },
            {
                headers: {
                    "Authorization": `Apisecret ${VDOCIPHER_API_SECRET.value()}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return {
            otp: response.data.otp,
            playbackInfo: response.data.playbackInfo
        };
    } catch (error) {
        console.error("VdoCipher Error:", error.response ? error.response.data : error.message);
        throw new HttpsError("internal", "Greška pri generisanju ključa.");
    }
});

/* ------------------------------------------------------------------ */
/*  Admin panel                                                       */
/* ------------------------------------------------------------------ */

// Svi korisnici (Auth + Firestore) i lista kurseva
exports.adminListUsers = onCall(async (request) => {
    requireAdmin(request);

    const authUsers = [];
    let pageToken;
    do {
        const page = await admin.auth().listUsers(1000, pageToken);
        authUsers.push(...page.users);
        pageToken = page.pageToken;
    } while (pageToken);

    const docs = await db.collection("users").select("email", "kursevi", "sessionTokens").get();
    const byUid = new Map(docs.docs.map(d => [d.id, d.data()]));

    const users = authUsers.map(u => {
        const d = byUid.get(u.uid) || {};
        byUid.delete(u.uid);
        return {
            uid: u.uid,
            email: u.email || d.email || "",
            disabled: u.disabled,
            createdAt: u.metadata.creationTime || null,
            lastSignIn: u.metadata.lastSignInTime || null,
            kursevi: Array.isArray(d.kursevi) ? d.kursevi : [],
            devices: Array.isArray(d.sessionTokens) ? d.sessionTokens.length : 0
        };
    });

    // Dokumenti bez Auth naloga (npr. obrisan nalog) — da se vide
    for (const [uid, d] of byUid) {
        users.push({
            uid,
            email: d.email || "",
            disabled: false,
            orphan: true,
            createdAt: null,
            lastSignIn: null,
            kursevi: Array.isArray(d.kursevi) ? d.kursevi : [],
            devices: Array.isArray(d.sessionTokens) ? d.sessionTokens.length : 0
        });
    }

    return { users, courses: COURSE_IDS, maxDevices: MAX_DEVICES };
});

// Postavlja tačnu listu kupljenih kurseva korisniku
exports.adminSetCourses = onCall(async (request) => {
    requireAdmin(request);
    const uid = requireUid(request.data);
    const kursevi = request.data.kursevi;

    if (!Array.isArray(kursevi) || kursevi.some(id => typeof id !== "string")) {
        throw new HttpsError("invalid-argument", "Neispravna lista kurseva.");
    }
    const unknown = kursevi.filter(id => !COURSE_IDS.includes(id));
    if (unknown.length) {
        throw new HttpsError("invalid-argument", `Nepoznat kurs: ${unknown.join(", ")}`);
    }

    const clean = [...new Set(kursevi)];
    await db.collection("users").doc(uid).set({ kursevi: clean }, { merge: true });
    return { kursevi: clean };
});

// Briše sve uređaje — korisnik se odjavljuje svuda i može ponovo da se prijavi na 2 nova
exports.adminResetDevices = onCall(async (request) => {
    requireAdmin(request);
    const uid = requireUid(request.data);
    await db.collection("users").doc(uid).set({ sessionTokens: [] }, { merge: true });
    return { devices: 0 };
});

// Pravi link za novu lozinku koji admin može da pošalje korisniku
exports.adminPasswordResetLink = onCall(async (request) => {
    requireAdmin(request);
    const uid = requireUid(request.data);
    const user = await admin.auth().getUser(uid);
    if (!user.email) throw new HttpsError("failed-precondition", "Korisnik nema email.");
    const link = await admin.auth().generatePasswordResetLink(user.email);
    return { link };
});

// Blokira / odblokira nalog
exports.adminSetDisabled = onCall(async (request) => {
    requireAdmin(request);
    const uid = requireUid(request.data);
    const disabled = Boolean(request.data.disabled);
    if (uid === request.auth.uid) throw new HttpsError("failed-precondition", "Ne možeš blokirati sebe.");
    await admin.auth().updateUser(uid, { disabled });
    if (disabled) {
        await admin.auth().revokeRefreshTokens(uid);
        await db.collection("users").doc(uid).set({ sessionTokens: [] }, { merge: true });
    }
    return { disabled };
});
