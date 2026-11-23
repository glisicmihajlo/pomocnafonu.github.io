import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. SQL",
        lessons: [
            { 
                id: "a1", 
                title: "Zadatak 1", 
                vdoId: "f49e88ea42be4171963b52322d5a4322" 
            },
            { 
                id: "a2", 
                title: "Zadatak 2", 
                vdoId: "6c037972d4c046198cb8c182a0ea72d7" 
            },
            { 
                id: "a3", 
                title: "Zadatak 3", 
                vdoId: "27aa4396c563478ea85a58b3053dee0e" 
            },
            { 
                id: "a4", 
                title: "Zadatak 4", 
                vdoId: "8ab42a8564e54519ba5f5a39c421d002" 
            },
            { 
                id: "a5", 
                title: "Zadatak 5", 
                vdoId: "def4c5d289864a5d9986e309ba2f7a84" 
            },
            { 
                id: "a6", 
                title: "Zadatak 6", 
                vdoId: "e5812802867c4055ac42c8adddd2b426" 
            },
            { 
                id: "a7", 
                title: "Zadatak 7", 
                vdoId: "c8aba1442d874d5bbc8dc63c913df468" 
            },
            { 
                id: "a8", 
                title: "Zadatak 8", 
                vdoId: "973232c98d8648c38a75b87759b17244" 
            },
            { 
                id: "a9", 
                title: "Zadatak 9", 
                vdoId: "708a2591cc2041bc92a8528f40ce7ed2" 
            },
            { 
                id: "a10", 
                title: "Zadatak 10", 
                vdoId: "853c71804888419bad472eb270cbdd30" 
            },
            { 
                id: "a11", 
                title: "Zadatak 11", 
                vdoId: "2d8891a3b4af402ea014d2881191d3a6" 
            },
            { 
                id: "a12", 
                title: "Zadatak 12", 
                vdoId: "fccbe3afed154d139a3d1394c84eb75e" 
            },
            { 
                id: "a13", 
                title: "Zadatak 13", 
                vdoId: "d9e463f624b548fbb1b47496a1b02151" 
            },
            { 
                id: "a14", 
                title: "Zadatak 14", 
                vdoId: "4f9e46dc1479472db1da59865979ffb7" 
            },
            { 
                id: "a15", 
                title: "Zadatak 15", 
                vdoId: "853277096f7244f38d37dd4ced648212" 
            },
            { 
                id: "a16", 
                title: "Zadatak 16", 
                vdoId: "181bc7cf28b741d2a88e352359cca5c5" 
            },
            { 
                id: "a17", 
                title: "Zadatak 17", 
                vdoId: "e507bb8a33694205b86717f5d64d13e1" 
            },
            { 
                id: "a18", 
                title: "Zadatak 18", 
                vdoId: "7fb92c27b2294d508bff407b13f0c5b7" 
            },
            { 
                id: "a19", 
                title: "Zadatak 19", 
                vdoId: "901bec25d8634e0c808bfb7fa9222b1c" 
            },
            { 
                id: "a20", 
                title: "Zadatak 20", 
                vdoId: "0ee1e57a10124a6492b2df3fd472cd4b" 
            },
            { 
                id: "a21", 
                title: "Zadatak 21", 
                vdoId: "dca36e4dd4264c2aa45fa8d713c2b81d" 
            },
            { 
                id: "a22", 
                title: "Zadatak 22", 
                vdoId: "5e07ba65c80944a89806dbcd32bd4ea7" 
            }
        ]
    },
    {
        moduleTitle: "02. Magnetni diskovi",
        lessons: [
            { 
                id: "b1", 
                title: "Zadatak 1", 
                vdoId: "baa1b5552ff74e288118a69c4fcae5ed" 
            },
            { 
                id: "b2", 
                title: "Zadatak 2", 
                vdoId: "d14dd86c82af429a8769f396f969bf90" 
            },
            { 
                id: "b3", 
                title: "Zadatak 3", 
                vdoId: "433b8051deb140abb98b0183a5fcff84" 
            }
        ]
    },
    {
        moduleTitle: "03. Java",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "d7c80cd5f10c4749a4d021e57ea0e8ba" 
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "3183e1824d95479e9cd38f99883e964b" 
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "2c526fdb39eb4dbbbf2b8287b53c7a61" 
            },
            { 
                id: "c4", 
                title: "Zadatak 4", 
                vdoId: "632d9130a5764deaaded52579b76734b" 
            },
            { 
                id: "c5", 
                title: "Zadatak 5", 
                vdoId: "3a4121a05a0849378fddfb405247f1ad" 
            },
            { 
                id: "c6", 
                title: "Zadatak 6", 
                vdoId: "da4ef190bc4343698e0f4336b2ea251a" 
            },
            { 
                id: "c7", 
                title: "Zadatak 7", 
                vdoId: "92902b572f9540a99e2a2c6d761554b8" 
            },
            { 
                id: "c8", 
                title: "Zadatak 8", 
                vdoId: "ffc5bb816e01447aa7c67ccdb1e43234" 
            },
            { 
                id: "c9", 
                title: "Zadatak 9", 
                vdoId: "b619bdf7a28d4d858643b48e594b526b" 
            },
            { 
                id: "c10", 
                title: "Zadatak 10", 
                vdoId: "b2cc6cd912aa43449a0489b8c3d08aea" 
            },
            { 
                id: "c11", 
                title: "Zadatak 11", 
                vdoId: "f182d153cc7f4234941f57334e85db72" 
            },
            { 
                id: "c12", 
                title: "Zadatak 12", 
                vdoId: "04998853737e49f1947c0a50180c3c1a" 
            },
            { 
                id: "c13", 
                title: "Zadatak 13", 
                vdoId: "2ba4e9739e6b4ab39221ea42d3cb5b60" 
            },
            { 
                id: "c14", 
                title: "Zadatak 14", 
                vdoId: "2bf59cbb3a274391b70331184fb4ad8e" 
            }
        ]
    },
    {
        moduleTitle: "04. IP adrese",
        lessons: [
            { 
                id: "d1", 
                title: "Zadatak 1", 
                vdoId: "152bfb8e5aaa4abebc35eb5b307fc99e" 
            },
            { 
                id: "d2", 
                title: "Zadatak 2", 
                vdoId: "3a5b8665f8ea4e0380754b495a4e3f86" 
            },
            { 
                id: "d3", 
                title: "Zadatak 3", 
                vdoId: "54233bf767814493a8427be229e482e9" 
            },
            { 
                id: "d4", 
                title: "Zadatak 4", 
                vdoId: "972645423a004ac5825395bb0cc5c1dc" 
            },
            { 
                id: "d5", 
                title: "Zadatak 5", 
                vdoId: "57041745e8694d89807f7902012548a7" 
            }
        ]
    }
];

startPlayer({
    mode: "paid",
    courseId: "oikt-klk2",
    title: "OIKT — 2. kolokvijum",
    coursePage: "/oikt/",
    modules: courseData
});
