export default function MissionSection() {
	return (
		<section className="mission-section" id="mission">
			<div className="container">
				<div className="section-title">
					<span className="tag tx-light">Our Mission</span>
					<h2 className="tx-light">Advancing Spatial &amp; Single-Cell Biology</h2>
					<p className="muted-light" style={{ maxWidth: 640, margin: '0 auto' }}>
						True North Spatial is more than a conference — it is a movement to unite researchers,
						clinicians, and innovators around the technologies shaping the future of biology and medicine.
					</p>
				</div>

				<div className="mission-grid">
					<article className="mission-card">
						<div className="mission-icon">🔬</div>
						<h3>Accelerate Discovery</h3>
						<p>
							Bridge the gap between cutting-edge spatial omics research and clinical translation
							by fostering cross-disciplinary dialogue.
						</p>
					</article>

					<article className="mission-card">
						<div className="mission-icon">🤝</div>
						<h3>Build Community</h3>
						<p>
							Create a home for North America&apos;s spatial biology community — connecting
							academia, industry, and emerging talent under one roof.
						</p>
					</article>

					<article className="mission-card">
						<div className="mission-icon">🚀</div>
						<h3>Shape the Future</h3>
						<p>
							Champion open science, AI-driven analysis, and bold ideas that push the boundaries
							of what spatial and single-cell technologies can achieve.
						</p>
					</article>

					<article className="mission-card">
						<div className="mission-icon">🎓</div>
						<h3>Empower Next-Gen Scientists</h3>
						<p>
							Invest in training, mentorship, and hands-on workshops that equip the next
							generation of researchers with the skills to lead.
						</p>
					</article>
				</div>
			</div>
		</section>
	);
}
