# UJIAN AKHIR SEMESTER
## MATA KULIAH PEMROGRAMAN WEB

**Disusun oleh:**

| No | Nama Lengkap | NIM |
|---|---|---|
| 1 | Ilham Arifin | 24.11.6022 |
| 2 | Muh Alfin Fauzi | 24.11.6042 |
| 3 | Moh Zaxlee Boneno | 24.11.5990 |
| 4 | I Kadek Putra Nata | 24.11.5989 |
| 5 | Nabil Q Ahmad | 24.11.6040 |

**Program Studi S1 Informatika**
**Universitas Amikom Yogyakarta**
**2026**

**Link GitHub Kelompok:** https://github.com/apin24/uts
**Link Website (Live):** https://pw.halomok.com

---

## Pembagian Tugas Kelompok

| Nama Lengkap | NIM | Job Description | Prosentase Kerja Kelompok (10%-100%) |
|---|---|---|---|
| Ilham Arifin | 24.11.6022 | Dashboard Keuangan (wadah/struktur), Katalog Produk (CRUD: Create, Read, Update, Delete + Upload Gambar), Manajemen User (CRUD + role + bcrypt) | 100% |
| Muh Alfin Fauzi | 24.11.6042 | Ringkasan Revenue & Statistik (Total Pemasukan, Pengeluaran, Profit), Daftar Produk (Grid Layout), Daftar User/Karyawan | 100% |
| Moh Zaxlee Boneno | 24.11.5990 | Grafik Pengeluaran (visualisasi per kategori), Detail Produk (popup info lengkap), Profil & Edit User | 100% |
| I Kadek Putra Nata | 24.11.5989 | Filter Transaksi (berdasarkan bulan/kategori), Pencarian & Filter Produk (search + kategori), Pencarian User | 100% |
| Nabil Q Ahmad | 24.11.6040 | Landing Page / Home (hero section + CTA), Kategori Produk (pengelompokan dinamis), Halaman Tentang Kami & FAQ (accordion interaktif) | 100% |

---

## 1. Framework Front End dan Back End yang Digunakan serta Alasannya [POIN 15]

*(sub.cpmk.ST084.CPMK37.3)*

### Framework Front End: React (Vite)

**Alasan menggunakan React:**
1. **Component-Based Architecture** — React memungkinkan kita memecah tampilan menjadi komponen-komponen kecil yang dapat dipakai ulang (reusable). Misalnya, kartu produk dibuat sekali tapi dapat ditampilkan berulang untuk setiap produk di katalog.
2. **Virtual DOM** — React menggunakan Virtual DOM yang membuat update tampilan sangat cepat. Saat user menambah produk, hanya bagian daftar produk yang di-render ulang, bukan seluruh halaman.
3. **Real-time Interactivity** — Fitur seperti pencarian real-time (search bar) dan filter langsung berfungsi tanpa reload halaman, memberikan pengalaman pengguna (UX) yang mulus.
4. **Ekosistem yang Besar** — React memiliki banyak library pendukung seperti `react-router-dom` (routing), `axios` (HTTP request), dan `react-hot-toast` (notifikasi) yang mempercepat development.
5. **Menggunakan Vite** sebagai build tool karena lebih cepat dari Create React App (CRA) dalam proses development (hot module replacement / HMR).

### Framework Back End: Node.js + Express.js

**Alasan menggunakan Node.js + Express:**
1. **Satu Bahasa untuk Front End dan Back End** — Karena React menggunakan JavaScript, maka backend juga menggunakan JavaScript (Node.js). Tidak perlu bahasa pemrograman berbeda, sehingga developer dapat bekerja di kedua sisi dengan mudah.
2. **Express.js Ringan dan Fleksibel** — Express adalah framework minimalis yang memberikan kebebasan dalam struktur aplikasi. Kita dapat mendefinisikan routes dan middleware sesuai kebutuhan tanpa konfigurasi yang rumit.
3. **RESTful API** — Express sangat cocok untuk membangun REST API. Setiap endpoint (GET, POST, PUT, DELETE) dapat dibuat dengan mudah untuk operasi CRUD.
4. **Middleware Ecosystem** — Express memiliki middleware yang banyak, seperti `multer` (upload file), `cors` (cross-origin), dan `bcryptjs` (hashing password).
5. **NPM (Node Package Manager)** — Tersedia jutaan package siap pakai yang mempercepat development.

### Database: MongoDB Atlas (Mongoose ODM)

**Alasan menggunakan MongoDB:**
1. **NoSQL / Document-based** — Data disimpan dalam format dokumen (mirip JSON), sangat fleksibel. Field dapat ditambah atau diubah tanpa migrasi struktur tabel yang rumit seperti di SQL.
2. **Cocok dengan JavaScript** — Format dokumen MongoDB mirip dengan object JavaScript, sehingga sangat natural untuk dipakai bersama Node.js.
3. **Mongoose ODM** — Memberikan struktur schema yang rapi untuk MongoDB, dengan validasi data, relasi antar collection (ObjectId ref), dan hooks (middleware).
4. **MongoDB Atlas (Cloud)** — Database di-host di cloud, sehingga aplikasi dapat terhubung dari mana saja tanpa perlu instalasi database lokal di server.

---

## 2. Screenshot Relasi Tabel di DBMS [POIN 15]

*(sub.cpmk.ST084.CPMK16.1)*

> [!IMPORTANT]
> Screenshot diagram relasi database dapat dibuat di **dbdiagram.io** dengan kode DBML berikut (juga tersedia di: https://github.com/apin24/uts/blob/main/docs/dbdiagram.dbml)

### Kode DBML untuk dbdiagram.io:

```dbml
// Waveneap Management System - Database Schema

Table users {
  _id ObjectId [pk, note: 'Primary key (auto-generated)']
  name String [not null, note: 'Nama lengkap user']
  username String [not null, note: 'Username untuk login']
  email String [not null, note: 'Email user']
  phone String [note: 'Nomor telepon']
  role String [not null, note: 'enum: Admin, Kasir, Staff Packing']
  password String [not null, note: 'Password di-hash bcrypt']
  address_street String [note: 'Alamat jalan']
  address_city String [note: 'Kota']
  createdAt DateTime [default: `now()`, note: 'Waktu dibuat']
  updatedAt DateTime [default: `now()`, note: 'Waktu diubah']
}

Table products {
  _id ObjectId [pk, note: 'Primary key (auto-generated)']
  title String [not null, note: 'Nama produk']
  price Number [not null, note: 'Harga dalam Rupiah']
  description String [note: 'Deskripsi produk']
  category String [not null, note: 'Kategori: Pakaian, Hewan, dll']
  image String [note: 'Path/URL file gambar']
  variants JSON [note: 'Array of {size: String, stock: Number}']
  createdAt DateTime [default: `now()`, note: 'Waktu dibuat']
  updatedAt DateTime [default: `now()`, note: 'Waktu diubah']
}

Table transactions {
  _id ObjectId [pk, note: 'Primary key (auto-generated)']
  name String [not null, note: 'Nama/deskripsi transaksi']
  category String [not null, note: 'Penjualan Produk, Jasa Iklan, Gaji, dll']
  amount Number [not null, note: 'Nominal dalam Rupiah']
  isIncome Boolean [not null, note: 'true=pemasukan, false=pengeluaran']
  status String [not null, note: 'enum: Success, Pending, Failed']
  date String [not null, note: 'Tanggal transaksi']
  platform String [note: 'enum: Shopee, Tokopedia, Offline, Lainnya']
  productId ObjectId [ref: > products._id, note: 'Referensi ke produk yang terjual']
  variantSize String [note: 'Ukuran varian yang terjual']
  notes String [note: 'Catatan tambahan']
  createdAt DateTime [default: `now()`, note: 'Waktu dibuat']
  updatedAt DateTime [default: `now()`, note: 'Waktu diubah']
}
```

### Relasi Antar Collection

Database ini memiliki **3 collection** utama:

1. **users** — Menyimpan data pengguna/karyawan dengan field role untuk hak akses.
2. **products** — Menyimpan data produk beserta varian ukuran dan stok.
3. **transactions** — Menyimpan data transaksi keuangan (pemasukan & pengeluaran).

**Relasi:** Collection `transactions` memiliki field `productId` yang mereferensikan (`ObjectId`) ke collection `products`. Ini menghubungkan transaksi penjualan dengan produk yang terjual.

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   users     │         │  transactions    │         │  products   │
├─────────────┤         ├──────────────────┤         ├─────────────┤
│ _id (PK)    │         │ _id (PK)         │         │ _id (PK)    │
│ name        │         │ name             │    ┌───→│ title       │
│ username    │         │ category         │    │    │ price       │
│ email       │         │ amount           │    │    │ description │
│ phone       │         │ isIncome         │    │    │ category    │
│ role        │         │ status           │    │    │ image       │
│ password    │         │ date             │    │    │ variants[]  │
│ address     │         │ platform         │    │    │ createdAt   │
│ createdAt   │         │ productId ───────┼────┘    │ updatedAt   │
│ updatedAt   │         │ variantSize      │         └─────────────┘
└─────────────┘         │ notes            │
                        │ createdAt        │
                        │ updatedAt        │
                        └──────────────────┘
```

> [!NOTE]
> **[SISIPKAN SCREENSHOT DI SINI]** — Buka https://dbdiagram.io, paste kode DBML di atas, lalu Export as PNG. Tempel screenshotnya di sini. Screenshot harus memperlihatkan ketiga tabel dan garis relasi antar tabel.

---

## 3. Penjelasan Detail Setiap Source Code Sesuai Halaman yang Dibuat oleh Masing-Masing Anggota [POIN 60]

*(sub.cpmk.ST084.CPMK38.1)*

**Link GitHub Kelompok:** https://github.com/apin24/uts

---

### 3.1 ILHAM ARIFIN (24.11.6022)
**Bagian: Dashboard Keuangan (wadah/struktur) · Katalog Produk (CRUD) · Manajemen User**

#### A. Katalog Produk — Tambah Produk (Create)

**Screenshot:** *(screenshot halaman Tambah Produk di Katalog)*

**Kode Frontend (React) — KatalogProduk.jsx:**
```jsx
const handleSave = async (e) => {
  e.preventDefault()
  if (!formData.title || !formData.price || !formData.category) return

  const payload = new FormData()
  payload.append('title', formData.title)
  payload.append('price', parseInt(formData.price))
  payload.append('description', formData.description)
  payload.append('category', formData.category)
  payload.append('variants', JSON.stringify(formData.variants))

  if (imageFile) {
    payload.append('imageFile', imageFile)
  }

  const res = await axios.post(`${API}/products`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  setProducts([res.data, ...products])
  toast.success('Produk berhasil ditambahkan!')
}
```

**Kode Backend (Node.js/Express) — routes/products.js:**
```javascript
router.post('/', [auth, upload.single('imageFile')], async (req, res) => {
  const productData = req.body;
  if (req.file) {
    productData.image = `/uploads/${req.file.filename}`;
  }
  if (typeof productData.variants === 'string') {
    productData.variants = JSON.parse(productData.variants);
  }
  const product = new Product(productData);
  const newProduct = await product.save();
  res.status(201).json(newProduct);
});
```

**Penjelasan:** Data produk dikirim dari form React menggunakan FormData (karena ada file gambar). Backend menerima data dengan middleware `multer` untuk menangani upload file gambar, lalu menyimpannya ke MongoDB. Gambar disimpan di folder `uploads/` dengan nama file berbasis timestamp.

---

#### B. Katalog Produk — Edit & Hapus (Update & Delete)

**Screenshot:** *(screenshot proses edit/hapus produk)*

**Kode Backend Update — routes/products.js:**
```javascript
router.put('/:id', [auth, upload.single('imageFile')], async (req, res) => {
  const productData = req.body;
  if (req.file) {
    productData.image = `/uploads/${req.file.filename}`;
  }
  if (typeof productData.variants === 'string') {
    productData.variants = JSON.parse(productData.variants);
  }
  const product = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});
```

**Kode Backend Delete — routes/products.js:**
```javascript
router.delete('/:id', auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});
```

**Penjelasan:** Edit menggunakan method PUT dengan ID produk sebagai parameter URL. Jika ada file gambar baru di-upload, gambar lama akan diganti. Hapus menggunakan method DELETE. Keduanya memerlukan middleware `auth` (JWT) untuk memastikan hanya user yang sudah login yang dapat mengubah data. Response 404 dikembalikan jika produk tidak ditemukan.

---

#### C. Manajemen User — Tambah User (Create)

**Screenshot:** *(screenshot halaman Manajemen User)*

**Kode Backend — routes/users.js:**
```javascript
router.post('/', auth, async (req, res) => {
  const { password, ...rest } = req.body;
  const user = new User(rest);

  // Hash password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  const newUser = await user.save();
  res.status(201).json(newUser);
});
```

**Penjelasan:** Saat admin menambah user baru, password tidak disimpan mentah, melainkan di-hash menggunakan `bcrypt.genSalt(10)` untuk membuat salt, lalu `bcrypt.hash(password, salt)` untuk mengenkripsi password. Middleware `auth` memastikan hanya admin yang sudah login dapat menambah user.

---

### 3.2 MUH ALFIN FAUZI (24.11.6042)
**Bagian: Ringkasan Revenue & Statistik · Daftar Produk (Grid) · Daftar User**

#### A. Ringkasan Revenue & Statistik

**Screenshot:** *(screenshot kartu statistik di Dashboard: Total Pemasukan, Total Pengeluaran, Profit)*

**Kode Frontend (React) — Dashboard.jsx:**
```jsx
const totalIncome = monthlyTransactions
  .filter(t => t.isIncome)
  .reduce((sum, t) => sum + t.amount, 0)

const totalExpense = monthlyTransactions
  .filter(t => !t.isIncome)
  .reduce((sum, t) => sum + t.amount, 0)

const profit = totalIncome - totalExpense
```

**Penjelasan:** Data transaksi diambil dari API (`axios.get('/api/transactions')`), lalu dijumlahkan menggunakan method `reduce`. Transaksi dipisah berdasarkan field `isIncome` (true = pemasukan, false = pengeluaran). Hasilnya ditampilkan dalam format Rupiah menggunakan `toLocaleString('id-ID')`.

---

#### B. Daftar Produk (Grid Layout)

**Screenshot:** *(screenshot tampilan grid produk di Katalog)*

**Kode Frontend — KatalogProduk.jsx:**
```jsx
<div className="products-grid">
  {filteredProducts.map(product => (
    <div className="product-card" key={product._id}>
      <img src={`/uploads/${product.image}`} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{formatPrice(product.price)}</p>
    </div>
  ))}
</div>
```

**Penjelasan:** Produk ditampilkan menggunakan CSS Grid layout. Data produk yang sudah di-filter di-render menggunakan `.map()` untuk membuat kartu-kartu produk secara dinamis. Setiap kartu menampilkan gambar, nama, dan harga produk.

---

### 3.3 MOH ZAXLEE BONENO (24.11.5990)
**Bagian: Grafik Pengeluaran · Detail Produk · Profil & Edit User**

#### A. Grafik Pengeluaran

**Screenshot:** *(screenshot grafik pengeluaran di Dashboard)*

**Kode Frontend — Dashboard.jsx:**
```jsx
const expenseByCategory = monthlyTransactions
  .filter(t => !t.isIncome)
  .reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
```

**Penjelasan:** Data pengeluaran dikelompokkan berdasarkan kategori (Iklan, Gaji, Stok Barang, dll) menggunakan `reduce`, lalu hasilnya divisualisasikan dalam bentuk grafik. Pemilik toko dapat melihat pos pengeluaran terbesar secara visual.

---

#### B. Detail Produk

**Screenshot:** *(screenshot popup/halaman detail produk saat diklik)*

**Kode Frontend — KatalogProduk.jsx:**
```jsx
const handleDetail = (product) => {
  setSelectedProduct(product)
}
// Menampilkan: title, price, description, category, variants, image
```

**Penjelasan:** Saat kartu produk diklik, data lengkap produk ditampilkan termasuk deskripsi, daftar varian ukuran beserta stoknya, dan gambar produk. Data diambil dari state yang sudah ada (tidak perlu request API tambahan karena data sudah di-load saat masuk halaman).

---

#### C. Profil & Edit User

**Screenshot:** *(screenshot form edit user)*

**Kode Backend — routes/users.js:**
```javascript
router.put('/:id', auth, async (req, res) => {
  let updateData = { ...req.body };

  // Hash password if it's being updated
  if (updateData.password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(updateData.password, salt);
  }

  const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});
```

**Penjelasan:** Edit user menggunakan method PUT. Jika password ikut diubah, maka password baru akan di-hash ulang menggunakan `genSalt` + `hash`. Method `.select('-password')` memastikan password tidak ikut dikirim di response JSON.

---

### 3.4 I KADEK PUTRA NATA (24.11.5989)
**Bagian: Filter Transaksi · Pencarian & Filter Produk · Pencarian User**

#### A. Filter Transaksi (berdasarkan bulan)

**Screenshot:** *(screenshot dropdown filter bulan di Dashboard)*

**Kode Frontend — Dashboard.jsx:**
```jsx
const [selectedMonth, setSelectedMonth] = useState('')

const monthlyTransactions = selectedMonth
  ? allTransactions.filter(t => t.date && t.date.startsWith(selectedMonth))
  : allTransactions
```

**Penjelasan:** User memilih bulan dari dropdown, lalu semua transaksi disaring menggunakan `filter` berdasarkan awalan tanggal (`startsWith`). Jika tidak ada bulan yang dipilih, semua transaksi ditampilkan. Hasilnya langsung mempengaruhi statistik dan grafik di dashboard secara real-time tanpa reload.

---

#### B. Pencarian & Filter Produk

**Screenshot:** *(screenshot search bar dan filter kategori di Katalog)*

**Kode Frontend — KatalogProduk.jsx:**
```jsx
const filteredProducts = products.filter((product) => {
  const matchSearch = !search ||
    product.title.toLowerCase().includes(search.toLowerCase())
  const matchCategory = !categoryFilter ||
    product.category === categoryFilter
  return matchSearch && matchCategory
})
```

**Penjelasan:** Pencarian produk menggunakan `includes()` untuk mencocokkan input ketikan dengan nama produk (case-insensitive), dan filter kategori menggunakan perbandingan langsung (`===`). Keduanya berjalan bersamaan secara real-time — setiap huruf yang diketik langsung menyaring daftar produk.

---

#### C. Pencarian User

**Screenshot:** *(screenshot search user di Manajemen User)*

**Kode Frontend — ManajemenUser.jsx:**
```jsx
const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
)
```

**Penjelasan:** Setiap karakter yang diketik langsung memfilter daftar user berdasarkan nama secara real-time. Tidak perlu menekan tombol search karena sifatnya reactive (React state update otomatis me-render ulang daftar).

---

### 3.5 NABIL Q AHMAD (24.11.6040)
**Bagian: Landing Page/Home · Kategori Produk · Tentang Kami/FAQ**

#### A. Landing Page (Home)

**Screenshot:** *(screenshot halaman Home / hero section)*

**Kode Frontend — Home.jsx:**
```jsx
<section className="hero-section">
  <div className="public-container" style={{ display: 'flex', flexDirection: 'column',
    alignItems: 'center', textAlign: 'center', padding: '80px 20px' }}>
    <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0F172A' }}>
      Tampil Beda dengan Koleksi <span style={{ color: '#003C90' }}>Waveneap</span>
    </h1>
    <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: 600 }}>
      Eksplorasi gaya pakaian terkini dengan bahan berkualitas premium.
    </p>
    <div style={{ display: 'flex', gap: 16 }}>
      <a href="https://shopee.co.id/waveneap" className="btn-primary">Mulai Belanja</a>
      <Link to="/tentang-kami" className="btn-secondary">Pelajari Lebih Lanjut</Link>
    </div>
  </div>
</section>
```

**Penjelasan:** Landing page berisi hero section dengan headline brand Waveneap, deskripsi singkat, dan dua tombol call-to-action: "Mulai Belanja" yang mengarah ke Shopee, dan "Pelajari Lebih Lanjut" yang mengarah ke halaman Tentang Kami menggunakan React Router (`Link`).

---

#### B. Kategori Produk

**Screenshot:** *(screenshot filter kategori di Katalog)*

**Kode Frontend — KatalogProduk.jsx:**
```jsx
const uniqueCategories = [...new Set(products.map(p => p.category))]
// Output: ['Pakaian', 'Hewan', 'Pangan Kambing', ...]
```

**Penjelasan:** Kategori produk diambil secara dinamis dari data produk di database menggunakan `Set` untuk menghilangkan duplikat. Kategori ini digunakan sebagai opsi dropdown filter, jadi jika ada kategori produk baru yang ditambahkan ke database, otomatis muncul sebagai opsi filter.

---

#### C. Tentang Kami & FAQ (Accordion)

**Screenshot:** *(screenshot halaman About & FAQ buka-tutup)*

**Kode Frontend — About.jsx:**
```jsx
const [openFaq, setOpenFaq] = useState(null)

const toggleFaq = (index) => {
  if (openFaq === index) {
    setOpenFaq(null)  // tutup jika sudah terbuka
  } else {
    setOpenFaq(index)  // buka FAQ yang diklik
  }
}

// Render:
{faqs.map((faq, i) => (
  <div key={i} onClick={() => toggleFaq(i)}>
    <h3>{faq.q}</h3>
    {openFaq === i && <p>{faq.a}</p>}
  </div>
))}
```

**Penjelasan:** FAQ menggunakan konsep accordion — satu pertanyaan terbuka pada satu waktu. Menggunakan state `openFaq` untuk menyimpan index pertanyaan yang sedang aktif. Jika diklik lagi, jawaban tersembunyi (set ke `null`). Data FAQ disimpan dalam array of objects `{q, a}` (question & answer).
