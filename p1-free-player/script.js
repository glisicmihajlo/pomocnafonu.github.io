import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Rok - Praznici",
        lessons: [
            { 
                id: "a1", 
                title: "Enum VrstaPraznika", 
                url: "https://www.youtube.com/watch?v=PgKjDjj1bzA&list=PLezWsatskNco&index=1"
            },
            { 
                id: "a2", 
                title: "Klasa DnevnaStatistika", 
                url: "https://www.youtube.com/watch?v=E6Ajmx5WOEc&list=PLezWsatskNco&index=2"
            },
            { 
                id: "a3", 
                title: "Klasa LunaPark", 
                url: "https://www.youtube.com/watch?v=zXl-fAuOH1s&list=PLezWsatskNco&index=3"
            },
            { 
                id: "a4", 
                title: "Metoda unesiStatistikeZaDan", 
                url: "https://www.youtube.com/watch?v=4USXwCPshFA&list=PLezWsatskNco&index=4"
            },
            { 
                id: "a5", 
                title: "Metoda vratiSumirano", 
                url: "https://www.youtube.com/watch?v=OXuUZoQNExE&list=PLezWsatskNco&index=5"
            },
            { 
                id: "a6", 
                title: "Klasa TestLunaPark", 
                url: "https://www.youtube.com/watch?v=8QFIb_48LF4&list=PLezWsatskNco&index=6"
            },
        ]
    },
];

startPlayer({
    mode: "free",
    courseId: "p1",
    title: "Programiranje 1 — besplatne lekcije",
    coursePage: "/p1/",
    modules: courseData
});
