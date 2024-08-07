const express = require("express");
const router = express.Router();
const Trip = require("../models/trip");
const authMiddleware = require("../middleware/auth");

// Get all trips for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userID = req.user.id;
    const trips = await Trip.find({ userId: req.user.id }); // Filter trips by userId
    res.json(trips);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Add a new trip
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newTrip = new Trip({ ...req.body, userId: req.user.id }); // Set userId when creating a trip
    const trip = await newTrip.save();
    res.json(trip);
  } catch (error) {
    console.error("Error adding new trip:", error);
    res.status(500).send("Server Error");
  }
});

// Update a trip
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure only trips of the user can be updated
      req.body,
      { new: true }
    );
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Delete a trip
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
