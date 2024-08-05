// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/trip');
// const authMiddleware = require('../middleware/auth');
//
//
// // Get all trips
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const userID = req.user.id;
//     const trips = await Trip.find({userId});
//     res.json(trips);
//   } catch (error) {
//     res.status(500).send('Server Error');
//   }
// });
//
// // Get trips for a certain user
// // router.get('/user/:userId', async (req, res) => {
// //   try {
// //     const userId = req.params.userId;
// //     const trips = await Trip.find({ users: userId });
// //     res.json(trips);
// //   } catch (error) {
// //     res.status(500).send('Server Error');
// //   }
// // });
//
// // Add a new trip
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     // const newTrip = new Trip(req.body);
//     const newTrip = new Trip({ ...req.body, userId: req.user.id });
//     const trip = await newTrip.save();
//     res.json(trip);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
//
// // Update a trip
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.json(updatedTrip);
// //   } catch (error) {
// //     res.status(500).send('Server Error');
// //   }
// // });
// router.put('/:id', authMiddleware, async (req, res) => {
//   try {
//     const trip = await Trip.findOneAndUpdate(
//         { _id: req.params.id, userId: req.user.id },
//         req.body,
//         { new: true }
//     );
//     if (!trip) {
//       return res.status(404).json({ msg: 'Trip not found' });
//     }
//     res.json(trip);
//   } catch (error) {
//     res.status(500).send('Server Error');
//   }
// });
//
//
// // Delete a trip
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Trip.findByIdAndDelete(req.params.id);
// //     res.json({ message: 'Trip deleted' });
// //   } catch (error) {
// //     res.status(500).send('Server Error');
// //   }
// // });
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//     if (!trip) {
//       return res.status(404).json({ msg: 'Trip not found' });
//     }
//     await DayCard.deleteMany({ tripId: req.params.id });
//     res.json({ message: 'Trip and associated day cards deleted' });
//   } catch (error) {
//     res.status(500).send('Server Error');
//   }
// });
//
// module.exports = router;

//
// const express = require('express');
// const router = express.Router();
// const Trip = require('../models/Trip');
// const DayCard = require('../models/DayCard'); // Make sure to import the DayCard model
// const authMiddleware = require('../middleware/auth');
//
// // Get all trips for the authenticated user
// router.get('/', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const trips = await Trip.find({ userId });
//     res.json(trips);
//   } catch (error) {
//     res.status(500).send('Server Error');
//   }
// });
//
// // Add a new trip
// router.post('/', authMiddleware, async (req, res) => {
//   try {
//     const newTrip = new Trip({ ...req.body, userId: req.user.id });
//     const trip = await newTrip.save();
//     res.json(trip);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });
//
// // Update a trip
// router.put('/:id', authMiddleware, async (req, res) => {
//   try {
//     const trip = await Trip.findOneAndUpdate(
//         { _id: req.params.id, userId: req.user.id },
//         req.body,
//         { new: true }
//     );
//     if (!trip) {
//       return res.status(404).json({ msg: 'Trip not found' });
//     }
//     res.json(trip);
//   } catch (error) {
//     res.status(500).send('Server Error');
//   }
// });
//
// // Delete a trip and associated day cards
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
//     if (!trip) {
//       return res.status(404).json({ msg: 'Trip not found' });
//     }
//     await DayCard.deleteMany({ tripId: req.params.id, userId: req.user.id });
//     res.json({ message: 'Trip and associated day cards deleted' });
//   } catch (error) {
//     res.status(500).send('Server Error');
//   }
// });
//
// module.exports = router;

const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const authMiddleware = require('../middleware/auth');

// Get all trips for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }); // Filter trips by userId
    res.json(trips);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Add a new trip
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTrip = new Trip({ ...req.body, userId: req.user.id }); // Set userId when creating a trip
    const trip = await newTrip.save();
    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Update a trip
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedTrip = await Trip.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id }, // Ensure only trips of the user can be updated
        req.body,
        { new: true }
    );
    res.json(updatedTrip);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Delete a trip
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user.id }); // Ensure only trips of the user can be deleted
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;

