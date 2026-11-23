import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import EngagementSection from '@/components/EngagementSection';
import SponsorshipSection from '@/components/SponsorshipSection';
import HighlightsSection from '@/components/HighlightsSection';
import ContactSection from '@/components/ContactSection';
import NewsletterSection from '@/components/NewsletterSection';
import PhotoStripSection from '@/components/PhotoStripSection';
import BackToTop from '@/components/BackToTop';

export default function ShowcasePage() {
	return (
		<>
			<SiteHeader />
			<main>
				<HeroSection
					title="True North Spatial 2027"
					backgroundVideo="/bg.mp4"
					backgroundPoster="/bg-poster.jpg"
					subtitle={
						<>
							April 27-29
							<br />
							<span>Inspire · Enlighten · Challenge</span>
						</>
					}
					intro={<></>}
					stats={[]}
					body={
						<>
							<h4>Honour the past. Master the present. Architect the future.</h4>
							<p>True North Spatial is the annual summit on <strong><em>Biological Topography</em></strong>, pioneered by <em>Panoramics – A Vision</em>,<br/> where <em>The Panoramic Chapters</em> converge on a single stage - three chapters, three days.</p>
							<p>Each year, the summit connects our community, Canadian and global, through the vision and mission of <br/> <em>The Panoramic Chapters</em>.</p>
						</>
					}
					showGlobe={false}
					actions={[
						{ label: 'Register Now', href: '/tickets', variant: 'btn-primary' },
						{ label: 'Become a Sponsor', href: '/Sponsorship', variant: 'btn-primary' },
						{ label: 'TNS2026', sublabel: 'Recap', href: '/TNS2026', variant: 'btn-secondary' },
					]}
				/>

				<EngagementSection />

				<PhotoStripSection />

				<SponsorshipSection />

				<section className="tns-showcase-bg" aria-label="TNS 2026 showcase background" >
					<img src="/tns2026/TNS-background.png" alt="TNS 2026 showcase background" />
				</section>


				<HighlightsSection
					tag="The TNS Experience"
					title="The Panoramic Chapters"
					subtitle="Three Chapters, One Vision"
					cards={[
						{
							imageAlt: 'Inspire',
							date: 'The "Inspire-Me" Chapter',
							cardTitle: 'Structure, Foundation & Direction',
							description: (
								<>
									The &ldquo;Inspire-Me&rdquo; chapter was crafted to encourage leaders and founders to share their journey, their lived experience.
									<br />
									Through this, we uplift others to persevere, dream boldly, and reimagine what&rsquo;s possible in science.
								</>
							),

						},
						{
							imageAlt: 'Enlighten',
							date: 'The "Enlighten-Me" Chapter',
							cardTitle: 'Knowledge, Skill & Mastery',
							description: 'The sharpening of instinct and the empowerment of the mind are vital to the success of science. This chapter focuses on building skill, deepening understanding, and sharing knowledge with the community - so that every participant grows from knowledge, into skill, toward mastery.',

						},
						{
							imageAlt: 'Challenge',
							date: 'The "Challenge-Me" Chapter',
							cardTitle: 'Defy, Architect & Transcend',
							description: (
								<>
									In this chapter, we encourage thinking beyond the box: to defy tradition, to architect the new, and to transcend what the field believes possible - fuelling scientific and technological expansion.
									<br />
									Here, we live in the future.
								</>
							),

						},
					]}
				/>
				
				{/* <ContactSection /> */}
				<NewsletterSection />
			</main>
			<BackToTop />
		</>
	);
}