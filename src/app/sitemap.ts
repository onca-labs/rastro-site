import type { MetadataRoute } from "next";
import { GUIDES, guidePath } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";

// Required for a route handler under `output: "export"`.
export const dynamic = "force-static";

/**
 * Every indexable route. Guides come from their registry, so a new guide can't
 * be left out. Trailing slashes match `trailingSlash: true` in next.config.ts.
 * Keep it consistent with robots.ts and each page's canonical URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...GUIDES.map((g) => ({
      url: absoluteUrl(guidePath(g)),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/support/"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/privacy/"), changeFrequency: "yearly", priority: 0.3 },
  ];
}
