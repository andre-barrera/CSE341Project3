const express = require('express');
const router = express.Router();
const ordersController = require('../controller/orders');
const authenticate = require('../middleware/authenticate');

router.get('/', async (req, res) => {
  try {
    await ordersController.getAll(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    await ordersController.getSingle(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});


router.post('/', authenticate, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    await ordersController.createOrder(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});


router.put('/:id', authenticate, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    await ordersController.updateOrder(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});


router.delete('/:id', authenticate, async (req, res) => {
  try {
    await ordersController.deleteOrder(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
