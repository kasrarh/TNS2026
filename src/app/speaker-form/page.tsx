import BackToTop from "@/components/BackToTop";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";
import SpeakerDetailsForm from "@/components/SpeakerDetailsForm";

export default function SpeakerFormPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <SpeakerDetailsForm />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
