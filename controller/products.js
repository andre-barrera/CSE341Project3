const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

/* GET all */
const getAll = async (req, res) => {
  // #swagger.tags = ['Products']
  try {
    const result = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('products')
      .find()
      .toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET single */
const getSingle = async (req, res) => {
  // #swagger.tags = ['Products']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const productId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('products')
      .findOne({ _id: productId });

    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CREATE product */
const createProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  try {
    const { name, price, category, description, stock } = req.body;

    if (
      !name ||
      price === undefined ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: 'Missing required fields: name, price, category, stock'
      });
    }

    if (typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({
        message: 'Price and stock must be numbers'
      });
    }

    const product = {
      name,
      price,
      category,
      description: description || '',
      stock,
      createdAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('products')
      .insertOne(product);

    res.status(201).json({
      message: 'Product created successfully',
      id: response.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE product*/
const updateProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const { name, price, category, description, stock } = req.body;

    if (
      !name ||
      price === undefined ||
      !category ||
      stock === undefined
    ) {
      return res.status(400).json({
        message: 'Missing required fields: name, price, category, stock'
      });
    }

    if (typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({
        message: 'Price and stock must be numbers'
      });
    }

    const productId = new ObjectId(req.params.id);

    const product = {
      name,
      price,
      category,
      description: description || '',
      stock,
      updatedAt: new Date()
    };

    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('products')
      .replaceOne({ _id: productId }, product);

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* DELETE product */
const deleteProduct = async (req, res) => {
  // #swagger.tags = ['Products']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID format' });
    }

    const productId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db('cseproject03')
      .collection('products')
      .deleteOne({ _id: productId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};
