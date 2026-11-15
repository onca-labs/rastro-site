import Link from "next/link";
import { APP_STORE_URL } from "@/lib/site";
import Brand from "./Brand";
import TrackedLink from "./TrackedLink";
import styles from "./Site.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand}>
          <Brand size={30} />
          <span>Rastro</span>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <Link href="/#features">Features</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#who">Who it&apos;s for</Link>
          <Link href="/support/">Support</Link>
        </nav>
        <TrackedLink
          href={APP_STORE_URL}
          className={styles.headerCta}
          event="download_click"
          eventParams={{ location: "header" }}
        >
          Download
        </TrackedLink>
      </div>
    </header>
  );
}
