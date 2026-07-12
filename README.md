# UPG — Gaming va kompyuter texnikasi

[upg.uz](https://upg.uz/) saytining zamonaviy, toʻliq funksional qayta ishlanishi. Brend ranglari saqlangan (`#FF0096`, `#FF3139`), mahsulotlar haqiqiy saytdan olingan.

## Xususiyatlar

- **136 ta real mahsulot**, 13 ta kategoriya — aniq nomlar va narxlar bilan
- Har bir kategoriya uchun alohida sahifa (`category.html?cat=...`) — filtrlar, saralash, breadcrumb
- Mahsulot sahifasi (`product.html?id=...`) — galereya, xususiyatlar, oʻxshash mahsulotlar
- Ishlaydigan savat (drawer) va sevimlilar — `localStorage`da saqlanadi
- UZ / RU til almashtirgichi (barcha sahifalarda)
- Dark / Light rejim
- Jonli qidiruv, kun taklifi taymeri, brendlangan SVG mahsulot illyustratsiyalari
- Toʻliq adaptiv (mobil / planshet / desktop)

## Texnologiya

Sof statik sayt — HTML + CSS + Vanilla JavaScript. Build talab qilinmaydi.

```
index.html          — bosh sahifa
category.html       — kategoriya sahifasi (dinamik)
product.html        — mahsulot sahifasi (dinamik)
configurator.html   — PK konfigurator sahifasi
css/style.css       — asosiy dizayn
css/shop.css        — doʻkon va konfigurator sahifalari
js/data.js          — mahsulotlar bazasi
js/main.js          — header, savat, til, mavzu
js/art.js           — SVG mahsulot illyustratsiyalari
js/shop.js          — kategoriya/mahsulot render
js/configurator.js  — PK konfigurator (moslik tekshiruvi)
```

## Lokal ishga tushirish

```bash
python -m http.server 8000
# so'ng brauzerda: http://localhost:8000
```

## Deploy

Statik sayt boʻlgani uchun istalgan hostingga joylashadi:

- **GitHub Pages** — `main` branchga push qilinganda `.github/workflows/deploy.yml` avtomatik deploy qiladi (Settings → Pages → Source: **GitHub Actions** boʻlishi kerak)
- **Vercel** — `vercel deploy` (yoki repo'ni ulang)
- **Netlify** — papkani [netlify.com/drop](https://app.netlify.com/drop) ga tashlang
