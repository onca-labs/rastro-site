import { describe, expect, test } from "vitest";
import { SITE_URL } from "@/lib/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  test("lists every page with a trailing slash on the site URL", () => {
    expect(sitemap().map((entry) => entry.url)).toEqual([
      `${SITE_URL}/`,
      `${SITE_URL}/support/`,
      `${SITE_URL}/privacy/`,
    ]);
  });
});
