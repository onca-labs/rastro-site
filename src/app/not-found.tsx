import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { GUIDES, guidePath } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

// GitHub Pages serves the exported 404.html for any unknown path. noindex keeps
// it out of search results.
export const metadata: Metadata = pageMetadata({
  title: "Page Not Found | Rastro",
  description:
    "The page you were looking for isn't here. Head back to Rastro, the injectable inventory app for iPhone, or pick one of the pages below.",
  path: "/404/",
  noindex: true,
});

export default function NotFound() {
  return (
    <ContentPage title="Page not found" lede="That page isn't here. It may have moved, or the link may be wrong.">
      <section>
        <p>
          <Link href="/">Go to the Rastro home page</Link>, or try one of these:
        </p>
        <ul>
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link href={guidePath(g)}>{g.navLabel}</Link>
            </li>
          ))}
          <li>
            <Link href="/support/">Support</Link>
          </li>
        </ul>
      </section>
    </ContentPage>
  );
}
