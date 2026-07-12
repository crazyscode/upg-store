/* ============================================================
   UPG — PK Konfigurator
   Komponentlarni tanlash + avtomatik moslik tekshiruvi
   ============================================================ */

(function () {
  "use strict";

  var app = document.getElementById("cfgApp");
  if (!app) return;

  var esc = UPG.esc, iconSVG = UPG.iconSVG, fmt = UPG.fmt;

  /* ---------- Komponentlar bazasi ----------
     socket: AM5 / LGA1851 ; ram: DDR5 ; tdp: vatt
     Narxlar soʻmda (upg.uz darajasidagi real narxlar)          */
  var COMPONENTS = {
    cpu: [
      { id: "cpu1", type: "cpu", name: "AMD Ryzen 5 7500F", brand: "AMD", price: 1150000, socket: "AM5", ram: "DDR5", tdp: 65 },
      { id: "cpu2", type: "cpu", name: "AMD Ryzen 7 9800X3D", brand: "AMD", price: 5900000, socket: "AM5", ram: "DDR5", tdp: 120 },
      { id: "cpu3", type: "cpu", name: "AMD Ryzen 9 9950X3D", brand: "AMD", price: 9250000, socket: "AM5", ram: "DDR5", tdp: 170 },
      { id: "cpu4", type: "cpu", name: "Intel Core Ultra 5 245K", brand: "Intel", price: 3400000, socket: "LGA1851", ram: "DDR5", tdp: 159 },
      { id: "cpu5", type: "cpu", name: "Intel Core Ultra 9 285K", brand: "Intel", price: 7800000, socket: "LGA1851", ram: "DDR5", tdp: 250 }
    ],
    mobo: [
      { id: "mb1", type: "mobo", name: "ASUS TUF Gaming B650-PLUS", brand: "ASUS", price: 2300000, socket: "AM5", ram: "DDR5", form: "ATX" },
      { id: "mb2", type: "mobo", name: "MSI MAG B650 Tomahawk WiFi", brand: "MSI", price: 2600000, socket: "AM5", ram: "DDR5", form: "ATX" },
      { id: "mb3", type: "mobo", name: "ASUS ROG Strix X870-A Gaming", brand: "ASUS", price: 4900000, socket: "AM5", ram: "DDR5", form: "ATX" },
      { id: "mb4", type: "mobo", name: "MSI PRO Z890-P WiFi", brand: "MSI", price: 3700000, socket: "LGA1851", ram: "DDR5", form: "ATX" },
      { id: "mb5", type: "mobo", name: "ASUS ROG Strix Z890-E Gaming", brand: "ASUS", price: 6400000, socket: "LGA1851", ram: "DDR5", form: "ATX" }
    ],
    ram: [
      { id: "rm1", type: "ram", name: "Kingston Fury Beast 16GB DDR5 5600", brand: "Kingston", price: 820000, ram: "DDR5", cap: 16 },
      { id: "rm2", type: "ram", name: "Kingston Fury Beast RGB 32GB DDR5 6000", brand: "Kingston", price: 1650000, ram: "DDR5", cap: 32 },
      { id: "rm3", type: "ram", name: "Corsair Vengeance 64GB DDR5 6400", brand: "Corsair", price: 3200000, ram: "DDR5", cap: 64 }
    ],
    gpu: [
      { id: "gp1", type: "gpu", name: "GeForce RTX 5060 8GB", brand: "NVIDIA", price: 6500000, tdp: 145, len: 244 },
      { id: "gp2", type: "gpu", name: "GeForce RTX 5070 Ti 16GB", brand: "NVIDIA", price: 13000000, tdp: 300, len: 304 },
      { id: "gp3", type: "gpu", name: "GeForce RTX 5080 16GB", brand: "NVIDIA", price: 16900000, tdp: 360, len: 330 },
      { id: "gp4", type: "gpu", name: "GeForce RTX 5090 32GB", brand: "NVIDIA", price: 33000000, tdp: 575, len: 358 }
    ],
    ssd: [
      { id: "sd1", type: "ssd", name: "Samsung 990 EVO 1TB NVMe", brand: "Samsung", price: 1150000, tdp: 7 },
      { id: "sd2", type: "ssd", name: "Samsung 990 Pro 2TB NVMe", brand: "Samsung", price: 2350000, tdp: 8 },
      { id: "sd3", type: "ssd", name: "WD Black SN850X 2TB NVMe", brand: "WD", price: 2200000, tdp: 8 }
    ],
    cooler: [
      { id: "cl_a", type: "cooler", name: "Arctic Freezer 36 Black", brand: "Arctic", price: 552000, sockets: ["AM5", "LGA1851"], rated: 200 },
      { id: "cl_b", type: "cooler", name: "Arctic Liquid Freezer III 240", brand: "Arctic", price: 1270500, sockets: ["AM5", "LGA1851"], rated: 300 },
      { id: "cl_c", type: "cooler", name: "Arctic Liquid Freezer III 280", brand: "Arctic", price: 1512500, sockets: ["AM5", "LGA1851"], rated: 380 }
    ],
    "case": [
      { id: "cs_a", type: "case", name: "ASUS PRIME AP201 White", brand: "ASUS", price: 484000, forms: ["ATX", "mATX"], maxGpu: 338 },
      { id: "cs_b", type: "case", name: "DeepCool CK560 White", brand: "DeepCool", price: 726000, forms: ["ATX", "mATX"], maxGpu: 380 },
      { id: "cs_c", type: "case", name: "Cooler Master TD500 Mesh V2", brand: "Cooler Master", price: 1358000, forms: ["ATX", "mATX"], maxGpu: 410 }
    ],
    psu: [
      { id: "ps_a", type: "psu", name: "Montech APX 550W", brand: "Montech", price: 549000, watt: 550 },
      { id: "ps_b", type: "psu", name: "Ocypus Gamma P750", brand: "Ocypus", price: 549000, watt: 750 },
      { id: "ps_c", type: "psu", name: "Cooler Master MWE 1250W V2", brand: "Cooler Master", price: 3075000, watt: 1250 },
      { id: "ps_d", type: "psu", name: "Be Quiet! Pure Power 12 M 1200W", brand: "Be Quiet!", price: 3509000, watt: 1200 }
    ]
  };

  var SLOTS = ["cpu", "mobo", "cooler", "ram", "gpu", "ssd", "case", "psu"];

  /* ---------- Ikki tilli matnlar ---------- */
  var STR = {
    uz: {
      title: "PK Konfigurator", sub: "Komponentlarni tanlang — tizim mosligini avtomatik tekshiradi",
      cpu: "Protsessor", mobo: "Anakart", cooler: "Sovutish", ram: "Operativ xotira",
      gpu: "Videokarta", ssd: "SSD disk", "case": "Keys", psu: "Quvvat bloki",
      choose: "Tanlang", change: "Oʻzgartirish", remove: "Olib tashlash",
      pick: "tanlang", summary: "Yigʻilma xulosasi", total: "Jami narx",
      power: "Quvvat sarfi", recommend: "tavsiya", compat: "Moslik",
      ok: "Barcha komponentlar mos!", pickAll: "Kerakli qismlarni tanlang",
      addCart: "Yigʻilmani savatga qoʻshish", reset: "Tozalash",
      added: "Yigʻilma savatga qoʻshildi!", incompatible: "Nomuvofiqliklar bor — tuzating",
      buildName: "UPG shaxsiy yigʻilma", parts: "qism",
      wSocket: "{cpu} ({s1}) anakartga ({s2}) mos emas",
      wRam: "{ram} anakart ({m}) bilan mos emas",
      wCooler: "Sovutgich {cpu} soketini ({s}) qoʻllab-quvvatlamaydi",
      wCoolerTdp: "Sovutgich quvvati yetarli emas ({r}W < {t}W)",
      wPsu: "Quvvat bloki kuchsiz — {have}W, kamida {need}W kerak",
      wGpuCase: "Videokarta ({g}mm) keysga ({c}mm) sigʻmaydi",
      required: "majburiy"
    },
    ru: {
      title: "Конфигуратор ПК", sub: "Выберите комплектующие — система проверит совместимость",
      cpu: "Процессор", mobo: "Материнская плата", cooler: "Охлаждение", ram: "Оперативная память",
      gpu: "Видеокарта", ssd: "SSD накопитель", "case": "Корпус", psu: "Блок питания",
      choose: "Выбрать", change: "Изменить", remove: "Убрать",
      pick: "выберите", summary: "Итоги сборки", total: "Итоговая цена",
      power: "Потребление", recommend: "рекомендуется", compat: "Совместимость",
      ok: "Все компоненты совместимы!", pickAll: "Выберите нужные детали",
      addCart: "Добавить сборку в корзину", reset: "Сбросить",
      added: "Сборка добавлена в корзину!", incompatible: "Есть несовместимости — исправьте",
      buildName: "UPG индивидуальная сборка", parts: "деталей",
      wSocket: "{cpu} ({s1}) несовместим с платой ({s2})",
      wRam: "{ram} несовместима с платой ({m})",
      wCooler: "Кулер не поддерживает сокет {cpu} ({s})",
      wCoolerTdp: "Мощности кулера недостаточно ({r}W < {t}W)",
      wPsu: "Блок питания слаб — {have}W, нужно минимум {need}W",
      wGpuCase: "Видеокарта ({g}мм) не помещается в корпус ({c}мм)",
      required: "обязательно"
    }
  };
  function L() { return STR[UPG.lang()] || STR.uz; }
  function tt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }

  /* ---------- Holat ---------- */
  var sel = {};
  try { sel = JSON.parse(localStorage.getItem("upg-build")) || {}; } catch (e) { sel = {}; }
  function save() { localStorage.setItem("upg-build", JSON.stringify(sel)); }

  function get(slot) {
    var id = sel[slot];
    if (!id) return null;
    return COMPONENTS[slot].filter(function (c) { return c.id === id; })[0] || null;
  }

  /* Bazadan olib tashlangan (eskirgan) id'larni tozalaymiz */
  SLOTS.forEach(function (s) { if (sel[s] && !get(s)) delete sel[s]; });

  /* ---------- Moslik dvigateli ---------- */
  function analyze() {
    var w = [], L2 = L();
    var cpu = get("cpu"), mb = get("mobo"), ram = get("ram"), gpu = get("gpu"),
        cooler = get("cooler"), cs = get("case"), psu = get("psu");

    if (cpu && mb && cpu.socket !== mb.socket)
      w.push(tt(L2.wSocket, { cpu: cpu.name, s1: cpu.socket, s2: mb.socket }));
    if (ram && mb && ram.ram !== mb.ram)
      w.push(tt(L2.wRam, { ram: ram.name, m: mb.ram }));
    if (cooler && cpu && cooler.sockets.indexOf(cpu.socket) === -1)
      w.push(tt(L2.wCooler, { cpu: cpu.name, s: cpu.socket }));
    if (cooler && cpu && cooler.rated < cpu.tdp)
      w.push(tt(L2.wCoolerTdp, { r: cooler.rated, t: cpu.tdp }));
    if (gpu && cs && gpu.len > cs.maxGpu)
      w.push(tt(L2.wGpuCase, { g: gpu.len, c: cs.maxGpu }));

    // Quvvat sarfi — har bir tanlangan komponent tdp'sini qoʻshamiz
    var draw = 60; // anakart + fanlar uchun bazaviy sarf
    SLOTS.forEach(function (s) { var c = get(s); if (c && c.tdp) draw += c.tdp; });
    var need = Math.ceil((draw + 150) / 50) * 50; // 150W zaxira bilan tavsiya

    if (psu && psu.watt < need)
      w.push(tt(L2.wPsu, { have: psu.watt, need: need }));

    var total = 0;
    SLOTS.forEach(function (s) { var c = get(s); if (c) total += c.price; });

    return { warnings: w, draw: draw, need: need, total: total, count: SLOTS.filter(function (s) { return sel[s]; }).length };
  }

  /* ---------- Render ---------- */
  function render() {
    var L2 = L();
    document.title = L2.title + " — UPG";
    document.body.style.overflow = ""; // til almashganda ochiq picker qulfini yechamiz
    app.innerHTML =
      '<nav class="breadcrumb"><a href="index.html">' + UPG.t("shop.home") + '</a><span>/</span><b>' + L2.title + '</b></nav>' +
      '<div class="cfg-head"><div class="cfg-head__icon">' +
        '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></svg></div>' +
        '<div><h1 class="cfg-head__title">' + L2.title + '</h1><p class="cfg-head__sub">' + L2.sub + '</p></div></div>' +
      '<div class="cfg">' +
        '<div class="cfg-slots" id="cfgSlots"></div>' +
        '<aside class="cfg-summary" id="cfgSummary"></aside>' +
      '</div>' +
      '<div class="cfg-picker" id="cfgPicker" aria-hidden="true"><div class="cfg-picker__panel" role="dialog" aria-modal="true" aria-labelledby="pickerTitle">' +
        '<div class="cfg-picker__head"><b id="pickerTitle"></b>' +
        '<button class="drawer__close" id="pickerClose" type="button" aria-label="Yopish"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>' +
        '<div class="cfg-picker__body" id="pickerBody"></div>' +
      '</div></div>';

    renderSlots();
    renderSummary();

    document.getElementById("cfgPicker").inert = true;
    document.getElementById("pickerClose").addEventListener("click", closePicker);
    document.getElementById("cfgPicker").addEventListener("click", function (e) {
      if (e.target.id === "cfgPicker") closePicker();
    });
  }

  function slotArt(type, brand) {
    return (window.UPG_ART ? UPG_ART(type, brand) : iconSVG(type));
  }

  function renderSlots() {
    var L2 = L();
    document.getElementById("cfgSlots").innerHTML = SLOTS.map(function (slot) {
      var c = get(slot);
      var picked = !!c;
      return (
        '<div class="cfg-slot' + (picked ? " is-set" : "") + '" data-slot="' + slot + '">' +
          '<div class="cfg-slot__icon">' + iconSVG(slot) + '</div>' +
          '<div class="cfg-slot__main">' +
            '<span class="cfg-slot__label">' + L2[slot] + '</span>' +
            (picked
              ? '<b class="cfg-slot__name">' + esc(c.name) + '</b><span class="cfg-slot__price">' + fmt(c.price) + '</span>'
              : '<span class="cfg-slot__empty">' + L2[slot] + ' ' + L2.pick + '</span>') +
          '</div>' +
          (picked
            ? '<button class="cfg-slot__btn" data-act="change" type="button">' + L2.change + '</button>' +
              '<button class="cfg-slot__rm" data-act="remove" type="button" aria-label="' + L2.remove + '"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>'
            : '<button class="cfg-slot__btn cfg-slot__btn--primary" data-act="change" type="button">' + L2.choose + '</button>') +
        '</div>'
      );
    }).join("");

    document.querySelectorAll(".cfg-slot").forEach(function (el) {
      var slot = el.dataset.slot;
      el.querySelectorAll("[data-act]").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          if (btn.dataset.act === "remove") { delete sel[slot]; save(); renderSlots(); renderSummary(); }
          else openPicker(slot);
        });
      });
    });
  }

  function renderSummary() {
    var L2 = L(), a = analyze();
    var barMax = Math.max(a.need, a.draw + 150, 100);
    var drawPct = Math.min(100, Math.round(a.draw / barMax * 100));

    var status = a.count === 0
      ? '<div class="cfg-status cfg-status--idle">' + L2.pickAll + '</div>'
      : (a.warnings.length
        ? '<div class="cfg-status cfg-status--bad"><b>' + L2.incompatible + '</b><ul>' +
            a.warnings.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join("") + '</ul></div>'
        : '<div class="cfg-status cfg-status--ok"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>' + L2.ok + '</div>');

    document.getElementById("cfgSummary").innerHTML =
      '<h2 class="cfg-summary__title">' + L2.summary + '</h2>' +
      status +
      '<div class="cfg-power"><div class="cfg-power__row"><span>' + L2.power + '</span><b>' + a.draw + ' W</b></div>' +
        '<div class="cfg-power__bar"><i style="width:' + drawPct + '%"></i></div>' +
        '<div class="cfg-power__row cfg-power__row--muted"><span>PSU ' + L2.recommend + '</span><b>' + a.need + ' W+</b></div></div>' +
      '<div class="cfg-total"><span>' + L2.total + '</span><b>' + fmt(a.total) + '</b></div>' +
      '<button class="btn btn--primary cfg-add" id="cfgAdd"' + (a.count === 0 || a.warnings.length ? " disabled" : "") + '>' +
        '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M3 4h2l2.6 12h10.8L21 8H7"/></svg>' + L2.addCart + '</button>' +
      '<button class="cfg-reset" id="cfgReset" type="button">' + L2.reset + '</button>';

    var add = document.getElementById("cfgAdd");
    if (add) add.addEventListener("click", addBuild);
    document.getElementById("cfgReset").addEventListener("click", function () {
      sel = {}; save(); renderSlots(); renderSummary();
    });
  }

  /* ---------- Picker ---------- */
  var pickerSlot = null;
  function openPicker(slot) {
    pickerSlot = slot;
    var L2 = L();
    document.getElementById("pickerTitle").textContent = L2[slot] + " — " + L2.pick;
    var list = COMPONENTS[slot];
    document.getElementById("pickerBody").innerHTML = list.map(function (c) {
      var reason = incompatReason(slot, c);
      var active = sel[slot] === c.id;
      return (
        '<button class="cfg-opt' + (active ? " is-active" : "") + (reason ? " is-bad" : "") + '" data-id="' + c.id + '"' + (reason ? ' disabled' : '') + ' type="button">' +
          '<span class="cfg-opt__art cfg-opt__art--' + c.type + '">' + slotArt(c.type, c.brand) + '</span>' +
          '<span class="cfg-opt__info"><b>' + esc(c.name) + '</b>' +
            '<small>' + specLine(c) + '</small>' +
            (reason ? '<em class="cfg-opt__warn">' + esc(reason) + '</em>' : '') +
          '</span>' +
          '<span class="cfg-opt__price">' + fmt(c.price) + '</span>' +
        '</button>'
      );
    }).join("");

    document.querySelectorAll("#pickerBody .cfg-opt").forEach(function (btn) {
      if (btn.disabled) return;
      btn.addEventListener("click", function () {
        sel[pickerSlot] = btn.dataset.id; save();
        closePicker(); renderSlots(); renderSummary();
      });
    });

    var p = document.getElementById("cfgPicker");
    p.classList.add("is-open"); p.setAttribute("aria-hidden", "false"); p.inert = false;
    document.body.style.overflow = "hidden";
    var closeBtn = document.getElementById("pickerClose");
    if (closeBtn) closeBtn.focus();
  }
  function closePicker() {
    var p = document.getElementById("cfgPicker");
    p.classList.remove("is-open"); p.setAttribute("aria-hidden", "true"); p.inert = true;
    document.body.style.overflow = "";
  }

  /* Escape bilan yopish */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      var p = document.getElementById("cfgPicker");
      if (p && p.classList.contains("is-open")) closePicker();
    }
  });

  function specLine(c) {
    if (c.type === "cpu") return c.socket + " · " + c.ram + " · " + c.tdp + "W";
    if (c.type === "mobo") return c.socket + " · " + c.ram + " · " + c.form;
    if (c.type === "ram") return c.ram + " · " + c.cap + "GB";
    if (c.type === "gpu") return c.tdp + "W · " + c.len + "mm";
    if (c.type === "cooler") return c.sockets.join("/") + " · " + c.rated + "W";
    if (c.type === "case") return c.forms.join("/") + " · GPU " + c.maxGpu + "mm";
    if (c.type === "psu") return c.watt + "W";
    return c.brand;
  }

  /* Tanlangan boshqa qismlarga nisbatan nomuvofiqlik sababi */
  function incompatReason(slot, c) {
    var L2 = L();
    var cpu = get("cpu"), mb = get("mobo");
    if (slot === "mobo" && cpu && c.socket !== cpu.socket) return tt(L2.wSocket, { cpu: cpu.name, s1: cpu.socket, s2: c.socket });
    if (slot === "cpu" && mb && c.socket !== mb.socket) return tt(L2.wSocket, { cpu: c.name, s1: c.socket, s2: mb.socket });
    if (slot === "ram" && mb && c.ram !== mb.ram) return tt(L2.wRam, { ram: c.name, m: mb.ram });
    if (slot === "cooler" && cpu && c.sockets.indexOf(cpu.socket) === -1) return tt(L2.wCooler, { cpu: cpu.name, s: cpu.socket });
    return null;
  }

  /* ---------- Savatga qoʻshish ---------- */
  function addBuild() {
    var a = analyze(), L2 = L();
    var parts = SLOTS.map(function (s) { var c = get(s); return c ? c.name : null; }).filter(Boolean);
    var id = "build-" + Date.now();
    var build = {
      id: id, cat: "sborki", type: "pc",
      brand: "UPG", name: L2.buildName + " (" + parts.length + " " + L2.parts + ")", price: a.total
    };
    // Sintetik mahsulot sifatida ro'yxatga qo'shamiz (savat uni topa olishi uchun)
    window.UPG_DATA.products.push(build);
    // localStorage'da ham saqlaymiz — sahifa yangilanganda savat uni topa olsin
    var saved;
    try { saved = JSON.parse(localStorage.getItem("upg-builds")) || []; } catch (e) { saved = []; }
    saved.push(build);
    localStorage.setItem("upg-builds", JSON.stringify(saved));
    UPG.addToCart(id, 1, true);
    UPG.toast(L2.added);
  }

  /* ---------- Ishga tushirish ---------- */
  render();
  document.addEventListener("upg:langchange", render);
})();
