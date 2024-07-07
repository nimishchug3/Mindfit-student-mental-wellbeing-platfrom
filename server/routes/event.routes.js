const express = require("express");
const {getevent,applyforevent, getAppliedEvent} = require("../controller/eventController");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/get", authMiddleware, getevent);

router.get("/apply/:eventId", authMiddleware, applyforevent);

router.get('/appliedEvent', authMiddleware, getAppliedEvent)


module.exports = router;