<div align="center">

# aedocu

**Alat PDF modern, cepat, dan aman yang berjalan sepenuhnya di perangkatmu.**  
*Tanpa upload · Tanpa batas · Tanpa akun · Tanpa iklan · Siap Offline (PWA)*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkiicodee%2Faedocu)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-success.svg)](manifest.webmanifest)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-green.svg)](#keamanan--privasi)

**Repositori:** [github.com/kiicodee/aedocu](https://github.com/kiicodee/aedocu)

</div>

---

## ⚡ Keunggulan Utama

- **100% Privasi & Tanpa Upload**: Seluruh proses pemotongan, kompresi, konversi, dan penggabungan berkas dieksekusi langsung di browser melalui WebAssembly & JavaScript. Nol (0) byte file dikirim ke server.
- **Desain Modern Apple-Inspired**: Antarmuka Dark Glassmorphism yang elegan, tipografi bersih dengan font *Inter* dan *JetBrains Mono*, transisi mulus, dan responsif di desktop maupun smartphone.
- **Dukungan Offline PWA**: Dilengkapi Service Worker dan Web App Manifest. Cukup buka sekali dan pasang (*Install as App*) di Chrome, Safari (iOS), atau Edge untuk dipakai saat tanpa koneksi internet.
- **Siap Deploy ke Vercel**: Dilengkapi konfigurasi `vercel.json` bawaan dengan pengaturan routing, trailing slash, dan headers Service Worker yang optimal.

---

## 🛠️ Daftar Alat

| Alat | Alamat | Deskripsi Fungsi |
|---|---|---|
| **Kompres PDF** | [`/tools/kompres/`](tools/kompres/) | Kecilkan ukuran PDF ke target ukuran spesifik (misal 200 KB, 2 MB). Teks & tautan tetap utuh. |
| **Gabung PDF** | [`/tools/gabung/`](tools/gabung/) | Satukan banyak berkas PDF menjadi satu dengan urutan drag & drop visual. |
| **Pisah PDF** | [`/tools/pisah/`](tools/pisah/) | Ekstrak rentang halaman tertentu (`1-3, 5`) atau pecah menjadi satu PDF per halaman (ZIP). |
| **Atur Halaman** | [`/tools/atur-halaman/`](tools/atur-halaman/) | Putar orientasi, hapus, dan atur ulang urutan halaman dengan pratinjau thumbnail instan. |
| **Gambar ke PDF** | [`/tools/gambar-ke-pdf/`](tools/gambar-ke-pdf/) | Ubah JPG/PNG menjadi dokumen PDF rapi: format A4, F4/Folio, Letter, atau sesuai ukuran gambar. |
| **PDF ke Gambar** | [`/tools/pdf-ke-gambar/`](tools/pdf-ke-gambar/) | Ekstrak tiap halaman PDF menjadi format JPG/PNG berkualitas tinggi (dikemas dalam ZIP). |
| **Word ke PDF** | [`/tools/word-ke-pdf/`](tools/word-ke-pdf/) | Ubah dokumen `.docx` menjadi PDF dengan layout presisi dan font Calibri/Times/Arial tertanam. |
| **PDF ke Word** | [`/tools/pdf-ke-word/`](tools/pdf-ke-word/) | Konversi PDF ke file `.docx` yang bisa diedit langsung (paragraf, format teks, gambar). |

---

## 📁 Struktur Proyek

```
aedocu/
├── index.html               # Halaman katalog utama
├── manifest.webmanifest     # Konfigurasi PWA (Web App Manifest)
├── sw.js                    # Service Worker (offline-first caching)
├── vercel.json              # Konfigurasi deployment Vercel
├── design.md                # Dokumentasi spesifikasi sistem desain
├── icons/                   # Aset ikon aplikasi modern (PNG, SVG, Favicon, ICO)
├── src/                     # Shared module & design system
│   ├── aedocu.css           # CSS sistem desain dark glassmorphism
│   ├── aedocu.js            # Custom element <aedocu-top> & <aedocu-foot>, helper, PWA
│   ├── pdf-alat.js          # Utilitas PDF (drag & drop, modal pratinjau, thumbnail)
│   ├── pdf-ke-word.js       # Mesin konverter PDF ke .docx
│   ├── word-ke-pdf.js       # Mesin konverter Word ke PDF
│   ├── ttf-subset.js        # TrueType subsetter generator
│   └── zip.js               # Library pembuat ZIP di browser
└── tools/                   # Direktori modular setiap alat
    ├── atur-halaman/
    ├── gabung/
    ├── gambar-ke-pdf/
    ├── kompres/
    ├── pdf-ke-gambar/
    ├── pdf-ke-word/
    ├── pisah/
    └── word-ke-pdf/
```

---

## 🚀 Menjalankan Secara Lokal

Proyek ini tidak memerlukan dependensi berat atau kompilasi rumit. Cukup gunakan Node.js:

```bash
# Clone repositori
git clone https://github.com/kiicodee/aedocu.git
cd aedocu

# Jalankan server lokal
npm start
# atau
node server.js
```

Buka browser di **`http://localhost:3000/`**.

---

## ☁️ Deployment

### 1. Deploy ke Vercel (Rekomendasi)
Proyek ini sudah dilengkapi file [`vercel.json`](vercel.json):
1. Masuk ke [Vercel Dashboard](https://vercel.com).
2. Pilih **Add New** → **Project**.
3. Hubungkan ke repositori `kiicodee/aedocu`.
4. Pilih Framework Preset: **Other** (Static).
5. Klik **Deploy**.

### 2. GitHub Pages
Workflow bawaan sudah tersedia di [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Setiap kali kamu melakukan `git push` ke branch `main`, GitHub Pages akan ter-deploy secara otomatis.

---

## 🔒 Keamanan & Privasi

1. **Client-side Processing**: Seluruh algoritma berjalan di memori browser pengguna (`pdf-lib`, `pdf.js`, canvas, dll.).
2. **Tidak Ada Database / Backend Penyimpanan**: Server hanya bertugas mengirimkan file HTML/CSS/JS statis.
3. **Aman untuk Dokumen Rahasia**: Surat penting, ijazah, KTP, atau laporan keuangan aman diproses karena dokumen tidak pernah meninggalkan laptop/HP kamu.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi [MIT](LICENSE). Dibuat dengan dedikasi untuk produktivitas dokumen yang cepat, bebas hambatan, dan berpusat pada privasi.
