import Link from 'next/link';
import ProfessionalCard from '@/components/ProfessionalCard';

const scheduleDays = [
	{
		title: 'Day 1 - Inspire Me',
		description: 'Kick off with visionary keynotes and foundational ideas shaping spatial biology.',
		subtitle: 'March 25, 2026',
	},
	{
		title: 'Day 2 - Enlighten Me',
		description: 'Dive into innovation spotlights, practical insights, and collaborative learning.',
		subtitle: 'March 26, 2026',
	},
	{
		title: 'Day 3 - Challenge Me',
		description: 'Explore bold debates, future-focused talks, and the next frontier of discovery.',
		subtitle: 'March 27, 2026',
	},
];

export default function ScheduleDaysSection() {
	return (
		<section className="cards-3 team" id="schedule-days">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">Schedule Preview</span>
					<h2 className="tx-dark">Three Days. Three Distinct Experiences.</h2>
					<p className="muted-dark">A quick look at what each conference day is designed to deliver.</p>
				</div>

				<div className="card-grid">
					{scheduleDays.map((day) => (
						<ProfessionalCard
							key={day.title}
							title={day.title}
							subtitle={day.subtitle}
							content={<p>{day.description}</p>}
						/>
					))}
				</div>

				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
					<Link className="btn btn-primary" href="/agenda">
						View Full Schedule
					</Link>
				</div>
			</div>
		</section>
	);
}
