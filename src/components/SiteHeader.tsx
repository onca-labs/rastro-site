import Link from "next/link";
import { EARLY_ACCESS_HREF } from "@/lib/site";
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
          href={EARLY_ACCESS_HREF}
          className={styles.headerCta}
          event="request_access"
          eventParams={{ location: "header" }}
        >
          Get early access
        </TrackedLink>
      </div>
    </header>
  );
}
