// Service worker aedocu: simpan semua alat supaya tetap jalan tanpa internet.
const CACHE = "aedocu-v2";
const PAGES = ["./", "./tools/kompres/", "./tools/gabung/", "./tools/pisah/", "./tools/atur-halaman/", "./tools/gambar-ke-pdf/", "./tools/pdf-ke-gambar/", "./tools/word-ke-pdf/", "./tools/pdf-ke-word/"];
const CORE = [...PAGES,
  "./src/aedocu.css", "./src/aedocu.js", "./src/pdf-alat.js", "./src/zip.js",
  "./src/word-ke-pdf.js", "./src/ttf-subset.js", "./src/pdf-ke-word.js",
  "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon-32.png", "./icons/apple-touch-icon.png", "./icons/favicon.svg", "./icons/icon.svg",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdn.jsdelivr.net/npm/docx-preview@0.4.1/dist/docx-preview.min.js"];
const SKIP = /googletagmanager|google-analytics|analytics\.google|goatcounter|gc\.zgo\.at/;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
function pageKey(url) {
  const u = new URL(url);
  return u.origin + u.pathname.replace(/index\.html$/, "");
}
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || SKIP.test(req.url)) return;
  if (req.mode === "navigate") {
    const key = pageKey(req.url);
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(key, copy)); } return r; })
      .catch(() => caches.match(key).then((hit) => hit || caches.match(new URL("./", self.registration.scope).href))));
    return;
  }
  if (new URL(req.url).origin === self.location.origin) {
    e.respondWith(fetch(req).then((r) => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => {
    const net = fetch(req).then((r) => { if (r && (r.ok || r.type === "opaque")) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
