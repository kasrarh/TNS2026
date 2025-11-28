'use client';

import { useState } from 'react';

export default function NewsletterSection() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section className="newsletter" id="newsletter">
			<div className="container">
				<div className="footer-content">
					{/* Left: TNS Logo */}
					<div className="footer-brand">
						<a href="/" aria-label="Home">
							<img src="/TNS2026-logo-cropped.png" alt="TNS 2026 Logo" style={{height: '80px'}} />
						</a>
					</div>

					{/* Center: Navigation */}
					<div className="footer-nav">
						<div className="footer-nav-group">
							<h4>Quick Links</h4>
							<div className="footer-nav-links">
								<a href="/#about">About</a>
								<a className='highlighted-link' href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Our Vision</a>
								<a href="/#schedule">Schedule</a>
								<a href="/#sponsors">Sponsors</a>
								<a href="/#team">Speakers</a>
							</div>
						</div>
						<div className="footer-nav-group">
							<h4>Resources</h4>
							<div className="footer-nav-links">
								<a href="/#faq">FAQs</a>
								<a href="/#contact">Contact</a>
								<a href="/sponsors">Sponsorship</a>
								<a href="/tickets">Tickets</a>


							</div>
						</div>
						<div className="footer-nav-group">
							<h4>Follow Us</h4>
							<div className="socials">
								<a href="https://www.linkedin.com/company/panoramics-a-vision/" aria-label="LinkedIn" className="social-link">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
										<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
										<circle cx="4" cy="4" r="2" />
									</svg>
								</a>
								{/* <a href="https://luma.com/panoramics" aria-label="Luma" className="social-link">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
										<line x1="16" y1="2" x2="16" y2="6" />
										<line x1="8" y1="2" x2="8" y2="6" />
										<line x1="3" y1="10" x2="21" y2="10" />
									</svg>
								</a> */}
							</div>
						</div>
					</div>

					{/* Right: Panoramics Logo */}
					<div className="footer-brand">
						{/* <span className="muted" style={{ fontSize: '0.8rem', marginBottom: '12px', display: 'block' }}>Powered by</span> */}
						<a href="https://www.panoramics-a-vision.com/" aria-label="Panoramics">
							<img src="/panoramics-logo.png" alt="Panoramics-A-Vision Logo" style={{verticalAlign: "center"}}/>
						</a>
					</div>
				</div>

				<div className="credits">
					<p style={{fontWeight: "lighter", fontSize: "0.8em"}}>© 2026 Panoramics — A Vision Inc. All rights reserved.</p>
				</div>
			</div>
			{isModalOpen && (
				<OpenModal
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</section>
	);
}

function OpenModal(
	{ onClose }:
		{ onClose: () => void }
) {
	return (
		<div className="person-modal-backdrop" onClick={onClose}>
			<div
				className="person-modal"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label="What is True North Spatial"
			>
				<button
					type="button"
					className="person-modal-close"
					onClick={onClose}
					aria-label="Close"
				>
							✕
				</button>

				<div className="person-modal-desc" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
					<img
						src="/TNS2026-logo.png"
						alt="True North Spatial Logo"
						style={{
							width: "100px",
							height: "100px",
							objectFit: "contain",
							marginBottom: "0.75rem",
							opacity: 0.9,
							margin: "0 auto",
						}}
					/>
					<h4 style={{ marginTop: "1rem", fontWeight: 600, textAlign: 'center' }}>Our Mission for True North Spatial 2026</h4>

					<p>
						Our inaugural True North Spatial 2026 is a convergence of our Panoramic Chapters,
						for global engagement through Canada - our True North. True North Spatial 2026 will
						set the stage, positioning Panoramics - A Vision Inc. as a pan-Canadian hub for
						spatial &amp; single cell biology and will assume a yearly occurrence.
					</p>

					<p>
						To elevate scientific exposition in spatial and single cell biology by creating a unique
						nexus, a convergence of minds right here in Canada - our True North that grounds our
						vision - through the mission statements of our Panoramic Chapters.
					</p>
				</div>
			</div>
		</div>
	);
}

