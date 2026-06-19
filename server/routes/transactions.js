const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new transaction
router.post('/', auth, async (req, res) => {
  const transaction = new Transaction(req.body);
  try {
    const newTransaction = await transaction.save();
    
    // Kurangi stok jika ini pemasukan produk
    if (newTransaction.isIncome && newTransaction.productId && newTransaction.variantSize) {
      const product = await Product.findById(newTransaction.productId);
      if (product) {
        const variantIndex = product.variants.findIndex(v => v.size === newTransaction.variantSize);
        if (variantIndex !== -1 && product.variants[variantIndex].stock > 0) {
          product.variants[variantIndex].stock -= 1;
          
          // Recalculate total stock
          product.stock = product.variants.reduce((sum, v) => sum + v.stock, 0);
          await product.save();
        }
      }
    }
    
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
