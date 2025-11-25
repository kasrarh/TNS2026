
import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import SiteHeader from '@/components/SiteHeader';
import SponsorsSection from '@/components/SponsorsSection';



export default function SponsorsPage() {
    return (
        <>
            <SiteHeader />
            <main>
                <SponsorsSection />
                <NewsletterSection />
            </main>
            <BackToTop />
        </>
    );
}
