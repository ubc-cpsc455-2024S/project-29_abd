const express = require('express');
const router = express.Router();
// const DayCard = require('../models/DayCard');
const DayCard = require("../models/dayCard")
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

// Add a new day card for a trip with tripID
router.post('/:tripId', authMiddleware, async (req, res) => {
    try {
        const { tripId } = req.params;
        const { title, details, country, city, locations, notes, date } = req.body;
        
        if (!title || !details || !date) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newDayCard = new DayCard({
            title,
            details,
            country,
            city,
            locations,
            notes,
            date,
            tripId,
            userId: req.user.id // Ensure the userId from the authenticated user is used
        });

        // Save the new day card
        const dayCard = await newDayCard.save();
        res.status(201).json(dayCard);
    } catch (error) {
        console.error('Error saving new day card:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to save new day card' });
    }
});

// Update a day card
router.put('/:tripid', authMiddleware, async (req, res) => {
    try {
        const updatedDayCard = await DayCard.findByIdAndUpdate(req.params.tripid, req.body, { new: true });
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
