import Link from "next/link";
import { COMPARISON_GUIDES, FEATURE_GUIDES, guidePath } from "@/lib/guides";
import { COMPANY_URL, LEGAL_ENTITY } from "@/lib/site";
import Brand from "./Brand";
import styles from "./Site.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.brand}>
            <Brand size={26} />
            <span>Rastro</span>
          </Link>
          <p className={styles.tagline}>
            <em>Rastro</em> is Portuguese for a trace or a trail. Every vial and box leaves one.
          </p>
        </div>
        <div className={styles.footerCols}>
          <nav className={styles.footerCol} aria-label="Features">
            <p className={styles.footerHead}>Features</p>
            {FEATURE_GUIDES.map((g) => (
              <Link key={g.slug} href={guidePath(g)}>
                {g.navLabel}
              </Link>
            ))}
          </nav>
          <nav className={styles.footerCol} aria-label="Compare">
            <p className={styles.footerHead}>Compare</p>
            {COMPARISON_GUIDES.map((g) => (
              <Link key={g.slug} href={guidePath(g)}>
                {g.navLabel}
              </Link>
            ))}
          </nav>
          <nav className={styles.footerCol} aria-label="Help">
            <p className={styles.footerHead}>Help</p>
            <Link href="/support/">Support</Link>
            <Link href="/privacy/">Privacy</Link>
          </nav>
        </div>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} <a href={COMPANY_URL}>{LEGAL_ENTITY}</a>
      </p>
    </footer>
  );
}
