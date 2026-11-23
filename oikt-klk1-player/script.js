import { startPlayer } from "/index_files/player.js";

const courseData = [
    {
        moduleTitle: "01. Brojevni sistemi",
        lessons: [
            { 
                id: "a1", 
                title: "Konverzija iz dekadnog u binarni sistem", 
                vdoId: "4f4490037aac425cbe958d9c93eb47a4" 
            },
            { 
                id: "a2", 
                title: "Konverzija iz binarnog u dekadni sistem", 
                vdoId: "1aa0db34974d443bad6a268254b70f30" 
            },
            { 
                id: "a3", 
                title: "Konverzija iz dekadnog u heksadecimalni sistem", 
                vdoId: "f218fd62e20c4a02a4af94d4a5736bb9" 
            },
            { 
                id: "a4", 
                title: "Konverzija iz binarnog u heksadecimalni sistem", 
                vdoId: "f0a35ff0e1864edf9f481da8db9033cf" 
            },
            { 
                id: "a5", 
                title: "Konverzija iz binarnog u oktalni sistem", 
                vdoId: "5c0b3c3ccee145a5a15958d14a07ee59" 
            },
            { 
                id: "a6", 
                title: "Konverzija iz oktalnog u dekadni sistem", 
                vdoId: "4f9249da64c14da5b4a363dbdbb5e3d5" 
            },
            { 
                id: "a7", 
                title: "Konverzija iz heksadecimalnog u dekadni sistem", 
                vdoId: "60607b6534cb499ca2ee3599a3757690" 
            },
            { 
                id: "a8", 
                title: "Oduzimanje binarnih brojeva", 
                vdoId: "34fd8912f85d4ce4be7428a7586869e4" 
            },
            { 
                id: "a11", 
                title: "Konverzija negativnog broja", 
                vdoId: "bce49eec334446978dfa837456cbcba7" 
            },
            { 
                id: "a9", 
                title: "Zadatak 1", 
                vdoId: "76f0384f43914a56adae0f07be1ec50a" 
            },
            { 
                id: "a10", 
                title: "Zadatak 2", 
                vdoId: "136c707a6090474d9ba8513043b00b88" 
            },
            { 
                id: "a12", 
                title: "Zadatak 3", 
                vdoId: "df0eceebfa994788a13bd78d33ec5dad" 
            },
            { 
                id: "a15", 
                title: "Zadatak 4", 
                vdoId: "a7315f2ebd57456cb37a2b3fa38a6b4c" 
            },
            { 
                id: "a13", 
                title: "Konverzija decimalnog - Zadatak 1", 
                vdoId: "a36de11205624c6280150f24a8c444aa" 
            },
            { 
                id: "a14", 
                title: "Konverzija decimalnog - Zadatak 2", 
                vdoId: "4e0939b712e04886a857bc94fa9f571a" 
            }
        ]
    },
    {
        moduleTitle: "02. BCD kod",
        lessons: [
            { 
                id: "b1", 
                title: "Zadatak 1", 
                vdoId: "f3437a61d84147eea470b6ddfd2159bc" 
            },
            { 
                id: "b2", 
                title: "Zadatak 2", 
                vdoId: "b7c5dde677ce4350bc6525da744b7ae8" 
            },
            { 
                id: "b3", 
                title: "Decimalni broj", 
                vdoId: "b91ee791d1d242f1993f6940567ab80b" 
            }
        ]
    },
    {
        moduleTitle: "03. IP adrese",
        lessons: [
            { 
                id: "c1", 
                title: "Zadatak 1", 
                vdoId: "e1e2e3677b8e465ab1ad8f58b27322ff" 
            },
            { 
                id: "c2", 
                title: "Zadatak 2", 
                vdoId: "d18732604a514edcbbca995cb0af3a0d" 
            },
            { 
                id: "c3", 
                title: "Zadatak 3", 
                vdoId: "1cc8e4ecab64424a962c90adb18fe7cb" 
            },
            { 
                id: "c4", 
                title: "Zadatak 4", 
                vdoId: "087bf337b023419db059e59be3b10df4" 
            },
            { 
                id: "c5", 
                title: "Zadatak 5", 
                vdoId: "5ed8a11a46b042eeabaeaf98bce77d69" 
            }
        ]
    },
    {
        moduleTitle: "04. Big Endian",
        lessons: [
            { 
                id: "d1", 
                title: "Zadatak 1", 
                vdoId: "1f94b24a66504f72b8f5473337eb1c34" 
            },
            { 
                id: "d2", 
                title: "Zadatak 2", 
                vdoId: "d3c8125fb41c4282a846f22a5642ded7" 
            },
            { 
                id: "d3", 
                title: "Zadatak 3", 
                vdoId: "90884d31e10e49f4be6a8587da6b7b14" 
            },
            { 
                id: "d4", 
                title: "Zadatak 4", 
                vdoId: "8de8b871bdf34f649480490a466f62da" 
            },
            { 
                id: "d5", 
                title: "Zadatak 5", 
                vdoId: "09e0d8385f1c4c2f98744f702a82f7f8" 
            },
            { 
                id: "d6", 
                title: "Zadatak 6", 
                vdoId: "b4853750ec124168b9e0266ec4f1e8bd" 
            }
        ]
    },
    {
        moduleTitle: "05. Little Endian",
        lessons: [
            { 
                id: "e1", 
                title: "Zadatak 1", 
                vdoId: "bc8e0684b2384940ba3f4bcb2a6277c0" 
            },
            { 
                id: "e2", 
                title: "Zadatak 2", 
                vdoId: "6a05fd46fded43bcba2e6a4a7d81145d" 
            },
            { 
                id: "e3", 
                title: "Zadatak 3", 
                vdoId: "93bb6491608e4c528ec3369ad891ba55" 
            }
        ]
    },
    {
        moduleTitle: "06. Količina informacije",
        lessons: [
            { 
                id: "f1", 
                title: "Zadatak 1", 
                vdoId: "b5ec4b2227bc4098b5d85ecc66d49442" 
            },
            { 
                id: "f2", 
                title: "Zadatak 2", 
                vdoId: "1819295d63fd439bb200efa966f789c2" 
            },
            { 
                id: "f3", 
                title: "Zadatak 3", 
                vdoId: "4abe9e3501b9430186fc42c5a2632da5" 
            }
        ]
    },
    {
        moduleTitle: "07. Entropija",
        lessons: [
            { 
                id: "g1", 
                title: "Zadatak 1", 
                vdoId: "1af360f0c64742ad97869693f9e0bde1" 
            },
            { 
                id: "g2", 
                title: "Zadatak 2", 
                vdoId: "d97e61149def4633a7174affdd605f4d" 
            },
            { 
                id: "g3", 
                title: "Zadatak 3", 
                vdoId: "d668a54435ac467fafb30770b2e2b50a" 
            },
            { 
                id: "g4", 
                title: "Zadatak 4", 
                vdoId: "80ff206268bc48ed9c240ce2c6e8a2f5" 
            }
        ]
    },
    {
        moduleTitle: "08. Algoritmi sortiranja",
        lessons: [
            { 
                id: "h1", 
                title: "Bubble sort - Zadatak 1", 
                vdoId: "47e78cded118429fbca27fbaff4eda71" 
            },
            { 
                id: "h2", 
                title: "Bubble sort - Zadatak 2", 
                vdoId: "1457c55463d744bc82a55fdcc385efb2" 
            },
            { 
                id: "h3", 
                title: "Selection sort - Zadatak 1", 
                vdoId: "13a2070bfaca49bd9a9a20edd055a2f6" 
            },
            { 
                id: "h4", 
                title: "Selection sort - Zadatak 2", 
                vdoId: "0a488b022e9c4b74897f2d06c700c920" 
            },
            { 
                id: "h5", 
                title: "Insertion sort - Zadatak 1", 
                vdoId: "79c4911aaf96456b8af51014c2de65c2" 
            },
            { 
                id: "h6", 
                title: "Insertion sort - Zadatak 2", 
                vdoId: "34a75c87166c4b96976bae60fe65eeaa" 
            },
            { 
                id: "h7", 
                title: "Merge sort - Zadatak 1", 
                vdoId: "d5eafe17b24b4c9599b0947fe4a2aea3" 
            },
            { 
                id: "h8", 
                title: "Merge sort - Zadatak 2", 
                vdoId: "4acb798ef26142709a7e3e14b9a4cee1" 
            },
            { 
                id: "h9", 
                title: "Radix sort - Zadatak 1", 
                vdoId: "118e8708ff024cacb72472325b177c9c" 
            },
            { 
                id: "h10", 
                title: "Radix sort - Zadatak 2", 
                vdoId: "31f0f1697a504a56b3892a626cb50e72" 
            }
        ]
    }
];

startPlayer({
    mode: "paid",
    courseId: "oikt-klk1",
    title: "OIKT — 1. kolokvijum",
    coursePage: "/oikt/",
    modules: courseData
});
