
import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import SiteHeader from '@/components/SiteHeader';
import SponsorsSection from '@/components/SponsorsSection';
import PartnershipSection from '@/components/PartnershipSection';



export default function SponsorsPage() {
    return (
        <>
            <SiteHeader />
            <main style={{marginTop: '58px'}}>
                {/* <SponsorsSection /> */}
                <PartnershipSection />
                <NewsletterSection />
            </main>
            <BackToTop />
        </>
    );
}
