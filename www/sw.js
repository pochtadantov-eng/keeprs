// Service worker for the Кошелёк PWA — offline-first.
const CACHE = "koshelek-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./fonts/mulish-cyrillic-400-normal.woff2",
  "./fonts/mulish-latin-400-normal.woff2",
  "./fonts/mulish-cyrillic-500-normal.woff2",
  "./fonts/mulish-latin-500-normal.woff2",
  "./fonts/mulish-cyrillic-600-normal.woff2",
  "./fonts/mulish-latin-600-normal.woff2",
  "./fonts/mulish-cyrillic-700-normal.woff2",
  "./fonts/mulish-latin-700-normal.woff2",
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
