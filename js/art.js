/* ============================================================
   UPG — mahsulot illyustratsiyalari (SVG "render"lar)
   Har bir mahsulot turi uchun brendlangan realistik vizual.
   window.UPG_ART(type, brand) -> SVG markup (string)
   ============================================================ */

window.UPG_ART = (function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Brend yorligʻi (pastda) */
  function label(brand) {
    if (!brand) return "";
    return '<text x="120" y="171" text-anchor="middle" fill="rgba(255,255,255,.5)" ' +
      'font-family="Space Grotesk, Inter, sans-serif" font-size="11" font-weight="600" ' +
      'letter-spacing="1.5">' + esc(brand.toUpperCase()) + '</text>';
  }

  /* Umumiy defs — korpus va aksent gradientlari */
  function defs(uid) {
    return (
      '<defs>' +
        '<linearGradient id="b' + uid + '" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="#34353f"/><stop offset="1" stop-color="#1e1f26"/>' +
        '</linearGradient>' +
        '<linearGradient id="a' + uid + '" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#FF0096"/><stop offset="1" stop-color="#FF3139"/>' +
        '</linearGradient>' +
        '<radialGradient id="g' + uid + '" cx="0.5" cy="0.5" r="0.5">' +
          '<stop offset="0" stop-color="#FF0096" stop-opacity=".5"/>' +
          '<stop offset="1" stop-color="#FF0096" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>'
    );
  }

  var uidc = 0;

  var SHAPES = {
    /* Monitor */
    monitor: function (u) {
      return (
        '<rect x="34" y="30" width="172" height="104" rx="9" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="42" y="38" width="156" height="88" rx="4" fill="#0d0d12"/>' +
        '<rect x="42" y="38" width="156" height="88" rx="4" fill="url(#g' + u + ')" opacity=".7"/>' +
        '<path d="M60 104 L92 74 L112 92 L140 60 L180 104 Z" fill="url(#a' + u + ')" opacity=".9"/>' +
        '<rect x="104" y="134" width="32" height="18" fill="url(#b' + u + ')"/>' +
        '<rect x="80" y="150" width="80" height="8" rx="4" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.12)"/>'
      );
    },
    /* Noutbuk */
    laptop: function (u) {
      return (
        '<path d="M58 44 h124 a4 4 0 0 1 4 4 v70 h-132 v-70 a4 4 0 0 1 4-4 Z" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="66" y="52" width="108" height="58" rx="2" fill="#0d0d12"/>' +
        '<rect x="66" y="52" width="108" height="58" rx="2" fill="url(#g' + u + ')" opacity=".6"/>' +
        '<rect x="90" y="72" width="60" height="6" rx="3" fill="url(#a' + u + ')"/>' +
        '<rect x="90" y="84" width="40" height="5" rx="2.5" fill="rgba(255,255,255,.25)"/>' +
        '<path d="M40 118 h160 l8 16 a4 4 0 0 1-4 6 H36 a4 4 0 0 1-4-6 Z" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.12)"/>' +
        '<rect x="100" y="126" width="40" height="5" rx="2.5" fill="rgba(255,255,255,.2)"/>'
      );
    },
    /* Klaviatura */
    kb: function (u) {
      var keys = "";
      for (var r = 0; r < 4; r++) for (var c = 0; c < 12; c++) {
        var on = (r === 3 && c > 3 && c < 8) || (r === 1 && (c % 5 === 0));
        keys += '<rect x="' + (46 + c * 12.4) + '" y="' + (62 + r * 15) + '" width="10" height="12" rx="2" fill="' +
          (on ? 'url(#a' + u + ')' : 'rgba(255,255,255,.16)') + '"/>';
      }
      return (
        '<rect x="34" y="52" width="172" height="80" rx="10" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="40" y="128" width="160" height="10" rx="4" fill="url(#a' + u + ')" opacity=".5"/>' +
        keys
      );
    },
    /* Sichqoncha */
    mouse: function (u) {
      return (
        '<circle cx="120" cy="92" r="60" fill="url(#g' + u + ')"/>' +
        '<path d="M120 40 c26 0 40 20 40 46 v18 c0 24-18 40-40 40 s-40-16-40-40 v-18 c0-26 14-46 40-46 Z" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.16)"/>' +
        '<path d="M120 40 v42" stroke="rgba(255,255,255,.18)" stroke-width="2"/>' +
        '<rect x="116" y="52" width="8" height="18" rx="4" fill="url(#a' + u + ')"/>' +
        '<ellipse cx="120" cy="128" rx="26" ry="12" fill="url(#a' + u + ')" opacity=".35"/>'
      );
    },
    /* Garnitura */
    headset: function (u) {
      return (
        '<path d="M58 108 v-8 a62 62 0 0 1 124 0 v8" fill="none" stroke="url(#b' + u + ')" stroke-width="12" stroke-linecap="round"/>' +
        '<path d="M58 104 v-6 a62 62 0 0 1 124 0 v6" fill="none" stroke="url(#a' + u + ')" stroke-width="3" stroke-linecap="round" opacity=".8"/>' +
        '<rect x="44" y="100" width="30" height="46" rx="12" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="166" y="100" width="30" height="46" rx="12" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="52" y="110" width="14" height="26" rx="7" fill="url(#a' + u + ')" opacity=".6"/>' +
        '<path d="M166 130 q-16 0 -16 16 v6" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="3"/>' +
        '<circle cx="150" cy="156" r="5" fill="url(#a' + u + ')"/>'
      );
    },
    /* Gaming kreslo */
    chair: function (u) {
      return (
        '<rect x="86" y="30" width="68" height="80" rx="18" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="96" y="40" width="48" height="60" rx="12" fill="url(#a' + u + ')" opacity=".28"/>' +
        '<path d="M96 52 h48 M96 66 h48 M96 80 h48" stroke="url(#a' + u + ')" stroke-width="3" opacity=".7"/>' +
        '<rect x="82" y="104" width="76" height="26" rx="12" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="68" y="88" width="14" height="34" rx="7" fill="url(#b' + u + ')"/>' +
        '<rect x="158" y="88" width="14" height="34" rx="7" fill="url(#b' + u + ')"/>' +
        '<path d="M120 130 v14" stroke="rgba(255,255,255,.2)" stroke-width="6"/>' +
        '<path d="M92 156 l28-12 28 12" fill="none" stroke="url(#b' + u + ')" stroke-width="7" stroke-linecap="round"/>' +
        '<circle cx="92" cy="156" r="5" fill="url(#a' + u + ')"/><circle cx="148" cy="156" r="5" fill="url(#a' + u + ')"/>'
      );
    },
    /* Keys (korpus) */
    "case": function (u) {
      return (
        '<rect x="74" y="26" width="92" height="128" rx="8" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="84" y="36" width="72" height="108" rx="4" fill="#0d0d12"/>' +
        '<rect x="84" y="36" width="72" height="108" rx="4" fill="url(#g' + u + ')" opacity=".55"/>' +
        '<circle cx="120" cy="70" r="17" fill="none" stroke="url(#a' + u + ')" stroke-width="3"/>' +
        '<circle cx="120" cy="70" r="4" fill="url(#a' + u + ')"/>' +
        '<circle cx="120" cy="112" r="17" fill="none" stroke="rgba(255,255,255,.25)" stroke-width="3"/>' +
        '<circle cx="120" cy="112" r="4" fill="rgba(255,255,255,.3)"/>' +
        '<rect x="150" y="30" width="4" height="120" fill="url(#a' + u + ')" opacity=".55"/>'
      );
    },
    /* Quvvat bloki */
    psu: function (u) {
      return (
        '<rect x="46" y="52" width="148" height="82" rx="8" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<circle cx="96" cy="93" r="34" fill="#0d0d12"/>' +
        '<circle cx="96" cy="93" r="34" fill="url(#g' + u + ')" opacity=".7"/>' +
        '<g stroke="url(#a' + u + ')" stroke-width="4" stroke-linecap="round">' +
          '<path d="M96 66 v14M96 106 v14M69 93 h14M109 93 h14M78 75 l9 9M114 102 l-9-9M78 111 l9-9M114 84 l-9 9"/></g>' +
        '<circle cx="96" cy="93" r="7" fill="url(#a' + u + ')"/>' +
        '<rect x="150" y="66" width="34" height="10" rx="3" fill="rgba(255,255,255,.16)"/>' +
        '<rect x="150" y="84" width="34" height="10" rx="3" fill="rgba(255,255,255,.16)"/>' +
        '<rect x="150" y="102" width="34" height="10" rx="3" fill="rgba(255,255,255,.16)"/>'
      );
    },
    /* Sovutish (AIO) */
    cooler: function (u) {
      return (
        '<rect x="40" y="44" width="60" height="96" rx="8" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<g stroke="rgba(255,255,255,.12)" stroke-width="2">' +
          '<path d="M40 58h60M40 72h60M40 86h60M40 100h60M40 114h60M40 128h60"/></g>' +
        '<rect x="40" y="44" width="60" height="96" rx="8" fill="url(#g' + u + ')" opacity=".4"/>' +
        '<path d="M100 66 q40 4 40 26 q0 22 40 26" fill="none" stroke="url(#b' + u + ')" stroke-width="10"/>' +
        '<path d="M100 74 q40 4 40 18 q0 14 40 18" fill="none" stroke="url(#a' + u + ')" stroke-width="2.5" opacity=".7"/>' +
        '<circle cx="176" cy="112" r="30" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<g stroke="url(#a' + u + ')" stroke-width="4" stroke-linecap="round">' +
          '<path d="M176 92v12M176 120v12M156 112h12M184 112h12"/></g>' +
        '<circle cx="176" cy="112" r="6" fill="url(#a' + u + ')"/>'
      );
    },
    /* Wi-Fi router */
    wifi: function (u) {
      return (
        '<path d="M120 70 a44 44 0 0 1 40 26" fill="none" stroke="url(#a' + u + ')" stroke-width="4" stroke-linecap="round" opacity=".5"/>' +
        '<path d="M120 84 a30 30 0 0 1 26 16" fill="none" stroke="url(#a' + u + ')" stroke-width="4" stroke-linecap="round" opacity=".8"/>' +
        '<rect x="62" y="104" width="116" height="40" rx="10" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<g stroke="url(#b' + u + ')" stroke-width="7" stroke-linecap="round">' +
          '<path d="M82 104 V64"/><path d="M120 104 V56"/><path d="M158 104 V64"/></g>' +
        '<circle cx="82" cy="60" r="4" fill="url(#a' + u + ')"/><circle cx="120" cy="52" r="4" fill="url(#a' + u + ')"/><circle cx="158" cy="60" r="4" fill="url(#a' + u + ')"/>' +
        '<circle cx="80" cy="124" r="4" fill="url(#a' + u + ')"/><circle cx="96" cy="124" r="4" fill="rgba(255,255,255,.4)"/><circle cx="112" cy="124" r="4" fill="rgba(255,255,255,.25)"/>'
      );
    },
    /* Gilamcha */
    mousepad: function (u) {
      return (
        '<rect x="36" y="54" width="168" height="76" rx="10" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="42" y="60" width="156" height="64" rx="7" fill="none" stroke="url(#a' + u + ')" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/>' +
        '<circle cx="120" cy="92" r="24" fill="none" stroke="url(#a' + u + ')" stroke-width="3"/>' +
        '<path d="M120 92 L138 74" stroke="url(#a' + u + ')" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="120" cy="92" r="4" fill="url(#a' + u + ')"/>'
      );
    },
    /* Kontroller (rul) */
    controller: function (u) {
      return (
        '<circle cx="120" cy="92" r="58" fill="none" stroke="url(#b' + u + ')" stroke-width="16"/>' +
        '<circle cx="120" cy="92" r="58" fill="none" stroke="url(#a' + u + ')" stroke-width="3" opacity=".6"/>' +
        '<circle cx="120" cy="92" r="24" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<path d="M120 116 v34" stroke="url(#b' + u + ')" stroke-width="14"/>' +
        '<path d="M96 92 H60 M144 92 H180" stroke="url(#b' + u + ')" stroke-width="14" stroke-linecap="round"/>' +
        '<rect x="110" y="82" width="20" height="20" rx="4" fill="url(#a' + u + ')"/>' +
        '<rect x="88" y="140" width="64" height="14" rx="6" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.12)"/>'
      );
    },
    /* Tayyor yigʻilma (PC + monitor) */
    pc: function (u) {
      return (
        '<rect x="40" y="40" width="96" height="60" rx="6" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<rect x="47" y="47" width="82" height="46" rx="3" fill="#0d0d12"/>' +
        '<rect x="47" y="47" width="82" height="46" rx="3" fill="url(#g' + u + ')" opacity=".6"/>' +
        '<path d="M58 84 L76 66 L88 78 L104 58 L120 84 Z" fill="url(#a' + u + ')" opacity=".9"/>' +
        '<rect x="80" y="100" width="16" height="12" fill="url(#b' + u + ')"/>' +
        '<rect x="64" y="112" width="48" height="6" rx="3" fill="url(#b' + u + ')"/>' +
        '<rect x="150" y="34" width="56" height="120" rx="7" fill="url(#b' + u + ')" stroke="rgba(255,255,255,.14)"/>' +
        '<circle cx="178" cy="66" r="13" fill="none" stroke="url(#a' + u + ')" stroke-width="3"/>' +
        '<circle cx="178" cy="66" r="3" fill="url(#a' + u + ')"/>' +
        '<circle cx="178" cy="104" r="13" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="3"/>' +
        '<rect x="196" y="40" width="3" height="108" fill="url(#a' + u + ')" opacity=".5"/>'
      );
    }
  };

  return function (type, brand) {
    var u = ++uidc;
    var shape = SHAPES[type] || SHAPES.pc;
    return (
      '<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg" class="art">' +
        defs(u) + shape(u) + label(brand) +
      '</svg>'
    );
  };
})();
