import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

// GTM_ID is read at module-eval time, so each case stubs the env and
// re-imports the page.
async function renderPrivacy() {
  vi.resetModules();
  const { default: PrivacyPage } = await import("./page");
  render(<PrivacyPage />);
}

describe("PrivacyPage", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("states the app collects no data", async () => {
    await renderPrivacy();

    expect(screen.getByText(/rastro doesn't collect any data/i)).toBeInTheDocument();
  });

  // The policy must describe what the site actually loads.
  test("mentions Google Analytics only when GTM is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "");
    await renderPrivacy();
    expect(screen.queryByText(/google analytics/i)).toBeNull();

    vi.stubEnv("NEXT_PUBLIC_GTM_ID", "GTM-TEST123");
    await renderPrivacy();
    expect(screen.getByText(/google analytics/i)).toBeInTheDocument();
  });
});
