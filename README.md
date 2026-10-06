# rastro-site

The **marketing site for Rastro**, the injectable inventory app for iPhone
(app repo: `onca-labs/rastro`, private). Built with Next.js as a static export
and deployed free on **GitHub Pages**:

https://tryrastro.com (also reachable at https://onca-labs.github.io/rastro-site/,
which redirects there once the custom domain is set)

## Pages

| Route | What it is |
| --- | --- |
| `/` | landing page |
| `/<slug>/` | SEO landing pages ("guides"), one per search intent, from `src/lib/guides.ts` |
| `/support/` | the App Store **Support URL** |
| `/privacy/` | the App Store **Privacy Policy URL**, covering the app and this site |
| `404.html` | not-found page (`noindex`), served by Pages for unknown paths |

## SEO

- **Every page builds its metadata with `pageMetadata()`** (`src/lib/seo.ts`):
  title, description, canonical, Open Graph, and Twitter card with the
  1200x630 preview. `src/app/seo.test.ts` fails if a page is missing any of
  them, if a title is over 60 characters or a description outside 110 to 160,
  or if two pages share a title or description. Add new routes to that test.
- **Structured data**: every page renders a JSON-LD graph (`pageGraph()`):
  Organization, WebSite, MobileApplication, and the WebPage; guides add
  BreadcrumbList and FAQPage. The homepage also includes FAQPage markup, generated
  from the same questions and answers as its visible FAQ section.
- **Homepage content**: the supply graphic is an illustrative calculation, not a
  customer outcome. Keep numerical examples labeled and grounded in the app's
  supply logic; do not imply measured savings without evidence.
- **Guides**: add one by adding an entry to `GUIDES` in `src/lib/guides.ts`.
  The route, metadata, sitemap entry, footer link, and related links all
  follow. Check every claim against the app's PRD first.
- **Guide screenshots**: each guide declares its own image, alt text, and caption
  in `src/lib/guides.ts`. `public/images/guide-*.webp` are actual iPhone 17
  simulator captures from Rastro using in-memory demo data (September 30, 2026),
  compressed to 804 × 1748. The barcode screen uses a manually entered sample
  GS1 barcode; it does not show a live camera scan. Tap an image to enlarge it.
- **Social preview**: `public/images/og-card.png`, rendered by
  `node scripts/og-image.mjs`. Re-run it after changing the logo, screenshot,
  or its copy.

## Stack

The same setup as `onca-labs` (oncalabs.io), adapted to Pages:

- Next.js 15 App Router with `output: "export"`, React 19, TypeScript, Yarn 4.
- Rastro brand tokens in `src/app/globals.css` (colors from the app's asset
  catalog, light only) + CSS Modules. No Tailwind.
- GTM/GA4 via `@next/third-parties`, `TrackedLink` / `pushEvent` for events.
- Metadata, Open Graph, and `sitemap.xml`.

## Develop

```bash
corepack enable
yarn install
yarn dev          # http://localhost:3000
yarn lint && yarn typecheck && yarn test && yarn build   # build writes out/
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`: lint, typecheck,
test, build, then publish `out/` to Pages. `actions/configure-pages` supplies
the base path and site URL from the repo's Pages settings: `""` and
`https://tryrastro.com` with the custom domain, `/rastro-site` and the github.io
URL without it. Nothing in the code is hardcoded to either.

### Configuration

- **`GTM_ID`** repository variable: GTM container id. Unset means no GTM, and
  `/privacy` then leaves out the analytics paragraph.
  `gh variable set GTM_ID --body GTM-XXXXXXX`, then re-run the deploy.

### Custom domain: tryrastro.com

DNS is at IONOS (the registrar). The records GitHub Pages needs:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `onca-labs.github.io` |
| TXT | `_github-pages-challenge-onca-labs` | the value from the org's Pages settings (domain verification) |

The domain is set in the repo's Settings → Pages (the API's `cname`), not in a
`CNAME` file: with Actions deploys, Pages ignores that file. After changing
it, re-run the deploy so the base path and URLs follow.

## What GitHub Pages can't do

Pages serves static files only. No API routes (so no server-side forms like
onca-hq's waitlist), no redirects from `next.config`, no custom headers (the
`vercel.json` security headers the other sites use), and no image
optimization. The early-access CTA is a `mailto:` link for that reason.

## Analytics contract

| Event | Fired when | Params |
| --- | --- | --- |
| `request_access` | an early-access CTA is clicked | `location` (`header`, `hero`, `footer_cta`, `guide_<slug>`) |
| `contact_click` | the support email is clicked | `location` |

Anchor ids `top`, `features`, `how`, `who`, `compare`, `privacy-first`, `early-access` are asserted by
`page.test.tsx`. Each event needs a GTM trigger to reach GA4.
