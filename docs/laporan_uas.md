# UJIAN AKHIR SEMESTER
## MATA KULIAH PEMROGRAMAN WEB

**Disusun oleh:**

| No | Nama | NIM |
|---|---|---|
| 1 | Ilham Arifin | 24.11.6022 |
| 2 | Muh Alfin Fauzi | 24.11.6042 |
| 3 | Moh Zaxlee Boneno | 24.11.5990 |
| 4 | I Kadek Putra Nata | 24.11.5989 |
| 5 | Nabil Q Ahmad | 24.11.6040 |

**Program Studi S1 Informatika**
**Universitas Amikom Yogyakarta**
**2026**

---

## 1. Latar Belakang Mengembangkan Hasil Karya/Project [POIN 10]
*(dikerjakan secara kelompok)*

Di era digital saat ini, banyak pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di bidang fashion yang masih mengelola operasional bisnisnya secara manual — mulai dari pencatatan produk, pengelolaan stok, pencatatan transaksi keuangan, hingga manajemen karyawan. Hal ini sering menimbulkan kesalahan data, kesulitan dalam menganalisa keuangan, dan lambatnya pengambilan keputusan bisnis.

Berdasarkan permasalahan tersebut, kami membangun **Waveneap Management System** — sebuah aplikasi web manajemen toko berbasis **MERN Stack (MongoDB, Express.js, React, Node.js)** yang bertujuan untuk:

1. **Mendigitalisasi pengelolaan produk** — memudahkan pemilik toko untuk menambah, mengedit, dan menghapus data produk lengkap dengan gambar dan varian ukuran.
2. **Mencatat transaksi keuangan secara otomatis** — membedakan pemasukan dan pengeluaran, lengkap dengan kategori, platform penjualan, dan status transaksi.
3. **Mengelola data user/karyawan** — mengatur hak akses berdasarkan role (Admin, Kasir, Staff Packing) dengan sistem autentikasi yang aman.
4. **Menyediakan dashboard analitik** — menampilkan ringkasan revenue, grafik pengeluaran, dan filter data berdasarkan periode waktu.

Aplikasi ini telah di-deploy secara online di **https://pw.halomok.com** menggunakan VPS dengan aaPanel, Nginx sebagai reverse proxy, dan MongoDB Atlas sebagai database cloud. Dengan demikian, aplikasi dapat diakses dari mana saja dan kapan saja.

---

## 2. Kebutuhan Fungsional [POIN 15]
*(dikerjakan secara kelompok)*

| No | Fitur | Deskripsi |
|---|---|---|
| 1 | **Autentikasi (Login/Logout)** | User harus login untuk mengakses sistem. Password di-hash dengan bcrypt, sesi menggunakan JWT (JSON Web Token) dengan masa berlaku 5 hari. |
| 2 | **Dashboard Keuangan** | Menampilkan ringkasan total pemasukan, pengeluaran, dan keuntungan bersih. Dilengkapi grafik pengeluaran dan filter per bulan. |
| 3 | **Manajemen Transaksi (CRUD)** | Admin dapat menambah, melihat, mengedit, dan menghapus data transaksi. Setiap transaksi memiliki kategori (Penjualan Produk, Jasa Iklan, Gaji, dll), status, dan platform. |
| 4 | **Katalog Produk (CRUD)** | Mengelola data produk: tambah produk baru dengan upload gambar, edit informasi produk, hapus produk. Setiap produk memiliki varian ukuran dan stok. |
| 5 | **Pencarian & Filter Produk** | Pencarian produk berdasarkan nama dan penyaringan berdasarkan kategori secara real-time. |
| 6 | **Detail Produk** | Menampilkan informasi lengkap produk (harga, deskripsi, varian ukuran, stok tersedia, gambar) saat diklik. |
| 7 | **Manajemen User (CRUD)** | Admin dapat menambah, melihat, mengedit, dan menghapus data user/karyawan. Setiap user memiliki role (Admin, Kasir, Staff Packing). |
| 8 | **Pencarian User** | Pencarian user berdasarkan nama secara real-time. |
| 9 | **Landing Page** | Halaman publik sebagai perkenalan brand/toko kepada pengunjung. |
| 10 | **Halaman Tentang Kami & FAQ** | Menampilkan informasi tentang brand dan FAQ interaktif (accordion). |

---

## 3. Rancangan Database [POIN 25]
*(dikerjakan secara kelompok)*

### Teknologi Database
- **MongoDB Atlas** (NoSQL / Document-based database)
- Koneksi melalui **Mongoose ODM** di backend Node.js

### Relasi Antar Collection

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Users     │         │  Transactions    │         │  Products   │
├─────────────┤         ├──────────────────┤         ├─────────────┤
│ _id         │         │ _id              │         │ _id         │
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

**Relasi:** Collection `Transactions` memiliki field `productId` yang mereferensikan (`ObjectId`) ke collection `Products`. Ini menghubungkan transaksi penjualan dengan produk yang terjual.

---

### Struktur Collection: `users`

| Field | Tipe | Keterangan |
|---|---|---|
| _id | ObjectId | Primary key (auto-generated) |
| name | String | Nama lengkap user (required) |
| username | String | Username untuk login (required) |
| email | String | Email user (required) |
| phone | String | Nomor telepon |
| role | String (enum) | Hak akses: Admin / Kasir / Staff Packing |
| password | String | Password yang sudah di-hash bcrypt (required) |
| address.street | String | Alamat jalan |
| address.city | String | Kota |
| createdAt | Date | Waktu data dibuat (auto) |
| updatedAt | Date | Waktu data terakhir diubah (auto) |

---

### Struktur Collection: `products`

| Field | Tipe | Keterangan |
|---|---|---|
| _id | ObjectId | Primary key (auto-generated) |
| title | String | Nama produk (required) |
| price | Number | Harga produk dalam Rupiah (required) |
| description | String | Deskripsi produk |
| category | String | Kategori produk, misal: Pakaian, Hewan (required) |
| image | String | Path/URL file gambar produk |
| variants | Array | Daftar varian (size + stock per size) |
| variants.size | String | Ukuran varian, misal: S, M, L, XL |
| variants.stock | Number | Jumlah stok per ukuran |
| createdAt | Date | Waktu data dibuat (auto) |
| updatedAt | Date | Waktu data terakhir diubah (auto) |

---

### Struktur Collection: `transactions`

| Field | Tipe | Keterangan |
|---|---|---|
| _id | ObjectId | Primary key (auto-generated) |
| name | String | Nama/deskripsi transaksi (required) |
| category | String | Kategori: Penjualan Produk, Jasa Iklan, Gaji, dll (required) |
| amount | Number | Nominal transaksi dalam Rupiah (required) |
| isIncome | Boolean | true = pemasukan, false = pengeluaran (required) |
| status | String (enum) | Status: Success / Pending / Failed |
| date | String | Tanggal transaksi (required) |
| platform | String (enum) | Platform: Shopee / Tokopedia / Offline / Lainnya |
| productId | ObjectId (ref) | Referensi ke collection Products (nullable) |
| variantSize | String | Ukuran varian yang terjual (nullable) |
| notes | String | Catatan tambahan |
| createdAt | Date | Waktu data dibuat (auto) |
| updatedAt | Date | Waktu data terakhir diubah (auto) |

---

## 4. Implementasi Coding Front End dan Back End [POIN 50]
*(dikerjakan secara individu)*

> [!NOTE]
> Bagian ini berisi screenshot tampilan + potongan kode + penjelasan ringkas.
> **Setiap anggota mengisi bagiannya masing-masing.**
> Screenshot bisa diambil dari website live: https://pw.halomok.com

---

### 4.1 ILHAM ARIFIN (24.11.6022)
**Bagian: Dashboard Keuangan (wadah) · Katalog Produk (CRUD) · Manajemen User**

#### A. Katalog Produk — Tambah Produk (Create)
**Screenshot:** *(screenshot halaman Tambah Produk di Katalog)*

**Kode Frontend (React):**
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

**Kode Backend (Node.js/Express):**
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

**Penjelasan:** Data produk dikirim dari form React menggunakan FormData (karena ada file gambar), lalu backend menerima dan menyimpannya ke MongoDB. Gambar disimpan di folder `uploads/` pada server.

---

#### B. Katalog Produk — Edit & Hapus (Update & Delete)
**Screenshot:** *(screenshot proses edit/hapus produk)*

**Kode Backend Update:**
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

**Kode Backend Delete:**
```javascript
router.delete('/:id', auth, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});
```

**Penjelasan:** Edit menggunakan method PUT dengan ID produk sebagai parameter. Hapus menggunakan method DELETE. Keduanya mengarah ke MongoDB berdasarkan ID unik dokumen.

---

#### C. Manajemen User
**Screenshot:** *(screenshot halaman Manajemen User)*

**Kode Backend Tambah User:**
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

**Penjelasan:** Saat admin menambah user baru, password di-hash terlebih dahulu menggunakan bcrypt (10 salt rounds) sebelum disimpan ke database. Ini menjamin keamanan data password.

---

### 4.2 MUH ALFIN FAUZI (24.11.6042)
**Bagian: Ringkasan Revenue & Statistik · Daftar Produk (Grid) · Daftar User**

#### A. Ringkasan Revenue & Statistik
**Screenshot:** *(screenshot kartu statistik di Dashboard: Total Pemasukan, Total Pengeluaran, Profit)*

**Kode Frontend (React):**
```jsx
const totalIncome = monthlyTransactions
  .filter(t => t.isIncome)
  .reduce((sum, t) => sum + t.amount, 0)

const totalExpense = monthlyTransactions
  .filter(t => !t.isIncome)
  .reduce((sum, t) => sum + t.amount, 0)

const profit = totalIncome - totalExpense
```

**Penjelasan:** Data transaksi diambil dari API, lalu dijumlahkan menggunakan method `reduce`. Transaksi dipisah berdasarkan field `isIncome` (true = pemasukan, false = pengeluaran). Hasilnya ditampilkan di kartu statistik dengan format Rupiah.

---

#### B. Daftar Produk (Grid Layout)
**Screenshot:** *(screenshot tampilan grid produk di Katalog)*

**Kode Frontend:**
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

**Penjelasan:** Produk ditampilkan menggunakan CSS Grid layout. Data produk yang sudah di-filter di-render menggunakan `.map()` untuk membuat kartu-kartu produk secara dinamis.

---

### 4.3 MOH ZAXLEE BONENO (24.11.5990)
**Bagian: Grafik Pengeluaran · Detail Produk · Profil & Edit User**

#### A. Grafik Pengeluaran
**Screenshot:** *(screenshot grafik pengeluaran di Dashboard)*

**Kode Frontend:**
```jsx
const expenseByCategory = monthlyTransactions
  .filter(t => !t.isIncome)
  .reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount
    return acc
  }, {})
```

**Penjelasan:** Data pengeluaran dikelompokkan berdasarkan kategori (Iklan, Gaji, Stok Barang, dll) menggunakan `reduce`, lalu hasilnya divisualisasikan dalam bentuk grafik agar pemilik toko mudah menganalisa pos pengeluaran terbesar.

---

#### B. Detail Produk
**Screenshot:** *(screenshot popup/halaman detail produk saat diklik)*

**Kode Frontend:**
```jsx
const handleDetail = (product) => {
  setSelectedProduct(product)
}
// Menampilkan: title, price, description, category, variants, image
```

**Penjelasan:** Saat kartu produk diklik, data lengkap produk ditampilkan termasuk deskripsi, daftar varian ukuran beserta stoknya, dan gambar produk.

---

#### C. Profil & Edit User
**Screenshot:** *(screenshot form edit user)*

**Kode Backend:**
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

**Penjelasan:** Edit user menggunakan method PUT. Jika password ikut diubah, maka password baru akan di-hash ulang sebelum disimpan.

---

### 4.4 I KADEK PUTRA NATA (24.11.5989)
**Bagian: Filter Transaksi · Pencarian & Filter Produk · Pencarian User**

#### A. Filter Transaksi (berdasarkan bulan)
**Screenshot:** *(screenshot dropdown filter bulan di Dashboard)*

**Kode Frontend:**
```jsx
const [selectedMonth, setSelectedMonth] = useState('')

const monthlyTransactions = selectedMonth
  ? allTransactions.filter(t => t.date && t.date.startsWith(selectedMonth))
  : allTransactions
```

**Penjelasan:** User memilih bulan dari dropdown, lalu semua transaksi disaring menggunakan `filter` berdasarkan awalan tanggal. Hasilnya langsung mempengaruhi statistik dan grafik di dashboard secara real-time tanpa reload.

---

#### B. Pencarian & Filter Produk
**Screenshot:** *(screenshot search bar dan filter kategori di Katalog)*

**Kode Frontend:**
```jsx
const [search, setSearch] = useState('')
const [categoryFilter, setCategoryFilter] = useState('')

const filteredProducts = products.filter((product) => {
  const matchSearch = !search || product.title.toLowerCase().includes(search.toLowerCase())
  const matchCategory = !categoryFilter || product.category === categoryFilter
  return matchSearch && matchCategory
})
```

**Penjelasan:** Pencarian produk menggunakan `includes()` untuk mencocokkan input ketikan dengan nama produk, dan filter kategori menggunakan perbandingan langsung. Keduanya berjalan bersamaan secara real-time.

---

#### C. Pencarian User
**Screenshot:** *(screenshot search user di Manajemen User)*

**Kode Frontend:**
```jsx
const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
)
```

**Penjelasan:** Setiap karakter yang diketik langsung memfilter daftar user berdasarkan nama. Tidak perlu menekan tombol search karena sifatnya real-time.

---

### 4.5 NABIL Q AHMAD (24.11.6040)
**Bagian: Landing Page/Home · Kategori Produk · Tentang Kami/FAQ**

#### A. Landing Page (Home)
**Screenshot:** *(screenshot halaman Home / hero section)*

**Kode Frontend:**
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

**Penjelasan:** Landing page berisi hero section dengan headline, deskripsi singkat brand, dan tombol call-to-action yang mengarahkan pengunjung ke halaman katalog produk.

---

#### B. Kategori Produk
**Screenshot:** *(screenshot filter kategori di Katalog)*

**Kode Frontend:**
```jsx
const uniqueCategories = [...new Set(products.map(p => p.category))]
// Output: ['Pakaian', 'Hewan', 'Pangan Kambing', ...]
```

**Penjelasan:** Kategori produk diambil secara dinamis dari data produk yang ada di database menggunakan `Set` untuk menghilangkan duplikat. Kategori ini digunakan sebagai opsi filter.

---

#### C. Tentang Kami & FAQ (Accordion)
**Screenshot:** *(screenshot halaman About & FAQ buka-tutup)*

**Kode Frontend:**
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

**Penjelasan:** FAQ menggunakan konsep accordion — satu pertanyaan terbuka pada satu waktu. Menggunakan state `openFaq` untuk menyimpan index pertanyaan yang sedang aktif. Jika diklik lagi, jawaban tersembunyi.

---

## 5. Pembagian Tugas Kelompok

| Nama Lengkap | NIM | Job Description | Prosentase Kerja Kelompok (10%-100%) |
|---|---|---|---|
| Ilham Arifin | 24.11.6022 | Dashboard Keuangan (wadah/struktur), Katalog Produk (CRUD: Create, Read, Update, Delete + Upload Gambar), Manajemen User (CRUD + role + bcrypt) | 100% |
| Muh Alfin Fauzi | 24.11.6042 | Ringkasan Revenue & Statistik (Total Pemasukan, Pengeluaran, Profit), Daftar Produk (Grid Layout), Daftar User/Karyawan | 100% |
| Moh Zaxlee Boneno | 24.11.5990 | Grafik Pengeluaran (visualisasi per kategori), Detail Produk (popup info lengkap), Profil & Edit User | 100% |
| I Kadek Putra Nata | 24.11.5989 | Filter Transaksi (berdasarkan bulan/kategori), Pencarian & Filter Produk (search + kategori), Pencarian User | 100% |
| Nabil Q Ahmad | 24.11.6040 | Landing Page / Home (hero section + CTA), Kategori Produk (pengelompokan dinamis), Halaman Tentang Kami & FAQ (accordion interaktif) | 100% |
