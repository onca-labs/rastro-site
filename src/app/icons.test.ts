import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { metadata } from "./layout";

// Google Search only shows a favicon that is square and a multiple of 48 px,
// so the icons layout.tsx links to must stay that way.

function pngSize(png: Buffer): [number, number] {
  return [png.readUInt32BE(16), png.readUInt32BE(20)];
}

/** Sizes of the images inside an .ico (width/height bytes; 0 means 256). */
function icoSizes(ico: Buffer): number[] {
  const count = ico.readUInt16LE(4);
  return Array.from({ length: count }, (_, i) => ico.readUInt8(6 + i * 16) || 256);
}

describe("favicons", () => {
  test("layout links the favicon, a 192 px icon, and an Apple touch icon", () => {
    expect(JSON.stringify(metadata.icons)).toContain("/favicon.ico");
    expect(JSON.stringify(metadata.icons)).toContain("/icon-192.png");
    expect(JSON.stringify(metadata.icons)).toContain("/apple-touch-icon.png");
  });

  test("favicon.ico holds 16, 32, and 48 px images", () => {
    expect(icoSizes(readFileSync("public/favicon.ico"))).toEqual([16, 32, 48]);
  });

  test("PNG icons are square at the linked sizes", () => {
    expect(pngSize(readFileSync("public/icon-192.png"))).toEqual([192, 192]);
    expect(pngSize(readFileSync("public/apple-touch-icon.png"))).toEqual([180, 180]);
  });
});
