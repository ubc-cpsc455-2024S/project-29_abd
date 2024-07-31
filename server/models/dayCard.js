const mongoose = require('mongoose');

const DayCardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    country: { type: String, required: true },
    city: [{ type: String, required: true }],
    locations: [{ type: String, required: true }],
    notes: { type: String },
});

module.exports = mongoose.model('dayCards', DayCardSchema);
