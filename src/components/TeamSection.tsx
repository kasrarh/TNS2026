

'use client';

import { useState } from 'react';

export default function TeamSection() {
	const [showAllSpeakers, setShowAllSpeakers] = useState(false);
	const [showAllOrganizers, setShowAllOrganizers] = useState(false);
	const speakers = [
		{ name: 'Dr. Shamini Ayyadhury', role: 'Research Scientist', desc: 'Works on multi-modal representation learning and efficient training.' },
		{ name: 'Dr. Michael Doyle', role: 'Engineer', desc: 'Deploys vision systems on-device and in the cloud.' },
		{ name: 'Dr. Freda Miller', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Dr. Jeff Biernaskie', role: 'Research Engineer', desc: 'Efficient transformers and quantization strategies.' },
		{ name: 'Dr. Maryam Faiz', role: 'Designer', desc: 'Human-in-the-loop tools for ML-assisted creation.' },
		{ name: 'Dr. Robert Beattie', role: 'PM', desc: 'Bridging research and product with program strategy.' },
		{ name: 'Dr. Gary Bader', role: 'PM', desc: 'Bridging research and product with program strategy.' },
		{ name: 'Dr. Garry Nolan', role: 'PM', desc: 'Bridging research and product with program strategy.' },
		{ name: 'Dr. Morag Park ', role: 'PM', desc: 'Bridging research and product with program strategy.' },
	];
	const organizers = [
		{ name: 'Dr. Shamini Ayyadhury', role: 'Engineer', desc: 'Deploys vision systems on-device and in the cloud.' },
		{ name: 'Alyona Ivanova', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Dr. Ashleigh Willis', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Arzu Kirici', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Suluxan Mohanraj', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Kasra Rahimian', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Sarah Ebert', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Smrithi Dhanasekar', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Nikol', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Mackenzie Collins', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Iz Rose', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Anurag Das', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
		{ name: 'Kam Lo', role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.' },
	];

	const visibleSpeakers = showAllSpeakers ? speakers : speakers.slice(0, 3);
	const visibleOrganizers = showAllOrganizers ? organizers : organizers.slice(0, 3);
	const hasMoreSpeakers = speakers.length > 3;
	const hasMoreOrganizers = organizers.length > 3;
	return (
		<section className="team bg-light" id="team">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">Meet Our Team</span>
					<h2 className="tx-dark">Speakers & Organizers</h2>
					<p className="muted-dark">Leaders across academia and industry.</p>
				</div>
				<div className="team-subsection">
					<h3 className="subsection-title tx-dark">Speakers</h3>
					<div className="team-grid">
						{visibleSpeakers.map((p, index) => (
							<article 
								key={p.name} 
								className={`person ${showAllSpeakers ? 'animate-in' : ''}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
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
					{hasMoreSpeakers && (
						<div className="team-toggle">
							<button
								onClick={() => setShowAllSpeakers(!showAllSpeakers)}
								className="see-more-btn"
								aria-expanded={showAllSpeakers}
							>
								{showAllSpeakers ? 'See Less' : 'See More'}
							</button>
						</div>
					)}
				</div>
				<div className="team-subsection">
					<h3 className="subsection-title tx-dark">Organizers</h3>
					<div className="team-grid">
						{visibleOrganizers.map((p, index) => (
							<article 
								key={p.name} 
								className={`person ${showAllOrganizers ? 'animate-in' : ''}`}
								style={{ animationDelay: `${index * 0.1}s` }}
							>
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
					{hasMoreOrganizers && (
						<div className="team-toggle">
							<button
								onClick={() => setShowAllOrganizers(!showAllOrganizers)}
								className="see-more-btn"
								aria-expanded={showAllOrganizers}
							>
								{showAllOrganizers ? 'See Less' : 'See More'}
							</button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}


