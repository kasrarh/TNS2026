
import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import SiteHeader from '@/components/SiteHeader';
import TicketsHero from '@/components/TicketsHero';
import TicketsHero2 from '@/components/TicketsHero2';


export default function TicketsPage() {
    return (
        <>
            <SiteHeader />
            <main>
                <TicketsHero2 />
                <NewsletterSection />
            </main>
            <BackToTop />
        </>
    );
}
