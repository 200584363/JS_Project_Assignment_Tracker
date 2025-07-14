const express = require('express');
const router = express.Router();

// Render the 'home' view and pass the logged-in user info (if any)
router.get('/', (req, res) => {
  res.render('home', { user: req.user }); // req.user is set by Passport if logged in
});

module.exports = router;
