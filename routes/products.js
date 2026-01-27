const router = require('express').Router();
const productController = require('../controller/products');

router.get('/', async (req, res) => {
  try {
    await productController.getAll(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await productController.getSingle(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    await productController.createProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    await productController.updateProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;
