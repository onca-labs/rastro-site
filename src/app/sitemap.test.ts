import { describe, expect, test } from "vitest";
import { GUIDES, guidePath } from "@/lib/guides";
import { absoluteUrl } from "@/lib/seo";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  test("lists home, every guide, support, and privacy with trailing slashes", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      absoluteUrl("/"),
      ...GUIDES.map((g) => absoluteUrl(guidePath(g))),
      absoluteUrl("/support/"),
      absoluteUrl("/privacy/"),
    ]);
  });

  test("robots allows everything and points at the sitemap", () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: absoluteUrl("/sitemap.xml"),
    });
  });
});
