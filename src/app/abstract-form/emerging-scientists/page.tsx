import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import EmergingScientistsAbstractForm from "@/components/abstract-form/EmergingScientistsAbstractForm";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Emerging Scientists Abstract Submission | TNS2027",
};

export default function EmergingScientistsAbstractPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <EmergingScientistsAbstractForm />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
