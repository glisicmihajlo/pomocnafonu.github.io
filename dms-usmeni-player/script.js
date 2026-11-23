import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Skupovi - ponavljanje gradiva",
        lessons: [
            { 
                id: "f1", 
                title: "Uvod", 
                vdoId: "316d782b0cd24c8e945d9b2fda2ae939"
            },
            { 
                id: "f2", 
                title: "Zadatak", 
                vdoId: "cc642d51449e48b2a0f302efb40a5fa9"
            },
        ]
    },
    {
        moduleTitle: "02. Iskazni račun - ponavljanje gradiva",
        lessons: [
            { 
                id: "a1", 
                title: "Uvod", 
                vdoId: "14171668cb5b409bba064a40b525092f"
            },
            { 
                id: "a2", 
                title: "Pretvaranje teksta u iskazne formule", 
                vdoId: "bf00bf6e9f3c4708a0b027663112cc4c"
            },
            { 
                id: "a3", 
                title: "Osnovne operacije", 
                vdoId: "379cf83cebef48bbb7916d147a586b2f"
            },
            { 
                id: "a4", 
                title: "DNF, KNF, SDNF, SKNF", 
                vdoId: "f172a825141d43338a01542d46b62c71"
            },
            { 
                id: "a5", 
                title: "SDNF i SKNF pravila", 
                vdoId: "8e825bf376e74938bf843709724b4a5f"
            },
            { 
                id: "a6", 
                title: "Minimalna formula", 
                vdoId: "3803d5d275474e08888e33b562d56d43"
            },
        ]
    },
    {
        moduleTitle: "03. Predikatski račun - ponavljanje gradiva",
        lessons: [
            { 
                id: "b1", 
                title: "Zadatak 1", 
                vdoId: "c6da224e7ac8489aadb041c942907d70"
            },
            { 
                id: "b2", 
                title: "Zadatak 2", 
                vdoId: "42acf382f5814dc8b14d371f9fc00181"
            },
            { 
                id: "b3", 
                title: "Zadatak 3", 
                vdoId: "21b2d44934be42bb9cfe6a91b8791095"
            },
            { 
                id: "b4", 
                title: "Zadatak 4", 
                vdoId: "e063e91c6eb6468e9ddae68234d8c3ea"
            },
            { 
                id: "b5", 
                title: "Zadatak 5", 
                vdoId: "39128f95fa6d4dc7b4b9b6eae6422c40"
            },
            { 
                id: "b6", 
                title: "Zadatak 6", 
                vdoId: "6f9d9feec6f440c4a09f145e6fc17cb9"
            },
            { 
                id: "b7", 
                title: "Zadatak 7", 
                vdoId: "0629bd1adb5846f599db8880869b8a83"
            },
            { 
                id: "b8", 
                title: "Zadatak 8", 
                vdoId: "ad4e41d205b14723b21ed990f9805d5b"
            },
            { 
                id: "b9", 
                title: "Zadatak 9", 
                vdoId: "eeaab7cc64134726826073288f339e9c"
            },
            { 
                id: "b10", 
                title: "Zadatak 10", 
                vdoId: "8cc1367ffc824db4a7fbd5a6154ec207"
            },
        ]
    },
    {
        moduleTitle: "04. Predikatski račun - rokovi sa usmenog",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "daf10600013448f6baa1c5dfccbf8c7c"
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "41566f4bb8324b67be217280eb8939d2"
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "2591f7c396f3496c88bd05ae77db661a"
            },
            { 
                id: "c4", 
                title: "Zadatak 4", 
                vdoId: "f48bdaeba456439099351ecaf46681fc"
            },
        ]
    },
    {
        moduleTitle: "05. Relacije - ponavljanje gradiva",
        lessons: [
            { 
                id: "d1", 
                title: "Zadatak 1", 
                vdoId: "548ac8f3edf743639f941c9cb3582281"
            },
            { 
                id: "d2", 
                title: "Zadatak 2", 
                vdoId: "7e31c969f06e413aa64d57739e43795f"
            },
            { 
                id: "d3", 
                title: "Zadatak 3", 
                vdoId: "41df4265908a4bcf98c2775e69e07282"
            },
        ]
    },
    {
        moduleTitle: "06. Relacije - rokovi sa usmenog",
        lessons: [
            { 
                id: "e1", 
                title: "Zadatak 1", 
                vdoId: "984efc44c41d40f0a98130dbff144878"
            },
            { 
                id: "e2", 
                title: "Zadatak 2", 
                vdoId: "7ead31aede39450f8b16314e1635a42c"
            },
            { 
                id: "e3", 
                title: "Zadatak 3", 
                vdoId: "2efe37921a1b4676a2963a0bb651588e"
            },
            { 
                id: "e4", 
                title: "Zadatak 4", 
                vdoId: "520b990de4e24e51889a53a7f0c62fe7"
            },
            { 
                id: "e5", 
                title: "Zadatak 5", 
                vdoId: "156fd67039884194b2380595d8489b29"
            },
        ]
    },
    // sledeci modul treba da ima id g1,2...
];

startPlayer({
    mode: "paid",
    courseId: "dms-usmeni",
    title: "DMS — usmeni",
    coursePage: "/dms/",
    modules: courseData
});
