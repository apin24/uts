const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  isIncome: { type: Boolean, required: true },
  status: { type: String, enum: ['Success', 'Pending', 'Failed'], default: 'Success' },
  date: { type: String, required: true },
  platform: { type: String, enum: ['Shopee', 'Tokopedia', 'Offline', 'Lainnya'], default: 'Lainnya' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  variantSize: { type: String, default: null },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
