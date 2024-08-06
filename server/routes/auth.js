// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const router = express.Router();
//
// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'Invalid email or password' });
//         }
//
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ success: false, message: 'Invalid email or password' });
//         }
//         const payload = { user: { id: user.id } };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//
//         res.cookie('token', token, { httpOnly: true, secure: true });
//         res.json({ success: true, token, user: { id: user.id, email: user.email } });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });
//
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;
//
//     try {
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }
//
//         user = new User({ email, password });
//         await user.save();
//
//         const payload = { user: { id: user.id } };
//         const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
//
//         // storing the token in a cookie below
//         res.cookie('token', token, { httpOnly: true, secure: true });
//         res.status(201).json({ success: true, token, user: { id: user.id, email: user.email } });
//     } catch (err) {
//         console.error('Server error:', err.message);
//         res.status(500).send('Server Error');
//     }
// });
//
// module.exports = router;

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

        res.status(201).json({ success: true, token, user: { id: user.id, email: user.email } });
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



