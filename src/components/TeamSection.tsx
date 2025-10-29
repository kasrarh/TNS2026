

'use client';

import { useState } from 'react';

export default function TeamSection() {
	const [showAllSpeakers, setShowAllSpeakers] = useState(false);
	const [showAllOrganizers, setShowAllOrganizers] = useState(false);
	const speakers = [
		{ name: 'Dr. Morag Park', image: null, role: 'Director at Goodman Cancer research Centre', desc: null, linkedin: 'https://www.linkedin.com/in/morag-park-169084136/' },
		{ name: 'Dr. Michael Doyle', image: "/team-members/michael-doyle.jpeg", role: 'Professor, and Chair of Biology at New Mexico Tech', desc: 'Scientist, educator and entrepreneur.  Pioneer in spatial biology, cryptography, decentralized & mobile AI, quantum, and Web tech (and dabbler in cosmology).  Expert in university innovation management.  Deep experience in university/industry collaborations, intellectual property strategy & management, tech industry corporate management, government relations, business development, & strategic planning.', linkedin: 'https://www.linkedin.com/in/mikefios/' },
		{ name: 'Dr. Garry Nolan', image: "/team-members/garry-nolan.jpeg", role: 'Life Sciences, Bioinformatics', desc: 'My research in the last several years has established that it is possible to analyze with considerable resolution cellular events at the single cell level in human patient samples or in primary cells from animal models.  Our efforts have been focused on understanding kinase-based signaling networks in normal and diseased cells.   We have examined the pathological disturbances in the immune system, like autoimmunity,  and cancer. In parallel,   we study  normal immune activation and differentiation events in hematopoiesis .', linkedin: 'https://www.linkedin.com/in/garry-nolan-0b4315/' },
		{ name: 'Dr. Freda Miller', image: null, role: 'Professor', desc: null, linkedin: '#' },
		{ name: 'Dr. Jeff Biernaskie', image: "/team-members/jeff-biernaskie.jpeg", role: 'Professor, Faculty of Veterinary Medicine & Dept of Surgery, Cumming School of MedicineUniversity of Calgary |  Co-Founder & Scientific Lead, FibroDynamx', desc: null, linkedin: 'https://www.linkedin.com/in/jeff-biernaskie-29b04940/' },
		{ name: 'Dr. Maryam Faiz', image: null, role: 'Designer', desc: null, linkedin: '#' },
		{ name: 'Dr. Shamini Ayyadhury', image: "/team-members/shamini.JPEG", role: 'Scientific Associate at UHN | Founder, CEO of PANORAMICS - A Vision | CTO at Astraea Bio', desc: 'As Founder, CEO of Panoramics: A Vision, a collaborative platform for innovation in spatial and single-cell research. Our events and research focus on enabling, testing and developing spatial and single cell methodologies for pedagogy, organizing thought provoking discussions for policy changes , networking events to enhance collaborations and drive disruptive technology and scientific  developments and futuristic support for expansion and legacy initiatives.', linkedin: 'https://www.linkedin.com/in/sayyadhury/' },
		{ name: 'Dr. Robert Beattie', image: "/team-members/robert-beattie.jpeg", role: 'Assistant Professor at University of Manitoba', desc: 'Research Specialities: MADM, Radial Glial Progenitors, Neural Stem Cells, Gliogenesis, Astrocytes, cortical development, neurogenesis, brain development', linkedin: 'https://www.linkedin.com/in/beattie/' },
		{ name: 'Dr. Gary Bader', image: "/team-members/gary-bader.jpeg", role: 'Professor, Computational Biology, University of Toronto', desc: 'We study the organization and evolution of biological systems using computational biology and bioinformatics techniques. We seek to accurately predict links, such as specific molecular interactions, in eukaryotic cell signaling systems using comprehensive genomics data like genome sequence and transcript profiles. We are interested to find how these links are rewired by mutations to cause disease. This work is supported through the development of open-source biological pathway and network databases and visualization and analysis software.', linkedin: 'https://www.linkedin.com/in/gary-bader-a08673/' },
	];

	const organizers = [
		{ name: 'Dr. Shamini Ayyadhury', image: "/team-members/shamini.JPEG", role: 'Scientific Associate at UHN | Founder, CEO of PANORAMICS - A Vision | CTO at Astraea Bio', desc: 'Deploys vision systems on-device and in the cloud.', linkedin: '#' },
		{ name: 'Alyona Ivanova', image: "/team-members/alyona.jpg", role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Dr. Ashleigh Willis', image: "/team-members/ashleigh.png", role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Arzu Kirici', image: "/team-members/arzu-kirici.jpg", role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Suluxan Mohanraj', image: "/team-members/suluxan.jpg", role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Kasra Rahimian', image: "/team-members/kasra-rahimian.jpg", role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Sarah Ebert', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Smrithi Dhanasekar', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Nikol', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Mackenzie Collins', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Iz Rose', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Anurag Das', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
		{ name: 'Kam Lo', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
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
								<div className="avatar" aria-hidden="true">
									{p.image && 
									<img src={p.image} alt={p.name} style={{
										width: "100%",
										height: "355px",
										objectFit: "cover", // or "contain", "fill", "scale-down"
										borderRadius: "8px"
									}} />}
								</div>
								<div className="person-body">
									<h3>{p.name}</h3>
									<p className="muted">{p.role}</p>
									<p>{p.desc}</p>
									<div className="socials">
										<a href={p.linkedin} aria-label="LinkedIn">in</a>
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
								<div className="avatar" aria-hidden="true">
									{p.image && 
									<img src={p.image} alt={p.name} style={{
										width: "100%",
										height: "355px",
										objectFit: "cover", // or "contain", "fill", "scale-down"
										borderRadius: "8px"
									}} />}
								</div>
								<div className="person-body">
									<h3>{p.name}</h3>
									<p className="muted">{p.role}</p>
									<p>{p.desc}</p>
									<div className="socials">
										<a href={p.linkedin} aria-label="LinkedIn">in</a>
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


