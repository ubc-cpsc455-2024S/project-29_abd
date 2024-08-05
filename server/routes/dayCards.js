// const express = require('express');
// const router = express.Router();
// const DayCard = require('../models/dayCard');
//
//
// // Get all day cards for a specific trip
// router.get('/trip/:tripId', async (req, res) => {
//     try {
//         const dayCards = await DayCard.find({ tripId: req.params.tripId });
//         res.json(dayCards);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// // Get all day cards
// router.get('/', async (req, res) => {
//     try {
//         const dayCards = await DayCard.find();
//         res.json(dayCards);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// // Add a new day card
// router.post('/', async (req, res) => {
//     try {
//         const newDayCard = new DayCard(req.body);
//         const dayCard = await newDayCard.save();
//         res.json(dayCard);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).send(error);
//     }
// });
//
// // Update a day card
// router.put('/:id', async (req, res) => {
//     try {
//         const updatedDayCard = await DayCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedDayCard);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// // Delete a day card
// router.delete('/:id', async (req, res) => {
//     try {
//         await DayCard.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Day card deleted' });
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const DayCard = require('../models/dayCard');
// const authMiddleware = require('../middleware/auth');
//
// // Get all day cards for a specific trip of the authenticated user
// router.get('/trip/:tripId', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const dayCards = await DayCard.find({ tripId: req.params.tripId, userId });
//         res.json(dayCards);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// // Add a new day card
// router.post('/', authMiddleware, async (req, res) => {
//     try {
//         const newDayCard = new DayCard({ ...req.body, userId: req.user.id });
//         const dayCard = await newDayCard.save();
//         res.json(dayCard);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });
//
// // Update a day card
// router.put('/:id', authMiddleware, async (req, res) => {
//     try {
//         const updatedDayCard = await DayCard.findOneAndUpdate(
//             { _id: req.params.id, userId: req.user.id },
//             req.body,
//             { new: true }
//         );
//         if (!updatedDayCard) {
//             return res.status(404).json({ msg: 'Day card not found' });
//         }
//         res.json(updatedDayCard);
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// // Delete a day card
// router.delete('/:id', authMiddleware, async (req, res) => {
//     try {
//         const dayCard = await DayCard.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//         if (!dayCard) {
//             return res.status(404).json({ msg: 'Day card not found' });
//         }
//         res.json({ message: 'Day card deleted' });
//     } catch (error) {
//         res.status(500).send('Server Error');
//     }
// });
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const DayCard = require('../models/DayCard');
const authMiddleware = require('../middleware/auth');

// Get all day cards for a specific trip of the authenticated user
router.get('/trip/:tripId', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const dayCards = await DayCard.find({ tripId: req.params.tripId, userId });
        res.json(dayCards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Add a new day card
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newDayCard = new DayCard({ ...req.body, userId: req.user.id });
        const dayCard = await newDayCard.save();
        res.json(dayCard);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update a day card
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedDayCard = await DayCard.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        if (!updatedDayCard) {
            return res.status(404).json({ msg: 'Day card not found' });
        }
        res.json(updatedDayCard);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Delete a day card
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const dayCard = await DayCard.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!dayCard) {
            return res.status(404).json({ msg: 'Day card not found' });
        }
        res.json({ message: 'Day card deleted' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;


