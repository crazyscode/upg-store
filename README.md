# Togi DB — Gaming va kompyuter texnikasi

[togidb.uz](https://togidb.uz/) saytining zamonaviy, toʻliq funksional qayta ishlanishi. Brend ranglari saqlangan (`#FF0096`, `#FF3139`), mahsulotlar haqiqiy saytdan olingan.

## Xususiyatlar

- **136 ta real mahsulot**, 13 ta kategoriya — aniq nomlar va narxlar bilan
- **126 tasida haqiqiy mahsulot fotosi** (shaffof fonli WebP), qolganida brendlangan SVG chizma
- Har bir kategoriya uchun alohida sahifa (`category.html?cat=...`) — filtrlar, saralash, breadcrumb
- Mahsulot sahifasi (`product.html?id=...`) — galereya, xususiyatlar, oʻxshash mahsulotlar
- **Admin panel** (`admin.html`) — yangi mahsulot qoʻshish va `data.js` eksporti
- Ishlaydigan savat (drawer) va sevimlilar — `localStorage`da saqlanadi
- UZ / RU til almashtirgichi (barcha sahifalarda)
- Dark / Light rejim
- Jonli qidiruv, kun taklifi taymeri
- Toʻliq adaptiv (mobil / planshet / desktop)
- **Mobil ilova (PWA)** — telefonga oʻrnatiladi, oflayn ishlaydi, pastki tab-bar

## Mobil ilova (PWA)

Sayt telefonga **oʻrnatiladigan ilova** sifatida ishlaydi — alohida kodbaza yoʻq,
xuddi shu fayllar.

- **Oʻrnatish** — Android/desktop Chrome'da 3 soniyadan keyin «Ilovani oʻrnating»
  banneri chiqadi. iOS Safari'da `beforeinstallprompt` yoʻq, shuning uchun
  «Ulashish → Bosh ekranga qoʻshish» yoʻriqnomasi koʻrsatiladi. Rad etilsa
  14 kun qayta soʻralmaydi (`togidb-install-dismissed`).
- **Pastki tab-bar** — Bosh sahifa / Katalog / Savat / Sevimlilar, badge'lar bilan.
  Mobil kenglikda (≤860px) va ilova rejimida koʻrinadi; `js/app.js` uni barcha
  sahifalarga inject qiladi.
- **Ilova rejimi** (`display: standalone`) — topbar va anker menyu yashiriladi,
  til almashtirgich header'ga koʻchadi, safe-area (notch / home indicator) hisobga
  olinadi.
- **Oflayn** — app shell precache qilinadi; koʻrilgan mahsulot rasmlari keshda
  saqlanadi (eng koʻpi 180 ta fayl). Keshda yoʻq sahifa `offline.html` ga tushadi.
- **Yangilanish** — yangi versiya chiqqanda «Yangilash» tugmasi bilan xabar
  koʻrsatiladi (majburiy qayta yuklash yoʻq).

> **Deploy qilishda muhim:** `sw.js` ichidagi `VERSION` ni har safar oshiring
> (`v2` → `v3` …). Aks holda eski kesh yozuvlari tozalanmay qolib ketadi.

Admin panel (`admin.html`) ataylab PWA'dan tashqarida — u lokal vosita, oflayn
kerak emas.

## Texnologiya

Sof statik sayt — HTML + CSS + Vanilla JavaScript. Build talab qilinmaydi.

```
index.html          — bosh sahifa (PWA start_url, iOS splash ekranlari shu yerda)
category.html       — kategoriya sahifasi (dinamik)
product.html        — mahsulot sahifasi (dinamik)
configurator.html   — PK konfigurator sahifasi
admin.html          — admin panel (mahsulot qoʻshish)
offline.html        — oflayn sahifa (tashqi resurssiz, mustaqil)
manifest.webmanifest— PWA manifesti (nom, ikonka, yorliqlar)
sw.js               — service worker (kesh, oflayn, yangilanish)
css/style.css       — asosiy dizayn
css/shop.css        — doʻkon va konfigurator sahifalari
css/app.css         — mobil ilova qobigʻi (tab-bar, standalone, banner)
css/admin.css       — admin panel
js/data.js          — mahsulotlar bazasi
js/main.js          — header, savat, til, mavzu
js/art.js           — mahsulot rasmi / SVG illyustratsiya
js/shop.js          — kategoriya/mahsulot render
js/configurator.js  — PK konfigurator (moslik tekshiruvi)
js/app.js           — PWA qobigʻi (SW, tab-bar, oʻrnatish, yangilanish)
js/admin.js         — admin panel (forma, rasm, eksport)
assets/products/    — mahsulot fotolari (<id>.webp, <id>-2.webp, <id>-3.webp)
assets/icons/       — ilova ikonkalari va iOS launch ekranlari
```

## Lokal ishga tushirish

```bash
python -m http.server 8000
# so'ng brauzerda: http://localhost:8000
```

Service worker `localhost`da ham ishlaydi, shuning uchun PWA'ni shu yerda toʻliq
sinash mumkin (DevTools → Application → Service Workers / Manifest). Faylni
`file://` orqali ochsangiz SW roʻyxatdan oʻtmaydi — bu normal.

## Admin panel — yangi mahsulot qoʻshish

`admin.html` ni oching (masalan `http://localhost:8000/admin.html`).

Sayt statik boʻlgani uchun **server ham, baza ham yoʻq**. Shuning uchun panel
mahsulotni brauzerning `localStorage`iga yozadi va u faqat sizning
kompyuteringizda koʻrinadi. Hammaga chiqarish uchun eksport qilib commit
qilish kerak:

1. Formani toʻldiring — kategoriya, brend, nom, narx, rasm (3 tagacha).
   `id` va `type` avtomatik aniqlanadi, karta oʻng tomonda jonli chiziladi.
2. Rasmlar avtomatik **500×500 WebP** ga oʻgiriladi. Shaffof fon uchun PNG yoki
   WebP bering — JPEG'da fon oq boʻlib qoladi.
3. **Eksport** boʻlimida:
   - `data.js` → `js/data.js` ustiga yozing (yangi mahsulotlar oʻz kategoriya
     blokiga qoʻyiladi);
   - `rasmlar.zip` → ichini `assets/products/` ga chiqaring.
4. Commit qilib push qiling — GitHub Pages oʻzi yangilaydi.

Panelda parol yoʻq va boʻlishi ham mumkin emas: statik saytda har qanday parol
sahifa kodida ochiq koʻrinadi. Panel hech qayerga yozmagani uchun (faqat oʻz
brauzeringizga) bu xavf tugʻdirmaydi — haqiqiy mahsulot faqat siz commit
qilganingizda saytga chiqadi.

## Deploy

Statik sayt boʻlgani uchun istalgan hostingga joylashadi:

- **GitHub Pages** — `main` branchga push qilinganda `.github/workflows/deploy.yml` avtomatik deploy qiladi (Settings → Pages → Source: **GitHub Actions** boʻlishi kerak)
- **Vercel** — `vercel deploy` (yoki repo'ni ulang)
- **Netlify** — papkani [netlify.com/drop](https://app.netlify.com/drop) ga tashlang

PWA oʻrnatilishi uchun **HTTPS shart** — yuqoridagi uchala hosting ham buni oʻzi
taʼminlaydi. Barcha yoʻllar nisbiy, shuning uchun ilova subpath'da
(`…/togidb-store/`) ham, domen ildizida ham ishlaydi.
