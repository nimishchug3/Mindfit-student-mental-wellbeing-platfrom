const express = require("express");
const { getPosts,createPost,likePost, getPostById} = require("../controller/postController.js");
const { authMiddleware } = require("../middleware/userMiddleware");
const router = express.Router();

router.get("/getposts", authMiddleware, getPosts);
router.post("/create", authMiddleware, createPost);
router.post("/like/:postId", authMiddleware, likePost);
router.get('/getPostById/:id', authMiddleware, getPostById);


module.exports = router;
