import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Algoritmi",
        lessons: [
            { 
                id: "a1",
                title: "BestFit, FirstFit i WorstFit",
                vdoId: "528e629c643e4718a0a1c80972c4140c"
            },
            { 
                id: "a2",
                title: "FIFO - 3 okvira",
                vdoId: "d4a747577e674a718f165aaa535592a3"
            },
            { 
                id: "a3",
                title: "FIFO - 4 okvira",
                vdoId: "667c5a400a1f4235917ca65105c71251"
            },
            { 
                id: "a4",
                title: "LRU - 3 okvira",
                vdoId: "2ca7d932008f49238fe040d21c0caa99"
            },
            { 
                id: "a5",
                title: "LRU - 4 okvira",
                vdoId: "44e488ea6da349e0a1d0ae53c04961d5"
            },
            { 
                id: "a6",
                title: "OPT - 3 okvira",
                vdoId: "deb7f24c021342eb9a2ca0debce65009"
            },
            { 
                id: "a7",
                title: "OPT - 4 okvira",
                vdoId: "4fe8c00248b64bb4a7c819ba4ed231c5"
            },
            { 
                id: "a8",
                title: "C-LOOK - zadatak 1",
                vdoId: "7ce938d1b5b847608968df8f45f5902b"
            },
            { 
                id: "a9",
                title: "C-LOOK - zadatak 2",
                vdoId: "fc7a3c9c37ff4879867dd3ee42da81f8"
            },
        ]
    },
    {
        moduleTitle: "02. Gantovi dijagrami - u izradi",
        lessons: [
            { 
                id: "b1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "03. Adrese - u izradi",
        lessons: [
            { 
                id: "c1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "04. Deadlock - u izradi",
        lessons: [
            { 
                id: "d1",
                title: "",
                vdoId: ""
            },
        ]
    },
    {
        moduleTitle: "05. Programski jezik C - u izradi",
        lessons: [
            { 
                id: "e1",
                title: "",
                vdoId: ""
            },
        ]
    },
];

startPlayer({
    mode: "paid",
    courseId: "aros-klk2",
    title: "AROS — 2. kolokvijum",
    coursePage: "/aros/",
    modules: courseData
});
