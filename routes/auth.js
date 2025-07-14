const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// GET auth/login
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// Authenticate using Passport Local Strategy
router.post('/login', passport.authenticate('local', {
  successRedirect: '/assignments', // Redirect to assignments on success
  failureRedirect: '/auth/login', // Redirect to login on failure
  failureFlash: true
}));

// Render the registration form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle user registration form submission
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    req.flash('error', 'Username already exists');
    return res.redirect('/auth/register');
  }

  // Hash the password and save the new user
  const hashed = await bcrypt.hash(password, 10); // 10 is the salt rounds
  const user = new User({ username, password: hashed });
  await user.save();
  res.redirect('/auth/login');
});

// Initiates GitHub OAuth login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Handles GitHub OAuth callback after login
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/login'
}), (req, res) => {
  res.redirect('/assignments');
});

// Logs the user out and redirects to homepage
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
