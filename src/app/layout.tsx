import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTM_ID, SITE_URL, asset } from "@/lib/site";
import "./globals.css";

const TITLE = "Rastro: injectable inventory for iPhone";
const DESCRIPTION =
  "Scan toxins and fillers when they arrive, record usage in seconds, and always know what's open, where it is, and how long it will last. Offline, no account, no patient data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    siteName: "Rastro",
    type: "website",
    images: [{ url: `${SITE_URL}/images/og.png`, width: 515, height: 515 }],
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/images/og.png`],
  },
  icons: { icon: asset("/images/mark-green.png"), apple: asset("/images/og.png") },
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
