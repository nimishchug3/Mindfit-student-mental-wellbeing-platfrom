const CaffeineTracker = require('../models/CaffineEntry.model');


const getTotalCaffeineAmount = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is available in the request

        // Find all caffeine entries for the user
        const userCaffeineEntries = await CaffeineTracker.find({ userId });

        // Calculate the total caffeine amount
        let totalCaffeineAmount = 0;
        for (const entry of userCaffeineEntries) {
            totalCaffeineAmount += entry.caffeineAmount;
        }

        // Check if there are any entries for the user
        if (userCaffeineEntries.length === 0) {
            return res.status(404).json({ error: 'No caffeine entries found for the user' });
        }

        res.status(200).json({ totalCaffeineAmount });
    } catch (error) {
        console.error('Error fetching total caffeine amount:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addCaffeineEntry = async (req, res) => {
    try {
        const { productType, quantity } = req.body;
        const userId = req.userId; // Assuming userId is available in the request

        // Calculate caffeine amount based on the product type and quantity
        let caffeineAmount;
        switch (productType) {
            case 'Coffee':
                caffeineAmount = quantity * 95; // Assuming 95mg caffeine per cup of coffee
                break;
            case 'Cold Drink':
                caffeineAmount = quantity * 30; // Assuming 30mg caffeine per can of cold drink
                break;
            default:
                return res.status(400).json({ error: 'Invalid product type' });
        }

        const newEntry = await CaffeineTracker.create({
            userId,
            productType,
            quantity,
            caffeineAmount
        });

        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error adding caffeine entry:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to get all caffeine tracker entries for the logged-in user
const getCaffeineEntries = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is available in the request

        const entries = await CaffeineTracker.find({ userId });

        res.status(200).json(entries);
    } catch (error) {
        console.error('Error fetching caffeine entries:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to update a caffeine tracker entry for the logged-in user
const updateCaffeineEntry = async (req, res) => {
    try {
        const entryId = req.params.entryId;
        const { productType, quantity } = req.body;
        const userId = req.userId; // Assuming userId is available in the request

        // Calculate caffeine amount based on the product type and quantity
        let caffeineAmount;
        switch (productType) {
            case 'Coffee':
                caffeineAmount = quantity * 95; // Assuming 95mg caffeine per cup of coffee
                break;
            case 'Cold Drink':
                caffeineAmount = quantity * 30; // Assuming 30mg caffeine per can of cold drink
                break;
            default:
                return res.status(400).json({ error: 'Invalid product type' });
        }

        const updatedEntry = await CaffeineTracker.findOneAndUpdate(
            { _id: entryId, userId },
            { productType, quantity, caffeineAmount },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ error: 'Caffeine entry not found' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        console.error('Error updating caffeine entry:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to delete a caffeine tracker entry for the logged-in user
const deleteCaffeineEntry = async (req, res) => {
    try {
        const entryId = req.params.entryId;
        const userId = req.userId; // Assuming userId is available in the request

        const deletedEntry = await CaffeineTracker.findOneAndDelete({ _id: entryId, userId });

        if (!deletedEntry) {
            return res.status(404).json({ error: 'Caffeine entry not found' });
        }

        res.status(200).json({ message: 'Caffeine entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting caffeine entry:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getTotalCaffeineAmount,
    addCaffeineEntry,
    getCaffeineEntries,
    updateCaffeineEntry,
    deleteCaffeineEntry
};