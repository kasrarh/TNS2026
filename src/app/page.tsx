import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import EngagementSection from '@/components/EngagementSection';
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

				<section className="tns-showcase-bg" aria-label="TNS 2026 showcase background" >
					<img src="/tns2026/TNS-background.png" alt="TNS 2026 showcase background" />
				</section>


				<HighlightsSection
					tag="The TNS Experience"
					title="Three Chapters, One Vision"
					subtitle="Each day of TNS is designed around a distinct theme"
					cards={[
						{
							image: './Inspire-me.png',
							imageAlt: 'Inspire',
							date: 'The "Inspire Me" Chapter',
							cardTitle: 'Structure, Foundation, and Strength',
							description: 'Because innovation, intelligence, and creation have no real value without the wisdom of leaders and visionaries who have already walked the path - and who are necessary to guide the field with grounded truth.',

						},
						{
							image: './Enlighten-me.png',
							imageAlt: 'Enlighten',
							date: 'The "Enlighten Me" Chapter',
							cardTitle: 'Perseverance, Knowledge, and Cognitive Weaponry',
							description: 'Because the future of science will not be built by one kind of thinker alone. It will be built by people who know how to listen across disciplines, learn from one another, and respect what each perspective brings to the table.',

						},
						{
							image: './Challenge-me.png',
							imageAlt: 'Challenge',
							date: 'The "Challenge Me" Chapter',
							cardTitle: 'Architect, Create, and Idea',
							description: 'The architect who can look far into the future, the creator who can conjure a new construct, the paradigm shifter who can ideate for expansion - thought leadership materializes naturally when gifted with "inspiration" and "enlightenment". Here we live in the future.',

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