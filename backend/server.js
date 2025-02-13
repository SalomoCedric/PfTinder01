const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Datenbankverbindung
mongoose.connect('mongodb://localhost:27017/socialmatching', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Datenbank verbunden'))
.catch((err) => console.log('Fehler bei der Verbindung zur Datenbank:', err));

// Routen
app.use('/api/auth', authRoutes);

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
