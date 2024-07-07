const mongoose = require('mongoose');

const CalorieTrackerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who logged the caffeine intake
        required: true
    },
    productType: {
        type: String,
        enum: ['milk', 'eggs','bread','chapati','rice','curry'], // Define the allowed product types
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    calorieAmount: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const CalorieTracker = mongoose.model('CalorieTracker', CalorieTrackerSchema);

module.exports = CalorieTracker;
