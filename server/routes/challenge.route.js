const express = require("express");
const {getChallenge,applyforChallenge} = require("../controller/challengeController");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/get", authMiddleware, getChallenge);

router.post("/apply/:ChallangeId", authMiddleware, applyforChallenge);

 
module.exports = router;