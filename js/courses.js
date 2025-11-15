// Firebase konfiguracija
const firebaseConfig = {
    apiKey: "AIzaSyCacNqpdT5RARz4gvtmwewULR2Xv-tqv6c",
    authDomain: "pomoc-na-fonu.firebaseapp.com",
    projectId: "pomoc-na-fonu",
    storageBucket: "pomoc-na-fonu.firebasestorage.app",
    messagingSenderId: "947001381183",
    appId: "1:947001381183:web:11a68f03a52c6ebb2a038a"
};

// Inicijalizacija Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const coursesList = document.getElementById("courses-list");
const logoutBtn = document.getElementById("logout-btn");

// Odjava korisnika
logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => window.location.href="/login");
});

// Provera prijavljenog korisnika i prikaz kupljenih kurseva
auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "/login";
        return;
    }

    // Pretpostavljamo da kupljene kurseve čuvamo u kolekciji "purchases"
    // Dokumenti imaju polja: userId, videoId, title
    db.collection("purchases")
      .where("userId", "==", user.uid)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
            coursesList.innerHTML = "<li>Nema kupljenih kurseva.</li>";
            return;
        }

        snapshot.forEach(doc => {
            const course = doc.data();
            const li = document.createElement("li");
            li.innerHTML = `<a href="course.html?id=${course.videoId}">${course.title}</a>`;
            coursesList.appendChild(li);
        });
      })
      .catch(err => {
          console.error("Greška pri učitavanju kurseva:", err);
          coursesList.innerHTML = "<li>Greška pri učitavanju kurseva.</li>";
      });
});
