import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required for a route handler under `output: "export"`.
export const dynamic = "force-static";

/**
 * Every indexable route. Trailing slashes match `trailingSlash: true` in
 * next.config.ts, which is how GitHub Pages serves the exported directories.
 * There's no robots.ts: crawlers only read robots.txt at the host root, which a
 * github.io project site doesn't own. Add one with a custom domain.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/support/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy/`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
