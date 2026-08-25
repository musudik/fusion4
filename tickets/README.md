# Fusion4 Events — Tickets Module

A self-contained, backend-free ticketing module for the GitHub Pages site.

## Files

| File | Purpose |
|---|---|
| `config.js` | **The only file you normally edit.** Master on/off switch, event details, ticket categories & prices. |
| `tickets.js` | Renders the category cards on the event page. No editing needed. |
| `generate.html` | Internal tool: bulk-generate signed QR tickets (print or save PDF + manifest CSV). |
| `scan.html` | Internal tool: camera check-in scanner for event day. |

## Switch the module on / off

In `config.js`, set:

```js
enabled: true    // categories show on the event page
enabled: false   // module hidden, the static "Book Tickets" button shows instead
```

No other change needed — commit & push, done.

## Edit ticket categories

Each entry in `categories` supports:

```js
{
  id: "earlybird",          // required, stable — also embedded in QR codes
  name: "Early Bird",       // required
  price: 15.99,             // number, or null -> shows "On request / Contact us"
  badge: "🔥 Limited",      // optional corner ribbon
  description: "…",         // optional
  perks: ["…", "…"],        // optional chips
  available: true,          // false -> greyed out, "Sold Out"
  url: "https://…"          // optional per-category link (default: bookingUrl)
}
```

⚠️ Only the Early Bird price (€15.99) is confirmed — the other categories are
placeholders. Match them to the real categories in Brizz before enabling.

## QR tickets — how it works

- **No server.** Each ticket is a QR code containing
  `F4T1|EVENT|CATEGORY|ID|NAME|SIGNATURE`, where the signature is an
  HMAC-SHA256 of the payload using **your secret key**. Tickets can't be forged
  without the key, and verification works fully offline.
- **Generate** (`tickets/generate.html`): enter a secret key, then either
  bulk-generate N tickets per category or paste a guest list
  (`name,category` per line). Print the sheet (or save as PDF) and download
  the manifest CSV for your records.
- **Scan** (`tickets/scan.html`): on event day, open on any phone/laptop with a
  camera, enter the **same secret key**, start scanning.
  - ✅ green = valid, first entry (stored on the device, works offline)
  - ⚠️ yellow = duplicate (shows who/when it was first scanned)
  - ❌ red = forged/wrong event/wrong key
  - Export all check-ins as CSV afterwards.

### Important notes

- **Same secret key** must be used for generating and scanning. If you lose it,
  regenerate all tickets.
- Check-ins are stored **per device** (localStorage). With multiple entry
  gates, either dedicate categories per gate or merge the exported CSVs after.
  For a single entrance, one device is fine.
- Use the **deployed HTTPS URL** (fusion4events.com/tickets/scan.html) on
  phones — camera access requires HTTPS.
- `generate.html` and `scan.html` are blocked from search engines
  (robots.txt + noindex) but are still publicly reachable if someone knows the
  URL — the secret key is what protects tickets, never share it.
- Brizz remains the paid-ticket sales channel; these QR tickets are for
  guest lists, sponsors, artists, crew, press, or door sales — and as a
  general mechanism for future events (change `event.id` in config.js).
