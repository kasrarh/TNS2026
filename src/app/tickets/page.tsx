import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import SiteHeader from '@/components/SiteHeader';
import TicketsHero2 from '@/components/TicketsHero2';

export default function TicketsPage() {
    return (
        <>
            <SiteHeader />
            <main style={{ paddingTop: '72px' }}>
                <TicketsHero2 />
                <NewsletterSection />
            </main>
            <BackToTop />
        </>
    );
}
