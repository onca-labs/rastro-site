import { afterEach, describe, expect, test, vi } from "vitest";

// SITE_URL is read at module-eval time, so each case stubs the env and
// re-imports.
async function siteUrl(): Promise<string> {
  vi.resetModules();
  return (await import("./site")).SITE_URL;
}

describe("SITE_URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test("defaults to the custom domain", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", undefined);

    expect(await siteUrl()).toBe("https://tryrastro.com");
  });

  // configure-pages reports http:// until HTTPS is enforced on the domain.
  test("upgrades http to https and drops a trailing slash", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://tryrastro.com/");

    expect(await siteUrl()).toBe("https://tryrastro.com");
  });
});
