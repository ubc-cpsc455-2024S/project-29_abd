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
        console.error('Error fetching day cards:', error);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Add a new day card
router.post('/', authMiddleware, async (req, res) => {
    try {
        console.log('Request body:', req.body);
        const newDayCard = new DayCard({ ...req.body, userId: req.user.id });
        const dayCard = await newDayCard.save();
        res.status(201).json(dayCard);
    } catch (error) {
        console.error('Error saving day card:', error);
        res.status(500).json({ msg: 'Server Error' });
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
        console.error("Error updating day card:", error);
        res.status(500).json({ msg: 'Server Error' });
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
        console.error("Error deleting day card:", error);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;


