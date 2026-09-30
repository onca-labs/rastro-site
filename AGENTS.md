# AGENTS.md

**rastro-site is the public marketing site for Rastro** (the iPhone app in the
private `onca-labs/rastro` repo, made by Onca Labs LLC). Next.js 15 App Router,
**statically exported** and deployed on **GitHub Pages**. The repo is public.

For working style, see `.ai/rules/doctrine.md`. See README.md for pages,
deploy, and the analytics contract.

## Environment

- Node LTS, **Yarn 4** (`corepack enable`). Do not use npm or pnpm.
- Verify with `yarn lint`, `yarn typecheck`, `yarn test`, `yarn build`.

## Constraints from GitHub Pages

- **Static only.** No route handlers, server actions, middleware, ISR, or
  `next.config` redirects/headers; `output: "export"` fails or ignores them.
- **Base path.** The site is served under `/rastro-site` on github.io.
  `next/link` adds it; plain `<img>`/`<source>` and metadata icons must go
  through `asset()` from `src/lib/site.ts`. Absolute URLs use `SITE_URL`.
- Route handlers (e.g. `sitemap.ts`) need `export const dynamic = "force-static"`.

## Conventions

- **SEO is a contract**: every page's `metadata` comes from `pageMetadata()` in
  `src/lib/seo.ts` and renders `pageGraph()` JSON-LD. Add each new route to
  `src/app/seo.test.ts`. SEO landing pages are data in `src/lib/guides.ts`.
- `src/lib/site.ts` holds every env read and shared constant. Import from it.
- **Claims must match the app.** The landing, support, and privacy copy make
  promises (no accounts, offline, no patient data, no data collection, camera
  used only for barcodes). Check them against the rastro repo and its PRD
  before changing, and update `/privacy` + `PRIVACY_EFFECTIVE` in the same
  commit as any change to what the app or site collects.
- **Analytics is a contract**: event names and anchor ids in README.md;
  `page.test.tsx` guards them.
- Tokens + CSS Modules only; no Tailwind, no hardcoded colors outside
  `globals.css`. Light only: white background, no dark mode.
- Copy voice: plain and specific. Avoid em-dashes in user-facing copy.
- Never commit secrets: this repo is public.
