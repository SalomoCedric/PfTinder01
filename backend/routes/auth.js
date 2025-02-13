const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Registrierung
router.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();
        res.status(201).send('Benutzer registriert');
    } catch (err) {
        res.status(500).send('Fehler bei der Registrierung');
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('Benutzer nicht gefunden');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Falsches Passwort');

        const token = jwt.sign({ userId: user._id }, 'deinSecretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Fehler beim Login');
    }
});

module.exports = router;
