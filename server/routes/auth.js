const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Register a new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    console.log('Register request received:', req.body);

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        user = new User({ email, password });
        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // res.status(201).json({ success: true, token, user: { id: user.id, email: user.email } });
        res.status(201).json({ success: true, message: 'Registration successful. Please log in.', token });
    } catch (err) {
        console.error('Register Server error:', err.message);
        res.status(500).send('Server Error');
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt for email:", email);

        let user = await User.findOne({ email });
        if (!user) {
            console.log('Invalid credentials: User not found for email:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials: Password does not match for email:', email);
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log("User authenticated successfully, generating token");

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true }).json({ success: true, user, token });
    } catch (err) {
        console.error('Login Server error:', err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;



