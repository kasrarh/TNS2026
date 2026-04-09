import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
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
							By <span>Panoramics– A Vision Inc.</span>
							<br />
							{/* North America&apos;s Premier Single-Cell &amp; Spatial Biology Conference */}
						</>
					}
					intro={
						<p>
							True North Spatial is a convergence of The Panoramic Chapters, for global engagement from Canada. True North Spatial sets the stage, positioning Panoramics - A Vision Inc. as a pan-Canadian hub for research and pedagogical development as in biological topography.
							<br />
							<br />
							To elevate scientific exposition in biological topography, by integrating spatial and single cell technologies and thus creating a unique nexus, a convergence of minds right here in Canada through the mission statements of our Panoramic Chapters.
							<br />
							<br />
							True North Spatial was founded, pioneered and supported by Panoramics - A Vision, a Canadian corporation focused on research, development and pedagogical initiatives.
						</p>
					}
					stats={[
					]}
					body={
						<>
							<h3>About Panoramics - A Vision INC.</h3>
							<p>
								Panoramics - A Vision INC.,  a nexus that constantly strives in re-imagining conversations in science, infusing cross-disciplinary and inter-disciplinary approaches into the study of biological topography, in order to deliver scientific methodologies and programs to attain the nexus of scientific excellence and goodness through pedagogy and innovation. 
								<br />
								<br />
								True North Spatial 2026 was organized and led  by Panoramics - A Vision and supported by Panoramics - A Vision, world-leading spatial & Single Cell Biology sponsors and attendee-generated ticket sales.
							</p>
						</>
					}
					accentText="TNS2027 is coming — stay tuned for dates and registration."
					actions={[
						{ label: 'TNS 2026 Recap', href: '/TNS2026', variant: 'btn-secondary' },
					]}
				/>

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