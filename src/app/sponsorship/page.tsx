import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";
import SponsorshipDetails from "@/components/SponsorshipDetails";

export const metadata: Metadata = {
  title: "Become a Sponsor | True North Spatial 2027",
  description:
    "Sponsorship opportunities are now open for True North Spatial 2027. Review corporate dinner, spatial technology, and blue chip tiers.",
};

export default function SponsorshipPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <SponsorshipDetails />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
