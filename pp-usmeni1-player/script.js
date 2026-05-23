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

const CURRENT_COURSE_ID = "pp-usmeni1"; 

const courseData = [
    {
        moduleTitle: "01. Osnove i operatori",
        lessons: [
            { 
                id: "a1", 
                title: "Tipovi i konverzija", 
                url: "https://www.youtube.com/watch?v=hBKAR9te_y8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            },
            { 
                id: "a2", 
                title: "Greške u kucanju", 
                url: "https://www.youtube.com/watch?v=hRgP-jWhQNU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=2" 
            },
            { 
                id: "a3", 
                title: "Uslovni i logički izraz", 
                url: "https://www.youtube.com/watch?v=K6x1Ims5owc&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=3" 
            },
            { 
                id: "a4", 
                title: "Tipovi podataka - uvod", 
                url: "https://www.youtube.com/watch?v=QrVnplDFa6Y&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=4" 
            },
            { 
                id: "a5", 
                title: "Veličina tipova podataka", 
                url: "https://www.youtube.com/watch?v=YoeGQTTmmJg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=5" 
            },
            { 
                id: "a6", 
                title: "Oduzimanje karaktera", 
                url: "https://www.youtube.com/watch?v=mYnLc5qwb90&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=6" 
            },
            { 
                id: "a7", 
                title: "Vidljivost promenljivih", 
                url: "https://www.youtube.com/watch?v=Uj27XrFnREY&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=7" 
            },
            { 
                id: "a8", 
                title: "Prioritet operatora dodele", 
                url: "https://www.youtube.com/watch?v=fIccTDgZhnU&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=8" 
            },
            { 
                id: "a9", 
                title: "Vezani ternarni operatori", 
                url: "https://www.youtube.com/watch?v=gdSXrnkg-m8&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=9" 
            },
            { 
                id: "a10", 
                title: "Logička dodela", 
                url: "https://www.youtube.com/watch?v=CJmIhC3CYRw&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=10" 
            },
            { 
                id: "a11", 
                title: "Logička poređenja", 
                url: "https://www.youtube.com/watch?v=MNeP-P_Qmtk&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=11" 
            },
            { 
                id: "a12", 
                title: "Prekoračenje opsega memorije", 
                url: "https://www.youtube.com/watch?v=BKAybBsKIEg&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=12" 
            },
            { 
                id: "a13", 
                title: "Zamka u makroima", 
                url: "https://www.youtube.com/watch?v=t9yX3KP2JLo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=13" 
            },
            { 
                id: "a14", 
                title: "Inkrement u funkciji", 
                url: "https://www.youtube.com/watch?v=quKJIJlMBOQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=14" 
            },
            { 
                id: "a15", 
                title: "Makro i poređenje", 
                url: "https://www.youtube.com/watch?v=IObWvhHK5GQ&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=15" 
            },
            { 
                id: "a16", 
                title: "Makro za različitost", 
                url: "https://www.youtube.com/watch?v=h_UcJVTvzjo&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=16" 
            },
            { 
                id: "a17", 
                title: "Granice tipova podataka", 
                url: "https://www.youtube.com/watch?v=P3VzHBV1lS4&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=17" 
            },
            { 
                id: "a18", 
                title: "Skraćena evaluacija izraza", 
                url: "https://www.youtube.com/watch?v=8DGijaLq0tE&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=18" 
            },
            { 
                id: "a19", 
                title: "Složeni uslovni izraz", 
                url: "https://www.youtube.com/watch?v=7_R6faFdghI&list=PLl8BFSumqv-b7BgSROarNJPAt8dGK6sQC&index=19" 
            }
            
        ]
    },
    {
        moduleTitle: "02. Kontrola toka (petlje i grananje)",
        lessons: [
            {
                id: "b1",
                title: "While i break",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232wOli4H5aB4FJkOjjFL7MU7JyBzvIKcst319D5z2DybmLq&playbackInfo=eyJ2aWRlb0lkIjoiZTE3MjY4YTQ0Y2U5NDBjOTk0ZTViMWQ1YjBhZjVlYjYifQ=="
            },
            {
                id: "b2",
                title: "Do-while i uslov",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232H4nNYYGpMlSwgHP2acbJzyGfcSbMmmoxdiqNcHJO4srHC&playbackInfo=eyJ2aWRlb0lkIjoiM2U1ZDQ1ZTBlMTY5NDJlNjkzMzgxOTVjYzk0Mjg2NzMifQ=="
            },
            {
                id: "b3",
                title: "Unsigned tip u petlji",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE32323DIdRqLJ7chjWVMQNIip348keLCkK1dkTQVXbTqGtb5EN&playbackInfo=eyJ2aWRlb0lkIjoiYTEzNDA1ZGQwYjhmNGIzNWEwOTY0MzU2N2JhYjI2MjEifQ=="
            },
            {
                id: "b4",
                title: "Switch i enum",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232eyb7ohFCBTzc3wZMqgkSRjhUitfJx0zAAQPEgBtAL3bd2&playbackInfo=eyJ2aWRlb0lkIjoiM2IwMjRkZjQ0MDQ1NGFlNTkzMzgxOTk2OWUxNTQzNmUifQ=="
            },
            {
                id: "b5",
                title: "Ugneždene while petlje",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232c8yzvVxRygIBpygkGCdqannA27jElCUb4UFc1bEe3TU1v&playbackInfo=eyJ2aWRlb0lkIjoiNmQ3MmJjNjUzMjdiNDZiM2JlMWQwZTg0N2VjNjI5NjYifQ=="
            },
            {
                id: "b6",
                title: "For petlja i continue",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232vwY5p9C2GPDAld15LRAuXKPDk2jLkj884sPN5f2P5lmFh&playbackInfo=eyJ2aWRlb0lkIjoiYWU1MGZlMzk3N2I4NGJhMzhkMmZiNzRmOWI5N2JlYjEifQ=="
            },
            {
                id: "b7",
                title: "Switch sa default-om",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232mhPUDtwR6vVaiqOQ3buRGGhUYbMrAHQRkPFYodk8835iu&playbackInfo=eyJ2aWRlb0lkIjoiOTg4ZDhkZDgwNmIxNDNhZDlhZTY2NmRiMmUyYzE2NjUifQ=="
            },
            {
                id: "b8",
                title: "Redosled case grana",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232iUbth223SOBagndvgMxO36MLuYP38PqFIWPElF35kYmU7&playbackInfo=eyJ2aWRlb0lkIjoiNWIxMWMyOTg1YmNhNDk4MTkwYzJlYmRhMGY4MjEwOWUifQ=="
            },
            {
                id: "b9",
                title: "Ternarni operator i unos",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232dq8khIPZKF9QVP86QGDWpLvhmGlhKqOLqTDioNTjRLvqe&playbackInfo=eyJ2aWRlb0lkIjoiMjFkYjQ0MjVkYjdhNDEyZmI4NjUzYWY0MDA5ODJlNjMifQ=="
            },
            {
                id: "b10",
                title: "Crtanje oblika (trougao)",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232qOwZuE4kFkYfD8NWVVwF7Ki7sLugmYo4DdqTvMRvJUOiS&playbackInfo=eyJ2aWRlb0lkIjoiMWY0YzA2MDRiZDNlNGI0ZDhhNTYxYjAxYTRlMTdjMDMifQ=="
            },
            {
                id: "b11",
                title: "Crtanje šupljeg romba",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232fGZ8vr5qAu5nDPY91JmeS9Rp8Y4MxJKNsIwEKH7YbcYSH&playbackInfo=eyJ2aWRlb0lkIjoiY2YzM2RhYTQwZDQwNGRkMjkwNjJhMjAwYTFlMDllNjQifQ=="
            },
            {
                id: "b12",
                title: "While i dekrement",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232H4Zgdi0gDpkvfB5BfhhF1Jobw1NVUa2s8iVJOXsyTh09n&playbackInfo=eyJ2aWRlb0lkIjoiZjliNzU1ZTRiZTk0NGZiZDhiZmI2MzViZTRkYjE5NzQifQ=="
            },
            {
                id: "b13",
                title: "While i ternarni",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232CcWxWZrSgBKuiTPcgRN3soh1riY1IxyapzsmCNvcU2thd&playbackInfo=eyJ2aWRlb0lkIjoiNjM3ZjFjM2MwZDg1NDljMGEwMDNjOTFkNTc4YTFiNDMifQ=="
            },
            {
                id: "b14",
                title: "For i moduo",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232J2QkWScCCyJspqB62Unvw5bbl8XyYheVf2U9w7B9YkNMx&playbackInfo=eyJ2aWRlb0lkIjoiMjhlMTdjYmUyZjNkNDc4ZGFkZDY1Y2YxOGQ4MTgxNTkifQ=="
            },
            {
                id: "b15",
                title: "Crtanje okvira trougla",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232n2PX2pvDJsg8lt9ReD2TE90VzfZzQc0Iwp3EVUaEJAWiz&playbackInfo=eyJ2aWRlb0lkIjoiZGIwNGEyNzc0NDk2NGMxNGE2M2EyNzUwMGE1ZjkwODYifQ=="
            },
            {
                id: "b16",
                title: "Switch bez break-a",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232BdB0wrgITni9gfFlTyljnT6t6K0XwQA3PT1pWFZekrXMa&playbackInfo=eyJ2aWRlb0lkIjoiMTQ3OTBiNTEyYmM4NGU5OTg3NGE5YTNjMDUxMmJjMjQifQ=="
            },
            {
                id: "b17",
                title: "Jednostavna do-while petlja",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232AlXnOhK4RxCgIZeDOc9C6n9M9bDutnomEdw0cnmAm9XoC&playbackInfo=eyJ2aWRlb0lkIjoiZTE2YjNiYzViNTAzNDY0MTk5YjI1ZGU2OGYzYmU5MDUifQ=="
            },
            {
                id: "b18",
                title: "Switch unutar for-a",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232ZSGNvsKnmKNMu6W54xq46VBeSWdckrf8Kjh5JWihwphjT&playbackInfo=eyJ2aWRlb0lkIjoiOWQwZmMxYmIzMTg1NDg3Yjg0NmZhM2FlYjFkODFlMDUifQ=="
            },
            {
                id: "b19",
                title: "Rekurzivni ispis",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232Ueai7Uzrocz9Y2Mr68dxPz1X9iG00a7UcDF8rzjEcU7td&playbackInfo=eyJ2aWRlb0lkIjoiMGI0YjQ0M2U0YTFkNDY1MjkxZDlkNTE0MGMzN2MwYWUifQ=="
            },
            {
                id: "b20",
                title: "Logički izrazi i prioritet",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232PKvA10lXdNyTKofNqznw6mvuHBNygnfPXoxcjld7ePJtv&playbackInfo=eyJ2aWRlb0lkIjoiYTEwZDU0Y2RiZGNiNDdlNmE5OWJmNzM2MGIwMTMwYjgifQ=="
            }
        ]
    },
    {
        moduleTitle: "03. Funkcije i memorijski segmenti",
        lessons: [
            {
                id: "c1",
                title: "Memorijski segmenti",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232utoX2x7sc6Hhb59TmckfAQvMw9SeJPGvThY07cu3PhYyr&playbackInfo=eyJ2aWRlb0lkIjoiN2YyNTY5ZDk3YWIzNDcyYTg4YjVmYjY0ZTlhNmUyMzMifQ=="
            },
            {
                id: "c2",
                title: "Povratna vrednost funkcije",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232InZzMHu8iELNHlkuhQhYCE263NaOZnvLZrEsFrXwgMO7B&playbackInfo=eyJ2aWRlb0lkIjoiMmMzNmE4NTNlNjBiNDliNzg2MTRiMmE1MWE3YWZiYzgifQ=="
            },
            {
                id: "c3",
                title: "Statičke i lokalne promenljive",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232tPlEypiqhLRpDJsmJaVjsxG48NbiUzw2V34mY4twbkUcC&playbackInfo=eyJ2aWRlb0lkIjoiZGExNzhhOWUxMDNmNDIyMDhiNjU4ZGZhYTcxYjZhMTkifQ=="
            },
            {
                id: "c4",
                title: "Eksterne promenljive",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232Mpbs6oHVICg2cq7SOPmjeDwOV21SCfg5h1NXWpUMwzRZX&playbackInfo=eyJ2aWRlb0lkIjoiZjQ1MDIzOWM1NjFiNDMwM2IyMjczNGU1ODY4YjM2MzIifQ=="
            }
        ]
    },
    {
        moduleTitle: "04. Pokazivači",
        lessons: [
            {
                id: "d1",
                title: "Zamena lokalnih pokazivača",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232gdzTVLfPACJjxC5GxenmERpvjKs7I4xSSkkmXcccHNXuX&playbackInfo=eyJ2aWRlb0lkIjoiMGU1NzljOTQ4ZjdlNGYyNGI5N2ZhYjUzMWJmNThmMzAifQ=="
            },
            {
                id: "d2",
                title: "Dereferenciranje pokazivača",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232kDnodd8O1VN4tRkIi7gk3SQkn2JaQTBvFPc7seQq05fj7&playbackInfo=eyJ2aWRlb0lkIjoiMTVlMDZmNDU5MDUwNGZlYzkyMjMyZDZlNzVjMjk1YzYifQ=="
            },
            {
                id: "d3",
                title: "Inkrementiranje i adrese",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232GYjMmTNnuMlQ6dhxYKyoGVY2Tkna7cmxAvOZR0ypR5kjF&playbackInfo=eyJ2aWRlb0lkIjoiNDFiODUyNzdlYTk4NGE3YjgxNDkzZDBmOTQyMDlmNGEifQ=="
            },
            {
                id: "d4",
                title: "Pokazivači na niz",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232pDNmn6uLqFale1EH1tBMW29Z4FYeOaZzwNIQ0bRSt48xX&playbackInfo=eyJ2aWRlb0lkIjoiYmY1OGNjZGYwYWRmNGJmM2E2YjRiYTYyMWRhMzBiMDkifQ=="
            },
            {
                id: "d5",
                title: "Veličina pokazivača",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232ejGHyBLvvwW7ygUg0jFap76PfcQYr88LmbHgO9uSxuE2g&playbackInfo=eyJ2aWRlb0lkIjoiYTc1ZWIxMzYxOWQ4NDdmMTllMmEyMWFlYzY2YWRmODYifQ=="
            },
            {
                id: "d6",
                title: "Inkrement NULL pokazivača",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232ieBIT6bfOVEKtaG7IcEOD8eXpkdX1hemTT37lhRyCjPGX&playbackInfo=eyJ2aWRlb0lkIjoiZjFmYzljYmM0NmZhNDM1M2EzNDAwNmFmYmU4YTFiNDQifQ=="
            },
            {
                id: "d7",
                title: "Prenos po vrednosti",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232r9y0dJXbol0i4evfug9AElYOmuMTawid946urlyQwDPmK&playbackInfo=eyJ2aWRlb0lkIjoiNDYxOTAwNGZiY2RiNGQyYjk5ZmViM2MzN2Q1N2U0ZDcifQ=="
            },
            {
                id: "d8",
                title: "Izostanak dodele vrednosti",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE32328f0SaZqAhNYK6Fuu72nJRDwr6T0yF5oUIiENkIDHmd4HE&playbackInfo=eyJ2aWRlb0lkIjoiZGRlNGRlZWNiOGRkNGE2YTg4NTRjNGMxMDYzMTJkZDAifQ=="
            },
            {
                id: "d9",
                title: "Dvostruki pokazivači",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232j4chrfDjUwfXwIwj1pj6xDBA9Bg4HlXYxACfHMD15s88A&playbackInfo=eyJ2aWRlb0lkIjoiMWIzYWM1OGMwNjQ5NGZlOWFlZWRmMTA0NmEyZmFlYWYifQ=="
            },
            {
                id: "d10",
                title: "Pokazivačka aritmetika",
                url:"https://player.vdocipher.com/v2/?otp=20160313versUSE3232dcGxdmvmLdPo2B8JdtZy3JarOlZFJAhQ4nwEjz71du4zS&playbackInfo=eyJ2aWRlb0lkIjoiYjM1YmEwNmQwODMwNGQyYjllZjlhZjMwM2YxNDU3OWEifQ=="
            }
        ]
    },
    {
        moduleTitle: "05. Nizovi",
        lessons: [
            {
                id: "e1",
                title: "Prolaz pokazivačem kroz niz",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232OwzVSA949bZf84jA0ll2P6wbb2l6jGnWaD9vpEvSXFHIE&playbackInfo=eyJ2aWRlb0lkIjoiMjYxZGJiZmQ2ZjAwNGEyNGIxNDI4ZjdmZTE3YWE5Y2MifQ=="
            },
            {
                id: "e2",
                title: "Dinamička alokacija niza",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323I654YQOAtDcMx54qtJ0wtxGkuae2TCvaoEbB3swJYCXU&playbackInfo=eyJ2aWRlb0lkIjoiZDk1ODM4ODM2MzU4NGM4OGE5NGNkOWQ4NTJlOTY2MWEifQ=="
            },
            {
                id: "e3",
                title: "Niz sa enum konstantama",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Unba35Mpl15ZK0Wkzzn2uLZTcSfBfk6UXLEdzWH4Zms8r&playbackInfo=eyJ2aWRlb0lkIjoiMWRkNzlmMjM1YjdkNDAwMGJhMTcwZGNlZGZjZjdkOWQifQ=="
            },
            {
                id: "e4",
                title: "Osnovna inicijalizacija niza",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232PltxZ5SDnN9zCEVaEHh9lUSx7uGVmEUN2P9GjivTV6uSC&playbackInfo=eyJ2aWRlb0lkIjoiZmRmYmI2MjI1NjljNGZmZmFjYjExN2JiMGMzZjhhNzkifQ=="
            },
            {
                id: "e5",
                title: "Indeksirana inicijalizacija elemenata",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232wCHQiaOU1R8nbL8v66stR5tx7c41uLxUu09bqlxPHj3EI&playbackInfo=eyJ2aWRlb0lkIjoiNjA3OGMwMGM0NDFkNDY2NWIyODc4ZGI3NDU5NTc5NjUifQ=="
            },
            {
                id: "e6",
                title: "Pristup preko indeksa",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32321733tKhmWOOX9RRSehaSyu4nOIJnyYVxqQ0lyt2dZDqbN&playbackInfo=eyJ2aWRlb0lkIjoiMWUwOTY5NTUzZjU2NGMzYjk4YjJhYjYxNjYyNjA1NjAifQ=="
            },
            {
                id: "e7",
                title: "Alternativna sintaksa (digrafi)",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232j1y7jZpJZgQy1Acat4teUzR58kPkhJVzdfoXpyDKUbmQb&playbackInfo=eyJ2aWRlb0lkIjoiNzA4ZWUxMTdkZDZmNGFjM2JkMDk0MDM3NGJhNTRiZWUifQ=="
            },
            {
                id: "e8",
                title: "Sizeof niza u funkciji",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232jpm4fuDWTs2MkBKmJRNt8cUqxPlQJvt41uGdGMiDFcN1d&playbackInfo=eyJ2aWRlb0lkIjoiMmQ4Yzc2M2IxYzJmNGNiYTliZGFmNTlhZDE4OGMwMWUifQ=="
            },
            {
                id: "e9",
                title: "Adresni pristup elementu",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232G16pMomSceDW71vKRwIf5u2PGczBgxu8nKCx4jmNgB6NG&playbackInfo=eyJ2aWRlb0lkIjoiODVjNWJkNTQ1MGRmNDQ4MTk5ZWE3YWQ5YzZhZWE5MDcifQ=="
            },
            {
                id: "e10",
                title: "Provera adrese niza",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232X7QIerUGDFsbp69wk00B6MaG6p47EVZ74WzW0PiY2I5GP&playbackInfo=eyJ2aWRlb0lkIjoiYzJlYTdjNmU3OTVhNDkwZGFjNDBjMjczM2MxMzgzN2EifQ=="
            },
        ]
    },
    {
        moduleTitle: "06. Matrice i višedimenzionalni nizovi",
        lessons: [
            {
                id: "f1",
                title: "Popunjavanje elemenata matrice",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232F7aAD7MJRcOBnjqDnBVzpTl2YtoAOMoZLb5c1OZmnS4vF&playbackInfo=eyJ2aWRlb0lkIjoiN2U5ODE0YjZkMTg1NDRiMWFmMmRlYjY3YWZmZjQzOGMifQ=="
            },
            {
                id: "f2",
                title: "Modifikacija elemenata kolone",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232gP6vstmXHSzxKzKqFGrOLEgwb20MuuUPdhCh49LUCrNp4&playbackInfo=eyJ2aWRlb0lkIjoiOTliNDQ3MDJjMGMyNGVjODg4YjkwMjUwNWYxZjY4YTUifQ=="
            },
            {
                id: "f3",
                title: "Aritmetika pokazivača u matrici",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232a6iKJTQnzASPM4UQvW9GNele80OlMJOo83llesJO1B51S&playbackInfo=eyJ2aWRlb0lkIjoiYzJiZjMxZjE5Nzc1NDE1MGE5ZWVmN2NkNzU1NmU5NjgifQ==   "
            },
            {
                id: "f4",
                title: "Linearizacija matrice pokazivačem",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BNRmED1EflOMu0ZJnUIPAhWIkomCsYbx7eL426gjiuWnK&playbackInfo=eyJ2aWRlb0lkIjoiYjgzMjkyZTE1ZWVmNDVmYWJlOTA2NmE4M2FhNmU1MDkifQ=="
            },
            {
                id: "f5",
                title: "Analiza dvoimenzionalnog niza",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232RMwxf5pNnmDdek3CfdxEqhJrmtqgucti5wmBbCd072t9b&playbackInfo=eyJ2aWRlb0lkIjoiMGVjNWY0NWQwYjg3NDc2NmJiNGE2NWEyZjA5NzdiNDAifQ=="
            },
            {
                id: "f6",
                title: "Iteracija kroz celu matricu",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Q7U8lD2Xisy8BDXRjvBfizpOteMoEoZUMDfoeYBk2TjZ5&playbackInfo=eyJ2aWRlb0lkIjoiZTk4OTBiNmY3MjcwNDk5YmExNzhiZmUxOWRjMjM3OWMifQ=="
            },
            {
                id: "f7",
                title: "Inicijalizacija 3D niza",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232hdTO07vCjJMWMA2tOJymlqKUAczmz2k9drKsjxQaDBUfA&playbackInfo=eyJ2aWRlb0lkIjoiMzI1ZDAwZmFlNmEzNDUzYWFjZTY5OGEwNzU2NjNkMmEifQ=="
            },
            {
                id: "f8",
                title: "Pristup 3D elementima",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232opAJdqLBENzrVKbyawRrfIY7MAMz6WIU9c7LAgadkwWAM&playbackInfo=eyJ2aWRlb0lkIjoiZThjMDk2ZjE4MTU0NDhlMzlhYTgxMDUzMTEyMmJiZWIifQ=="
            },
        ]
    },
    {
        moduleTitle: "07. Stringovi",
        lessons: [
            {
                id: "g1",
                title: "Mala u velika slova",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232WbdYCzk9HqlCxgAEFgrP7LarqTSZg3RYha3V3XyEXtmll&playbackInfo=eyJ2aWRlb0lkIjoiMmZjNzQ3ZGYzZjU5NDZmYjhjMDdhZmY2NTcwMTAxMjUifQ=="
            },
            {
                id: "g2",
                title: "Različiti zapisi indeksa",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232YY1Haxp9o7biY5tglhQdb5FwpcUEzMrkrmcTrJUgFNdZL&playbackInfo=eyJ2aWRlb0lkIjoiNzdiMDlhZmIyZTUyNDM4ZWJkOGE2NTNhOGYxNzk5NTkifQ=="
            },
            {
                id: "g3",
                title: "ASCII vrednosti i ciklus",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232NHizPPUn44dnbVq2OSsLcHLV5xmZ064tZCviMmE9eX9bq&playbackInfo=eyJ2aWRlb0lkIjoiNjJmZGZiNTMyNzFkNDM2Yjk5YzFhN2EwMTEyYjNlY2IifQ=="
            },
            {
                id: "g4",
                title: "Opseg tipa char",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232sr51D1ajwVkkyWdLhRVb9xc9I0NnXI7EbKU8SwADuyarO&playbackInfo=eyJ2aWRlb0lkIjoiMTAxM2M5MmNiNjgwNDg5Yjg1ZGY5NmY4MzI3OTRmZTkifQ=="
            },
            {
                id: "g5",
                title: "Opseg unsigned char",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BskkLdtTT8oPhP1GAswqoN5PWDz5wPJmognQldhcBp8pj&playbackInfo=eyJ2aWRlb0lkIjoiMTVjOTdjNjA1ZTk4NDFlZjg4Yzk5YzllODQyOTI3MzMifQ=="
            },
            {
                id: "g6",
                title: "Ispis stringa pokazivačem",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Tdfv7Cx2MtyBjtFyQ52t7Em4dSKCPHBsl6VYrWHDG6bby&playbackInfo=eyJ2aWRlb0lkIjoiNmNlNDdlZWMwN2E3NGJkZThmOGZlMGJiMjAzMjBiOWIifQ=="
            },
            {
                id: "g7",
                title: "Pomeranje početka stringa",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Szi9i6iFgq1PUhjQHgm0SsYPkFwQ6rQcFFtZ0inANix05&playbackInfo=eyJ2aWRlb0lkIjoiMTk4ZWNiODBjODY2NDQwZmEzYjFmMzAxOTk5MGY5ZmIifQ=="
            },
            {
                id: "g8",
                title: "Modifikacija parnih pozicija",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232cv8q281iPHxlDTP3MtdRqHqUha9ZQfr8X9JoJDs9OgNzO&playbackInfo=eyJ2aWRlb0lkIjoiZTA1ZmM2MDhiZjQ1NDMyZjhmM2M0OGVhYWVlNDZmMjMifQ=="
            },
            {
                id: "g9",
                title: "Inkrementiranje string pokazivača",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232MUf3K6jIfdyEHly2EKt8khYKEGkz0XDDHXJM5pQAUBq9x&playbackInfo=eyJ2aWRlb0lkIjoiZGY4NDM3ZTU0Yjk4NGE3NTk3MTkyZWM5MWM0ZWJjMTkifQ=="
            },
            {
                id: "g10",
                title: "Strlen vs sizeof stringa",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232rO8PRDaYqqD1NZ4fT24SEDum0I3avl8x7jiYes1hIvfZ5&playbackInfo=eyJ2aWRlb0lkIjoiNzFiZGMwNmQ5NjM2NGQ2YWI4MTdlNDFkNzgwNmRmN2IifQ=="
            },
            {
                id: "g11",
                title: "Funkcija za kapitalizaciju",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232ukVX8racTYBPBtqcY3NZgY5wsabWy9YbZOMl6UqxingbP&playbackInfo=eyJ2aWRlb0lkIjoiZTE3YjgzZThmMmNhNDFjMjkxZmNkMDQ4MzYwZGNlZmYifQ=="
            },
            {
                id: "g12",
                title: "Piramidalni ispis stringa",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32326k5hAq8hyHII9frk0msaqWcFxIHlM1Bf7cZHp2Z0Og0pa&playbackInfo=eyJ2aWRlb0lkIjoiMTdkMDM0Zjk1NjQ3NGIzYjg4YjkyMWQxNGRhODJlMTEifQ=="
            },
            {
                id: "g13",
                title: "Dodela adrese stringu",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232wnZbKaOqiKfimYUBvluxdF68RsNIY2TKJgUUtvmaIo0GD&playbackInfo=eyJ2aWRlb0lkIjoiZTZhMzc1MDYyMmI5NDhmNWFiN2JmZGMyODI3NDE0YjIifQ=="
            },
            {
                id: "g14",
                title: "Trougao od karaktera",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232O5IlCjYYR091y5uK0O0DF7QNBfcMS0DusQY3Dqabvc895&playbackInfo=eyJ2aWRlb0lkIjoiY2QzN2YyNzEzMWQ5NDAwOTliNTI2NTJiMmMwZjUyMzcifQ=="
            },
            {
                id: "g15",
                title: "String kroz više redova",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232EzF7nnnFGONYMqoKGqCFyuvmljd8WEgRId4o7V6wVjhkV&playbackInfo=eyJ2aWRlb0lkIjoiNzNjNWExZDY2NWNkNDU5YTlhMDU1NTM2MjNiYjQwZDMifQ=="
            },
            {
                id: "g16",
                title: "Strlen i strcpy",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232nItfJhpokGFpNJQBb6upigFO4m78Hb35ZU0qmI3FGFKdv&playbackInfo=eyJ2aWRlb0lkIjoiNTNkOTA1ZDkyMzA1NDRlYzg1NjI5MDhiOGNkMDk0NDAifQ=="
            },
            {
                id: "g17",
                title: "Adrese karaktera u nizu",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232uBuGAlsDPROaDqLPMrU4Cz8a17aRqZoE1bhYoakLTMaIB&playbackInfo=eyJ2aWRlb0lkIjoiNWNiNzM1YWRmNmZkNGQ2YTgzNTY4MDFhYmZkYzI0YTUifQ=="
            },
            {
                id: "g18",
                title: "Poređenje dužina stringova",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232SOOT5kUxetHL6230rbUn2nLdEwY53wPsD6tqCkBgeJYvJ&playbackInfo=eyJ2aWRlb0lkIjoiM2EwZjMzNTNiNDhjNGNjYjkzMDJlYzA5ZDRiY2Q0YzAifQ=="
            },
        ]
    },
    {
        moduleTitle: "08. Rekurzija",
        lessons: [
            {
                id: "h1",
                title: "Rekurzivni faktorijel",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232PUZDwrocQe2FLoeuCczOOcYU8Yq61RN1ByOBhiolRKSmO&playbackInfo=eyJ2aWRlb0lkIjoiY2VlOTc1MDE3ZmYwNGFlOGEwYzJhNjU4YjQxNTc2ZjEifQ=="
            },
            {
                id: "h2",
                title: "Rekurzivna suma cifara",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232LFGUE5M3ZB0gwbuwzsirO72uCYwsyXxRRklcX4HhNYHcG&playbackInfo=eyJ2aWRlb0lkIjoiOTA0NDlhN2IwYzFiNDUxODhmZjg2MjE4NzM0MDFhMGEifQ=="
            },
            {
                id: "h3",
                title: "Redosled rekurzivnog ispisa",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232daGh6SHN6FNe18nkFFg2Ks7UJY8r70s6yPBzBn43UWeFC&playbackInfo=eyJ2aWRlb0lkIjoiNjhjZjY3NDQzNjA3NDIyNWEzN2QyZjI4MTVhYjI5YTcifQ=="
            },
            {
                id: "h4",
                title: "Rekurzivni poziv main-a",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232ejzfs9DJgyLUd1rgq4JuQ9z51tv0endTm6YYc7dvV6OjN&playbackInfo=eyJ2aWRlb0lkIjoiNDI1MTA0OWYzMzFmNDg2YWJiOWU5OTQ3N2IzYTMxNzQifQ=="
            },
        ]
    },
    {
        moduleTitle: "09. Primer usmenog",
        lessons: [
            {
                id: "i1",
                title: "Indirektna dodela vrednosti",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232NbpslGhGj8iU6XHL046Nj9QYLuMgFUDcK7XbHi20anxBC&playbackInfo=eyJ2aWRlb0lkIjoiYjhiODkwMjkwZTlkNDk1NjlmMzdkODcwOWQ2NDNmNzMifQ=="
            },
            {
                id: "i2",
                title: "Adrese 3D niza",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232jmVsDlnmtcyUtI0juH2ZwJbzU9Xtbv9GKyZRsV3YnTNE1&playbackInfo=eyJ2aWRlb0lkIjoiNzM4NmU3NDQyNWI4NGU0Mzg5MjdhNTY3OWNkMzI4ZjkifQ=="
            },
            {
                id: "i3",
                title: "Stanje steka pri pozivu",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232MGerGMSnOTdtyz1NgJjCAWcaf4JdTn3MB5q9mjOrtY7II&playbackInfo=eyJ2aWRlb0lkIjoiNzQzMTc0OGI1ZmZiNGU3OWJiM2E5NzJmNzBhOWYwOTMifQ=="
            },
            {
                id: "i4",
                title: "Eksplicitni null terminator",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232T9Ai6Kf9N90GHXobgNjKjD9WEtZ3neRfmk95sGH1ybyls&playbackInfo=eyJ2aWRlb0lkIjoiYjNjMmFiZmE1ZGFiNGNlZGFjMTgyNzM3NDY1MmI1NDMifQ=="
            },
            {
                id: "i5",
                title: "Indeksirana 3D inicijalizacija",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232mWPnnE7PKczGRN3EiCSaRmP29T4kF5xfjQLryLsVmxSjH&playbackInfo=eyJ2aWRlb0lkIjoiYWIyY2Y2NWNlMmU1NGExZjhkZWM4MWI5NDk5ODA1MDkifQ=="
            },
            {
                id: "i6",
                title: "Redosled case-a i fall-through",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232sCiF78ACnMAihiHxHuqRxjW0mr1G3et9ldAsFoCQiDZD1&playbackInfo=eyJ2aWRlb0lkIjoiZWEzOWRhM2UxZDk0NDllMTk5Mzc2NWE3ZGI2MmJlMTUifQ=="
            },
            {
                id: "i7",
                title: "ASCII aritmetika",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Unk3ZQacDT4GJQnUtB9Z7F4yrgzGmlAeVNVLLJjFcDNmU&playbackInfo=eyJ2aWRlb0lkIjoiMTY2ZDQ2ZDAzYjljNGVlYWFiNDVjOWMyNDU1ZDBjNmEifQ=="
            },
            {
                id: "i8",
                title: "Prekid funkcije u petlji",
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32327UBAEHpFzUHPKxzzGZKo0TLzpmyICIQgXOxhDZPw3eSOE&playbackInfo=eyJ2aWRlb0lkIjoiZTAyOTlhNjkyMGNlNDllYjlhZWI4OTZlMmU5MTUzZmIifQ=="
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

function getEmbedUrl(originalUrl) {
    if (originalUrl && originalUrl.includes("youtube.com/watch")) {
        const videoId = new URL(originalUrl).searchParams.get("v");
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return originalUrl; // Ako je VdoCipher ili već embed, ne menja ništa
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

function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id;
    if (vdoPlayer) vdoPlayer.src = getEmbedUrl(lesson.url);
    titleDisplay.innerText = lesson.title;
    if (descDisplay) descDisplay.innerText = lesson.desc;
    moduleTag.innerText = moduleTitle;

    document.querySelectorAll('.lesson-btn').forEach(b => b.classList.remove('active-lesson'));
    const b = document.getElementById(`btn-${lesson.id}`);
    if (b) b.classList.add('active-lesson');

    updateButtonState();
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