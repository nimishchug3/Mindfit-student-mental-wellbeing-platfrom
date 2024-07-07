const express = require("express");
const { createReply, getRepliesForPost} = require("../controller/replyController.js");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createReply);
router.get("/get/:postId", authMiddleware, getRepliesForPost);


module.exports = router;
