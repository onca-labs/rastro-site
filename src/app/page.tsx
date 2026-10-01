import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackedLink from "@/components/TrackedLink";
import { EARLY_ACCESS_HREF, asset } from "@/lib/site";
import { GUIDES, guidePath } from "@/lib/guides";
import { faqPage, pageGraph, pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * Tracking contract (GTM): `request_access` (with `location`) on every
 * early-access CTA, and the anchor ids `top`, `features`, `how`, `who`,
 * `privacy-first`, `early-access`. `page.test.tsx` asserts both.
 *
 * Every claim here must match the app (rastro repo, docs/prd.md).
 */

const TITLE = "Injectable Inventory App for Botox & Fillers | Rastro";
const DESCRIPTION =
  "Track Botox and dermal filler inventory on iPhone. Scan barcodes, log usage, and see lots, expiration dates, and days of supply. Offline, no account needed.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/" });

type Feature = { title: string; body: string; link?: { href: string; label: string } };

const FEATURES: readonly Feature[] = [
  {
    title: "Scan to receive",
    body: "Rastro reads the GS1 and HIBCC barcodes on the box: product, lot, expiration, and serial. Fields fill in when they are encoded in a supported barcode.",
    link: { href: "/injectable-barcode-scanner/", label: "How scanning works" },
  },
  {
    title: "Record usage in seconds",
    body: "One tap for a filler syringe. A number for toxin units. Then you're back with your patient.",
    link: { href: "/botox-inventory-tracking/", label: "Tracking toxin by the unit" },
  },
  {
    title: "Undo instead of “are you sure?”",
    body: "Routine actions never ask for confirmation. Undo reverses an action when the package history allows it, while keeping the original entry in the history.",
  },
  {
    title: "Know where stock is",
    body: "Track inventory at each practice you work at, and move boxes between them.",
    link: { href: "/med-spa-inventory-app/", label: "Rastro for med spas" },
  },
  {
    title: "See how long it will last",
    body: "Days of supply, worked out from how fast you actually use each product, so you reorder before you run out.",
  },
  {
    title: "A trail for every package",
    body: "Received, opened, used, moved, adjusted. Every box and vial keeps its history, filterable by product, lot, location, or date.",
    link: { href: "/injectable-lot-tracking/", label: "Lot and expiration tracking" },
  },
];

const FAQS = [
  {
    q: "What is an injectable inventory app?",
    a: "An injectable inventory app tracks products such as neurotoxin vials and dermal filler syringes from receipt through use. Rastro records quantities, lots, expiration dates, and locations on your iPhone, with a history for each package.",
  },
  {
    q: "Can I track Botox by units and fillers by syringes?",
    a: "Yes. Record the number of units used from an open toxin vial, or record a filler syringe as used. Rastro keeps the remaining quantity with its package and lot.",
  },
  {
    q: "Does Rastro scan lot numbers and expiration dates?",
    a: "Rastro reads supported GS1 and HIBCC barcodes and fills in lot, expiration, and serial when those fields are encoded. Missing details can be entered manually. It does not read ordinary printed label text.",
  },
  {
    q: "How does Rastro estimate days of supply?",
    a: "Rastro divides stock on hand by your average daily recorded usage, using up to eight weeks of history. Estimates start after at least two weeks of usage history. They help with reorder planning and change as your usage changes.",
  },
  {
    q: "Can my team share inventory across multiple phones?",
    a: "Not yet. Rastro keeps inventory on one device and does not sync between phones. A small practice can share one iPhone. Multiple practice locations can be tracked on that device.",
  },
  {
    q: "Does Rastro work offline, and can I export my inventory?",
    a: "Yes. Core inventory tracking works offline without an account. You can export inventory and activity to CSV from Settings. Rastro tracks products, not patient records.",
  },
  {
    q: "Is Rastro available on the App Store?",
    a: "Rastro is coming soon to iPhone. Request early access by email to join the early testers. It is planned to be free, with no account or subscription.",
  },
] as const;

const STEPS = [
  {
    title: "Scan it in",
    body: "When a shipment arrives, scan each box. Product, lot, expiration, and serial fill in when encoded in the barcode.",
  },
  {
    title: "Record as you go",
    body: "Open a vial, then log units or a syringe as you use them. Or scan the box and Rastro picks the right package.",
  },
  {
    title: "Stay ahead",
    body: "Rastro flags what needs you: packages expiring soon, products running low, and open vials with usage not yet recorded.",
  },
] as const;

const AUDIENCES = [
  {
    title: "Solo injectors",
    body: "Your stock, on your phone. Know exactly what you have before the day starts.",
  },
  {
    title: "Injectors who travel",
    body: "Working across several practices? Keep each site's stock separate and see it all in one place.",
  },
  {
    title: "Small practices",
    body: "Keep one shared iPhone in the treatment room, and everyone records into the same inventory.",
  },
] as const;

function SectionHead({ id, eyebrow, title, lede }: { id: string; eyebrow: string; title: string; lede?: string }) {
  return (
    <header className={styles.sectionHead}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.sectionTitle} id={id}>
        {title}
      </h2>
      {lede ? <p className={styles.sectionLede}>{lede}</p> : null}
    </header>
  );
}

export default function LandingPage() {
  return (
    <div id="top">
      <JsonLd data={pageGraph({ title: TITLE, description: DESCRIPTION, path: "/", extra: [faqPage(FAQS)] })} />
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Injectable inventory for iPhone</p>
            <h1 className={styles.title}>Botox and filler inventory. Every vial accounted for.</h1>
            <p className={styles.lede}>
              Rastro is an iPhone app for injectors and small practices. Scan toxins and fillers
              when they arrive, record what you use in seconds, and always know what&apos;s open,
              where it is, and how long it will last.
            </p>
            <div className={styles.actions}>
              <TrackedLink
                href={EARLY_ACCESS_HREF}
                className={styles.btnPrimary}
                event="request_access"
                eventParams={{ location: "hero" }}
              >
                Get early access
              </TrackedLink>
              <span className={styles.note}>Coming soon to iPhone. Free, with no account required.</span>
            </div>
          </div>
          <figure className={styles.productPreview}>
            <div className={styles.phone}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/images/app-inventory.png")}
                alt="Rastro's Inventory screen: open Botox and RHA 3 at the top, then neurotoxins and fillers with their counts."
                width={552}
                height={1200}
              />
            </div>
            <figcaption>Inside Rastro: open packages and stock on hand. Sample inventory shown.</figcaption>
          </figure>
        </section>

        <section className={styles.section} id="features" aria-labelledby="features-heading">
          <SectionHead
            id="features-heading"
            eyebrow="What it does"
            title="Fast enough to use between patients."
            lede="Common actions take two or three taps once the app is open. Rastro is built to get out of your way."
          />
          <ul className={styles.grid}>
            {FEATURES.map((f) => (
              <li key={f.title} className={styles.card}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
                {f.link ? (
                  <Link href={f.link.href} className={styles.cardLink}>
                    {f.link.label} →
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="how" aria-labelledby="how-heading">
          <SectionHead id="how-heading" eyebrow="How it works" title="Scan it. Use it. Know it." />
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="supply-heading">
          <SectionHead
            id="supply-heading"
            eyebrow="Make the numbers useful"
            title="How far will your stock take you?"
            lede="A box count tells you what is on the shelf. Days of supply puts that count in the context of how much you use."
          />
          <figure className={styles.supplyExample}>
            <div className={styles.equation}>
              <div><strong>300</strong><span>units on hand</span></div>
              <span className={styles.operator} aria-label="divided by">÷</span>
              <div><strong>20</strong><span>units used per day</span></div>
              <span className={styles.operator} aria-label="equals">=</span>
              <div className={styles.result}><strong>15</strong><span>days of supply</span></div>
            </div>
            <figcaption>
              Illustrative inventory example, not customer results or dosing guidance.
              At this pace, 300 units lasts 15 days. Rastro uses your recorded usage
              after at least two weeks of history; future demand can differ.
            </figcaption>
          </figure>
          <p className={styles.sectionLede}>
            Set your reorder lead time to flag low supply. Track expiration dates separately:
            days of supply estimates stock coverage, not how long an opened product can be used.
          </p>
          <Link className={styles.cardLink} href="/botox-inventory-tracking/">Explore toxin inventory tracking →</Link>
        </section>

        <section className={styles.section} id="who" aria-labelledby="who-heading">
          <SectionHead
            id="who-heading"
            eyebrow="Who it's for"
            title="Made for the people holding the syringe."
            lede="Not a practice-management suite, and not an EMR. Just inventory, done well."
          />
          <ul className={styles.grid}>
            {AUDIENCES.map((a) => (
              <li key={a.title} className={styles.card}>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.band} id="privacy-first" aria-labelledby="privacy-heading">
          <div className={styles.bandInner}>
            <div>
              <p className={styles.bandEyebrow}>Private by design</p>
              <h2 className={styles.bandTitle} id="privacy-heading">
                Your inventory stays on your phone.
              </h2>
            </div>
            <ul className={styles.bandList}>
              <li>
                <strong>No account required.</strong> Install it and start scanning.
              </li>
              <li>
                <strong>Works offline.</strong> No signal in the treatment room? It doesn&apos;t
                matter.
              </li>
              <li>
                <strong>No patient data.</strong> Rastro tracks products, never people.
              </li>
              <li>
                <strong>Your data, exportable.</strong> Export everything to CSV whenever you
                want.
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="guides-heading">
          <SectionHead id="guides-heading" eyebrow="Inventory guides" title="Start with the stock you manage."
            lede="Explore the workflow for your products, from receiving a box to reviewing its history." />
          <ul className={styles.grid}>
            {GUIDES.map((guide) => (
              <li className={styles.card} key={guide.slug}>
                <h3><Link className={styles.guideLink} href={guidePath(guide)}>{guide.navLabel} →</Link></h3>
                <p>{guide.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} id="faq" aria-labelledby="faq-heading">
          <SectionHead id="faq-heading" eyebrow="Before you start" title="Injectable inventory questions, answered." />
          <div className={styles.faqs}>
            {FAQS.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
          <Link className={styles.cardLink} href="/support/">More help and support →</Link>
        </section>

        <section className={styles.cta} id="early-access" aria-labelledby="cta-heading">
          <SectionHead
            id="cta-heading"
            eyebrow="Coming soon"
            title="Try Rastro before launch."
            lede="Rastro will be free on the App Store, with no account and no subscription. Email us and we'll add you to the early testers."
          />
          <TrackedLink
            href={EARLY_ACCESS_HREF}
            className={styles.btnPrimary}
            event="request_access"
            eventParams={{ location: "footer_cta" }}
          >
            Get early access
          </TrackedLink>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
