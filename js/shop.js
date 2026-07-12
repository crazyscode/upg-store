/* ============================================================
   UPG — doʻkon logikasi (kategoriya, mahsulot, tavsiya)
   ============================================================ */

(function () {
  "use strict";

  var D = window.UPG_DATA;
  var esc = UPG.esc, iconSVG = UPG.iconSVG;

  function sumWord() { return UPG.t("common.sum"); }
  function catName(slug) {
    var c = catBySlug(slug);
    return c ? c[UPG.lang()] || c.uz : slug;
  }
  function catBySlug(slug) {
    for (var i = 0; i < D.categories.length; i++) if (D.categories[i].slug === slug) return D.categories[i];
    return null;
  }
  function productById(id) {
    for (var i = 0; i < D.products.length; i++) if (D.products[i].id === id) return D.products[i];
    return null;
  }
  function fmtNum(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  /* Deterministik reyting (id boʻyicha barqaror) */
  function ratingFor(id) {
    var h = 0;
    for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) & 0xffff;
    var full = 4 + (h % 11) / 10;         // 4.0 – 5.0
    if (full > 5) full = 5;
    var count = 12 + (h % 220);           // 12 – 231
    return { val: full, stars: Math.round(full), count: count };
  }
  function starsHTML(n) {
    var s = "";
    for (var i = 0; i < 5; i++) s += i < n ? "★" : "☆";
    return s;
  }

  /* Mahsulot kartasi */
  function card(p) {
    var disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    var badge = p.old
      ? '<span class="badge badge--sale">−' + disc + '%</span>'
      : (p.nw ? '<span class="badge badge--new">' + UPG.t("badge.new") + '</span>' : "");
    var favCls = UPG.isFav(p.id) ? " is-fav" : "";
    var favStyle = UPG.isFav(p.id) ? ' style="fill:var(--secondary)"' : "";
    var r = ratingFor(p.id);
    return (
      '<article class="prod-card is-visible">' +
        badge +
        '<button class="prod-card__fav' + favCls + '" data-fav="' + p.id + '" type="button" aria-label="Sevimlilar">' +
          '<svg viewBox="0 0 24 24"' + favStyle + '><path d="M12 21C6 16 3 12.5 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.5-3 7-9 12z"/></svg>' +
        '</button>' +
        '<a class="prod-card__media prod-card__media--' + p.type + '" href="product.html?id=' + p.id + '">' + UPG_ART(p.type, p.brand) + '</a>' +
        '<div class="prod-card__body">' +
          '<span class="prod-card__cat">' + esc(p.brand) + '</span>' +
          '<h3 class="prod-card__name"><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
          '<div class="stars" aria-label="5 dan ' + r.stars + ' yulduz">' + starsHTML(r.stars) + ' <span>(' + r.count + ')</span></div>' +
          '<div class="prod-card__foot">' +
            '<div class="price">' + (p.old ? '<s>' + fmtNum(p.old) + '</s>' : "") +
              '<b>' + fmtNum(p.price) + '</b><span>' + sumWord() + '</span></div>' +
            '<button class="cart-btn" data-add="' + p.id + '" type="button" aria-label="Savatga">' +
              '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M3 4h2l2.6 12h10.8L21 8H7"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  /* ============================================================
     Bosh sahifa — ommabop mahsulotlar gridi + tablar
     ============================================================ */
  var tabsBound = false;

  function renderFeatured() {
    var grid = document.getElementById("prodGrid");
    if (!grid) return;
    var ids = ["wf1", "cs1", "ps1", "nb1", "mo8", "ch11", "kb1", "wf4"];
    var items = ids.map(productById).filter(Boolean);

    function paint(filter) {
      var list = items.filter(function (p) {
        if (filter === "sale") return !!p.old;
        if (filter === "new") return !p.old;
        return true;
      });
      grid.innerHTML = list.map(card).join("");
    }
    paint("all");

    var tabs = document.querySelectorAll(".tabs__btn");
    if (!tabsBound) {
      tabsBound = true;
      tabs.forEach(function (btn) {
        btn.addEventListener("click", function () {
          tabs.forEach(function (b) { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
          btn.classList.add("is-active");
          btn.setAttribute("aria-selected", "true");
          paint(btn.dataset.filter);
        });
      });
    }
  }

  /* ============================================================
     Bosh sahifa — kategoriya kartalari (haqiqiy sonlar bilan)
     ============================================================ */
  function renderCatGrid() {
    var grid = document.getElementById("catGrid");
    if (!grid) return;
    grid.innerHTML = D.categories.map(function (c) {
      var count = D.products.filter(function (p) { return p.cat === c.slug; }).length;
      return (
        '<a class="cat-card" href="category.html?cat=' + c.slug + '">' +
          '<div class="cat-card__icon">' + iconSVG(c.icon) + '</div>' +
          '<b data-catname="' + c.slug + '">' + (c[UPG.lang()] || c.uz) + '</b>' +
          '<span data-catcount="' + c.slug + '">' + count + ' ' + UPG.t("shop.results") + '</span>' +
        '</a>'
      );
    }).join("");
  }

  /* Mega menyu ham haqiqiy kategoriyalardan */
  function renderMega() {
    var mega = document.querySelector("#megaMenu .mega__inner");
    if (!mega) return;
    mega.innerHTML = D.categories.map(function (c) {
      var count = D.products.filter(function (p) { return p.cat === c.slug; }).length;
      return (
        '<a class="mega__link" href="category.html?cat=' + c.slug + '">' + iconSVG(c.icon) +
          '<span><b data-catname="' + c.slug + '">' + (c[UPG.lang()] || c.uz) + '</b>' +
          '<i data-catcount="' + c.slug + '">' + count + ' ' + UPG.t("shop.results") + '</i></span></a>'
      );
    }).join("");
  }

  /* ============================================================
     Kategoriya sahifasi
     ============================================================ */
  function getParam(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function renderCategoryPage() {
    var wrap = document.getElementById("catPage");
    if (!wrap) return;

    var slug = getParam("cat") || "all";
    var q = (getParam("q") || "").trim().toLowerCase();
    var favMode = getParam("fav") === "1";
    var cat = catBySlug(slug);

    var base = D.products.filter(function (p) {
      if (favMode && !UPG.isFav(p.id)) return false;
      if (slug !== "all" && p.cat !== slug) return false;
      if (q && p.name.toLowerCase().indexOf(q) === -1 && p.brand.toLowerCase().indexOf(q) === -1) return false;
      return true;
    });

    var title = favMode ? UPG.t("shop.favs")
      : cat ? (cat[UPG.lang()] || cat.uz) : (q ? '"' + q + '"' : UPG.t("shop.catalog"));
    document.title = title + " — UPG";

    var brands = [];
    base.forEach(function (p) { if (brands.indexOf(p.brand) === -1) brands.push(p.brand); });
    brands.sort();

    var prices = base.map(function (p) { return p.price; });
    var minP = prices.length ? Math.min.apply(null, prices) : 0;
    var maxP = prices.length ? Math.max.apply(null, prices) : 0;

    var state = { brands: [], min: null, max: null, sort: "pop" };

    wrap.innerHTML =
      '<nav class="breadcrumb">' +
        '<a href="index.html">' + UPG.t("shop.home") + '</a><span>/</span>' +
        '<a href="index.html#catalog">' + UPG.t("shop.catalog") + '</a><span>/</span>' +
        '<b>' + esc(title) + '</b>' +
      '</nav>' +
      '<div class="catpage-hero">' +
        '<div class="catpage-hero__icon">' + iconSVG(cat ? cat.icon : "pc") + '</div>' +
        '<div><h1 class="catpage-hero__title">' + esc(title) + '</h1>' +
        '<p class="catpage-hero__sub"><span id="resCount">' + base.length + '</span> ' + UPG.t("shop.results") + '</p></div>' +
      '</div>' +
      '<button class="filters-toggle" id="filtersToggle" type="button" aria-expanded="false" aria-controls="filters">' +
        '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>' + UPG.t("shop.filters") + '</button>' +
      '<div class="shop">' +
        '<aside class="filters" id="filters">' +
          '<div class="filters__head"><b>' + UPG.t("shop.filters") + '</b>' +
            '<button class="filters__reset" id="resetFilters" type="button">' + UPG.t("shop.reset") + '</button></div>' +
          (brands.length > 1 ?
          '<div class="filter-group"><b class="filter-group__title">' + UPG.t("shop.brand") + '</b>' +
            '<div class="filter-brands">' + brands.map(function (b) {
              return '<label class="fcheck"><input type="checkbox" value="' + esc(b) + '"><span>' + esc(b) + '</span></label>';
            }).join("") + '</div></div>' : "") +
          '<div class="filter-group"><b class="filter-group__title">' + UPG.t("shop.price") + '</b>' +
            '<div class="filter-price">' +
              '<input type="number" id="priceMin" placeholder="' + fmtNum(minP) + '" min="0">' +
              '<span>—</span>' +
              '<input type="number" id="priceMax" placeholder="' + fmtNum(maxP) + '" min="0">' +
            '</div>' +
            '<button class="btn btn--ghost btn--sm filter-apply" id="applyPrice" type="button">' + UPG.t("shop.apply") + '</button>' +
          '</div>' +
        '</aside>' +
        '<div class="shop-main">' +
          '<div class="sortbar">' +
            '<span class="sortbar__count"><b id="shownCount">' + base.length + '</b> ' + UPG.t("shop.results") + '</span>' +
            '<label class="sortbar__sort">' + UPG.t("shop.sort") +
              '<select id="sortSel">' +
                '<option value="pop">' + UPG.t("shop.sortPop") + '</option>' +
                '<option value="cheap">' + UPG.t("shop.sortCheap") + '</option>' +
                '<option value="exp">' + UPG.t("shop.sortExp") + '</option>' +
                '<option value="name">' + UPG.t("shop.sortName") + '</option>' +
              '</select></label>' +
          '</div>' +
          '<div class="prod-grid" id="catGridResults"></div>' +
        '</div>' +
      '</div>';

    var grid = document.getElementById("catGridResults");
    var shownCount = document.getElementById("shownCount");

    function apply() {
      var list = base.slice();
      if (state.brands.length) list = list.filter(function (p) { return state.brands.indexOf(p.brand) !== -1; });
      if (state.min != null) list = list.filter(function (p) { return p.price >= state.min; });
      if (state.max != null) list = list.filter(function (p) { return p.price <= state.max; });

      if (state.sort === "cheap") list.sort(function (a, b) { return a.price - b.price; });
      else if (state.sort === "exp") list.sort(function (a, b) { return b.price - a.price; });
      else if (state.sort === "name") list.sort(function (a, b) { return a.name.localeCompare(b.name); });

      shownCount.textContent = list.length;
      if (!list.length) {
        grid.classList.add("is-empty");
        grid.innerHTML = '<div class="shop-empty"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
          '<b>' + UPG.t(favMode && !base.length ? "shop.favsEmpty" : "shop.empty") + '</b>' +
          (favMode && !base.length
            ? '<a class="btn btn--ghost btn--sm" href="index.html#catalog">' + UPG.t("cart.emptyBtn") + '</a>'
            : '<button class="btn btn--ghost btn--sm" id="emptyReset" type="button">' + UPG.t("shop.emptyBtn") + '</button>') +
          '</div>';
        var er = document.getElementById("emptyReset");
        if (er) er.addEventListener("click", resetAll);
      } else {
        grid.classList.remove("is-empty");
        grid.innerHTML = list.map(card).join("");
      }
    }

    function resetAll() {
      state = { brands: [], min: null, max: null, sort: "pop" };
      wrap.querySelectorAll('.filter-brands input').forEach(function (i) { i.checked = false; });
      var pm = document.getElementById("priceMin"), px = document.getElementById("priceMax");
      if (pm) pm.value = ""; if (px) px.value = "";
      var ss = document.getElementById("sortSel"); if (ss) ss.value = "pop";
      apply();
    }

    wrap.querySelectorAll(".filter-brands input").forEach(function (inp) {
      inp.addEventListener("change", function () {
        state.brands = [].slice.call(wrap.querySelectorAll(".filter-brands input:checked")).map(function (i) { return i.value; });
        apply();
      });
    });
    /* Mobil: filtr panelini ochish/yopish */
    var filtersEl = document.getElementById("filters");
    var filtersToggle = document.getElementById("filtersToggle");
    function closeFilters() {
      filtersEl.classList.remove("is-open");
      filtersToggle.setAttribute("aria-expanded", "false");
    }
    filtersToggle.addEventListener("click", function () {
      var open = filtersEl.classList.toggle("is-open");
      filtersToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    var applyBtn = document.getElementById("applyPrice");
    if (applyBtn) applyBtn.addEventListener("click", function () {
      var mn = parseInt(document.getElementById("priceMin").value, 10);
      var mx = parseInt(document.getElementById("priceMax").value, 10);
      state.min = isNaN(mn) ? null : mn;
      state.max = isNaN(mx) ? null : mx;
      apply();
      closeFilters();
    });
    document.getElementById("sortSel").addEventListener("change", function () { state.sort = this.value; apply(); });
    document.getElementById("resetFilters").addEventListener("click", resetAll);

    apply();
  }

  /* ============================================================
     Mahsulot sahifasi
     ============================================================ */
  function renderProductPage() {
    var wrap = document.getElementById("productPage");
    if (!wrap) return;

    var id = getParam("id");
    var p = productById(id);

    if (!p) {
      wrap.innerHTML = '<div class="pdp-404"><h1>' + UPG.t("shop.notFound") + '</h1>' +
        '<a class="btn btn--primary" href="index.html">' + UPG.t("shop.backHome") + '</a></div>';
      return;
    }

    var cat = catBySlug(p.cat);
    var catTitle = cat ? (cat[UPG.lang()] || cat.uz) : "";
    var r = ratingFor(p.id);
    var disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    document.title = p.name + " — UPG";

    var favCls = UPG.isFav(p.id) ? " is-fav" : "";
    var favStyle = UPG.isFav(p.id) ? ' style="fill:var(--secondary)"' : "";

    wrap.innerHTML =
      '<nav class="breadcrumb">' +
        '<a href="index.html">' + UPG.t("shop.home") + '</a><span>/</span>' +
        '<a href="index.html#catalog">' + UPG.t("shop.catalog") + '</a><span>/</span>' +
        '<a href="category.html?cat=' + p.cat + '">' + esc(catTitle) + '</a><span>/</span>' +
        '<b>' + esc(p.brand) + '</b>' +
      '</nav>' +
      '<div class="pdp">' +
        '<div class="pdp__gallery">' +
          (p.old ? '<span class="badge badge--sale pdp__badge">−' + disc + '%</span>' : "") +
          '<div class="pdp__media pdp__media--' + p.type + '">' + UPG_ART(p.type, p.brand) + '</div>' +
          '<div class="pdp__thumbs">' +
            '<span class="pdp__thumb is-active pdp__media--' + p.type + '">' + iconSVG(p.type) + '</span>' +
            '<span class="pdp__thumb pdp__media--' + p.type + '">' + iconSVG(p.type) + '</span>' +
            '<span class="pdp__thumb pdp__media--' + p.type + '">' + iconSVG(p.type) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="pdp__info">' +
          '<span class="pdp__brand">' + esc(p.brand) + '</span>' +
          '<h1 class="pdp__title">' + esc(p.name) + '</h1>' +
          '<div class="pdp__rating"><span class="stars" aria-label="5 dan ' + r.stars + ' yulduz">' + starsHTML(r.stars) + '</span>' +
            '<span>' + r.val.toFixed(1) + ' · ' + r.count + '</span>' +
            '<span class="pdp__stock"><i></i>' + UPG.t("shop.inStock") + '</span></div>' +
          '<div class="pdp__price">' +
            (p.old ? '<s>' + fmtNum(p.old) + ' ' + sumWord() + '</s>' : "") +
            '<b>' + fmtNum(p.price) + ' ' + sumWord() + '</b>' +
          '</div>' +
          '<div class="pdp__buy">' +
            '<div class="qtybox"><button class="qtybtn" data-q="dec" type="button">−</button>' +
              '<span id="pdpQty">1</span>' +
              '<button class="qtybtn" data-q="inc" type="button">+</button></div>' +
            '<button class="btn btn--primary pdp__add" id="pdpAdd" type="button">' +
              '<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M3 4h2l2.6 12h10.8L21 8H7"/></svg>' +
              UPG.t("shop.addCart") + '</button>' +
            '<button class="icon-btn pdp__fav' + favCls + '" id="pdpFav" data-fav="' + p.id + '" type="button" aria-label="Sevimlilar">' +
              '<svg viewBox="0 0 24 24"' + favStyle + '><path d="M12 21C6 16 3 12.5 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.5-3 7-9 12z"/></svg></button>' +
          '</div>' +
          '<ul class="pdp__perks">' +
            '<li><svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>' +
              '<span><b>' + UPG.t("shop.warranty") + '</b>' + UPG.t("shop.warrantyVal") + '</span></li>' +
            '<li><svg viewBox="0 0 24 24"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>' +
              '<span><b>' + UPG.t("shop.delivery") + '</b>' + UPG.t("shop.deliveryVal") + '</span></li>' +
            '<li><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>' +
              '<span><b>' + UPG.t("shop.pay") + '</b>' + UPG.t("shop.payVal") + '</span></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="pdp-details">' +
        '<div class="pdp-block"><h2>' + UPG.t("shop.specs") + '</h2>' +
          '<table class="spec-table"><tbody>' +
            '<tr><td>' + UPG.t("spec.brand") + '</td><td>' + esc(p.brand) + '</td></tr>' +
            '<tr><td>' + UPG.t("spec.category") + '</td><td>' + esc(catTitle) + '</td></tr>' +
            '<tr><td>' + UPG.t("spec.code") + '</td><td>UPG-' + p.id.toUpperCase() + '</td></tr>' +
            '<tr><td>' + UPG.t("spec.status") + '</td><td>' + UPG.t("shop.inStock") + '</td></tr>' +
          '</tbody></table>' +
        '</div>' +
        '<div class="pdp-block"><h2>' + UPG.t("shop.desc") + '</h2>' +
          '<p class="pdp-desc">' + UPG.t("shop.descText") + '</p></div>' +
      '</div>' +
      '<section class="related"><div class="section__head"><h2 class="section__title">' + UPG.t("shop.related") + '</h2></div>' +
        '<div class="prod-grid" id="relatedGrid"></div></section>';

    /* Miqdor */
    var qty = 1;
    var qtyEl = document.getElementById("pdpQty");
    wrap.querySelectorAll("[data-q]").forEach(function (b) {
      b.addEventListener("click", function () {
        qty = Math.max(1, qty + (b.dataset.q === "inc" ? 1 : -1));
        qtyEl.textContent = qty;
      });
    });
    document.getElementById("pdpAdd").addEventListener("click", function () { UPG.addToCart(p.id, qty); });

    /* Tavsiya — shu kategoriyadan */
    var related = D.products.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 4);
    if (related.length < 4) {
      D.products.forEach(function (x) { if (related.length < 4 && x.id !== p.id && related.indexOf(x) === -1) related.push(x); });
    }
    document.getElementById("relatedGrid").innerHTML = related.map(card).join("");
  }

  /* ============================================================
     Ishga tushirish
     ============================================================ */
  function boot() {
    renderMega();
    renderCatGrid();
    renderFeatured();
    renderCategoryPage();
    renderProductPage();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* Til oʻzgarganda sahifani qayta render qilamiz */
  document.addEventListener("upg:langchange", function () {
    renderMega();
    renderCatGrid();
    if (document.getElementById("catPage")) renderCategoryPage();
    if (document.getElementById("productPage")) renderProductPage();
    // bosh sahifadagi grid faol tabni saqlab qayta chizamiz
    var active = document.querySelector(".tabs__btn.is-active");
    if (document.getElementById("prodGrid")) {
      renderFeatured();
      if (active) { var b = document.querySelector('.tabs__btn[data-filter="' + active.dataset.filter + '"]'); if (b) b.click(); }
    }
  });
})();
