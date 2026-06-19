const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Product = require('./models/Product');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // 1. Reset Users
    await User.deleteMany({});
    console.log('Cleared existing users');

    const newAdmin = new User({
      name: 'I Kadek Putra Nata',
      username: 'kadek.nata',
      email: 'dekyess@students.amikom.ac.id',
      phone: '081234567890',
      role: 'Admin',
      password: 'adminpassword', // Dalam produksi ini harus di-hash (bcrypt)
      address: {
        street: 'Jl. Ring Road Utara',
        city: 'Sleman, Yogyakarta'
      }
    });
    await newAdmin.save();
    console.log('User I Kadek Putra Nata seeded!');

    // 2. Fix Products to use Variants
    await Product.deleteMany({});
    console.log('Cleared existing products');

    const sampleProducts = [
      { 
        title: 'Waveneap - Tidebreaker 16s Katun Premium S-L', 
        price: 150000, 
        description: 'Kaos premium.', 
        category: 'Pakaian Pria', 
        image: '/uploads/IMG_2732.png', 
        platform: 'Semua', 
        variants: [
          { size: 'S', stock: 10 },
          { size: 'M', stock: 15 },
          { size: 'L', stock: 10 }
        ] 
      },
      { 
        title: 'Waveneap - Swell 16S Kaos Katun Premium S-XL', 
        price: 150000, 
        description: 'Kaos premium.', 
        category: 'Pakaian Pria', 
        image: '/uploads/IMG_2731.png', 
        platform: 'Semua', 
        variants: [
          { size: 'S', stock: 5 },
          { size: 'M', stock: 10 },
          { size: 'L', stock: 15 },
          { size: 'XL', stock: 5 }
        ] 
      },
    ];
    await Product.insertMany(sampleProducts);
    console.log('Products seeded with variants!');

    console.log('Database Update Completed Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error updating database:', err);
    process.exit(1);
  }
};

seedDB();
