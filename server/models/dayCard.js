const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayCardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    country: {
        type: [String],
        required: true
    },
    city: {
        type: [String],
        required: true
    },
    locations: {
        type: [Object],
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    tripId: {
        type: Schema.Types.ObjectId,
        ref: 'Trip',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('DayCard', dayCardSchema);
