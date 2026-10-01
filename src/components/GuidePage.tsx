import Link from "next/link";
import { GUIDES, guidePath, type Guide } from "@/lib/guides";
import { EARLY_ACCESS_HREF, asset } from "@/lib/site";
import { breadcrumbs, faqPage, pageGraph } from "@/lib/seo";
import JsonLd from "./JsonLd";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import TrackedLink from "./TrackedLink";
import styles from "./Guide.module.css";

/** Template for every SEO landing page in `src/lib/guides.ts`. */
export default function GuidePage({ guide }: { guide: Guide }) {
  const related = GUIDES.filter((g) => g.slug !== guide.slug);
  const comparison = guide.comparison;
  const path = guidePath(guide);

  return (
    <>
      <JsonLd
        data={pageGraph({
          title: guide.title,
          description: guide.description,
          path,
          extra: [
            breadcrumbs([
              { name: "Rastro", path: "/" },
              { name: guide.navLabel, path },
            ]),
            faqPage(guide.faqs),
          ],
        })}
      />
      <SiteHeader />

      <main>
        <section className={styles.hero}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Rastro</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{guide.navLabel}</span>
          </nav>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.eyebrow}>{guide.eyebrow}</p>
              <h1 className={styles.title}>{guide.h1}</h1>
              <p className={styles.lede}>{guide.lede}</p>
              <TrackedLink
                href={EARLY_ACCESS_HREF}
                className={styles.btn}
                event="request_access"
                eventParams={{ location: `guide_${guide.slug}` }}
              >
                Get early access
              </TrackedLink>
              <p className={styles.availability}>Coming soon to iPhone. Explore a preview below.</p>
            </div>
            <figure className={styles.preview}>
              <div className={styles.previewStage}>
                <span className={styles.previewLabel}>Inside Rastro</span>
                <a className={styles.phone} href={asset(guide.screenshot.src)} aria-label={`View full-size screenshot: ${guide.navLabel}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(guide.screenshot.src)}
                    alt={guide.screenshot.alt}
                    width={804}
                    height={1748}
                  />
                </a>
              </div>
              <figcaption>
                {guide.screenshot.caption}
                <span>Actual app screen. Demo inventory. Tap to enlarge.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="steps-heading">
          <h2 className={styles.h2} id="steps-heading">
            {guide.stepsTitle}
          </h2>
          <ol className={styles.steps}>
            {guide.steps.map((s, i) => (
              <li key={s.title}>
                <span className={styles.stepNum} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {comparison ? (
          <section className={styles.section} aria-labelledby="compare-heading">
            <h2 className={styles.h2} id="compare-heading">
              {comparison.title}
            </h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    {comparison.columns.map((c, i) => (
                      <th key={i} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map(([label, a, b]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td data-label={comparison.columns[1]}>{a}</td>
                      <td data-label={comparison.columns[2]}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {comparison.sources ? (
              <div className={styles.sources}>
                <p>
                  Checked {comparison.sources.asOf}. {comparison.sources.note}
                </p>
                <ul>
                  {comparison.sources.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} rel="nofollow noopener" target="_blank">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className={styles.section} aria-labelledby="points-heading">
          <h2 className={styles.h2} id="points-heading">
            {guide.pointsTitle}
          </h2>
          <ul className={styles.grid}>
            {guide.points.map((p) => (
              <li key={p.title} className={styles.card}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading">
          <h2 className={styles.h2} id="faq-heading">
            Questions
          </h2>
          <div className={styles.faqs}>
            {guide.faqs.map((f) => (
              <div key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="related-heading">
          <h2 className={styles.h2} id="related-heading">
            More about Rastro
          </h2>
          <ul className={styles.related}>
            {related.map((g) => (
              <li key={g.slug}>
                <Link href={guidePath(g)}>{g.navLabel}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
