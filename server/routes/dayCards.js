const express = require('express');
const router = express.Router();
const DayCard = require('../models/dayCard');


// Get all day cards for a specific trip
router.get('/trip/:tripId', async (req, res) => {
    try {
        const dayCards = await DayCard.find({ tripId: req.params.tripId });
        res.json(dayCards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

  
// Get all day cards
router.get('/', async (req, res) => {
    try {
        const dayCards = await DayCard.find();
        res.json(dayCards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Add a new day card for a trip with tripID
router.post('/:tripId', async (req, res) => {
    try {
        const { tripId } = req.params;
        const newDayCard = new DayCard({
            ...req.body,
            tripId // Ensure the tripId from the route is used
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
router.put('/:tripid', async (req, res) => {
    try {
        const updatedDayCard = await DayCard.findByIdAndUpdate(req.params.tripid, req.body, { new: true });
        res.json(updatedDayCard);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Delete a day card
router.delete('/:id', async (req, res) => {
    try {
        await DayCard.findByIdAndDelete(req.params.id);
        res.json({ message: 'Day card deleted' });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
