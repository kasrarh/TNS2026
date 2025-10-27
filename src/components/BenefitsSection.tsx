export default function BenefitsSection() {
	return (
		<section className="benefits bg-light" id="benefits">
			<div className="container">
				<div className="section-title">
					<span className="tag tx-light">Research Benefits</span>
					<h2 className="tx-dark">Why attend</h2>
					<p className="muted-dark">Concrete takeaways, not just theory.</p>
				</div>
				<div className="two-cards">
					<article className="side-card">
						<div className="side-media" aria-hidden="true"></div>
						<div className="side-body">
							<span className="tag">Practice</span>
							<h3>Blueprints you can reuse</h3>
							<p>Reference architectures and evaluation playbooks from real deployments.</p>
							<a className="text-link" href="#">Explore</a>
						</div>
					</article>
					<article className="side-card">
						<div className="side-media" aria-hidden="true"></div>
						<div className="side-body">
							<span className="tag">People</span>
							<h3>Connect with experts</h3>
							<p>Build your network across labs, startups, and platform teams.</p>
							<a className="text-link" href="#">Explore</a>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}


