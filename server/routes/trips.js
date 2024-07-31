const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Get trips for a certain user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const trips = await Trip.find({ users: userId });
    res.json(trips);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add a new trip
router.post('/', async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const trip = await newTrip.save();
    res.json(trip);
  } catch (error) {
    console.error(error); 
    res.status(500).send('Server Error');
  }
});

// Update a trip
router.put('/:id', async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Delete a trip
router.delete('/:id', async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
