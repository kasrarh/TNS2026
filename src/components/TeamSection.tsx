

'use client';

import { useRef, useState, useEffect } from 'react';

export default function TeamSection() {
	const speakersTrackRef = useRef<HTMLDivElement | null>(null);
	const organizersTrackRef = useRef<HTMLDivElement | null>(null);
	
	// Touch/drag state for speakers
	const [speakersTouchStart, setSpeakersTouchStart] = useState(0);
	const [speakersTouchStartY, setSpeakersTouchStartY] = useState(0);
	const [speakersTouchScrollLeft, setSpeakersTouchScrollLeft] = useState(0);
	const [speakersIsDragging, setSpeakersIsDragging] = useState(false);
	const [speakersIsHorizontalDrag, setSpeakersIsHorizontalDrag] = useState(false);
	
	// Touch/drag state for organizers
	const [organizersTouchStart, setOrganizersTouchStart] = useState(0);
	const [organizersTouchStartY, setOrganizersTouchStartY] = useState(0);
	const [organizersTouchScrollLeft, setOrganizersTouchScrollLeft] = useState(0);
	const [organizersIsDragging, setOrganizersIsDragging] = useState(false);
	const [organizersIsHorizontalDrag, setOrganizersIsHorizontalDrag] = useState(false);

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

	const step = (trackRef: { current: HTMLDivElement | null }) => {
		if (!trackRef.current) return 800;
		const firstCard = trackRef.current.firstElementChild as HTMLElement;
		if (!firstCard) return 800;
		const cardWidth = firstCard.offsetWidth;
		const gap = 24; // gap between cards from CSS
		return (cardWidth + gap) * 2; // Two full cards
	};

	// Touch/drag handlers for speakers carousel
	const handleSpeakersTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
		if (!speakersTrackRef.current) return;
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		setSpeakersTouchStart(clientX);
		setSpeakersTouchStartY(clientY);
		setSpeakersTouchScrollLeft(speakersTrackRef.current.scrollLeft);
		setSpeakersIsDragging(true);
		setSpeakersIsHorizontalDrag(false);
		speakersTrackRef.current.style.scrollBehavior = 'auto';
	};

	const handleSpeakersTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
		if (!speakersIsDragging || !speakersTrackRef.current) return;
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		const deltaX = Math.abs(clientX - speakersTouchStart);
		const deltaY = Math.abs(clientY - speakersTouchStartY);
		
		// Determine if this is a horizontal or vertical drag
		// Only lock to horizontal if we haven't already determined direction and movement is significant
		if (!speakersIsHorizontalDrag && deltaX > 10 && deltaX > deltaY) {
			setSpeakersIsHorizontalDrag(true);
		}
		
		// Only prevent default and handle carousel if it's a horizontal drag
		if (speakersIsHorizontalDrag) {
			e.preventDefault();
			const x = clientX - speakersTouchStart;
			speakersTrackRef.current.scrollLeft = speakersTouchScrollLeft - x;
		}
		// If vertical movement is dominant, don't interfere - allow page scroll
	};

	const handleSpeakersTouchEnd = () => {
		if (!speakersTrackRef.current) return;
		setSpeakersIsDragging(false);
		setSpeakersIsHorizontalDrag(false);
		speakersTrackRef.current.style.scrollBehavior = 'smooth';
	};

	// Touch/drag handlers for organizers carousel
	const handleOrganizersTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
		if (!organizersTrackRef.current) return;
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		setOrganizersTouchStart(clientX);
		setOrganizersTouchStartY(clientY);
		setOrganizersTouchScrollLeft(organizersTrackRef.current.scrollLeft);
		setOrganizersIsDragging(true);
		setOrganizersIsHorizontalDrag(false);
		organizersTrackRef.current.style.scrollBehavior = 'auto';
	};

	const handleOrganizersTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
		if (!organizersIsDragging || !organizersTrackRef.current) return;
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		const deltaX = Math.abs(clientX - organizersTouchStart);
		const deltaY = Math.abs(clientY - organizersTouchStartY);
		
		// Determine if this is a horizontal or vertical drag
		// Only lock to horizontal if we haven't already determined direction and movement is significant
		if (!organizersIsHorizontalDrag && deltaX > 10 && deltaX > deltaY) {
			setOrganizersIsHorizontalDrag(true);
		}
		
		// Only prevent default and handle carousel if it's a horizontal drag
		if (organizersIsHorizontalDrag) {
			e.preventDefault();
			const x = clientX - organizersTouchStart;
			organizersTrackRef.current.scrollLeft = organizersTouchScrollLeft - x;
		}
		// If vertical movement is dominant, don't interfere - allow page scroll
	};

	const handleOrganizersTouchEnd = () => {
		if (!organizersTrackRef.current) return;
		setOrganizersIsDragging(false);
		setOrganizersIsHorizontalDrag(false);
		organizersTrackRef.current.style.scrollBehavior = 'smooth';
	};

	// Handle mouse leave and mouse up events globally
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (speakersIsDragging && speakersTrackRef.current) {
				const deltaX = Math.abs(e.clientX - speakersTouchStart);
				const deltaY = Math.abs(e.clientY - speakersTouchStartY);
				
				// Determine direction if not already set
				if (!speakersIsHorizontalDrag && deltaX > 10 && deltaX > deltaY) {
					setSpeakersIsHorizontalDrag(true);
				}
				
				// Only handle carousel if it's a horizontal drag
				if (speakersIsHorizontalDrag) {
					e.preventDefault();
					const x = e.clientX - speakersTouchStart;
					speakersTrackRef.current.scrollLeft = speakersTouchScrollLeft - x;
				}
			}
			if (organizersIsDragging && organizersTrackRef.current) {
				const deltaX = Math.abs(e.clientX - organizersTouchStart);
				const deltaY = Math.abs(e.clientY - organizersTouchStartY);
				
				// Determine direction if not already set
				if (!organizersIsHorizontalDrag && deltaX > 10 && deltaX > deltaY) {
					setOrganizersIsHorizontalDrag(true);
				}
				
				// Only handle carousel if it's a horizontal drag
				if (organizersIsHorizontalDrag) {
					e.preventDefault();
					const x = e.clientX - organizersTouchStart;
					organizersTrackRef.current.scrollLeft = organizersTouchScrollLeft - x;
				}
			}
		};

		const handleMouseUp = () => {
			if (speakersIsDragging && speakersTrackRef.current) {
				setSpeakersIsDragging(false);
				setSpeakersIsHorizontalDrag(false);
				speakersTrackRef.current.style.scrollBehavior = 'smooth';
			}
			if (organizersIsDragging && organizersTrackRef.current) {
				setOrganizersIsDragging(false);
				setOrganizersIsHorizontalDrag(false);
				organizersTrackRef.current.style.scrollBehavior = 'smooth';
			}
		};

		if (speakersIsDragging || organizersIsDragging) {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
		}

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [speakersIsDragging, organizersIsDragging, speakersTouchStart, organizersTouchStart, speakersTouchStartY, organizersTouchStartY, speakersTouchScrollLeft, organizersTouchScrollLeft, speakersIsHorizontalDrag, organizersIsHorizontalDrag]);

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
					<div className="carousel" data-carousel>
						<div 
							className="carousel-track team-carousel-track" 
							ref={speakersTrackRef}
							onTouchStart={handleSpeakersTouchStart}
							onTouchMove={handleSpeakersTouchMove}
							onTouchEnd={handleSpeakersTouchEnd}
							onMouseDown={handleSpeakersTouchStart}
							style={{ cursor: speakersIsDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
						>
							{speakers.map((p) => (
								<article key={p.name} className="person">
									<div className="avatar" aria-hidden="true">
										{p.image && 
										<img src={p.image} alt={p.name} style={{
											width: "100%",
											height: "355px",
											objectFit: "cover",
											borderRadius: "8px"
										}} />}
									</div>
									<div className="person-body">
										<h3>{p.name}</h3>
										<p className="muted">{p.role}</p>
										{p.desc && <p>{p.desc}</p>}
										<div className="socials">
											<a href={p.linkedin} aria-label="LinkedIn">in</a>
										</div>
									</div>
								</article>
							))}
						</div>
						<div className="carousel-controls">
							<button
								className="prev"
								aria-label="Previous speakers"
								onClick={() => speakersTrackRef.current?.scrollBy({ left: -step(speakersTrackRef), behavior: 'smooth' })}
							>
								‹
							</button>
							<button
								className="next"
								aria-label="Next speakers"
								onClick={() => speakersTrackRef.current?.scrollBy({ left: step(speakersTrackRef), behavior: 'smooth' })}
							>
								›
							</button>
						</div>
					</div>
				</div>
				<div className="team-subsection">
					<h3 className="subsection-title tx-dark">Organizers</h3>
					<div className="carousel" data-carousel>
						<div 
							className="carousel-track team-carousel-track" 
							ref={organizersTrackRef}
							onTouchStart={handleOrganizersTouchStart}
							onTouchMove={handleOrganizersTouchMove}
							onTouchEnd={handleOrganizersTouchEnd}
							onMouseDown={handleOrganizersTouchStart}
							style={{ cursor: organizersIsDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
						>
							{organizers.map((p) => (
								<article key={p.name} className="person">
									<div className="avatar" aria-hidden="true">
										{p.image && 
										<img src={p.image} alt={p.name} style={{
											width: "100%",
											height: "355px",
											objectFit: "cover",
											borderRadius: "8px"
										}} />}
									</div>
									<div className="person-body">
										<h3>{p.name}</h3>
										<p className="muted">{p.role}</p>
										{p.desc && <p>{p.desc}</p>}
										<div className="socials">
											<a href={p.linkedin} aria-label="LinkedIn">in</a>
										</div>
									</div>
								</article>
							))}
						</div>
						<div className="carousel-controls">
							<button
								className="prev"
								aria-label="Previous organizers"
								onClick={() => organizersTrackRef.current?.scrollBy({ left: -step(organizersTrackRef), behavior: 'smooth' })}
							>
								‹
							</button>
							<button
								className="next"
								aria-label="Next organizers"
								onClick={() => organizersTrackRef.current?.scrollBy({ left: step(organizersTrackRef), behavior: 'smooth' })}
							>
								›
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


