const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');


router.use('/api-docs', (req, res, next) => {
  try {
    swaggerUi.serve(req, res, next);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load Swagger UI' });
  }
});

router.get('/api-docs', (req, res) => {
  try {
    swaggerUi.setup(swaggerDocument)(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load Swagger documentation' });
  }
});

module.exports = router;
