const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')

// GET /api/transactions — ambil semua transaksi
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST /api/transactions — tambah transaksi baru
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body)
    const saved = await transaction.save()
    res.status(201).json(saved)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /api/transactions/:id — hapus transaksi
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id)
    res.json({ message: 'Transaksi dihapus' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
