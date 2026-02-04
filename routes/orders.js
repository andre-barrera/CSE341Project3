const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authenticate');
const controller = require('../controller/orders');

// Public
router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);

// Protected
router.post('/', isAuthenticated, controller.createOrder);
/*
  #swagger.tags = ['Orders']
  #swagger.description = 'Create a new order (Login required)'
  #swagger.security = [{ "githubAuth": [] }]
*/
router.put('/:id', isAuthenticated, controller.updateOrder);
/*
  #swagger.tags = ['Orders']
  #swagger.description = 'Update an order (Login required)'
  #swagger.security = [{ "githubAuth": [] }]
*/
router.delete('/:id', isAuthenticated, controller.deleteOrder);
/*
  #swagger.tags = ['Orders']
  #swagger.description = 'Delete an order (Login required)'
  #swagger.security = [{ "githubAuth": [] }]
*/

module.exports = router;
