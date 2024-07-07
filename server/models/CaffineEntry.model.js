const mongoose = require('mongoose');

const CaffeineTrackerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who logged the caffeine intake
        required: true
    },
    productType: {
        type: String,
        enum: ['Coffee', 'Cold Drink'], // Define the allowed product types
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    caffeineAmount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const CaffeineTracker = mongoose.model('CaffeineTracker', CaffeineTrackerSchema);

module.exports = CaffeineTracker;
