/* ============================================================
   UPG — mahsulotlar bazasi
   Barcha nomlar va narxlar upg.uz saytidan olingan (real data)
   ============================================================ */

window.UPG_DATA = {
  categories: [
    { slug: "sborki",       uz: "Tayyor yigʻilmalar",        ru: "Готовые сборки",      type: "pc",        icon: "pc" },
    { slug: "noutbuklar",   uz: "Noutbuklar",                ru: "Ноутбуки",            type: "laptop",    icon: "laptop" },
    { slug: "monitorlar",   uz: "Monitorlar",                ru: "Мониторы",            type: "monitor",   icon: "monitor" },
    { slug: "klaviaturalar",uz: "Klaviaturalar",             ru: "Клавиатуры",          type: "kb",        icon: "kb" },
    { slug: "sichqonchalar",uz: "Sichqonchalar",             ru: "Мыши",                type: "mouse",     icon: "mouse" },
    { slug: "garnituralar", uz: "Garnituralar",              ru: "Наушники",            type: "headset",   icon: "headset" },
    { slug: "kreslolar",    uz: "Gaming kreslolar",          ru: "Игровые кресла",      type: "chair",     icon: "chair" },
    { slug: "keyslar",      uz: "Keyslar",                   ru: "Корпуса",             type: "case",      icon: "case" },
    { slug: "quvvat",       uz: "Quvvat bloklari",           ru: "Блоки питания",       type: "psu",       icon: "psu" },
    { slug: "sovutish",     uz: "Sovutish tizimlari",        ru: "Охлаждение",          type: "cooler",    icon: "cooler" },
    { slug: "wifi",         uz: "Wi-Fi routerlar",           ru: "Wi-Fi роутеры",       type: "wifi",      icon: "wifi" },
    { slug: "gilamchalar",  uz: "Sichqoncha gilamchalari",   ru: "Коврики для мыши",    type: "mousepad",  icon: "mousepad" },
    { slug: "kontrollerlar",uz: "Gaming kontrollerlar",      ru: "Игровые контроллеры", type: "controller",icon: "controller" }
  ],

  products: [
    /* ---- Tayyor yigʻilmalar ---- */
    { id: "sb1", cat: "sborki", brand: "UPG",    type: "pc", name: "UPG START — Ryzen 5 7500F / RTX 5060 8GB / 16GB",  price: 9500000 },
    { id: "sb2", cat: "sborki", brand: "UPG",    type: "pc", name: "UPG PRO — Ryzen 7 9800X3D / RTX 5070 Ti 16GB / 32GB", price: 24900000 },
    { id: "sb3", cat: "sborki", brand: "UPG",    type: "pc", name: "UPG ULTRA — Core Ultra 9 285K / RTX 5090 32GB / 64GB", price: 58700000 },
    { id: "sb4", cat: "sborki", brand: "Zotac",  type: "pc", name: "Zotac Magnus One i5-10400F / 16GB / 1TB / 500W", price: 7440000 },
    { id: "sb5", cat: "sborki", brand: "Zotac",  type: "pc", name: "Zotac Magnus One i3-10100F / 8GB / 1TB / 500W",  price: 6200000 },

    /* ---- Noutbuklar ---- */
    { id: "nb1",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS TUF Gaming A16 FA608PP RTX 5070", price: 17908000 },
    { id: "nb2",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS Zenbook 14 OLED UX3405CA-PZ541W", price: 14999000 },
    { id: "nb3",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS Zenbook 14 OLED UX3405CA-QL200W", price: 12705000 },
    { id: "nb4",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS ExpertBook P1 P1503CVA-S72002", price: 6000000 },
    { id: "nb5",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS Gaming V16 V3607VM-RP005", price: 12210000 },
    { id: "nb6",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS Gaming V16 V3607VM-RP006", price: 14762000 },
    { id: "nb7",  cat: "noutbuklar", brand: "ASUS",  type: "laptop", name: "ASUS TUF Gaming F16 FX608JPR-QT035", price: 18375000 },
    { id: "nb8",  cat: "noutbuklar", brand: "Chuwi", type: "laptop", name: "Chuwi CoreBook Plus CW1626", price: 6499000 },
    { id: "nb9",  cat: "noutbuklar", brand: "Chuwi", type: "laptop", name: "Chuwi CoreBook X CW1570", price: 5999000 },
    { id: "nb10", cat: "noutbuklar", brand: "HP",    type: "laptop", name: "HP Laptop 15-fc0284ci Silver", price: 8296000 },
    { id: "nb11", cat: "noutbuklar", brand: "HP",    type: "laptop", name: "HP NERO 15-fc0223AU", price: 5510000 },
    { id: "nb12", cat: "noutbuklar", brand: "HP",    type: "laptop", name: "HP OMEN 16-am0148TX", price: 16093000 },

    /* ---- Monitorlar ---- */
    { id: "mo1",  cat: "monitorlar", brand: "2E",   type: "monitor", name: "2E Gaming R2723BV 27\" 165Hz VA Curved", price: 2019000 },
    { id: "mo2",  cat: "monitorlar", brand: "ASUS", type: "monitor", name: "ASUS ProArt PA278QV 27\" 75Hz IPS", price: 5692500 },
    { id: "mo3",  cat: "monitorlar", brand: "ASUS", type: "monitor", name: "ASUS ProArt PA278CFRV 27\" 100Hz IPS", price: 7590000 },
    { id: "mo4",  cat: "monitorlar", brand: "ASUS", type: "monitor", name: "ASUS ProArt PA329CV 32\" 60Hz IPS", price: 11638000 },
    { id: "mo5",  cat: "monitorlar", brand: "ASUS", type: "monitor", name: "ASUS ROG Strix XG27ACG 27\" 180Hz Fast IPS", price: 4840000 },
    { id: "mo6",  cat: "monitorlar", brand: "ASUS", type: "monitor", name: "ASUS ROG Strix XG27UCS 27\" 160Hz Fast IPS", price: 7843000 },
    { id: "mo7",  cat: "monitorlar", brand: "BenQ", type: "monitor", name: "BenQ Zowie XL2586X 24.1\" 540Hz Fast TN", price: 15812500 },
    { id: "mo8",  cat: "monitorlar", brand: "BenQ", type: "monitor", name: "BenQ Zowie XL2586X+ 24.1\" 600Hz Fast TN", price: 18342500 },
    { id: "mo9",  cat: "monitorlar", brand: "Dell", type: "monitor", name: "Dell 27 Plus S2725QC 27\" 120Hz IPS", price: 5819000 },
    { id: "mo10", cat: "monitorlar", brand: "Dell", type: "monitor", name: "Dell 27 Plus S2725QS 27\" 120Hz IPS", price: 4554000 },
    { id: "mo11", cat: "monitorlar", brand: "Dell", type: "monitor", name: "Dell 32 Plus S3225QS 32\" 120Hz VA", price: 6198500 },
    { id: "mo12", cat: "monitorlar", brand: "Dell", type: "monitor", name: "Dell 34 Plus S3425DW 34\" 120Hz VA Curved", price: 6831000 },

    /* ---- Klaviaturalar ---- */
    { id: "kb1",  cat: "klaviaturalar", brand: "Keychron",  type: "kb", name: "Keychron V1 QMK Custom Red Switch RGB HotSwap", price: 915000 },
    { id: "kb2",  cat: "klaviaturalar", brand: "1STPlayer", type: "kb", name: "1STPlayer NEO 87 Thunderstorm", price: 750000 },
    { id: "kb3",  cat: "klaviaturalar", brand: "1STPlayer", type: "kb", name: "1STPlayer NEO87 Midnight Violet", price: 605000 },
    { id: "kb4",  cat: "klaviaturalar", brand: "1STPlayer", type: "kb", name: "1STPlayer NEO87 Rome", price: 665000 },
    { id: "kb5",  cat: "klaviaturalar", brand: "1STPlayer", type: "kb", name: "1STPlayer NEO87 Rose Nebula", price: 665000 },
    { id: "kb6",  cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E Gaming KG315 RGB Black", price: 209000 },
    { id: "kb7",  cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E Gaming KG315 RGB Yellow", price: 209000 },
    { id: "kb8",  cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E Gaming KG345 RGB", price: 189000 },
    { id: "kb9",  cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E KS230 Slim Wireless Black", price: 130000 },
    { id: "kb10", cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E KS240 Wireless Gray", price: 270000 },
    { id: "kb11", cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E KS250 Wireless Black", price: 270000 },
    { id: "kb12", cat: "klaviaturalar", brand: "2E",        type: "kb", name: "2E KS260 Black", price: 139000 },

    /* ---- Sichqonchalar ---- */
    { id: "ms1",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E Gaming HyperSpeed Lite Retro White Wireless", price: 430000 },
    { id: "ms2",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E Gaming HyperSpeed Pro Black", price: 430000 },
    { id: "ms3",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E Gaming HyperSpeed Pro Retro White", price: 430000 },
    { id: "ms4",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E Gaming MG270 Wireless", price: 205000 },
    { id: "ms5",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E Gaming MG350 Wireless RGB", price: 273000 },
    { id: "ms6",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E Gaming MG355 Black Wireless", price: 250000 },
    { id: "ms7",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E MF130 Black", price: 50000 },
    { id: "ms8",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E MF211 Wireless Black", price: 80000 },
    { id: "ms9",  cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E MF211 Wireless Gray", price: 80000 },
    { id: "ms10", cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E MF211 Wireless Red", price: 80000 },
    { id: "ms11", cat: "sichqonchalar", brand: "2E",  type: "mouse", name: "2E MF217 Wireless Black", price: 80000 },
    { id: "ms12", cat: "sichqonchalar", brand: "ATK", type: "mouse", name: "ATK A9 Air Wireless White", price: 847000 },

    /* ---- Garnituralar ---- */
    { id: "hs1",  cat: "garnituralar", brand: "2E",            type: "headset", name: "2E Gaming HG300 Black", price: 196000 },
    { id: "hs2",  cat: "garnituralar", brand: "2E",            type: "headset", name: "2E Gaming HG315 RGB USB 7.1 Black", price: 249000 },
    { id: "hs3",  cat: "garnituralar", brand: "ATK",           type: "headset", name: "ATK Neptune N9 PRO Black", price: 544500 },
    { id: "hs4",  cat: "garnituralar", brand: "ATK",           type: "headset", name: "ATK Neptune N9 PRO White", price: 544500 },
    { id: "hs5",  cat: "garnituralar", brand: "ATK",           type: "headset", name: "ATK Neptune N9 ULTRA Orange", price: 665500 },
    { id: "hs6",  cat: "garnituralar", brand: "ATK",           type: "headset", name: "ATK Neptune N9 ULTRA Pink", price: 665500 },
    { id: "hs7",  cat: "garnituralar", brand: "Audio-Technica",type: "headset", name: "Audio-Technica ATH-M40x Black", price: 1653000 },
    { id: "hs8",  cat: "garnituralar", brand: "Canyon",        type: "headset", name: "Canyon HP-2 Black", price: 242000 },
    { id: "hs9",  cat: "garnituralar", brand: "Edifier",       type: "headset", name: "Edifier Hecate G2 II Black", price: 455000 },
    { id: "hs10", cat: "garnituralar", brand: "Edifier",       type: "headset", name: "Edifier Hecate G2 II White", price: 455000 },
    { id: "hs11", cat: "garnituralar", brand: "Edifier",       type: "headset", name: "Edifier Hecate G2 S Black", price: 796000 },
    { id: "hs12", cat: "garnituralar", brand: "Edifier",       type: "headset", name: "Edifier W800BT Plus Red", price: 499000 },

    /* ---- Gaming kreslolar ---- */
    { id: "ch1",  cat: "kreslolar", brand: "2E",     type: "chair", name: "2E Gaming BASAN Black/Red Gen II", price: 2829000 },
    { id: "ch2",  cat: "kreslolar", brand: "2E",     type: "chair", name: "2E Gaming BUSHIDO Lite 2D Dark Grey", price: 2232000 },
    { id: "ch3",  cat: "kreslolar", brand: "2E",     type: "chair", name: "2E Gaming BUSHIDO Lite 2D Dark Green", price: 2209000 },
    { id: "ch4",  cat: "kreslolar", brand: "2E",     type: "chair", name: "2E Gaming HEBI Black/Green", price: 1589000 },
    { id: "ch5",  cat: "kreslolar", brand: "2E",     type: "chair", name: "2E Gaming HEBI Black/White", price: 1599000 },
    { id: "ch6",  cat: "kreslolar", brand: "2E",     type: "chair", name: "2E Gaming HIBAGON Black/Red Gen II", price: 2459000 },
    { id: "ch7",  cat: "kreslolar", brand: "Acer",   type: "chair", name: "Acer Predator Rift Go PGC 331", price: 2138500 },
    { id: "ch8",  cat: "kreslolar", brand: "HyperX", type: "chair", name: "HyperX Blast Core Black/Red", price: 2238500 },
    { id: "ch9",  cat: "kreslolar", brand: "MYTH",   type: "chair", name: "MYTH DARK KNIGHT Dark Blue", price: 2999000 },
    { id: "ch10", cat: "kreslolar", brand: "MYTH",   type: "chair", name: "MYTH GHOST Dark Grey", price: 1949000 },
    { id: "ch11", cat: "kreslolar", brand: "MYTH",   type: "chair", name: "MYTH GOLEM Black", price: 3630000 },
    { id: "ch12", cat: "kreslolar", brand: "MYTH",   type: "chair", name: "MYTH MIDAS Black", price: 2999000 },

    /* ---- Keyslar ---- */
    { id: "cs1",  cat: "keyslar", brand: "ASUS",         type: "case", name: "ASUS PRIME AP201 White Edition", price: 484000, old: 847000 },
    { id: "cs2",  cat: "keyslar", brand: "Cooler Master",type: "case", name: "Cooler Master COSMOS Infinity 30th Anniversary", price: 15625000 },
    { id: "cs3",  cat: "keyslar", brand: "Cooler Master",type: "case", name: "Cooler Master HAF 500 White", price: 1715000 },
    { id: "cs4",  cat: "keyslar", brand: "Cooler Master",type: "case", name: "Cooler Master MasterFrame 700 Black", price: 2187500 },
    { id: "cs5",  cat: "keyslar", brand: "Cooler Master",type: "case", name: "Cooler Master MasterBox TD500 Mesh V2 White", price: 1358000 },
    { id: "cs6",  cat: "keyslar", brand: "Cooler Master",type: "case", name: "Cooler Master QUBE 500 Flatpack Macaron", price: 1089000 },
    { id: "cs7",  cat: "keyslar", brand: "DeepCool",     type: "case", name: "DeepCool CC560 V2 White", price: 780000 },
    { id: "cs8",  cat: "keyslar", brand: "DeepCool",     type: "case", name: "DeepCool CH780 White", price: 2188000 },
    { id: "cs9",  cat: "keyslar", brand: "DeepCool",     type: "case", name: "DeepCool CK560 White", price: 726000, old: 1016400 },
    { id: "cs10", cat: "keyslar", brand: "DeepCool",     type: "case", name: "DeepCool MATREXX 55 V3 ADD-RGB White", price: 665500, old: 968000 },
    { id: "cs11", cat: "keyslar", brand: "DeepCool",     type: "case", name: "DeepCool Quadstellar Infinity", price: 2420000, old: 4356000 },
    { id: "cs12", cat: "keyslar", brand: "GameMax",      type: "case", name: "GameMax Hype Black", price: 1799000 },

    /* ---- Quvvat bloklari ---- */
    { id: "ps1",  cat: "quvvat", brand: "Be Quiet!",     type: "psu", name: "Be Quiet! Pure Power 11 FM Gold 750W", price: 1089000, old: 2057000 },
    { id: "ps2",  cat: "quvvat", brand: "Be Quiet!",     type: "psu", name: "Be Quiet! Pure Power 12 M Gold 1200W", price: 3509000 },
    { id: "ps3",  cat: "quvvat", brand: "Chieftec",      type: "psu", name: "Chieftec Polaris 3.0 1050W Black", price: 2427300 },
    { id: "ps4",  cat: "quvvat", brand: "Cooler Master", type: "psu", name: "Cooler Master MWE 1250W V2 Gold", price: 3075000 },
    { id: "ps5",  cat: "quvvat", brand: "Montech",       type: "psu", name: "Montech APX 550W", price: 549000 },
    { id: "ps6",  cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Beta P500", price: 392000 },
    { id: "ps7",  cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Beta P600", price: 455100 },
    { id: "ps8",  cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Beta P700", price: 515000 },
    { id: "ps9",  cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Delta P650S", price: 665000 },
    { id: "ps10", cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Gamma P550", price: 430000 },
    { id: "ps11", cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Gamma P750", price: 549000 },
    { id: "ps12", cat: "quvvat", brand: "Ocypus",        type: "psu", name: "Ocypus Iota P1000S", price: 1331000 },

    /* ---- Sovutish tizimlari ---- */
    { id: "cl1", cat: "sovutish", brand: "2E",     type: "cooler", name: "2E Gaming Case Fan 120mm OEM", price: 62000 },
    { id: "cl2", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Freezer 36 A-RGB Black", price: 675000 },
    { id: "cl3", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Freezer 36 A-RGB White", price: 675000 },
    { id: "cl4", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Freezer 36 Black", price: 552000 },
    { id: "cl5", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Liquid Freezer III Pro 240 A-RGB Black", price: 1331000 },
    { id: "cl6", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Liquid Freezer III Pro 240 A-RGB White", price: 1331000 },
    { id: "cl7", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Liquid Freezer III Pro 240 Black", price: 1270500 },
    { id: "cl8", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Liquid Freezer III Pro 280 A-RGB Black", price: 1512500 },
    { id: "cl9", cat: "sovutish", brand: "Arctic", type: "cooler", name: "Arctic Liquid Freezer III Pro 280 A-RGB White", price: 1512500 },

    /* ---- Wi-Fi routerlar ---- */
    { id: "wf1",  cat: "wifi", brand: "ASUS",    type: "wifi", name: "ASUS AiMesh RT-AX92U (2 Pack)", price: 1452000, old: 3388000 },
    { id: "wf2",  cat: "wifi", brand: "ASUS",    type: "wifi", name: "ASUS Blue Cave AC2600", price: 619500, old: 980000 },
    { id: "wf3",  cat: "wifi", brand: "ASUS",    type: "wifi", name: "ASUS Lyra Voice AC2200", price: 748500, old: 1592500 },
    { id: "wf4",  cat: "wifi", brand: "ASUS",    type: "wifi", name: "ASUS ROG Rapture GT-AX11000", price: 4860000, old: 6050000 },
    { id: "wf5",  cat: "wifi", brand: "ASUS",    type: "wifi", name: "ASUS RT-AC51U", price: 364500, old: 605000 },
    { id: "wf6",  cat: "wifi", brand: "ASUS",    type: "wifi", name: "ASUS XG-C100F Network Adapter", price: 1892250 },
    { id: "wf7",  cat: "wifi", brand: "TP-Link", type: "wifi", name: "TP-Link Archer T1300 Nano", price: 246000 },
    { id: "wf8",  cat: "wifi", brand: "TP-Link", type: "wifi", name: "TP-Link Archer T600U Nano", price: 230000 },
    { id: "wf9",  cat: "wifi", brand: "TP-Link", type: "wifi", name: "TP-Link T2UB Nano", price: 195000 },
    { id: "wf10", cat: "wifi", brand: "TP-Link", type: "wifi", name: "TP-Link TG-3468", price: 186000 },
    { id: "wf11", cat: "wifi", brand: "TP-Link", type: "wifi", name: "TP-Link WN722N", price: 184500 },
    { id: "wf12", cat: "wifi", brand: "TP-Link", type: "wifi", name: "TP-Link WN725N", price: 123000 },

    /* ---- Sichqoncha gilamchalari ---- */
    { id: "mp1",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming Pro Speed XL Yellow", price: 179000 },
    { id: "mp2",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming PRO Control L Black", price: 126500 },
    { id: "mp3",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming PRO Speed L White", price: 110000 },
    { id: "mp4",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming PRO Speed XL White", price: 149000 },
    { id: "mp5",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming Pro Speed XL D03", price: 181500 },
    { id: "mp6",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming Pro Speed XL D07", price: 179000 },
    { id: "mp7",  cat: "gilamchalar", brand: "2E",        type: "mousepad", name: "2E Gaming Pro Speed XL Pink", price: 179000 },
    { id: "mp8",  cat: "gilamchalar", brand: "AKKO",      type: "mousepad", name: "AKKO Hello Kitty Peking Opera Deskmat A", price: 181500, old: 242000 },
    { id: "mp9",  cat: "gilamchalar", brand: "AKKO",      type: "mousepad", name: "AKKO Hello Kitty Peking Opera Deskmat B", price: 181500, old: 242000 },
    { id: "mp10", cat: "gilamchalar", brand: "ASUS",      type: "mousepad", name: "ASUS ROG Sheath Mousepad XL", price: 520000 },
    { id: "mp11", cat: "gilamchalar", brand: "Corsair",   type: "mousepad", name: "Corsair MM1000 Qi Wireless", price: 363000 },
    { id: "mp12", cat: "gilamchalar", brand: "GravaStar", type: "mousepad", name: "GravaStar SAKURA XXL Pink", price: 314600 },

    /* ---- Gaming kontrollerlar ---- */
    { id: "ct1", cat: "kontrollerlar", brand: "Logitech", type: "controller", name: "Logitech G923 Racing Wheel", price: 5445000 },
    { id: "ct2", cat: "kontrollerlar", brand: "Logitech", type: "controller", name: "Logitech Driving Force Shifter", price: 968000 }
  ]
};
