import BackToTop from '@/components/BackToTop';
import NewsletterSection from '@/components/NewsletterSection';
import ScheduleSection from '@/components/ScheduleSection';
import TNS2026Header from '@/components/TNS2026Header';

export default function AgendaPage() {
    return (
        <>
            <TNS2026Header />
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
