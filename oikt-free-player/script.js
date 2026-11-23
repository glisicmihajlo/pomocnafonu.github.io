import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "PRVI KLK - 01. Brojevni sistemi",
        lessons: [
            { 
                id: "a1", 
                title: "Konverzija iz dekadnog u binarni sistem", 
                url: "https://www.youtube.com/watch?v=DHl7zevrgbQ&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=1" 
            },
            { 
                id: "a2", 
                title: "Konverzija iz binarnog u dekadni sistem", 
                url: "https://www.youtube.com/watch?v=j83aySJNG6U&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=2" 
            },
            { 
                id: "a3", 
                title: "Konverzija iz dekadnog u heksadecimalni sistem", 
                url: "https://www.youtube.com/watch?v=gfv6u8wmXCQ&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=3" 
            },
            { 
                id: "a4", 
                title: "Konverzija iz binarnog u heksadecimalni sistem", 
                url: "https://www.youtube.com/watch?v=KyTGvT_ybws&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=4" 
            },
            { 
                id: "a5", 
                title: "Konverzija iz binarnog u oktalni sistem", 
                url: "https://www.youtube.com/watch?v=_K6tAZFgz9Y&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=5" 
            },
            { 
                id: "a6", 
                title: "Konverzija iz oktalnog u dekadni sistem", 
                url: "https://www.youtube.com/watch?v=6Q7vDimzRSM&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=6" 
            },
            { 
                id: "a7", 
                title: "Konverzija iz heksadecimalnog u dekadni sistem", 
                url: "https://www.youtube.com/watch?v=dgpfaIkFHPM&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=7" 
            },
            { 
                id: "a8", 
                title: "Oduzimanje binarnih brojeva", 
                url: "https://www.youtube.com/watch?v=jig1aVO3Cwc&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=8" 
            },
            { 
                id: "a11", 
                title: "Konverzija negativnog broja", 
                url: "https://www.youtube.com/watch?v=k8ohX9QV_lw&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=9" 
            },
            { 
                id: "a9", 
                title: "Zadatak 1", 
                url: "https://www.youtube.com/watch?v=TnVly9LCVEU&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=10" 
            },
            { 
                id: "a10", 
                title: "Zadatak 2", 
                url: "https://www.youtube.com/watch?v=PA8HTK1pSGI&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=11" 
            },
            { 
                id: "a12", 
                title: "Zadatak 3", 
                url: "https://www.youtube.com/watch?v=QjTO3nt42RQ&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=12" 
            },
            { 
                id: "a15", 
                title: "Zadatak 4", 
                url: "https://www.youtube.com/watch?v=e6pkXBl2tQs&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=13" 
            },
            { 
                id: "a13", 
                title: "Konverzija decimalnog - Zadatak 1", 
                url: "https://www.youtube.com/watch?v=3x_OwoKpTLk&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=14" 
            },
            { 
                id: "a14", 
                title: "Konverzija decimalnog - Zadatak 2", 
                url: "https://www.youtube.com/watch?v=4hRgAclrnJ8&list=PLl8BFSumqv-YhXNiQ2DKgHy0DYVQmqrAP&index=15" 
            }
        ]
    }
];

startPlayer({
    mode: "free",
    courseId: "oikt",
    title: "OIKT — besplatne lekcije",
    coursePage: "/oikt/",
    modules: courseData
});
