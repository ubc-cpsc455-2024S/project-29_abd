const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Trip = require('./models/trip');
const DayCard = require('./models/dayCard');

dotenv.config();

const mongoUri = process.env.MONGODB_URI;


// MongoDB connection string
const dbURI = mongoUri;

mongoose.connect(dbURI, {
});

(async () => {
    try {
        console.log('MongoDB connected...');
        
        const trip = new Trip({
            name: 'Vancouver Trip',
            description: 'This is a sample trip to Vancouver',
            startDate: new Date(),
            endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            users: ['user1', 'user2'],
            public: true
        });

        const savedTrip = await trip.save();
        console.log('Trip created:', savedTrip);

        const dayCards = [
            {
                title: 'Day 1',
                details: 'Details for day 1',
                country: 'Canada',
                city: ['Vancouver'],
                locations: ['Stanley Park', 'UBC MOA'],
                notes: 'Notes for day 1',
                tripId: savedTrip._id,
                date: new Date(),
            },
            {
                title: 'Day 2',
                details: 'Details for day 2',
                country: 'Canada',
                city: ['Maple Ridge', 'Coquitlam'],
                locations: ['Golden Ears Park', 'Buntzen Lake'],
                notes: 'Notes for day 2',
                tripId: savedTrip._id,
                date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            },
            {
                title: 'Day 3',
                details: 'Details for day 3',
                country: 'Canada',
                city: ['Whistler', 'Squamish'],
                locations: ['Whistler Village', 'Stawamus Chief Trail'],
                notes: 'Notes for day 3',
                tripId: savedTrip._id,
                date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            }
        ];

        const insertedDayCards = await DayCard.insertMany(dayCards);
        console.log('Day cards inserted:', insertedDayCards);
    } catch (error) {
        console.error(error);
    } finally {
        mongoose.connection.close();
    }
})();