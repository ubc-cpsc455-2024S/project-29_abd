// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Import the User model
//
// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email, password });
//         if (user) {
//             res.json({ success: true, user });
//         } else {
//             res.json({ success: false, message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// });
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, user });
        } else {
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Registration route
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = new User({ email, password });
        await newUser.save();
        res.json({ success: true, user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

