const CalorieTracker = require('../models/CalorieEntry.model');

const getTotalCalorieAmount = async (req, res) => {
    try {
        const userId = req.userId; 

        const userCalorieEntries = await CalorieTracker.find({ userId });

       
        let totalCalorieAmount = 0;
        for (const entry of userCalorieEntries) {
            totalCalorieAmount += entry.calorieAmount;
        }

        
        if (userCalorieEntries.length === 0) {
            return res.status(404).json({ error: 'No calorie entries found for the user' });
        }

        res.status(200).json({ totalCalorieAmount });
    } catch (error) {
        console.error('Error fetching total calorie amount:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addCalorieEntry = async (req, res) => {
    try {
        const { productType, quantity } = req.body;
        const userId = req.userId; // Assuming userId is available in the request

        // Define the calorie amounts for each product type
        const calorieMap = {
            "milk": 42,    // Assuming 42 calories per unit of milk
            "eggs": 78,    // Assuming 78 calories per unit of egg
            "bread": 79,   // Assuming 79 calories per unit of bread
            "chapati": 104,// Assuming 104 calories per unit of chapati
            "rice": 130,   // Assuming 130 calories per unit of rice
            "curry": 150   // Assuming 150 calories per unit of curry
        };

        // Calculate total calorie amount
        let calorieAmount = 0;
        if (productType && quantity) {
            if (calorieMap.hasOwnProperty(productType)) {
                totalCalories = quantity * calorieMap[productType];
            } else {
                return res.status(400).json({ error: `Invalid product type: ${productType}` });
            }
        } else {
            return res.status(400).json({ error: 'Product type and quantity are required' });
        }

        // Create a new calorie entry
        const newEntry = await CalorieTracker.create({
            userId,
            productType,
            quantity,
            calorieAmount: totalCalories // Corrected field name
        });

        res.status(201).json(newEntry);
    } catch (error) {
        console.error('Error adding calorie entry:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {addCalorieEntry,
    getTotalCalorieAmount};


