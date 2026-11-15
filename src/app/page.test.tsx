import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import LandingPage from "./page";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

describe("LandingPage", () => {
  afterEach(() => {
    delete (window as DataLayerWindow).dataLayer;
  });

  test("renders one h1 and each section heading", () => {
    render(<LandingPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    for (const name of [
      /track injectable stock, usage, and expiration/i,
      /how to track injectables with rastro/i,
      /inventory for solo injectors and small practices/i,
      /your inventory stays on your phone/i,
      /start tracking your inventory today/i,
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  test("FAQ structured data matches the answers available on the page", () => {
    const { container } = render(<LandingPage />);
    const graph = JSON.parse(container.querySelector('script[type="application/ld+json"]')!.textContent!);
    const faq = graph["@graph"].find((node: { "@type": string }) => node["@type"] === "FAQPage");
    const answers = container.querySelectorAll("#faq details");
    expect(faq.mainEntity).toHaveLength(answers.length);
    expect(answers.length).toBeGreaterThan(0);
    faq.mainEntity.forEach((item: { name: string; acceptedAnswer: { text: string } }, index: number) => {
      expect(answers[index].querySelector("summary")?.textContent).toBe(item.name);
      expect(answers[index].querySelector("p")?.textContent).toBe(item.acceptedAnswer.text);
    });
  });

  // GTM keys triggers off these ids, so a rename silently breaks tracking.
  test("keeps every tracked anchor id on the page", () => {
    const { container } = render(<LandingPage />);

    for (const id of ["top", "features", "how", "who", "compare", "privacy-first", "early-access"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  test("every download CTA opens the App Store listing and fires download_click", () => {
    render(<LandingPage />);
    const ctas = screen.getAllByRole("link", { name: /^download/i });

    for (const cta of ctas) fireEvent.click(cta);

    // Header, hero, final CTA.
    expect(ctas).toHaveLength(3);
    for (const cta of ctas) {
      expect(cta.getAttribute("href")).toMatch(/^https:\/\/apps\.apple\.com\/app\/id\d+$/);
    }
    expect((window as DataLayerWindow).dataLayer).toEqual([
      { event: "download_click", location: "header" },
      { event: "download_click", location: "hero" },
      { event: "download_click", location: "footer_cta" },
    ]);
  });

  test("links to support and privacy from the footer", () => {
    render(<LandingPage />);
    const footer = within(screen.getByRole("contentinfo"));

    // The trailing slash comes from next.config at build time, not under jsdom.
    expect(footer.getByRole("link", { name: "Support" })).toHaveAttribute("href", expect.stringMatching(/^\/support\/?$/));
    expect(footer.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", expect.stringMatching(/^\/privacy\/?$/));
  });
});
