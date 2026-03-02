import SiteHeader from '@/components/SiteHeader';
import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import AbstractSection from '@/components/AbstractSection';

export default function SubmitAbstractPage() {
  return (
    <>
        <SiteHeader />
        <main style={{marginTop: '58px'}}>
            <AbstractSection />       
            <NewsletterSection />
        </main>
        <BackToTop />
    </>
  );
}
