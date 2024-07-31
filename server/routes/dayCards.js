const express = require('express');
const router = express.Router();
const DayCard = require('../models/dayCard');

// Get all day cards
router.get('/', async (req, res) => {
    try {
        const dayCards = await DayCard.find();
        res.json(dayCards);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Add a new day card
router.post('/', async (req, res) => {
    try {
        const newDayCard = new DayCard(req.body);
        const dayCard = await newDayCard.save();
        res.json(dayCard);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send(error);
    }
});

// Update a day card
router.put('/:id', async (req, res) => {
    try {
        const updatedDayCard = await DayCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
