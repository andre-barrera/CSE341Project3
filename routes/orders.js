const express = require('express');
const router = express.Router();
const ordersController = require('../controller/orders');


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


router.post('/', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    await ordersController.createOrder(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    await ordersController.updateOrder(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await ordersController.deleteOrder(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;
