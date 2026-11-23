import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Nizovi",
        lessons: [
            {
                id: "a1",
                title: "Zadatak 1",
                vdoId: "8b87615bec624e2fa6f3f5ea92dca57c"
            },
            {
                id: "a2",
                title: "Zadatak 2",
                vdoId: "5c097c5c49184e43be997bee0627aa4d"
            },
            {
                id: "a3",
                title: "Zadatak 3",
                vdoId: "b254d3432cc846e6b9e0e364094fac8b"
            },
            {
                id: "a4",
                title: "Zadatak 4",
                vdoId: "d48ba9aafddf4554ae5cda26da6222bb"
            },
            {
                id: "a5",
                title: "Zadatak 5",
                vdoId: "68340d649fa7427692b99ed30c71a8e6"
            },
            {
                id: "a6",
                title: "Zadatak 6",
                vdoId: "6a5d94a736c84b248c5c05fc984b366c"
            },
            {
                id: "a7",
                title: "Zadatak 7",
                vdoId: "95f223f8040e40c78c6b05dd22adab7b"
            },
        ]
    },
    {
        moduleTitle: "02. Tačke nagomilavanja",
        lessons: [
            {
                id: "b1",
                title: "Uvod",
                vdoId: "31a3e6b495ca47ca9873e0326d24636a"
            },
            {
                id: "b2",
                title: "Zadatak 1",
                vdoId: "7f02b7bc8efe4e7b9836f8dd50f0545b"
            },
            {
                id: "b3",
                title: "Zadatak 2",
                vdoId: "faf2de42f92a449091789ec3805cc8f3"
            },
            {
                id: "b4",
                title: "Zadatak 3",
                vdoId: "3c9aec30b9bc496798f1ad032d26db5a"
            },
            {
                id: "b5",
                title: "Zadatak 4",
                vdoId: "3e905dea6f1d42219d95761b1d2e4d26"
            },
            {
                id: "b6",
                title: "Zadatak 5",
                vdoId: "8503be039c5a4293b60bf1b48d3882c5"
            },
        ]
    },
    {
        moduleTitle: "03. Funkcije",
        lessons: [
            {
                id: "c1",
                title: "Uvod",
                vdoId: "75ae1f58cec342bc83865068479eec3a"
            },
            {
                id: "c2",
                title: "Zadatak 1",
                vdoId: "a4a78a09c190463ea02ef066b4d805bb"
            },
            {
                id: "c3",
                title: "Zadatak 2",
                vdoId: "d37b0599af6349909d1b3c0ec91589bc"
            },
        ]
    },
    {
        moduleTitle: "04. Maklorenov polinom",
        lessons: [
            {
                id: "d1",
                title: "Uvod",
                vdoId: "268766c82f6f42bcb4eb16c71b08ed8f"
            },
            {
                id: "d2",
                title: "Zadatak 1",
                vdoId: "a57885ffaab84945b4cbe69e5c68b601"
            },
            {
                id: "d3",
                title: "Zadatak 2",
                vdoId: "543b2d0c3cdd40b9b8dd4b4eaf897750"
            },
            {
                id: "d4",
                title: "Zadatak 3",
                vdoId: "0e84b36241a14143ba2f173c5d76d391"
            },
        ]
    },
    {
        moduleTitle: "05. Tejlorov polinom",
        lessons: [
            {
                id: "e1",
                title: "Uvod",
                vdoId: "57647892805246b7b5ab7e9e9a9c7612"
            },
            {
                id: "e2",
                title: "Zadatak 1",
                vdoId: "3c5762f65a9c418abffceb11d62ecb66"
            },
            {
                id: "e3",
                title: "Zadatak 2",
                vdoId: "5639fbdccb5749dea6b466cb6c0f6d57"
            },
        ]
    },
    {
        moduleTitle: "06. 2021 Februar G4",
        lessons: [
            {
                id: "f1",
                title: "Zadatak 1",
                vdoId: "24da9c71cf0443979613b73b1f79b127"
            },
            {
                id: "f2",
                title: "Zadatak 2",
                vdoId: "66957953dcbb4599b186f73587b7e650"
            },
        ]
    },
    {
        moduleTitle: "07. 2021 Jun G1",
        lessons: [
            {
                id: "g1",
                title: "Zadatak 1",
                vdoId: "24da9c71cf0443979613b73b1f79b127"
            },
            {
                id: "g2",
                title: "Zadatak 2",
                vdoId: "9941e18b89974cef9c03d9af430495b9"
            },
        ]
    },
    {
        moduleTitle: "08. 2021 Septembar G1",
        lessons: [
            {
                id: "h1",
                title: "Zadatak 1",
                vdoId: "6bea9fceb0ea4fc185984b6dc765bc88"
            },
            {
                id: "h2",
                title: "Zadatak 2",
                vdoId: "75dd5643d63a43f6b816fb85807b8a46"
            },
        ]
    },
    {
        moduleTitle: "09. 2022 Januar G2",
        lessons: [
            {
                id: "i1",
                title: "Zadatak 1",
                vdoId: "271896db6e6e45fab1ec800db5cca108"
            },
            {
                id: "i2",
                title: "Zadatak 2",
                vdoId: "18da4fead63b447ab8070e89a1e41a4f"
            },
        ]
    },
    {
        moduleTitle: "10. 2022 Januar G3",
        lessons: [
            {
                id: "j1",
                title: "Zadatak 1",
                vdoId: "3fe66dff0a994418892000379298fc77"
            },
            {
                id: "j2",
                title: "Zadatak 2",
                vdoId: "44f0759decdf47baac96c95a4fac8fcb"
            },
        ]
    },
    {
        moduleTitle: "11. 2022 Januar G4",
        lessons: [
            {
                id: "k1",
                title: "Zadatak 1",
                vdoId: "0a30da3cb3e4427c82c2b2e795604881"
            },
            {
                id: "k2",
                title: "Zadatak 2",
                vdoId: "0f40ff7741d24f4c90f401393bcec51c"
            },
        ]
    },
    {
        moduleTitle: "12. 2022 Jun G2",
        lessons: [
            {
                id: "l1",
                title: "Zadatak 1",
                vdoId: "cd32cd50cc424040a01c35d414211557"
            },
            {
                id: "l2",
                title: "Zadatak 2",
                vdoId: "b6e5fa5a44bd4dc9bc73e1fc5e4b3f63"
            },
        ]
    },
    {
        moduleTitle: "13. 2023 Jul G1",
        lessons: [
            {
                id: "m1",
                title: "Zadatak 1",
                vdoId: "28968219ca6a4f6ea0cdc89f1eaed81a"
            },
            {
                id: "m2",
                title: "Zadatak 2",
                vdoId: "78631805fbf84316b8b6d6905deda2a0"
            },
        ]
    },
    {
        moduleTitle: "14. 2023 Septembar G1",
        lessons: [
            {
                id: "n1",
                title: "Zadatak 1",
                vdoId: "fee4b97cf1ec45ba84d45c0ac5907017"
            },
            {
                id: "n2",
                title: "Zadatak 2",
                vdoId: "ee8d6969e19e40f189c346d8224ce0e7"
            },
        ]
    },
];

startPlayer({
    mode: "paid",
    courseId: "mat1-klk2",
    title: "Matematika 1 — 2. kolokvijum",
    coursePage: "/mat1/",
    modules: courseData
});
