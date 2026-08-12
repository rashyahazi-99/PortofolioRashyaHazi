# 🚀 Panduan Deployment ke GitHub Pages

Selamat! Website Portofolio milikmu sekarang sudah siap sepenuhnya di sisi kodingan lokal (HTML, CSS, JS). Langkah terakhir agar portofolio ini bisa diakses siapa saja lewat internet adalah dengan mengunggahnya (*deploy*) ke **GitHub Pages**. 

Proses ini 100% gratis dan sangat cocok untuk memamerkan portofoliomu.

## Langkah-langkah Lengkap

### 1. Buat Repository di GitHub
1. Buka browser dan login ke akun [GitHub](https://github.com/).
2. Di pojok kanan atas, klik tombol **+** lalu pilih **New repository**.
3. Beri nama repository, misalnya: `portofolio-rashya`.
4. Pastikan opsi **Public** terpilih (agar website bisa online).
5. Kosongkan centang pada `Add a README file` (biarkan kosong dulu).
6. Klik tombol **Create repository**.

### 2. Upload File Kodingan Kamu
Setelah repository terbuat, GitHub akan menampilkan beberapa opsi. Karena kita sudah punya file lokal:
1. Klik teks **"uploading an existing file"** di bawah tulisan *Quick setup*.
2. Buka folder projekmu di komputer (`d:\kuliah\semester 1\Pemrograman Web\Project_Portopolio`).
3. Tarik (Drag & Drop) semua file dan folder berikut ke dalam halaman GitHub:
   - `assets/` (folder)
   - `index.html`
   - `Rashya.jpeg`
   - `rancangan.md` (opsional)
4. Tunggu proses upload selesai.
5. Pada bagian **Commit changes** di bawah, klik tombol hijau **Commit changes**.

### 3. Aktifkan Fitur GitHub Pages
Sekarang file kamu sudah ada di GitHub, saatnya mengaktifkan servernya!
1. Di halaman repository kamu, klik tab **⚙️ Settings** di deretan menu atas.
2. Di menu sebelah kiri, cari dan klik opsi **Pages**.
3. Pada bagian **Build and deployment**:
   - Bagian *Source*, biarkan **Deploy from a branch**.
   - Bagian *Branch*, ubah dari `None` menjadi **main** (atau **master**).
   - Klik **Save**.
4. Tunggu sekitar 1–3 menit. GitHub sedang menyiapkan server (akan ada indikator warna kuning berputar, atau kamu bisa *refresh* halaman).
5. Jika berhasil, kamu akan melihat notifikasi berwarna hijau di bagian atas halaman bertuliskan:
   👉 *"Your site is live at https://usernamekamu.github.io/portofolio-rashya/"*

### 4. Selesai! 🎉
Website kamu sekarang sudah online! Bagikan link URL tersebut ke perekrut, guru, teman-teman, atau taruh di bio Instagram milikmu.

---
**Tips Tambahan:**
Jika ke depannya kamu mengedit file (misalnya mengganti teks di `index.html`), kamu tinggal masuk ke repository GitHub kamu, klik file tersebut, lalu klik ikon **Pensil (Edit)**, lakukan perubahan, dan klik **Commit changes**. Website yang online akan otomatis terupdate dalam hitungan detik!
