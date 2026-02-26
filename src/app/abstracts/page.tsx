import SiteHeader from '@/components/SiteHeader';
import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';

export default function SubmitAbstractPage() {
  return (
    <>
        <SiteHeader />
        <main style={{marginTop: '58px'}}>
                    
            <NewsletterSection />
        </main>
        <BackToTop />
    </>
  );
}
