// post.controller.js
const Post=require("../models/Post.model");
const User=require("../models/User.Model");

const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.userId;
        const newPost = await Post.create({
            user: userId,
            content,
        });

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.posts.push(newPost._id);
        user.points = user.calculatePoints();
        await user.save(); // Save the updated user document
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getPosts = async (req, res) => {

    try {
        const userId = req.userId

        const posts = await Post.find()
            .populate('user', '-password')

        // to check if liked by user
        
        // Calculate the number of likes and replies for each post
        const postsWithCounts = posts.map(post => ({
            _id: post._id,
            user: post.user,
            content: post.content,
            likesCount: post.likes.length,
            repliesCount: post.replies.length,
            isLiked: post.likes.some(user => user.toString() === userId) 
        }));

        res.status(200).json(postsWithCounts);
    } catch (error) {
        console.error("Error fetching posts:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ error: 'You have already liked this post' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the user's ID to the likes array
        post.likes.push(userId);
        user.points = user.calculatePoints();
        await user.save();
        await post.save();

        res.status(200).json({ message: 'Post liked successfully' });
    } catch (error) {
        console.error('Error liking post:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        
        const post = await Post.findById(id)
            .populate('user', '-password')

        if (!post) {
            return res.status(404).json({ error: 'post not found' });
        }

        return res.status(200).json({post: post});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'internal server error' });
    }
}


module.exports = {createPost, getPosts,likePost, getPostById};
