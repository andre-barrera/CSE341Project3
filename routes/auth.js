const router = require('express').Router();
const passport = require('../auth/passport');

// Start GitHub Login
router.get('/login', passport.authenticate('github'));

// GitHub Callback (this stays internal)
router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Check login status
router.get('/status', (req, res) => {
  if (req.user) {
    res.json({
      loggedIn: true,
      user: req.user.username
    });
  } else {
    res.json({
      loggedIn: false
    });
  }
});

module.exports = router;
