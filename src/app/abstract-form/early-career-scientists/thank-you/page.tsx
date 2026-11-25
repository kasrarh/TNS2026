import BackToTop from "@/components/BackToTop";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";
import { AbstractThankYou } from "@/components/abstract-form/AbstractFormParts";

export default function EarlyCareerScientistsThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <AbstractThankYou kicker="TNS2027 Early Career Scientists" />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
