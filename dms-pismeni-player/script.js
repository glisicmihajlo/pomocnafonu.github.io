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
    {
        moduleTitle: "05. Neorijentisani grafovi",
        lessons: [
            { 
                id: "e1", 
                title: "Crtanje", 
                vdoId: "99c923bd50b243188209a51e89cfb1ec"
            },
            { 
                id: "e2", 
                title: "Stepeni", 
                vdoId: "9fd76d5b9b4641f39e1e46ee75eb5dba"
            },
            { 
                id: "e3", 
                title: "Zbir elemenata", 
                vdoId: "1f6ef56888c04a0f9d6e54d1c142183a"
            },
            { 
                id: "e4", 
                title: "Broj puteva", 
                vdoId: "2eaec39e43164e4b9da321aa21e571b1"
            },
            { 
                id: "e5", 
                title: "Podgraf", 
                vdoId: "40c1dfc10f75413eb169b635a4af8307"
            },
            { 
                id: "e6", 
                title: "Ojler", 
                vdoId: "b6ecc409264044a3bb82dab5486f7823"
            },
            { 
                id: "e7", 
                title: "Ojler - Matrica", 
                vdoId: "d3ce2a18250c45bbb22df3ec5d52d779"
            },
            { 
                id: "e8", 
                title: "Hamilton", 
                vdoId: "7b1bbded35dd441f967118c61e337821"
            },
            { 
                id: "e9", 
                title: "Matrica rastojanja", 
                vdoId: "dade1a5978494b338699cc0cd479a17b"
            },
            { 
                id: "e10", 
                title: "Graf preko matrice", 
                vdoId: "f2eb79f1727d4877b7f8c3af29d3f820"
            },
            { 
                id: "e11", 
                title: "Graf preko matrice svojstva", 
                vdoId: "9d4c3a6dc25242a2b6f5b46a34d854e6"
            },
        ]
    },
    {
        moduleTitle: "06. Orijentisani grafovi",
        lessons: [
            { 
                id: "f1", 
                title: "Crtanje", 
                vdoId: "3f84383df90d4677b172352dc64ce816"
            },
            { 
                id: "f1", 
                title: "Stepeni", 
                vdoId: "b857b0eed91b4c5e97edba260b92e4ed"
            },
            { 
                id: "f1", 
                title: "Zbir elemenata", 
                vdoId: "c7f24723cbe44b1695d2a479119bb778"
            },
            { 
                id: "f1", 
                title: "Broj puteva", 
                vdoId: "4f3be4bc8e044a57838102f5a154bd77"
            },
            { 
                id: "f1", 
                title: "Podgraf", 
                vdoId: "f7f0314c249c42048f9057aeaf78e24f"
            },
            { 
                id: "f1", 
                title: "Putevi konture", 
                vdoId: "473f27c4bc6445e7b5e7ba49896006fa"
            },
            { 
                id: "f1", 
                title: "Matrica rastojanja", 
                vdoId: "0121751c4b8a47789c43442e8e29658d"
            },
        ]
    },
    {
        moduleTitle: "07. Stabla",
        lessons: [
            { 
                id: "g1", 
                title: "Uvod", 
                vdoId: "ef59688502364da786010ff6047a6d1f"
            },
            { 
                id: "g1", 
                title: "Kodiranje", 
                vdoId: "853a312cd8104d7d91624fe6c44180ef"
            },
            { 
                id: "g1", 
                title: "Dekodiranje", 
                vdoId: "63179da220ca4b98b53f07d1dd215b0b"
            },
            { 
                id: "g1", 
                title: "LKD", 
                vdoId: "7affcd43a49347e1a045973e16956468"
            },
            { 
                id: "g1", 
                title: "KLD", 
                vdoId: "e1896c1627f54add80aeba3c582613b6"
            },
            { 
                id: "g1", 
                title: "LDK", 
                vdoId: "2950b1d5bfe04fd9ab7f40f6ba11acc9"
            },
            { 
                id: "g1", 
                title: "Sortiranje", 
                vdoId: "8dcafd25edc74db89404f4cc4d06e8a0"
            },
            { 
                id: "g1", 
                title: "Nivoi", 
                vdoId: "78b148ce191c4f41b0562c8122e41e7f"
            },
            { 
                id: "g1", 
                title: "Kodiranje 2", 
                vdoId: "f6aaad0c83e64b879f433b3a9bd34c82"
            },
            { 
                id: "g1", 
                title: "Prolaz", 
                vdoId: "ee7b8cf582a0429d9635ae6fb269a144"
            },
        ]
    },
];

startPlayer({
    mode: "paid",
    courseId: "dms-pismeni",
    title: "DMS — pismeni",
    coursePage: "/dms/",
    modules: courseData
});
