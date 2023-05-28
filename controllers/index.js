const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController');

// Homepage route
router.get('/',  async (req, res) => {
    try {
        // Fetch blog posts from the database
        const posts = await Post.findAll();

        // Render the homepage view and pass the posts data
        res.render('home', { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Authentication routes
router.use('/users', userController);

// Post routes
router.use('/posts', postController);

// Comment routes
router.use('/comments', commentController);

module.exports = router;
