# rastro-site

The **marketing site for Rastro**, the injectable inventory app for iPhone
(app repo: `onca-labs/rastro`, private). Built with Next.js as a static export
and deployed free on **GitHub Pages**:

https://onca-labs.github.io/rastro-site/

## Pages

| Route | What it is |
| --- | --- |
| `/` | landing page |
| `/support/` | the App Store **Support URL** |
| `/privacy/` | the App Store **Privacy Policy URL**, covering the app and this site |

## Stack

The same setup as `onca-labs` (oncalabs.io), adapted to Pages:

- Next.js 15 App Router with `output: "export"`, React 19, TypeScript, Yarn 4.
- Rastro brand tokens in `src/app/globals.css` (colors from the app's asset
  catalog, light and dark) + CSS Modules. No Tailwind.
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
| `request_access` | an early-access CTA is clicked | `location` (`header`, `hero`, `footer_cta`) |
| `contact_click` | the support email is clicked | `location` |

Anchor ids `top`, `features`, `how`, `who`, `privacy-first`, `early-access` are asserted by
`page.test.tsx`. Each event needs a GTM trigger to reach GA4.
