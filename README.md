# mampat

Alat PDF yang jalan sepenuhnya di browser: tanpa upload, tanpa batas, tanpa akun, tanpa iklan, dan tetap bisa dipakai offline setelah dibuka sekali.

Live: https://zakycahyohadi.github.io/mampat/

## Alat

| Alat | Alamat | Fungsi |
|---|---|---|
| Kompres PDF | [`/kompres/`](https://zakycahyohadi.github.io/mampat/kompres/) | Kecilkan PDF ke ukuran yang kamu tentukan, teks dan link tetap utuh |
| Gabung PDF | [`/gabung/`](https://zakycahyohadi.github.io/mampat/gabung/) | Satukan beberapa PDF, urutan diatur dengan drag |
| Pisah PDF | [`/pisah/`](https://zakycahyohadi.github.io/mampat/pisah/) | Ambil halaman tertentu (`1-3, 5`) atau pisah per halaman (ZIP) |
| Atur Halaman | [`/atur-halaman/`](https://zakycahyohadi.github.io/mampat/atur-halaman/) | Putar, hapus, dan urutkan ulang halaman dengan thumbnail |
| Gambar ke PDF | [`/gambar-ke-pdf/`](https://zakycahyohadi.github.io/mampat/gambar-ke-pdf/) | JPG/PNG jadi satu PDF: A4, F4/Folio, Letter, atau ikuti gambar |
| PDF ke Gambar | [`/pdf-ke-gambar/`](https://zakycahyohadi.github.io/mampat/pdf-ke-gambar/) | Setiap halaman jadi JPG atau PNG, banyak halaman jadi ZIP |
| Word ke PDF | [`/word-ke-pdf/`](https://zakycahyohadi.github.io/mampat/word-ke-pdf/) | .docx jadi PDF: teks bisa dipilih, link bisa diklik, font kembaran Calibri/Times/Arial ditanam |
| PDF ke Word | [`/pdf-ke-word/`](https://zakycahyohadi.github.io/mampat/pdf-ke-word/) | PDF jadi .docx yang bisa diedit: paragraf, tebal/miring, warna, link, tab, dan gambar |

## Struktur

- `index.html`: beranda (daftar alat)
- `<alat>/index.html`: satu halaman per alat, hanya memuat library yang dibutuhkan
- `assets/mampat.css`, `assets/mampat.js`: gaya, header/menu, analytics GoatCounter, simpan file (dipakai semua halaman)
- `assets/pdf-alat.js`: pilih file, thumbnail, drag urutan, rentang halaman (alat PDF selain kompres)
- `assets/zip.js`: penulis ZIP kecil (CRC32, nama file UTF-8), juga dipakai untuk menulis .docx
- `assets/word-ke-pdf.js` + `assets/ttf-subset.js`: Word → PDF (docx-preview menyusun halaman, teks digambar ulang dengan font yang dipotong sendiri)
- `assets/pdf-ke-word.js`: PDF → Word (teks disusun ulang jadi paragraf, gambar diambil dari PDF)
- `sw.js`: service worker untuk offline; naikkan versi `CACHE` setiap ada perubahan
- Library: pdf-lib 1.17.1, pdf.js 3.11.174, JSZip 3.10.1 (cdnjs); docx-preview 0.4.1 dan font Carlito/Caladea/Tinos/Arimo/Cousine (jsDelivr)

Statistik pengunjung: GoatCounter (`GOATCOUNTER` di `assets/mampat.js`), event `mampat/<alat>/<aksi>`, tanpa nama atau isi file.

Di-deploy otomatis ke GitHub Pages lewat GitHub Actions setiap push ke `main`.
