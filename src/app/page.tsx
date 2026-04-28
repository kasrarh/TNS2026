import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import EngagementSection from '@/components/EngagementSection';
import MissionSection from '@/components/MissionSection';
import ThankYouSection from '@/components/ThankYouSection';
import HighlightsSection from '@/components/HighlightsSection';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import BackToTop from '@/components/BackToTop';

export default function ShowcasePage() {
	return (
		<>
			<SiteHeader />
			<main>
				<HeroSection
					title="True North Spatial"
					subtitle={
						<>
							<span>Pionered</span> by <span>Panoramics– A Vision Inc.</span>
							<br />
							{/* North America&apos;s Premier Single-Cell &amp; Spatial Biology Conference */}
						</>
					}
					intro={
						<p>
							
						</p>
					}
					stats={[
					]}
					body={
						<>
							<h4>Elevate Scientific Discourse in Biological Topography, Turning Connection into Global Impact; Empowering Canadian Life Sciences Innovation</h4>
							
						</>
					}
					accentText="TNS2027 is coming — stay tuned for dates and registration."
					actions={[
						{ label: 'TNS 2026 Recap', href: '/TNS2026', variant: 'btn-secondary' },
					]}
				/>

				<EngagementSection />

				<ThankYouSection tileCount={18} overlayText="TNS 2026 Highlights" />

				<MissionSection />

				<HighlightsSection
					tag="The TNS Experience"
					title="Three Chapters, One Vision"
					subtitle="Each day of TNS is designed around a distinct theme"
					cards={[
						{
							image: './Inspire-me.png',
							imageAlt: 'Inspire',
							date: 'Chapter 1',
							cardTitle: 'Inspire Me',
							description: 'Keynotes and spotlights from trailblazing researchers who are redefining spatial omics and single-cell biology across the globe.',
							linkHref: '/TNS2026',
							linkLabel: 'See TNS2026 Agenda',
						},
						{
							image: './Enlighten-me.png',
							imageAlt: 'Enlighten',
							date: 'Chapter 2',
							cardTitle: 'Enlighten Me',
							description: 'Hands-on workshops, training sessions, and deep-dive tutorials for scientists at every career stage — from students to PIs.',
							linkHref: '/TNS2026',
							linkLabel: 'See TNS2026 Agenda',
						},
						{
							image: './Challenge-me.png',
							imageAlt: 'Challenge',
							date: 'Chapter 3',
							cardTitle: 'Challenge Me',
							description: 'Bold panel debates, fireside chats, and boundary-pushing discussions on AI, open science, economics, and the spatial frontiers ahead.',
							linkHref: '/TNS2026',
							linkLabel: 'See TNS2026 Agenda',
						},
					]}
				/>
				
				<ContactSection />
				<NewsletterSection />
			</main>
			<BackToTop />
		</>
	);
}