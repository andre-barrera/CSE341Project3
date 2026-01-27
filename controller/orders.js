const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

/* Get all orders */
const getAll = async (req, res) => {
  // #swagger.tags = ['Orders']
  try {
    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('orders')
      .find()
      .toArray();

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Get single order */
const getSingle = async (req, res) => {
  // #swagger.tags = ['Orders']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const orderId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('orders')
      .findOne({ _id: orderId });

    if (!result) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Create order */
const createOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  try {
    const { customerName, productName, total, status } = req.body;

    // Validation
    if (!customerName || !productName || total === undefined || !status) {
      return res.status(400).json({
        message: 'customerName, productName, total, and status are required'
      });
    }

    if (typeof productName !== 'string') {
      return res.status(400).json({
        message: 'productName must be a string'
      });
    }

    if (typeof total !== 'number' || total < 0) {
      return res.status(400).json({
        message: 'total must be a positive number'
      });
    }

    const order = {
      customerName,
      productName,
      total,
      status,
      createdAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('orders')
      .insertOne(order);

    res.status(201).json({
      message: 'Order created successfully',
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Update order */
const updateOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const { customerName, productName, total, status } = req.body;

    // Validation
    if (!customerName || !productName || total === undefined || !status) {
      return res.status(400).json({
        message: 'customerName, productName, total, and status are required'
      });
    }

    if (typeof productName !== 'string') {
      return res.status(400).json({
        message: 'productName must be a string'
      });
    }

    if (typeof total !== 'number' || total < 0) {
      return res.status(400).json({
        message: 'total must be a positive number'
      });
    }

    const orderId = new ObjectId(req.params.id);

    const order = {
      customerName,
      productName,
      total,
      status,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('orders')
      .replaceOne({ _id: orderId }, order);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Delete order */
const deleteOrder = async (req, res) => {
  // #swagger.tags = ['Orders']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const orderId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('orders')
      .deleteOne({ _id: orderId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createOrder,
  updateOrder,
  deleteOrder
};
