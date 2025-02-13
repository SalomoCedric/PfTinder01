// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEjyN4VabIOl6eOy3o4iQndzDiKve-B8A",
  authDomain: "pfortetinder.firebaseapp.com",
  projectId: "pfortetinder",
  storageBucket: "pfortetinder.firebasestorage.app",
  messagingSenderId: "595874292907",
  appId: "1:595874292907:web:d0e6e24047960c7726c3ee",
  measurementId: "G-YTDLD3T4P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
