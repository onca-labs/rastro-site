import Link from "next/link";
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
        <nav className={styles.footerNav} aria-label="Footer">
          <Link href="/support/">Support</Link>
          <Link href="/privacy/">Privacy</Link>
        </nav>
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} <a href={COMPANY_URL}>{LEGAL_ENTITY}</a>
      </p>
    </footer>
  );
}
