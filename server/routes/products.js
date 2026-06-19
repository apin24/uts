const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new product
router.post('/', [auth, upload.single('imageFile')], async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    if (typeof productData.variants === 'string') {
      productData.variants = JSON.parse(productData.variants);
    }
    const product = new Product(productData);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put('/:id', [auth, upload.single('imageFile')], async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }
    if (typeof productData.variants === 'string') {
      productData.variants = JSON.parse(productData.variants);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
