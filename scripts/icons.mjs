#!/usr/bin/env node
// Renders the site's favicons from the app icon's R artwork (copied from the
// rastro repo, App/Rastro/AppIcon.icon/Assets/R.png): an ivory R on the brand
// green, like the app icon. Re-run after changing the artwork:
//   node scripts/icons.mjs
//
// Writes, into public/:
//   favicon.ico           16, 32, 48 px  (browsers, and /favicon.ico requests)
//   icon-192.png          192 px         (Google Search and Android; Google
//                                          wants square, a multiple of 48 px)
//   apple-touch-icon.png  180 px         (iOS home screen; full bleed, iOS
//                                          rounds the corners itself)
//
// Uses next/og (bundled with Next), so there's no extra dependency.

import { readFile, writeFile } from "node:fs/promises";
import { ImageResponse } from "next/og.js";

const GREEN = "#0d3f3b";
const R_WIDTH = 417;
const R_HEIGHT = 395;

const r = `data:image/png;base64,${(await readFile("scripts/assets/r-ivory.png")).toString("base64")}`;

/** The R fills `scale` of the tile's width; small sizes get a larger R so it
 *  stays legible in a browser tab. */
async function render(size, { scale, radius }) {
  const w = Math.round(size * scale);
  const h = Math.round((w * R_HEIGHT) / R_WIDTH);
  const tile = {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        background: GREEN,
        borderRadius: Math.round(size * radius),
      },
      children: { type: "img", props: { src: r, width: w, height: h, style: { width: w, height: h } } },
    },
  };
  const res = new ImageResponse(tile, { width: size, height: size });
  return Buffer.from(await res.arrayBuffer());
}

/** Packs PNGs into an .ico (PNG-compressed entries, supported by every
 *  current browser). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, png } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

const tab = { scale: 0.7, radius: 0.18 };
const favicon = await Promise.all([16, 32, 48].map(async (size) => ({ size, png: await render(size, tab) })));
await writeFile("public/favicon.ico", ico(favicon));
await writeFile("public/icon-192.png", await render(192, { scale: 0.62, radius: 0.18 }));
await writeFile("public/apple-touch-icon.png", await render(180, { scale: 0.6, radius: 0 }));
console.log("wrote public/favicon.ico, public/icon-192.png, public/apple-touch-icon.png");
