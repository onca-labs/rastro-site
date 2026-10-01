/**
 * The SEO landing pages ("guides"), one per search intent, served at
 * `/<slug>/` by `src/app/[slug]/page.tsx`. This registry is the single source
 * for those pages, their metadata, the sitemap, and the footer links.
 *
 * Every claim must match the app: check the rastro repo's docs/prd.md before
 * adding or changing one. Don't describe features that aren't built, and say
 * plainly what Rastro doesn't do (sync, imports, recall lookups).
 *
 * Comparison pages name other companies' products. Every claim about them must
 * come from that company's own public docs, listed in `comparison.sources`
 * with the date checked. Where their docs are silent, say "not covered in
 * their guides", never "can't". Re-check them when updating `asOf`.
 */

export type Guide = {
  slug: string;
  /** Short name for footer and related links. */
  navLabel: string;
  /** The <title>, brand included. At most 60 characters. */
  title: string;
  /** Meta description, 110 to 160 characters. */
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  screenshot: {
    src: string;
    alt: string;
    caption: string;
  };
  stepsTitle: string;
  steps: readonly { title: string; body: string }[];
  pointsTitle: string;
  points: readonly { title: string; body: string }[];
  /** "comparison" pages compare Rastro with another product; they're listed
   *  apart from the feature guides (footer "Compare" column, not the home grid). */
  kind?: "comparison";
  /** Optional side-by-side comparison (the spreadsheet and competitor pages). */
  comparison?: {
    title: string;
    columns: readonly [string, string, string];
    rows: readonly (readonly [string, string, string])[];
    /** Required when the comparison names another company's product: every
     *  claim about it must be traceable to these pages, checked on `asOf`. */
    sources?: {
      asOf: string;
      note: string;
      links: readonly { label: string; href: string }[];
    };
  };
  faqs: readonly { q: string; a: string }[];
};

export const GUIDES: readonly Guide[] = [
  {
    slug: "botox-inventory-tracking",
    screenshot: {
      src: "/images/guide-toxin.webp",
      alt: "Rastro Botox package detail showing remaining units, lot, and expiration.",
      caption: "See the units left in a vial, with its lot and expiration.",
    },
    navLabel: "Botox and neurotoxins",
    title: "Botox Inventory Tracking App for Injectors | Rastro",
    description:
      "Track Botox, Dysport, Xeomin, and other neurotoxins by the unit. Scan vials in, open them, record units in seconds, and see what's left in each vial.",
    eyebrow: "Neurotoxin inventory",
    h1: "Botox and neurotoxin inventory, tracked by the unit.",
    lede: "Rastro tracks neurotoxins the way you use them: by the vial and by the unit. Scan cartons when they arrive, open a vial when you reconstitute it, and record units after each treatment. Rastro keeps the balance of every vial and the lot it came from.",
    stepsTitle: "How it works",
    steps: [
      {
        title: "Scan the carton",
        body: "Rastro reads the carton's barcode and fills in the product, units per vial, lot, and expiration date.",
      },
      {
        title: "Open a vial",
        body: "When you reconstitute, open a vial in one tap. Rastro picks the one that expires first unless you choose another.",
      },
      {
        title: "Record units",
        body: "Tap Use, type the units, done. If a treatment runs past the end of a vial, Rastro takes the rest from the next one and records both lots.",
      },
    ],
    pointsTitle: "Built for how toxin is really used",
    points: [
      {
        title: "Units stay with the vial",
        body: "Drawn into syringes or not, units are counted against the vial they came from, so every unit keeps its lot.",
      },
      {
        title: "Open vials don't get forgotten",
        body: "Rastro flags a vial opened more than five days ago that still has units not recorded, so you can record the usage or the waste.",
      },
      {
        title: "Waste is its own entry",
        body: "Record drawn-up units you discard as waste. Waste stays out of your usage pace, so it doesn't skew your reorder timing.",
      },
      {
        title: "Know when to reorder",
        body: "See days of supply for each product, worked out from how fast you've actually used it over the last eight weeks.",
      },
    ],
    faqs: [
      {
        q: "Which neurotoxins does Rastro recognize?",
        a: "Rastro's product catalog is built from the FDA's NDC Directory and includes Botox, Botox Cosmetic, Dysport, Xeomin, Daxxify, Jeuveau, and Letybo. A product that isn't in the catalog can be named once, and Rastro remembers its barcode.",
      },
      {
        q: "Does Rastro track syringes of reconstituted toxin?",
        a: "No. Usage is recorded against the vial. That keeps every unit traceable to its lot without tracking each syringe you draw up.",
      },
      {
        q: "What if I record the wrong number of units?",
        a: "Tap Undo right after, or correct the vial's count later from its detail screen. Nothing is erased: the history shows the original entry and the correction.",
      },
    ],
  },
  {
    slug: "dermal-filler-inventory",
    screenshot: {
      src: "/images/guide-filler.webp",
      alt: "Rastro inventory filtered to fillers, showing an open RHA 3 box and syringe counts.",
      caption: "Open boxes and remaining syringes, together in one view.",
    },
    navLabel: "Dermal fillers",
    title: "Dermal Filler Inventory Tracking App | Rastro",
    description:
      "Track dermal filler boxes and syringes by lot and expiration. Scan boxes in, use a syringe in one tap, and finish open boxes before starting new ones.",
    eyebrow: "Filler inventory",
    h1: "Filler inventory, one syringe at a time.",
    lede: "Many filler boxes hold two syringes. Rastro tracks each box as one package with its lot and expiration date, and counts its syringes down as you use them.",
    stepsTitle: "How it works",
    steps: [
      {
        title: "Scan the box",
        body: "Rastro reads GS1 and HIBCC barcodes, including Radiesse's, and fills in the product, lot, expiration, and serial number.",
      },
      {
        title: "Use a syringe",
        body: "Tap Use on the product. Rastro takes the syringe from an open box first, then from the box that expires soonest.",
      },
      {
        title: "Or scan to use",
        body: "Prefer scanning? In Use mode, scan a box or a syringe from it, and it's recorded against that exact package.",
      },
    ],
    pointsTitle: "What Rastro keeps track of",
    points: [
      {
        title: "No box counted twice",
        body: "Scanning a box whose serial number is already in inventory warns you instead of adding it again.",
      },
      {
        title: "Expiration in view",
        body: "Packages expiring within 60 days, and any already expired, are listed where you'll see them. The window is a setting.",
      },
      {
        title: "Boxes move between practices",
        body: "Move a box to another location with the syringes it has left. Usage only draws on stock where you are.",
      },
      {
        title: "Every box has a history",
        body: "Received, opened, used, moved, adjusted. Each package keeps its full trail, and nothing is ever erased.",
      },
    ],
    faqs: [
      {
        q: "Which fillers does Rastro recognize?",
        a: "The catalog is built from the FDA's device database (GUDID) and includes Juvéderm, Restylane, RHA, Radiesse, Belotero, Sculptra, and more. A product that isn't in the catalog can be named once, and Rastro remembers its barcode.",
      },
      {
        q: "How does Rastro handle boxes with two syringes?",
        a: "A box is one package with a quantity of two. Using a syringe leaves the box open with one remaining, and Rastro uses that one before starting a new box.",
      },
      {
        q: "Can I record a syringe as wasted or damaged?",
        a: "Yes. From the package's detail screen, choose a reason (waste, damaged, count correction, or other) and the amount. It's recorded as an adjustment, with Undo.",
      },
    ],
  },
  {
    slug: "injectable-lot-tracking",
    screenshot: {
      src: "/images/guide-lot.webp",
      alt: "Rastro Activity showing package receipts and usage with lot numbers.",
      caption: "Follow the trail from a received package to recorded usage.",
    },
    navLabel: "Lot and expiration tracking",
    title: "Lot and Expiration Tracking for Injectables | Rastro",
    description:
      "Know which injectable lots you have, which you used, and when they expire. Rastro records the lot of every package and lets you search history by lot.",
    eyebrow: "Lot tracking",
    h1: "Every lot and expiration date, on your phone.",
    lede: "When a manufacturer issues a recall, the question is simple: do I have this lot, or did I use it? Rastro records the lot and expiration of every package from its barcode, and keeps that trail from delivery to the last unit.",
    stepsTitle: "How it works",
    steps: [
      {
        title: "Lot captured on arrival",
        body: "Scanning a box records its lot, expiration date, and serial number. There's nothing to copy off the label.",
      },
      {
        title: "Lot carried with every use",
        body: "Each unit and syringe you record is tied to its package's lot, including usage that spans two vials.",
      },
      {
        title: "Search by lot",
        body: "In Activity, type part of a lot number to see every package from that lot: received, used, moved, or still on the shelf.",
      },
    ],
    pointsTitle: "A record you can rely on",
    points: [
      {
        title: "Expiring soon, flagged",
        body: "Packages expiring within 60 days, and any already expired, are called out on the Inventory screen.",
      },
      {
        title: "Nothing is erased",
        body: "Undo doesn't delete an entry. It's kept in the history, marked as undone, so the record stays complete.",
      },
      {
        title: "Filter by date and location",
        body: "Narrow Activity to a day, a range, a product, or a location, for example to review a clinic day or check a supplier invoice.",
      },
      {
        title: "Export anytime",
        body: "Export inventory and activity to CSV, with lot, serial, and expiration for every package.",
      },
    ],
    faqs: [
      {
        q: "Can Rastro tell me if a lot has been recalled?",
        a: "No. Rastro doesn't connect to the internet or check recall notices. When you hear about a recall, search Activity for the lot number to see whether you have it or used it.",
      },
      {
        q: "Does Rastro record which patient received a lot?",
        a: "No, by design. Rastro records what happened to your inventory, never who received it, so it holds no patient information.",
      },
      {
        q: "Where are lot records stored?",
        a: "Only on your iPhone. Rastro has no server. Export to CSV from Settings whenever you want a copy.",
      },
    ],
  },
  {
    slug: "injectable-barcode-scanner",
    screenshot: {
      src: "/images/guide-barcode.webp",
      alt: "Rastro barcode lookup result for Botox Cosmetic 100U, with lot and expiration filled in.",
      caption: "Product details from a sample barcode, entered in the simulator.",
    },
    navLabel: "Barcode scanning",
    title: "Barcode Scanner for Injectables: GS1 & HIBCC | Rastro",
    description:
      "Rastro reads GS1 DataMatrix, GS1-128, and HIBCC barcodes on toxin and filler packaging, filling in product, lot, expiration, and serial in one scan.",
    eyebrow: "Barcode scanning",
    h1: "Scan injectables in instead of typing them.",
    lede: "The barcode on an injectable box already holds most of what you'd type: the product, lot, expiration date, and often a serial number. Rastro reads it with your iPhone's camera and fills everything in.",
    stepsTitle: "How it works",
    steps: [
      {
        title: "Point the camera",
        body: "Rastro reads the barcode in any orientation, straight from the box.",
      },
      {
        title: "Product looked up on the device",
        body: "Rastro matches the barcode against its built-in catalog of toxins and fillers, built from FDA data. No internet connection needed.",
      },
      {
        title: "Asked only what's missing",
        body: "If a product isn't in the catalog, name it once. Rastro remembers that barcode from then on.",
      },
    ],
    pointsTitle: "Made for unpacking a delivery",
    points: [
      {
        title: "Keep scanning",
        body: "In rapid receive, each box is added the moment it's scanned, with a haptic tap. The scanner stays open for the next one.",
      },
      {
        title: "Decisions wait until the end",
        body: "Anything that needs you, like an unfamiliar product, is set aside and resolved from the summary, so scanning doesn't stop.",
      },
      {
        title: "Duplicates caught",
        body: "A serial number already in inventory is skipped with a warning, so a box can't be added twice.",
      },
      {
        title: "Works with barcode readers",
        body: "USB and Bluetooth barcode readers that type into a text field work too.",
      },
    ],
    faqs: [
      {
        q: "Which barcode formats does Rastro read?",
        a: "GS1 DataMatrix, GS1-128, and HIBCC, including HIBCC labels that combine product, lot, and expiration in one barcode. HIBCC labels that print the lot and expiration as a separate barcode aren't supported yet.",
      },
      {
        q: "Do I need an internet connection to scan?",
        a: "No. The product catalog is stored on your iPhone, so scanning works anywhere.",
      },
      {
        q: "Does Rastro save photos of the packaging?",
        a: "No. The camera is used only to read barcodes. Images aren't saved or sent anywhere.",
      },
    ],
  },
  {
    slug: "med-spa-inventory-app",
    screenshot: {
      src: "/images/guide-locations.webp",
      alt: "Rastro Settings showing separate inventory locations and attention settings.",
      caption: "Set up the practices where you keep your stock.",
    },
    navLabel: "Med spas and practices",
    title: "Med Spa Inventory App for Injectables | Rastro",
    description:
      "A simple injectables inventory app for med spas, small practices, and injectors who work at several. Track stock by location, with no account required.",
    eyebrow: "For med spas and practices",
    h1: "Injectable inventory for med spas and small practices.",
    lede: "Rastro is inventory only: not a practice-management suite, and not an EMR. It gives a small practice a clear count of toxins and fillers at each location, with no setup, no logins, and no patient records.",
    stepsTitle: "Getting started",
    steps: [
      {
        title: "Install and scan",
        body: "No account required. Rastro starts with one location, and you can scan what's on the shelf right away.",
      },
      {
        title: "Add your locations",
        body: "Work at more than one practice? Add each one. Location controls only appear once you have two.",
      },
      {
        title: "Move stock between them",
        body: "Move a box or vial to another location, or scan boxes in Move mode to move a whole bag at once.",
      },
    ],
    pointsTitle: "What a small practice gets",
    points: [
      {
        title: "Stock by location",
        body: "See inventory at the current location, or all locations together. Usage only draws on stock where you are.",
      },
      {
        title: "One shared device",
        body: "Today Rastro runs on one device, so a practice can keep one iPhone for inventory. Sync between devices isn't available yet.",
      },
      {
        title: "No patient data",
        body: "Rastro has no fields for patients, appointments, or treatments. It tracks products, never people.",
      },
      {
        title: "Records for the books",
        body: "Filter activity by date to check a supplier invoice, and export inventory and activity to CSV.",
      },
    ],
    faqs: [
      {
        q: "Can several injectors use Rastro on their own phones?",
        a: "Not yet. Rastro keeps its data on one device, so separate phones would have separate inventories. Until sync is available, a practice should share one iPhone for inventory.",
      },
      {
        q: "Does Rastro replace our EMR or practice-management software?",
        a: "No. Rastro only tracks injectable inventory. It doesn't record patients, appointments, or treatments.",
      },
      {
        q: "What does Rastro cost?",
        a: "Rastro will be free on the App Store, with no account and no subscription.",
      },
    ],
  },
  {
    slug: "injectable-inventory-spreadsheet",
    screenshot: {
      src: "/images/guide-export.webp",
      alt: "Rastro Settings with the option to export inventory and activity as CSV files.",
      caption: "Keep a spreadsheet copy with inventory and activity exports.",
    },
    navLabel: "Spreadsheet alternative",
    title: "Injectable Inventory Spreadsheet Alternative | Rastro",
    description:
      "Replace your injectables inventory spreadsheet with an iPhone app that scans barcodes, counts units and syringes, and works out days of supply for you.",
    eyebrow: "Spreadsheet alternative",
    h1: "Still tracking injectables in a spreadsheet?",
    lede: "Spreadsheets are free and flexible, and most practices start there. They also depend on someone typing every lot number and updating the count after every treatment. Rastro keeps the same records with far less typing.",
    stepsTitle: "Moving over",
    steps: [
      {
        title: "Scan what's on hand",
        body: "Scan the boxes on your shelf in one pass. Each is added with its lot and expiration as it's scanned.",
      },
      {
        title: "Record as you go",
        body: "Log units or a syringe after each treatment in a couple of taps, instead of finding the right row later.",
      },
      {
        title: "Keep your spreadsheet if you like",
        body: "Export inventory and activity to CSV anytime and open them in the spreadsheet app you already use.",
      },
    ],
    comparison: {
      title: "Spreadsheet vs. Rastro",
      columns: ["", "Spreadsheet", "Rastro"],
      rows: [
        ["Adding a delivery", "Type product, lot, and expiration for each box", "Scan each box"],
        ["Recording usage", "Find the row and edit the count", "Tap Use and enter units"],
        ["Open vials", "Extra columns to keep up to date", "Each open vial has its own row"],
        ["When to reorder", "Formulas you build and maintain", "Days of supply from your own pace"],
        ["Fixing a mistake", "The old value is overwritten", "Undo, with the full history kept"],
        ["Expiring stock", "Sort and check by hand", "Flagged within 60 days"],
      ],
    },
    pointsTitle: "What you keep",
    points: [
      {
        title: "Your data stays yours",
        body: "Everything is stored on your iPhone and exports to CSV. There's no account to close and nothing locked in.",
      },
      {
        title: "Works offline",
        body: "No signal in the treatment room doesn't matter. Every feature works without a connection.",
      },
    ],
    faqs: [
      {
        q: "Can I import my existing spreadsheet?",
        a: "Not today. The quickest way to start is to scan the boxes you have on hand, which records their lots and expiration dates as you go.",
      },
      {
        q: "Can I get my data back into a spreadsheet?",
        a: "Yes. Settings exports two CSV files, inventory and activity, that open in Excel, Numbers, or Google Sheets.",
      },
      {
        q: "Is Rastro free?",
        a: "Rastro will be free on the App Store, with no account and no subscription.",
      },
    ],
  },
  {
    slug: "jane-app-inventory",
    kind: "comparison",
    screenshot: {
      src: "/images/guide-toxin.webp",
      alt: "Rastro Botox package detail showing remaining units, lot, and expiration.",
      caption: "Each vial keeps its own unit count, lot, and expiration.",
    },
    navLabel: "Rastro vs. Jane App",
    title: "Jane App Inventory vs. Rastro for Injectables | Rastro",
    description:
      "How Jane App's product inventory compares with Rastro for Botox and filler: lot numbers, expiration dates, units per vial, and barcode scanning.",
    eyebrow: "Rastro vs. Jane App",
    h1: "Use Jane for the practice. Use Rastro for the vials.",
    lede: "Jane App runs booking, charting, and billing for many clinics, and it includes product inventory built around products sold at checkout. Rastro does one job: tracking injectables by the vial, the unit, and the lot. You don't have to choose between them.",
    stepsTitle: "Using both",
    steps: [
      {
        title: "Keep Jane for patients",
        body: "Booking, charting, and billing stay in Jane, where your patient records belong. Rastro never holds patient information.",
      },
      {
        title: "Track the stock in Rastro",
        body: "Scan deliveries in, open vials, and record units or syringes as you use them, on your iPhone.",
      },
      {
        title: "Check one against the other",
        body: "Filter Rastro's activity to a clinic day to compare with your charts, and export inventory and activity to CSV.",
      },
    ],
    comparison: {
      title: "Injectable inventory: Jane App vs. Rastro",
      columns: ["", "Jane App", "Rastro"],
      rows: [
        ["Built for", "Practice management, with inventory for products you sell", "Injectable inventory only"],
        ["Lot numbers and expiration dates", "Not covered in Jane's product inventory guides", "Read from the barcode and kept for every package"],
        ["Toxin units", "Set up as a billable product, such as Botox per unit", "Each vial's remaining units, counted down as you record"],
        ["Open vials", "Not covered in Jane's guides", "Each open vial has its own row, with a reminder if usage isn't recorded"],
        ["Barcode scanning", "A barcode scanner can enter a product's code for quick checkout", "The iPhone camera reads GS1 and HIBCC barcodes: product, lot, expiration, and serial"],
        ["On your phone", "No staff app; the staff side runs in Safari", "A native iPhone app that works offline"],
        ["Reordering", "A reorder threshold puts the product on the Inventory Report", "Days of supply from your own pace, with low-supply flags"],
        ["Cost", "Part of a monthly Jane subscription", "Planned to be free"],
      ],
      sources: {
        asOf: "October 1, 2026",
        note: "Based on Jane App's public help guides. Jane's features change, so check its current guides. Jane App is a trademark of its owner, and Rastro isn't affiliated with Jane.",
        links: [
          { label: "Creating a product", href: "https://jane.app/guide/creating-a-product" },
          { label: "Billing per unit", href: "https://jane.app/guide/billing-for-per-unit-mileage-botox-materials-used-reporting-etc" },
          { label: "Jane's mobile app FAQ", href: "https://jane.app/guide/jane-s-mobile-app-for-clients-faq" },
          { label: "Using Jane on a smartphone", href: "https://jane.app/guide/using-jane-on-a-smartphone" },
        ],
      },
    },
    pointsTitle: "Why a separate app for injectables",
    points: [
      {
        title: "Lots travel with every unit",
        body: "Units recorded against a vial stay tied to that vial's lot, so checking a recalled lot is a search in Activity.",
      },
      {
        title: "Scan instead of type",
        body: "The lot, expiration date, and serial come off the box's barcode instead of being typed into a product record.",
      },
      {
        title: "Built for the treatment room",
        body: "Recording usage takes a couple of taps on the phone in your pocket, with or without a signal.",
      },
      {
        title: "No patient data to protect",
        body: "Rastro tracks products only, so it sits beside Jane without adding another place patient information lives.",
      },
    ],
    faqs: [
      {
        q: "Does Rastro integrate with Jane App?",
        a: "No. Rastro doesn't connect to other software. It works alongside Jane: patients, charting, and billing in Jane, injectable stock in Rastro.",
      },
      {
        q: "Does Jane App track lot numbers for injectables?",
        a: "We couldn't find lot or expiration tracking in Jane's product inventory guides as of October 1, 2026. Jane's features change, so check its current guides.",
      },
      {
        q: "Should I stop using Jane's inventory?",
        a: "Not necessarily. Jane's inventory still suits retail products you sell at checkout. Rastro is for the injectables you use in treatment.",
      },
    ],
  },
  {
    slug: "boulevard-inventory",
    kind: "comparison",
    screenshot: {
      src: "/images/guide-lot.webp",
      alt: "Rastro Activity showing package receipts and usage with lot numbers.",
      caption: "Every package keeps its lot from delivery to the last unit.",
    },
    navLabel: "Rastro vs. Boulevard",
    title: "Boulevard Inventory vs. Rastro for Injectables | Rastro",
    description:
      "How Boulevard's inventory compares with Rastro for Botox and filler: expiration dates, lot numbers, units per vial, and barcode scanning on iPhone.",
    eyebrow: "Rastro vs. Boulevard",
    h1: "Boulevard runs the spa. Rastro tracks the injectables.",
    lede: "Boulevard handles booking, checkout, and charting for spas and med spas, and its inventory follows retail sales and product usage. Rastro does one job: tracking injectables by the vial, the unit, the lot, and the expiration date.",
    stepsTitle: "Using both",
    steps: [
      {
        title: "Keep Boulevard for clients",
        body: "Appointments, checkout, and charting stay in Boulevard. Rastro never holds client or patient information.",
      },
      {
        title: "Track injectables in Rastro",
        body: "Scan boxes in as they arrive, open vials, and record units or syringes as you use them, on your iPhone.",
      },
      {
        title: "Check one against the other",
        body: "Filter Rastro's activity to a day or a range to compare with your services, and export it to CSV.",
      },
    ],
    comparison: {
      title: "Injectable inventory: Boulevard vs. Rastro",
      columns: ["", "Boulevard", "Rastro"],
      rows: [
        ["Built for", "Spa and med spa management, with inventory for retail and products used in services", "Injectable inventory only"],
        ["Expiration dates", "Can't be tracked on products, according to Boulevard's help center", "Read from the barcode, with packages expiring within 60 days flagged"],
        ["Lot numbers", "Not covered in Boulevard's inventory guides", "Kept for every package and searchable in Activity"],
        ["Toxin units", "An expected number of units per service, for usage-based pricing on Premier and Enterprise plans", "Each vial's remaining units, counted down as you record"],
        ["Barcode scanning", "A USB 1D/2D scanner on a computer, for SKU and UPC codes", "The iPhone camera reads GS1 and HIBCC barcodes: product, lot, expiration, and serial"],
        ["On your phone", "The Professional app covers appointments, charting, and checkout", "A native iPhone app for inventory that works offline"],
        ["Moving stock between locations", "Not covered in Boulevard's guides", "Move a box or vial, or scan a bag of boxes in Move mode"],
        ["Cost", "Part of a monthly Boulevard subscription", "Planned to be free"],
      ],
      sources: {
        asOf: "October 1, 2026",
        note: "Based on Boulevard's public help center. Boulevard's features change, so check its current articles. Boulevard is a trademark of its owner, and Rastro isn't affiliated with Boulevard.",
        links: [
          { label: "Products and inventory", href: "https://support.boulevard.io/en/articles/5941416-products-and-inventory" },
          { label: "Tracking products used during services", href: "https://support.boulevard.io/en/articles/5941350-tracking-and-charging-for-products-used-during-services" },
          { label: "Hardware recommendations", href: "https://support.boulevard.io/en/articles/6047189-hardware-recommendations-testing" },
          { label: "Professional app", href: "https://support.boulevard.io/en/articles/9180930-professional-app" },
        ],
      },
    },
    pointsTitle: "Why a separate app for injectables",
    points: [
      {
        title: "Expiration in view",
        body: "Every package carries its expiration date, and anything expiring within 60 days is called out on the Inventory screen.",
      },
      {
        title: "Lots you can look up",
        body: "Type part of a lot number in Activity to see every package from that lot: received, used, moved, or still on hand.",
      },
      {
        title: "Scan with the phone you have",
        body: "No USB scanner or computer needed. The iPhone camera reads the barcode on the box, in any orientation.",
      },
      {
        title: "Works where the signal doesn't",
        body: "Every feature works offline, so a dead zone in the treatment room doesn't stop anyone recording usage.",
      },
    ],
    faqs: [
      {
        q: "Does Rastro integrate with Boulevard?",
        a: "No. Rastro doesn't connect to other software. It works alongside Boulevard: clients and checkout in Boulevard, injectable stock in Rastro.",
      },
      {
        q: "Can Boulevard track expiration dates for injectables?",
        a: "As of October 1, 2026, Boulevard's help center says expiration dates can't be tracked or added to products. Boulevard's features change, so check its current articles.",
      },
      {
        q: "Should I stop using Boulevard's inventory?",
        a: "Not necessarily. Boulevard's inventory still suits retail products and checkout. Rastro is for the injectables you use in treatment.",
      },
    ],
  },
  {
    slug: "aesthetic-record-inventory",
    kind: "comparison",
    screenshot: {
      src: "/images/guide-barcode.webp",
      alt: "Rastro barcode lookup result for Botox Cosmetic 100U, with lot and expiration filled in.",
      caption: "Lot and expiration filled in from the barcode on the box.",
    },
    navLabel: "Rastro vs. Aesthetic Record",
    title: "Aesthetic Record Inventory vs. Rastro | Rastro",
    description:
      "Aesthetic Record tracks injectable lots inside its EMR. See how Rastro compares: barcode scanning, iPhone use, offline tracking, and no account required.",
    eyebrow: "Rastro vs. Aesthetic Record",
    h1: "EMR inventory, or inventory in your pocket?",
    lede: "Aesthetic Record is an EMR built for aesthetic practices, and its inventory handles injectables: stock by the unit, lots chosen when charting, and transfers between clinics. Rastro is narrower. It's an iPhone app that scans boxes in, works offline, and has no account required.",
    stepsTitle: "Where each one fits",
    steps: [
      {
        title: "Charting in Aesthetic Record?",
        body: "Charting a treatment there deducts the stock, so its inventory may be all you need.",
      },
      {
        title: "Want to scan, not type?",
        body: "Rastro reads the lot and expiration date from the box's barcode, so receiving a delivery is one scan per box.",
      },
      {
        title: "Working across practices?",
        body: "Rastro keeps your own count of stock across the places you work, whatever software each practice runs.",
      },
    ],
    comparison: {
      title: "Injectable inventory: Aesthetic Record vs. Rastro",
      columns: ["", "Aesthetic Record", "Rastro"],
      rows: [
        ["Built for", "An EMR for aesthetic practices, with injectable inventory", "Injectable inventory only"],
        ["Lot numbers and expiration", "Entered for each batch; the provider picks the lot when charting", "Read from the barcode when you scan the box"],
        ["Toxin units", "Stock kept in units and deducted when a treatment is charted", "Each vial's remaining units, counted down as you record"],
        ["Open vials", "Not covered in Aesthetic Record's inventory guides", "Each open vial has its own row, with a reminder if usage isn't recorded"],
        ["Barcode scanning", "Not covered in Aesthetic Record's inventory guides", "The iPhone camera reads GS1 and HIBCC barcodes"],
        ["Managing stock", "Added and edited in the web portal", "Received, used, and moved on your iPhone"],
        ["Works offline", "Not covered in Aesthetic Record's inventory guides", "Yes, every feature"],
        ["Moving stock between locations", "Stock transfers between clinics", "Move a box or vial between locations"],
        ["Ordering and alerts", "Purchase orders and low-stock alerts", "Low-supply flags from days of supply; no ordering"],
        ["Getting started", "A practice account and subscription", "Install and scan, with no account required"],
      ],
      sources: {
        asOf: "October 1, 2026",
        note: "Based on Aesthetic Record's public help center. Its features change, so check its current articles. Aesthetic Record is a trademark of its owner, and Rastro isn't affiliated with it.",
        links: [
          { label: "Stock management", href: "https://learn.aestheticrecord.com/en/articles/9268485-stock-management" },
          { label: "Traceability when charting", href: "https://learn.aestheticrecord.com/en/articles/9247099-add-traceability-information-to-a-procedure" },
          { label: "Managing services in inventory", href: "https://learn.aestheticrecord.com/en/articles/11045732-add-manage-services-in-your-inventory" },
          { label: "Stock transfers", href: "https://learn.aestheticrecord.com/en/articles/9264726-stock-transfer-between-clinics" },
          { label: "Stock alerts", href: "https://learn.aestheticrecord.com/en/articles/9248114-stock-alerts" },
          { label: "Purchase orders", href: "https://learn.aestheticrecord.com/en/articles/9298442-add-in-your-suppliers-and-purchase-orders" },
        ],
      },
    },
    pointsTitle: "What Rastro adds",
    points: [
      {
        title: "Scanning built in",
        body: "Lot, expiration, and serial come off GS1 and HIBCC barcodes, so there's nothing to copy off the label.",
      },
      {
        title: "Open vials tracked",
        body: "Each open vial is its own row with its remaining units, and Rastro reminds you when usage hasn't been recorded.",
      },
      {
        title: "On the phone, offline",
        body: "Receive, use, and move stock from your iPhone, with or without a connection.",
      },
      {
        title: "No setup",
        body: "No account, no onboarding, and no patient records. Install it and scan what's on the shelf.",
      },
    ],
    faqs: [
      {
        q: "Does Rastro integrate with Aesthetic Record?",
        a: "No. Rastro doesn't connect to other software. If you chart in Aesthetic Record, Rastro is a separate count of your injectable stock.",
      },
      {
        q: "Does Aesthetic Record support barcode scanning?",
        a: "We couldn't find barcode scanning in Aesthetic Record's inventory guides as of October 1, 2026. Its features change, so check its current help center.",
      },
      {
        q: "Is Rastro an EMR?",
        a: "No. Rastro has no patient records, charting, or billing. It only tracks injectable inventory.",
      },
    ],
  },
] as const;

/** Feature guides: the home page grid and the footer's Features column. */
export const FEATURE_GUIDES = GUIDES.filter((g) => g.kind !== "comparison");

/** Competitor comparisons: the footer's Compare column. */
export const COMPARISON_GUIDES = GUIDES.filter((g) => g.kind === "comparison");

export function findGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function guidePath(guide: Pick<Guide, "slug">): string {
  return `/${guide.slug}/`;
}
