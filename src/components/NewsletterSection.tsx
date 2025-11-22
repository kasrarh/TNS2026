'use client';

import { useRef, useState } from 'react';

export default function NewsletterSection() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const [message, setMessage] = useState<{ text: string; color: string } | null>(null);

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
			<div className="container news-inner">
				<div className="news-copy">
					<a className="logo" href="#top" aria-label="Home"><span className="logo-mark"></span></a>
					<p>Stay updated on the latest research insights and conference developments</p>
					<form className="subscribe" id="subscribe-form" noValidate ref={formRef} onSubmit={onSubmit}>
						<label className="sr-only" htmlFor="email">Email</label>
						<input id="email" type="email" name="email" placeholder="you@example.com" required ref={emailRef} />
						<button className="btn btn-primary" type="submit">Subscribe</button>
						<small className="muted">By subscribing, you'll receive exclusive updates about our research initiative.</small>
						<p className="form-message" role="status" aria-live="polite" style={{ color: message?.color }}>{message?.text}</p>
					</form>
				</div>
				<div className="news-links">
					<div className="col">
						<h4>Quick Links</h4>
						<a href="#about">Conference</a>
						<a href="#schedule">Schedule</a>
						<a href="#team">Speakers</a>
						<a href="#benefits">Research</a>
						<a href="#partners">Partners</a>
					</div>
					<div className="col">
						<h4>Resources</h4>
						<a href="#">Papers</a>
						<a href="#">Presentations</a>
						<a href="#">Workshops</a>
						<a href="#">Publications</a>
						<a href="#">Follow us</a>
					</div>
					<div className="col">
						<h4>Social</h4>
						<a href="#">X</a>
						<a href="#">LinkedIn</a>

					</div>
				</div>
			</div>
			<div className="container credits">
				<span>© 2026 Panoramics — A Vision. All rights reserved.</span>
				<div className="credit-links">
					<a href="#">Privacy</a>
					<a href="#">Terms</a>
					<a href="#">Cookies</a>
					
				</div>
			</div>
		</section>
	);
}


