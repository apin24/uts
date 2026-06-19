const mongoose = require('mongoose')
require('dotenv').config()
const Product = require('./models/Product')
const User = require('./models/User')
const Transaction = require('./models/Transaction')

const MONGODB_URI = process.env.MONGODB_URI

// Data produk (dari Fake Store API structure)
const products = [
  { title: 'Fjallraven - Foldsack No. 1 Backpack', price: 109.95, description: 'Your perfect pack for everyday use and target. Not too big, not too small.', category: "men's clothing", image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', rating: { rate: 3.9, count: 120 } },
  { title: 'Mens Casual Premium Slim Fit T-Shirts', price: 22.3, description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket.', category: "men's clothing", image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg', rating: { rate: 4.1, count: 259 } },
  { title: 'Mens Cotton Jacket', price: 55.99, description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.', category: "men's clothing", image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg', rating: { rate: 4.7, count: 500 } },
  { title: 'Mens Casual Slim Fit', price: 15.99, description: 'The color could be slightly different between on the screen and in practice.', category: "men's clothing", image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg', rating: { rate: 2.1, count: 430 } },
  { title: "John Hardy Women's Chain Gold Bracelet", price: 695, description: 'From our Heritage Twisted Textured Chain Collection, a stunning bracelet.', category: 'jewelery', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg', rating: { rate: 4.6, count: 400 } },
  { title: 'Solid Gold Petite Micropave', price: 168, description: 'Satisfaction Guaranteed. Return or exchange any order within 30 days.', category: 'jewelery', image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg', rating: { rate: 3.9, count: 70 } },
  { title: 'White Gold Plated Princess', price: 9.99, description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.', category: 'jewelery', image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg', rating: { rate: 3, count: 400 } },
  { title: 'Pierced Owl Rose Gold Plated Stainless Steel Double', price: 10.99, description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings.', category: 'jewelery', image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg', rating: { rate: 1.9, count: 100 } },
  { title: 'WD 2TB Elements Portable External Hard Drive', price: 64, description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers.', category: 'electronics', image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg', rating: { rate: 3.3, count: 203 } },
  { title: 'SanDisk SSD PLUS 1TB Internal SSD', price: 109, description: 'Easy upgrade for faster boot up, shutdown, application load and response.', category: 'electronics', image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg', rating: { rate: 2.9, count: 470 } },
  { title: 'Silicon Power 256GB SSD', price: 109, description: '3D NAND flash are applied to deliver high transfer speeds.', category: 'electronics', image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg', rating: { rate: 4.8, count: 319 } },
  { title: 'WD 4TB Gaming Drive Works with Playstation 4', price: 114, description: 'Expand your PS4 gaming experience, Photo notes taken from product info at Walmart.', category: 'electronics', image: 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg', rating: { rate: 4.8, count: 400 } },
  { title: 'Acer SB220Q bi 21.5 inches Full HD IPS Monitor', price: 599, description: '21.5 inches full HD widescreen IPS display And target.', category: 'electronics', image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg', rating: { rate: 2.9, count: 250 } },
  { title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor", price: 999.99, description: '49 Inch Super Ultrawide 32:9 702p Display.', category: 'electronics', image: 'https://fakestoreapi.com/img/81Zt42iIapL._AC_SX679_.jpg', rating: { rate: 2.2, count: 140 } },
  { title: "BIYLACLESEN Women's Snowboard Jacket Winter Coat", price: 56.99, description: "Lightweight, windproof, and comfortable for outdoor activities.", category: "women's clothing", image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg', rating: { rate: 2.6, count: 235 } },
  { title: "Lock and Love Women's Removable Hooded Leather Jacket", price: 29.95, description: 'Premium faux leather material, hooded, versatile style.', category: "women's clothing", image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg', rating: { rate: 2.9, count: 340 } },
  { title: 'Rain Jacket Women Windbreaker Striped', price: 39.99, description: 'Lightweight, perfect for trips or parties.', category: "women's clothing", image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg', rating: { rate: 3.8, count: 679 } },
  { title: "MBJ Women's Solid Short Sleeve Boat Neck V Tee", price: 9.85, description: 'Made in USA - lightweight, soft and comfortable.', category: "women's clothing", image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg', rating: { rate: 4.7, count: 130 } },
  { title: "Opna Women's Short Sleeve Moisture Tee", price: 7.95, description: '100% Polyester, machine washable, moisture wicking.', category: "women's clothing", image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg', rating: { rate: 4.5, count: 146 } },
  { title: "DANVOUY Womens T Shirt Casual Cotton Short", price: 12.99, description: '95% Cotton, 5% Spandex, short sleeve casual style.', category: "women's clothing", image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg', rating: { rate: 3.6, count: 145 } },
]

// Data user (dari JSONPlaceholder structure)
const users = [
  { name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1-770-736-8031 x56442', website: 'hildegard.org', address: { street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874' }, company: { name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets' } },
  { name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', phone: '010-692-6593 x09125', website: 'anastasia.net', address: { street: 'Victor Plains', suite: 'Suite 879', city: 'Wisokyburgh', zipcode: '90566-7771' }, company: { name: 'Deckow-Crist', catchPhrase: 'Proactive didactic contingency', bs: 'synergize scalable supply-chains' } },
  { name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', phone: '1-463-123-4447', website: 'ramiro.info', address: { street: 'Douglas Extension', suite: 'Suite 847', city: 'McKenziehaven', zipcode: '59590-4157' }, company: { name: 'Romaguera-Jacobson', catchPhrase: 'Face to face bifurcated interface', bs: 'e-enable strategic applications' } },
  { name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org', phone: '493-170-9623 x156', website: 'kale.biz', address: { street: 'Hoeger Mall', suite: 'Apt. 692', city: 'South Elvis', zipcode: '53919-4257' }, company: { name: 'Robel-Corkery', catchPhrase: 'Multi-tiered zero tolerance productivity', bs: 'transition cutting-edge web services' } },
  { name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca', phone: '(254)954-1289', website: 'demarco.info', address: { street: 'Skiles Walks', suite: 'Suite 351', city: 'Roscoeview', zipcode: '33263' }, company: { name: 'Keebler LLC', catchPhrase: 'User-centric fault-tolerant solution', bs: 'revolutionize end-to-end systems' } },
  { name: 'Mrs. Dennis Schulist', username: 'Leopoldo_Corkery', email: 'Karley_Dach@jasper.info', phone: '1-477-935-8478 x6430', website: 'ola.org', address: { street: 'Norberto Crossing', suite: 'Apt. 950', city: 'South Christy', zipcode: '23505-1337' }, company: { name: 'Considine-Lockman', catchPhrase: 'Synchronised bottom-line interface', bs: 'e-enable innovative applications' } },
  { name: 'Kurtis Weissnat', username: 'Elwyn.Skiles', email: 'Telly.Hoeger@billy.biz', phone: '210.067.6132', website: 'elvis.io', address: { street: 'Rex Trail', suite: 'Suite 280', city: 'Howemouth', zipcode: '58804-1099' }, company: { name: 'Johns Group', catchPhrase: 'Configurable multimedia task-force', bs: 'generate enterprise e-tailers' } },
  { name: 'Nicholas Runolfsdottir V', username: 'Maxime_Nienow', email: 'Sherwood@rosamond.me', phone: '586.493.6943 x140', website: 'jacynthe.com', address: { street: 'Ellsworth Summit', suite: 'Suite 729', city: 'Aliyaview', zipcode: '45169' }, company: { name: 'Abernathy Group', catchPhrase: 'Implemented secondary concept', bs: 'e-enable extensible e-tailers' } },
  { name: 'Glenna Reichert', username: 'Delphine', email: 'Chaim_McDermott@dana.io', phone: '(775)976-6794 x41206', website: 'conrad.com', address: { street: 'Dayna Park', suite: 'Suite 449', city: 'Bartholomebury', zipcode: '76495-3109' }, company: { name: 'Yost and Sons', catchPhrase: 'Switchable contextually-based project', bs: 'aggregate real-time technologies' } },
  { name: 'Clementina DuBuque', username: 'Moriah.Stanton', email: 'Rey.Padberg@karina.com', phone: '024-648-3804', website: 'ambrose.net', address: { street: 'Kattie Turnpike', suite: 'Suite 198', city: 'Lebsackbury', zipcode: '31428-2261' }, company: { name: 'Hoeger LLC', catchPhrase: 'Centralized empowering task-force', bs: 'target end-to-end models' } },
]

// Data transaksi
const transactions = [
  { name: 'Invoice #INV-2026-001', category: 'Penjualan', amount: 2500000, date: '12 Oct 2026', isIncome: true, status: 'Success' },
  { name: 'Pembelian Stok Barang', category: 'Pengeluaran', amount: 1200000, date: '11 Oct 2026', isIncome: false, status: 'Success' },
  { name: 'Gaji Karyawan (Oct)', category: 'Gaji', amount: 3500000, date: '10 Oct 2026', isIncome: false, status: 'Pending' },
  { name: 'Invoice #INV-2026-002', category: 'Penjualan', amount: 1800000, date: '09 Oct 2026', isIncome: true, status: 'Success' },
  { name: 'Biaya Operasional', category: 'Pengeluaran', amount: 750000, date: '08 Oct 2026', isIncome: false, status: 'Failed' },
  { name: 'Invoice #INV-2026-003', category: 'Penjualan', amount: 3200000, date: '07 Oct 2026', isIncome: true, status: 'Success' },
  { name: 'Pembelian Peralatan', category: 'Pengeluaran', amount: 900000, date: '06 Oct 2026', isIncome: false, status: 'Success' },
  { name: 'Invoice #INV-2026-004', category: 'Penjualan', amount: 1500000, date: '05 Oct 2026', isIncome: true, status: 'Pending' },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Hapus data lama
    await Product.deleteMany({})
    await User.deleteMany({})
    await Transaction.deleteMany({})
    console.log('🗑️  Old data cleared')

    // Insert data baru
    await Product.insertMany(products)
    console.log(`📦 ${products.length} products inserted`)

    await User.insertMany(users)
    console.log(`👤 ${users.length} users inserted`)

    await Transaction.insertMany(transactions)
    console.log(`💰 ${transactions.length} transactions inserted`)

    console.log('\n🎉 Seed completed!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error.message)
    process.exit(1)
  }
}

seed()
