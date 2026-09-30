import type { ReactNode } from "react";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import styles from "./Site.module.css";

/** Shell for every page other than the landing page: header, one prose column,
 *  footer. Pages supply their own <section>s. */
export default function ContentPage({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className={styles.prose}>
        <h1>{title}</h1>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
