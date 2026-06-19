const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

const Transaction = require('./models/Transaction');
const Product = require('./models/Product');
const User = require('./models/User');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await Transaction.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // 1. Seed Transactions
    const sampleTransactions = [
      { name: 'Baju Kaos Polos - Terjual', category: 'Penjualan Produk', amount: 150000, isIncome: true, status: 'Success', date: '15 Jun 2026', platform: 'Shopee', notes: 'Pembeli dari Jakarta' },
      { name: 'Celana Jeans Slim Fit - Terjual', category: 'Penjualan Produk', amount: 280000, isIncome: true, status: 'Success', date: '14 Jun 2026', platform: 'Tokopedia', notes: '' },
      { name: 'Hoodie Premium - Terjual', category: 'Penjualan Produk', amount: 350000, isIncome: true, status: 'Success', date: '13 Jun 2026', platform: 'Offline', notes: 'Pembeli datang langsung ke toko' },
      { name: 'Jaket Bomber - Terjual', category: 'Penjualan Produk', amount: 420000, isIncome: true, status: 'Pending', date: '12 Jun 2026', platform: 'Shopee', notes: 'Menunggu pembayaran' },
      { name: 'Jasa Fotografer Produk', category: 'Jasa Fotografer', amount: 500000, isIncome: false, status: 'Success', date: '11 Jun 2026', platform: 'Lainnya', notes: 'Foto 20 produk baru' },
      { name: 'Facebook & Instagram Ads', category: 'Jasa Iklan', amount: 750000, isIncome: false, status: 'Success', date: '10 Jun 2026', platform: 'Lainnya', notes: 'Campaign Juni minggu 2' },
      { name: 'Restok Bahan Kain', category: 'Stok Barang', amount: 2000000, isIncome: false, status: 'Success', date: '09 Jun 2026', platform: 'Lainnya', notes: 'Supplier Bandung' },
      { name: 'Gaji Karyawan (Jun)', category: 'Gaji', amount: 3500000, isIncome: false, status: 'Pending', date: '08 Jun 2026', platform: 'Lainnya', notes: '2 karyawan' },
      { name: 'Kemeja Flannel - Terjual x3', category: 'Penjualan Produk', amount: 525000, isIncome: true, status: 'Success', date: '07 Jun 2026', platform: 'Tokopedia', notes: '3 pcs' },
      { name: 'Biaya Packing & Ongkir', category: 'Operasional', amount: 120000, isIncome: false, status: 'Success', date: '06 Jun 2026', platform: 'Lainnya', notes: 'Bubble wrap + kardus' },
    ];
    await Transaction.insertMany(sampleTransactions);
    console.log('Transactions seeded!');

    // 2. Seed Products
    const sampleProducts = [
      { title: 'Baju Kaos Polos', price: 150000, description: 'Kaos polos bahan cotton combed 30s, nyaman dipakai sehari-hari. Tersedia berbagai warna.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', platform: 'Shopee', stock: 50, rating: { rate: 4.5, count: 120 } },
      { title: 'Celana Jeans Slim Fit', price: 280000, description: 'Celana jeans slim fit bahan denim premium. Cutting modern dan nyaman.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', platform: 'Tokopedia', stock: 30, rating: { rate: 4.2, count: 85 } },
      { title: 'Hoodie Premium', price: 350000, description: 'Hoodie premium bahan fleece tebal. Cocok untuk musim hujan.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', platform: 'Semua', stock: 25, rating: { rate: 4.7, count: 200 } },
      { title: 'Jaket Bomber', price: 420000, description: 'Jaket bomber waterproof dengan bahan parasut premium.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', platform: 'Shopee', stock: 15, rating: { rate: 4.3, count: 65 } },
      { title: 'Kemeja Flannel', price: 175000, description: 'Kemeja flannel kotak-kotak bahan katun. Cocok untuk hangout atau kerja casual.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', platform: 'Tokopedia', stock: 40, rating: { rate: 4.1, count: 95 } },
      { title: 'Tas Selempang Pria', price: 189000, description: 'Tas selempang waterproof, cocok untuk daily use. Banyak slot penyimpanan.', category: 'Aksesoris', image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', platform: 'Shopee', stock: 20, rating: { rate: 4.6, count: 150 } },
      { title: 'Topi Baseball', price: 85000, description: 'Topi baseball bahan twill cotton. Adjustable strap.', category: 'Aksesoris', image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', platform: 'Semua', stock: 60, rating: { rate: 4.0, count: 45 } },
      { title: 'Sepatu Sneakers', price: 450000, description: 'Sepatu sneakers casual bahan canvas premium. Sol rubber anti slip.', category: 'Sepatu', image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', platform: 'Tokopedia', stock: 18, rating: { rate: 4.8, count: 220 } },
      { title: 'Dompet Kulit Pria', price: 195000, description: 'Dompet kulit asli dengan banyak slot kartu. Desain minimalis.', category: 'Aksesoris', image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', platform: 'Offline', stock: 35, rating: { rate: 4.4, count: 78 } },
      { title: 'Kaos Oversize Graphic', price: 165000, description: 'Kaos oversize dengan print graphic streetwear. Bahan cotton combed 24s.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', platform: 'Shopee', stock: 45, rating: { rate: 4.3, count: 110 } },
      { title: 'Celana Chino', price: 250000, description: 'Celana chino slim fit bahan katun stretch. Nyaman untuk formal & casual.', category: 'Pakaian Pria', image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', platform: 'Semua', stock: 22, rating: { rate: 4.1, count: 55 } },
      { title: 'Jam Tangan Digital', price: 320000, description: 'Jam tangan digital waterproof dengan fitur stopwatch dan alarm.', category: 'Aksesoris', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', platform: 'Tokopedia', stock: 12, rating: { rate: 4.5, count: 90 } },
    ];
    await Product.insertMany(sampleProducts);
    console.log('Products seeded!');

    // 3. Seed Users
    const sampleUsers = [
      { name: 'Ahmad Rizky', username: 'ahmad.rizky', email: 'ahmad@tokoku.com', phone: '081234567890', website: 'tokoku.com', address: { street: 'Jl. Merdeka No. 10', city: 'Jakarta' }, company: { name: 'Toko Kita' } },
      { name: 'Siti Nurhaliza', username: 'siti.nur', email: 'siti@tokoku.com', phone: '082345678901', website: '', address: { street: 'Jl. Sudirman No. 5', city: 'Bandung' }, company: { name: 'Toko Kita' } },
      { name: 'Budi Santoso', username: 'budi.s', email: 'budi@tokoku.com', phone: '083456789012', website: '', address: { street: 'Jl. Gatot Subroto No. 15', city: 'Surabaya' }, company: { name: 'Toko Kita' } },
      { name: 'Dewi Lestari', username: 'dewi.les', email: 'dewi@tokoku.com', phone: '084567890123', website: '', address: { street: 'Jl. Asia Afrika No. 20', city: 'Bandung' }, company: { name: 'Toko Kita' } },
      { name: 'Eko Prasetyo', username: 'eko.p', email: 'eko@tokoku.com', phone: '085678901234', website: '', address: { street: 'Jl. Thamrin No. 8', city: 'Jakarta' }, company: { name: 'Toko Kita' } },
    ];
    await User.insertMany(sampleUsers);
    console.log('Users seeded!');

    console.log('Database Seeding Completed Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
