import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import SiteHeader from '@/components/SiteHeader';
import ScheduleSection from '@/components/ScheduleSection';

export default function AgendaPage() {
    return (
        <>
            <SiteHeader />
            <main>
                <div style={{ paddingTop: '80px' }}>
                    <ScheduleSection fullPage={true} />
                </div>
                <NewsletterSection />
            </main>
            <BackToTop />
        </>
    );
}
