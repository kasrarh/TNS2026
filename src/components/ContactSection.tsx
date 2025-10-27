export default function ContactSection() {
	return (
		<section className="contact bg-light" id="contact">
			<div className="container">
				<div className="contacts">
					<div className="contact-card">
						<div className="icon" aria-hidden="true">✉️</div>
						<h3>Email</h3>
						<p>hello@panoramics.conf</p>
						<a className="text-link" href="mailto:hello@panoramics.conf">Send mail</a>
					</div>
					<div className="contact-card">
						<div className="icon" aria-hidden="true">📞</div>
						<h3>Phone</h3>
						<p>+1 (555) 010-2026</p>
						<a className="text-link" href="tel:+15550102026">Call us</a>
					</div>
					<div className="contact-card">
						<div className="icon" aria-hidden="true">📍</div>
						<h3>Location</h3>
						<p>San Francisco, CA</p>
						<a className="text-link" href="#">Get directions</a>
					</div>
				</div>
				<div className="map" role="img" aria-label="Map placeholder"></div>
			</div>
		</section>
	);
}


