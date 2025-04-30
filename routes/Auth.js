// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
router.post('/register', async (req, res) => {
try {
        console.log(req.body)
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({username : username, password : hashedPassword})
    res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
    res.status(500).json({ error: error });
    console.log(error)
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed, no user' });
            }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
            }
        const token = jwt.sign({ userId: user._id.toString() }, 'alo', {
        expiresIn: '1h',
        });
        console.log(token)
        res.status(200).json({ token });
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error });
    }
});

module.exports = router;