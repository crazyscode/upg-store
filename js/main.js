/* ============================================================
   UPG — umumiy funksiyalar (barcha sahifalarda ishlaydi)
   ============================================================ */

window.UPG = (function () {
  "use strict";

  /* ============================================================
     I18N — UZ / RU lugʻati
     ============================================================ */
  var I18N = {
    uz: {
      "meta.title": "UPG — Gaming va kompyuter texnikasi | Toshkent",
      "tb.addr": "Toshkent, Navoiy koʻchasi 37 · Malika savdo markazi",
      "tb.hours": "Har kuni 10:00 — 20:00",
      "tb.hours2": "Har kuni 10:00 — 20:00",
      "tb.hours3": "Har kuni 10:00 — 20:00",
      "tb.hours4": "Har kuni 10:00 — 20:00",
      "h.catalog": "Katalog",
      "h.search": "Qidirish",
      "n.parts": "Butlovchi qismlar",
      "n.builds": "Tayyor yigʻilmalar",
      "n.config": "PK Konfigurator",
      "n.products": "Ommabop mahsulotlar",
      "n.services": "Xizmatlar",
      "n.stores": "Doʻkonlar",
      "n.about": "Biz haqimizda",
      "n.sale": "Chegirmalar",
      "deal.label": "Kun taklifi:",
      "deal.item": "ASUS ROG Rapture GT-AX11000 — chegirma −20%",
      "deal.ends": "Tugashiga:",
      "hero.chip": "2009-yildan beri — rasmiy hamkor",
      "hero.t1": "Kelajak darajasidagi",
      "hero.t2": "gaming texnika",
      "hero.sub": "Videokartalar, protsessorlar va professional periferiya — jahon brendlarining rasmiy kafolati bilan. Oʻz kompyuteringizni konfiguratorda yigʻing yoki tayyor yigʻilmani tanlang.",
      "hero.cta1": "Katalogni koʻrish",
      "hero.cta2": "PK yigʻish",
      "hero.s1": "+ ijobiy sharh",
      "hero.s2": "kibersport turniri",
      "hero.s3": "kompyuter klubi",
      "hero.hit": "Haftaning xiti",
      "common.sum": "soʻm",
      "cat.eyebrow": "Katalog",
      "cat.title": "Butlovchi qismlar va periferiya",
      "cat.more": "Barcha kategoriyalar",
      "cat.laptop": "Noutbuklar",
      "cat.mon": "Monitorlar",
      "cat.kb": "Klaviaturalar",
      "cat.mouse": "Sichqonchalar",
      "cat.chair": "Gaming kreslolar",
      "b.eyebrow": "Tayyor yechimlar",
      "b.title": "Gaming yigʻilmalar",
      "b.more": "Barcha yigʻilmalar",
      "b.pop": "Eng ommabop",
      "b.btn": "Batafsil",
      "cf.eyebrow": "PK Konfigurator",
      "cf.t1": "Oʻz kompyuteringizni",
      "cf.t2": "oʻzingiz yarating",
      "cf.text": "Konfiguratorimiz tanlagan qismlaringizning mosligini avtomatik tekshiradi — protsessordan quvvat blokigacha. Xato yigʻish ehtimoli nolga teng.",
      "cf.s1t": "Qismlarni tanlang",
      "cf.s1d": "1000+ butlovchi qism ichidan byudjetingizga mosini toping",
      "cf.s2t": "Moslikni tekshiring",
      "cf.s2d": "Tizim nomuvofiq qismlar haqida darhol ogohlantiradi",
      "cf.s3t": "Buyurtma bering",
      "cf.s3d": "Ustalarimiz yigʻadi, sozlaydi va bepul yetkazib beradi",
      "cf.cta": "Konfiguratorni ochish",
      "cf.sel": "Tanlanmoqda...",
      "cf.comp": "Mosligi:",
      "cf.total": "Jami:",
      "p.eyebrow": "Doʻkon",
      "p.title": "Ommabop mahsulotlar",
      "p.all": "Barchasi",
      "p.new": "Yangi",
      "p.sale": "Chegirma",
      "badge.new": "Yangi",
      "sv.eyebrow": "Nega aynan UPG?",
      "sv.title": "Xizmatlarimiz",
      "sv1t": "Bepul yetkazib berish",
      "sv1d": "Toshkent boʻylab 24 soat ichida, viloyatlarga 2–3 kunda yetkazamiz.",
      "sv2t": "Rasmiy kafolat",
      "sv2d": "Barcha mahsulotlarga 36 oygacha rasmiy kafolat va servis xizmati.",
      "sv3t": "Muddatli toʻlov",
      "sv3d": "UPG Credit, Uzum Nasiya, Solfy va ZoodPay orqali 3–12 oyga boʻlib toʻlang.",
      "sv4t": "Trade-in",
      "sv4d": "Eski texnikangizni topshiring va yangisiga chegirma bilan ega boʻling.",
      "ab.eyebrow": "Biz haqimizda",
      "ab.title": "15 yildan beri geymerlar tanlovi",
      "ab.text": "UPG — 2009-yilda tashkil etilgan, bugungi kunda Oʻzbekistondagi eng yirik gaming texnika doʻkonlaridan biri. Biz xalqaro brendlarning rasmiy hamkorimiz, kibersport turnirlari tashkil qilamiz va butun mamlakat boʻylab kompyuter klublarini jihozlaymiz.",
      "ab.s1": "yillik tajriba",
      "ab.s2": "+ ijobiy sharh",
      "ab.s3": "kibersport turniri",
      "ab.s4": "jihozlangan klub",
      "ts.eyebrow": "Mijozlar fikri",
      "ts.title": "Bizga ishonishadi",
      "ts.count": "500+ sharh asosida",
      "ts1.text": "Konfiguratorda PRO yigʻilmani buyurtma qildim — bir kunda yigʻib, uyimga yetkazib berishdi. FPS reklamadagidan ham yuqori chiqdi!",
      "ts1.name": "Jasur T.", "ts1.role": "CS2 oʻyinchisi",
      "ts2.text": "Videokartani muddatli toʻlovga oldim, hujjatlar 10 daqiqada tayyor boʻldi. Narxlar bozordagi eng adolatlisi.",
      "ts2.name": "Aziz R.", "ts2.role": "Doimiy mijoz",
      "ts3.text": "Kompyuter klubimizni toʻliq UPG jihozladi — 20 ta PK, monitorlar, kreslolar. Professional yondashuv uchun rahmat!",
      "ts3.name": "Malika S.", "ts3.role": "Klub egasi",
      "st.eyebrow": "Doʻkonlarimiz",
      "st.title": "Bizga tashrif buyuring",
      "st1.name": "Markaziy doʻkon",
      "st1.addr": "Navoiy koʻchasi 37, Toshkent",
      "st1.addr2": "Navoiy koʻchasi 37, Toshkent",
      "st2.name": "Malika filiali",
      "st2.addr": "Malika savdo markazi, Toshkent",
      "st2.addr2": "Malika savdo markazi",
      "st.map": "Xaritada ochish",
      "st.map2": "Xaritada ochish",
      "faq.eyebrow": "Savol-javob",
      "faq.title": "Koʻp beriladigan savollar",
      "fq1q": "Yetkazib berish qancha vaqt oladi?",
      "fq1a": "Toshkent boʻylab buyurtmalar 24 soat ichida, viloyatlarga 2–3 ish kunida yetkaziladi. 1 mln soʻmdan yuqori xaridlarga yetkazib berish bepul.",
      "fq2q": "Muddatli toʻlovni qanday rasmiylashtiraman?",
      "fq2a": "Doʻkonda yoki saytda UPG Credit, Uzum Nasiya, Solfy yoki ZoodPay orqali 3 daqiqada rasmiylashtiriladi. Faqat pasport kerak.",
      "fq3q": "Kafolat qanday ishlaydi?",
      "fq3a": "Barcha mahsulotlarga 12–36 oylik rasmiy kafolat beriladi. Nosozlik yuzaga kelsa, servis markazimiz bepul taʼmirlaydi yoki almashtirib beradi.",
      "fq4q": "Yigʻilgan PKni sozlab berasizlarmi?",
      "fq4a": "Ha, har bir yigʻilgan kompyuterga BIOS sozlamalari, drayverlar va stress-test bepul kiradi. Xohishingizga koʻra Windows ham oʻrnatamiz.",
      "fq5q": "Mahsulotni qaytarish mumkinmi?",
      "fq5a": "Ha, 10 kun ichida mahsulot asl holatida boʻlsa, qaytarish yoki almashtirish mumkin.",
      "so.eyebrow": "Jamiyat",
      "so.title": "Bizga qoʻshiling",
      "nl.title": "Chegirmalardan birinchi boʻlib xabardor boʻling",
      "nl.text": "Haftasiga bir marta — faqat eng zoʻr takliflar. Spam yoʻq.",
      "nl.ph": "Email manzilingiz",
      "nl.btn": "Obuna boʻlish",
      "ft.desc": "Oʻzbekistondagi eng yirik gaming va kompyuter texnikasi doʻkoni. 2009-yildan beri siz bilan.",
      "ft.cat": "Katalog",
      "ft.per": "Periferiya",
      "ft.furn": "Gaming mebel",
      "ft.comp": "Kompaniya",
      "ft.l1": "Biz haqimizda",
      "ft.l2": "Doʻkonlarimiz",
      "ft.l3": "Yetkazib berish",
      "ft.l4": "Kafolat va qaytarish",
      "ft.l5": "Blog",
      "ft.contact": "Aloqa",
      "ft.copy": "© 2009–2026 UPG. Barcha huquqlar himoyalangan.",
      /* toast */
      "t.cart": "Savatga qoʻshildi",
      "t.fav1": "Sevimlilarga qoʻshildi",
      "t.fav0": "Sevimlilardan olib tashlandi",
      "t.news": "Obuna muvaffaqiyatli rasmiylashtirildi!",
      "t.newsErr": "Iltimos, toʻgʻri email kiriting",
      "t.removed": "Savatdan olib tashlandi",
      "t.order": "Buyurtmangiz qabul qilindi! Tez orada bogʻlanamiz.",
      /* shop / katalog */
      "shop.home": "Bosh sahifa",
      "shop.catalog": "Katalog",
      "shop.results": "ta mahsulot",
      "shop.sort": "Saralash:",
      "shop.sortPop": "Ommabopligi boʻyicha",
      "shop.sortCheap": "Avval arzon",
      "shop.sortExp": "Avval qimmat",
      "shop.sortName": "Nomi (A–Z)",
      "shop.filters": "Filtrlar",
      "shop.brand": "Brend",
      "shop.price": "Narx, soʻm",
      "shop.from": "dan",
      "shop.to": "gacha",
      "shop.apply": "Qoʻllash",
      "shop.reset": "Tozalash",
      "shop.empty": "Bu filtrlar boʻyicha mahsulot topilmadi",
      "shop.emptyBtn": "Filtrlarni tozalash",
      "shop.inStock": "Sotuvda mavjud",
      "shop.buy": "Sotib olish",
      "shop.addCart": "Savatga",
      "shop.related": "Oʻxshash mahsulotlar",
      "shop.specs": "Xususiyatlari",
      "shop.desc": "Tavsif",
      "shop.descText": "Rasmiy kafolatli original mahsulot. UPG — jahon brendlarining Oʻzbekistondagi rasmiy hamkori. Bepul yetkazib berish va muddatli toʻlov imkoniyati mavjud.",
      "shop.warranty": "Kafolat",
      "shop.warrantyVal": "12 oy rasmiy",
      "shop.delivery": "Yetkazib berish",
      "shop.deliveryVal": "24 soat ichida bepul",
      "shop.pay": "Toʻlov",
      "shop.payVal": "Naqd, karta yoki muddatli",
      "shop.qty": "Miqdor",
      "shop.notFound": "Mahsulot topilmadi",
      "shop.backHome": "Bosh sahifaga qaytish",
      "shop.favs": "Sevimlilar",
      "shop.favsEmpty": "Sevimlilar roʻyxati boʻsh",
      "spec.brand": "Brend",
      "spec.category": "Kategoriya",
      "spec.code": "Artikul",
      "spec.status": "Holati",
      /* cart drawer */
      "cart.title": "Savat",
      "cart.empty": "Savatingiz boʻsh",
      "cart.emptyText": "Katalogdan mahsulot tanlang",
      "cart.emptyBtn": "Katalogga oʻtish",
      "cart.total": "Jami:",
      "cart.checkout": "Buyurtma berish",
      "cart.clear": "Savatni tozalash"
    },
    ru: {
      "meta.title": "UPG — Игровая и компьютерная техника | Ташкент",
      "tb.addr": "Ташкент, ул. Навои 37 · ТЦ «Малика»",
      "tb.hours": "Ежедневно 10:00 — 20:00",
      "tb.hours2": "Ежедневно 10:00 — 20:00",
      "tb.hours3": "Ежедневно 10:00 — 20:00",
      "tb.hours4": "Ежедневно 10:00 — 20:00",
      "h.catalog": "Каталог",
      "h.search": "Поиск",
      "n.parts": "Комплектующие",
      "n.builds": "Готовые сборки",
      "n.config": "Конфигуратор ПК",
      "n.products": "Популярные товары",
      "n.services": "Услуги",
      "n.stores": "Магазины",
      "n.about": "О нас",
      "n.sale": "Скидки",
      "deal.label": "Предложение дня:",
      "deal.item": "ASUS ROG Rapture GT-AX11000 — скидка −20%",
      "deal.ends": "До конца:",
      "hero.chip": "С 2009 года — официальный партнёр",
      "hero.t1": "Игровая техника",
      "hero.t2": "уровня будущего",
      "hero.sub": "Видеокарты, процессоры и профессиональная периферия — с официальной гарантией мировых брендов. Соберите свой компьютер в конфигураторе или выберите готовую сборку.",
      "hero.cta1": "Смотреть каталог",
      "hero.cta2": "Собрать ПК",
      "hero.s1": "+ положительных отзывов",
      "hero.s2": "киберспортивных турниров",
      "hero.s3": "компьютерных клубов",
      "hero.hit": "Хит недели",
      "common.sum": "сум",
      "cat.eyebrow": "Каталог",
      "cat.title": "Комплектующие и периферия",
      "cat.more": "Все категории",
      "cat.laptop": "Ноутбуки",
      "cat.mon": "Мониторы",
      "cat.kb": "Клавиатуры",
      "cat.mouse": "Мыши",
      "cat.chair": "Игровые кресла",
      "b.eyebrow": "Готовые решения",
      "b.title": "Игровые сборки",
      "b.more": "Все сборки",
      "b.pop": "Самая популярная",
      "b.btn": "Подробнее",
      "cf.eyebrow": "Конфигуратор ПК",
      "cf.t1": "Создайте свой",
      "cf.t2": "компьютер сами",
      "cf.text": "Конфигуратор автоматически проверяет совместимость выбранных комплектующих — от процессора до блока питания. Вероятность ошибки — ноль.",
      "cf.s1t": "Выберите комплектующие",
      "cf.s1d": "Более 1000 позиций под любой бюджет",
      "cf.s2t": "Проверьте совместимость",
      "cf.s2d": "Система сразу предупредит о несовместимых деталях",
      "cf.s3t": "Оформите заказ",
      "cf.s3d": "Наши мастера соберут, настроят и бесплатно доставят",
      "cf.cta": "Открыть конфигуратор",
      "cf.sel": "Выбирается...",
      "cf.comp": "Совместимость:",
      "cf.total": "Итого:",
      "p.eyebrow": "Магазин",
      "p.title": "Популярные товары",
      "p.all": "Все",
      "p.new": "Новые",
      "p.sale": "Скидки",
      "badge.new": "Новинка",
      "sv.eyebrow": "Почему именно UPG?",
      "sv.title": "Наши услуги",
      "sv1t": "Бесплатная доставка",
      "sv1d": "По Ташкенту за 24 часа, в регионы — за 2–3 дня.",
      "sv2t": "Официальная гарантия",
      "sv2d": "До 36 месяцев официальной гарантии и сервисный центр.",
      "sv3t": "Рассрочка",
      "sv3d": "UPG Credit, Uzum Nasiya, Solfy и ZoodPay — от 3 до 12 месяцев.",
      "sv4t": "Trade-in",
      "sv4d": "Сдайте старую технику и получите скидку на новую.",
      "ab.eyebrow": "О нас",
      "ab.title": "Выбор геймеров уже 15 лет",
      "ab.text": "UPG — основанный в 2009 году, сегодня один из крупнейших магазинов игровой техники в Узбекистане. Мы официальные партнёры мировых брендов, проводим киберспортивные турниры и оснащаем компьютерные клубы по всей стране.",
      "ab.s1": "лет опыта",
      "ab.s2": "+ отзывов",
      "ab.s3": "турниров",
      "ab.s4": "оснащённых клубов",
      "ts.eyebrow": "Отзывы клиентов",
      "ts.title": "Нам доверяют",
      "ts.count": "На основе 500+ отзывов",
      "ts1.text": "Заказал сборку PRO в конфигураторе — собрали за день и доставили домой. FPS оказался даже выше, чем в рекламе!",
      "ts1.name": "Жасур Т.", "ts1.role": "Игрок CS2",
      "ts2.text": "Взял видеокарту в рассрочку, документы оформили за 10 минут. Цены — самые честные на рынке.",
      "ts2.name": "Азиз Р.", "ts2.role": "Постоянный клиент",
      "ts3.text": "UPG полностью оснастил наш компьютерный клуб — 20 ПК, мониторы, кресла. Спасибо за профессиональный подход!",
      "ts3.name": "Малика С.", "ts3.role": "Владелица клуба",
      "st.eyebrow": "Наши магазины",
      "st.title": "Приходите в гости",
      "st1.name": "Центральный магазин",
      "st1.addr": "ул. Навои 37, Ташкент",
      "st1.addr2": "ул. Навои 37, Ташкент",
      "st2.name": "Филиал в ТЦ «Малика»",
      "st2.addr": "ТЦ «Малика», Ташкент",
      "st2.addr2": "ТЦ «Малика»",
      "st.map": "Открыть на карте",
      "st.map2": "Открыть на карте",
      "faq.eyebrow": "Вопрос-ответ",
      "faq.title": "Частые вопросы",
      "fq1q": "Сколько занимает доставка?",
      "fq1a": "По Ташкенту заказы доставляются в течение 24 часов, в регионы — за 2–3 рабочих дня. При покупке от 1 млн сум доставка бесплатная.",
      "fq2q": "Как оформить рассрочку?",
      "fq2a": "В магазине или на сайте через UPG Credit, Uzum Nasiya, Solfy или ZoodPay за 3 минуты. Нужен только паспорт.",
      "fq3q": "Как работает гарантия?",
      "fq3a": "На все товары даётся официальная гарантия 12–36 месяцев. При неисправности наш сервисный центр бесплатно отремонтирует или заменит товар.",
      "fq4q": "Настраиваете ли вы собранный ПК?",
      "fq4a": "Да, каждая сборка включает бесплатную настройку BIOS, установку драйверов и стресс-тест. По желанию установим Windows.",
      "fq5q": "Можно ли вернуть товар?",
      "fq5a": "Да, в течение 10 дней при сохранении товарного вида возможен возврат или обмен.",
      "so.eyebrow": "Сообщество",
      "so.title": "Присоединяйтесь",
      "nl.title": "Узнавайте о скидках первыми",
      "nl.text": "Раз в неделю — только лучшие предложения. Без спама.",
      "nl.ph": "Ваш email",
      "nl.btn": "Подписаться",
      "ft.desc": "Крупнейший магазин игровой и компьютерной техники в Узбекистане. С вами с 2009 года.",
      "ft.cat": "Каталог",
      "ft.per": "Периферия",
      "ft.furn": "Игровая мебель",
      "ft.comp": "Компания",
      "ft.l1": "О нас",
      "ft.l2": "Магазины",
      "ft.l3": "Доставка",
      "ft.l4": "Гарантия и возврат",
      "ft.l5": "Блог",
      "ft.contact": "Контакты",
      "ft.copy": "© 2009–2026 UPG. Все права защищены.",
      "t.cart": "Добавлено в корзину",
      "t.fav1": "Добавлено в избранное",
      "t.fav0": "Удалено из избранного",
      "t.news": "Подписка успешно оформлена!",
      "t.newsErr": "Пожалуйста, введите корректный email",
      "t.removed": "Удалено из корзины",
      "t.order": "Ваш заказ принят! Скоро свяжемся с вами.",
      "shop.home": "Главная",
      "shop.catalog": "Каталог",
      "shop.results": "товаров",
      "shop.sort": "Сортировка:",
      "shop.sortPop": "По популярности",
      "shop.sortCheap": "Сначала дешёвые",
      "shop.sortExp": "Сначала дорогие",
      "shop.sortName": "По названию (А–Я)",
      "shop.filters": "Фильтры",
      "shop.brand": "Бренд",
      "shop.price": "Цена, сум",
      "shop.from": "от",
      "shop.to": "до",
      "shop.apply": "Применить",
      "shop.reset": "Сбросить",
      "shop.empty": "По этим фильтрам товаров не найдено",
      "shop.emptyBtn": "Сбросить фильтры",
      "shop.inStock": "В наличии",
      "shop.buy": "Купить",
      "shop.addCart": "В корзину",
      "shop.related": "Похожие товары",
      "shop.specs": "Характеристики",
      "shop.desc": "Описание",
      "shop.descText": "Оригинальный товар с официальной гарантией. UPG — официальный партнёр мировых брендов в Узбекистане. Доступна бесплатная доставка и рассрочка.",
      "shop.warranty": "Гарантия",
      "shop.warrantyVal": "12 мес. официальная",
      "shop.delivery": "Доставка",
      "shop.deliveryVal": "Бесплатно за 24 часа",
      "shop.pay": "Оплата",
      "shop.payVal": "Наличные, карта, рассрочка",
      "shop.qty": "Количество",
      "shop.notFound": "Товар не найден",
      "shop.backHome": "Вернуться на главную",
      "shop.favs": "Избранное",
      "shop.favsEmpty": "Список избранного пуст",
      "spec.brand": "Бренд",
      "spec.category": "Категория",
      "spec.code": "Артикул",
      "spec.status": "Статус",
      "cart.title": "Корзина",
      "cart.empty": "Корзина пуста",
      "cart.emptyText": "Выберите товар из каталога",
      "cart.emptyBtn": "Перейти в каталог",
      "cart.total": "Итого:",
      "cart.checkout": "Оформить заказ",
      "cart.clear": "Очистить корзину"
    }
  };

  var currentLang = localStorage.getItem("upg-lang") || "uz";
  var root = document.documentElement;

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.uz[key] || key;
  }

  function fmt(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + t("common.sum");
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem("upg-lang", lang);
    root.setAttribute("lang", lang);
    if (document.title.indexOf("UPG") !== -1 && !document.body.hasAttribute("data-page")) {
      document.title = t("meta.title");
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (I18N[lang][key] !== undefined) el.textContent = I18N[lang][key];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-ph");
      if (I18N[lang][key] !== undefined) el.placeholder = I18N[lang][key];
    });
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });
    document.dispatchEvent(new CustomEvent("upg:langchange", { detail: { lang: lang } }));
  }

  /* ============================================================
     Toast
     ============================================================ */
  function toast(msg) {
    var wrap = document.getElementById("toastWrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "toastWrap";
      wrap.className = "toast-wrap";
      wrap.setAttribute("aria-live", "polite");
      document.body.appendChild(wrap);
    }
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = '<span class="toast__icon">✓</span><span></span>';
    el.lastElementChild.textContent = msg;
    wrap.appendChild(el);
    setTimeout(function () {
      el.classList.add("is-out");
      setTimeout(function () { el.remove(); }, 320);
    }, 2600);
  }

  /* ============================================================
     Savat va sevimlilar (localStorage)
     ============================================================ */
  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  var cart = load("upg-cart");   // [{id, qty}]
  var favs = load("upg-favs");   // [id]

  /* Konfiguratorda yigʻilgan shaxsiy yigʻilmalar — sahifalar aro saqlanadi */
  if (window.UPG_DATA) {
    load("upg-builds").forEach(function (b) {
      if (b && b.id && !UPG_DATA.products.some(function (p) { return p.id === b.id; })) {
        UPG_DATA.products.push(b);
      }
    });
    var pruned = cart.filter(function (line) {
      return UPG_DATA.products.some(function (p) { return p.id === line.id; });
    });
    if (pruned.length !== cart.length) {
      cart = pruned;
      localStorage.setItem("upg-cart", JSON.stringify(cart));
    }
  }

  function saveCart() { localStorage.setItem("upg-cart", JSON.stringify(cart)); updateBadges(); renderDrawer(); }
  function saveFavs() { localStorage.setItem("upg-favs", JSON.stringify(favs)); updateBadges(); }

  function cartQty() { return cart.reduce(function (s, i) { return s + i.qty; }, 0); }

  function findProduct(id) {
    if (!window.UPG_DATA) return null;
    for (var i = 0; i < UPG_DATA.products.length; i++) {
      if (UPG_DATA.products[i].id === id) return UPG_DATA.products[i];
    }
    return null;
  }

  function addToCart(id, qty, silent) {
    qty = qty || 1;
    var line = cart.filter(function (i) { return i.id === id; })[0];
    if (line) line.qty += qty; else cart.push({ id: id, qty: qty });
    saveCart();
    var badge = document.getElementById("cartBadge");
    if (badge) bump(badge);
    if (!silent) toast(t("t.cart"));
  }
  function setQty(id, qty) {
    var line = cart.filter(function (i) { return i.id === id; })[0];
    if (!line) return;
    line.qty = qty;
    if (line.qty <= 0) cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
  }
  function removeFromCart(id) {
    cart = cart.filter(function (i) { return i.id !== id; });
    saveCart();
    toast(t("t.removed"));
  }
  function clearCart() { cart = []; saveCart(); }

  function isFav(id) { return favs.indexOf(id) !== -1; }
  function toggleFav(id) {
    var active;
    if (isFav(id)) { favs = favs.filter(function (x) { return x !== id; }); active = false; }
    else { favs.push(id); active = true; }
    saveFavs();
    var badge = document.getElementById("favBadge");
    if (badge) bump(badge);
    toast(active ? t("t.fav1") : t("t.fav0"));
    return active;
  }

  function updateBadges() {
    var cb = document.getElementById("cartBadge");
    var fb = document.getElementById("favBadge");
    if (cb) cb.textContent = cartQty();
    if (fb) fb.textContent = favs.length;
  }

  function bump(badge) {
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
  }

  /* ============================================================
     Savat oynasi (drawer) — barcha sahifalarga inject qilinadi
     ============================================================ */
  var drawer, drawerBody, drawerFoot, overlay;

  function buildDrawer() {
    overlay = document.createElement("div");
    overlay.className = "drawer-overlay";
    overlay.id = "drawerOverlay";

    drawer = document.createElement("aside");
    drawer.className = "drawer";
    drawer.id = "cartDrawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.inert = true;
    drawer.innerHTML =
      '<div class="drawer__head">' +
        '<b class="drawer__title" data-i18n="cart.title">' + t("cart.title") + '</b>' +
        '<button class="drawer__close" type="button" aria-label="Yopish">' +
          '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '</div>' +
      '<div class="drawer__body" id="drawerBody"></div>' +
      '<div class="drawer__foot" id="drawerFoot"></div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
    drawerBody = drawer.querySelector("#drawerBody");
    drawerFoot = drawer.querySelector("#drawerFoot");

    overlay.addEventListener("click", closeCart);
    drawer.querySelector(".drawer__close").addEventListener("click", closeCart);
    renderDrawer();
  }

  function openCart() { drawer.classList.add("is-open"); overlay.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); drawer.inert = false; document.body.style.overflow = "hidden"; }
  function closeCart() { drawer.classList.remove("is-open"); overlay.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); drawer.inert = true; document.body.style.overflow = ""; }

  function renderDrawer() {
    if (!drawerBody) return;
    if (!cart.length) {
      drawerBody.innerHTML =
        '<div class="drawer__empty">' +
          '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M3 4h2l2.6 12h10.8L21 8H7"/></svg>' +
          '<b>' + t("cart.empty") + '</b><span>' + t("cart.emptyText") + '</span>' +
          '<a class="btn btn--primary btn--sm" href="index.html#catalog">' + t("cart.emptyBtn") + '</a>' +
        '</div>';
      drawerFoot.innerHTML = "";
      return;
    }
    var total = 0;
    drawerBody.innerHTML = cart.map(function (line) {
      var p = findProduct(line.id);
      if (!p) return "";
      total += p.price * line.qty;
      return (
        '<div class="citem" data-id="' + p.id + '">' +
          '<div class="citem__media citem__media--' + p.type + '">' + iconSVG(p.type) + '</div>' +
          '<div class="citem__info">' +
            '<a class="citem__name" href="product.html?id=' + p.id + '">' + esc(p.name) + '</a>' +
            '<span class="citem__price">' + fmt(p.price) + '</span>' +
            '<div class="citem__qty">' +
              '<button class="qtybtn" data-act="dec" type="button" aria-label="-">−</button>' +
              '<span>' + line.qty + '</span>' +
              '<button class="qtybtn" data-act="inc" type="button" aria-label="+">+</button>' +
            '</div>' +
          '</div>' +
          '<button class="citem__del" data-act="del" type="button" aria-label="Oʻchirish">' +
            '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '</div>'
      );
    }).join("");
    drawerFoot.innerHTML =
      '<div class="drawer__total"><span>' + t("cart.total") + '</span><b>' + fmt(total) + '</b></div>' +
      '<button class="btn btn--primary" id="checkoutBtn" type="button">' + t("cart.checkout") + '</button>' +
      '<button class="drawer__clear" id="clearCartBtn" type="button">' + t("cart.clear") + '</button>';
  }

  /* icon markup helper (savat va shop uchun) */
  function iconSVG(type) {
    var M = {
      pc: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/>',
      cpu: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10" y="10" width="4" height="4"/><path d="M9 7V4m3 3V4m3 3V4M9 20v-3m3 3v-3m3 3v-3M7 9H4m3 3H4m3 3H4m16-6h-3m3 3h-3m3 3h-3"/>',
      gpu: '<rect x="2" y="7" width="19" height="11" rx="2"/><circle cx="8.5" cy="12.5" r="3"/><circle cx="15.5" cy="12.5" r="3"/><path d="M4 18v2m5-2v2"/>',
      mobo: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="7" y="7" width="6" height="6" rx="1"/><path d="M15 8h3m-3 3h3M8 16h8"/>',
      ram: '<rect x="3" y="8" width="18" height="8" rx="1"/><path d="M6 8v8m4-8v8m4-8v8m4-8v8M3 12h18"/>',
      ssd: '<rect x="4" y="6" width="16" height="12" rx="2"/><circle cx="9" cy="12" r="2"/><path d="M13 10h4m-4 4h4"/>',
      laptop: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
      monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4m-4 0h8"/>',
      kb: '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M5.5 10.5h1m2.5 0h1m2.5 0h1m2.5 0h1m2.5 0h1M7 13.8h10"/>',
      mouse: '<rect x="7" y="3" width="10" height="18" rx="5"/><path d="M12 7v3"/>',
      headset: '<path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/>',
      chair: '<path d="M8 4h8l-1 8h-6L8 4zM7 12h10v2a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-2zM12 17v3m-3.5 1h7"/>',
      case: '<rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="9" r="3"/><path d="M9 16h6"/>',
      psu: '<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="9" cy="12" r="3.5"/><path d="M16 9h3m-3 3h3m-3 3h3"/>',
      cooler: '<circle cx="12" cy="12" r="8"/><path d="M12 6.5v4m3.9-1.6-2.5 2.3M17 14.5l-3.4-1M12 17.5v-4m-3.9 1.6 2.5-2.3M7 9.5l3.4 1"/><circle cx="12" cy="12" r="1.6"/>',
      wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0"/><circle cx="12" cy="19" r="1.2" fill="currentColor" stroke="none"/>',
      mousepad: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h6"/>',
      controller: '<rect x="2" y="8" width="20" height="9" rx="4.5"/><path d="M7 12.5h3m-1.5-1.5v3"/><circle cx="15.5" cy="11.5" r="1"/><circle cx="17.5" cy="13.5" r="1"/>'
    };
    return '<svg viewBox="0 0 24 24">' + (M[type] || M.pc) + "</svg>";
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ============================================================
     DOM tayyor boʻlgach — barcha bogʻlanishlar
     ============================================================ */
  function init() {
    /* Til */
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.addEventListener("click", function () { applyLang(btn.dataset.lang); });
    });
    applyLang(currentLang);

    /* Preloader */
    var hide = function () { document.body.classList.add("loaded"); };
    window.addEventListener("load", function () { setTimeout(hide, 300); });
    setTimeout(hide, 2500);

    /* Mavzu */
    var saved = localStorage.getItem("upg-theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
    var themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("upg-theme", next);
    });

    /* Sticky header + toTop */
    var header = document.getElementById("header");
    var toTop = document.getElementById("toTop");
    function onScroll() {
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
      if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
    }
    if (toTop) toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mega menyu */
    var catalogBtn = document.getElementById("catalogBtn");
    var megaMenu = document.getElementById("megaMenu");
    function closeMega() { if (megaMenu) { megaMenu.classList.remove("is-open"); if (catalogBtn) catalogBtn.setAttribute("aria-expanded", "false"); } }
    if (catalogBtn && megaMenu) {
      catalogBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = megaMenu.classList.toggle("is-open");
        catalogBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (megaMenu.classList.contains("is-open") && !megaMenu.contains(e.target)) closeMega();
      });
      megaMenu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMega(); });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMega(); closeSugg(); if (drawer && drawer.classList.contains("is-open")) closeCart(); }
    });

    /* Qidiruv takliflari */
    var searchInput = document.getElementById("searchInput");
    var searchSugg = document.getElementById("searchSugg");
    var searchBox = document.getElementById("searchBox");
    function closeSugg() { if (searchSugg) searchSugg.classList.remove("is-open"); }

    function renderSugg(q) {
      if (!searchSugg || !window.UPG_DATA) return;
      q = q.trim().toLowerCase();
      if (q.length < 2) { closeSugg(); return; }
      var found = UPG_DATA.products.filter(function (p) {
        return p.name.toLowerCase().indexOf(q) !== -1 || p.brand.toLowerCase().indexOf(q) !== -1;
      }).slice(0, 6);
      if (!found.length) { closeSugg(); return; }
      searchSugg.innerHTML = found.map(function (p) {
        var idx = p.name.toLowerCase().indexOf(q);
        var hl = idx === -1 ? esc(p.name)
          : esc(p.name.slice(0, idx)) + "<mark>" + esc(p.name.slice(idx, idx + q.length)) + "</mark>" + esc(p.name.slice(idx + q.length));
        return '<a class="search__sugg-item" role="option" href="product.html?id=' + p.id + '">' +
          '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
          '<span>' + hl + '</span><small>' + fmt(p.price) + '</small></a>';
      }).join("");
      searchSugg.classList.add("is-open");
    }
    if (searchInput) {
      searchInput.addEventListener("input", function () { renderSugg(searchInput.value); });
      searchInput.addEventListener("focus", function () { renderSugg(searchInput.value); });
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          var q = searchInput.value.trim();
          if (q) location.href = "category.html?cat=all&q=" + encodeURIComponent(q);
        }
      });
    }
    if (searchBox) document.addEventListener("click", function (e) { if (!searchBox.contains(e.target)) closeSugg(); });

    var searchBtn = document.querySelector(".search__btn");
    if (searchBtn && searchInput) searchBtn.addEventListener("click", function () {
      var q = searchInput.value.trim();
      location.href = "category.html?cat=all" + (q ? "&q=" + encodeURIComponent(q) : "");
    });

    /* Kun taklifi taymeri */
    var dealTimer = document.getElementById("dealTimer");
    if (dealTimer) {
      var pad = function (n) { return String(n).padStart(2, "0"); };
      var tick = function () {
        var now = new Date();
        var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        var diff = Math.max(0, Math.floor((midnight - now) / 1000));
        dealTimer.textContent = pad(Math.floor(diff / 3600)) + ":" + pad(Math.floor((diff % 3600) / 60)) + ":" + pad(diff % 60);
      };
      tick(); setInterval(tick, 1000);
    }

    /* Mobil menyu */
    var burger = document.getElementById("burger");
    var subnav = document.getElementById("subnav");
    if (burger && subnav) {
      burger.addEventListener("click", function () {
        burger.classList.toggle("is-open");
        subnav.classList.toggle("is-open");
      });
      subnav.addEventListener("click", function (e) {
        if (e.target.closest("a")) { burger.classList.remove("is-open"); subnav.classList.remove("is-open"); }
      });
    }

    /* Scroll reveal */
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-visible"); ro.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { ro.observe(el); });

    /* Raqam hisoblagichlari */
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.dataset.count, 10), start = performance.now();
        (function step(now) {
          var p = Math.min((now - start) / 1400, 1), eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(step);
        })(start);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach(function (el) { co.observe(el); });

    /* Faol boʻlim (subnav) — faqat shu sahifadagi ankerlar uchun */
    var navLinks = [].slice.call(document.querySelectorAll('.subnav a[href^="#"]'));
    if (navLinks.length) {
      var map = {};
      navLinks.forEach(function (l) { var s = document.querySelector(l.getAttribute("href")); if (s) map[s.id] = l; });
      var ao = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && map[en.target.id]) {
            navLinks.forEach(function (l) { l.classList.remove("is-active"); });
            map[en.target.id].classList.add("is-active");
          }
        });
      }, { rootMargin: "-30% 0px -60% 0px" });
      Object.keys(map).forEach(function (id) { ao.observe(document.getElementById(id)); });
    }

    /* FAQ — bittadan ochilsin */
    var faqItems = document.querySelectorAll(".faq__item");
    faqItems.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        faqItems.forEach(function (o) { if (o !== item) o.open = false; });
      });
    });

    /* Newsletter */
    var newsForm = document.getElementById("newsForm");
    if (newsForm) newsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("newsEmail");
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
      if (!ok) { toast(t("t.newsErr")); email.focus(); return; }
      newsForm.reset(); toast(t("t.news"));
    });

    /* Savat oynasi */
    buildDrawer();
    updateBadges();

    var cartIcon = document.getElementById("cartIconBtn");
    if (cartIcon) cartIcon.addEventListener("click", openCart);

    /* Sevimlilar tugmasi — sevimlilar sahifasiga olib boradi */
    var favIcon = document.getElementById("favBtn");
    if (favIcon) favIcon.addEventListener("click", function () { location.href = "category.html?fav=1"; });

    /* Til oʻzgarganda savat oynasini qayta chizamiz */
    document.addEventListener("upg:langchange", renderDrawer);

    /* Event delegation — savat/sevimli tugmalari (dinamik kartalar ham) */
    document.addEventListener("click", function (e) {
      var addBtn = e.target.closest("[data-add]");
      if (addBtn) { e.preventDefault(); addToCart(addBtn.getAttribute("data-add")); return; }

      var favBtn = e.target.closest("[data-fav]");
      if (favBtn) {
        e.preventDefault();
        var id = favBtn.getAttribute("data-fav");
        var active = toggleFav(id);
        favBtn.classList.toggle("is-fav", active);
        var svg = favBtn.querySelector("svg");
        if (svg) svg.style.fill = active ? "var(--secondary)" : "none";
        return;
      }

      /* Drawer ichidagi amallar */
      var citem = e.target.closest(".citem");
      if (citem) {
        var act = (e.target.closest("[data-act]") || {}).getAttribute && e.target.closest("[data-act]").getAttribute("data-act");
        if (act) {
          var pid = citem.getAttribute("data-id");
          var line = cart.filter(function (i) { return i.id === pid; })[0];
          if (act === "inc") setQty(pid, (line ? line.qty : 0) + 1);
          else if (act === "dec") setQty(pid, (line ? line.qty : 0) - 1);
          else if (act === "del") removeFromCart(pid);
        }
      }

      if (e.target.closest("#clearCartBtn")) clearCart();
      if (e.target.closest("#checkoutBtn")) { clearCart(); closeCart(); toast(t("t.order")); }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* Public API (shop.js uchun) */
  return {
    t: t, fmt: fmt, esc: esc, iconSVG: iconSVG,
    lang: function () { return currentLang; },
    addToCart: addToCart, toggleFav: toggleFav, isFav: isFav,
    openCart: openCart, toast: toast
  };
})();
