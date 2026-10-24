import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import JsonLd from "@/components/JsonLd";
import TrackedLink from "@/components/TrackedLink";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageGraph, pageMetadata } from "@/lib/seo";

const TITLE = "Support and FAQ | Rastro";
const DESCRIPTION =
  "Get help with Rastro, the injectable inventory app for iPhone: reporting barcodes, working offline, where your data is stored, what it costs, and teams.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/support/" });

/** The App Store "Support URL". Answers here must match the app's behavior. */
export default function SupportPage() {
  return (
    <>
    <JsonLd data={pageGraph({ title: TITLE, description: DESCRIPTION, path: "/support/" })} />
    <ContentPage
      title="Support"
      lede={
        <>
          Questions, bug reports, or a barcode Rastro didn&apos;t recognize? Email{" "}
          <TrackedLink
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Rastro support")}`}
            event="contact_click"
            eventParams={{ location: "support" }}
          >
            {CONTACT_EMAIL}
          </TrackedLink>{" "}
          and a person will get back to you.
        </>
      }
    >
      <section>
        <h2>Reporting a barcode</h2>
        <p>
          If a box doesn&apos;t scan, or scans as the wrong product, send us the product name and
          a photo of the barcode on the label. Please make sure nothing else in the photo
          identifies a patient.
        </p>
      </section>

      <section>
        <h2>Do I need an account?</h2>
        <p>No. Rastro has no accounts. Install it and start scanning.</p>
      </section>

      <section>
        <h2>Does it work offline?</h2>
        <p>
          Yes. Every feature works without an internet connection.
        </p>
      </section>

      <section>
        <h2>Where is my data stored?</h2>
        <p>
          On your iPhone. Rastro has no server, so we never have a copy. Your iPhone&apos;s own
          backups, to iCloud or to a computer, include Rastro&apos;s data like any other app&apos;s,
          and restoring a backup brings it back. If you delete the app, its data goes with it. To
          keep a copy you can open anywhere, export to CSV from Settings.
        </p>
      </section>

      <section>
        <h2>What does Rastro cost?</h2>
        <p>
          Nothing. Rastro is free, with no in-app purchases and no subscription. That includes
          cost reports: the value of what you used and lost for any period, by product, source, or
          location, and the value of what&apos;s on hand.
        </p>
      </section>

      <section>
        <h2>Can my whole team use it?</h2>
        <p>
          Today Rastro works on one device, so a practice can share one iPhone. Sync between
          devices isn&apos;t available yet.
        </p>
      </section>
    </ContentPage>
    </>
  );
}
