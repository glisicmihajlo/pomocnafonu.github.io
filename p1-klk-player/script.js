import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Uvod u programiranje",
        lessons: [
            { 
                id: "a1",
                title: "Osnovni tipovi podataka",
                vdoId: "68f1dfc878b84b10bb13abd8343bcd50"
            },
            { 
                id: "a2",
                title: "Rad sa konzolom",
                vdoId: "06547df9a7004a02b7c80df73520e2a3"
            },
            { 
                id: "a3",
                title: "Matematičke operacije i Math biblioteka",
                vdoId: "65bddd7dde6148cf84141bc111361c63"
            },
            { 
                id: "a4",
                title: "Naredbe grananja",
                vdoId: "7401e62d1cee4095a352307f134c5bc7"
            },
            { 
                id: "a5",
                title: "Naredbe ponavljanja",
                vdoId: "f100bef47bfd475b957feb3ff5212b83"
            },
            { 
                id: "a6",
                title: "Metode/funkcije",
                vdoId: "4fafeceaf4ea48bc89bb4094ab7cd726"
            },
        ]
    },
    {
        moduleTitle: "02. Stringovi",
        lessons: [
            { 
                id: "b1",
                title: "Uvod u stringove",
                vdoId: "8560d238b8154c038785b8ffe8fc26e7"
            },
            { 
                id: "b2",
                title: "IndexOf, Substring, Split",
                vdoId: "51cb2f5e745247afb468cf420d86fe71"
            },
            { 
                id: "b3",
                title: "Validacije",
                vdoId: "6def1865c7e848829f0a661b19325d1a"
            },
        ]
    },
    {
        moduleTitle: "03. Datumi",
        lessons: [
            { 
                id: "c1",
                title: "Osnovne metode",
                vdoId: "4e89b3376a1f4c3fa12ca44744d9346f"
            },
            { 
                id: "c2",
                title: "Razlika izmedju dva datuma",
                vdoId: "c86f8f20842e4c95ba5f8972cd0022ff"
            },
            { 
                id: "c3",
                title: "Parsiranje i formatiranje datuma",
                vdoId: "3b5262699852459fb71cb65a14c15e75"
            },
            { 
                id: "c4",
                title: "Validacije",
                vdoId: "f63356780dcc4f3292e2975dff0e2fee"
            },
        ]
    },
    {
        moduleTitle: "04. Objektno orijentisano programiranje",
        lessons: [
            { 
                id: "d1",
                title: "Kreiranje klase, objekta, paketa, toString",
                vdoId: "3edd5f5d2aa14e898ac5665835b991aa"
            },
            { 
                id: "d2",
                title: "Equals i ==",
                vdoId: "00fb2a75083a4a57aeec837ab909f3c9"
            },
            { 
                id: "d3",
                title: "Get i set metode",
                vdoId: "f9f2853f757b40f989789a0085dc96e0"
            },
            { 
                id: "d4",
                title: "Atribut datum",
                vdoId: "fec50a424e4948de9b42f07186323db7"
            },
            { 
                id: "d5",
                title: "Enum",
                vdoId: "e04d8a8c083a4ff08963a961e8cf573c"
            },
            { 
                id: "d6",
                title: "Zadatak za samostalan rad",
                vdoId: "5a034b7dbaf440268aec97821bb83998"
            },
        ]
    },
    {
        moduleTitle: "05. Nizovi",
        lessons: [
            { 
                id: "e1",
                title: "Uvod u nizove",
                vdoId: "410cbf5733d04c5cb1f1e3983e8e3762"
            },
            { 
                id: "e2",
                title: "Konstruktori u klasi Osoba",
                vdoId: "acafaf827dca4650a03d396352cc60c5"
            },
            { 
                id: "e3",
                title: "Konstruktori sa nizovima",
                vdoId: "564e0494ce91409e9c057dd3a8872355"
            },
            { 
                id: "e4",
                title: "Metoda za dodavanje objekata u niz",
                vdoId: "0c220d569e3342878601b9713463876f"
            },
            { 
                id: "e5",
                title: "Ostale metode za više poena",
                vdoId: "8a0c9fb69c004022ac91c19988aea0fb"
            },
            { 
                id: "e6",
                title: "Sortiranje",
                vdoId: "9e110ff4cdea44cfa3f5864b5846d5ef"
            },
            { 
                id: "e7",
                title: "Ažuriranje objekata",
                vdoId: "c0f095b2fc72446abbd7bfe884a4bec3"
            },
        ]
    },
    {
        moduleTitle: "06. Nasleđivanje",
        lessons: [
            { 
                id: "f1",
                title: "Uvod u nasleđivanje",
                vdoId: "1e9a576a4af441a2a81b7bed60347d0d"
            },
            { 
                id: "f2",
                title: "Teži primeri",
                vdoId: "412aa2edda31499e966e0c2caf009206"
            },
        ]
    },
    {
        moduleTitle: "07. Rok - Praznici",
        lessons: [
            { 
                id: "g1",
                title: "Enum VrstaPraznika",
                vdoId: "4c85dfe01e964deb8f2813f55d067b72"
            },
            { 
                id: "g2",
                title: "Klasa DnevnaStatistika",
                vdoId: "018654a73b144877863c25bd6c15c207"
            },
            { 
                id: "g3",
                title: "Klasa LunaPark",
                vdoId: "3bb383ab1b564dc789a4ef303d7815bc"
            },
            { 
                id: "g4",
                title: "Metoda unesiStatistikeZaDan",
                vdoId: "db3fb439d8d04f169d37312bbc00a804"
            },
            { 
                id: "g5",
                title: "Metoda vratiSumirano",
                vdoId: "0dc4d29fe2074804bdfa9383dd622496"
            },
            { 
                id: "g6",
                title: "Klasa TestLunaPark",
                vdoId: "058f1c4af0dd41559b81450b6a7588a0"
            },
        ]
    },
    {
        moduleTitle: "08. Rok - Zatvorenici",
        lessons: [
            { 
                id: "h1",
                title: "Klasa Zatvorenik",
                vdoId: "494489082a5e4827a264b1081d5b6a34"
            },
            { 
                id: "h2",
                title: "Klasa DozivotniZatvorenik",
                vdoId: "e667df64af2546338052aeac2377c22f"
            },
            { 
                id: "h3",
                title: "Klasa Zatvor",
                vdoId: "86b2f216267d4e518a13112583db4b19"
            },
            { 
                id: "h4",
                title: "Metoda uslovniOtpust",
                vdoId: "66119cf3fcea46059fbff341f72cbfe9"
            },
            { 
                id: "h5",
                title: "Metoda uvediZatvorenike",
                vdoId: "995642d4890e4053974674fad76bdd58"
            },
            { 
                id: "h6",
                title: "Klasa ProbaZatvor",
                vdoId: "5a1658e2817e495594deff5a9c7972b9"
            },
        ]
    },
    {
        moduleTitle: "09. Rok - Police sa džakovima",
        lessons: [
            { 
                id: "i1",
                title: "Klasa PolicaZaDzakove",
                vdoId: "a20b184cf9544b22a523d76bf846182a"
            },
            { 
                id: "i2",
                title: "Klasa MagacinSecera",
                vdoId: "661943e041d04a8d9f8622fc91774186"
            },
            { 
                id: "i3",
                title: "Metoda primi",
                vdoId: "98cbaacd348041bd889927792f606429"
            },
            { 
                id: "i4",
                title: "Metoda otpremi",
                vdoId: "3c5a530d0f314ad9a5ce08709aee6927"
            },
            { 
                id: "i5",
                title: "Klasa ProbaMagacinSecera",
                vdoId: "fa09afac02444666b575af72c7d16f9c"
            },
        ]
    },
    {
        moduleTitle: "10. Rok - Računarski centar",
        lessons: [
            { 
                id: "j1",
                title: "Enum StatusRacunara i klasa Racunar",
                vdoId: "9aa967f39137402ab1f8d65a47e77239"
            },
            { 
                id: "j2",
                title: "Klasa RacunarskiCentar",
                vdoId: "85cbfc576bd34e7591b6606762d0bd53"
            },
            { 
                id: "j3",
                title: "Metoda vratiLoseRacunare",
                vdoId: "c2661d25bdfb459fa4c6f78a4efab015"
            },
            { 
                id: "j4",
                title: "Metoda brojSala",
                vdoId: "5cbc06ee73254e0ba9e2b7e7da810d97"
            },
            { 
                id: "j5",
                title: "Klasa ProbaRacunarskiCentar",
                vdoId: "1d85f4493f4e491089aa920bc7edb986"
            },
        ]
    },
    {
        moduleTitle: "11. Rok - Plivači",
        lessons: [
            { 
                id: "k1",
                title: "Enum StilPlivanja i klasa Plivac",
                vdoId: "a14a126e73564935aafaab8bdcfd95f7"
            },
            { 
                id: "k2",
                title: "Klasa PlivackoTakmicenje",
                vdoId: "d6c2a52bd4a44594985576d3625059e6"
            },
            { 
                id: "k3",
                title: "Metoda pronadjiRezultate",
                vdoId: "47f66a64d8b34394a0692282dfa66b71"
            },
            { 
                id: "k4",
                title: "Klasa ProbaPlivackoTakmicenje",
                vdoId: "5d637f0f0b7e46ccb8626abef91ea387"
            },
        ]
    },
    {
        moduleTitle: "12. Rok - Telefoni",
        lessons: [
            { 
                id: "l1",
                title: "Klasa MobilniTelefon",
                vdoId: "ff0ba18e0fb541c68901794eb0825090"
            },
            { 
                id: "l2",
                title: "Klasa SmartTelefon",
                vdoId: "35152f4134df4f9da166fd74da4bf2f0"
            },
            { 
                id: "l3",
                title: "Klasa ProdavnicaTelefona",
                vdoId: "fa826ade51484aba830063fa125487d4"
            },
            { 
                id: "l4",
                title: "Metoda ispisiPoDijagonalama",
                vdoId: "86992f2853564616b6088c46b190f514"
            },
            { 
                id: "l5",
                title: "Klasa ProbaProdavnica",
                vdoId: "f5fabdedb4234c089c44070e306fab9a"
            },
        ]
    },
    {
        moduleTitle: "13. Rok - Atrakcije",
        lessons: [
            { 
                id: "m1",
                title: "Klasa Atrakcija",
                vdoId: "e3e70fd7474f4f0aa27cbdbb26dfa157"
            },
            { 
                id: "m2",
                title: "Klase Bazen i Tobogan",
                vdoId: "b27441a3d8d347098af556c0a7cc293b"
            },
            { 
                id: "m3",
                title: "Klasa AkvaPark",
                vdoId: "72f1e4fb3746467db07470e5c34f67b3"
            },
            { 
                id: "m4",
                title: "Metoda izlistajAtrakcije",
                vdoId: "d7039ebac60e4537a0c99ac041eddee8"
            },
            { 
                id: "m5",
                title: "Metoda napraviIzvestaj",
                vdoId: "c58223064e3c4482a32566df362254ea"
            },
        ]
    },
    {
        moduleTitle: "14. Rok - Teniseri",
        lessons: [
            { 
                id: "n1",
                title: "Enum StatusTenisera i klasa Teniser",
                vdoId: "9f80ef9ec5d348f0a5171bc7bd2a08e0"
            },
            { 
                id: "n2",
                title: "Klasa TeniskaRangLista",
                vdoId: "8444494351ca4e2595a9bd83c3c04151"
            },
            { 
                id: "n3",
                title: "Metoda unesiTenisera",
                vdoId: "c57d71db006e472595f1043112a3c593"
            },
            { 
                id: "n4",
                title: "Metoda vratiNajboljeMlade",
                vdoId: "76301bef97714bddafff3dbd1c6ff3d2"
            },
            { 
                id: "n5",
                title: "Klasa ProbaTeniskaRangLista",
                vdoId: "8799bb254fab41008e5e30ceb3b460cb"
            },
        ]
    },
    {
        moduleTitle: "15. Rok - Prodavnica tastatura",
        lessons: [
            { 
                id: "o1",
                title: "Enumi TipPrekidaca i BojaPrekidaca",
                vdoId: "d264416421cd467ca16b304862d20904"
            },
            { 
                id: "o2",
                title: "Klasa ProdavnicaTastatura",
                vdoId: "98f2b4282fc343fcb6d711e34ac01150"
            },
            { 
                id: "o3",
                title: "Metoda prijemRobe",
                vdoId: "0a8ea41f06ce4e01bdd91eeebf1178d6"
            },
            { 
                id: "o4",
                title: "Klasa ProbaProdavnicaTastatura",
                vdoId: "87e2861bf7b94488bbb0d930fc4a8a5d"
            },
        ]
    },
    {
        moduleTitle: "16. Ispravka koda",
        lessons: [
            { 
                id: "p1",
                title: "Ispiši X",
                vdoId: "75e7b2e3b7fc4267916cd2bf0ac08469"
            },
            { 
                id: "p2",
                title: "Ispiši M",
                vdoId: "5a5fd9e134b74b82a5a8a040ecee4611"
            },
            { 
                id: "p3",
                title: "Ispiši A",
                vdoId: "b2da9a3ce24f47aa9902d45cbbc3c09f"
            },
            { 
                id: "p4",
                title: "Poređenje stringova",
                vdoId: "cb8200d70b174620ad470dc1a7225bb3"
            },
            { 
                id: "p5",
                title: "Fibonačijev niz",
                vdoId: "caf559714096491d80d844f85157307b"
            },
            { 
                id: "p6",
                title: "Ispiši kvadrate",
                vdoId: "be5277f33856433c929faa3ef02f4d16"
            },
            { 
                id: "p7",
                title: "Ispiši romb",
                vdoId: "fbf523ca79b54f0e94a2cc6494c2c76d"
            },
            { 
                id: "p8",
                title: "Ispiši obrnuto M",
                vdoId: "9db931ce87b748479e07ef99dec11c5d"
            },
        ]
    },
];

startPlayer({
    mode: "paid",
    courseId: "p1-klk",
    title: "Programiranje 1 — kolokvijum",
    coursePage: "/p1/",
    modules: courseData
});
