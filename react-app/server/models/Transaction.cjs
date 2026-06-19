const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Penjualan', 'Pengeluaran', 'Gaji'] },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  isIncome: { type: Boolean, default: false },
  status: { type: String, required: true, enum: ['Success', 'Pending', 'Failed'], default: 'Success' }
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)
