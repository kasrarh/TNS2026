export default function TeamSection() {
	return (
		<section className="team bg-light" id="team">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">Meet Our Team</span>
					<h2 className="tx-dark">Speakers & Organizers</h2>
					<p className="muted-dark">Leaders across academia and industry.</p>
				</div>
				<div className="team-grid">
					{[
						{ name: 'Alex Kim', role: 'Research Scientist', desc: 'Works on multi-modal representation learning and efficient training.' },
						{ name: 'Sam Rivera', role: 'Engineer', desc: 'Deploys vision systems on-device and in the cloud.' },
						{ name: 'Taylor Chen', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
						{ name: 'Jordan Lee', role: 'Research Engineer', desc: 'Efficient transformers and quantization strategies.' },
						{ name: 'Priya Singh', role: 'Designer', desc: 'Human-in-the-loop tools for ML-assisted creation.' },
						{ name: 'Mina Park', role: 'PM', desc: 'Bridging research and product with program strategy.' },
					].map((p) => (
						<article key={p.name} className="person">
							<div className="avatar" aria-hidden="true"></div>
							<div className="person-body">
								<h3>{p.name}</h3>
								<p className="muted">{p.role}</p>
								<p>{p.desc}</p>
								<div className="socials">
									<a href="#" aria-label="LinkedIn">in</a>
									<a href="#" aria-label="X">x</a>
									<a href="#" aria-label="Dribbble">dr</a>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}


