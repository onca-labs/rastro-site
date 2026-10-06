import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Required for a route handler under `output: "export"`.
export const dynamic = "force-static";

/** Served at the root of tryrastro.com. Crawlers only read robots.txt at a
 *  host's root, so this only takes effect on the custom domain. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
