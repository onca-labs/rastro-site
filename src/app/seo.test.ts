import type { Metadata } from "next";
import { describe, expect, test } from "vitest";
import { GUIDES, guidePath } from "@/lib/guides";
import { DESCRIPTION_MAX, DESCRIPTION_MIN, TITLE_MAX, absoluteUrl } from "@/lib/seo";
import { generateMetadata as guideMetadata } from "./[slug]/page";
import { metadata as notFound } from "./not-found";
import { metadata as home } from "./page";
import { metadata as privacy } from "./privacy/page";
import { metadata as support } from "./support/page";

// Every indexable route and its metadata. A new page belongs here.
async function routes(): Promise<{ path: string; meta: Metadata }[]> {
  const guides = await Promise.all(
    GUIDES.map(async (g) => ({
      path: guidePath(g),
      meta: await guideMetadata({ params: Promise.resolve({ slug: g.slug }) }),
    })),
  );
  return [
    { path: "/", meta: home },
    ...guides,
    { path: "/support/", meta: support },
    { path: "/privacy/", meta: privacy },
  ];
}

function titleOf(meta: Metadata): string {
  const t = meta.title as { absolute: string };
  return t.absolute;
}

describe("page metadata", () => {
  test("every page has a title, description, canonical, and social cards", async () => {
    for (const { path, meta } of await routes()) {
      const title = titleOf(meta);
      const description = meta.description ?? "";
      const og = meta.openGraph as { url: string; title: string; images: { url: string; width: number; height: number }[] };
      const twitter = meta.twitter as { card: string; title: string };

      expect(title, path).toMatch(/Rastro/);
      expect(title.length, `${path} title: "${title}"`).toBeLessThanOrEqual(TITLE_MAX);
      expect(description.length, `${path} description`).toBeGreaterThanOrEqual(DESCRIPTION_MIN);
      expect(description.length, `${path} description`).toBeLessThanOrEqual(DESCRIPTION_MAX);
      expect(meta.alternates?.canonical, path).toBe(absoluteUrl(path));
      expect(og.url, path).toBe(absoluteUrl(path));
      expect(og.title, path).toBe(title);
      expect(og.images[0]).toMatchObject({ width: 1200, height: 630 });
      expect(twitter).toMatchObject({ card: "summary_large_image", title });
      expect(meta.robots, `${path} should be indexable`).toBeUndefined();
    }
  });

  test("titles and descriptions are unique", async () => {
    const all = await routes();

    expect(new Set(all.map((r) => titleOf(r.meta))).size).toBe(all.length);
    expect(new Set(all.map((r) => r.meta.description)).size).toBe(all.length);
  });

  test("copy avoids em-dashes", async () => {
    for (const { path, meta } of await routes()) {
      expect(`${titleOf(meta)} ${meta.description}`, path).not.toContain("—");
    }
  });

  test("the 404 page is noindex", () => {
    expect(notFound.robots).toMatchObject({ index: false });
  });
});
