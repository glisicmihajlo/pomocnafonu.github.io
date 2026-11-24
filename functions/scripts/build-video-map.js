/*
 * Pravi functions/videoMap.json: { courseId: [vdoId, ...] } iz svih plaćenih
 * *-player/script.js fajlova. getVideoAuth po ovoj mapi proverava da li je korisnik
 * kupio kurs kome video pripada, a admin panel iz nje čita listu kurseva.
 *
 * Pokreće se automatski pre "firebase deploy" (predeploy u firebase.json),
 * a može i ručno:  node functions/scripts/build-video-map.js
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "..");
const out = path.resolve(__dirname, "..", "videoMap.json");
const map = {};

for (const dir of fs.readdirSync(root)) {
    if (!dir.endsWith("-player")) continue;
    const file = path.join(root, dir, "script.js");
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");

    if (/mode:\s*["']free["']/.test(src)) continue;
    const idMatch = src.match(/courseId:\s*["']([^"']+)["']/) || src.match(/CURRENT_COURSE_ID\s*=\s*["']([^"']+)["']/);
    if (!idMatch) {
        console.warn(`[video-map] ${dir}/script.js: nema courseId, preskačem`);
        continue;
    }
    const ids = [...src.matchAll(/vdoId:\s*["']([0-9a-f]{32})["']/g)].map(m => m[1]);
    map[idMatch[1]] = [...new Set([...(map[idMatch[1]] || []), ...ids])];
}

const sorted = Object.fromEntries(Object.keys(map).sort().map(k => [k, map[k]]));
fs.writeFileSync(out, JSON.stringify(sorted, null, 2) + "\n");
const total = Object.values(sorted).reduce((n, a) => n + a.length, 0);
console.log(`[video-map] ${Object.keys(sorted).length} kurseva, ${total} videa -> functions/videoMap.json`);
