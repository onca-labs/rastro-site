import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { CONTACT_EMAIL, GTM_ID, LEGAL_ENTITY, PRIVACY_EFFECTIVE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy | Rastro",
  description: "Rastro keeps your inventory on your iPhone. It has no accounts and collects no data.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

/**
 * The App Store "Privacy Policy URL". Every statement describes real behavior:
 * the app makes no network calls and stores nothing off-device (rastro repo),
 * and the website section follows what layout.tsx actually loads. Change this
 * page, and bump PRIVACY_EFFECTIVE, in the same commit as any change to either.
 */
export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy"
      lede={`Effective ${PRIVACY_EFFECTIVE}. Rastro is made by ${LEGAL_ENTITY}.`}
    >
      <section>
        <h2>The Rastro app</h2>
        <p>
          Rastro doesn&apos;t collect any data. It has no accounts, no server, and no analytics
          or tracking. Your inventory is stored only on your device, and the app doesn&apos;t
          need an internet connection to work.
        </p>
        <ul>
          <li>
            <strong>Camera.</strong> Rastro uses the camera only to read barcodes on product
            packaging. It doesn&apos;t save or send camera images.
          </li>
          <li>
            <strong>Patient information.</strong> Rastro has no fields for patient names, dates
            of birth, appointments, treatments, or photos. It records what happened to your
            inventory, not who received it.
          </li>
          <li>
            <strong>Exports.</strong> A CSV export is created only when you ask for one, and goes
            only where you choose to send it.
          </li>
          <li>
            <strong>Deleting your data.</strong> Deleting the app deletes its data.
          </li>
        </ul>
      </section>

      <section>
        <h2>This website</h2>
        <p>
          This site is hosted on GitHub Pages. GitHub may log visitors&apos; IP addresses for
          security, as described in GitHub&apos;s own privacy statement. Fonts load from Google
          Fonts.
        </p>
        {GTM_ID ? (
          <p>
            We use Google Tag Manager and Google Analytics to understand how many people visit
            and which pages they read. These set cookies in your browser. We don&apos;t use them
            for advertising.
          </p>
        ) : null}
        <p>
          If you email us, we use your message and address only to reply. We don&apos;t sell
          or share them.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          If this policy changes, we&apos;ll update it here and change the date above.
        </p>
      </section>
    </ContentPage>
  );
}
