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

const CURRENT_COURSE_ID = "pp-pismeni"; 

const courseData = [
    {
        moduleTitle: "01. Uvod",
        lessons: [
            { 
                id: "a1", 
                title: "Prvi program u C-u", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BCsgBnflDFgzgh7zI2qUMDrCfMGI8W8RCt3xnQdmsttfV&playbackInfo=eyJ2aWRlb0lkIjoiYjQzNmE4MDY0YThkNDgxZWE5MTQ0Nzk4MDBjMDVlYWEifQ==" 
            },
            { 
                id: "a2", 
                title: "Promenljive i tipovi", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232TOrT7SbRxV3X7LE0ifsJnxFCIGSGh7vLEgK7ekz2UW63g&playbackInfo=eyJ2aWRlb0lkIjoiMmUyZjdiMjcxYTg0NDVmMGEyZjc3ZDQwMThhMTA4MmMifQ==" 
            },
            { 
                id: "a3", 
                title: "Formatiran ispis (printf)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323280G3VT86qHFQTedAWj7S1zfKfbLpTZZrZflUnXNbnp2Bm&playbackInfo=eyJ2aWRlb0lkIjoiYTMyNzViMGZlNWU1NGQ3NDk5NmEwZmY3Nzk2ZDg5YTIifQ==" 
            },
            { 
                id: "a4", 
                title: "Unos podataka (scanf)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232IfA9tag0TanfPX8JW4aYI1wfIvn1PIkVzeFICqJFdnZPl&playbackInfo=eyJ2aWRlb0lkIjoiODg2NzUzYTlmZjYzNDUzNDgzZWQ1YTU3YWU3NTY3YjAifQ==" 
            },
            { 
                id: "a5", 
                title: "Matematičke operacije i funkcije", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232k2QG0NU2ixVMk6lClt7VhzAjclTLKp5NNNKDZBmIxl8fT&playbackInfo=eyJ2aWRlb0lkIjoiZmQ5YmZiN2ZmMmVlNGZhNmI0ZTRjNDk4ZjA0ZDlhZTcifQ==" 
            },
            { 
                id: "a6", 
                title: "Ispis tekstualnih poruka", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BxHrbD47KIxxXGAp0QQJQSFf0QX7og1nBSNWPhzRdISB1&playbackInfo=eyJ2aWRlb0lkIjoiOGVmOGE4ODdlNzZiNDY5Yzg5MmRjNzc0NGNmNzQzOWEifQ==" 
            },
            { 
                id: "a7", 
                title: "Konverzija valuta (dolar-dinar)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232jV9irOgPu25V5G6KfjtWqeaeRbtvBJyWwu97ANDt4BPiE&playbackInfo=eyJ2aWRlb0lkIjoiZDFkOWUzYzRmZjhjNGZkYTk1ZDMzMTQwNzBiMGQwNzMifQ==" 
            },
            { 
                id: "a8", 
                title: "Obim i površina kruga", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232hH9W4yyXP1xSFyJtGICYaOjPVLp7bswVv4FpythwgGFsf&playbackInfo=eyJ2aWRlb0lkIjoiNGNkYzNkMmJhZjM0NGUwMzlhY2EzMWI5YzJhMjgyMDAifQ==" 
            },
            { 
                id: "a9", 
                title: "Program za kusur", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232HYuu55VSX9A7lqLLtAQ2xSgMLWzSfGjBidct5WLOBMZup&playbackInfo=eyJ2aWRlb0lkIjoiNmZmOTAxNjM3OTczNDYwNjg0MWI1OTQ2YmRiOWEwYmMifQ==" 
            },
            { 
                id: "a10", 
                title: "Pretvaranje ugla (stepeni-minuti-sekunde)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232XmASvqyFxRDdV3IYLVDLOUHsk0jmYCtkd3U1xD5rLeWKg&playbackInfo=eyJ2aWRlb0lkIjoiYTBiYTk5Y2M3ODhjNDI5OThhZTk5NTIwZjRjMjlmOWIifQ==" 
            },
            { 
                id: "a11", 
                title: "Proizvod cifara četvorocifrenog broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232qP4ZLQpYzf5Ww9HwBIUGMKbeos6tyltBQEarz3gSlPDnv&playbackInfo=eyJ2aWRlb0lkIjoiYWE1YTFlODExY2VjNGExMjkwY2YwMDBhNmMxM2E4NTEifQ==" 
            },
            { 
                id: "a12", 
                title: "Verovatnoća izvlačenja loptica", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232fhHK5GpX3xq3JMtQQypZJxkqJNH6n6JaFPxgvQEA7q2gg&playbackInfo=eyJ2aWRlb0lkIjoiZWI5MmE2NjFmMzkxNDBhODllMDljYzYyYTRiZmY1N2UifQ==" 
            },
            { 
                id: "a13", 
                title: "Stepenovanje slučajnih brojeva", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232kMXFM3iNlCtwtX0lu1grhZtpFAIldU8K3xwmdP4aEZlWR&playbackInfo=eyJ2aWRlb0lkIjoiODExMmI1MzhhNTI2NDhlOTllODIyNDdhNDJlNDhkZDQifQ==" 
            },
            { 
                id: "a14", 
                title: "Nasumičan izbor iz intervala", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232M8TO9jftwleQOdRiaxldyAx2dO6CRKEFp9SV8HYUeiE9w&playbackInfo=eyJ2aWRlb0lkIjoiZmY1YzBjNTAxOWFjNGQ4ZTlhMTBkMmZjNGMyMDMzN2MifQ==" 
            }
            
        ]
    },
    {
        moduleTitle: "02. If naredba",
        lessons: [
            { 
                id: "b1", 
                title: "Uvod i parnost broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323D8UZp6MrrqSeFS2ZlM2CcJofN7XBVGiZgN9ROzHxjZLI&playbackInfo=eyJ2aWRlb0lkIjoiM2ZiYjRhYjc5MjU1NDY4MzhlZDZlZjg1M2YzNjQyNDQifQ==" 
            },
            { 
                id: "b2", 
                title: "Poređenje broja sa nulom", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Ltr7TK4xYSYooJ6eBIos5WctYFAfwqcCn7Lvwzdfgotqs&playbackInfo=eyJ2aWRlb0lkIjoiYmYwYWY3YjJjNmVkNGRjNDllMzI4ZWY2M2ZjYzQzNmYifQ==" 
            },
            { 
                id: "b3", 
                title: "Određivanje ocene na ispitu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232s9jbSqv8qgWTj37Jckis7zQSSMdEIkcpWM7DI9TTkf0ym&playbackInfo=eyJ2aWRlb0lkIjoiZDg1NzI4NTMwZmM5NGQzZWI2YjMzYjdjNzI1NmZlOGQifQ==" 
            },
            { 
                id: "b4", 
                title: "Najveći od tri broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32329FeCQJLDBfoqth3FajjKXPF6zSlENkdsaOUTQ9lim2ml7&playbackInfo=eyJ2aWRlb0lkIjoiMTFjNDJlNWUyMTMyNDE2ZDg2NWJjZTRhYTMxOTNmMGYifQ==" 
            },
            { 
                id: "b5", 
                title: "Koren i provera greške", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325Qh6SZyYaRgHuhNOgQwZLtIW1y34jlYv2qUmG9VVf8zGo&playbackInfo=eyJ2aWRlb0lkIjoiOTcwZDk0NWIyM2JmNGIyNTg1OTQ4NDA2NTEyZDdhYjAifQ==" 
            },
            { 
                id: "b6", 
                title: "Zbir ili razlika (uslovna)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232OaHaxP5Dz1FsS69zvUrYx27AhcfbxwCaXoXilbd53NP2U&playbackInfo=eyJ2aWRlb0lkIjoiMGI0ODg1NDA4MzI4NGJiMGI1N2Y3ZTYyMjQ0Mjk2YzUifQ==" 
            },
            { 
                id: "b7", 
                title: "Deljivost broja M sa N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232U7yUmFO8k5Qm4HB6Ynrx3qQCVfehyzTIi0tzv2oQqmwmN&playbackInfo=eyJ2aWRlb0lkIjoiNTdiMmUyNWRkYzIzNDU1M2JiOTc1NGQxODQxYWFlYjUifQ==" 
            },
            { 
                id: "b8", 
                title: "Provera Armstrongovog broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232G4aPSAh6WxpiJmhpJ7cGDNf2UHJ2NaQJHe0C7nSYjRhFZ&playbackInfo=eyJ2aWRlb0lkIjoiYjdlZGQzY2QyNDEzNDU2NGI2NjA1ZGRhNjE4YTYzYjMifQ==" 
            },
            { 
                id: "b9", 
                title: "Opisni prikaz ocena", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232gq0vAualegZ9CY8Y3MvkiSQztMWGE4iETwqYDo3pU84h7&playbackInfo=eyJ2aWRlb0lkIjoiZTkwOTg1NGU2MmU2NDdiODliZDczMjc2ZjdlOGI4NWYifQ==" 
            }
        ]
    },
    {
        moduleTitle: "03. For petlja",
        lessons: [
            { 
                id: "c1", 
                title: "Ispis brojeva do N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325BYe3p4FzjYdY8HRguQLgC9Y9iXCht9Uewqj2iFehkDzZ&playbackInfo=eyJ2aWRlb0lkIjoiOWQxNjZhNzI5NmVkNGFiOGI5NTMzNGUyZjlkYzllNzEifQ==" 
            },
            { 
                id: "c2", 
                title: "Suma brojeva do N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232FWqL2aPYFVVHOPZuD9cYvN7XSHHVNkJW4fvLMDWlDXVvl&playbackInfo=eyJ2aWRlb0lkIjoiZGE3YmUyMTQyMzllNDVkM2JjOGQ1N2UzMjg2NWNkMzkifQ==" 
            },
            { 
                id: "c3", 
                title: "Parni brojevi do N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Bzi3bZn160gQM1I0NSjW4vJr7KDupcKnY95OOE3cTRcm4&playbackInfo=eyJ2aWRlb0lkIjoiNzk5MTZkMzEyODMwNGZkYzg4MTNkNGU0ZGYyODM2YzEifQ==" 
            },
            { 
                id: "c4", 
                title: "Faktorijel broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232fnugJrysQgUSweScprX8Kdb01Ei3evhwZaDT13HXrDd4y&playbackInfo=eyJ2aWRlb0lkIjoiYzA5YTc2NmM2YzM4NGRhZWI0NWUzMDdhMGU5MDE5MDYifQ==" 
            },
            { 
                id: "c5", 
                title: "Odbrojavanje unazad", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232IXKqbSIU8kVceW7mUM3qWHzMSy3Iq7Z1hOOMP2AzSSzpN&playbackInfo=eyJ2aWRlb0lkIjoiMjVlMWFmMDA2OTEwNDU5N2I5YmUyZGY4ZWIzYzkwMGQifQ==" 
            },
            { 
                id: "c6", 
                title: "Prosek brojeva u intervalu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232y3phm2cQ4YY0NzkqnoBNSkHZ1O9KJZDlaPfKQf65RiM66&playbackInfo=eyJ2aWRlb0lkIjoiMjQ2MWE0MmQ3MTExNDU4NmJlMGRlYTY2Y2ZhMWI1MzgifQ==" 
            },
            { 
                id: "c7", 
                title: "Svi delioci broja N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232IfC83BiId4CeLy874mtbCwroeVJyDEtqqFz1qKu46qqvC&playbackInfo=eyJ2aWRlb0lkIjoiM2ExMzFmMGY4YTllNDVlMjg4ZWJjNTNjMDI1ZWMxNzEifQ==" 
            },
            { 
                id: "c8", 
                title: "Crtanje trougla od zvezdica", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232bABEGz9lTUvCsKXcAHn8gw1yt9oDuv8dipbZiLiINZtt2&playbackInfo=eyJ2aWRlb0lkIjoiYWQ1Njc0NmM2ZWRjNDgxYWEwYzE3YjM5NDM2YWIyNDcifQ==" 
            }
        ]
    },
    {
        moduleTitle: "04. While petlja",
        lessons: [
            { 
                id: "d1", 
                title: "Brojanje od 1 do N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232wsHcOGgqdUxm6NUVpmoDLaxIzhCFNeIVmHwdj41RfKiHX&playbackInfo=eyJ2aWRlb0lkIjoiYTAzMGM3OTk5ZWI5NDY0NDgyNjQ4ZTRmMDRhNTllODQifQ==" 
            },
            { 
                id: "d2", 
                title: "Odbrojavanje od N do 1", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325xhGepHos052X8iIFkLfFF7yl7XBWQnp5zGtojVgSUKvr&playbackInfo=eyJ2aWRlb0lkIjoiMzgwNzZkOWEzMWZjNDMwOTllZGM3NmU5MjUwY2JjZDYifQ==" 
            },
            { 
                id: "d3", 
                title: "Parni brojevi do N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32326gDSz36wn0nxU0qJgOZXoSIY2pbc5glcrOdVFfEVUabHy&playbackInfo=eyJ2aWRlb0lkIjoiNzM4MWMzNTkyNzBhNDdjZmJiNTc5ZmFiMDdjMDI2NDgifQ==" 
            },
            { 
                id: "d4", 
                title: "Broj cifara u broju", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232RL0TCaqAaZCaDxC7BI2cx12EZo84tbCStKBWFIAcdp9OC&playbackInfo=eyJ2aWRlb0lkIjoiOWRhYTUwZmQyMWQ0NDFkM2FjYzBjNWYyMTA3M2U5ODEifQ==" 
            },
            { 
                id: "d5", 
                title: "Prva i poslednja cifra", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232rGX1aanBXV7bHB9MZPV7OKXLoktMG8tgrczL0YhX7zuIg&playbackInfo=eyJ2aWRlb0lkIjoiZTAxNWRmYmE3Y2E3NGQwNzgzMjI0YzhmYzYyMGI5YzIifQ==" 
            },
            { 
                id: "d6", 
                title: "Zbir cifara broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32327oVpWBw9FiPjmkEZeB9jLtZmj5DgDFuVjM4JVVBqZyMNB&playbackInfo=eyJ2aWRlb0lkIjoiM2E2YjdiMTdlOTA2NDllZjlmYWU4YzY0YjQ4OTU5ZjEifQ==" 
            },
            { 
                id: "d7", 
                title: "Proizvod cifara broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232bDMl2Is65pzmGFszdxgSMXD32zDNltZioeAc38082nmn5&playbackInfo=eyJ2aWRlb0lkIjoiMGNlNDZlMGMyNWRlNDc3YmJmOGVhMGE0MWJlOGM2NDUifQ==" 
            },
            { 
                id: "d8", 
                title: "Provera palindroma", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323243ODFftKo3A65a6vPgqFNMuRrynsK2g18rGvZgOpgnZpR&playbackInfo=eyJ2aWRlb0lkIjoiOWIzMjI4M2EzYjI2NGQ2YTkyNzE0N2ZlMTRiM2Y4MDQifQ==" 
            },
            { 
                id: "d9", 
                title: "Prosek do nule", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232fmxQsN7ORu4vh1uZzxA1e7NyocIHy5XTVb3bogwi72nTn&playbackInfo=eyJ2aWRlb0lkIjoiYWM0MGY4NDRhNGEzNDdlYTkyMmM3NjJmZmFmMWE1YzEifQ==" 
            },
            { 
                id: "d10", 
                title: "Do While petlja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232cvRT0P1ar1g2yJhmA45sBQIIau3fm2ztsB3orYwIccvVY&playbackInfo=eyJ2aWRlb0lkIjoiNWNjMWMwM2VmNzk0NDg4YTg0MjY5YTQ1ZThhZDgyMzQifQ==" 
            }
        ]
    },
    {
        moduleTitle: "05. Funkcije",
        lessons: [
            { 
                id: "e1", 
                title: "Provera prostog broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232fRtvyOBO3kLowAjmTdxWa9q3KYiz5FeOSIt7x7ZpzBmIw&playbackInfo=eyJ2aWRlb0lkIjoiYTFjNWVlNDI1NmMxNDU5NWEwMGVkNjc3MTY3MjQzMTQifQ==" 
            },
            { 
                id: "e2", 
                title: "Broj prostih u intervalu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232LiVKubnCk6xB5DosLdV9gBc3EmuZWO7VsSf2a2mkrmKhT&playbackInfo=eyJ2aWRlb0lkIjoiMThmMGY3MmUzZjAzNGM3NWExZGU3MWRhYTBlMmVhZjcifQ==" 
            },
            { 
                id: "e3", 
                title: "Cifra jedinice jednaka 9", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324RWava7xTtcwtQDypmaxq4L0gs1CdqJpQpYySD0MF85D5&playbackInfo=eyJ2aWRlb0lkIjoiODE1MTE5NGYyNTNjNGM0OGE4MjNjNDZlNmU0YTBmZTQifQ==" 
            },
            { 
                id: "e4", 
                title: "Suma brojeva sa cifrom jedinice 9", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Eb98ko7H29qpZN6hg3DGLitcHCwruLuhuY4ztu8aES5MC&playbackInfo=eyJ2aWRlb0lkIjoiNWM1OTBiZTk1ZGE4NDk5YTg1MzBiN2I4NTU1YzA2MWMifQ==" 
            },
            { 
                id: "e5", 
                title: "Savršen broj", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323oTpAABRJNwsChBTRijtO1Av7SuPODhlhU5DFaTJ50zUO&playbackInfo=eyJ2aWRlb0lkIjoiMmE4YzBiYTNlNzM1NGE2M2I1N2M5ZDJmNTg2NGFlNTIifQ==" 
            },
            { 
                id: "e6", 
                title: "Suma cifara (funkcija)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232ywi3JXxTJnxJ4mt0HDhviKbtknrppoKhdrOgkpg9yP2gE&playbackInfo=eyJ2aWRlb0lkIjoiN2ExN2M4OTA4MTY4NDFmOTkwZTlmMzRmYTRlNmJmNWEifQ==" 
            },
            { 
                id: "e7", 
                title: "Parni trocifreni sa sumom 13", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BLMGZzAs66Ifj0fvAtzfqOMS54xDAhWCkp2P1SdzvMEP9&playbackInfo=eyJ2aWRlb0lkIjoiZGUxZjU1YmFjM2VlNDJhZDgyZDk0OTVjOWFmOTc0YjcifQ==" 
            },
            { 
                id: "e8", 
                title: "Suma kvadrata do N", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32329cgGr9LVmG59dMo4lHbtirN1bYNq4GHgMwK7xdrY7ITcE&playbackInfo=eyJ2aWRlb0lkIjoiMzRiNDZjNGI2MmJmNGFiOWE0ZjRiYWMzMzZiZDNiOWQifQ==" 
            },
            { 
                id: "e9", 
                title: "Trocifreni sa uzastopnim ciframa", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232vkX7CWC0VKqsSleTHHDaoXpOtVADgjWWyirdEgDlV5tOV&playbackInfo=eyJ2aWRlb0lkIjoiNjUwNTliMTFiZTllNGExMmI4MjQ2MzdmMmUwYzgwYTgifQ==" 
            },
            { 
                id: "e10", 
                title: "Parovi prostih blizanaca", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232SxicfBwvOgZFp0Oo0EEh0IEpgqaBi15ZgVP375oUviBpt&playbackInfo=eyJ2aWRlb0lkIjoiZjQzOGQ4YmJkMTgwNDQzM2I4MjNjM2ZhMmQxNjUxMGIifQ==" 
            },
            { 
                id: "e11", 
                title: "Rastući redosled cifara", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232FfnkZnSV2gkDdxp4avtS4fdNnVkoj3VGmGz2WkZBiMJ0F&playbackInfo=eyJ2aWRlb0lkIjoiM2JkZjFkYTI1NjA1NDkyMGIxMmFiZTJmZTJkYzMxMTgifQ==" 
            },
            { 
                id: "e12", 
                title: "Min i max od cifara", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232hHylMXbCDrn2D77f6DdMHGY3iwriIlXrzgFMCYPBdmAFd&playbackInfo=eyJ2aWRlb0lkIjoiYmRkYzY3ZTRlZTIzNDBkNjk4MTJlNjhmZjRhYTgxOTQifQ==" 
            },
            { 
                id: "e13", 
                title: "Uvod u pokazivače", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232TR7bIevM2HBJqj5IZXa2jNH1vkLmfr68Tf19DidBbxPhz&playbackInfo=eyJ2aWRlb0lkIjoiYWRiNjRhMzIxZGQ0NGE3NDg4ZGM1YWQ3OTQ4YTZmYTIifQ==" 
            },
            { 
                id: "e14", 
                title: "Pokazivači i unos broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232heBao0nYT8uCUKuFarz0w7KphlbA2NCX7LXh6scUFmRZY&playbackInfo=eyJ2aWRlb0lkIjoiZjU0ZGQ1YTYwNTM2NDIxOGI3NDFjNzZkMTgwNzM2OGUifQ==" 
            },
            { 
                id: "e15", 
                title: "Zamena vrednosti dva broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324RRULNkOQq2FrwgPSka79enPivOFDknbVCIrENmTbcqGm&playbackInfo=eyJ2aWRlb0lkIjoiMWNkN2RjNmU5YmI3NDhiY2EwMGFjNjIzNGQ5OWQxN2IifQ==" 
            },
            { 
                id: "e16", 
                title: "Zamena mesta cifara", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232oLXohsYvTfldGJc8WCsHyMOwwd7HPAfGxIbD7mTF4Jeee&playbackInfo=eyJ2aWRlb0lkIjoiN2NjN2VmOGMzMTllNDBjZmFhNzYyNjEzM2JkM2FmNjQifQ==" 
            },
            { 
                id: "e17", 
                title: "Srednja vrednost deljivih brojeva", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32328ZZc9MbfALCeS8gUSBVaGrnK0xnc7LelVQtQ8FxVMbWMI&playbackInfo=eyJ2aWRlb0lkIjoiMmUyMDVjMjc3ZWM3NDZmYThlMmVhN2VmZDM2YzQ2ZDMifQ==" 
            }
        ]
    },
    {
        moduleTitle: "06. Nizovi",
        lessons: [
            { 
                id: "f1", 
                title: "Ispis elemenata niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232dTyizNPCSrtc5pVXbDANX8wp494x3VPaBkyKtICBQyf6f&playbackInfo=eyJ2aWRlb0lkIjoiMTNkOGZiNjZhNzkzNDNkYjliMWMwYzY0NzEwY2I3MDUifQ==" 
            },
            { 
                id: "f2", 
                title: "Ispis niza preko pokazivača", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232c62IVAsJjqJq0Vnw8u1RSDtAtAJIZD3NhFU9Jh3Gq6ZCM&playbackInfo=eyJ2aWRlb0lkIjoiZGUwNDM5NDE3MTMxNDhkZWFjZTFmNzliZTliZDUxOTMifQ==" 
            },
            { 
                id: "f3", 
                title: "Suma elemenata niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232p1ILQsBeAjDPsCcolfeKWQ0eLQtlJV7jiBxuk3EqEU9Ya&playbackInfo=eyJ2aWRlb0lkIjoiZDFlYzljZTZjM2E3NDVhMWI4YzFlMTM5MzhkZDk2YjUifQ==" 
            },
            { 
                id: "f4", 
                title: "Suma niza (pokazivači)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232TSOP8XjA6Mw7Erh08VA1fw2uyEI17W1m4UDKiTwh2aZIL&playbackInfo=eyJ2aWRlb0lkIjoiNzFjNDFlZGUxNjc3NDMwYzg2NzkyZjAwZThiYWI1MDQifQ==" 
            },
            { 
                id: "f5", 
                title: "Pretraga elementa u nizu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232NIqym1KoWeF6rEfzf5blcz0Yo2OREIqEkEwGHQILZERiY&playbackInfo=eyJ2aWRlb0lkIjoiZTE1OWFhN2QwYTM3NDMwOTkyMmUzOGEyNDg1OTI0MTIifQ==" 
            },
            { 
                id: "f6", 
                title: "Prosek neparnih elemenata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232pMZj1g7LLpsGxNQD7wW2gT2PG3TR6oNXKCELEWZKINt9l&playbackInfo=eyJ2aWRlb0lkIjoiMjJlZmZiZGE2NzcwNDgyMzk1OTNjOWM5NTE2M2YwNmEifQ==" 
            },
            { 
                id: "f7", 
                title: "Palindrom u nizu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232zEjoEuFAvt0ohsyyTTPXxb0gdnufKUKwPawwUh1F2mvIM&playbackInfo=eyJ2aWRlb0lkIjoiNzE5NTdlYTU1MjRlNGIwYzgyNTgzMzY4OGNlNTM4MzcifQ==" 
            },
            { 
                id: "f8", 
                title: "Unos N elemenata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232kXq5TQAeiFCxoxkFVQxOZDIGb5icpM7voUOhRV9cLnWj3&playbackInfo=eyJ2aWRlb0lkIjoiNTEzMmQ0MTZjNTkwNGYwNGFkNzA4Y2FmZWYzOTUyNjYifQ==" 
            },
            { 
                id: "f9", 
                title: "Najmanji parni element", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232ztvKExbgfkykEQexlkJoISNn2gUnBfiuWYgwLr779LDgG&playbackInfo=eyJ2aWRlb0lkIjoiZjVhNzMwY2EyZGJlNDlmMmJmOTBhZTRkZjUzMmFhYjgifQ==" 
            },
            { 
                id: "f10", 
                title: "Elementi manji od proseka", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325IMfbRAuEtU1zhQw10JOP87Uypeo1zi4Klal8LgfliDNN&playbackInfo=eyJ2aWRlb0lkIjoiNGIwY2UzMDAwYzM3NDU2N2FjNjIxMDYxMDkyZmNkNTIifQ==" 
            },
            { 
                id: "f11", 
                title: "Pomeranje niza udesno", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232kVnFud9or9Oo9s7YBnLcarO0gD1Wq4yJIBzfMVxQ0QPpe&playbackInfo=eyJ2aWRlb0lkIjoiM2Y4MjZlNjQyYWI0NDc2ZjlhNzZkYzFiYWQ4ODBiM2EifQ==" 
            },
            { 
                id: "f12", 
                title: "Pomeranje za K mesta", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232xNjqP1aZtL0ynwv85P2DJnBxrX0txPcrLJjQtp71hZLZw&playbackInfo=eyJ2aWRlb0lkIjoiMjIwZGQ3NWJkNjk5NDRmMTkxYjBhMzU1NGE0ZDg4ZTEifQ==" 
            },
            { 
                id: "f13", 
                title: "Uklanjanje duplikata (novi niz)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232rwzSPutq94oaDkEDLSlEwcAZx68QuLKEAZb9VTEaVOdhy&playbackInfo=eyJ2aWRlb0lkIjoiYzUzNzU0YWE4NDlmNDg4ZmE3NmRhY2YzODAxMjhhZGQifQ==" 
            },
            { 
                id: "f14", 
                title: "Invertovanje elemenata niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323Y6qEVRKpF3wxyjQJg0OD5VJJGTrogGcUg8KAAJvWCaKj&playbackInfo=eyJ2aWRlb0lkIjoiNzI1YWVmODJlYmM5NGNjZGEwNjkzOWI4YzZiYjUyMGQifQ==" 
            },
            { 
                id: "f15", 
                title: "Izbacivanje duplikata iz niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32322adtir2iS7WdiZuDZYjjla9gGGUeeVbb2QdROZEmxMFsN&playbackInfo=eyJ2aWRlb0lkIjoiZDQwYmZlYmQ0NGM1NGI3ODgzMjllMjk3MTVhNTFjZmIifQ==" 
            },
            { 
                id: "f16", 
                title: "Razlika dva niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324zcoXq8bmlwa0YFp02EN1zrbdYzJxUXXcCafDRzsBp4Ci&playbackInfo=eyJ2aWRlb0lkIjoiMWVlMTkyOTY3YTM3NDUzYzk0OWU1MjhiYTUxMDk3YzIifQ==" 
            },
            { 
                id: "f17", 
                title: "Provera sortiranosti niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324XyZkza6tVxTzkOedPRWman7Nm8X8yzRNPXybPwwPjttl&playbackInfo=eyJ2aWRlb0lkIjoiOTkwNzczNTIzYjg4NDM2NTkzNzEyYjdhZTk4MDY3ZjkifQ==" 
            },
            { 
                id: "f18", 
                title: "Sortiranje niza (rastuće)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325NdPGT0E2Qm8KHBY6LqMc5NnLHXUEhpcMTEpcAqUXsCKN&playbackInfo=eyJ2aWRlb0lkIjoiNzJiNjQyZjA1NTM5NDRkMjgxNmQ3NDA5YzQ2YTJlOGMifQ==" 
            },
            { 
                id: "f19", 
                title: "Umetanje u sortiran niz", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232edF8kGWIU8KJ1hd5PkARFW09HBiGGFOI0YzD4LOmPzS2B&playbackInfo=eyJ2aWRlb0lkIjoiYWM1YjlkYmVmMzI3NDc5YTlmOTQ1Y2UzNjJlZjUwMmUifQ==" 
            },
            { 
                id: "f20", 
                title: "Najduži podniz prostih", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232GgX9uMRc463HS6ZK0jwlYinD4sT3oo5Y0JUmy7F9I1W2K&playbackInfo=eyJ2aWRlb0lkIjoiYmFmOWFiOWZkMWQ5NDlhMWJkMDBlZGI1YjlkMjk0OGQifQ==" 
            },
            { 
                id: "f21", 
                title: "Maksimalne uzastopne padavine", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323cPlx5nMPsX8dwji0sZVFg9zqQ3jvsBgFnm5UhdUtQjqt&playbackInfo=eyJ2aWRlb0lkIjoiOTcyYmFjOGU1NzI0NGY4YmIwOTVjZWM3YWQwYTVmYjYifQ==" 
            },
            { 
                id: "f22", 
                title: "Filtriranje cena u rangu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232YAyycjRTDb4wlIdaIaqmGAv6nNt8xOsU9OpwTrsQEZzjb&playbackInfo=eyJ2aWRlb0lkIjoiNjVhYTk5NjA4YjMzNGU1YzliYjEwODM0ODg1Y2Y3OTkifQ==" 
            },
            { 
                id: "f23", 
                title: "Računanje medijane niza", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32320vRMO8zVixEOsoebH2N8uwY299bQIHoH5cpQ4ZF8atzHN&playbackInfo=eyJ2aWRlb0lkIjoiYTE0NTM3ZWNmNjVhNDY0MWFiZTFhOGI4M2ZlNjc0NGMifQ==" 
            },
            { 
                id: "f24", 
                title: "Najmanja razlika dva broja", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32329sWZpWEZyvkhdtgKcUzoxFhFN9OGwxDfRJilOCACvOGq3&playbackInfo=eyJ2aWRlb0lkIjoiMzNhN2VhYjJmNzM4NGRhZmI0NzE0YjRhZjJiNjBkMmEifQ==" 
            }
        ]
    },
    {
        moduleTitle: "07. Matrice",
        lessons: [
            { 
                id: "g1", 
                title: "Koncept i crtanje matrica", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232qjRXFFr1A5Zs5KCVpUwodZLhzIC42ML2KCZ7DYGNijSol&playbackInfo=eyJ2aWRlb0lkIjoiZTlkM2NlNGUwMzg3NGY3OTk5Njc2OGI5MWVjNzdhNjMifQ==" 
            },
            { 
                id: "g2", 
                title: "Ispis elemenata matrice", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232nzOXZlunXcNVn1SxPlngtvsfP4qZK7zJFkttMAqcSK4UB&playbackInfo=eyJ2aWRlb0lkIjoiNjkyMGZjNjZmZTcxNGI1ZDk4YmNjYTYzNzlhZTI3OTQifQ==" 
            },
            { 
                id: "g3", 
                title: "Suma reda matrice", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232SQlJvb5bOq7oro12U1OwdUnO2FtVzbEPN2t1vPQVt3bsz&playbackInfo=eyJ2aWRlb0lkIjoiMmJlMTJiMTY0MDRkNGE2MzgwMGFlZTVhNmJjM2I0NDkifQ==" 
            },
            { 
                id: "g4", 
                title: "Prosek svih elemenata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32326G9yZkspUOWSpHY1xdzw0COLLYjND5FH0PuwSDhJRWhP2&playbackInfo=eyJ2aWRlb0lkIjoiNTc1NTFjYjE4ZjVjNDEyYjljOGUzODgwMjJmNGEyN2YifQ==" 
            },
            { 
                id: "g5", 
                title: "Najmanji element matrice", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32321MAWBy00MRuplMI810BXyOolZRaXIMP7q4wzllSOBQmiX&playbackInfo=eyJ2aWRlb0lkIjoiYmNkOGRmNWY3YTMwNDEzMWFhOThjMmZhZDQ2YjM4ZTkifQ==" 
            },
            { 
                id: "g6", 
                title: "Kolona sa najvećom sumom", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232LKAdyyRruwUFaW0FOLgTXk2Hgn3NdLcLr4jjLekX7EKUB&playbackInfo=eyJ2aWRlb0lkIjoiYTAyNmNiZjdkMTdjNDE2MTgxOTlmYTZkZGU0YjdiMDAifQ==" 
            },
            { 
                id: "g7", 
                title: "Glavna dijagonala u niz", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32322TqWyTdieIjYiGuT35BTg7Ba5R5YyxDKAFH1BxQyN0c5y&playbackInfo=eyJ2aWRlb0lkIjoiNDljZDY0YmRhMzVkNGVlODkwZWMzZTIwN2FmMmQ2NGUifQ==" 
            },
            { 
                id: "g8", 
                title: "Zamena ispod sporedne dijagonale", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32327GnzSQVmZMtyKcxKcd2ZvMUKxlLfavhNHTGIzz4bhLM7E&playbackInfo=eyJ2aWRlb0lkIjoiM2Y4NmM2ZmIwZTY4NDc2NWJkMTgyZjg3MjMxZDYxN2IifQ==" 
            },
            { 
                id: "g9", 
                title: "Crtanje figure", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232FLALIiB5RyMwU91bY6JvVZFfT07xCaCu2Ih1SuPbmpswB&playbackInfo=eyJ2aWRlb0lkIjoiNzZhNTA1N2EwYjg2NDZlZDg4ZjY5MTlkZTA4ZjE2N2YifQ==" 
            },
            { 
                id: "g10", 
                title: "Maksimumi kolona u niz", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232XJc1vxrJ5izsB8eC8jSJTSsZTEtbno0ImbylJcJB8xTaw&playbackInfo=eyJ2aWRlb0lkIjoiZDIzMTI1MDk0YTA5NGE2MTgxYmE4ZmJiZDQ4NjVkYjAifQ==" 
            },
            { 
                id: "g11", 
                title: "Različiti elementi i rastući niz", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Bd8tzdWOSp8OAleDPZTEr38S0ToLPxb4nXKbpOS449FZ1&playbackInfo=eyJ2aWRlb0lkIjoiODY5NDc3MDI1YzYwNGZhOGI4NDk5ZmQ3MzgzMTg0NzEifQ==" 
            },
            { 
                id: "g12", 
                title: "Magični kvadrat", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232J2h2Z0rczJJ6a4fALEVjInvZt5cK7mYm6x4tEZVqxPHrp&playbackInfo=eyJ2aWRlb0lkIjoiZGVhNGUxNDQzMTBlNDMwZjg1ZGMzZDY1NWU2NzBiNzUifQ==" 
            },
            { 
                id: "g13", 
                title: "Ogledalo, transformacija kolona", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232UOdjTZgdfGISV4TaHI7SSjUoRXgawnvjWUY8rtyUQayK7&playbackInfo=eyJ2aWRlb0lkIjoiM2RhNTc0ODdiOGEzNDY4MTkyZWNkNGRlNDdiYTYxNTMifQ==" 
            },
            { 
                id: "g14", 
                title: "Pomeranje vrsta naniže", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232euuzkCsYsxjxFVtcGJAKDbO69fEQ9l9Ph8J4eD5wpUSq3&playbackInfo=eyJ2aWRlb0lkIjoiYjU1NTYwNmM3ODEzNGRlM2IyM2RiNWEwMzc1ODI3YTYifQ==" 
            },
            { 
                id: "g15", 
                title: "Zmijasto prebacivanje u niz", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232louhurCNA1f73qS91WOUlMfMIKZjkE0p3qXUzl01OvZZt&playbackInfo=eyJ2aWRlb0lkIjoiMzRiYTcwMWVlMjliNGRmMGI4NDI0YjVkNTJhZTQ1ODYifQ==" 
            }
        ]
    },
    {
        moduleTitle: "08. Stringovi",
        lessons: [
            { 
                id: "h1", 
                title: "Osnovne funkcije (string.h)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232p8p5RFsa79iMb2EjPbNKCvHssb5QYdM2M9DoLv0HHIgKV&playbackInfo=eyJ2aWRlb0lkIjoiM2QxZTY5ZTFhNWU2NGRiZTkxOTY4Njk3NjdiODYzMzUifQ==" 
            },
            { 
                id: "h2", 
                title: "Dužina stringa (funkcija)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232uxQIgVgXicFJbSZCvbGpEhv8RuQEAmOPta7ZRRE1PhS4k&playbackInfo=eyJ2aWRlb0lkIjoiMzY0NWViNzk3NjBiNDgzYzllMDU1ZWUxYWIxZWZmYjkifQ==" 
            },
            { 
                id: "h3", 
                title: "Poređenje dva stringa", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232gA1s8FmqbCgZazTGl60UZgQnhJm4FGrC1lqFi0ChloHus&playbackInfo=eyJ2aWRlb0lkIjoiMzFjOTBiZWM5Y2RjNDU3OGIxNjhkZjFkNWUxY2E1OWMifQ==" 
            },
            { 
                id: "h4", 
                title: "Provera samoglasnika u stringu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232LAe6hSgg9aEmXUoeWrx41bYuRpBJKd5pKOyjMrvGYU9TF&playbackInfo=eyJ2aWRlb0lkIjoiODQxZjFmNTFiMzllNDE0ZTg1Yjc1NzAwODMzN2MzNzgifQ==" 
            },
            { 
                id: "h5", 
                title: "Prepoznavanje cifara u stringu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232y9X9gCgWuwrkGBbKP8Wg8KI0GZ2sqsqyDW6eaIsxs0szS&playbackInfo=eyJ2aWRlb0lkIjoiOGI2ZDQxZWRiZDc1NDUzMzhkM2I3NmRkNmQ2ZTUwMjYifQ==" 
            },
            { 
                id: "h6", 
                title: "Uklanjanje razmaka i cifara", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232eR3Ma3MPRPf344KSBJzk43I45WEnSQZdHPKt9NX5MZWu2&playbackInfo=eyJ2aWRlb0lkIjoiYWU5ZTYwNDE3ZTI1NGI2MGEwNDFhZDllMDAyYWY5MTAifQ==" 
            },
            { 
                id: "h7", 
                title: "Invertovanje malih/velikih slova", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232oPZDfRE5CTT5rwWcd6oD2s1SDelcnqFLCDAOPHFsnd0lu&playbackInfo=eyJ2aWRlb0lkIjoiZTZlMGU1NTNkYWQ0NDU2YmIxM2IzZWI2OTUxMGE1N2EifQ==" 
            },
            { 
                id: "h8", 
                title: "Provera anagrama", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232PZzcLIpYVfz6wS4lRzFtKOSpdM17Wt3yfzhVqcfAgZXG6&playbackInfo=eyJ2aWRlb0lkIjoiNWI0OWUxOWIzZDYyNDliZWI2Yjg2NjI3NTU2ZjZiZGYifQ==" 
            },
            { 
                id: "h9", 
                title: "Validacija formata šifre", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232vexE9ZvZzZ6MZ7YYR5d91vUFwrO7YJ3rhl6N2jyfWaiOA&playbackInfo=eyJ2aWRlb0lkIjoiYWJkOGE0YjA2MmU3NGI0NTkzYjg2MjliY2NiOWNmODIifQ==" 
            },
            { 
                id: "h10", 
                title: "Godine starosti iz JMBG-a", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232wuyazpzQQoT1rc8Xlnu4z3xxLVMxe3JY0k7Il7nKdYADa&playbackInfo=eyJ2aWRlb0lkIjoiNTU4OGM4MjNjNTUzNGY2ZjlkZjUxM2UxM2Y5YWQ2OGYifQ==" 
            },
            { 
                id: "h11", 
                title: "Kompresija niza karaktera", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232UBzeL1cnGlBdafGa1YMK8ZjzPng3MJ3d23HYL4hDigTLG&playbackInfo=eyJ2aWRlb0lkIjoiMzQ5OGQ3OTM0ODhkNGYxM2I2M2Y4NTllODcxNjE5YmIifQ==" 
            },
            { 
                id: "h12", 
                title: "Binarni u dekadni broj", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32328l1lGmYDeMgQ41G7wmQjNZzwec6VfgF8wKAIdd8sOkyAl&playbackInfo=eyJ2aWRlb0lkIjoiNzNlNzAxNDAzZmM0NDNiMjkzMzFiOGU0OGFmOTk2MmQifQ==" 
            },
            { 
                id: "h13", 
                title: "Dekadni u binarni string", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232vnvVgT5j2fb5fMNZRRytzpJr8VVnKSZ11TjyZxSLteLPC&playbackInfo=eyJ2aWRlb0lkIjoiODk4ODU4NTQ0YzFlNDhlN2ExZTYwM2ViYzJiMDI0NmIifQ==" 
            }
        ]
    },
    {
        moduleTitle: "09. Strukture",
        lessons: [
            { 
                id: "i1", 
                title: "Inicijalizacija i prikaz strukture", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232ZLQUmqu3f4mtS3FLMrFaPLHB2VxwRhE4m9JgHRyo8Mylx&playbackInfo=eyJ2aWRlb0lkIjoiYjVlZmRiMDhiOWYwNGNmMDgwNTBmNGYyNWY0YmY4NDcifQ==" 
            },
            { 
                id: "i2", 
                title: "Unos i ispis proizvoda", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232BwgUvuZOsgH6agt2bghz6YbrPlZVoI8Jem8xYVjcOfhHD&playbackInfo=eyJ2aWRlb0lkIjoiZmIyMDkxNTcyYTYwNDA2ZWIwOTZmM2M3MmRhZjc3ZGUifQ==" 
            },
            { 
                id: "i3", 
                title: "Niz struktura (proizvodi)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232zbav3gfyRyPb3SLr1kXVlFHR5DMPhJg8fMskG350YLL6x&playbackInfo=eyJ2aWRlb0lkIjoiMGQ0MmVjNjQwNmQ1NDU5ODgwNGY1MjMxNGNlMTdlOGIifQ==" 
            },
            { 
                id: "i4", 
                title: "Sortiranje proizvoda po ceni", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324DNvCpqGC7pjAYGLTyn3j8yeQX7d00aM9znFHIgd7amWN&playbackInfo=eyJ2aWRlb0lkIjoiZjYyNzFkZGQyODE2NGZhNGFkYTg5YjgxM2QzMDM4NWYifQ==" 
            },
            { 
                id: "i5", 
                title: "Strukture: Rešeni zadaci", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Lku6whQnii0ADrt6r3p0uIrpds3mGmG2wf5KhBdSbNuAF&playbackInfo=eyJ2aWRlb0lkIjoiYmI0OGYwOTJjZWJiNDEyYzk4NGY3ZjkwMDIzNTg0ODEifQ==" 
            }
        ]
    },
    {
        moduleTitle: "10. Liste",
        lessons: [
            { 
                id: "j1", 
                title: "Uvod u liste (vizuelno)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232FMPrALiWbPUmfr4Sa7ka8rVa2HaKw6mnkhUM32sSyOHPg&playbackInfo=eyJ2aWRlb0lkIjoiN2Y1MDlhYTg0ZjViNGI0OThhMjI4YWE0NzA4MWM3OWIifQ==" 
            },
            { 
                id: "j2", 
                title: "Ispis elemenata liste", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32320vEHPPxLliXKsL4MtRXMa3qGDm1W7CAULWMjB6iylsjJ7&playbackInfo=eyJ2aWRlb0lkIjoiODE1MDU5ZTY0ZWFkNDRmYjlmNzAxY2EzOWQ5Y2QxZDcifQ==" 
            },
            { 
                id: "j3", 
                title: "Dodavanje na početak liste", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Ys6RjZg7fvZW1lukUIuRcUEmUmg45FbQpB8yS3OEKhoBY&playbackInfo=eyJ2aWRlb0lkIjoiMjg0ZjEzM2JmZmQ2NDA5ODkzMzRiOWU2NTZjMjEzNzAifQ==" 
            },
            { 
                id: "j4", 
                title: "Dodavanje na kraj liste", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232l5NwhWWXXe2yoSXJV8KiYsRl3e71e26eYKoTcabBq8tO9&playbackInfo=eyJ2aWRlb0lkIjoiMzU2Y2M3M2MxMDgyNGQ4YTlmNzExZDIzZjM3OTM5OWQifQ==" 
            },
            { 
                id: "j5", 
                title: "Brisanje prvog elementa", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232uShKV6z3j2QPwyGXSPleXFRjB0DN3qcrddIxwKU69M7yN&playbackInfo=eyJ2aWRlb0lkIjoiZWYxMmNkMjZlZmFkNGZkZmE3YzdmMjI5YjM2NDg4NGEifQ==" 
            },
            { 
                id: "j6", 
                title: "Brisanje poslednjeg elementa", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232FXVWX6ji7LRnVw7du1MccGIqAVNH3e25r1Ae1q4uq7N60&playbackInfo=eyJ2aWRlb0lkIjoiNDg0YWE3NmEwY2E1NDg1YjkzODdlODlhMTc0MjliODMifQ==" 
            },
            { 
                id: "j7", 
                title: "Sortiranje elemenata liste", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232EriQZOLD6fX8RhYWq3llvjPL6HJT2kBH0YJszuOUjrHNf&playbackInfo=eyJ2aWRlb0lkIjoiMzRlNGJjODgwNWFkNDc4YmFkYzc5NGYxMzA4MTczOWQifQ==" 
            },
            { 
                id: "j8", 
                title: "Prosek elemenata u listi", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232eTetyzJZ2VhvzG1J4JvjQLUOitNaYUxrwmxp7K63iWQkc&playbackInfo=eyJ2aWRlb0lkIjoiOGU3NDQxZDcxZDhlNGZhYmI5Zjg0Nzc2MzE4Mzk5MTMifQ==" 
            },
            { 
                id: "j9", 
                title: "Pretraga elementa u listi", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232vOgZ89m2uusrlYg6woXIcgvD5rlVloPynxyPh8kdbzFAm&playbackInfo=eyJ2aWRlb0lkIjoiYjlkOTQ4ODY4NmFkNGJhMzhjNmI1NTI0NjgyNGNkMTQifQ==" 
            },
            { 
                id: "j10", 
                title: "Niz u listu bez duplikata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323211JDFDy5SmCAPdMiDxYiovACRTCsBkjH3zrPNr47PFG8O&playbackInfo=eyJ2aWRlb0lkIjoiMzE0ZjdkMmJlOTI5NGMyOGI4ODFiMzEyOTJlMmVhNTEifQ==" 
            },
            { 
                id: "j11", 
                title: "Brisanje određenog elementa", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232960xGfDVtRBhUr5GBmkR1xs8lsr1FNpRM2cr8Di2GWRRn&playbackInfo=eyJ2aWRlb0lkIjoiNGE2NTc4MGQxY2FiNDFhZjlkYzU3YTQ0NmM4YzcwNDYifQ==" 
            },
            { 
                id: "j12", 
                title: "Simetrična razlika lista", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232J5LbmrjQNHtgATzdeDkud4q37UDXY9bWlInATyIUezgfj&playbackInfo=eyJ2aWRlb0lkIjoiMDVkNGQ4MWEyM2FhNDM4ZDk5YjkzOTFhZjQyOGQ2YzgifQ==" 
            },
            { 
                id: "j13", 
                title: "Umetanje u sortiranu listu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232myeJnzrsQNSt8FQKVGDsWKD2aBFU5jARvqjEaUxj5KizX&playbackInfo=eyJ2aWRlb0lkIjoiMTE1Y2U5NzFkZjMxNDhmYTg0MDA5NWIwZmJmNzQwMTQifQ==" 
            },
            { 
                id: "j14", 
                title: "Zbirovi matrice u listu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232R77RhwZs5n7wrRuCDQ3YB5VbsWyoyzvnkwI8f0RxibJeU&playbackInfo=eyJ2aWRlb0lkIjoiYzY5OWQ0NWM5NmFiNGU2OThkYWFkYTljZTZjZTk4YWMifQ==" 
            },
            { 
                id: "j15", 
                title: "Provera jedinstvenosti elemenata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232Up8JHF1a9iiQ2QYl6J0eOqhdiLfV7otAbzrf3gAz10VPe&playbackInfo=eyJ2aWRlb0lkIjoiZDgyZmQ0MDRiYmZlNGQxZmFlOTU3YmMyMTA2ZTc5MDYifQ==" 
            },
            { 
                id: "j16", 
                title: "Prebacivanje broja na početak", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232lodRRSdAXgJW3aAOfW5et2iXdCXzHlr36ja2BF3ouJcRj&playbackInfo=eyJ2aWRlb0lkIjoiMzQ4Zjg2OWE5MjQ2NDZlZThmOGY1NDZhODE3OWNlMWQifQ==" 
            }
        ]
    },
    {
        moduleTitle: "11. Liste sa strukturama",
        lessons: [
            { 
                id: "k1", 
                title: "Uvod u složene liste", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE323286SDU3VPiI7gekOhEWGkV9MZk4s9EIkfZZaFO6mtCVhCE&playbackInfo=eyJ2aWRlb0lkIjoiOGNiMzYxY2Y2MTgyNDYxODkyMzQxZDgyNTE4MTFkMTAifQ==" 
            },
            { 
                id: "k2", 
                title: "Dodaj studenta na početak", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32325XxpkTdCqlJmbGfNE0mKMKGxnUCdJIcGXa9zJx7iCBmkb&playbackInfo=eyJ2aWRlb0lkIjoiYWRhYmZmNjYzMGQ1NDAyMGI4MDYzOTZlOGI1ODIwNmYifQ==" 
            },
            { 
                id: "k3", 
                title: "Prikaz liste studenata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32321iPn3mVCaNH50YtgJIxclx0tqKUml7133O05JATCHZ0JC&playbackInfo=eyJ2aWRlb0lkIjoiYTg4NzI4MGJiM2ExNGQ1ZWEwZDk2N2RmYWVjODEyMTYifQ==" 
            },
            { 
                id: "k4", 
                title: "Pretraga studenta u listi", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232pzLDl52dvdxJfiORAZmCqAbkLx4VwAxnPX6v1VxXFdsJI&playbackInfo=eyJ2aWRlb0lkIjoiMTVlNDI0YTVjYjZjNDc5NjlmMGNlNGI2OTU2YTBkZmEifQ==" 
            },
            { 
                id: "k5", 
                title: "Studenti preko 200 ESPB", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232tDrBwU48AJSR0vfG72gc8QwMu9wg6fsyDDHcDmCmd0jaQ&playbackInfo=eyJ2aWRlb0lkIjoiZDY5MWQzYTUyY2Y2NDYzNjliN2Y0ZGM4ZDVkNDU0YTQifQ==" 
            },
            { 
                id: "k6", 
                title: "Dodaj studenta na kraj", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32328XiKkGoTRM7OCwKLvVW8Am8mLNor1JR1MicDJtaO9zoS8&playbackInfo=eyJ2aWRlb0lkIjoiNDZmNWM5MWRiODBhNDQwOGI1MWU4ZTI4ZWZjN2Y5NTcifQ==" 
            },
            { 
                id: "k7", 
                title: "Pretraga po imenu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324R2GAwzR8pmsDAgnoJVEQ2wnxMBxaztzCPa2MXRGjOPpO&playbackInfo=eyJ2aWRlb0lkIjoiMDJhYmE5MTA2NGIwNGQ1OTlmZjA5ZmRiYzU4OTU4NGQifQ==" 
            },
            { 
                id: "k8", 
                title: "Pronalaženje po broju indeksa", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232y1V3gxWiWBWVg3ibkrFj4ewQUxNGJ6LezDVOhafI2itVc&playbackInfo=eyJ2aWRlb0lkIjoiZGFmMWE1ZGZhMWY5NDc3YzlmZWI2N2ExYzI1NzE1ZGMifQ==" 
            },
            { 
                id: "k9", 
                title: "Ažuriranje podataka studenta", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232plBn3NfeehmDZjADNQrV6T4RnHG5UCLj8RSHX4SVHGRk2&playbackInfo=eyJ2aWRlb0lkIjoiZGUxZjFlNDA3ODVlNGMwMDkzOTUwNDdiYmY3YjQ1NDEifQ==" 
            },
            { 
                id: "k10", 
                title: "Sortiranje po više kriterijuma", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232WsuFq8U20EIBCCdOxE3kmMj1vFS040LYEnbQuCVonPv0n&playbackInfo=eyJ2aWRlb0lkIjoiYjVmY2E3ZDkxMGQ2NDA5MmEwOTczZjkxMDlkNjUxODMifQ==" 
            },
            { 
                id: "k11", 
                title: "Top 5 studenata", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232n2TlmA9zQbZYhIPOtNZ1S7BCNWb0FXd66wjqNI94pNKdN&playbackInfo=eyJ2aWRlb0lkIjoiYThlYzNhOGJhNTE3NDU4YTg4NmJlNTYxNmQ2NDZkMjYifQ==" 
            }
        ]
    },
    {
        moduleTitle: "12. Datoteke",
        lessons: [
            { 
                id: "l1", 
                title: "Čitanje karakter po karakter", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32326HNuUsBg2YqrHl2Y4iHAb444iq9LQHZPwSCLJcWDfu1cB&playbackInfo=eyJ2aWRlb0lkIjoiNTNjN2Y1MmRmZjQ0NDgzNGFmN2M0NzEzNmJiYmQ4YzYifQ==" 
            },
            { 
                id: "l2", 
                title: "Čitanje liniju po liniju", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324dZkdoU8OXd9tMc5j8UZkHswgGdQc1oU15d2bHNuWBSeO&playbackInfo=eyJ2aWRlb0lkIjoiNDQ0ZjZkODI0MjkzNDAxMWIxMGFlMzY3ZjhmOTBmZTgifQ==" 
            },
            { 
                id: "l3", 
                title: "Učitavanje matrice (poznate dimenzije)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232XBZP9pqSUXVst9FRL2WyOa2qZuhI9Ypr2vH0pYP1ZVAJQ&playbackInfo=eyJ2aWRlb0lkIjoiYzAwYjE2NWJlMWEzNGE1YjgyMjQzMTc3NmY2YWQ2NTIifQ==" 
            },
            { 
                id: "l4", 
                title: "Učitavanje matrice (dimenzije u fajlu)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232YeQJdCC6QIXa0Tqutwp20dy7dpIyCzSfRfixJ9UUhEwe1&playbackInfo=eyJ2aWRlb0lkIjoiM2U0MDAwMTAyNDJlNDEzZDgxMzQ1ZDg4MDVlMjVkODUifQ==" 
            },
            { 
                id: "l5", 
                title: "Učitavanje nepoznate kvadratne matrice", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232S1odmH25aO6FqMQTXOZ4MHGZB7Qt0UNUimbpTM1nNYnem&playbackInfo=eyJ2aWRlb0lkIjoiNTAzOTBiYmE3ZjBjNGNkYWJjYTI3ZDI1M2Y0ZTM1NTMifQ==" 
            },
            { 
                id: "l6", 
                title: "Učitavanje nepoznate nekvadratne matrice", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232L3HoDo4iIXAbP9IywxJ4xiaXyjWKDlrPEysCrWjCh2oOJ&playbackInfo=eyJ2aWRlb0lkIjoiNjU3ODY0OGExNTdjNDcyNmFiNDVhMjNhZmM4YjZlMzEifQ==" 
            },
            { 
                id: "l7", 
                title: "Učitavanje niza (poznata dimenzija)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232iPOg2HU5eCKZYRtP36HUx5XXifQmZJITgBWCsXENmlQCs&playbackInfo=eyJ2aWRlb0lkIjoiMzFkNmM5ZmI5Yjc1NGNmMzhlYWE4NzNmMTkyNWY2MzcifQ==" 
            },
            { 
                id: "l8", 
                title: "Učitavanje niza (nepoznata dimenzija)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232QmxYrQMEjBUtcJBiaJDpJVsCOY7Wz6F8jHtPGrOysP2G9&playbackInfo=eyJ2aWRlb0lkIjoiMDU3MDNlNTgzMmY5NGU4NTkzMTY2YWMyNTc1MTA3OTUifQ==" 
            },
            { 
                id: "l9", 
                title: "Upis figure romba u fajl", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232vAtF5X8T0MdbCfoHaj0L4oAXBurIM4bXRs9M2dpiuQpU5&playbackInfo=eyJ2aWRlb0lkIjoiYTlkZGE4ODc2Nzk2NDlkMmE4OGNmN2FiOGZjZTI0MzgifQ==" 
            },
            { 
                id: "l10", 
                title: "Analiza reči i redova", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232aQav1qmBukrXVZFNjWP0UWFo6WZlUaY1g07tW1L5nYyVN&playbackInfo=eyJ2aWRlb0lkIjoiYmI5MzE4ZWYzN2ViNGNiNTlhNWZmMGQyYmQ2ZTYxYzIifQ==" 
            }
        ]
    },
    {
        moduleTitle: "13. Binarne datoteke",
        lessons: [
            { 
                id: "m1", 
                title: "Upis matrice u binarni fajl", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32323ZwhjpjhzImuPN2VKa0ekFByKxMhcPa6kw3U8muig2Xaz&playbackInfo=eyJ2aWRlb0lkIjoiNjcyZWQ3N2RkNjEzNGMwYmI2OWVkNTU2OTFkNWRjOWIifQ==" 
            },
            { 
                id: "m2", 
                title: "Učitavanje matrice nepoznate dimenzije", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232krZ83cJybtzITtfnhXTkG7nouxyH92tJyCkNPY5DT7oW8&playbackInfo=eyJ2aWRlb0lkIjoiOTZlMjFkMDA0Yjc5NGU4ZGI5ZDI5OTFmMTZlODljYzcifQ==" 
            },
            { 
                id: "m3", 
                title: "Učitavanje proizvoda u listu", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE3232bnj67T9dyFVz6kIt4Cl1IgdOZJw7G7cYQXNikDHQydUAS&playbackInfo=eyJ2aWRlb0lkIjoiNTFjZjU5M2E2MzBiNDcwMzg3ZjBkNTU3ZTkyMDdmMGQifQ==" 
            },
            { 
                id: "m4", 
                title: "Brojanje skupih proizvoda (>100)", 
                url: "https://player.vdocipher.com/v2/?otp=20160313versUSE32324ZLj02d8FWofEsC3SDPXDnUZ6hCJGnXdaHSsRpwn70v1a&playbackInfo=eyJ2aWRlb0lkIjoiY2VlMTUzOWIyOWQ4NDI1MmEwYjUwZDhlZTYxMTExOTIifQ==" 
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

function selectLesson(lesson, moduleTitle) {
    currentLessonId = lesson.id;
    if (vdoPlayer) vdoPlayer.src = lesson.url;
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
            window.location.href = "/oikt";
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