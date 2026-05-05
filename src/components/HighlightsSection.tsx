import type { ReactNode } from 'react';

import ProfessionalCard from '@/components/ProfessionalCard';

export interface HighlightCard {
	image?: string ;
	imageAlt: string;
	date: string;
	cardTitle: string;
	description: ReactNode;
	linkHref?: string;
	linkLabel?: string;
}

export interface HighlightsSectionProps {
	tag: string;
	title: string;
	subtitle: string;
	cards: HighlightCard[];
}

export default function HighlightsSection({
	tag,
	title,
	subtitle,
	cards,
}: HighlightsSectionProps) {
	return (
		<section className="cards-3" id="highlights">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">{tag}</span>
					<h2 className="tx-dark">{title}</h2>
					<p className="muted-dark">{subtitle}</p>
				</div>
				<div className="card-grid">
					{cards.map((card) => (
						<ProfessionalCard
							key={card.cardTitle}
							title={card.cardTitle}
							subtitle={card.date}
							picture={card.image}
							pictureAlt={card.imageAlt}
							content={
								<>
									<p>{card.description}</p>
									{card.linkHref ? (
										<a
											className="btn btn-primary"
											href={card.linkHref}
											style={{ marginTop: 'auto' }}
										>
											{card.linkLabel ?? 'See More'}
										</a>
									) : null}
								</>
							}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
