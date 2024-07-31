const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dayCardSchema = new Schema({
    id: Number,
    title: String,
    details: String,
    country: String,
    city: [String],
    locations: [String],
    notes: String,
});

const DayCard = mongoose.model('DayCard', dayCardSchema);

module.exports = DayCard;
