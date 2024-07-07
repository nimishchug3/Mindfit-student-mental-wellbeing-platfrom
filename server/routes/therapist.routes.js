const express = require("express");
const {getTherapists} = require("../controller/therapistController");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/get", authMiddleware, getTherapists);


module.exports = router;