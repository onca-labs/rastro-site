import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID, asset } from "@/lib/site";
import "./globals.css";

// Page metadata (title, description, canonical, social cards) comes from each
// page via pageMetadata() in src/lib/seo.ts. Only site-wide values live here.
export const metadata: Metadata = {
  applicationName: "Rastro",
  icons: { icon: asset("/images/mark-green.png"), apple: asset("/images/og.png") },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body>
        {/* Fonts via <link>; Next hoists these to <head>. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        {children}
      </body>
    </html>
  );
}
