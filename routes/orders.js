const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const controller = require('../controller/orders');

// Public
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// Protected
router.post('/', isAuthenticated, controller.createOrder);
router.put('/:id', isAuthenticated, controller.updateOrder);
router.delete('/:id', isAuthenticated, controller.deleteOrder);

module.exports = router;
