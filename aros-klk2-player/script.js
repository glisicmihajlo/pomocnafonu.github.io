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
        moduleTitle: "02. Gantovi dijagrami",
        lessons: [
            { 
                id: "b1",
                title: "FCFS",
                vdoId: "57d357d99bb24189acc98a00274e7c45"
            },
            { 
                id: "b2",
                title: "MIN i MAX vreme čekanja",
                vdoId: "e122ad1236f84f5097fe6c001a8ec8d7"
            },
            { 
                id: "b3",
                title: "SJF",
                vdoId: "ff59625b210c417dbeb0804e9d6ef68e"
            },
            { 
                id: "b4",
                title: "SRTF",
                vdoId: "bb924dad239e4eca9056f2ed223fc822"
            },
            { 
                id: "b5",
                title: "RR",
                vdoId: "1205c85ab96c4d54862c15e3edef7acb"
            },
            { 
                id: "b6",
                title: "HPF",
                vdoId: "f69b19d0b9a64d7a968819b6a9e825d4"
            },
            // ovde ide b7
            { 
                id: "b8",
                title: "FIFO",
                vdoId: "e444cdefb3894811aee28b8426879eda"
            },
            { 
                id: "b9",
                title: "SSTF",
                vdoId: "b3d8feb6a30349ef8b5b958c9b43c0bf"
            },
            { 
                id: "b10",
                title: "MAX i MIN vreme izvršenja",
                vdoId: "1a179366f3024deca15c993b92f63ec1"
            },
            { 
                id: "b11",
                title: "FCFS, SJF, NP i RR",
                vdoId: "36ea16d256a241d494a57f952f306538"
            },
            { 
                id: "b12",
                title: "MIN prosečno vreme",
                vdoId: "fc432cc47ce64f84bb98573c4e796879"
            },
        ]
    },
    {
        moduleTitle: "03. Adrese - u izradi",
        lessons: [
            { 
                id: "c1",
                title: "Broj stranica",
                vdoId: "5dd63cee757f4a4194e982dfc717ff58"
            },
            { 
                id: "c2",
                title: "Preslikavanje virtualne u fizičke adrese",
                vdoId: "50e3a216f38649459a45b750a1a9f706"
            },
            { 
                id: "c3",
                title: "Slogovi",
                vdoId: "59a4976e19154c41aa8795519b9d6a8c"
            },
            { 
                id: "c4",
                title: "Veličina stranice",
                vdoId: "561486208b4e490bab9de817f192d680"
            },
            { 
                id: "c5",
                title: "Veličina invertovane stranice",
                vdoId: "d7a73fd0e1084f818a158671d2de3b51"
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
