import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Algebarske strukture",
        lessons: [
            {
                id: "a1",
                title: "Uvod",
                vdoId: "c431b9d5280b4fe9a9c3331212311216"
            },
            {
                id: "a2",
                title: "Osobine",
                vdoId: "dced05f442fe4072b91c2cec3b9779b8"
            },
            {
                id: "a3",
                title: "Zadatak 1",
                vdoId: "32f4aae317044a00bd6a0bc2e496a58b"
            },
            {
                id: "a4",
                title: "Zadatak 2",
                vdoId: "f6660aea55dd4ff09a047499284dfb83"
            },
        ]
    },
    {
        moduleTitle: "02. Determinante",
        lessons: [
            {
                id: "b1",
                title: "Uvod",
                vdoId: "e5d1222b0c684a7097ede8b295b944f8"
            },
            {
                id: "b2",
                title: "Zadatak sa parametrima",
                vdoId: "18fe2a7f6ece43a4bf4f1af2e6b40756"
            },
        ]
    },
    {
        moduleTitle: "03. Matrične jednačine",
        lessons: [
            {
                id: "c1",
                title: "Inverzna matrica",
                vdoId: "3a1e10d4b5084ced90ce9106366a849e"
            },
            {
                id: "c2",
                title: "Zadatak 1",
                vdoId: "1f84171e1c6d4ae1afb6eefdf4e7a2dd"
            },
            {
                id: "c3",
                title: "Zadatak 2",
                vdoId: "952ff676fbc44b849475e3edb8773c56"
            },
        ]
    },
    {
        moduleTitle: "04. Vektori",
        lessons: [
            {
                id: "d1",
                title: "Zadatak 1",
                vdoId: "cd005eb540f54af1910fb7d53b9c9a0c"
            },
            {
                id: "d2",
                title: "Zadatak 2",
                vdoId: "baf2fa1fe7004b768229f96293d25696"
            },
            {
                id: "d3",
                title: "Zadatak 3",
                vdoId: "8ac3b3bc78eb4c7eb8b48fa46db12b44"
            },
            {
                id: "d4",
                title: "Zadatak 4",
                vdoId: "f23261179c614abebda39bb3640e3f20"
            },
            {
                id: "d5",
                title: "Zadatak 5",
                vdoId: "627906551587427aa33ce2b33819d3c5"
            },
        ]
    },
    {
        moduleTitle: "05. Sistemi jednačina",
        lessons: [
            {
                id: "e1",
                title: "Zadatak 1",
                vdoId: "2fa0b515964340b88e7ae4b55e339ab0"
            },
            {
                id: "e2",
                title: "Zadatak 2",
                vdoId: "323b2800ad5b4f708dab48f1a9613f71"
            },
            {
                id: "e3",
                title: "Zadatak 3",
                vdoId: "14ee03457926419596c3a90760b5ada5"
            },
        ]
    },
    {
        moduleTitle: "06. Analitička geometrija",
        lessons: [
            {
                id: "f1",
                title: "Zadatak 1",
                vdoId: "431580c1bad342e4a5ca4fb2d59d64e5"
            },
        ]
    },
    {
        moduleTitle: "07. Kolokvijum 2023 Grupa 1",
        lessons: [
            {
                id: "g1",
                title: "Zadatak 1",
                vdoId: "66c9cf61f1b3405c8a9da16ecabe741e"
            },
            {
                id: "g2",
                title: "Zadatak 2",
                vdoId: "6fa06b904fb34299b313055d9aaf14d1"
            },
            {
                id: "g3",
                title: "Zadatak 3",
                vdoId: "b5717b5825b940cabfdcfa8b6caf5952"
            },
        ]
    },
    {
        moduleTitle: "08. Kolokvijum 2023 Grupa 2",
        lessons: [
            {
                id: "h1",
                title: "Zadatak 1",
                vdoId: "0c92fd5eb40743f099f95129c24c3a27"
            },
            {
                id: "h2",
                title: "Zadatak 2",
                vdoId: "d390b37023844ba4abd8d9108ba603b0"
            },
            {
                id: "h3",
                title: "Zadatak 3",
                vdoId: "25ed8947b2cc4b08b33e42e7370103b1"
            },
        ]
    },
    {
        moduleTitle: "09. Kolokvijum 2023 Grupa 3",
        lessons: [
            {
                id: "i1",
                title: "Zadatak 1",
                vdoId: "b422a39c43e24aed838247c5488f9a47"
            },
            {
                id: "i2",
                title: "Zadatak 2",
                vdoId: "44b9b42e093649638a05bd26b97e1bc9"
            },
            {
                id: "i3",
                title: "Zadatak 3",
                vdoId: "52cbcae17fc542c2846dee73dfcc7fac"
            },
        ]
    },
    {
        moduleTitle: "10. Kolokvijum 2023 Grupa 4",
        lessons: [
            {
                id: "j1",
                title: "Zadatak 1",
                vdoId: "d8fb89ce719345d8875189f82a7e070e"
            },
            {
                id: "j2",
                title: "Zadatak 2",
                vdoId: "3180be93f92b414ab49d613b6b8bb3c5"
            },
            {
                id: "j3",
                title: "Zadatak 3",
                vdoId: "89273ace6cad4a74a77926f4d4c5d1de"
            },
        ]
    },
    {
        moduleTitle: "11. Kolokvijum 2023 Grupa 5",
        lessons: [
            {
                id: "k1",
                title: "Zadatak 1",
                vdoId: "d6228c90eca44295a5f8d996badab5eb"
            },
            {
                id: "k2",
                title: "Zadatak 2",
                vdoId: "5728e10faff24796a95af723eff2c388"
            },
            {
                id: "k3",
                title: "Zadatak 3",
                vdoId: "0207b90c14ff41c98a44cb7a5b88678a"
            },
        ]
    },
    {
        moduleTitle: "12. Kolokvijum 2023 Grupa 6",
        lessons: [
            {
                id: "l1",
                title: "Zadatak 1",
                vdoId: "9c62ba5fd9df48f0b0e91765e5d6c396"
            },
            {
                id: "l2",
                title: "Zadatak 2",
                vdoId: "8f5708c5cf0f40caa447f471610f59b2"
            },
            {
                id: "l3",
                title: "Zadatak 3",
                vdoId: "676d442e342c4859947e1f71b6519cca"
            },
        ]
    },
    {
        moduleTitle: "13. Kolokvijum 2023 Grupa 7",
        lessons: [
            {
                id: "m1",
                title: "Zadatak 1",
                vdoId: "fad19277cb024b56ba9767d1f96e9dc9"
            },
            {
                id: "m2",
                title: "Zadatak 2",
                vdoId: "4746c65fbbe9420e9160b2fca2df5947"
            },
            {
                id: "m3",
                title: "Zadatak 3",
                vdoId: "2c2383f8ac30465d8850f0b2c7b00669"
            },
        ]
    },
    {
        moduleTitle: "14. Kolokvijum 2023 Grupa 8",
        lessons: [
            {
                id: "n1",
                title: "Zadatak 1",
                vdoId: "0bdcb7ec8371427292ef882d247b390b"
            },
            {
                id: "n2",
                title: "Zadatak 2",
                vdoId: "534cf2249cea426ebf3c806275f63fc9"
            },
            {
                id: "n3",
                title: "Zadatak 3",
                vdoId: "8cccef95f1434945ab8f2d18c7cc9a7d"
            },
        ]
    },
];

startPlayer({
    mode: "paid",
    courseId: "mat1-klk1",
    title: "Matematika 1 — 1. kolokvijum",
    coursePage: "/mat1/",
    modules: courseData
});
