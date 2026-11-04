import SiteHeader from "@/components/SiteHeader";
import SpecialSponsorsSection from "@/components/SpecialSponsorsSection";
import NewsletterSection from "@/components/NewsletterSection";
import BackToTop from "@/components/BackToTop";

export default function SpecialSponsorsPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <SpecialSponsorsSection />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
