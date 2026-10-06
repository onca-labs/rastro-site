/**
 * Shared site constants and the only `process.env` reads. Import these; don't
 * re-read the env or retype URLs and addresses.
 */

/** Path prefix the site is served under. Set by the deploy workflow from
 *  actions/configure-pages ("/rastro-site" on github.io, "" on a custom domain). */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute URL of the site root, without a trailing slash. Also set by the
 *  deploy workflow from the Pages config; the default is the custom domain. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tryrastro.com").replace(/\/$/, "");

/** GTM container id (GA4 lives inside it). Empty disables GTM, and /privacy
 *  only describes website analytics when this is set. The deploy workflow reads
 *  it from the `GTM_ID` repository variable. */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

/** next/link and next/image add BASE_PATH themselves; plain <img>, <source>,
 *  and metadata icon paths don't, so route public/ files through this. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** Public contact and support inbox. A monitored Onca Labs address; Rastro has
 *  no mail domain of its own yet. */
export const CONTACT_EMAIL = "hello@oncahq.com";

/** mailto behind every early-access CTA (header, hero, final CTA). */
export const EARLY_ACCESS_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Rastro early access")}`;

/** The company behind Rastro, named in the footer and on /privacy. */
export const LEGAL_ENTITY = "Onca Labs LLC";
export const COMPANY_URL = "https://oncalabs.io";

/** Effective date on /privacy. Bump it whenever the policy's substance changes. */
export const PRIVACY_EFFECTIVE = "September 30, 2026";
