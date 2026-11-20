import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import ContactDetails from "@/components/ContactDetails";
import NewsletterSection from "@/components/NewsletterSection";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact Us | True North Spatial 2027",
  description:
    "Get in touch with the True North Spatial 2027 team for general enquiries, sponsorship, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main style={{ paddingTop: "72px" }}>
        <ContactDetails />
        <NewsletterSection />
      </main>
      <BackToTop />
    </>
  );
}
