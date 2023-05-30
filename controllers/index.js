const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const userController = require('./userController');
const postController = require('./postController');
// const commentController = require('./commentController');

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.logged_in) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch blog posts from the database
    const posts = await Post.findAll();
    // console.log(posts);

    // Render the homepage view and pass the posts data
    res.render('home', { posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Authentication routes
router.use('/users', userController);

// Dashboard route
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // Fetch the posts that belong to the current user
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    // Render the dashboard view and pass the posts data
    res.render('dashboard', { posts });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


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
// router.use('/comments', commentController);

module.exports = router;
