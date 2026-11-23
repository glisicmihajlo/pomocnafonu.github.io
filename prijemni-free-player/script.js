import { startPlayer } from "/index_files/player.js";

const courseData = [
    { id: "oblast1",  title: "1. Algebarski izrazi", url: "", isLocked: true },
    { id: "oblast2",  title: "2. Brojevni izrazi", url: "", isLocked: true },
    { id: "oblast3",  title: "3. Proporcionalnost", url: "", isLocked: true },
    {
        id: "oblast4",
        title: "4. Kompleksni brojevi",
        url: "https://www.youtube.com/embed/NNx-biA-Eu0?si=8o4oICh1L1c7Irv4",
        isLocked: false
    },
    { id: "oblast5",  title: "5. Funkcije", url: "", isLocked: true },
    { id: "oblast6",  title: "6. Polinomi", url: "", isLocked: true },
    { id: "oblast7",  title: "7.1. Kvadratne jednačine", url: "", isLocked: true },
    { id: "oblast8",  title: "7.2. Kvadratne nejednačine", url: "", isLocked: true },
    { id: "oblast9",  title: "7.3. Vijetove formule", url: "", isLocked: true },
    { id: "oblast10", title: "8. Iracionalne jednačine i nejednačine", url: "", isLocked: true },
    { id: "oblast11", title: "9. Eksponencijalne jednačine i nejednačine", url: "", isLocked: true },
    { id: "oblast12", title: "10. Logaritamski izrazi", url: "", isLocked: true },
    { id: "oblast13", title: "11. Logaritamske jednačine i nejednačine", url: "", isLocked: true },
    { id: "oblast14", title: "12. Trigonometrijski izrazi", url: "", isLocked: true },
    { id: "oblast15", title: "12.1. Trigonometrijske jednačine i nejednačine", url: "", isLocked: true },
    { id: "oblast16", title: "13. Planimetrija", url: "", isLocked: true },
    { id: "oblast17", title: "14. Stereometrija", url: "", isLocked: true },
    { id: "oblast18", title: "15. Analitička geometrija", url: "", isLocked: true },
    { id: "oblast19", title: "16. Nizovi", url: "", isLocked: true },
    { id: "oblast20", title: "17. Kombinatorika", url: "", isLocked: true },
    { id: "oblast21", title: "18. Binomna formula", url: "", isLocked: true },
    { id: "oblast22", title: "19. Primena izvoda", url: "", isLocked: true }
];

startPlayer({
    mode: "free",
    courseId: "prijemni-free",
    title: "Prijemni — besplatna lekcija",
    coursePage: "/prijemni",
    lessons: courseData
});
