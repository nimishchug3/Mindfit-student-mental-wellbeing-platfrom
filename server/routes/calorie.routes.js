const express = require('express');
const router = express.Router();
const {addCalorieEntry,
    getTotalCalorieAmount}=require('../controller/calorieController');

const { authMiddleware } = require('../middleware/userMiddleware');   

router.post('/add',authMiddleware ,addCalorieEntry);
router.get('/total',authMiddleware,getTotalCalorieAmount);

module.exports = router;