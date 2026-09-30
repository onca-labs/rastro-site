import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import GuidePage from "@/components/GuidePage";
import { GUIDES } from "@/lib/guides";

describe("GuidePage", () => {
  test.each(GUIDES.map((g) => [g.slug, g] as const))("%s renders its content and links", (_, guide) => {
    const { container } = render(<GuidePage guide={guide} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(guide.h1);
    for (const f of guide.faqs) {
      expect(screen.getByRole("heading", { name: f.q })).toBeInTheDocument();
    }
    // Links to every other guide, for internal linking.
    const related = within(screen.getByRole("heading", { name: "More about Rastro" }).parentElement!);
    expect(related.getAllByRole("link")).toHaveLength(GUIDES.length - 1);
    // Structured data with the FAQ.
    const ld = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    expect(ld["@graph"].map((n: { "@type": string }) => n["@type"])).toEqual(
      expect.arrayContaining(["WebPage", "BreadcrumbList", "FAQPage", "MobileApplication"]),
    );
  });

  test("guide copy avoids em-dashes", () => {
    expect(JSON.stringify(GUIDES)).not.toContain("—");
  });
});
