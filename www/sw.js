// Service worker for the Кошелёк PWA — offline-first.
const CACHE = "koshelek-v21";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./fonts/TT-Firs-Neue-Trial-Var-Roman.ttf",
  "./fonts/montserrat-cyrillic.woff2",
  "./fonts/montserrat-latin.woff2",
  "./fonts/onest-cyrillic-wght-normal.woff2",
  "./fonts/onest-latin-wght-normal.woff2",
  "./img/a-bitrefill.webp",
  "./img/a-ston.webp",
  "./img/a-storm.webp",
  "./img/a-swapcoffee.webp",
  "./img/a-tokenstore.webp",
  "./img/a-tonmobile.webp",
  "./img/a-tonvpn.webp",
  "./img/a-upscale.webp",
  "./img/banner.webp",
  "./img/flag-us.webp",
  "./img/nft-art.webp",
  "./img/nft-card.webp",
  "./img/o-applepay.webp",
  "./img/o-buy-gram.webp",
  "./img/o-recv-tokens.webp",
  "./img/o-sell-card.webp",
  "./img/o-send-tokens.webp",
  "./img/o-tonstakers.webp",
  "./img/o-usdt-swap.webp",
  "./img/o-usdt-transfer.webp",
  "./img/pk-gram.webp",
  "./img/pk-trx.webp",
  "./img/pk-usdt-trc.webp",
  "./img/s-aapl.webp",
  "./img/s-amzn.webp",
  "./img/s-coin.webp",
  "./img/s-crcl.webp",
  "./img/s-googl.webp",
  "./img/s-nvda.webp",
  "./img/s-tsla.webp",
  "./img/s-xaut.webp",
  "./img/t-atf.webp",
  "./img/t-evaa.webp",
  "./img/t-groyp.webp",
  "./img/t-not.webp",
  "./img/t-px.webp",
  "./img/t-redo.webp",
  "./img/t-sp.webp",
  "./img/t-utya.webp",
  "./img/verified.webp",
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
