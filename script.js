const supabaseUrl = https://cdwdrafzommhfnjwrlrf.supabase.co;
const supabaseKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkd2RyYWZ6b21taGZuandybHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzQzOTQsImV4cCI6MjA1NTA1MDM5NH0.jJAxSN_g1SUpXjrRNfUn99A1q-ONBD7HIyo1Jwf-Gs0;
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert(error.message);
    } else {
        alert("Registrierung erfolgreich");
        window.location.href = 'profile.html';
    }
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert(error.message);
    } else {
        alert("Login erfolgreich");
        window.location.href = 'profile.html';
    }
}

async function saveProfile() {
    const user = supabase.auth.user();
    if (!user) {
        alert("Kein Benutzer angemeldet");
        return;
    }
    const name = document.getElementById('name').value;
    const fileInput = document.getElementById('profilePic');
    const file = fileInput.files[0];

    let imageUrl = "";
    if (file) {
        const { data, error } = await supabase.storage.from('profiles').upload(`avatars/${user.id}`, file);
        if (error) {
            console.error("Fehler beim Hochladen", error);
        } else {
            imageUrl = `${supabaseUrl}/storage/v1/object/public/profiles/${data.path}`;
        }
    }

    const { error } = await supabase.from('users').upsert({
        id: user.id,
        name: name,
        email: user.email,
        profile_pic: imageUrl
    });

    if (error) {
        console.error("Fehler: ", error);
    } else {
        alert("Profil gespeichert!");
    }
}
