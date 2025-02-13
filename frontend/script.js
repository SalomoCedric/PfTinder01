const API_URL = "https://social-matching-backend.onrender.com/api/auth"; // ÄNDERE DIES, falls nötig!

// Login
document.getElementById('login-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        alert("Login erfolgreich!");
    } else {
        alert("Fehler beim Login");
    }
});

// Registrierung
document.getElementById('register-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert("Registrierung erfolgreich!");
        window.location.href = "index.html";
    } else {
        alert("Fehler bei der Registrierung");
    }
});
