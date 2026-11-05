export default function NewsletterSection() {
	return (
		<section className="newsletter" id="newsletter">
			<div className="container">
				<div className="footer-content">
					<div className="footer-brand">
						<a href="https://www.panoramics-a-vision.com/" aria-label="Panoramics - A Vision">
							<img src="/Panoramics-transparent-cropped.png" alt="Panoramics - A Vision Logo" />
						</a>
					</div>

					<nav className="footer-links" aria-label="Footer">
						<a href="/#engagement">Contact</a>
						<a href="/#sponsorship">Sponsorship</a>
						<a
							href="https://www.linkedin.com/company/panoramics-a-vision/"
							aria-label="LinkedIn"
							className="social-link"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
								<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</a>
					</nav>
				</div>

				<div className="credits">
					<p style={{ fontWeight: 'lighter', fontSize: '0.8em' }}>
						© 2026 Panoramics — A Vision Inc. All rights reserved.
					</p>
					<p className="credits-initiative">
						True North Spatial is a Panoramics - A Vision Inc. Initiative, pioneered, owned and led by Panoramics
					</p>
				</div>
			</div>
		</section>
	);
}
