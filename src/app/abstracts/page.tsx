import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import AbstractSection from '@/components/AbstractSection';
import TNS2026Header from '@/components/TNS2026Header';

export default function SubmitAbstractPage() {
  return (
    <>
        <TNS2026Header />
        <main style={{marginTop: '58px'}}>
            <AbstractSection />       
            <NewsletterSection />
        </main>
        <BackToTop />
    </>
  );
}
