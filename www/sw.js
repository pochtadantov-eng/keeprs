// Service worker for the Кошелёк PWA — offline-first.
const CACHE = "koshelek-v36";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./fonts/Firs-Keeper-Var.ttf",
  "./fonts/montserrat-cyrillic.woff2",
  "./fonts/montserrat-latin.woff2",
  "./fonts/onest-cyrillic-wght-normal.woff2",
  "./fonts/onest-latin-wght-normal.woff2",
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
  "./img/tk-aapl.webp",
  "./img/tk-amzn.webp",
  "./img/tk-atf.webp",
  "./img/tk-cbbtc.webp",
  "./img/tk-cherry.webp",
  "./img/tk-coin.webp",
  "./img/tk-dogs.webp",
  "./img/tk-durev.webp",
  "./img/tk-dust.webp",
  "./img/tk-evaa.webp",
  "./img/tk-googl.webp",
  "./img/tk-gram.webp",
  "./img/tk-grc.webp",
  "./img/tk-hmstr.webp",
  "./img/tk-major.webp",
  "./img/tk-not.webp",
  "./img/tk-nvda.webp",
  "./img/tk-redo.webp",
  "./img/tk-spy.webp",
  "./img/tk-ston.webp",
  "./img/tk-storm.webp",
  "./img/tk-tac.webp",
  "./img/tk-tsla.webp",
  "./img/tk-tsusde.webp",
  "./img/tk-usde.webp",
  "./img/tk-usdt.webp",
  "./img/tk-utya.webp",
  "./img/tk-weth.webp",
  "./img/tk-xaut.webp",
  "./img/tk-xrock.webp",
  "./img/ap-chunk.webp",
  "./img/ap-coindrop.webp",
  "./img/ap-dedust.webp",
  "./img/ap-getgems.webp",
  "./img/ap-marketapp.webp",
  "./img/ap-mercuryo.webp",
  "./img/ap-outlinevpn.webp",
  "./img/ap-playwallet.webp",
  "./img/ap-polyfox.webp",
  "./img/ap-polymarket.webp",
  "./img/ap-simpleswap.webp",
  "./img/ap-split.webp",
  "./img/ap-ston.webp",
  "./img/ap-storm.webp",
  "./img/ap-swapcoffee.webp",
  "./img/ap-tokenstore.webp",
  "./img/ap-tonmobile.webp",
  "./img/ap-tonviewer.webp",
  "./img/ap-tonvpn.webp",
  "./img/ap-upscale.webp",
  "./img/ap-xstocks.webp",
  "./img/bn-apy.webp",
  "./img/bn-news.webp",
  "./img/bn-num888.webp",
  "./img/bn-stars.webp",
  "./img/bn-ston.webp",
  "./img/bn-travel.webp",
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
