const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const userController = require('./userController');
const postController = require('./postController');
const commentController = require('./commentController');

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.logged_in) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Homepage route
router.get('/', ensureAuthenticated, async (req, res) => {
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

// Signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

// Post routes
router.use('/posts', postController);

// Comment routes
router.use('/comments', commentController);

module.exports = router;
