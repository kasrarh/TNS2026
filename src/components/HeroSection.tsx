export default function HeroSection() {
	return (
		<section className="hero" id="about">
			<div className="container hero-inner">
				<div className="hero-content">
					<h1>Panoramics — A — Vision Conference 2026</h1>
					<p>
						Explore breakthroughs and practical applications across computer vision and AI. Join
						researchers, engineers, and creators for two days of talks, workshops, and demos.
					</p>
					<div className="actions">
						{/* <a className="btn btn-primary" href="#schedule">View Schedule</a> */}
						<a className="btn btn-secondary" href="#tickets">Register</a>
					</div>
				</div>
				<figure className="hero-media" aria-label="Conference preview image" role="img"></figure>
			</div>
		</section>
	);
}


