import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import HighlightsSection from '@/components/HighlightsSection';
import BackToTop from '@/components/BackToTop';

export default function ShowcasePage() {
	return (
		<>
			<SiteHeader />
			<main>
				<HeroSection
					title="True North Spatial 2027"
					subtitle={
						<>
							By <span>Panoramics– A Vision Inc.</span>
							<br />
							Coming Soon, 2027
						</>
					}
					intro="Join us for the next chapter of North America's premier single-cell and spatial biology conference."
					stats={[
						{ target: 300, suffix: '+', label: 'Expected Attendees' },
						{ target: 60, suffix: '+', label: 'World-Class Speakers' },
						{ target: 20, suffix: '+', label: 'Innovation Sponsors' },
					]}
					body={
						<p>
							Building on the incredible success of TNS2026, we are raising the bar for scientific exchange,
							collaboration, and discovery. Stay tuned for speaker announcements, agenda details, and registration.
						</p>
					}
					accentText="Register early — spots are limited."
					actions={[
						{ label: 'Learn More', href: '/', variant: 'btn-secondary' },
					]}
				/>
				<HighlightsSection
					tag="TNS2027 Preview"
					title="What to Expect at TNS2027"
					subtitle="Three days of discovery, training, and bold ideas"
					cards={[
						{
							image: './Inspire-me.png',
							imageAlt: 'Inspire',
							date: 'Day 1',
							cardTitle: 'Inspire',
							description: 'Keynotes and spotlights from trailblazing researchers shaping the future of spatial omics.',
							linkHref: '/agenda',
							linkLabel: 'See Agenda',
						},
						{
							image: './Enlighten-me.png',
							imageAlt: 'Enlighten',
							date: 'Day 2',
							cardTitle: 'Enlighten',
							description: 'Hands-on workshops, skill-building sessions, and deep-dive tutorials for scientists at every stage.',
							linkHref: '/agenda',
							linkLabel: 'See Agenda',
						},
						{
							image: './Challenge-me.png',
							imageAlt: 'Challenge',
							date: 'Day 3',
							cardTitle: 'Challenge',
							description: 'Panel debates, fireside chats, and bold conversations on the future of AI, open science, and spatial frontiers.',
							linkHref: '/agenda',
							linkLabel: 'See Agenda',
						},
					]}
				/>
			</main>
			<BackToTop />
		</>
	);
}
