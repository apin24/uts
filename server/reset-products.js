const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // 2. Seed Products
    const sampleProducts = [
      { title: 'Waveneap - Tidebreaker 16s Katun Premium S-L', price: 150000, description: 'Kaos premium.', category: 'Pakaian Pria', image: '/uploads/IMG_2732.png', platform: 'Semua', stock: 50 },
      { title: 'Waveneap - Swell 16S Kaos Katun Premium S-XL', price: 150000, description: 'Kaos premium.', category: 'Pakaian Pria', image: '/uploads/IMG_2731.png', platform: 'Semua', stock: 50 },
    ];
    await Product.insertMany(sampleProducts);
    console.log('Products seeded!');

    console.log('Database Update Completed Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error updating database:', err);
    process.exit(1);
  }
};

seedDB();
