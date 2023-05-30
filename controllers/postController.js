const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display the form for creating a new post
router.get('/new', (req, res) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    res.redirect('/users/login');
    return;
  }
  // Render the new post form
  res.render('new-post');
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });
    res.render('post', { post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Redirect to the new post's page
    res.redirect(`/posts/${newPost.id}`);
    
    // Or redirect to the homepage
    // res.redirect('/');
  } catch (err) {
    res.status(400).json(err);
  }
});


// Update a post
router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
