import type { Metadata } from "next";
import { COMPANY_URL, LEGAL_ENTITY, SITE_URL } from "./site";

/**
 * Page metadata and structured data. Every page builds its `metadata` with
 * `pageMetadata`, so none can ship without a title, description, canonical,
 * Open Graph, and Twitter card. `seo.test.ts` checks each route against the
 * limits below.
 */

export const SITE_NAME = "Rastro";

/** Search engines truncate past these; the tests enforce them. */
export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 110;
export const DESCRIPTION_MAX = 160;

/** 1200x630 social preview, rendered by scripts/og-image.mjs. */
const OG_IMAGE = {
  url: `${SITE_URL}/images/og-card.png`,
  width: 1200,
  height: 630,
  alt: "Rastro: injectable inventory for iPhone, shown on the Inventory screen.",
};

/** Absolute URL for a site path. Paths start and end with "/" (trailingSlash). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  /** The full <title>, brand included (e.g. "Support | Rastro"). */
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const WEBSITE_ID = `${SITE_URL}/#website`;
const ORG_ID = `${SITE_URL}/#organization`;
const APP_ID = `${SITE_URL}/#app`;

/** schema.org nodes shared by every page's graph. */
function siteNodes() {
  return [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: LEGAL_ENTITY,
      url: COMPANY_URL,
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "MobileApplication",
      "@id": APP_ID,
      name: SITE_NAME,
      operatingSystem: "iOS 26 or later",
      applicationCategory: "BusinessApplication",
      description:
        "Local-first inventory for injectables: scan toxins and fillers in, record usage in seconds, and track lots, expiration, and days of supply.",
      publisher: { "@id": ORG_ID },
    },
  ];
}

/** The JSON-LD graph for a page: site nodes, the WebPage, and any extras
 *  (breadcrumbs, FAQ). */
export function pageGraph({
  title,
  description,
  path,
  extra = [],
}: {
  title: string;
  description: string;
  path: string;
  extra?: Record<string, unknown>[];
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...siteNodes(),
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: title,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": APP_ID },
      },
      ...extra,
    ],
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPage(faqs: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
