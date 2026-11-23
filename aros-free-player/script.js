import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "PRVI KLK - 01. Adrese",
        lessons: [
            { 
                id: "a1", 
                title: "Najbrži računar", 
                url: "https://www.youtube.com/watch?v=yb1DZyBgDT4&list=PLQFF0zZmbVqA&index=1" 
            },
            { 
                id: "a2", 
                title: "Jednoadresna instrukcija", 
                url: "https://www.youtube.com/watch?v=gTCW7N2c1DA&list=PLQFF0zZmbVqA&index=2" 
            },
            { 
                id: "a3", 
                title: "Dvoadresna instrukcija", 
                url: "https://www.youtube.com/watch?v=7GiStz_EYYQ&list=PLQFF0zZmbVqA&index=3" 
            },
            { 
                id: "a4", 
                title: "Adresne linije", 
                url: "https://www.youtube.com/watch?v=eQaLMcLB8-g&list=PLQFF0zZmbVqA&index=4" 
            },
            { 
                id: "a5", 
                title: "Da li je moguće i da li ima smisla", 
                url: "https://www.youtube.com/watch?v=qj7eoPN0jIQ&list=PLQFF0zZmbVqA&index=5" 
            },
            { 
                id: "a6", 
                title: "Broj stranica", 
                url: "https://www.youtube.com/watch?v=ItdBQQKzf6Q&list=PLQFF0zZmbVqA&index=6" 
            },
            { 
                id: "a7", 
                title: "Broj magnetnih ploča", 
                url: "https://www.youtube.com/watch?v=m-I2S1L9qSE&list=PLQFF0zZmbVqA&index=7" 
            },
            { 
                id: "a8", 
                title: "Tipovi adresiranja", 
                url: "https://www.youtube.com/watch?v=1Euxed6sPnM&list=PLQFF0zZmbVqA&index=8" 
            },
        ]
    }
];

startPlayer({
    mode: "free",
    courseId: "aros",
    title: "AROS — besplatne lekcije",
    coursePage: "/aros/",
    modules: courseData
});
