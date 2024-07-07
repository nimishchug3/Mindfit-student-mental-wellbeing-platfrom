const express = require("express");
const { getMessages, sendMessage } = require("../controller/messageController.js");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/:id", authMiddleware, getMessages);
router.post("/send/:id", authMiddleware, sendMessage);

module.exports = router;
