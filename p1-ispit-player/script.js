import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Ponavljanje gradiva sa kolokvijuma",
        lessons: [
            { 
                id: "a1",
                title: "Stringovi: Uvod",
                vdoId: "8560d238b8154c038785b8ffe8fc26e7"
            },
            { 
                id: "a2",
                title: "Stringovi: IndexOf, Substring, Split",
                vdoId: "51cb2f5e745247afb468cf420d86fe71"
            },
            { 
                id: "a3",
                title: "Stringovi: Validacije",
                vdoId: "6def1865c7e848829f0a661b19325d1a"
            },
            { 
                id: "a4",
                title: "Datumi: Uvod",
                vdoId: "4e89b3376a1f4c3fa12ca44744d9346f"
            },
            { 
                id: "a5",
                title: "Datumi: Razlika između dva datuma",
                vdoId: "c86f8f20842e4c95ba5f8972cd0022ff"
            },
            { 
                id: "a6",
                title: "Datumi: Parsiranje i formatiranje",
                vdoId: "3b5262699852459fb71cb65a14c15e75"
            },
            { 
                id: "a7",
                title: "Datumi: Validacije",
                vdoId: "f63356780dcc4f3292e2975dff0e2fee"
            },
            { 
                id: "a8",
                title: "OOP: Kreiranje klase, objekta, paketa, toString",
                vdoId: "3edd5f5d2aa14e898ac5665835b991aa"
            },
            { 
                id: "a9",
                title: "OOP: Equals i ==",
                vdoId: "00fb2a75083a4a57aeec837ab909f3c9"
            },
            { 
                id: "a10",
                title: "OOP: Get i set metode",
                vdoId: "f9f2853f757b40f989789a0085dc96e0"
            },
            { 
                id: "a11",
                title: "OOP: Atribut datum",
                vdoId: "fec50a424e4948de9b42f07186323db7"
            },
            { 
                id: "a12",
                title: "OOP: Enum",
                vdoId: "e04d8a8c083a4ff08963a961e8cf573c"
            },
        ]
    },
    {
        moduleTitle: "02. Izuzeci, apstraktne klase i interfejsi",
        lessons: [
            { 
                id: "b1",
                title: "Izuzeci",
                vdoId: "6a8388b618754426aa19d5586a1acb3d"
            },
            { 
                id: "b2",
                title: "Apstraktne klase i interfejsi",
                vdoId: "54ba473faa324457b9e87ed5e5d94135"
            },
            { 
                id: "b3",
                title: "Primer zadatka",
                vdoId: "3ce66d45998b4b1a93cb1409b0e5c919"
            },
        ]
    },
    {
        moduleTitle: "03. Liste",
        lessons: [
            { 
                id: "c1",
                title: "Uvod u liste",
                vdoId: "faeb4850060041bcbd240c512f4f4e2f"
            },
            { 
                id: "c2",
                title: "Prolazak kroz listu",
                vdoId: "73e8774902094b8a926058feab39cc73"
            },
            { 
                id: "c3",
                title: "Zadaci i primeri iz listi",
                vdoId: "328a23d374384c9babe4f214b042ba6e"
            },
        ]
    },
    {
        moduleTitle: "04. Datoteke",
        lessons: [
            { 
                id: "d1",
                title: "Tekstualne datoteke",
                vdoId: "8896e9ff54dc49a6be8efebf554fb5d2"
            },
            { 
                id: "d2",
                title: "Binarne datoteke",
                vdoId: "3e84be08315143b1868663c7822def16"
            },
        ]
    },
    {
        moduleTitle: "05. Rok bez GUI - Majice",
        lessons: [
            { 
                id: "e1",
                title: "Enum Velicina i klasa Majica",
                vdoId: "7961986b46174c57b6783953313023b5"
            },
            { 
                id: "e2",
                title: "Klasa DecijaMajica",
                vdoId: "76733c5f44a246a6ae03412b9571d610"
            },
            { 
                id: "e3",
                title: "Klasa ProdavnicaMajica",
                vdoId: "7551c05c353c4ae293a08331a7951ef2"
            },
            { 
                id: "e4",
                title: "Klasa LanacProdavnica",
                vdoId: "3f12b73971394c0faec725e98e4238c1"
            },
            { 
                id: "e5",
                title: "Metoda dopuniRadnju",
                vdoId: "2fa406a7238c480fb3429f97f59477ef"
            },
        ]
    },
    {
        moduleTitle: "06. Rok bez GUI - Nameštaj",
        lessons: [
            { 
                id: "f1",
                title: "NamestajException i enum TipPresvlake",
                vdoId: "ba41c95389ea4000aee16a95f18ba593"
            },
            { 
                id: "f2",
                title: "Klasa KancelarijskiNamestaj",
                vdoId: "2ffebef17b97438899474ef6a75e5bc5"
            },
            { 
                id: "f3",
                title: "Klase Stolica i Sto",
                vdoId: "27356eb938224ed5a5d42a1afdfcc604"
            },
            { 
                id: "f4",
                title: "Klasa FabrikaNamestaja",
                vdoId: "b6fff69fd46344249c8a1a3322aafca6"
            },
        ]
    },
    {
        moduleTitle: "07. Ispravka koda",
        lessons: [
            { 
                id: "u1",
                title: "Učitavanje brojeva",
                vdoId: "75e5cef04366488e9ad1d49ea6dab30f"
            },
            { 
                id: "u2",
                title: "Učitavanje brojeva 2",
                vdoId: "59099eb9b6724db99d0c10c4dca2d9a8"
            },
            { 
                id: "u3",
                title: "Fibonači",
                vdoId: "e307b6eefe34489c80da2688585015ba"
            },
            { 
                id: "u4",
                title: "Izbaci duplikate iz niza",
                vdoId: "b3906ff450804159b9e525a034ab13a0"
            },
        ]
    },
];

startPlayer({
    mode: "paid",
    courseId: "p1-ispit",
    title: "Programiranje 1 — ispit",
    coursePage: "/p1/",
    modules: courseData
});
