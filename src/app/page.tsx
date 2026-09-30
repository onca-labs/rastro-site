import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TrackedLink from "@/components/TrackedLink";
import { EARLY_ACCESS_HREF, asset } from "@/lib/site";
import { pageGraph, pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

/**
 * Tracking contract (GTM): `request_access` (with `location`) on every
 * early-access CTA, and the anchor ids `top`, `features`, `how`, `who`,
 * `privacy-first`, `early-access`. `page.test.tsx` asserts both.
 *
 * Every claim here must match the app (rastro repo, docs/prd.md).
 */

const TITLE = "Rastro: Injectable Inventory App for iPhone";
const DESCRIPTION =
  "Scan toxins and fillers when they arrive, record usage in seconds, and know what's open and how long it will last. Works offline, no account required.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/" });

type Feature = { title: string; body: string; link?: { href: string; label: string } };

const FEATURES: readonly Feature[] = [
  {
    title: "Scan to receive",
    body: "Rastro reads the GS1 and HIBCC barcodes on the box: product, lot, expiration, and serial. If it's printed on the label, you don't type it.",
    link: { href: "/injectable-barcode-scanner/", label: "How scanning works" },
  },
  {
    title: "Record usage in seconds",
    body: "One tap for a filler syringe. A number for toxin units. Then you're back with your patient.",
    link: { href: "/botox-inventory-tracking/", label: "Tracking toxin by the unit" },
  },
  {
    title: "Undo instead of “are you sure?”",
    body: "Routine actions never ask for confirmation. Anything can be undone, and nothing is ever erased from the history.",
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

const STEPS = [
  {
    title: "Scan it in",
    body: "When a shipment arrives, scan each box. Product, lot, expiration, and serial fill in from the barcode.",
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
      <JsonLd data={pageGraph({ title: TITLE, description: DESCRIPTION, path: "/" })} />
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Inventory for aesthetic injectors</p>
            <h1 className={styles.title}>Know every vial. Track every syringe.</h1>
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
          <div className={styles.phone}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/images/app-inventory.png")}
              alt="Rastro's Inventory screen: open Botox and RHA 3 at the top, then neurotoxins and fillers with their counts."
              width={552}
              height={1200}
            />
          </div>
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
