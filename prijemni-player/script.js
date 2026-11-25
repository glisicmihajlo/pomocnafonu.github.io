import { startPlayer } from "/index_files/player.js";

/*
 * Svaka oblast je jedan video:
 *   vdoId:   "..."  -> VdoCipher video (zaštićen, sa vodenim žigom)
 *   youtube: "..."  -> YouTube embed link
 * Ako nema ni jedno ni drugo, prikazuje se poruka "Video uskoro stiže".
 */
const lessons = [
    { id: "p1",  title: "1. Algebarski izrazi", vdoId: "97b214263c144a23839a3394e91840c4" },
    { id: "p2",  title: "2. Brojevni izrazi", vdoId: "a8396bd22ab34a3ba36117d456175c53" },
    { id: "p3",  title: "3. Proporcionalnost", vdoId: "ea95797f9c704e588620b88fdcc3ef50" },
    { id: "p4",  title: "4. Kompleksni brojevi", vdoId: "8771fcbdef6b48f5aaf7a8ffbdd188a9" },
    { id: "p5",  title: "5. Funkcije", vdoId: "807070d8a1f84a73a740e3c8ce9b95f1" },
    { id: "p6",  title: "6. Polinomi", vdoId: "1702def2949a4f1e84c42f79bb4ef8a1" },
    { id: "p7",  title: "7.1. Kvadratne jednačine", vdoId: "e42b75ca479249409af883613679b4b6" },
    { id: "p8",  title: "7.2. Kvadratne nejednačine", vdoId: "3ae2525f237c481a8544e457cc9ec194" },
    { id: "p9",  title: "7.3. Vijetove formule", vdoId: "c75afe4ec0964354bcabd0ba1ce05a08" },
    { id: "p10", title: "8. Iracionalne jednačine i nejednačine", vdoId: "c16b523730674bf88d6c4c5d267b704c" },
    { id: "p11", title: "9. Eksponencijalne jednačine i nejednačine", vdoId: "5a9e598d85ec454dbd0d950e28008106" },
    { id: "p12", title: "10. Logaritamski izrazi", vdoId: "b4d820cd0b5c42caa94a5720a0afa2b0" },
    { id: "p13", title: "11. Logaritamske jednačine i nejednačine", vdoId: "9c264ca7cbd74d68836c2224fed8eb8b" },
    { id: "p14", title: "12. Trigonometrijski izrazi", vdoId: "0e0487cc95c649f1a10248f8d77b72cc" },
    { id: "p15", title: "12.1. Trigonometrijske jednačine i nejednačine", vdoId: "7c1ce05bdd8d48bcba0515f7d1c2ac82" },
    { id: "p16", title: "13. Planimetrija", vdoId: "e8bf037bfc26407583c0862ebde5e360" },
    { id: "p17", title: "14. Stereometrija", vdoId: "c5033f2987e54cb484899b7020ad40b3" },
    { id: "p18", title: "15. Analitička geometrija", vdoId: "d33c30010ad84817b97741a8ec58d5c5" },
    { id: "p19", title: "16. Nizovi", vdoId: "" },
    { id: "p20", title: "17. Kombinatorika", vdoId: "" },
    { id: "p21", title: "18. Binomna formula", vdoId: "" },
    { id: "p22", title: "19. Primena izvoda", vdoId: "" },
];

startPlayer({
    mode: "paid",
    courseId: "prijemni",
    title: "Priprema za prijemni — FON",
    coursePage: "/prijemni",
    lessons
});
