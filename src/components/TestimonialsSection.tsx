'use client';

import { useRef } from 'react';

export default function TestimonialsSection() {
	const trackRef = useRef<HTMLDivElement | null>(null);

	const step = () => (trackRef.current ? trackRef.current.clientWidth * 0.9 : 400);

	return (
		<section className="testimonials bg-light" id="testimonials">
			<div className="container">
				<div className="section-title">
					<h2 className="tx-dark">What attendees say</h2>
					<p className="muted-dark">Feedback from the community.</p>
				</div>

				<div className="carousel" data-carousel>
					<div className="carousel-track" ref={trackRef}>
						<article className="quote-card">
							<div className="quote-logo"></div>
							<blockquote>Most actionable conference this year. We shipped two ideas the next sprint.</blockquote>
							<div className="quote-avatar">
								<div className="avatar-img"></div>
								<div>
									<div className="name">Jamie</div>
									<div className="muted">Head of ML</div>
								</div>
							</div>
							<a className="text-link" href="#">Case study</a>
						</article>

						<article className="quote-card">
							<div className="quote-logo"></div>
							<blockquote>Fantastic curation of speakers and hands-on workshops. 10/10.</blockquote>
							<div className="quote-avatar">
								<div className="avatar-img"></div>
								<div>
									<div className="name">Morgan</div>
									<div className="muted">Founder</div>
								</div>
							</div>
							<a className="text-link" href="#">Case study</a>
						</article>

						<article className="quote-card">
							<div className="quote-logo"></div>
							<blockquote>Bridges research and production better than any event I've attended.</blockquote>
							<div className="quote-avatar">
								<div className="avatar-img"></div>
								<div>
									<div className="name">Riley</div>
									<div className="muted">Professor</div>
								</div>
							</div>
							<a className="text-link" href="#">Case study</a>
						</article>
					</div>

					<div className="carousel-controls">
						<button
							className="prev"
							aria-label="Previous"
							onClick={() => trackRef.current?.scrollBy({ left: -step(), behavior: 'smooth' })}
						>
							‹
						</button>
						<button
							className="next"
							aria-label="Next"
							onClick={() => trackRef.current?.scrollBy({ left: step(), behavior: 'smooth' })}
						>
							›
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}


