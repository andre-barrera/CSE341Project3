const passport = require('passport');

const router = require('express').Router();

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});



router.get('/', (req, res) => {
  res.status(200).send('Hello! Welcome to my website!');
});

router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/', require('./swagger'));

router.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  });
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});




module.exports = router;
