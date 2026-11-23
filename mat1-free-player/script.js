import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "PRVI KLK - 2023 Grupa 3",
        lessons: [
            {
                id: "a1",
                title: "Zadatak 1",
                url: "https://www.youtube.com/watch?v=FdFJMu6EJvM&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=5"
            },
            {
                id: "a2",
                title: "Zadatak 2",
                url: "https://www.youtube.com/watch?v=F-BT8KilCR0&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=6"
            },
            {
                id: "a3",
                title: "Zadatak 3",
                url: "https://www.youtube.com/watch?v=EMTDXvl8spo&list=PLl8BFSumqv-ZKwldZMptuTAxmM51iDvOb&index=7"
            },
        ]
    },
];

startPlayer({
    mode: "free",
    courseId: "mat1",
    title: "Matematika 1 — besplatne lekcije",
    coursePage: "/mat1/",
    modules: courseData
});
