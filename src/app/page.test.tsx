import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { CONTACT_EMAIL } from "@/lib/site";
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
      /fast enough to use between patients/i,
      /scan it\. use it\. know it\./i,
      /made for the people holding the syringe/i,
      /your inventory stays on your phone/i,
      /try rastro before launch/i,
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  // GTM keys triggers off these ids, so a rename silently breaks tracking.
  test("keeps every tracked anchor id on the page", () => {
    const { container } = render(<LandingPage />);

    for (const id of ["top", "features", "how", "who", "privacy-first", "early-access"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });

  test("every early-access CTA emails the contact inbox and fires request_access", () => {
    render(<LandingPage />);
    const ctas = screen.getAllByRole("link", { name: /get early access/i });

    for (const cta of ctas) fireEvent.click(cta);

    // Header, hero, final CTA.
    expect(ctas).toHaveLength(3);
    for (const cta of ctas) {
      expect(cta.getAttribute("href")).toMatch(new RegExp(`^mailto:${CONTACT_EMAIL}\\?`));
    }
    expect((window as DataLayerWindow).dataLayer).toEqual([
      { event: "request_access", location: "header" },
      { event: "request_access", location: "hero" },
      { event: "request_access", location: "footer_cta" },
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
