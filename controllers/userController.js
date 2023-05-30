const express = require('express');
const router = express.Router();
const { User } = require('../models');

// HTML route for signup
router.get('/signup', (req, res) => {
  res.render('signup');
});

// HTML route for login
router.get('/login', (req, res) => {
  res.render('login');
});

// API route for signup
router.post('/api/signup', async (req, res) => {
  try {
    const existingUser = await User.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      res.render('signup', { errorMessage: 'Username already taken' });
      return;
    }

    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/');  // redirect to the homepage after successful signup
    });
  } catch (err) {
    res.render('signup', { errorMessage: 'An error occurred during signup. Please try again.' });
  }
});



// API route for login
router.post('/api/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.render('login', { errorMessage: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.render('login', { errorMessage: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.redirect('/');
    });
  } catch (err) {
    res.render('login', { errorMessage: 'An error occurred during login. Please try again.' });
  }
});


// API route for logout
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
});


module.exports = router;
