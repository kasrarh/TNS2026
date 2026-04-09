import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import ThankYouSection from '@/components/ThankYouSection';
import NewsSection from '@/components/NewsSection';
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
import LogosSection2 from '@/components/LogoSection2';
import IntroVideo from '@/components/IntroVideo';

export default function Page() {
	return (
		<>
			{/* <IntroVideo /> */}
			<SiteHeader />
			<main>
				<HeroSection
					title="True North Spatial 2026"
					subtitle={
						<>
							By <span>Panoramics– A Vision Inc.</span>
							<br />
							25th - 27th March, 2026
						</>
					}
					intro={
						<>
							Thank you to everyone who joined us for the <span>inaugural TNS2026</span>, an incredible three-day journey at the MaRS Discovery District. As{' '}
							<span>North America&apos;s first dedicated single-cell and spatial biology conference</span>, this event marked a historic milestone for the scientific community in Canada and beyond.
							Because of your energy and engagement, we reached new heights:
						</>
					}
					stats={[
						{ target: 200, suffix: '+', label: 'Registered Attendees' },
						{ target: 50, suffix: '+', label: 'Academic and Industry Speakers' },
						{ target: 16, suffix: '', label: 'Expert Sponsors' },
					]}
					body={
						<p>
							The scientific exchange was truly groundbreaking. From exploring the beginnings of spatial biology, to indulging in cross-domain discoveries involving reindeer and polar bear sciences, to discussing the future of AI in medicine and then embarking on thought-provoking discussions on crossing-boundaries, pushing spatial frontiers and delving into economics and business acumen, impact and partnership, the three days revolving around the &quot;inspire-me&quot;, the &quot;enlighten-me&quot; and the &quot;challenge-me&quot; chapters truly lifted us off onto the future.
						</p>
					}
					accentText="We welcome you to join us for TNS2027, as we elevate to the next level."
				/>
				<ThankYouSection />
				{/* <NewsSection /> */}
				{/* <HighlightsSection
					tag="The Panoramics Chapters"
					title={'"Inspire Me", "Enlighten Me", "Challenge Me"'}
					subtitle="Re-imagining conversations in science"
					cards={[
						{
							image: './Inspire-me.png',
							imageAlt: 'Inspire me',
							date: 'March 25th',
							cardTitle: 'Be Inspired',
							description: 'Our "Inspire-Me" chapter celebrates the curiosity, creativity and imagination that sparks scientific discovery. This chapter is a focus for inspiration and motivation, aimed to ignite the scientist in us and to give us purpose and hope. Here we have carefully curated a selection of innovative scientists working in the single cell and spatial biology field.',
							linkHref: '/agenda',
							linkLabel: 'See More',
						},
						{
							image: './Enlighten-me.png',
							imageAlt: 'Enlighten me',
							date: 'March 26th',
							cardTitle: 'Be Enlightened',
							description: 'Our "Enlighten-Me" chapter is focused on high quality, meaningful training and pedagogy. This chapter emphasizes skills development, encourages innovation and aims to form a support structure for creativity and training. Join us on day two as we engage with students and future leaders.',
							linkHref: '/agenda',
							linkLabel: 'See More',
						},
						{
							image: './Challenge-me.png',
							imageAlt: 'Challenge me',
							date: 'March 27th',
							cardTitle: 'Be Challenged',
							description: 'Our "Challenge-Me" chapter nurtures out-of-the-box and future-forward thinking in our scientific community. This chapter strives to expand horizons that will shape the future of the field. Join us on day three as we tackle bold topics and grand challenges.',
							linkHref: '/agenda',
							linkLabel: 'See More',
						},
					]}
				/> */}
				<ScheduleSection />
				{/* <LogosSection /> */}
				<LogosSection2 />
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