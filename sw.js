/* ============================================================
   Togi DB — Service Worker
   Oflayn ishlash, kesh va yangilanish boshqaruvi.

   Kesh strategiyalari:
     navigatsiya (HTML) — network-first (3.5s timeout) + oflayn fallback
     css / js           — stale-while-revalidate
     mahsulot rasmlari  — cache-first, LRU cheklov bilan (360 fayl / 5.7MB)
     Google Fonts       — css: SWR, shrift fayllari: cache-first
   ============================================================ */

"use strict";

/* MUHIM: har deployda oshiring (v2 -> v3 ...).
   activate'da nomi mos kelmagan barcha "togidb-*" keshlar oʻchiriladi, shunda
   eski/keraksiz yozuvlar qolib ketmaydi. */
var VERSION = "v2";

var SHELL = "togidb-shell-" + VERSION;   // app shell (HTML/CSS/JS/ikonka)
var IMGS = "togidb-img-" + VERSION;      // mahsulot rasmlari
var FONTS = "togidb-font-" + VERSION;    // Google Fonts

var OURS = [SHELL, IMGS, FONTS];

/* Rasm keshidagi maksimal fayl soni. 360 tadan hammasi kerak emas —
   foydalanuvchi koʻrgani saqlanadi, eng eskisi siqib chiqariladi. */
var IMG_MAX = 180;

/* Tarmoq javobini shuncha kutamiz, keyin keshga tushamiz */
var NET_TIMEOUT = 3500;

var OFFLINE_URL = "./offline.html";

/* App shell — oʻrnatishda oldindan keshlanadi.
   admin.html ataylab yoʻq: u lokal vosita, oflayn kerak emas. */
var PRECACHE = [
  "./",
  "./index.html",
  "./category.html",
  "./product.html",
  "./configurator.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./css/style.css",
  "./css/shop.css",
  "./css/app.css",
  "./js/data.js",
  "./js/main.js",
  "./js/art.js",
  "./js/shop.js",
  "./js/configurator.js",
  "./js/app.js",
  "./assets/favicon.svg",
  "./assets/logo.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/maskable-192.png",
  "./assets/icons/maskable-512.png",
  "./assets/icons/apple-touch-icon.png"
];

/* ============================================================
   Install — app shell'ni keshlaymiz
   ============================================================ */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(SHELL).then(function (cache) {
      /* addAll "hammasi yoki hech nima" — bitta fayl 404 boʻlsa butun
         oʻrnatish yiqiladi. Shuning uchun bittalab qoʻshamiz. */
      return Promise.all(
        PRECACHE.map(function (url) {
          return cache.add(new Request(url, { cache: "reload" })).catch(function (err) {
            console.warn("[sw] precache oʻtkazib yuborildi:", url, err);
          });
        })
      );
    }).then(function () {
      /* Yangi SW darhol kutish holatiga oʻtadi; almashish faqat
         foydalanuvchi "Yangilash" bosganda (SKIP_WAITING xabari). */
      return undefined;
    })
  );
});

/* ============================================================
   Activate — eski versiya keshlarini tozalaymiz
   ============================================================ */
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (k) {
          /* Faqat oʻzimizning eski keshlarimizni oʻchiramiz */
          if (k.indexOf("togidb-") === 0 && OURS.indexOf(k) === -1) return caches.delete(k);
          return undefined;
        })
      );
    }).then(function () {
      if (self.registration.navigationPreload) {
        return self.registration.navigationPreload.enable().catch(function () {});
      }
      return undefined;
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ============================================================
   Xabarlar — sahifadan SW'ga
   ============================================================ */
self.addEventListener("message", function (e) {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

/* ============================================================
   Yordamchilar
   ============================================================ */

/* Keshni belgilangan fayl soniga qisqartiradi (eng eskisidan boshlab).
   cache.keys() qoʻshilish tartibida qaytaradi — shuning uchun FIFO/LRU'ga yaqin. */
function trimCache(name, max) {
  return caches.open(name).then(function (cache) {
    return cache.keys().then(function (keys) {
      if (keys.length <= max) return undefined;
      return Promise.all(
        keys.slice(0, keys.length - max).map(function (k) { return cache.delete(k); })
      );
    });
  });
}

/* Navigatsiya soʻrovi uchun kesh kaliti — query olib tashlanadi */
function keyFor(req) {
  var u = new URL(req.url);
  return new Request(u.origin + u.pathname);
}

/* Javob keshlashga yaroqlimi? */
function cacheable(res) {
  /* opaque (type: "opaque") javob — status 0, ichini koʻra olmaymiz.
     Shriftlar crossorigin bilan soʻralgani uchun "cors" boʻladi. */
  return res && res.status === 200 && (res.type === "basic" || res.type === "cors");
}

/* Tarmoqni timeout bilan kutamiz */
function fetchWithTimeout(req, ms) {
  return new Promise(function (resolve, reject) {
    var done = false;
    var timer = setTimeout(function () {
      if (!done) { done = true; reject(new Error("timeout")); }
    }, ms);
    fetch(req).then(function (res) {
      if (done) return;
      done = true; clearTimeout(timer); resolve(res);
    }, function (err) {
      if (done) return;
      done = true; clearTimeout(timer); reject(err);
    });
  });
}

/* ---- Strategiyalar ---- */

/* Cache-first — rasm va shriftlar uchun (ular hech qachon oʻzgarmaydi) */
function cacheFirst(req, cacheName, max) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (cacheable(res)) {
          cache.put(req, res.clone());
          if (max) trimCache(cacheName, max);
        }
        return res;
      });
    });
  });
}

/* Stale-while-revalidate — css/js uchun: keshdan darhol, fonda yangilanadi */
function staleWhileRevalidate(req, cacheName) {
  return caches.open(cacheName).then(function (cache) {
    return cache.match(req).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (cacheable(res)) cache.put(req, res.clone());
        return res;
      }).catch(function (err) {
        /* Keshda ham, tarmoqda ham yoʻq — xatoni yuqoriga uzatamiz.
           Bu yerda hit'ni qaytarish (u undefined boʻlishi mumkin)
           respondWith(undefined) ga olib kelib, TypeError bilan yiqilardi. */
        if (hit) return hit;
        throw err;
      });
      return hit || net;
    });
  });
}

/* Network-first — HTML uchun: doim yangi, tarmoq yoʻqsa keshdan */
function networkFirst(e) {
  var req = e.request;
  return Promise.resolve()
    .then(function () {
      return e.preloadResponse ? e.preloadResponse : undefined;
    })
    .then(function (preload) {
      return preload || fetchWithTimeout(req, NET_TIMEOUT);
    })
    .then(function (res) {
      if (cacheable(res)) {
        var copy = res.clone();
        /* Query'siz kalit bilan saqlaymiz. product.html?id=wf1, ?id=wf2 ...
           barchasi bir xil HTML qaytaradi — query'ni sahifa oʻzi JS'da oʻqiydi.
           Aks holda kesh har bir mahsulot uchun alohida yozuv bilan toʻlib
           ketardi (136 mahsulot + 13 kategoriya). */
        caches.open(SHELL).then(function (c) { c.put(keyFor(req), copy); });
      }
      return res;
    })
    .catch(function () {
      /* ignoreSearch shart: precache'da "category.html" bor, soʻrov esa
         "category.html?cat=noutbuklar" — query bilan moslik topilmaydi va
         oflaynda har bir kategoriya/mahsulot sahifasi oflayn sahifasiga
         tushib qolardi. */
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        /* Aynan shu sahifa keshda yoʻq — oflayn sahifasini beramiz */
        return caches.match(OFFLINE_URL).then(function (off) {
          return off || new Response(
            "<h1>Oflayn</h1><p>Internetga ulanmagansiz.</p>",
            { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
          );
        });
      });
    });
}

/* ============================================================
   Fetch — marshrutlash
   ============================================================ */
self.addEventListener("fetch", function (e) {
  var req = e.request;

  /* Faqat GET keshlanadi */
  if (req.method !== "GET") return;

  var url;
  try { url = new URL(req.url); } catch (err) { return; }

  /* http(s) boʻlmagan sxemalar (chrome-extension: va h.k.) — tegmaymiz */
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  /* Range soʻrovlari (video/audio) — keshlash muammoli, tarmoqqa qoʻyib yuboramiz */
  if (req.headers.has("range")) return;

  /* Ataylab yangi nusxa soʻralgan — SW aralashmaydi.
     admin.js eksport uchun js/data.js ni aynan shunday soʻraydi: SWR keshdan
     eski nusxani bersa, eksport eski maʼlumotga asoslanib, qoʻlda kiritilgan
     oʻzgarishlarni jimgina yoʻqotardi. */
  if (req.cache === "reload" || req.cache === "no-store") return;

  var sameOrigin = url.origin === self.location.origin;

  /* --- Google Fonts --- */
  if (url.hostname === "fonts.googleapis.com") {
    /* Stylesheet — oʻzgarishi mumkin (yangi unicode-range va h.k.) */
    e.respondWith(
      staleWhileRevalidate(req, FONTS).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || Response.error();
        });
      })
    );
    return;
  }
  if (url.hostname === "fonts.gstatic.com") {
    /* Shrift fayllari — hash'langan, hech qachon oʻzgarmaydi */
    e.respondWith(
      cacheFirst(req, FONTS, 40).catch(function () { return Response.error(); })
    );
    return;
  }

  /* Boshqa tashqi domenlar — SW aralashmaydi */
  if (!sameOrigin) return;

  /* --- Navigatsiya (sahifa yuklash) --- */
  if (req.mode === "navigate") {
    e.respondWith(networkFirst(e));
    return;
  }

  /* --- Rasmlar ---
     destination boʻyicha ham, kengaytma boʻyicha ham tekshiramiz: <img> dan
     kelgan soʻrovda destination "image" boʻladi, lekin JS'dagi oddiy fetch()
     da u boʻsh — u holda soʻrov quyidagi catch-all shoxga tushib, cheklovsiz
     SHELL keshini toʻldirib yuborardi.

     Mahsulot rasmlari (360 fayl / 5.7MB) — alohida, cheklangan keshda.
     Ikonka/logo/favicon esa SHELL'da oldindan keshlangan, ularni IMGS'ga
     koʻchirish oflaynda ikki marta yuklashga olib kelardi. */
  if (req.destination === "image" || /\.(webp|png|jpe?g|gif|svg|avif|ico)$/i.test(url.pathname)) {
    var isProduct = url.pathname.indexOf("/assets/products/") !== -1;
    e.respondWith(
      cacheFirst(req, isProduct ? IMGS : SHELL, isProduct ? IMG_MAX : 0).catch(function () {
        /* Rasm yuklanmasa — keshdan, u ham boʻlmasa shaffof 1x1 GIF.
           Shunda buzilgan rasm ikonkasi chiqmaydi. */
        return caches.match(req).then(function (hit) {
          if (hit) return hit;
          return new Response(
            Uint8Array.from(atob(
              "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            ), function (c) { return c.charCodeAt(0); }),
            { headers: { "Content-Type": "image/gif", "Cache-Control": "no-store" } }
          );
        });
      })
    );
    return;
  }

  /* --- CSS / JS / manifest --- */
  if (
    req.destination === "style" ||
    req.destination === "script" ||
    req.destination === "manifest" ||
    /\.(css|js|webmanifest|json)$/.test(url.pathname)
  ) {
    e.respondWith(
      staleWhileRevalidate(req, SHELL).catch(function () {
        return caches.match(req).then(function (hit) { return hit || Response.error(); });
      })
    );
    return;
  }

  /* --- Qolgani (shrift, svg va h.k.) — cache-first --- */
  e.respondWith(
    cacheFirst(req, SHELL).catch(function () {
      return caches.match(req).then(function (hit) { return hit || Response.error(); });
    })
  );
});
