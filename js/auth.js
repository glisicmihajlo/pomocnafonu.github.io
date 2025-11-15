// Firebase konfiguracija
const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.firebasestorage.app",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a"
};

// Inicijalizacija Firebase-a
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login forma
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        console.log("Prijavljen korisnik:", userCredential.user.email);
        window.location.href = "dashboard.html"; // idi na stranicu sa kupljenim kursevima
    } catch (err) {
        console.error(err);
        document.getElementById("error-msg").innerText = err.message;
    }
});
