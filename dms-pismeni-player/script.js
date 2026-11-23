import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Skupovi",
        lessons: [
            { 
                id: "d1", 
                title: "Uvod", 
                vdoId: "316d782b0cd24c8e945d9b2fda2ae939"
            },
            { 
                id: "d2", 
                title: "Zadatak", 
                vdoId: "cc642d51449e48b2a0f302efb40a5fa9"
            },
        ]
    },
    {
        moduleTitle: "02. Iskazni račun",
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
            { 
                id: "a7", 
                title: "Zadatak 1", 
                vdoId: "0b323fe802cc41b6b8c8347104520049"
            },
            { 
                id: "a8", 
                title: "Zadatak 2", 
                vdoId: "5439956cdac5444881ba9b2e8702d95b"
            },
            { 
                id: "a9", 
                title: "Zadatak 3", 
                vdoId: "ded991749f024544bc12f7ad5660005f"
            },
        ]
    },
    {
        moduleTitle: "03. Predikatski račun",
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
                id: "b12", 
                title: "Zadatak 8", 
                vdoId: "ad4e41d205b14723b21ed990f9805d5b"
            },
            { 
                id: "b13", 
                title: "Zadatak 9", 
                vdoId: "eeaab7cc64134726826073288f339e9c"
            },
            { 
                id: "b14", 
                title: "Zadatak 10", 
                vdoId: "8cc1367ffc824db4a7fbd5a6154ec207"
            },
            { 
                id: "b8", 
                title: "Rokovi - Zadatak 1", 
                vdoId: "77957dadd98d4840a0ed045e9425576c"
            },
            { 
                id: "b9", 
                title: "Rokovi - Zadatak 2", 
                vdoId: "d769ebb3a98a46608d0673fb111775ff"
            },
            { 
                id: "b10", 
                title: "Rokovi - Zadatak 3", 
                vdoId: "b1273ca306234c87abebe1d4ab28f053"
            },
            { 
                id: "b11", 
                title: "Rokovi - Zadatak 4", 
                vdoId: "cd8cfa8f06e945ffbd160eb5e82f214f"
            },
        ]
    },
    {
        moduleTitle: "04. Relacije",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "548ac8f3edf743639f941c9cb3582281"
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "7e31c969f06e413aa64d57739e43795f"
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "41df4265908a4bcf98c2775e69e07282"
            },
            { 
                id: "c4", 
                title: "ROKOVI - Zadatak 1", 
                vdoId: "bdff7496237f4bcd849a80271e82beed"
            },
        ]
    },
    // sledeci modul treba da ima id e1,2...
];

startPlayer({
    mode: "paid",
    courseId: "dms-pismeni",
    title: "DMS — pismeni",
    coursePage: "/dms/",
    modules: courseData
});
