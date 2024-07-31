const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    users: {
        type: [String], // Array of user IDs
        required: true
    },
    public: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Trip', tripSchema);
