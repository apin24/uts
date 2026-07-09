# 🎤 Contekan Presentasi — TIM LENGKAP (5 Orang)

> [!IMPORTANT]
> Setiap orang FOKUS ke bagiannya sendiri. Jangan klaim bagian orang lain biar nilai adil & nggak tabrakan.

## 👥 Peta Pembagian Tugas

| Nama | Bagian |
|---|---|
| **Ilham Arifin** | Dashboard (wadah), Katalog Produk (CRUD), Manajemen User |
| **Alfin Fauzi** | Ringkasan Revenue & Statistik, Daftar Produk (Grid), Daftar User |
| **Zaxlee Boneno** | Grafik Pengeluaran, Detail Produk, Profil & Edit User |
| **Kadek Putra Nata** | Filter Transaksi, Pencarian & Filter Produk, Pencarian User |
| **Nabil Q Ahmad** | Landing Page/Home, Kategori Produk, Tentang Kami/FAQ |

## 🎬 Urutan Ngomong yang Disarankan
**Nabil (Home) → Ilham (Katalog/CRUD) → Alfin (Statistik) → Zaxlee (Grafik) → Kadek (Search)**
*(Alur natural: dari tampilan luar → ke dalam sistem)*

---
---

# 1️⃣ ILHAM ARIFIN (24.11.6022)
### Bagian: Dashboard (wadah) · Katalog Produk (CRUD) ⭐ · Manajemen User

**🗣️ Naskah Pembuka:**
> "Saya **Ilham Arifin**. Bagian saya adalah fitur inti sistem: **struktur halaman Dashboard**, **Katalog Produk**, dan **Manajemen User**."

**Yang dijelasin:**
- **Dashboard (wadah)**: Saya bangun kerangka halaman Dashboard yang **mengambil data dari database** (transaksi, produk, user), lalu jadi wadah komponen tim.
- **Katalog Produk (CRUD)** ⭐: Menerapkan **CRUD penuh** — Create (tambah produk + upload gambar), Read (grid), Update (edit), Delete (hapus).
- **Manajemen User**: Kelola data karyawan + atur **role**. Password **di-hash pakai bcrypt** biar aman.

**Kalimat teknis:**
> "Data saya ambil real-time dari MongoDB pakai `axios`. Untuk gambar produk, saya pakai sistem upload file yang disimpan di server."

**🖥️ Demo (BINTANG PENILAIAN CRUD & DATABASE):**
Di Katalog Produk: **Tambah produk baru + upload gambar → Refresh (F5) → data masih ada → Edit → Hapus**. Buktiin ke dosen datanya beneran tersimpan di database!

**🛡️ Antisipasi Pertanyaan:**
- *T: Apa itu CRUD?* → J: Create, Read, Update, Delete — operasi dasar kelola data, semua sudah jalan di katalog produk saya.
- *T: Gimana password aman?* → J: Di-hash pakai bcrypt, jadi nggak disimpan mentah.

---
---

# 2️⃣ MUH ALFIN FAUZI (24.11.6042)
### Bagian: Ringkasan Revenue & Statistik · Daftar Produk (Grid) · Daftar User

**🗣️ Naskah Pembuka:**
> "Saya **Muh Alfin Fauzi**. Bagian saya adalah menampilkan **ringkasan revenue & statistik** di dashboard, **daftar produk dalam bentuk grid**, serta **daftar user/karyawan**."

**Yang dijelasin:**
- **Ringkasan Revenue**: Kartu statistik di atas dashboard yang nampilin **total pemasukan, total pengeluaran, dan keuntungan bersih**. Angkanya dihitung otomatis dari semua transaksi.
- **Daftar Produk (Grid)**: Semua produk ditampilkan rapi berbentuk **kartu/grid** biar enak dilihat.
- **Daftar User**: Menampilkan seluruh data user dalam bentuk tabel/list.

**Kalimat teknis:**
> "Statistik ini dihitung pakai fungsi `reduce` di JavaScript untuk menjumlahkan semua transaksi, lalu ditampilkan dalam format Rupiah."

**🛡️ Antisipasi Pertanyaan:**
- *T: Angka revenue-nya dari mana?* → J: Dijumlahkan otomatis dari data transaksi di database, bukan diketik manual.
- *T: Kenapa pakai grid?* → J: Biar tampilan produk rapi, responsif, dan gampang di-scan mata user.

---
---

# 2️⃣ MOH ZAXLEE BONENO (24.11.5990)
### Bagian: Grafik Pengeluaran · Detail Produk · Profil & Edit User

**🗣️ Naskah Pembuka:**
> "Saya **Moh Zaxlee Boneno**. Saya menangani **grafik pengeluaran**, halaman **detail produk**, dan fitur **profil serta edit user**."

**Yang dijelasin:**
- **Grafik Pengeluaran**: Visualisasi data pengeluaran dalam bentuk **grafik/chart** biar gampang lihat pos pengeluaran terbesar (misal iklan, gaji, stok).
- **Detail Produk**: Saat produk diklik, muncul **detail lengkap** (harga, deskripsi, varian ukuran, stok, gambar).
- **Profil & Edit User**: User bisa **melihat & mengubah data dirinya** sendiri.

**Kalimat teknis:**
> "Grafik ini bikin data angka jadi lebih mudah dipahami secara visual, jadi pemilik toko langsung tahu uang paling banyak keluar ke mana."

**🛡️ Antisipasi Pertanyaan:**
- *T: Kenapa perlu grafik?* → J: Karena angka mentah susah dibaca. Grafik bikin analisa keuangan lebih cepat & jelas.
- *T: Data detail produk dari mana?* → J: Diambil berdasarkan ID produk yang diklik, lalu ditarik dari database.

---
---

# 4️⃣ I KADEK PUTRA NATA (24.11.5989)
### Bagian: Filter Transaksi · Pencarian & Filter Produk · Pencarian User

**🗣️ Naskah Pembuka:**
> "Saya **I Kadek Putra Nata**. Bagian saya adalah fitur **pencarian dan filter** — untuk transaksi, produk, dan user."

**Yang dijelasin:**
- **Filter Transaksi**: Bisa saring transaksi berdasarkan **tanggal/bulan atau kategori**, jadi laporan lebih spesifik.
- **Pencarian & Filter Produk**: Kolom **search** untuk cari produk berdasarkan nama, dan **filter kategori**.
- **Pencarian User**: Cari user dengan cepat lewat kolom pencarian.

**Kalimat teknis:**
> "Fitur ini pakai fungsi `filter` di JavaScript. Setiap kali user mengetik, daftar otomatis tersaring **secara real-time** tanpa reload halaman."

**🛡️ Antisipasi Pertanyaan:**
- *T: Cara kerja search-nya gimana?* → J: Setiap huruf yang diketik langsung mencocokkan data yang ada, jadi hasilnya muncul instan.
- *T: Kenapa butuh filter?* → J: Kalau data sudah banyak, filter memudahkan user nemuin yang dicari tanpa scroll manual.

**🖥️ Demo:** Ketik nama produk di search bar → tunjukin daftar langsung menyusut sesuai ketikan. (Efeknya keren dilihat!)

---
---

# 5️⃣ NABIL Q AHMAD (24.11.6040)
### Bagian: Landing Page/Home · Kategori Produk · Tentang Kami/FAQ

**🗣️ Naskah Pembuka:**
> "Saya **Nabil Q Ahmad**. Saya mengerjakan tampilan publik: **Landing Page/Home**, pengelompokan **kategori produk**, dan halaman **Tentang Kami serta FAQ**."

**Yang dijelasin:**
- **Landing Page (Home)**: Halaman pertama yang dilihat pengunjung — berisi *hero section*, pengenalan brand, dan ajakan (call-to-action).
- **Kategori Produk**: Produk dikelompokkan per kategori (misal Pakaian, dll) biar rapi.
- **Tentang Kami / FAQ**: Halaman cerita brand + **FAQ interaktif** (pertanyaan yang bisa diklik buka-tutup / accordion).

**Kalimat teknis:**
> "Untuk FAQ, saya bikin **accordion** pakai state di React — jadi jawaban muncul saat pertanyaan diklik, hemat tempat dan interaktif."

**🛡️ Antisipasi Pertanyaan:**
- *T: Kenapa perlu landing page?* → J: Untuk kesan pertama & membangun kepercayaan pengunjung sebelum mereka lihat produk.
- *T: FAQ-nya interaktif?* → J: Iya, pakai sistem accordion (klik buka-tutup) supaya halaman ringkas.

**🖥️ Demo:** Buka Home → scroll tunjukin desainnya → buka About → klik-klik FAQ biar buka-tutup.

---
---

## 🎯 Penutup Bareng (siapa aja boleh baca)

> "Demikian penjelasan dari tim kami. Secara keseluruhan aplikasi ini adalah web full-stack (React + Node.js + MongoDB) yang sudah online, dengan fitur lengkap dari landing page, katalog produk CRUD, manajemen keuangan, sampai manajemen user. Terima kasih."

> [!TIP]
> **Kata kunci sakti yang semua orang sebaiknya sebut minimal sekali:** React, Node.js, MongoDB, API, CRUD, real-time.

---
---

## 💬 SESI TANYA-JAWAB: "Kamu Ngerjain Apa & Gimana Caranya?"

> Simulasi dosen nanya tiap orang. Hafalin jawaban di bagianmu.

### 🧑‍💻 ILHAM
**T: Kamu ngerjain bagian apa?**
> J: Saya menangani **Katalog Produk, Manajemen User, dan struktur Dashboard**.

**T: Gimana cara kamu bikin fitur tambah produk?**
> J: Saya bikin form input, lalu saat disimpan, datanya (termasuk gambar) dikirim ke backend Node.js lewat API, terus disimpan ke MongoDB. Setelah itu daftar produk otomatis di-refresh.

**T: Gimana produk bisa diedit/dihapus?**
> J: Setiap produk punya ID unik. Saat edit/hapus, saya kirim ID-nya ke backend, lalu backend cari data itu di database dan mengubah/menghapusnya.

---

### 🧑‍💻 ALFIN
**T: Kamu ngerjain bagian apa?**
> J: Saya bikin **ringkasan revenue & statistik**, **tampilan grid produk**, dan **daftar user**.

**T: Gimana cara ngitung total revenue-nya?**
> J: Saya ambil semua data transaksi dari database, lalu saya jumlahkan pakai fungsi `reduce` di JavaScript — dipisah antara pemasukan dan pengeluaran.

**T: Kenapa produk ditampilkan grid?**
> J: Biar rapi & responsif. Saya pakai layout grid CSS supaya kartu produk tersusun otomatis sesuai lebar layar.

---

### 🧑‍💻 ZAXLEE
**T: Kamu ngerjain bagian apa?**
> J: Saya bikin **grafik pengeluaran**, halaman **detail produk**, dan fitur **profil/edit user**.

**T: Gimana cara bikin grafiknya?**
> J: Saya ambil data pengeluaran dari database, lalu saya olah dan tampilkan dalam bentuk visual grafik biar mudah dianalisa.

**T: Gimana halaman detail produk muncul?**
> J: Saat produk diklik, saya ambil detail lengkapnya berdasarkan ID produk, lalu ditampilkan di halaman/popup detail.

---

### 🧑‍💻 KADEK
**T: Kamu ngerjain bagian apa?**
> J: Saya bikin fitur **pencarian dan filter** untuk produk, transaksi, dan user.

**T: Gimana cara kerja fitur search-nya?**
> J: Saya pakai fungsi `filter` di JavaScript. Setiap huruf yang diketik user langsung dicocokkan dengan data, jadi hasilnya tampil real-time tanpa reload.

**T: Bedanya filter sama search?**
> J: Search itu cari berdasarkan ketikan nama, kalau filter itu menyaring berdasarkan pilihan kategori atau tanggal.

---

### 🧑‍💻 NABIL
**T: Kamu ngerjain bagian apa?**
> J: Saya bikin **Landing Page/Home**, **kategori produk**, dan halaman **Tentang Kami/FAQ**.

**T: Gimana cara bikin FAQ yang bisa buka-tutup?**
> J: Saya pakai fitur *state* di React (accordion). Jadi saat pertanyaan diklik, jawabannya muncul, dan kalau diklik lagi jawabannya tersembunyi.

**T: Fungsi landing page apa?**
> J: Sebagai halaman perkenalan pertama biar pengunjung tertarik dan percaya sebelum lihat produk.

> [!IMPORTANT]
> Kalau ditanya sesuatu di luar bagianmu, jawab jujur: *"Itu bagian teman saya, [nama], biar dia yang jelaskan."* Ini normal dan nggak ngurangin nilai.
