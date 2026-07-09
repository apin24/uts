# 🎤 Contekan Presentasi — ILHAM ARIFIN (24.11.6022)

> [!IMPORTANT]
> Bagian kamu adalah **JANTUNG aplikasi**: Dashboard Keuangan, Katalog Produk, & Manajemen User. Fokus kuasai 3 ini.

---

## 🏆 KRITERIA PENILAIAN DOSEN (Target Nilai!)

Dosen menilai **3 hal** ini. Pastikan kamu buktiin semuanya saat demo:

| Kriteria | Cara Dapetin Nilai | Siapa |
|---|---|---|
| **Frontend (fitur & desain)** | Tunjukin UI rapi/modern (React), fitur search & filter jalan | Tim |
| **Fungsional CRUD** ⭐ | **DEMO LIVE**: Tambah→Edit→Hapus produk di depan dosen | **KAMU** |
| **Database** | Tambah data lalu **REFRESH (F5)** → data tetap ada = tersimpan di MongoDB | **KAMU** |

> [!TIP]
> **Jurus rahasia dapet nilai penuh:** Di Katalog Produk, tambah produk baru → refresh halaman → tunjukin produknya masih ada. Sekali aksi ini langsung ngebuktiin **CRUD** DAN **Database** sekaligus! 🎯

---

## 👥 Pembagian Tugas Kelompok

| Nama | NIM | Bagian |
|---|---|---|
| **Ilham Arifin** ⭐ | 24.11.6022 | **Dashboard Keuangan, Katalog Produk, Manajemen User** |
| Muh Alfin Fauzi | 24.11.6042 | Ringkasan Revenue & Statistik, Daftar Produk (Grid), Daftar User |
| Moh Zaxlee Boneno | 24.11.5990 | Grafik Pengeluaran, Detail Produk, Profil & Edit User |
| I Kadek Putra Nata | 24.11.5989 | Filter Transaksi, Pencarian & Filter Produk, Pencarian User |
| Nabil Q Ahmad | 24.11.6040 | Landing Page/Home, Kategori Produk, Tentang Kami/FAQ |

---

## 🗣️ Naskah Pembuka Kamu

> "Perkenalkan saya **Ilham Arifin**, NIM 24.11.6022. Pada project ini saya bertanggung jawab menangani bagian inti dari sistem, yaitu **Manajemen Keuangan Toko**, yang terdiri dari **Dashboard Keuangan**, **Katalog Produk**, dan **Manajemen User**. Izin saya jelaskan satu per satu."

---

## 📊 BAGIAN 1: Dashboard Keuangan

**Apa yang kamu jelasin:**
> "Halaman Dashboard ini adalah **pusat kendali keuangan toko** yang saya bangun sebagai wadah utama. Tugas saya memastikan halaman ini bisa **mengambil semua data transaksi dari database** dan menampilkannya, lalu di dalamnya ada beberapa komponen yang dikerjakan tim."

> [!WARNING]
> **JANGAN klaim bagian temen!** Revenue/statistik = Alfin, Grafik pengeluaran = Zaxlee, Filter transaksi = Kadek. Kamu cukup bilang "komponen ini dikerjakan tim".

**Yang boleh kamu sebut sebagai bagianmu:**
- Saya membangun **struktur/kerangka halaman Dashboard**-nya.
- Halaman ini **mengambil data transaksi, produk, dan user** dari database sekaligus (pakai `axios`).
- Data uang otomatis diformat jadi **format Rupiah** (Rp 150.000).
- Sebagai wadah yang menampung komponen tim (revenue, grafik, filter).

**Kalimat teknis biar keliatan jago:**
> "Data di dashboard ini saya ambil secara *real-time* dari database MongoDB menggunakan `axios`. Jadi halaman ini jadi fondasi yang menyediakan data buat komponen-komponen lain yang dikerjakan teman-teman saya."

---

## 🛒 BAGIAN 2: Katalog Produk

**Apa yang kamu jelasin:**
> "Halaman Katalog Produk berfungsi untuk mengelola semua barang yang dijual toko. Di sini saya menerapkan konsep **CRUD** secara penuh."

**Fitur yang disebut (INI KATA KUNCINYA — CRUD):**
- **Create** = Tambah produk baru (nama, harga, stok, kategori, **upload gambar**).
- **Read** = Menampilkan semua produk dalam bentuk kartu/grid.
- **Update** = Edit produk yang sudah ada.
- **Delete** = Hapus produk.

**Kalimat teknis:**
> "Untuk gambar produk, saya pakai sistem **upload file** yang disimpan di server, jadi tokonya bisa menampilkan foto asli produknya."

---

## 👤 BAGIAN 3: Manajemen User

**Apa yang kamu jelasin:**
> "Halaman Manajemen User digunakan oleh admin untuk mengelola data pengguna atau karyawan. Ini berkaitan langsung dengan **keamanan dan hak akses** aplikasi."

**Fitur yang disebut:**
- Menampilkan daftar semua user/karyawan.
- Tambah user baru & atur **role** (misal: Admin atau Karyawan).
- Edit & hapus data user.
- Password user **di-hash (dienkripsi)** pakai bcrypt, jadi aman.

---

## 🖥️ Urutan Demo (Praktek di Layar)

Lakuin ini secara berurutan biar smooth:
1. **Login** dulu (nunjukin sistem keamanan).
2. Masuk ke **Dashboard** → tunjukin halaman utamanya udah keload data dari database (angkanya muncul).
3. Masuk ke **Katalog Produk** → **Tambah 1 produk baru** + upload gambar → lalu **Edit** → lalu **Hapus**. (Ini nunjukin CRUD live!)
4. Masuk ke **Manajemen User** → tunjukin daftar user.

> [!WARNING]
> Pas di Dashboard, **jangan fokus ke filter bulan / grafik / revenue** (itu bagian temen). Cukup bilang "halaman ini berhasil load data dari database", terus langsung geser ke **Katalog Produk** yang jadi bintang demonya.

> [!TIP]
> Pas demo Tambah Produk, sengaja tambahin produk terus refresh. Kasih liat ke dosen kalau datanya **beneran kesimpen di database**. Ini nilai plus banget.

---

## 🛡️ Antisipasi Pertanyaan (Khusus Bagian Kamu)

**T: Data keuangannya dari mana?**
> J: Dari database MongoDB. Frontend saya minta data lewat API ke backend Node.js, lalu ditampilkan di dashboard.

**T: Apa itu CRUD yang kamu sebut tadi?**
> J: Create (tambah), Read (baca), Update (edit), Delete (hapus). Di katalog produk saya, keempatnya sudah berfungsi.

**T: Gimana cara upload gambar produknya?**
> J: Saat admin pilih gambar, file dikirim ke server dan disimpan di folder `uploads`, lalu link gambarnya disimpan di database.

**T: Kenapa perlu Manajemen User & role?**
> J: Supaya ada pembatasan hak akses. Nggak semua orang boleh mengatur produk atau keuangan, hanya admin. Ini untuk keamanan.

**T: Gimana mastiin password user aman?**
> J: Password tidak disimpan asli, tapi diacak (hash) pakai library **bcrypt**. Jadi walaupun database bocor, password tetap aman.

---

## 🎯 Penutup Kamu

> "Jadi kesimpulannya, bagian yang saya kerjakan mencakup pengelolaan keuangan, produk, dan pengguna, yang merupakan fitur inti dari aplikasi manajemen toko ini. Semuanya sudah terhubung ke database dan berjalan secara dinamis. Terima kasih."
