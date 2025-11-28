'use client';

import { useRef, useState } from 'react';

export default function NewsletterSection() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const [message, setMessage] = useState<{ text: string; color: string } | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal state


	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		const email = emailRef.current?.value?.trim() ?? '';
		const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
		if (!ok) {
			setMessage({ text: 'Please enter a valid email.', color: '#fca5a5' });
			return;
		}
		setMessage({ text: 'Thanks! Check your inbox to confirm.', color: '#22c55e' });
		formRef.current?.reset();
	}

	return (
		<section className="newsletter" id="tickets">
			<div className="container row">
				<div className='col-12 col-md-6 row'>
					<div className="news-copy col-6">
					<a className="logo" href="/" aria-label="Home"><img src="/TNS2026-logo-new.png" alt="TNS 2026 Logo" /></a>
					{/* <p>Stay updated on the latest research insights and conference developments</p>
                    <form className="subscribe" id="subscribe-form" noValidate ref={formRef} onSubmit={onSubmit}>
                        <label className="sr-only" htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" placeholder="you@example.com" required ref={emailRef} />
                        <button className="btn btn-primary" type="submit">Subscribe</button>
                        <small className="muted">By subscribing, you'll receive exclusive updates about our research initiative.</small>
                        <p className="form-message" role="status" aria-live="polite" style={{ color: message?.color }}>{message?.text}</p>
                    </form> */}
				</div>
				<div className="news-copy col-6">
					<a className="panoramics" href="https://www.panoramics-a-vision.com/" aria-label="Panoramics"><img src="/panoramics-logo.png" alt="Panoramics-A-Vision Logo" /></a>
				</div>
				</div>
				<div className='col-12 col-md-6 row'>
					<div className="news-links col-12 col-md-6 row">
					<div className="col-8 col">
						<h4>Quick Links</h4>
						<div className="row">
							<div className='col-6 col'>
								<a href="/#about">About</a>
								<a id='highlighted-link' onClick={(e) => {
									e.preventDefault();
									setIsModalOpen(true); // Open the modal
								}}>Our Vision</a>
								<a href="/#schedule">Schedule</a>
								<a href="/#sponsors">Sponsors</a>
							</div>
							<div className='col-6 col'>
								<a href="/#team">Speakers</a>
								<a href="/#faq">FAQs</a>
								<a href="/#contact">Contact</a>
							</div>

						</div>

					</div>
					<div className="col-3 col">
						<h4>Socials</h4>
						<a href="https://www.linkedin.com/company/panoramics-a-vision/" aria-label="LinkedIn" className="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</a>
						<a href="#" aria-label="X" className="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.654l-5.207-6.807-5.974 6.807H2.426l7.723-8.835L1.254 2.25h6.554l4.886 6.336 5.43-6.336zM17.534 20.766h1.832L6.455 3.812H4.527l13.007 16.954z" />
							</svg>
						</a>

					</div>
				</div>
				</div>
				
				

			</div>
			<div className="container credits">
				<span>© 2026 Panoramics — A Vision Inc. All rights reserved.</span>
				{/* <div className="credit-links">
					<a href="#">Privacy</a>
					<a href="#">Terms</a>
					<a href="#">Cookies</a>
				</div> */}
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
						src="/TNS2026-logo.png"      // ← replace with your actual path
						alt="True North Spatial Logo"
						style={{
							width: "100px",                // small + clean
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

