const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['Admin', 'Kasir', 'Staff Packing'], default: 'Kasir' },
  password: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
