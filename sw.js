// Service worker Mampat: simpan semua alat supaya tetap jalan tanpa internet.
const CACHE = "mampat-v6";
const PAGES = ["./", "./kompres/", "./gabung/", "./pisah/", "./atur-halaman/", "./gambar-ke-pdf/", "./pdf-ke-gambar/"];
const CORE = [...PAGES,
  "./assets/mampat.css", "./assets/mampat.js", "./assets/pdf-alat.js", "./assets/zip.js",
  "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./favicon-32.png", "./apple-touch-icon.png",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"];
const SKIP = /googletagmanager|google-analytics|analytics\.google|goatcounter|gc\.zgo\.at/;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// alamat halaman tanpa ?query dan tanpa index.html, supaya /gabung/, /gabung/index.html, /gabung/?x sama
function pageKey(url) {
  const u = new URL(url);
  return u.origin + u.pathname.replace(/index\.html$/, "");
}
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || SKIP.test(req.url)) return;
  if (req.mode === "navigate") {
    // halaman: ambil versi terbaru kalau online, pakai simpanan halaman yang sama kalau offline
    const key = pageKey(req.url);
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(key, copy)); } return r; })
      .catch(() => caches.match(key).then((hit) => hit || caches.match(new URL("./", self.registration.scope).href))));
    return;
  }
  // file bersama, library, font, ikon: pakai simpanan, perbarui di belakang layar
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((r) => { if (r && (r.ok || r.type === "opaque")) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
