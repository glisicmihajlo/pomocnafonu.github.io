import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "USMENI - 01. Osnove i operatori",
        lessons: [
            { 
                id: "c1", 
                title: "Tipovi i konverzija", 
                url: "https://www.youtube.com/watch?v=hBKAR9te_y8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            },
            { 
                id: "c2", 
                title: "Greške u kucanju", 
                url: "https://www.youtube.com/watch?v=hRgP-jWhQNU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=2" 
            },
            { 
                id: "c3", 
                title: "Uslovni i logički izraz", 
                url: "https://www.youtube.com/watch?v=K6x1Ims5owc&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=3" 
            },
            { 
                id: "c4", 
                title: "Tipovi podataka - uvod", 
                url: "https://www.youtube.com/watch?v=QrVnplDFa6Y&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=4" 
            },
            { 
                id: "c5", 
                title: "Veličina tipova podataka", 
                url: "https://www.youtube.com/watch?v=YoeGQTTmmJg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=5" 
            },
            { 
                id: "c6", 
                title: "Oduzimanje karaktera", 
                url: "https://www.youtube.com/watch?v=mYnLc5qwb90&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=6" 
            },
            { 
                id: "c7", 
                title: "Vidljivost promenljivih", 
                url: "https://www.youtube.com/watch?v=Uj27XrFnREY&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=7" 
            },
            { 
                id: "c8", 
                title: "Prioritet operatora dodele", 
                url: "https://www.youtube.com/watch?v=fIccTDgZhnU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=8" 
            },
            { 
                id: "c9", 
                title: "Vezani ternarni operatori", 
                url: "https://www.youtube.com/watch?v=gdSXrnkg-m8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=9" 
            },
            { 
                id: "c10", 
                title: "Logička dodela", 
                url: "https://www.youtube.com/watch?v=CJmIhC3CYRw&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=10" 
            },
            { 
                id: "c11", 
                title: "Logička poređenja", 
                url: "https://www.youtube.com/watch?v=MNeP-P_Qmtk&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=11" 
            },
            { 
                id: "c12", 
                title: "Prekoračenje opsega memorije", 
                url: "https://www.youtube.com/watch?v=BKAybBsKIEg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=12" 
            },
            { 
                id: "c13", 
                title: "Zamka u makroima", 
                url: "https://www.youtube.com/watch?v=t9yX3KP2JLo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=13" 
            },
            { 
                id: "c14", 
                title: "Inkrement u funkciji", 
                url: "https://www.youtube.com/watch?v=quKJIJlMBOQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=14" 
            },
            { 
                id: "c15", 
                title: "Makro i poređenje", 
                url: "https://www.youtube.com/watch?v=IObWvhHK5GQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=15" 
            },
            { 
                id: "c16", 
                title: "Makro za različitost", 
                url: "https://www.youtube.com/watch?v=h_UcJVTvzjo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=16" 
            },
            { 
                id: "c17", 
                title: "Granice tipova podataka", 
                url: "https://www.youtube.com/watch?v=P3VzHBV1lS4&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=17" 
            },
            { 
                id: "c18", 
                title: "Skraćena evaluacija izraza", 
                url: "https://www.youtube.com/watch?v=8DGijaLq0tE&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=18" 
            },
            { 
                id: "c19", 
                title: "Složeni uslovni izraz", 
                url: "https://www.youtube.com/watch?v=7_R6faFdghI&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            }
            
        ]
    },
    {
        moduleTitle: "PISMENI - 01. Linijski programi",
        lessons: [
            { 
                id: "a1", 
                title: "Prvi program u C-u", 
                url: "https://www.youtube.com/watch?v=JKAfk1pDcCE&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=1" 
            },
            { 
                id: "a2", 
                title: "Promenljive i tipovi", 
                url: "https://www.youtube.com/watch?v=VXbOQF3UIrY&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=2" 
            },
            { 
                id: "a3", 
                title: "Formatiran ispis (printf)", 
                url: "https://www.youtube.com/watch?v=Z3_MncZwErQ&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=3" 
            },
            { 
                id: "a4", 
                title: "Unos podataka (scanf)", 
                url: "https://www.youtube.com/watch?v=9JBCgM-qsh0&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=4" 
            },
            { 
                id: "a5", 
                title: "Matematičke operacije i funkcije", 
                url: "https://www.youtube.com/watch?v=997kajCXpqg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=5" 
            },
            { 
                id: "a6", 
                title: "Ispis tekstualnih poruka", 
                url: "https://www.youtube.com/watch?v=klDUzJ2XlFM&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=6" 
            },
            { 
                id: "a7", 
                title: "Konverzija valuta (dolar-dinar)", 
                url: "https://www.youtube.com/watch?v=_PmbxSmRQ0M&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=7" 
            },
            { 
                id: "a8", 
                title: "Obim i površina kruga", 
                url: "https://www.youtube.com/watch?v=5hXyOaQgnLM&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=8" 
            },
            { 
                id: "a9", 
                title: "Program za kusur", 
                url: "https://www.youtube.com/watch?v=HrGEp2eIfNg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=9" 
            },
            { 
                id: "a10", 
                title: "Pretvaranje ugla (stepeni-minuti-sekunde)", 
                url: "https://www.youtube.com/watch?v=oep-N-GOwIk&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=10" 
            },
            { 
                id: "a11", 
                title: "Proizvod cifara četvorocifrenog broja", 
                url: "https://www.youtube.com/watch?v=Ix9rmCL4Wcg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=11"
            },
            { 
                id: "a12", 
                title: "Verovatnoća izvlačenja loptica", 
                url: "https://www.youtube.com/watch?v=xg6bNooDI7M&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=12"
            },
            { 
                id: "a13", 
                title: "Stepenovanje slučajnih brojeva", 
                url: "https://www.youtube.com/watch?v=Q39oCsCS2OI&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=13"
            },
            { 
                id: "a14", 
                title: "Nasumičan izbor iz intervala", 
                url: "https://www.youtube.com/watch?v=MbqNBQMBVgs&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=14"
            }
            
        ]
    },
    {
        moduleTitle: "PISMENI - 02. If naredba",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod i parnost broja", 
                url: "https://www.youtube.com/watch?v=lO6uxQzv1dA&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=15"
            },
            { 
                id: "b2", 
                title: "Poređenje broja sa nulom", 
                url: "https://www.youtube.com/watch?v=AJMY_nOfaBg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=16"
            },
            { 
                id: "b3", 
                title: "Određivanje ocene na ispitu", 
                url: "https://www.youtube.com/watch?v=zI184gBzf_o&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=17"
            },
            { 
                id: "b4", 
                title: "Najveći od tri broja", 
                url: "https://www.youtube.com/watch?v=Ak_4cnl7wL0&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=18"
            },
            { 
                id: "b5", 
                title: "Koren i provera greške", 
                url: "https://www.youtube.com/watch?v=e5HfmFtvFG0&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=19"
            },
            { 
                id: "b6", 
                title: "Zbir ili razlika (uslovna)", 
                url: "https://www.youtube.com/watch?v=JucmQ04cSFE&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=20"
            },
            { 
                id: "b7", 
                title: "Deljivost broja M sa N", 
                url: "https://www.youtube.com/watch?v=ARWZSKSMcKI&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=21"
            },
            { 
                id: "b8", 
                title: "Provera Armstrongovog broja", 
                url: "https://www.youtube.com/watch?v=eEqdBDxn_Hg&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=22"
            },
            { 
                id: "b9", 
                title: "Opisni prikaz ocena", 
                url: "https://www.youtube.com/watch?v=HhUae2gkRec&list=PLl8BFSumqv-bpHLgcaRDXnA_Ns_t4xR0v&index=23"
            }
        ]
    },
];

startPlayer({
    mode: "free",
    courseId: "pp-pismeni",
    title: "Principi programiranja — besplatne lekcije",
    coursePage: "/pp/",
    modules: courseData
});
