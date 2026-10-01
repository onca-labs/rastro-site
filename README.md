# rastro-site

The **marketing site for Rastro**, the injectable inventory app for iPhone
(app repo: `onca-labs/rastro`, private). Built with Next.js as a static export
and deployed free on **GitHub Pages**:

https://onca-labs.github.io/rastro-site/

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
the base path (`/rastro-site`) and site URL, so nothing is hardcoded to the
github.io address.

### Configuration

- **`GTM_ID`** repository variable: GTM container id. Unset means no GTM, and
  `/privacy` then leaves out the analytics paragraph.
  `gh variable set GTM_ID --body GTM-XXXXXXX`, then re-run the deploy.

### Custom domain (later)

Add it under Settings → Pages and point a `CNAME` record at
`onca-labs.github.io`. The next deploy picks up the empty base path and new URL
automatically. With a custom domain, also add `robots.ts` (crawlers only read
`robots.txt` at the host root).

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

Anchor ids `top`, `features`, `how`, `who`, `privacy-first`, `early-access` are asserted by
`page.test.tsx`. Each event needs a GTM trigger to reach GA4.
