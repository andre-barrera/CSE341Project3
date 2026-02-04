const express = require('express');
const passport = require('passport');
const router = express.Router();

// =======================
// HOME
// =======================
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`You are logged in as ${req.user.username}`);
  } else {
    res.send('Hello! Welcome to my website!');
  }
});

// =======================
// AUTH ROUTES
// =======================
router.get('/login', passport.authenticate('github'));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// =======================
// API ROUTES
// =======================
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));

// =======================
// SWAGGER
// =======================
router.use('/', require('./swagger'));

// =======================
// 404 HANDLER (LAST)
// =======================
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;
