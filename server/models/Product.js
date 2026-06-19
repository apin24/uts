const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  image: { type: String },
  variants: [{
    size: { type: String, required: true },
    stock: { type: Number, default: 0 }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
