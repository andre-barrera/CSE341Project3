const router = require('express').Router();
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/profile', isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
