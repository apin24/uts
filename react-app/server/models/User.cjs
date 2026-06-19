const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  website: { type: String },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String
  },
  company: {
    name: String,
    catchPhrase: String,
    bs: String
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
