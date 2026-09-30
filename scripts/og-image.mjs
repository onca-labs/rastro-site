#!/usr/bin/env node
// Renders public/images/og-card.png, the 1200x630 social preview used by every
// page (Open Graph + Twitter summary_large_image). Re-run after changing the
// logo, the screenshot, or the copy below:  node scripts/og-image.mjs
//
// Uses next/og (bundled with Next), so there's no extra dependency.

import { readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";

const GREEN = "#0d3f3b";
const IVORY = "#f4f1e9";

const dataUri = async (path) =>
  `data:image/png;base64,${(await readFile(path)).toString("base64")}`;

const mark = await dataUri("public/images/og.png");
const shot = await dataUri("public/images/app-inventory.png");

const h = (type, style, ...children) =>
  ({ type, props: { style: { display: "flex", ...style }, children: children.length === 1 ? children[0] : children } });
const img = (src, style) => ({ type: "img", props: { src, style } });

const card = h(
  "div",
  { width: 1200, height: 630, display: "flex", background: GREEN, color: IVORY, fontFamily: "sans-serif" },
  h(
    "div",
    { display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 700 },
    img(mark, { width: 112, height: 112, borderRadius: 24, marginBottom: 40 }),
    h("div", { fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }, "Injectable inventory, tracked in seconds."),
    h("div", { fontSize: 30, marginTop: 28, opacity: 0.8 }, "Toxins and fillers for iPhone. Works offline, no account required."),
  ),
  h(
    "div",
    { display: "flex", alignItems: "flex-start", justifyContent: "center", width: 500, paddingTop: 70 },
    h(
      "div",
      { display: "flex", padding: 10, background: "#0b0f0e", borderRadius: 48 },
      img(shot, { width: 300, height: 652, borderRadius: 38 }),
    ),
  ),
);

const res = new ImageResponse(card, { width: 1200, height: 630 });
await writeFile("public/images/og-card.png", Buffer.from(await res.arrayBuffer()));
console.log("wrote public/images/og-card.png");
