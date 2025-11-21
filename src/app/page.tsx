import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import HighlightsSection from '@/components/HighlightsSection';
import ScheduleSection from '@/components/ScheduleSection';
import NewTeamSection from '@/components/NewTeamSection';
// import BenefitsSection from '@/components/BenefitsSection';
// import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import BackToTop from '@/components/BackToTop';
import LogosSection from '@/components/LogosSection';

export default function Page() {
	return (
		<>

			<SiteHeader />
			<main>
				<HeroSection />
				<HighlightsSection />
				<ScheduleSection />
				{/* <LogosSection /> */}
				<NewTeamSection />
				{/* <BenefitsSection /> */}
				{/* <TestimonialsSection /> */}
				<FAQSection />
				<ContactSection />
				<NewsletterSection />
			</main>
			<BackToTop />
		</>
	);
}