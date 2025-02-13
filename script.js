const firebaseConfig = {
  apiKey: "AIzaSyBX_GqLCg1yOD1aPjxHZ1bQgdTQ5B7trv8",
  authDomain: "pftinder-79946.firebaseapp.com",
  projectId: "pftinder-79946",
  storageBucket: "pftinder-79946.firebasestorage.app",
  messagingSenderId: "165850597415",
  appId: "1:165850597415:web:84e698173e2f983c4d6602"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("Registrierung erfolgreich");
            window.location.href = 'profile.html';
        })
        .catch(error => alert(error.message));
}

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            console.log("Login erfolgreich");
            window.location.href = 'profile.html';
        })
        .catch(error => alert(error.message));
}

function saveProfile() {
    const user = auth.currentUser;
    if (user) {
        const name = document.getElementById('name').value;
        db.collection('users').doc(user.uid).set({
            name: name,
            email: user.email
        }).then(() => {
            alert("Profil gespeichert!");
        }).catch(error => console.error("Fehler: ", error));
    } else {
        alert("Kein Benutzer angemeldet");
    }
}
