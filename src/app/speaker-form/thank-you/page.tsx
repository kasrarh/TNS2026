import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";
import styles from "@/components/SpeakerDetailsForm.module.css";

export default function SpeakerFormThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <section className={styles.page}>
          <div className={styles.shell}>
            <div className={styles.hero}>
              <p className={styles.kicker}>TNS2027 Speakers</p>
              <h1>Thank you</h1>
              <p>
                Your speaker details and photo were submitted successfully. We
                appreciate your time and look forward to welcoming you at True
                North Spatial 2027.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.thankYouBody}>
                <p className={styles.thankYouLead}>
                  We have received your submission and will use these details for
                  your speaker profile and summit logistics.
                </p>
                <p>
                  If anything changes before the event, please reach out to the
                  Panoramics team so we can update your information.
                </p>
                <Link href="/" className={styles.lumaButton}>
                  Return to home
                </Link>
              </div>
            </div>
          </div>
        </section>
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
