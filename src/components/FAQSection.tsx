export default function FAQSection() {
	return (
		<section className="faq bg-light" id="faq">
			<div className="container">
				<div className="section-title">
					<h2 className="tx-dark">FAQs</h2>
					<p className="muted-dark">Answers to common questions.</p>
				</div>
				<div className="accordion" data-accordion>
					<details className="item" open>
						<summary>Where is the conference hosted?</summary>
						<p className="muted-light">Downtown conference center. Exact address shared upon registration.</p>
					</details>
					<details className="item">
						<summary>Will sessions be recorded?</summary>
						<p className="muted-light">Yes. All talks and workshops will be available to attendees after the event.</p>
					</details>
					<details className="item">
						<summary>Do you offer student pricing?</summary>
						<p className="muted-light">We offer limited student passes. Please contact us with proof of enrollment.</p>
					</details>
					<details className="item">
						<summary>How can I become a sponsor?</summary>
						<p className="muted-light">Reach out via the contact form. We have multiple tiers available.</p>
					</details>
				</div>
				<div className="cta-row">
					<h3 className="tx-dark">Still have questions?</h3>
					<p className="muted-dark">Our team is here to help.</p>
					<a className="btn btn-primary" href="#contact">Contact us</a>
				</div>
			</div>
		</section>
	);
}


