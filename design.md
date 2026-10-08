# Design System — aemail

> Apple-inspired dark UI design system untuk project **aemail** (Temporary Email Client).  
> File referensi: [`public/style.css`](public/style.css) · [`public/index.html`](public/index.html)

---

## 1. Filosofi Desain

Design system ini mengadopsi estetika **Apple Human Interface Guidelines** yang dipadukan dengan gaya **glassmorphism** modern:

- **Dark-first** — background hitam murni sebagai kanvas utama.
- **Vibrancy & Depth** — elemen kaca translucent dengan `backdrop-filter` untuk menciptakan kedalaman visual.
- **Minimalism** — tipografi bersih, ruang putih cukup, hierarki konten yang jelas.
- **Micro-animations** — transisi halus yang memberi feedback interaktif tanpa mengganggu.

---

## 2. Color Tokens

Semua warna didefinisikan sebagai CSS Custom Properties di `:root`.

### Background

| Token | Value | Kegunaan |
|---|---|---|
| `--bg-dark` | `#000000` | Background utama halaman |
| `--bg-surface` | `rgba(22, 22, 23, 0.8)` | Surface card utama |
| `--bg-surface-secondary` | `rgba(28, 28, 30, 0.7)` | Surface sekunder / nested |

### Accent & Semantic Colors

| Token | Value | Kegunaan |
|---|---|---|
| `--primary` | `#0071e3` | Apple Blue — CTA utama, focus ring, active state |
| `--primary-hover` | `#147ce5` | Hover state dari primary |
| `--secondary` | `rgba(255,255,255,0.08)` | Tombol sekunder / surface interaktif |
| `--secondary-hover` | `rgba(255,255,255,0.12)` | Hover state secondary |
| `--success` | `#30d158` | iOS Green — status "Live", indikator sukses |
| `--danger` | `#ff453a` | iOS Red — hapus, aksi destruktif |
| `--accent` | `#bf5af2` | iOS Purple — decorative orb, aksen visual |

### Border

| Token | Value | Kegunaan |
|---|---|---|
| `--border-color` | `rgba(255,255,255,0.08)` | Divider, border card, separator panel |

### Typography Colors

| Token | Value | Kegunaan |
|---|---|---|
| `--text-primary` | `#f5f5f7` | Teks utama / heading |
| `--text-secondary` | `#86868b` | Label, metadata, placeholder |
| `--text-muted` | `#48484a` | Teks sangat redup / disabled |

---

## 3. Typography

### Font Stack

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

Font utama adalah **Inter** (dimuat dari Google Fonts dengan weight 300–700).  
Font fallback mengikuti system font stack Apple/Windows untuk rendering native yang optimal.

Font sekunder **Plus Jakarta Sans** juga dimuat tetapi saat ini digunakan sebagai cadangan.

### Skala Ukuran

| Ukuran | Konteks |
|---|---|
| `10px` | Timestamp, helper text, badge |
| `11px` | Label uppercase, form help, toast |
| `12px` | Meta data, sub-label, tab button |
| `13px` | Body kecil, item list, dropdown |
| `14px` | Panel title, nav label |
| `15–16px` | Input field, heading section |
| `17–18px` | Heading card, subject email |
| `20px` | Brand / logo name |

### Font Weight

- `400` — regular body
- `500` — medium (label, button, metadata)
- `600` — semibold (heading, brand, panel title)

---

## 4. Spacing & Border Radius

### Border Radius

| Token | Value | Digunakan pada |
|---|---|---|
| `--radius-lg` | `16px` | Card utama (`.glass`) |
| `--radius-md` | `12px` | Input wrapper, email item, dropdown |
| `--radius-sm` | `8px` | Form input, badge kecil |
| `980px` (capsule) | — | Tombol, toast, status indicator |

### Spacing System (non-tokenized)

Spacing menggunakan nilai standar berbasis 4px:

`4px · 6px · 8px · 10px · 12px · 14px · 16px · 20px · 24px · 32px · 40px`

---

## 5. Komponen UI

### 5.1 `.glass` — Glassmorphism Card

Kelas utama untuk semua card / panel di aplikasi.

```css
background: rgba(22, 22, 23, 0.42);
backdrop-filter: blur(35px) saturate(220%);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: var(--radius-lg);
box-shadow:
  inset 0 1px 1px 0 rgba(255, 255, 255, 0.15),
  0 12px 40px 0 rgba(0, 0, 0, 0.5);
```

Hover state mempertegas border dan inset highlight untuk kesan "mengangkat".

---

### 5.2 `.btn` — Button System

Semua tombol menggunakan capsule shape (`border-radius: 980px`) dan transisi smooth.

| Variant | Class | Tampilan |
|---|---|---|
| Primary | `.btn-primary` | Biru solid `#0071e3`, teks putih |
| Secondary | `.btn-secondary` | Frosted glass putih 8% opacity |
| Accent | `.btn-accent` | Putih solid `rgba(255,255,255,0.94)`, teks hitam |
| Danger | `.btn-danger` | Merah transparan → solid merah saat hover |

Size modifier: `.btn-sm` (padding lebih kecil, font 12px).

Active state: `transform: scale(0.97)` untuk feedback taktil.

---

### 5.3 Status Indicator

Badge live status di header menggunakan warna `--success` dengan animasi **ping**:

```css
@keyframes ping {
  0%   { transform: scale(1); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}
```

---

### 5.4 `.input-wrapper` — Input Field

Input dibungkus container frosted glass dengan focus ring biru:

```css
/* Focus state */
border-color: var(--primary);
box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.2);
```

Mengandung: text input, history button, domain suffix label.

---

### 5.5 History Dropdown

Dropdown absolut yang muncul di bawah input, menggunakan glass style yang lebih gelap:

```css
background: rgba(18, 18, 19, 0.97);
backdrop-filter: blur(25px) saturate(200%);
```

Berisi: header, daftar item scroll (`max-height: 180px`), footer dengan clear history.

---

### 5.6 Workspace Grid

Layout dua-kolom utama:

```css
grid-template-columns: 340px 1fr;
gap: 24px;
```

- **Inbox Panel** (kiri, 340px) — daftar email
- **Detail Panel** (kanan, flex 1) — konten email terpilih

Tinggi fixed: `height: 580px` agar area scroll terkontrol.

---

### 5.7 Email List Item (`.email-item`)

State visual item list:

| State | Style |
|---|---|
| Default | Background transparan, border transparan |
| Hover | `background: rgba(255,255,255,0.04)` |
| Active | `background: rgba(0,113,227,0.15)`, border biru 25% |

Konten: sender (truncate), timestamp, subject (truncate), snippet (2-line clamp).

---

### 5.8 Detail Panel States

| State | Komponen |
|---|---|
| Kosong | `.detail-placeholder` — icon `mail-open`, teks instruksi |
| Terisi | `.detail-content` — header, tab, body |

Tab view email: **Formatted** (iframe sandboxed) · **Plain Text** (`<pre>`) · **Raw Headers** (`<pre>`).

---

### 5.9 Modal

Overlay dengan `backdrop-filter: blur(16px)` + background hitam 70%.

Modal card menggunakan `.glass` dengan `max-width: 440px`.

Terdapat 3 modal:
1. **Settings** — konfigurasi domain & API endpoint
2. **Create Custom Address** — input prefix email baru
3. **Confirm** — dialog konfirmasi aksi destruktif (reusable)

---

### 5.10 Toast Notification

Capsule toast yang muncul di `bottom: 24px`, center-horizontal:

```css
background: rgba(30, 30, 30, 0.85);
backdrop-filter: blur(20px);
border-radius: 980px;
```

Animasi masuk: slide dari bawah + fade in (`toast-in`).

---

### 5.11 Radar Ping (Empty State)

Animasi 3 lingkaran konsentris yang memudar keluar, menandakan "menunggu email":

```css
@keyframes radar {
  0%   { transform: scale(0.6); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}
/* Delay: 0s, 0.8s, 1.6s per lingkaran */
```

---

## 6. Background Decoration

Dua **glow orb** absolut sebagai ambient lighting latar:

| Orb | Warna | Posisi |
|---|---|---|
| `orb-1` | Biru `#0071e3` — 35% opacity | Kanan atas (`top: -200px, right: -100px`) |
| `orb-2` | Ungu `#bf5af2` — 30% opacity | Kiri bawah (`bottom: -150px, left: -100px`) |

Keduanya menggunakan `filter: blur(140px)` dan `z-index: -1`.

---

## 7. Transition & Animation

| Token | Value | Digunakan pada |
|---|---|---|
| `--transition-smooth` | `all 0.25s cubic-bezier(0.25, 1, 0.5, 1)` | Semua elemen interaktif |

Curve `cubic-bezier(0.25, 1, 0.5, 1)` adalah **ease-out spring** — responsif di awal, smooth di akhir, memberi kesan fisik alami.

---

## 8. Responsive Breakpoints

| Breakpoint | Perubahan |
|---|---|
| `<= 992px` | Input group jadi vertikal; action buttons jadi 2-kolom grid |
| `<= 820px` | Workspace grid jadi 1 kolom; inbox & detail toggle (mobile view) |
| `<= 580px` | Padding container dikurangi; font input lebih kecil |
| `<= 480px` | Header stack vertikal; subject line stack vertikal; modal padding dikurangi |

Di mobile (`<= 820px`), navigasi antara inbox dan detail menggunakan class toggle `.show-detail` pada `.workspace-grid`, dengan back button (`#backBtn`) yang hanya tampil di mobile.

---

## 9. Custom Scrollbar

```css
::-webkit-scrollbar       { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
```

---

## 10. Struktur HTML Utama

```
.page-wrapper
+-- .glow-orb.orb-1
+-- .glow-orb.orb-2
+-- .app-container
    +-- <header>.app-header
    |   +-- .brand (logo + h1)
    |   +-- .header-actions (settings btn + status indicator)
    +-- <main>.app-main
        +-- <section>.generator-card.glass
        |   +-- .generator-header
        |   +-- .email-input-group
        |       +-- .input-container
        |       |   +-- .input-wrapper (input + history-btn + domain)
        |       |   +-- #historyDropdown.glass
        |       +-- .action-buttons (Copy, Refresh, New, Random)
        +-- .workspace-grid
            +-- <section>.inbox-panel.glass
            |   +-- .panel-header
            |   +-- .email-list
            |       +-- .loading-state
            |       +-- .empty-state (radar ping)
            |       +-- .list-items (email-item x n)
            +-- <section>.detail-panel.glass
                +-- .detail-placeholder
                +-- .detail-content
                    +-- .detail-header (subject + metadata)
                    +-- .detail-tabs (Formatted / Text / Headers)
                    +-- .body-container
                        +-- #panelFormatted (iframe)
                        +-- #panelText (pre)
                        +-- #panelHeaders (pre)

[Modals -- outside .app-container]
+-- #settingsModal.modal-overlay
+-- #newAddressModal.modal-overlay
+-- #confirmModal.modal-overlay

[Toast]
+-- #toast.toast
```

---

## 11. Icon System

Menggunakan **Lucide Icons** (CDN: `unpkg.com/lucide@latest`), di-render via `lucide.createIcons()`.

Icon-icon yang dipakai:

| Icon | Konteks |
|---|---|
| `mail` | Brand logo, empty state |
| `mail-open` | Detail placeholder |
| `settings` | Tombol header |
| `history` | History button di input |
| `copy` | Salin alamat email |
| `refresh-cw` | Refresh inbox |
| `plus` | New address |
| `dices` | Generate random |
| `inbox` | Panel header inbox |
| `chevron-left` | Back button mobile |
| `trash-2` | Delete email |
| `check-circle` | Toast success |
