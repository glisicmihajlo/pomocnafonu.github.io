import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "PRVI KLK - 01. Parcijalni izvodi",
        lessons: [
            { 
                id: "a1",
                title: "Uvod",
                url: "https://www.youtube.com/watch?v=WPNrWITV7m0&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=1"
            },
            { 
                id: "a2",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=tfFPlUqbyTI&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=2"
            },
            { 
                id: "a3",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=UrqAN6FuXfw&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=3"
            },
            { 
                id: "a4",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=t6Tvdrgh3rc&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=4"
            },
            { 
                id: "a5",
                title: "Zadatak 4",
                url: "https://www.youtube.com/watch?v=nNyaJsywrOw&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=5"
            },
            { 
                id: "a6",
                title: "Zadatak 5",
                url: "https://www.youtube.com/watch?v=7UuVoi-3k84&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=6"
            },
        ]
    },
    {
        moduleTitle: "PRVI KLK - 2023 Grupa 1",
        lessons: [
            { 
                id: "b1",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=pBCnuFBQdgk&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=7"
            },
            { 
                id: "b2",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=2K4i3a5KLDY&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=8"
            },
            { 
                id: "b3",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=cDTFlRFzBDk&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=9"
            },
        ]
    },
    {
        moduleTitle: "DRUGI KLK - 2023 Grupa 4",
        lessons: [
            { 
                id: "c1",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=JsBQ7NHWsOE&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=10"
            },
            { 
                id: "c2",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=Hrus9xqK8VA&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=11"
            },
            { 
                id: "c3",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=YI3zeP6JF7w&list=PLl8BFSumqv-ZTvwFboZ-QVo0Yj1NqTRcz&index=12"
            },
        ]
    },
];

startPlayer({
    mode: "free",
    courseId: "mat2",
    title: "Matematika 2 — besplatne lekcije",
    coursePage: "/mat2/",
    modules: courseData
});
