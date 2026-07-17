/* ============================================================
   UPG — Admin panel (admin.html)
   Sayt statik: server yoʻq. Mahsulotlar localStorage'da saqlanadi
   ("upg-admin-products") va main.js ularni UPG_DATA.products'ga
   qoʻshib qoʻyadi — shuning uchun saytda darhol koʻrinadi.
   Saytga haqiqiy chiqarish uchun data.js + rasmlar eksport qilinadi.
   ============================================================ */

(function () {
  "use strict";

  var KEY = "upg-admin-products";
  var D = window.UPG_DATA;
  var MAX_IMGS = 3;
  var SIZE = 500;

  var $ = function (id) { return document.getElementById(id); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtNum(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  /* ---------- Saqlash ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function save(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      // Rasmlar data URL sifatida saqlanadi — localStorage ~5MB bilan cheklangan
      toast("Xotira toʻldi. Avval bir nechta mahsulotni eksport qilib oʻchiring.", true);
      return false;
    }
  }

  var items = load();

  /* Katalogdagi + admin qoʻshgan barcha mahsulotlar (id/prefiks hisoblash uchun) */
  function allProducts() { return D.products.concat(items); }

  /* ---------- id yasash: kategoriya prefiksi + keyingi raqam ---------- */
  function prefixFor(slug) {
    var ids = D.products.filter(function (p) { return p.cat === slug; })
      .map(function (p) { return p.id; });
    if (!ids.length) return slug.slice(0, 2);
    var m = /^[a-z]+/.exec(ids[0]);
    return m ? m[0] : slug.slice(0, 2);
  }
  function nextId(slug) {
    var pre = prefixFor(slug);
    var max = 0;
    allProducts().forEach(function (p) {
      var m = new RegExp("^" + pre + "(\\d+)$").exec(p.id);
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    return pre + (max + 1);
  }

  function catBySlug(slug) {
    for (var i = 0; i < D.categories.length; i++) {
      if (D.categories[i].slug === slug) return D.categories[i];
    }
    return null;
  }

  /* ---------- Rasmni 500x500 WebP data URL'ga oʻgirish ---------- */
  function toWebp(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var im = new Image();
      im.onload = function () {
        URL.revokeObjectURL(url);
        var c = document.createElement("canvas");
        c.width = c.height = SIZE;
        var ctx = c.getContext("2d");
        // shaffoflik saqlanadi — fon boʻyalmaydi
        var s = Math.min(SIZE / im.width, SIZE / im.height);
        var w = Math.round(im.width * s), h = Math.round(im.height * s);
        ctx.drawImage(im, (SIZE - w) / 2, (SIZE - h) / 2, w, h);
        c.toBlob(function (b) {
          if (!b) return reject(new Error("WebP yasalmadi"));
          var fr = new FileReader();
          fr.onload = function () { resolve(fr.result); };
          fr.onerror = function () { reject(fr.error); };
          fr.readAsDataURL(b);
        }, "image/webp", 0.88);
      };
      im.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("“" + file.name + "” rasm sifatida ochilmadi"));
      };
      im.src = url;
    });
  }

  function dataUrlToBytes(u) {
    var b64 = u.slice(u.indexOf(",") + 1);
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  /* ============================================================
     Minimal ZIP yozuvchi (store — siqishsiz).
     WebP allaqachon siqilgan, shuning uchun deflate kerak emas.
     ============================================================ */
  var crcTable = (function () {
    var t = new Uint32Array(256), c, n, k;
    for (n = 0; n < 256; n++) {
      c = n;
      for (k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(buf) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function u16(v) { return [v & 255, (v >>> 8) & 255]; }
  function u32(v) { return [v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255]; }

  function makeZip(files) {
    var parts = [], central = [], offset = 0;
    var DOS_TIME = 0, DOS_DATE = 0x21;          // 1980-01-01

    files.forEach(function (f) {
      var name = new TextEncoder().encode(f.name);
      var crc = crc32(f.data);
      var head = new Uint8Array(
        [0x50, 0x4b, 0x03, 0x04].concat(
          u16(20), u16(0), u16(0), u16(DOS_TIME), u16(DOS_DATE),
          u32(crc), u32(f.data.length), u32(f.data.length),
          u16(name.length), u16(0)));
      parts.push(head, name, f.data);
      central.push({ name: name, crc: crc, size: f.data.length, offset: offset });
      offset += head.length + name.length + f.data.length;
    });

    var cdStart = offset, cdParts = [];
    central.forEach(function (e) {
      var head = new Uint8Array(
        [0x50, 0x4b, 0x01, 0x02].concat(
          u16(20), u16(20), u16(0), u16(0), u16(DOS_TIME), u16(DOS_DATE),
          u32(e.crc), u32(e.size), u32(e.size),
          u16(e.name.length), u16(0), u16(0), u16(0), u16(0),
          u32(0), u32(e.offset)));
      cdParts.push(head, e.name);
      offset += head.length + e.name.length;
    });

    var eocd = new Uint8Array(
      [0x50, 0x4b, 0x05, 0x06].concat(
        u16(0), u16(0), u16(files.length), u16(files.length),
        u32(offset - cdStart), u32(cdStart), u16(0)));

    return new Blob(parts.concat(cdParts, [eocd]), { type: "application/zip" });
  }

  function download(blob, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }

  /* ============================================================
     data.js generatsiyasi — asl matnni olib, yangi satrlarni
     tegishli kategoriya blokining oxiriga qoʻyamiz.
     ============================================================ */
  function productLine(p) {
    return '    { id: "' + p.id + '", cat: "' + p.cat + '", brand: "' + p.brand +
      '", type: "' + p.type + '", name: "' + p.name.replace(/\\/g, "\\\\").replace(/"/g, '\\"') +
      '", price: ' + p.price +
      (p.old ? ", old: " + p.old : "") +
      (p.imgData && p.imgData.length ? ", img: " + p.imgData.length : "") + " }";
  }

  function buildDataJs(text) {
    var lines = text.split("\n");

    items.forEach(function (p) {
      var line = productLine(p);
      // shu kategoriyaning oxirgi mahsulot satrini topamiz
      var last = -1;
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('cat: "' + p.cat + '"') !== -1) last = i;
      }
      if (last === -1) {                       // kategoriya topilmasa — massiv oxiriga
        for (var j = lines.length - 1; j >= 0; j--) {
          if (/^\s*\]/.test(lines[j])) { last = j - 1; break; }
        }
      }
      if (last < 0) return;

      // oldingi satr vergul bilan tugashi kerak
      if (!/,\s*$/.test(lines[last])) lines[last] = lines[last].replace(/\s*$/, ",");

      // massivning eng oxirgi elementi boʻlsa — vergulsiz
      var nxt = lines[last + 1] || "";
      lines.splice(last + 1, 0, line + (/^\s*\]/.test(nxt) ? "" : ","));
    });

    return lines.join("\n");
  }

  /* ============================================================
     UI
     ============================================================ */
  function toast(msg, bad) {
    var t = $("toast");
    t.textContent = msg;
    t.className = "adm-toast is-on" + (bad ? " is-bad" : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.className = "adm-toast"; }, 4200);
  }

  /* Kategoriya va brend roʻyxatlari */
  function fillSelects() {
    $("fCat").innerHTML = D.categories.map(function (c) {
      return '<option value="' + c.slug + '">' + esc(c.uz) + "</option>";
    }).join("");

    var brands = [];
    D.products.forEach(function (p) { if (brands.indexOf(p.brand) === -1) brands.push(p.brand); });
    brands.sort();
    $("brandList").innerHTML = brands.map(function (b) {
      return '<option value="' + esc(b) + '">';
    }).join("");
  }

  /* ---------- Forma holati ---------- */
  var pending = [];        // hozirgi formadagi rasmlar (data URL)

  function formData() {
    var slug = $("fCat").value;
    var cat = catBySlug(slug);
    var price = parseInt($("fPrice").value, 10);
    var old = parseInt($("fOld").value, 10);
    return {
      id: $("fEditId").value || nextId(slug),
      cat: slug,
      type: cat ? cat.type : "pc",       // tur kategoriyadan olinadi
      brand: $("fBrand").value.trim(),
      name: $("fName").value.trim(),
      price: isNaN(price) ? 0 : price,
      old: isNaN(old) || !old ? undefined : old,
      imgData: pending.slice()
    };
  }

  function validate(p) {
    if (!p.brand) return "Brendni kiriting.";
    if (!p.name) return "Mahsulot nomini kiriting.";
    if (!p.price || p.price <= 0) return "Narx 0 dan katta boʻlishi kerak.";
    if (p.old && p.old <= p.price) return "Eski narx joriy narxdan katta boʻlishi kerak.";
    var clash = allProducts().some(function (x) {
      return x.id !== p.id && x.name.toLowerCase() === p.name.toLowerCase();
    });
    if (clash) return "Bu nomli mahsulot allaqachon bor.";
    return "";
  }

  /* ---------- Jonli karta koʻrinishi ---------- */
  function renderPreview() {
    var p = formData();
    var wrap = $("cardPreview");
    if (!p.brand && !p.name && !p.price) {
      wrap.innerHTML = "";
      $("previewHint").hidden = false;
      return;
    }
    $("previewHint").hidden = true;
    p.name = p.name || "Mahsulot nomi";
    p.brand = p.brand || "BREND";
    var disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    wrap.innerHTML =
      '<article class="prod-card is-visible">' +
        (p.old ? '<span class="badge badge--sale">−' + disc + "%</span>" : "") +
        '<span class="prod-card__media prod-card__media--' + p.type + '">' +
          UPG_ART.media(p, 1, true) + "</span>" +
        '<div class="prod-card__body">' +
          '<span class="prod-card__cat">' + esc(p.brand) + "</span>" +
          '<h3 class="prod-card__name">' + esc(p.name) + "</h3>" +
          '<div class="prod-card__foot"><div class="price">' +
            (p.old ? "<s>" + fmtNum(p.old) + "</s>" : "") +
            "<b>" + fmtNum(p.price || 0) + "</b><span>soʻm</span></div></div>" +
        "</div>" +
      "</article>";
  }

  /* ---------- Rasm tanlash ---------- */
  function renderPending() {
    $("imgPreview").innerHTML = pending.map(function (u, i) {
      return '<div class="adm-thumb">' +
        '<img src="' + u + '" alt="">' +
        (i === 0 ? '<span class="adm-thumb__main">asosiy</span>' : "") +
        '<button type="button" class="adm-thumb__x" data-rm="' + i + '" aria-label="Oʻchirish">×</button>' +
        "</div>";
    }).join("");
    renderPreview();
  }

  async function addFiles(files) {
    var list = [].slice.call(files);
    if (!list.length) return;
    if (pending.length + list.length > MAX_IMGS) {
      list = list.slice(0, MAX_IMGS - pending.length);
      toast(MAX_IMGS + " tadan koʻp rasm qoʻyib boʻlmaydi.", true);
    }
    for (var i = 0; i < list.length; i++) {
      try {
        pending.push(await toWebp(list[i]));
      } catch (e) {
        toast(e.message, true);
      }
    }
    renderPending();
  }

  /* ---------- Roʻyxat ---------- */
  function renderList() {
    $("listCount").textContent = items.length;
    $("clearAll").hidden = !items.length;
    if (!items.length) {
      $("list").innerHTML = '<p class="adm-hint">Hali mahsulot qoʻshilmagan.</p>';
      return;
    }
    $("list").innerHTML = items.map(function (p) {
      var cat = catBySlug(p.cat);
      return '<div class="adm-item">' +
        '<span class="adm-item__art prod-card__media--' + p.type + '">' +
          UPG_ART.media(p, 1, true) + "</span>" +
        '<div class="adm-item__info">' +
          "<b>" + esc(p.name) + "</b>" +
          "<small>" + esc(p.id) + " · " + esc(cat ? cat.uz : p.cat) + " · " + esc(p.brand) +
            " · " + fmtNum(p.price) + " soʻm" +
            (p.imgData && p.imgData.length ? " · " + p.imgData.length + " rasm" : " · rasmsiz (SVG)") +
          "</small>" +
        "</div>" +
        '<div class="adm-item__btns">' +
          '<button class="btn btn--ghost btn--sm" type="button" data-edit="' + p.id + '">Tahrirlash</button>' +
          '<button class="btn btn--ghost btn--sm adm-del" type="button" data-del="' + p.id + '">Oʻchirish</button>' +
        "</div>" +
      "</div>";
    }).join("");
  }

  function resetForm() {
    $("prodForm").reset();
    $("fEditId").value = "";
    pending = [];
    $("formTitle").textContent = "Yangi mahsulot";
    $("saveBtn").textContent = "Qoʻshish";
    $("cancelBtn").hidden = true;
    $("formErr").textContent = "";
    renderPending();
  }

  function editItem(id) {
    var p = items.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    $("fEditId").value = p.id;
    $("fCat").value = p.cat;
    $("fBrand").value = p.brand;
    $("fName").value = p.name;
    $("fPrice").value = p.price;
    $("fOld").value = p.old || "";
    pending = (p.imgData || []).slice();
    $("formTitle").textContent = "Tahrirlash — " + p.id;
    $("saveBtn").textContent = "Saqlash";
    $("cancelBtn").hidden = false;
    renderPending();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ============================================================
     Hodisalar
     ============================================================ */
  function init() {
    fillSelects();
    renderList();
    renderPending();

    ["fCat", "fBrand", "fName", "fPrice", "fOld"].forEach(function (id) {
      $(id).addEventListener("input", renderPreview);
    });

    /* Rasm tanlash / tashlash */
    $("drop").addEventListener("click", function () { $("fImgs").click(); });
    $("fImgs").addEventListener("change", function () {
      addFiles(this.files);
      this.value = "";
    });
    ["dragenter", "dragover"].forEach(function (ev) {
      $("drop").addEventListener(ev, function (e) {
        e.preventDefault();
        this.classList.add("is-over");
      });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      $("drop").addEventListener(ev, function (e) {
        e.preventDefault();
        this.classList.remove("is-over");
      });
    });
    $("drop").addEventListener("drop", function (e) {
      if (e.dataTransfer && e.dataTransfer.files) addFiles(e.dataTransfer.files);
    });
    $("imgPreview").addEventListener("click", function (e) {
      var b = e.target.closest("[data-rm]");
      if (!b) return;
      pending.splice(+b.dataset.rm, 1);
      renderPending();
    });

    /* Saqlash */
    $("prodForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var p = formData();
      var err = validate(p);
      $("formErr").textContent = err;
      if (err) return;

      if (p.old === undefined) delete p.old;
      if (!p.imgData.length) delete p.imgData;

      var idx = -1;
      for (var i = 0; i < items.length; i++) if (items[i].id === p.id) idx = i;
      var backup = items.slice();
      if (idx >= 0) items[idx] = p; else items.push(p);

      if (!save(items)) { items = backup; return; }
      renderList();
      resetForm();
      toast(idx >= 0 ? "Saqlandi." : "“" + p.name + "” qoʻshildi — saytda koʻrishingiz mumkin.");
    });

    $("cancelBtn").addEventListener("click", resetForm);

    $("list").addEventListener("click", function (e) {
      var ed = e.target.closest("[data-edit]");
      if (ed) return editItem(ed.dataset.edit);
      var dl = e.target.closest("[data-del]");
      if (!dl) return;
      var id = dl.dataset.del;
      var p = items.filter(function (x) { return x.id === id; })[0];
      if (!confirm("“" + (p ? p.name : id) + "” oʻchirilsinmi?")) return;
      items = items.filter(function (x) { return x.id !== id; });
      save(items);
      renderList();
      if ($("fEditId").value === id) resetForm();
      toast("Oʻchirildi.");
    });

    $("clearAll").addEventListener("click", function () {
      if (!confirm("Qoʻshilgan " + items.length + " ta mahsulot oʻchirilsinmi? Bu amalni qaytarib boʻlmaydi.")) return;
      items = [];
      save(items);
      renderList();
      resetForm();
      toast("Roʻyxat tozalandi.");
    });

    /* Eksport */
    $("expData").addEventListener("click", function () {
      $("expErr").textContent = "";
      if (!items.length) { $("expErr").textContent = "Avval mahsulot qoʻshing."; return; }
      /* cache: "reload" — eksport DOIM diskdagi joriy data.js ga asoslanishi
         shart. Service worker keshdan eski nusxani bersa, qoʻlda kiritilgan
         oʻzgarishlar eksportda jimgina yoʻqolardi (sw.js buni koʻrib chetlab oʻtadi). */
      fetch("js/data.js", { cache: "reload" })
        .then(function (r) {
          if (!r.ok) throw new Error("data.js oʻqilmadi (" + r.status + ")");
          return r.text();
        })
        .then(function (text) {
          download(new Blob([buildDataJs(text)], { type: "text/javascript" }), "data.js");
          toast("data.js yuklandi — js/data.js ustiga yozing.");
        })
        .catch(function (e) { $("expErr").textContent = e.message; });
    });

    $("expZip").addEventListener("click", function () {
      $("expErr").textContent = "";
      var files = [];
      items.forEach(function (p) {
        (p.imgData || []).forEach(function (u, i) {
          files.push({
            name: p.id + (i > 0 ? "-" + (i + 1) : "") + ".webp",
            data: dataUrlToBytes(u)
          });
        });
      });
      if (!files.length) { $("expErr").textContent = "Eksport qilinadigan rasm yoʻq."; return; }
      download(makeZip(files), "rasmlar.zip");
      toast(files.length + " ta rasm arxivlandi — assets/products/ ga chiqaring.");
    });

    /* Mavzu */
    $("themeToggle").addEventListener("click", function () {
      var root = document.documentElement;
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("upg-theme", next); } catch (e) {}
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
