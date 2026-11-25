import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import EarlyCareerScientistsAbstractForm from "@/components/abstract-form/EarlyCareerScientistsAbstractForm";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Early Career Scientists Abstract Submission | TNS2027",
};

export default function EarlyCareerScientistsAbstractPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <EarlyCareerScientistsAbstractForm />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
