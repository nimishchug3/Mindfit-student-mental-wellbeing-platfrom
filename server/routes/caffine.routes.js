const express = require('express');
const router = express.Router();
const {    getTotalCaffeineAmount,
    addCaffeineEntry,
    getCaffeineEntries,
    updateCaffeineEntry,
    deleteCaffeineEntry} = require('../controller/caffineController');
const { authMiddleware } = require('../middleware/userMiddleware');


router.post('/add',authMiddleware ,addCaffeineEntry);


router.get('/',authMiddleware,getCaffeineEntries);


router.put('/:entryId',authMiddleware,updateCaffeineEntry);

router.delete('/:entryId',authMiddleware ,deleteCaffeineEntry);


router.get('/total',authMiddleware,getTotalCaffeineAmount);

module.exports = router;
