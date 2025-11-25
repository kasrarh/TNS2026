export default function FAQSection() {
	return (
		<section className="faq" id="faq">
			<div className="container">
				<div className="section-title">
					<h2 className="tx-dark">FAQs</h2>
					<p className="tag muted-dark">Answers to common questions.</p>
				</div>
				<div className="accordion" data-accordion>
					<details className="item" open>
						<summary>What is True North Spatial 2026?</summary>
						<p className="muted-light">Canada’s first Spatial and Single Cell Biology Summit dedicated to spatial biology, single-cell technologies, and AI innovation, featuring 3 days of debate, discovery, technology demonstrations, and high-level scientific conversations.</p>
					</details>
					<details className="item">
						<summary>Who is organizing the summit?</summary>
						<p className="muted-light">The summit is organized by Panoramics - A Vision Inc., a pan-Canadian R&D corporation. To learn more about us, visit us at <a href="https://www.panoramics-a-vision.com">www.panoramics-a-vision.com</a>
							<br />
							Panoramics leads scientific training, community building, and national innovation initiatives through its Panoramic Chapters: Inspire-Me, Enlighten-Me, Challenge-Me.</p>
					</details>
					<details className="item">
						<summary>What makes this summit unique?</summary>
						<ul>
							<li className="muted-light">First pan-Canadian spatial & single cell biology meeting in Canada, globally engaging with international tech leaders.</li>
							<li className="muted-light">High-value networking across academia, biotech, hospitals, and industry across Canada and globally.</li>
							<li className="muted-light">Dedicated academia - industry engagement opportunities</li>
						</ul>
					</details>
					<details className="item">
						<summary>Who should attend?</summary>
						<p className="muted-light">True North Spatial is designed for</p>
						<ul>
							<li className="muted-light">Academic researchers (PIs, postdocs)</li>
							<li className="muted-light">Core research facilities</li>
							<li className="muted-light">Industry scientists and executives</li>
							<li className="muted-light">Hospitals and clinical research groups</li>
							<li className="muted-light">AI/ML innovators and computational biologists</li>
							<li className="muted-light">Startups, entrepreneurs, and investors</li>
							<li className="muted-light">Students and early-career scientists</li>
						</ul>
					</details>
					<details className="item">
						<summary>Will there be abstract submissions?</summary>
						<p className="muted-light">Yes. We welcome abstracts from trainees, postdoctoral fellows and early career scientists. See our call for abstracts here (LINK). Please submit your abstract for the call appropriate to your career level.
							<br />
							Successful applicants will be selected for either an oral presentation or a digital poster (available virtually 72-hours prior and throughout the summit).
							<br />
							The abstract deadline is 5th January 2026, 23:59 PT.
						</p>
					</details>
					<details className="item">
						<summary>Are meals included?</summary>
						<p className="muted-light">Yes. Each ticket provides single-entry access for all 3 days and includes:
						</p>
						<ul>
							<li className="muted-light">Breakfast on Day 1, Day 2, and Day 3.</li>
							<li className="muted-light">All day Beverages and Snacks for all three days.</li>
							<li className="muted-light">Guaranteed networking breaks.</li>
							<li className="muted-light">Lunch on Day 1 and Day 2.</li>
						</ul>
					</details>
					<details className="item">
						<summary>Are there exhibitor opportunities?</summary>
						<p className="muted-light">Yes, we offer high-visibility exhibitor spaces. The MaRS Innovation Center will accommodate 6 feet by 30 inch tables.
							<br />
							For information regarding sponsorship opportunities, please click here or contact <a href="sponsorship@panoramics-a-vision.com">sponsorship@panoramics-a-vision.com</a>.
						</p>

					</details>
					<details className="item">
						<summary>How can industry and academia get involved?</summary>
						<p className="muted-light">Companies can participate via:</p>
						<ul>
							<li className="muted-light">Sponsorship packages</li>
							<li className="muted-light">Exhibitor booths</li>
							<li className="muted-light">Supporting awards and travel grants</li>
						</ul>

					</details>
					<details className="item">
						<summary>Who can I contact for enquiries?</summary>
						<p className="muted-light">Please contact the appropriate mailing address based on your query or question:
							<br />
							General TNS2026 - <a href="mailto:true-north-2026@panoramics-a-vision.com">true-north-2026@panoramics-a-vision.com</a>
							<br />
							Sponsorship - <a href="mailto:sponsorship@panoramics-a-vision.com">sponsorship@panoramics-a-vision.com</a>
							<br />
							General Panoramics - <a href="mailto:panoramics@panoramics-a-vision.com">panoramics@panoramics-a-vision.com</a></p>

					</details>
					<details className="item">
						<summary>Why sponsor?</summary>
						<p className="muted-light">We are expecting approximately 400 registrants coming from across North America and Europe.
							<br />
							Sponsoring True North Spatial provides:
						</p>
						<ul>
							<li className="muted-light">Direct visibility to Canada’s rapidly growing spatial-omics market.</li>
							<li className="muted-light">High-value networking with decision-makers and early adopters.</li>
							<li className="muted-light">Opportunities for tech demos, panels, and thought leadership.</li>
							<li className="muted-light">Recruitment pathways to top talent across universities and hospitals.</li>
							<li className="muted-light">Branding across the full three-day program.</li>
							<li className="muted-light">Strategic positioning in a national ecosystem that is expanding fast.</li>
						</ul>

					</details>
					<details className="item">
						<summary>What sponsorship opportunities are available?</summary>
						<p className="muted-light">We offer multi-tier packages (Panorama, Spatial, Connectome, Cellular, Nuclear, Organelle), with customizable options. For further details, please download our TNS2026 prospectus here.
							<br />
							For information regarding sponsorship opportunities, please click here or contact <a href="mailto:sponsorship@panoramics-a-vision.com">sponsorship@panoramics-a-vision.com</a> .
						</p>

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


