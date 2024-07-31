const express = require('express');
const router = express.Router();

// Sample data
let dayCards = [
    {
        id: 1,
        title: "Day 1",
        details: "Spain - Go to the Tomatina Festival.",
        country: "Spain",
        city: ["Buñol"],
        locations: ["Tomatina Festival Site"],
        notes: "Be prepared for a lot of tomatoes!",
    },
    {
        id: 2,
        title: "Day 2",
        details: "Paris - Find Love.",
        country: "France",
        city: ["Paris"],
        locations: ["Eiffel Tower", "Louvre Museum"],
        notes: "Visit the Louvre early to avoid crowds.",
    },
    {
        id: 3,
        title: "Day 3",
        details: "London - Find the best tea and take a picture with the King's Guard.",
        country: "UK",
        city: ["London"],
        locations: ["Buckingham Palace", "Tea Houses"],
        notes: "The guards do not move!",
    },
];

// Get all day cards
router.get('/', (req, res) => {
    res.json(dayCards);
});

// Add a new day card
router.post('/', (req, res) => {
    const newDayCard = req.body;
    dayCards.push(newDayCard);
    res.json(newDayCard);
});

// Update a day card
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedDayCard = req.body;
    dayCards = dayCards.map(card => card.id === parseInt(id) ? updatedDayCard : card);
    res.json(updatedDayCard);
});

// Delete a day card
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    dayCards = dayCards.filter(card => card.id !== parseInt(id));
    res.json({ message: 'Day card deleted' });
});

module.exports = router;
