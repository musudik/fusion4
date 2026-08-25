/* ============================================================
   Fusion4 Events — Tickets Module (renderer)
   Renders ticket categories from tickets/config.js into
   <div id="f4-tickets"></div> on any page.

   - window.F4_TICKETS.enabled === false  -> renders nothing,
     the static fallback (#f4-tickets-fallback) stays visible.
   - enabled === true -> fallback is hidden, category cards render.
   No other file needs editing to switch the module on/off.
   ============================================================ */
(function () {
  "use strict";

  var cfg = window.F4_TICKETS;
  var mount = document.getElementById("f4-tickets");
  if (!mount) return;

  var fallback = document.getElementById("f4-tickets-fallback");

  if (!cfg || cfg.enabled !== true || !Array.isArray(cfg.categories) || cfg.categories.length === 0) {
    // Module off -> leave static fallback as-is
    return;
  }
  if (fallback) fallback.style.display = "none";

  /* ---- styles (injected once) ---- */
  var css = ""
    + ".f4t-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:18px;}"
    + ".f4t-card{position:relative;display:flex;flex-direction:column;gap:10px;padding:22px;border:1px solid rgba(255,153,51,.28);background:rgba(255,153,51,.05);border-radius:10px;transition:transform .25s ease,border-color .25s ease;}"
    + ".f4t-card:hover{transform:translateY(-4px);border-color:rgba(255,153,51,.6);}"
    + ".f4t-card--off{opacity:.45;filter:grayscale(.6);}"
    + ".f4t-badge{position:absolute;top:-12px;right:14px;background:linear-gradient(135deg,#ff9933,#e65c00);color:#fff;font-family:'Barlow Condensed',sans-serif;font-size:.66rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:4px 12px;border-radius:4px;}"
    + ".f4t-name{font-family:'Barlow Condensed',sans-serif;font-size:1.25rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:#fff;}"
    + ".f4t-price{font-family:'Barlow Condensed',sans-serif;font-size:1.9rem;font-weight:800;color:#ff9933;line-height:1;}"
    + ".f4t-price small{font-size:.85rem;font-weight:600;color:rgba(255,255,255,.45);letter-spacing:.06em;}"
    + ".f4t-desc{font-size:.88rem;color:rgba(255,255,255,.55);line-height:1.55;}"
    + ".f4t-perks{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px;}"
    + ".f4t-perks li{font-family:'Barlow Condensed',sans-serif;font-size:.64rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,153,51,.85);background:rgba(255,153,51,.1);border:1px solid rgba(255,153,51,.22);padding:4px 10px;border-radius:4px;}"
    + ".f4t-btn{margin-top:auto;display:inline-block;text-align:center;background:linear-gradient(135deg,#ff9933,#e65c00);color:#fff !important;font-family:'Barlow Condensed',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:12px 18px;border-radius:5px;text-decoration:none !important;}"
    + ".f4t-btn:hover{opacity:.9;}"
    + ".f4t-btn--off{background:rgba(255,255,255,.12);cursor:not-allowed;pointer-events:none;}"
    + ".f4t-note{margin-top:16px;font-size:.85rem;color:rgba(255,255,255,.45);}";
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---- render ---- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var grid = el("div", "f4t-grid");
  cfg.categories.forEach(function (cat) {
    var off = cat.available === false;
    var card = el("article", "f4t-card" + (off ? " f4t-card--off" : ""));
    if (cat.badge) card.appendChild(el("span", "f4t-badge", esc(cat.badge)));
    card.appendChild(el("h3", "f4t-name", esc(cat.name)));

    var priceHtml = (cat.price === null || cat.price === undefined)
      ? '<small>On request</small>'
      : esc(cfg.currencySymbol || "€") + esc(Number(cat.price).toFixed(2)) + " <small>per ticket</small>";
    card.appendChild(el("p", "f4t-price", priceHtml));

    if (cat.description) card.appendChild(el("p", "f4t-desc", esc(cat.description)));

    if (Array.isArray(cat.perks) && cat.perks.length) {
      var ul = el("ul", "f4t-perks");
      cat.perks.forEach(function (p) { ul.appendChild(el("li", null, esc(p))); });
      card.appendChild(ul);
    }

    var btn = el("a", "f4t-btn" + (off ? " f4t-btn--off" : ""),
      off ? "Sold Out" : (cat.price == null ? "Contact Us" : "🎫 Book Now"));
    if (!off) {
      btn.href = cat.url || cfg.bookingUrl || "#";
      btn.rel = "noopener";
    }
    card.appendChild(btn);
    grid.appendChild(card);
  });

  mount.appendChild(grid);
  if (cfg.note) mount.appendChild(el("p", "f4t-note", esc(cfg.note)));
})();
