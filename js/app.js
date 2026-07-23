/* ============================================================
   Togi DB — mobil ilova qobigʻi (PWA)

   Vazifalari:
     · service worker'ni roʻyxatdan oʻtkazish va yangilanishni boshqarish
     · standalone (ilova) rejimini aniqlash va chrome'ni moslashtirish
     · pastki tab-bar'ni barcha sahifalarga inject qilish
     · "Ilovani oʻrnatish" taklifi (Android/desktop) va iOS yoʻriqnomasi
     · oflayn holat indikatori

   main.js dan keyin yuklanadi — window.TOGIDB mavjud deb hisoblaydi.
   admin.html'ga ulanmaydi: u lokal vosita, ilova qobigʻi kerak emas.
   ============================================================ */

(function () {
  "use strict";

  var root = document.documentElement;
  var t = TOGIDB.t;

  /* ============================================================
     Standalone rejimni aniqlash
     ============================================================ */
  function isStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: fullscreen)").matches ||
      window.matchMedia("(display-mode: minimal-ui)").matches ||
      navigator.standalone === true            /* iOS Safari */
    );
  }

  function markStandalone() {
    var on = isStandalone();
    root.setAttribute("data-standalone", on ? "true" : "false");
    return on;
  }

  var standalone = markStandalone();

  function onMQ(mq, fn) {
    if (mq.addEventListener) mq.addEventListener("change", fn);
    else if (mq.addListener) mq.addListener(fn);   /* eski Safari */
  }

  /* Rejim jonli oʻzgarishi mumkin (masalan, ilovadan brauzerda ochilsa).
     Tab-bar koʻrinishi bu yerda boshqarilmaydi — u app.css'dagi --tabbar-h
     orqali, sof CSS bilan hal qilinadi. */
  ["standalone", "fullscreen", "minimal-ui"].forEach(function (m) {
    onMQ(window.matchMedia("(display-mode: " + m + ")"), function () {
      standalone = markStandalone();
      applyChrome();
    });
  });

  /* ============================================================
     Tab-bar
     ============================================================ */
  var ICONS = {
    home: '<path d="M3 10.6 12 3.2l9 7.4"/><path d="M5.6 9.4V20.8h12.8V9.4"/><path d="M9.8 20.8v-6h4.4v6"/>',
    catalog: '<rect x="3.2" y="3.2" width="7.2" height="7.2" rx="1.8"/><rect x="13.6" y="3.2" width="7.2" height="7.2" rx="1.8"/><rect x="3.2" y="13.6" width="7.2" height="7.2" rx="1.8"/><rect x="13.6" y="13.6" width="7.2" height="7.2" rx="1.8"/>',
    cart: '<circle cx="9" cy="20" r="1.6"/><circle cx="17" cy="20" r="1.6"/><path d="M3 4h2l2.6 12h10.8L21 8H7"/>',
    favs: '<path d="M12 21C6 16 3 12.5 3 9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 3.5-3 7-9 12z"/>'
  };

  /* Joriy sahifada qaysi tab faol? */
  function activeTab() {
    var file = location.pathname.split("/").pop() || "index.html";
    var params = new URLSearchParams(location.search);

    if (file === "" || file === "index.html") return "home";
    if (file === "category.html") return params.get("fav") === "1" ? "favs" : "catalog";
    if (file === "product.html") return "catalog";
    return null;                 /* configurator, admin — hech qaysi faol emas */
  }

  function tabHTML(id, href, key, withBadge) {
    var tag = href ? "a" : "button";
    var attrs = href ? ' href="' + href + '"' : ' type="button"';
    return (
      "<" + tag + ' class="tabbar__item" data-tab="' + id + '"' + attrs + ">" +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[id] + "</svg>" +
        '<span class="tabbar__label" data-i18n="' + key + '">' + t(key) + "</span>" +
        (withBadge ? '<span class="tabbar__badge" data-badge="' + withBadge + '" hidden>0</span>' : "") +
      "</" + tag + ">"
    );
  }

  function buildTabbar() {
    var nav = document.createElement("nav");
    nav.className = "tabbar";
    nav.id = "tabbar";
    nav.setAttribute("aria-label", "Asosiy navigatsiya");

    nav.innerHTML =
      tabHTML("home", "index.html", "tab.home") +
      tabHTML("catalog", "category.html?cat=all", "tab.catalog") +
      tabHTML("cart", null, "tab.cart", "cart") +
      tabHTML("favs", "category.html?fav=1", "tab.favs", "fav");

    document.body.appendChild(nav);

    /* Faol tab */
    var act = activeTab();
    if (act) {
      var el = nav.querySelector('[data-tab="' + act + '"]');
      if (el) {
        el.classList.add("is-active");
        el.setAttribute("aria-current", "page");
      }
    }

    /* Savat tugmasi — drawer ochadi */
    nav.querySelector('[data-tab="cart"]').addEventListener("click", TOGIDB.openCart);

    /* Badge'larni joriy holatga keltiramiz (main.js init'i tab-bar'dan
       oldin ishlagan, shuning uchun qayta chaqiramiz) */
    TOGIDB.syncBadges();
  }

  /* ============================================================
     Standalone chrome'i — til almashtirgichni header'ga koʻchiramiz
     ============================================================ */
  var langMoved = false;
  var langHome = null;            /* asl joyi — qaytarish uchun */

  function applyChrome() {
    var lang = document.querySelector(".lang-switch");
    var actions = document.querySelector(".header__actions");
    if (!lang || !actions) return;

    if (standalone && !langMoved) {
      /* .topbar yashiriladi — til tugmalari u bilan yoʻqolib ketmasin */
      langHome = { parent: lang.parentNode, next: lang.nextSibling };
      actions.insertBefore(lang, actions.firstChild);
      langMoved = true;
    } else if (!standalone && langMoved && langHome) {
      langHome.parent.insertBefore(lang, langHome.next);
      langMoved = false;
    }
  }

  /* ============================================================
     theme-color — ilovada status bar / sarlavha paneli rangi

     Mavzu localStorage bilan boshqariladi (prefers-color-scheme emas),
     shuning uchun media-query'li meta teg ish bermaydi: data-theme
     atributini kuzatib, meta'ni qoʻlda yangilaymiz.
     ============================================================ */
  function syncThemeColor() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var light = root.getAttribute("data-theme") === "light";
    /* style.css: --bg-alt (dark #0f0f0f / light #f4f5f7) */
    meta.setAttribute("content", light ? "#f4f5f7" : "#0f0f0f");
  }

  new MutationObserver(syncThemeColor).observe(root, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  /* ============================================================
     Pastki varaq (oʻrnatish taklifi / iOS yoʻriqnomasi)
     ============================================================ */
  var DISMISS_KEY = "togidb-install-dismissed";
  var DISMISS_DAYS = 14;

  function dismissed() {
    try {
      var v = parseInt(localStorage.getItem(DISMISS_KEY), 10);
      if (!v) return false;
      return Date.now() - v < DISMISS_DAYS * 864e5;
    } catch (e) { return false; }
  }

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) {}
  }

  var sheet = null;

  function buildSheet(opts) {
    /* opts: { ios: bool, onInstall: fn|null } */
    var el = document.createElement("div");
    el.className = "sheet" + (opts.ios ? " sheet--ios" : "");
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");

    var titleKey = opts.ios ? "app.iosTitle" : "app.installTitle";
    var textKey = opts.ios ? "app.iosText" : "app.installText";

    el.innerHTML =
      '<div class="sheet__icon"><img src="assets/icons/icon-192.png" alt="" width="42" height="42"></div>' +
      '<div class="sheet__body">' +
        '<b class="sheet__title" data-i18n="' + titleKey + '">' + t(titleKey) + "</b>" +
        '<span class="sheet__text" data-i18n="' + textKey + '">' + t(textKey) + "</span>" +
        (opts.ios ? "" :
          '<div class="sheet__actions">' +
            '<button class="sheet__btn" type="button" data-act="install" data-i18n="app.installBtn">' + t("app.installBtn") + "</button>" +
            '<button class="sheet__later" type="button" data-act="later" data-i18n="app.later">' + t("app.later") + "</button>" +
          "</div>") +
      "</div>" +
      '<button class="sheet__close" type="button" data-act="close" aria-label="Yopish">' +
        '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';

    document.body.appendChild(el);

    el.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-act]");
      if (!btn) return;
      var act = btn.getAttribute("data-act");

      if (act === "install" && opts.onInstall) opts.onInstall();
      if (act === "later" || act === "close") { dismiss(); hideSheet(); }
    });

    return el;
  }

  function showSheet(opts) {
    if (dismissed() || standalone || sheet) return;
    sheet = buildSheet(opts);
    /* Reflow — transition ishlashi uchun */
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
  }

  function hideSheet() {
    if (!sheet) return;
    var el = sheet;
    sheet = null;
    el.classList.remove("is-open");
    setTimeout(function () { el.remove(); }, 420);
  }

  /* ---- Android / desktop: beforeinstallprompt ---- */
  var deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();                 /* brauzerning oʻz bannerini toʻxtatamiz */
    deferredPrompt = e;

    setTimeout(function () {
      showSheet({
        ios: false,
        onInstall: function () {
          hideSheet();
          if (!deferredPrompt) return;
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then(function (res) {
            if (res.outcome === "accepted") dismiss();
            deferredPrompt = null;
          });
        }
      });
    }, 3500);
  });

  window.addEventListener("appinstalled", function () {
    dismiss();
    hideSheet();
    deferredPrompt = null;
  });

  /* ---- iOS: beforeinstallprompt yoʻq, faqat qoʻlda qoʻshiladi ---- */
  function isIOS() {
    return (
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      /* iPadOS 13+ oʻzini Mac deb koʻrsatadi */
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  }

  function isIOSSafari() {
    if (!isIOS()) return false;
    /* Chrome/Firefox/Edge iOS'da "Bosh ekranga qoʻshish" yoʻq yoki boshqacha */
    return !/crios|fxios|edgios|opios/i.test(navigator.userAgent);
  }

  /* ============================================================
     Yangilanish xabari
     ============================================================ */
  function showUpdate(worker) {
    if (document.getElementById("appUpdate")) return;

    /* Ikkalasi bir xil joyda chiziladi. Yangilanish muhimroq —
       oʻrnatish taklifini yopamiz (u keyingi tashrifda qayta chiqadi). */
    hideSheet();

    var el = document.createElement("div");
    el.className = "appbar";
    el.id = "appUpdate";
    el.setAttribute("role", "status");
    el.innerHTML =
      '<span class="appbar__dot"></span>' +
      '<span class="appbar__text" data-i18n="app.updateTitle">' + t("app.updateTitle") + "</span>" +
      '<button class="appbar__btn" type="button" data-i18n="app.updateBtn">' + t("app.updateBtn") + "</button>";

    document.body.appendChild(el);
    void el.offsetWidth;
    el.classList.add("is-open");

    el.querySelector(".appbar__btn").addEventListener("click", function () {
      el.classList.remove("is-open");
      worker.postMessage({ type: "SKIP_WAITING" });
    });
  }

  /* ============================================================
     Oflayn indikatori
     ============================================================ */
  var netbar = null;
  var netTimer = null;

  function net(online) {
    if (!netbar) {
      netbar = document.createElement("div");
      netbar.className = "netbar";
      netbar.setAttribute("role", "status");
      netbar.setAttribute("aria-live", "polite");
      document.body.appendChild(netbar);
    }

    clearTimeout(netTimer);
    netbar.textContent = t(online ? "app.online" : "app.offline");
    netbar.classList.toggle("is-ok", online);
    netbar.classList.add("is-open");

    /* Ulanish tiklanganda xabar oʻzi yoʻqoladi; oflaynda esa turaveradi */
    if (online) netTimer = setTimeout(function () { netbar.classList.remove("is-open"); }, 2600);
  }

  window.addEventListener("offline", function () { net(false); });
  window.addEventListener("online", function () { net(true); });

  /* ============================================================
     Service worker
     ============================================================ */
  function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    /* file:// da SW ishlamaydi */
    if (location.protocol !== "http:" && location.protocol !== "https:") return;

    /* Sahifa toʻliq yuklangach — birinchi renderga xalaqit bermasin */
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").then(function (reg) {

        /* Allaqachon kutayotgan yangi versiya bormi? */
        if (reg.waiting && navigator.serviceWorker.controller) showUpdate(reg.waiting);

        reg.addEventListener("updatefound", function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener("statechange", function () {
            /* controller bor = bu birinchi oʻrnatish emas, aynan yangilanish */
            if (nw.state === "installed" && navigator.serviceWorker.controller) showUpdate(nw);
          });
        });
      }).catch(function (err) {
        console.warn("[app] SW roʻyxatdan oʻtmadi:", err);
      });

      /* SKIP_WAITING'dan keyin yangi SW boshqaruvni oladi — sahifani yangilaymiz */
      var reloading = false;
      navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (reloading) return;
        reloading = true;
        location.reload();
      });
    });
  }

  /* ============================================================
     Manifest yorliqlari (shortcuts) — ?open=cart
     ============================================================ */
  function handleShortcuts() {
    var params = new URLSearchParams(location.search);
    if (params.get("open") === "cart") {
      TOGIDB.openCart();
      /* URL'ni tozalaymiz — yangilashda savat qayta ochilmasin */
      params.delete("open");
      var q = params.toString();
      history.replaceState(null, "", location.pathname + (q ? "?" + q : "") + location.hash);
    }
  }

  /* ============================================================
     Ishga tushirish
     ============================================================ */
  function init() {
    buildTabbar();
    applyChrome();
    syncThemeColor();
    handleShortcuts();

    if (!navigator.onLine) net(false);

    if (isIOSSafari() && !standalone) {
      setTimeout(function () { showSheet({ ios: true, onInstall: null }); }, 3500);
    }

    registerSW();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
