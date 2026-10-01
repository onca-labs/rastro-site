import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import GuidePage from "@/components/GuidePage";
import { COMPARISON_GUIDES, GUIDES } from "@/lib/guides";

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

  // Pages that name another company's product must show where each claim
  // came from and when it was checked.
  test.each(COMPARISON_GUIDES.map((g) => [g.slug, g] as const))("%s cites its sources", (_, guide) => {
    const sources = guide.comparison?.sources;

    expect(sources?.asOf).toMatch(/\d{4}$/);
    expect(sources?.note).toMatch(/isn't affiliated/);
    expect(sources?.links.length).toBeGreaterThan(0);
    for (const l of sources?.links ?? []) expect(l.href).toMatch(/^https:\/\//);

    render(<GuidePage guide={guide} />);
    expect(screen.getByText(new RegExp(`Checked ${sources?.asOf}`))).toBeInTheDocument();
  });
});
