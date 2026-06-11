import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-functions.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.appspot.com",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a",
    measurementId: "G-768582D9M9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const getVideoAuth = httpsCallable(functions, 'getVideoAuth');

const CURRENT_COURSE_ID = "pp-pismeni"; 

const courseData = [
    {
        moduleTitle: "01. Linijski programi",
        lessons: [
            { 
                id: "a1", 
                title: "Prvi program u C-u", 
                vdoId: "b436a8064a8d481ea914479800c05eaa" 
            },
            { 
                id: "a2", 
                title: "Promenljive i tipovi", 
                vdoId: "2e2f7b271a8445f0a2f77d4018a1082c" 
            },
            { 
                id: "a3", 
                title: "Formatiran ispis (printf)", 
                vdoId: "a3275b0fe5e54d74996a0ff7796d89a2" 
            },
            { 
                id: "a4", 
                title: "Unos podataka (scanf)", 
                vdoId: "886753a9ff63453483ed5a57ae7567b0" 
            },
            { 
                id: "a5", 
                title: "Matematičke operacije i funkcije", 
                vdoId: "fd9bfb7ff2ee4fa6b4e4c498f04d9ae7" 
            },
            { 
                id: "a6", 
                title: "Ispis tekstualnih poruka", 
                vdoId: "8ef8a887e76b469c892dc7744cf7439a" 
            },
            { 
                id: "a7", 
                title: "Konverzija valuta (dolar-dinar)", 
                vdoId: "d1d9e3c4ff8c4fda95d3314070b0d073" 
            },
            { 
                id: "a8", 
                title: "Obim i površina kruga", 
                vdoId: "4cdc3d2baf344e039aca31b9c2a28200" 
            },
            { 
                id: "a9", 
                title: "Program za kusur", 
                vdoId: "6ff9016379734606841b5946bdb9a0bc" 
            },
            { 
                id: "a10", 
                title: "Pretvaranje ugla (stepeni-minuti-sekunde)", 
                vdoId: "a0ba99cc788c42998ae99520f4c29f9b" 
            },
            { 
                id: "a11", 
                title: "Proizvod cifara četvorocifrenog broja", 
                vdoId: "aa5a1e811cec4a1290cf000a6c13a851" 
            },
            { 
                id: "a12", 
                title: "Verovatnoća izvlačenja loptica", 
                vdoId: "eb92a661f39140a89e09cc62a4bff57e" 
            },
            { 
                id: "a13", 
                title: "Stepenovanje slučajnih brojeva", 
                vdoId: "8112b538a52648e99e82247a42e48dd4" 
            },
            { 
                id: "a14", 
                title: "Nasumičan izbor iz intervala", 
                vdoId: "ff5c0c5019ac4d8e9a10d2fc4c20337c" 
            }
            
        ]
    },
    {
        moduleTitle: "02. If naredba",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod i parnost broja", 
                vdoId: "3fbb4ab7925546838ed6ef853f364244" 
            },
            { 
                id: "b2", 
                title: "Poređenje broja sa nulom", 
                vdoId: "bf0af7b2c6ed4dc49e328ef63fcc436f" 
            },
            { 
                id: "b3", 
                title: "Određivanje ocene na ispitu", 
                vdoId: "d85728530fc94d3eb6b33b7c7256fe8d" 
            },
            { 
                id: "b4", 
                title: "Najveći od tri broja", 
                vdoId: "11c42e5e2132416d865bce4aa3193f0f" 
            },
            { 
                id: "b5", 
                title: "Koren i provera greške", 
                vdoId: "970d945b23bf4b2585948406512d7ab0" 
            },
            { 
                id: "b6", 
                title: "Zbir ili razlika (uslovna)", 
                vdoId: "0b48854083284bb0b57f7e62244296c5" 
            },
            { 
                id: "b7", 
                title: "Deljivost broja M sa N", 
                vdoId: "57b2e25ddc234553bb9754d1841aaeb5" 
            },
            { 
                id: "b8", 
                title: "Provera Armstrongovog broja", 
                vdoId: "b7edd3cd24134564b6605dda618a63b3" 
            },
            { 
                id: "b9", 
                title: "Opisni prikaz ocena", 
                vdoId: "e909854e62e647b89bd73276f7e8b85f" 
            }
        ]
    },
    {
        moduleTitle: "03. For petlja",
        lessons: [
            { 
                id: "c1", 
                title: "Ispis brojeva do N", 
                vdoId: "9d166a7296ed4ab8b95334e2f9dc9e71" 
            },
            { 
                id: "c2", 
                title: "Suma brojeva do N", 
                vdoId: "da7be214239e45d3bc8d57e32865cd39" 
            },
            { 
                id: "c3", 
                title: "Parni brojevi do N", 
                vdoId: "79916d3128304fdc8813d4e4df2836c1" 
            },
            { 
                id: "c4", 
                title: "Faktorijel broja", 
                vdoId: "c09a766c6c384daeb45e307a0e901906" 
            },
            { 
                id: "c5", 
                title: "Odbrojavanje unazad", 
                vdoId: "25e1af0069104597b9be2df8eb3c900d" 
            },
            { 
                id: "c6", 
                title: "Prosek brojeva u intervalu", 
                vdoId: "2461a42d71114586be0dea66cfa1b538" 
            },
            { 
                id: "c7", 
                title: "Svi delioci broja N", 
                vdoId: "3a131f0f8a9e45e288ebc53c025ec171" 
            },
            { 
                id: "c8", 
                title: "Crtanje trougla od zvezdica", 
                vdoId: "ad56746c6edc481aa0c17b39436ab247" 
            }
        ]
    },
    {
        moduleTitle: "04. While petlja",
        lessons: [
            { 
                id: "d1", 
                title: "Brojanje od 1 do N", 
                vdoId: "a030c7999eb9464482648e4f04a59e84" 
            },
            { 
                id: "d2", 
                title: "Odbrojavanje od N do 1", 
                vdoId: "38076d9a31fc43099edc76e9250cbcd6" 
            },
            { 
                id: "d3", 
                title: "Parni brojevi do N", 
                vdoId: "7381c359270a47cfbb579fab07c02648" 
            },
            { 
                id: "d4", 
                title: "Broj cifara u broju", 
                vdoId: "9daa50fd21d441d3acc0c5f21073e981" 
            },
            { 
                id: "d5", 
                title: "Prva i poslednja cifra", 
                vdoId: "e015dfba7ca74d0783224c8fc620b9c2" 
            },
            { 
                id: "d6", 
                title: "Zbir cifara broja", 
                vdoId: "3a6b7b17e90649ef9fae8c64b48959f1" 
            },
            { 
                id: "d7", 
                title: "Proizvod cifara broja", 
                vdoId: "0ce46e0c25de477bbf8ea0a41be8c645" 
            },
            { 
                id: "d8", 
                title: "Provera palindroma", 
                vdoId: "9b32283a3b264d6a927147fe14b3f804" 
            },
            { 
                id: "d9", 
                title: "Prosek do nule", 
                vdoId: "ac40f844a4a347ea922c762ffaf1a5c1" 
            },
            { 
                id: "d10", 
                title: "Do While petlja", 
                vdoId: "5cc1c03ef794488a84269a45e8ad8234" 
            }
        ]
    },
    {
        moduleTitle: "05. Funkcije",
        lessons: [
            { 
                id: "e1", 
                title: "Provera prostog broja", 
                vdoId: "a1c5ee4256c14595a00ed67716724314" 
            },
            { 
                id: "e2", 
                title: "Broj prostih u intervalu", 
                vdoId: "18f0f72e3f034c75a1de71daa0e2eaf7" 
            },
            { 
                id: "e3", 
                title: "Cifra jedinice jednaka 9", 
                vdoId: "8151194f253c4c48a823c46e6e4a0fe4" 
            },
            { 
                id: "e4", 
                title: "Suma brojeva sa cifrom jedinice 9", 
                vdoId: "5c590be95da8499a8530b7b8555c061c" 
            },
            { 
                id: "e5", 
                title: "Savršen broj", 
                vdoId: "2a8c0ba3e7354a63b57c9d2f5864ae52" 
            },
            { 
                id: "e6", 
                title: "Suma cifara (funkcija)", 
                vdoId: "7a17c890816841f990e9f34fa4e6bf5a" 
            },
            { 
                id: "e7", 
                title: "Parni trocifreni sa sumom 13", 
                vdoId: "de1f55bac3ee42ad82d9495c9af974b7" 
            },
            { 
                id: "e8", 
                title: "Suma kvadrata do N", 
                vdoId: "34b46c4b62bf4ab9a4f4bac336bd3b9d" 
            },
            { 
                id: "e9", 
                title: "Trocifreni sa uzastopnim ciframa", 
                vdoId: "65059b11be9e4a12b824637f2e0c80a8" 
            },
            { 
                id: "e10", 
                title: "Parovi prostih blizanaca", 
                vdoId: "f438d8bbd1804433b823c3fa2d16510b" 
            },
            { 
                id: "e11", 
                title: "Rastući redosled cifara", 
                vdoId: "3bdf1da256054920b12abe2fe2dc3118" 
            },
            { 
                id: "e12", 
                title: "Min i max od cifara", 
                vdoId: "bddc67e4ee2340d69812e68ff4aa8194" 
            },
            { 
                id: "e13", 
                title: "Uvod u pokazivače", 
                vdoId: "adb64a321dd44a7488dc5ad7948a6fa2" 
            },
            { 
                id: "e14", 
                title: "Pokazivači i unos broja", 
                vdoId: "f54dd5a605364218b741c76d1807368e" 
            },
            { 
                id: "e15", 
                title: "Zamena vrednosti dva broja", 
                vdoId: "1cd7dc6e9bb748bca00ac6234d99d17b" 
            },
            { 
                id: "e16", 
                title: "Zamena mesta cifara", 
                vdoId: "7cc7ef8c319e40cfaa7626133bd3af64" 
            },
            { 
                id: "e17", 
                title: "Srednja vrednost deljivih brojeva", 
                vdoId: "2e205c277ec746fa8e2ea7efd36c46d3" 
            }
        ]
    },
    {
        moduleTitle: "06. Nizovi",
        lessons: [
            { 
                id: "f1", 
                title: "Ispis elemenata niza", 
                vdoId: "13d8fb66a79343db9b1c0c64710cb705" 
            },
            { 
                id: "f2", 
                title: "Ispis niza preko pokazivača", 
                vdoId: "de043941713148deace1f79be9bd5193" 
            },
            { 
                id: "f3", 
                title: "Suma elemenata niza", 
                vdoId: "d1ec9ce6c3a745a1b8c1e13938dd96b5" 
            },
            { 
                id: "f4", 
                title: "Suma niza (pokazivači)", 
                vdoId: "71c41ede1677430c86792f00e8bab504" 
            },
            { 
                id: "f5", 
                title: "Pretraga elementa u nizu", 
                vdoId: "e159aa7d0a374309922e38a248592412" 
            },
            { 
                id: "f6", 
                title: "Prosek neparnih elemenata", 
                vdoId: "22effbda677048239593c9c95163f06a" 
            },
            { 
                id: "f7", 
                title: "Palindrom u nizu", 
                vdoId: "71957ea5524e4b0c825833688ce53837" 
            },
            { 
                id: "f8", 
                title: "Unos N elemenata", 
                vdoId: "5132d416c5904f04ad708cafef395266" 
            },
            { 
                id: "f9", 
                title: "Najmanji parni element", 
                vdoId: "f5a730ca2dbe49f2bf90ae4df532aab8" 
            },
            { 
                id: "f10", 
                title: "Elementi manji od proseka", 
                vdoId: "4b0ce3000c374567ac621061092fcd52" 
            },
            { 
                id: "f11", 
                title: "Pomeranje niza udesno", 
                vdoId: "3f826e642ab4476f9a76dc1bad880b3a" 
            },
            { 
                id: "f12", 
                title: "Pomeranje za K mesta", 
                vdoId: "220dd75bd69944f191b0a3554a4d88e1" 
            },
            { 
                id: "f13", 
                title: "Uklanjanje duplikata (novi niz)", 
                vdoId: "c53754aa849f488fa76dacf380128add" 
            },
            { 
                id: "f14", 
                title: "Invertovanje elemenata niza", 
                vdoId: "725aef82ebc94ccda06939b8c6bb520d" 
            },
            { 
                id: "f15", 
                title: "Izbacivanje duplikata iz niza", 
                vdoId: "d40bfebd44c54b788329e29715a51cfb" 
            },
            { 
                id: "f16", 
                title: "Razlika dva niza", 
                vdoId: "1ee192967a37453c949e528ba51097c2" 
            },
            { 
                id: "f17", 
                title: "Provera sortiranosti niza", 
                vdoId: "990773523b88436593712b7ae98067f9" 
            },
            { 
                id: "f18", 
                title: "Sortiranje niza (rastuće)", 
                vdoId: "72b642f0553944d2816d7409c46a2e8c" 
            },
            { 
                id: "f19", 
                title: "Umetanje u sortiran niz", 
                vdoId: "ac5b9dbef327479a9f945ce362ef502e" 
            },
            { 
                id: "f20", 
                title: "Najduži podniz prostih", 
                vdoId: "baf9ab9fd1d949a1bd00edb5b9d2948d" 
            },
            { 
                id: "f21", 
                title: "Maksimalne uzastopne padavine", 
                vdoId: "972bac8e57244f8bb095cec7ad0a5fb6" 
            },
            { 
                id: "f22", 
                title: "Filtriranje cena u rangu", 
                vdoId: "65aa99608b334e5c9bb10834885cf799" 
            },
            { 
                id: "f23", 
                title: "Računanje medijane niza", 
                vdoId: "a14537ecf65a4641abe1a8b83fe6744c" 
            },
            { 
                id: "f24", 
                title: "Najmanja razlika dva broja", 
                vdoId: "33a7eab2f7384dafb4714b4af2b60d2a" 
            }
        ]
    },
    {
        moduleTitle: "07. Matrice",
        lessons: [
            { 
                id: "g1", 
                title: "Koncept i crtanje matrica", 
                vdoId: "e9d3ce4e03874f79996768b91ec77a63" 
            },
            { 
                id: "g2", 
                title: "Ispis elemenata matrice", 
                vdoId: "6920fc66fe714b5d98bcca6379ae2794" 
            },
            { 
                id: "g3", 
                title: "Suma reda matrice", 
                vdoId: "2be12b16404d4a63800aee5a6bc3b449" 
            },
            { 
                id: "g4", 
                title: "Prosek svih elemenata", 
                vdoId: "57551cb18f5c412b9c8e388022f4a27f" 
            },
            { 
                id: "g5", 
                title: "Najmanji element matrice", 
                vdoId: "bcd8df5f7a304131aa98c2fad46b38e9" 
            },
            { 
                id: "g6", 
                title: "Kolona sa najvećom sumom", 
                vdoId: "a026cbf7d17c41618199fa6dde4b7b00" 
            },
            { 
                id: "g7", 
                title: "Glavna dijagonala u niz", 
                vdoId: "49cd64bda35d4ee890ec3e207af2d64e" 
            },
            { 
                id: "g8", 
                title: "Zamena ispod sporedne dijagonale", 
                vdoId: "3f86c6fb0e684765bd182f87231d617b" 
            },
            { 
                id: "g9", 
                title: "Crtanje figure", 
                vdoId: "76a5057a0b8646ed88f6919de08f167f" 
            },
            { 
                id: "g10", 
                title: "Maksimumi kolona u niz", 
                vdoId: "d23125094a094a6181ba8fbbd4865db0" 
            },
            { 
                id: "g11", 
                title: "Različiti elementi i rastući niz", 
                vdoId: "869477025c604fa8b8499fd738318471" 
            },
            { 
                id: "g12", 
                title: "Magični kvadrat", 
                vdoId: "dea4e144310e430f85dc3d655e670b75" 
            },
            { 
                id: "g13", 
                title: "Ogledalo, transformacija kolona", 
                vdoId: "3da57487b8a3468192ecd4de47ba6153" 
            },
            { 
                id: "g14", 
                title: "Pomeranje vrsta naniže", 
                vdoId: "b555606c78134de3b23db5a0375827a6" 
            },
            { 
                id: "g15", 
                title: "Zmijasto prebacivanje u niz", 
                vdoId: "34ba701ee29b4df0b8424b5d52ae4586" 
            }
        ]
    },
    {
        moduleTitle: "08. Stringovi",
        lessons: [
            { 
                id: "h1", 
                title: "Osnovne funkcije (string.h)", 
                vdoId: "3d1e69e1a5e64dbe9196869767b86335" 
            },
            { 
                id: "h2", 
                title: "Dužina stringa (funkcija)", 
                vdoId: "3645eb79760b483c9e055ee1ab1effb9" 
            },
            { 
                id: "h3", 
                title: "Poređenje dva stringa", 
                vdoId: "31c90bec9cdc4578b168df1d5e1ca59c" 
            },
            { 
                id: "h4", 
                title: "Provera samoglasnika u stringu", 
                vdoId: "841f1f51b39e414e85b757008337c378" 
            },
            { 
                id: "h5", 
                title: "Prepoznavanje cifara u stringu", 
                vdoId: "8b6d41edbd7545338d3b76dd6d6e5026" 
            },
            { 
                id: "h6", 
                title: "Uklanjanje razmaka i cifara", 
                vdoId: "ae9e60417e254b60a041ad9e002af910" 
            },
            { 
                id: "h7", 
                title: "Invertovanje malih/velikih slova", 
                vdoId: "e6e0e553dad4456bb13b3eb69510a57a" 
            },
            { 
                id: "h8", 
                title: "Provera anagrama", 
                vdoId: "5b49e19b3d6249beb6b86627556f6bdf" 
            },
            { 
                id: "h9", 
                title: "Validacija formata šifre", 
                vdoId: "abd8a4b062e74b4593b8629bccb9cf82" 
            },
            { 
                id: "h10", 
                title: "Godine starosti iz JMBG-a", 
                vdoId: "5588c823c5534f6f9df513e13f9ad68f" 
            },
            { 
                id: "h11", 
                title: "Kompresija niza karaktera", 
                vdoId: "3498d793488d4f13b63f859e871619bb" 
            },
            { 
                id: "h12", 
                title: "Binarni u dekadni broj", 
                vdoId: "73e701403fc443b29331b8e48af9962d" 
            },
            { 
                id: "h13", 
                title: "Dekadni u binarni string", 
                vdoId: "898858544c1e48e7a1e603ebc2b0246b" 
            }
        ]
    },
    {
        moduleTitle: "09. Strukture",
        lessons: [
            { 
                id: "i1", 
                title: "Inicijalizacija i prikaz strukture", 
                vdoId: "b5efdb08b9f04cf08050f4f25f4bf847" 
            },
            { 
                id: "i2", 
                title: "Unos i ispis proizvoda", 
                vdoId: "fb2091572a60406eb096f3c72daf77de" 
            },
            { 
                id: "i3", 
                title: "Niz struktura (proizvodi)", 
                vdoId: "0d42ec6406d54598804f52314ce17e8b" 
            },
            { 
                id: "i4", 
                title: "Sortiranje proizvoda po ceni", 
                vdoId: "f6271ddd28164fa4ada89b813d30385f" 
            },
            { 
                id: "i5", 
                title: "Sortiranje proizvoda po nazivu", 
                vdoId: "bb48f092cebb412c984f7f9002358481" 
            }
        ]
    },
    {
        moduleTitle: "10. Liste",
        lessons: [
            { 
                id: "j1", 
                title: "Uvod u liste (vizuelno)", 
                vdoId: "7f509aa84f5b4b498a228aa47081c79b" 
            },
            { 
                id: "j2", 
                title: "Dodavanje na početak liste", 
                vdoId: "815059e64ead44fb9f701ca39d9cd1d7" 
            },
            { 
                id: "j3", 
                title: "Dodavanje na kraj liste", 
                vdoId: "284f133bffd640989334b9e656c21370" 
            },
            { 
                id: "j4", 
                title: "Ispis elemenata liste", 
                vdoId: "356cc73c10824d8a9f711d23f379399d" 
            },
            { 
                id: "j5", 
                title: "Brisanje prvog elementa", 
                vdoId: "ef12cd26efad4fdfa7c7f229b364884a" 
            },
            { 
                id: "j6", 
                title: "Brisanje poslednjeg elementa", 
                vdoId: "484aa76a0ca5485b9387e89a17429b83" 
            },
            { 
                id: "j7", 
                title: "Sortiranje elemenata liste", 
                vdoId: "34e4bc8805ad478badc794f13081739d" 
            },
            { 
                id: "j8", 
                title: "Prosek elemenata u listi", 
                vdoId: "8e7441d71d8e4fabb9f8477631839913" 
            },
            { 
                id: "j9", 
                title: "Pretraga elementa u listi", 
                vdoId: "b9d9488686ad4ba38c6b55246824cd14" 
            },
            { 
                id: "j10", 
                title: "Niz u listu bez duplikata", 
                vdoId: "314f7d2be9294c28b881b31292e2ea51" 
            },
            { 
                id: "j11", 
                title: "Brisanje određenog elementa", 
                vdoId: "4a65780d1cab41af9dc57a446c8c7046" 
            },
            { 
                id: "j12", 
                title: "Simetrična razlika lista", 
                vdoId: "05d4d81a23aa438d99b9391af428d6c8" 
            },
            { 
                id: "j13", 
                title: "Umetanje u sortiranu listu", 
                vdoId: "115ce971df3148fa840095b0fbf74014" 
            },
            { 
                id: "j14", 
                title: "Zbirovi matrice u listu", 
                vdoId: "c699d45c96ab4e698daada9ce6ce98ac" 
            },
            { 
                id: "j15", 
                title: "Provera jedinstvenosti elemenata", 
                vdoId: "d82fd404bbfe4d1fae957bc2106e7906" 
            },
            { 
                id: "j16", 
                title: "Prebacivanje broja na početak", 
                vdoId: "348f869a924646ee8f8f546a8179ce1d" 
            }
        ]
    },
    {
        moduleTitle: "11. Liste sa strukturama",
        lessons: [
            { 
                id: "k1", 
                title: "Uvod u složene liste", 
                vdoId: "8cb361cf6182461892341d8251811d10" 
            },
            { 
                id: "k2", 
                title: "Dodaj studenta na početak", 
                vdoId: "adabff6630d54020b806396e8b58206f" 
            },
            { 
                id: "k3", 
                title: "Prikaz liste studenata", 
                vdoId: "a887280bb3a14d5ea0d967dfaec81216" 
            },
            { 
                id: "k4", 
                title: "Pretraga studenta u listi", 
                vdoId: "15e424a5cb6c47969f0ce4b6956a0dfa" 
            },
            { 
                id: "k5", 
                title: "Studenti preko 200 ESPB", 
                vdoId: "d691d3a52cf646369b7f4dc8d5d454a4" 
            },
            { 
                id: "k6", 
                title: "Dodaj studenta na kraj", 
                vdoId: "46f5c91db80a4408b51e8e28efc7f957" 
            },
            { 
                id: "k7", 
                title: "Pretraga po imenu", 
                vdoId: "02aba91064b04d599ff09fdbc589584d" 
            },
            { 
                id: "k8", 
                title: "Pronalaženje po broju indeksa", 
                vdoId: "daf1a5dfa1f9477c9feb67a1c25715dc" 
            },
            { 
                id: "k9", 
                title: "Ažuriranje podataka studenta", 
                vdoId: "de1f1e40785e4c009395047bbf7b4541" 
            },
            { 
                id: "k10", 
                title: "Sortiranje po više kriterijuma", 
                vdoId: "b5fca7d910d64092a0973f9109d65183" 
            },
            { 
                id: "k11", 
                title: "Top 5 studenata", 
                vdoId: "a8ec3a8ba517458a886be5616d646d26" 
            }
        ]
    },
    {
        moduleTitle: "12. Datoteke",
        lessons: [
            { 
                id: "l1", 
                title: "Čitanje karakter po karakter", 
                vdoId: "53c7f52dff444834af7c47136bbbd8c6" 
            },
            { 
                id: "l2", 
                title: "Čitanje liniju po liniju", 
                vdoId: "444f6d8242934011b10ae367f8f90fe8" 
            },
            { 
                id: "l3", 
                title: "Učitavanje matrice (poznate dimenzije)", 
                vdoId: "c00b165be1a34a5b822431776f6ad652" 
            },
            { 
                id: "l4", 
                title: "Učitavanje matrice (dimenzije u fajlu)", 
                vdoId: "3e400010242e413d81345d8805e25d85" 
            },
            { 
                id: "l5", 
                title: "Učitavanje nepoznate kvadratne matrice", 
                vdoId: "50390bba7f0c4cdabca27d253f4e3553" 
            },
            { 
                id: "l6", 
                title: "Učitavanje nepoznate nekvadratne matrice", 
                vdoId: "6578648a157c4726ab45a23afc8b6e31" 
            },
            { 
                id: "l7", 
                title: "Učitavanje niza (poznata dimenzija)", 
                vdoId: "31d6c9fb9b754cf38eaa873f1925f637" 
            },
            { 
                id: "l8", 
                title: "Učitavanje niza (nepoznata dimenzija)", 
                vdoId: "05703e5832f94e8593166ac257510795" 
            },
            { 
                id: "l9", 
                title: "Upis figure romba u fajl", 
                vdoId: "a9dda887679649d2a88cf7ab8fce2438" 
            },
            { 
                id: "l10", 
                title: "Analiza reči i redova", 
                vdoId: "bb9318ef37eb4cb59a5ff0d2bd6e61c2" 
            }
        ]
    },
    {
        moduleTitle: "13. Binarne datoteke",
        lessons: [
            { 
                id: "m1", 
                title: "Upis matrice u binarni fajl", 
                vdoId: "672ed77dd6134c0bb69ed55691d5dc9b" 
            },
            { 
                id: "m2", 
                title: "Učitavanje matrice nepoznate dimenzije", 
                vdoId: "96e21d004b794e8db9d2991f16e89cc7" 
            },
            { 
                id: "m3", 
                title: "Učitavanje proizvoda u listu", 
                vdoId: "51cf593a630b470387f0d557e9207f0d" 
            },
            { 
                id: "m4", 
                title: "Brojanje skupih proizvoda (>100)", 
                vdoId: "cee1539b29d84252a0b50d8ee6111192" 
            },
        ]
    }
];

let completedLessons = [];
let currentLessonId = null;

const nav = document.getElementById('course-accordion');
const vdoPlayer = document.getElementById('vdo-player');
const titleDisplay = document.getElementById('lesson-title');
const descDisplay = document.getElementById('lesson-desc');
const moduleTag = document.getElementById('module-tag');
const progressFill = document.getElementById('progress-fill');
const percentText = document.getElementById('percent-text');
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menu-toggle');
const btnComplete = document.getElementById('btn-complete');

function generateSessionToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function setupMaxTwoDevices(user) {
    const userRef = doc(db, "users", user.uid);
    let sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken) {
        sessionToken = generateSessionToken();
        localStorage.setItem("sessionToken", sessionToken);
    }

    const snap = await getDoc(userRef);
    let sessionTokens = (snap.exists() && snap.data().sessionTokens) ? snap.data().sessionTokens : [];

    if (!sessionTokens.includes(sessionToken)) {
        if (sessionTokens.length >= 2) {
            alert("Dostignut je maksimalan broj uređaja (2).");
            await signOut(auth);
            window.location.href = "/login";
            return false;
        }
        sessionTokens.push(sessionToken);
        await setDoc(userRef, { sessionTokens }, { merge: true });
    }

    onSnapshot(userRef, (docSnap) => {
        const data = docSnap.data();
        if (data && (!data.sessionTokens || !data.sessionTokens.includes(sessionToken))) {
            alert("Pristup ovom uređaju je uklonjen.");
            signOut(auth);
            window.location.href = "/login";
        }
    });
    return true;
}

async function syncProgress(userId) {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    
    if (snap.exists() && snap.data().completedLessons) {
        const allProgress = snap.data().completedLessons;
        completedLessons = allProgress[CURRENT_COURSE_ID] || [];
    } else {
        completedLessons = JSON.parse(localStorage.getItem(`progress_${CURRENT_COURSE_ID}`)) || [];
    }
}

async function saveProgressToFirebase(userId) {
    const userRef = doc(db, "users", userId);
    const updatePath = `completedLessons.${CURRENT_COURSE_ID}`;
    
    await updateDoc(userRef, {
        [updatePath]: completedLessons
    }).catch(async (error) => {
        await setDoc(userRef, { 
            completedLessons: { [CURRENT_COURSE_ID]: completedLessons } 
        }, { merge: true });
    });

    localStorage.setItem(`progress_${CURRENT_COURSE_ID}`, JSON.stringify(completedLessons));
}

function init() {
    nav.innerHTML = '';
    courseData.forEach((module, mIndex) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.id = `m-b-${mIndex}`;

        const header = document.createElement('div');
        header.className = 'module-header';
        header.innerHTML = `<h3>${module.moduleTitle}</h3> <i class="fas fa-chevron-down" style="font-size:0.7rem"></i>`;

        const list = document.createElement('div');
        list.className = 'lesson-list';

        module.lessons.forEach(lesson => {
            const isDone = completedLessons.includes(lesson.id);
            const btn = document.createElement('div');
            btn.className = `lesson-btn ${isDone ? 'completed' : ''}`;
            btn.id = `btn-${lesson.id}`;
            const iconClass = isDone ? 'fas fa-check-circle' : 'far fa-circle';
            btn.innerHTML = `<i class="${iconClass}"></i> ${lesson.title}`;

            btn.onclick = (e) => {
                e.stopPropagation();
                selectLesson(lesson, module.moduleTitle);
            };

            list.appendChild(btn);
        });

        header.onclick = () => {
            const isOpen = list.classList.contains('active');
            document.querySelectorAll('.lesson-list').forEach(l => l.classList.remove('active'));
            if (!isOpen) list.classList.add('active');
        };

        moduleCard.appendChild(header);
        moduleCard.appendChild(list);
        nav.appendChild(moduleCard);
        checkModuleCompletion(mIndex);
    });

    if (courseData.length > 0 && courseData[0].lessons.length > 0) {
        selectLesson(courseData[0].lessons[0], courseData[0].moduleTitle);
        setTimeout(() => {
            const firstList = document.querySelector('.lesson-list');
            if (firstList) firstList.classList.add('active');
        }, 100);
    }
    updateGlobalProgress();
}

async function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id; // Važno da bi "Završi lekciju" dugme znalo šta završava
    titleDisplay.innerText = lesson.title;
    moduleTag.innerText = moduleTitle;

    vdoPlayer.src = ""; 

    try {
        const result = await getVideoAuth({ videoId: lesson.vdoId });
        const { otp, playbackInfo } = result.data;
        vdoPlayer.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
    } catch (error) {
        console.error("Greška kod backenda:", error);
        alert("Došlo je do greške pri autorizaciji videa.");
    }

    // Dodajemo "active-lesson" klasu na kliknuto dugme
    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active-lesson'));
    const activeBtn = document.getElementById(`btn-${lesson.id}`);
    if (activeBtn) activeBtn.classList.add('active-lesson');

    updateButtonState();
    
    // Zatvori sidebar na mobilnom nakon klika
    if (window.innerWidth <= 992) sidebar.classList.remove('open');
}

function toggleLessonStatus(id) {
    if (!id) return;
    const index = completedLessons.indexOf(id);
    if (index > -1) completedLessons.splice(index, 1);
    else completedLessons.push(id);

    if (auth.currentUser) saveProgressToFirebase(auth.currentUser.uid);
    updateUI();
    updateButtonState();
}

function updateButtonState() {
    if (!currentLessonId) return;
    const isDone = completedLessons.includes(currentLessonId);
    const btnTextSpan = btnComplete.querySelector('.button_text');

    if (isDone) {
        btnTextSpan.innerHTML = `<i class="fas fa-times"></i> Poništi završetak`;
        btnComplete.style.backgroundImage = "linear-gradient(135deg, #666, #333)";
    } else {
        btnTextSpan.innerHTML = `<i class="fas fa-check"></i> Završi lekciju`;
        btnComplete.style.backgroundImage = "linear-gradient(135deg, #ffcf23, #ff8d3a)";
    }
}

function updateUI() {
    courseData.forEach((module, mIndex) => {
        module.lessons.forEach(lesson => {
            const btn = document.getElementById(`btn-${lesson.id}`);
            if (btn) {
                const isDone = completedLessons.includes(lesson.id);
                const icon = btn.querySelector('i');
                btn.className = `lesson-btn ${isDone ? 'completed' : ''} ${currentLessonId === lesson.id ? 'active-lesson' : ''}`;
                icon.className = isDone ? 'fas fa-check-circle' : 'far fa-circle';
            }
        });
        checkModuleCompletion(mIndex);
    });
    updateGlobalProgress();
}

function checkModuleCompletion(index) {
    const module = courseData[index];
    const card = document.getElementById(`m-b-${index}`);
    if (!card) return;
    const allDone = module.lessons.every(l => completedLessons.includes(l.id));
    if (allDone) card.classList.add('module-done');
    else card.classList.remove('module-done');
}

function updateGlobalProgress() {
    const totalLessons = courseData.reduce((acc, m) => acc + m.lessons.length, 0);
    const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
    if (progressFill) progressFill.style.width = progress + '%';
    if (percentText) percentText.innerText = progress + '%';
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const watermarkEl = document.getElementById('video-watermark');
        if (watermarkEl) {
            watermarkEl.innerText = user.email; // Uzima email direktno iz Firebase Auth-a
        }

        const deviceOk = await setupMaxTwoDevices(user);
        if (!deviceOk) return;

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const kursevi = (userSnap.exists() && userSnap.data().kursevi) ? userSnap.data().kursevi : [];

        if (!kursevi.includes(CURRENT_COURSE_ID)) {
            alert("Nemate pristup ovom kursu.");
            window.location.href = "/pp";
            return;
        }

        await syncProgress(user.uid);
        init();
    } else {
        window.location.href = "/login";
    }
});

btnComplete.onclick = () => toggleLessonStatus(currentLessonId);
if (menuToggle) menuToggle.onclick = () => sidebar.classList.toggle('open');