# Product Requirements Document (PRD)
**Proyek:** Website Portofolio Interaktif
**Klien/Pemilik:** Rashya Hazimulfikri Widyadhana
**Platform:** Web (Responsif - Mobile & Desktop)

---

## 1. Visi & Tujuan
Membangun sebuah website portofolio yang **modern, clean, dan profesional** dengan sentuhan estetika Gen-Z (seperti *glassmorphism*, warna kontras, dan gradien yang *sleek*). Website ini bertujuan untuk menampilkan profil pribadi, keahlian, pengalaman, serta galeri kegiatan secara dinamis mengambil data dari database, untuk memberikan kesan premium kepada pengunjung atau perekrut.

## 2. Tech Stack (Teknologi yang Digunakan)
*   **Frontend**: HTML5 (Semantik), CSS3 (Modern, Flexbox/Grid, Variabel CSS), JavaScript (Vanilla ES6+).
*   **Backend & Database**: Supabase (PostgreSQL untuk data, Supabase Storage untuk menyimpan file foto).
*   **Hosting/Deployment**: GitHub Pages (Gratis, mudah terintegrasi dengan repository GitHub).

## 3. Struktur Folder (Direktori Projek)
Struktur ini dirancang agar rapi, terukur (scalable), dan standar industri:

```text
Project_Portopolio/
│
├── index.html              # Halaman Utama
├── rancangan.md            # Dokumen PRD (File ini)
│
├── assets/                 # Folder untuk semua aset statis
│   ├── css/
│   │   ├── style.css       # Styling utama (Warna, Layout, Animasi)
│   │   └── glass.css       # (Opsional) Khusus efek glassmorphism
│   │
│   ├── js/
│   │   ├── main.js         # Logika interaksi UI (animasi, navbar, dll)
│   │   └── supabase.js     # Konfigurasi & fungsi fetch data dari Supabase
│   │
│   ├── images/             # Gambar lokal (sebelum dipindah ke Supabase Storage)
│   │   ├── profile/        # Foto profil (Rashya.jpeg, dsb)
│   │   └── icons/          # Favicon dan ikon vektor (SVG)
│
└── components/             # (Opsional) Jika nanti ada bagian web yang dipisah
```

## 4. Konsep Desain (UI/UX)
Mengusung tema **"Cyber-Sleek & Glassmorphism"** yang sangat cocok untuk Gen-Z:
*   **Warna Dasar (Background)**: *Midnight Blue* kehitaman (`#0B0F19`) atau *Dark Charcoal* (`#121212`) untuk kesan premium.
*   **Warna Gradien (Aksen/Tombol)**: Gradasi *Neon Purple* (`#8A2BE2`) menuju *Cyan/Cyber Blue* (`#00D2FF`) untuk menonjolkan elemen penting.
*   **Tipografi**: Menggunakan font modern dari Google Fonts seperti **Plus Jakarta Sans**, **Outfit**, atau **Inter**.
*   **Efek Visual**: 
    *   *Glassmorphism* (Latar belakang transparan dengan efek blur pada kartu/kontainer).
    *   *Micro-animations* (Efek mengambang/hover saat kursor diarahkan ke kartu atau tombol).
    *   Kontras teks yang tinggi (Teks berwarna putih/abu-abu terang agar mudah dibaca di latar gelap).

## 5. Kebutuhan Fitur (Halaman & Seksi)
Halaman web akan mengusung konsep *Single Page Application* (Satu halaman memanjang ke bawah dengan *smooth scrolling*):
1.  **Navbar**: Sticky di atas dengan efek *blur*, memuat link navigasi (Home, About, Projects, Gallery, Contact).
2.  **Hero Section**: Sapaan utama, gelar/jurusan (Komputer Desain Grafis & Kesehatan), tombol *Call to Action* (CTA), dan foto profil utama yang estetik.
3.  **About Me (Data Diri)**: Deskripsi singkat tentang Rashya, asal, riwayat pendidikan, Hobi, dan Keahlian (diambil dari database).
4.  **Projects (Portofolio)**: Daftar karya/projek yang pernah dibuat (Desain grafis, web, dll). Tampil dalam bentuk kartu (*Cards*).
5.  **Activity Gallery (Galeri)**: *Grid* foto-foto kegiatan (bermain alam, acara sekolah, masak, dll).
6.  **Contact & Footer**: Tautan media sosial (Instagram), email, dan (opsional) form kontak sederhana.

## 6. Skema Database (Supabase PostgreSQL)
Berikut adalah struktur tabel yang perlu kita buat di database Supabase nantinya:

### Tabel 1: `personal_info` (Data Diri & Pengaturan)
Menyimpan data teks utama agar website bersifat dinamis.
*   `id` (uuid, Primary Key)
*   `full_name` (text) - *Contoh: Rashya Hazimulfikri W.*
*   `taglines` (text) - *Contoh: Komputer Desain Grafis | Kesehatan*
*   `bio_description` (text)
*   `profile_image_url` (text) - Link ke gambar di Supabase Storage
*   `instagram_url` (text)

### Tabel 2: `skills_and_hobbies`
*   `id` (uuid, Primary Key)
*   `type` (text) - *Nilai: 'skill' atau 'hobby'*
*   `name` (text) - *Contoh: 'Desain Grafis', 'Masak', 'Jelajah Alam'*
*   `icon_url` (text) - *(Opsional) Link ikon*

### Tabel 3: `projects` (Daftar Projek/Karya)
*   `id` (uuid, Primary Key)
*   `title` (text) - *Judul projek*
*   `description` (text) - *Deskripsi singkat projek*
*   `image_url` (text) - *Foto/Screenshot karya*
*   `project_date` (date)
*   `link` (text) - *(Opsional) Link ke projek terkait*

### Tabel 4: `activities_gallery` (Foto Kegiatan)
*   `id` (uuid, Primary Key)
*   `title` (text) - *Contoh: 'Jelajah Alam di Curug'*
*   `image_url` (text) - *Foto kegiatan*
*   `created_at` (timestamp)

### Tabel 5: `messages` (Tambahan Rekomendasi)
*(Opsional) Jika pengunjung web ingin mengirim pesan langsung lewat web.*
*   `id` (uuid, Primary Key)
*   `sender_name` (text)
*   `sender_email` (text)
*   `message_content` (text)
*   `created_at` (timestamp)

---
**Status Dokumen**: 🟢 Menunggu Persetujuan (Siap dieksekusi)
