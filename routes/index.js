const router = require('express').Router();

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

module.exports = router;
