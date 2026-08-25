/* ============================================================
   Fusion4 Events — Tickets Module Configuration
   ------------------------------------------------------------
   This is the ONLY file you normally need to edit.

   enabled:  true  -> ticket categories render on the event page
             false -> module hidden, static booking button shows
   ------------------------------------------------------------
   NOTE: Early Bird price (15.99) is confirmed. The other
   categories/prices are PLACEHOLDERS — edit them to match the
   real categories configured in Brizz before going live.
   ============================================================ */
window.F4_TICKETS = {
  enabled: true,                     // master on/off switch

  event: {
    id: "GM2026",                    // short id — also embedded in every QR code
    name: "Garba Mahotsav Munich 2026",
    date: "Sunday, 25 October 2026",
    time: "12:30 PM – 10:00 PM",
    venue: "Zenith – Die Kulturhalle, Lilienthalallee 29, 80939 München"
  },

  currency: "EUR",
  currencySymbol: "€",

  // Default booking link (used when a category has no own url)
  bookingUrl: "https://brizz.me/booking/31548328-bb1b-4dff-8ca4-2a97c3ae6b72",

  // Shown under the category grid
  note: "One ticket includes all three experiences — Bhajan Sandhya, Live Garba Raas & DJ Dandiya Night. 100% non-alcoholic · Sattvik food · Kids & family friendly.",

  categories: [
    {
      id: "earlybird",
      name: "Early Bird",
      price: 15.99,
      badge: "🔥 Limited",
      description: "Full-day access to all three experiences at the best price. Limited contingent!",
      perks: ["All 3 experiences", "Full-day access", "Best price"],
      available: true
    },
    {
      id: "standard",
      name: "Standard",
      price: 19.99,                  // PLACEHOLDER — set real price
      badge: "",
      description: "Full-day access to all three experiences.",
      perks: ["All 3 experiences", "Full-day access"],
      available: true
    },
    {
      id: "kids",
      name: "Kids (4–12 yrs)",
      price: 9.99,                   // PLACEHOLDER — set real price
      badge: "👨‍👩‍👧 Family",
      description: "Children's ticket. Kids under 4 join free with a parent.",
      perks: ["All 3 experiences", "Under 4 free"],
      available: true
    },
    {
      id: "family",
      name: "Family Pack (2+2)",
      price: 49.99,                  // PLACEHOLDER — set real price
      badge: "💛 Best Value",
      description: "Two adults + two kids — celebrate together and save.",
      perks: ["2 adults + 2 kids", "All 3 experiences"],
      available: true
    },
    {
      id: "group10",
      name: "Group (10+)",
      price: null,                   // null price -> "Contact us" instead of a number
      badge: "",
      description: "Coming with your Garba group or association? Contact us for group rates.",
      perks: ["10+ people", "Special rates"],
      available: true,
      url: "https://wa.me/4915560200235"   // category-specific link (WhatsApp)
    }
    /* Add more categories here — every field is optional except id, name.
       { id, name, price, badge, description, perks[], available, url } */
  ]
};
