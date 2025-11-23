

'use client';

import { useRef, useState, useEffect } from 'react';
import { useAutoScroll } from "@/hooks/useAutoScroll";
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
		{ name: 'Dr. Shamini Ayyadhury', city: 'Ontario, Canada', image: "/team-members/shamini.JPEG", role: 'Founder, CEO of Panoramics - A Vision Inc | Scientific Associate, UHN', desc: 'Dr. Shamini Ayyadhury is a computational biologist who works at the cutting edge of single cell and spatial biology, her work encompasses a deep understanding of analysis methods, machine learning and deep biological insight. As founder and CEO of Panoramics - A Vision Inc, she leads a pan-Canadian effort that unites computational, experimental and clinical expertise in the single cell and spatial biology community. As summit chair, her leadership and vision are at the heart of True North Spatial 2026, where she initiated the idea and has shaped a program that brings innovators together to push the boundaries of the field.', linkedin: 'https://www.linkedin.com/in/sayyadhury/' },
		{ name: 'Dr. Michael Doyle', city: 'New Mexico, USA', image: "/team-members/michael-doyle.jpeg", role: 'Professor, Chair of Biology, Provost Fellow, New Mexico Tech', desc: 'Dr. Michael Doyle, often referred to as the “father of spatial biology”, pioneered early work in spatial biology, including the revolutionary Visible Embryo Project through which he invented the first system for spatial transcriptomics. As a scientist, educator, inventor and entrepreneur, Dr. Doyle’s work spans fields that include next generation AI for spatial biology, advanced imaging, cloud computing and data security. In his keynote address, Dr. Doyle will map the evolution of the spatial biology field from its origins to the present day, and share his vision for the innovations that will shape the future.', linkedin: 'https://www.linkedin.com/in/mikefios/' },
		{ name: 'Dr. Freda Miller', city: 'British Columbia, Canada', image: "/team-members/freda-miller.png", role: 'Professor, Michael Smith Laboratories (Deputy Director), Department of Medical Genetics, School of Biomedical Engineering, ICORD, University of British Columbia', desc: "Dr. Freda Miller is a world leading stem cell biologist and neuroscientist who has transformed our understanding of neural stem cells, brain development, brain repair and the regeneration and healing of other peripheral tissues, including the murine digit tip and nerve. Her lab combines cutting-edge single cell sequencing, spatial transcriptomic and multiomic approaches with in vivo murine models, to understand how stem cells respond to their environment during development and following injury. Through her innovative use of these approaches, Dr. Miller continues to reveal fundamental mechanisms in development and regeneration.", linkedin: 'https://www.msl.ubc.ca/people/dr-freda-miller/' },
		{ name: 'Dr. Jeffrey Biernaskie', city: 'Alberta, Canada', image: "/team-members/jeff-biernaskie.jpg", role: 'Professor in Regenerative Medicine at Veterinary Medicine, Alberta Children’s Hospital and Hotchkiss Brain Institute, University of Calgary | Calgary Firefighters Burn Treatment Chair in Skin Regeneration and Healing ', desc: "Dr. Jeff Biernaskie is an internationally recognized stem cell and regenerative medicine biologist whose research focuses on the mechanisms that govern tissue repair. His lab uses single cell and spatial transcriptomic approaches to understand the cellular and molecular mechanisms that promote fibrotic vs. regenerative healing with the goal of identifying therapies which limit scar and restore organ function following injury or disease. Working across a remarkable range of mammalian systems, including mouse skin, nerve and brain, along with the reindeer antler, Dr Biernaskie’s work uncovers fundamental mechanisms in tissue repair and regeneration.", linkedin: 'https://www.linkedin.com/in/jeff-biernaskie-29b04940/' },
		{ name: 'Dr. Robert Beattie', city: 'Manitoba, Canada', image: "/team-members/robert-beattie.jpeg", role: 'Assistant Professor, Max Rady College of Medicine, University of Manitoba | Research Scientist, Children’s Hospital of Manitoba', desc: 'Dr. Robert Beattie is a developmental neurobiologist who applies Mosaic Analysis with Double Markers (MADM), a powerful single-cell genetic lineage tracing technology, to dissect how individual neural stem cells generate diversity in the developing brain. His lab resolves clonal relationships and cellular behaviors with true single-cell precision in vivo, and his work has revealed mechanisms of lineage progression that are inaccessible to traditional single-cell sequencing or imaging approaches. By applying MADM, Dr. Beattie investigates developmental disruptions that contribute to neurodevelopmental and neuropsychiatric disorders, offering new insight into conditions such as autism, schizophrenia, and Rett syndrome.', linkedin: 'https://www.linkedin.com/in/beattie/' },
		{ name: 'Dr. Gary Bader', city: 'Ontario, Canada', image: "/team-members/gary-bader.webp", role: 'Professor, Terrance Donnelly Centre for Cellular & Biomolecular Research, Lunenfeld-Tanenbaum Research Institute, UHN, Department of Computer Science University of Toronto', desc: 'Dr. Gary Bader is a leading computational biologist whose lab develops advanced models which aim to understand how cells function and how disease arises from dysregulated molecular networks. His team integrates single cell, genomic, transcriptomic, and multiomic data using novel computational frameworks to enable discoveries with real-world impact. Dr. Bader’s approach has driven major advances in therapeutics, including the identification of the first potential targeted therapy for childhood brain cancer.', linkedin: 'https://www.linkedin.com/in/gary-bader-a08673/' },
		{ name: 'Dr. Garry Nolan', city: 'California, USA', image: "/team-members/garry-nolan.jpg", role: 'Professor, Pathology, Stanford | Member, Bio-X, Stanford Cancer Institute, Maternal & Child Health Research Institute, Wu Tsai Human Performance Alliance', desc: "Dr. Garry Nolan is a pioneering scientist, inventor and entrepreneur whose groundbreaking technological innovations have reshaped the single cell and systems biology landscape. Together with Canadian scientist, Dr. Scott Taner, Dr. Nolan developed CyTOF: an invention which has been transformative for the field's ability to map cellular diversity at the single cell proteomic level with unmatched depth. Dr Nolan and his lab continue to drive innovation in spatial biology, network analysis, immune system engineering, and AI, making him an incredibly influential figure in advancing the future of biomedical research and discovery.", linkedin: 'https://www.linkedin.com/in/garry-nolan-0b4315/' },
		{ name: 'Dr. Morag Park', city: 'Quebec, Canada', image: "/team-members/morag-park.jpg", role: 'Professor, Department of Biochemistry, Medicine and Oncology, McGill University | Director, Rosalind and Morris Goodman Cancer Centre ', desc: "Dr. Morag Park is a leading cancer biologist whose work has fundamentally advanced our understanding of tumour biology, heterogeneity and the microenvironmental cues that drive breast cancer progression. Her lab combines single-cell and spatial transcriptomic methods, and advanced multiplexed spatial imaging to map the architecture of human tumours, uncovering how stromal, immune and malignant compartments interact to drive disease trajectory. Dr. Park’s application of single cell and spatial approaches has revealed clinically important tumour subtypes and microenvironmental cues that impact prognosis and opened potential novel avenues for therapeutics.", linkedin: 'https://www.linkedin.com/in/morag-park-169084136/' },
		{ name: 'Dr. Hartland Jackson', city: 'Ontario, Canada', image: "/team-members/Hartland.png", role: 'Assistant Professor Lunenfeld-Tanenbaum Research Institute, Toronto | Canada Research Chair (Tier II) in Systems Pathology ', desc: "Dr Hartland Jackson is a cancer biologist whose research pioneers the use of highly multiplexed mass spectrometry imaging, integrated with advanced computational methods, to analyze spatially resolved single cell data within the complex tumour environment. His approach enables the screening of distinct cellular clones in murine disease models and has contributed to the identification of biomarkers associated with clinical outcome in human tissues. Dr. Jackson’s group is transforming our understanding of the tumour microenvironment, revealing single-cell defined patient subgroups with distinct prognoses and uncovering the multicellular interactions that drive disease progression.", linkedin: 'https://www.linkedin.com/in/hartlandjackson/' },
		{ name: 'Dr. Xin Tang', city: 'British Columbia, Canada', image: "/team-members/Xin_Tang.png", role: 'Assistant Professor, Michael Smith Laboratories, University of British Columbia', desc: "Dr. Xin Tang leads a research programme at the intersection of AI, single cell and spatial biology. Dr. Tang and his group develop biologically informed, explainable AI models that predict cellular behaviour across time from multiomic data, ultimately enabling in silico experimentation. Dr. Tang's work is guiding us toward a better understanding of aging, cancer and neurodegeneration, and his novel approaches are moving us closer to meaningful predictive, model-based biology.", linkedin: 'https://www.linkedin.com/in/beattie/' },
	];

	const organizers = [
		{ name: 'Dr. Shamini Ayyadhury', image: "/team-members/shamini.JPEG", role: 'Founder, CEO of Panoramics - A Vision Inc | Scientific Associate, UHN', desc: 'Dr. Shamini Ayyadhury is a computational biologist who works at the cutting edge of single cell and spatial biology, her work encompasses a deep understanding of analysis methods, machine learning and deep biological insight. As founder and CEO of Panoramics - A Vision Inc, she leads a pan-Canadian effort that unites computational, experimental and clinical expertise in the single cell and spatial biology community. As summit chair, her leadership and vision are at the heart of True North Spatial 2026, where she initiated the idea and has shaped a program that brings innovators together to push the boundaries of the field. ', linkedin: 'https://www.linkedin.com/in/sayyadhury/' },
		{ name: 'Alyona Ivanova', image: "/team-members/Alyona.jpg", role: 'PANORAMICS Executive team member and Creative Content Maestro', desc: 'instrumental in organizing impactful and engaging events and orchestrating content creation.', linkedin: 'https://www.linkedin.com/in/alyona-ivanova-skate22/' },
		{ name: 'Dr. Ashleigh Willis', image: "/team-members/ashleigh.png", role: "Postdoctoral fellow and PANORAMICS - A vision's executive team member", desc: 'Dr. Ashleigh Willis investigates forebrain neural stem cells respond to injury and how their microenvironment guides their activation, fate and regenerative potential. She combines single cell sequencing and spatial transcriptomics with murine in vivo models of injury and disease to uncover how endogenous neural stem cells might be harnessed to repair the brain. As Creative Director at Panoramics – A Vision, Dr. Willis works to curate meaningful educational and professional development opportunities to early career scientists.', linkedin: 'https://www.linkedin.com/in/ashleigh-willis-06a724142/' },
		{ name: 'Arzu Kirici', image: "/team-members/arzu-kirici.jpg", role: 'Marketing & Communications Specialist', desc: 'Computational Biologist with a molecular biology background, focusing on spatial analysis and developing software. ', linkedin: 'https://www.linkedin.com/in/arzu-kirici/' },
		{ name: 'Suluxan Mohanraj', image: "/team-members/suluxan.JPG", role: 'Innovation Architect', desc: 'Involved in identifying emerging technologies, streamlining data accessibility, and building platforms that empower researchers to unlock new insights in bioinformatics.', linkedin: 'https://www.linkedin.com/in/suluxan/' },
		{ name: 'Kasra Rahimian', image: "/team-members/kasra-rahimian.jpg", role: 'Conference Website Architect', desc: "Software developer and designer with a multidisciplinary background in digital solutions, research support, and engineering. Currently focused on bringing Panoramics' web app to life while exploring creative side projects.", linkedin: 'https://www.linkedin.com/in/kasrarahimian/' },
		{ name: 'Smrithi Dhanasekar', image: "/team-members/Smrithi.jpeg", role: 'Content Creator', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: 'https://www.linkedin.com/in/smrithi-dhanasekar/' },
		{ name: 'Nikol Leshchyshyn', image: "/team-members/Nikol.jpeg", role: ' Communications specialist', desc: "Involved in crafting clear, engaging narratives that communicate PANORAMICS' mission, foster scientific dialogue , and amplify the impact of spatial and singe-cell multi-omics research.", linkedin: 'https://www.linkedin.com/in/nikolleshchyshyn/' },
	];

	//  { name: 'Sarah Ebert', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
	// 	{ name: 'Anurag Das', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
	// 	{ name: 'Kam Lo', image: null, role: 'Professor', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: '#' },
	// { name: 'Dr. Maryam Faiz', city: 'Alberta, Canada', image: null, role: 'Associate Professor, Cumming School of Medicine, University of Calgary | Member, Hotchkiss Brain Institute | Child Health & Wellness Researcher, Alberta Children’s Hospital Research Institute', desc: "Dr. Maryam Faiz is a neuroscientist whose research aims to identify new treatments for brain injury and disease by uncovering the diverse roles of astrocytes. Her work integrates single cell and spatial biology approaches to define astrocyte heterogeneity, astrocyte reprogramming into other brain cell types, and reveal how peripheral signals shape astrocyte responses in the injured brain. Together with her collaborators, Dr. Faiz developed the tDISCO platform which enables spatially resolved single cell transcriptomics and proteomics; her group have applied this technology to dissect astrocyte dynamics following cortical ischemic stroke.", linkedin: '#' },


	const step = (trackRef: { current: HTMLElement | null }) => {
		if (!trackRef.current) return 800;
		const firstCard = trackRef.current.firstElementChild as HTMLElement;
		if (!firstCard) return 800;
		const cardWidth = firstCard.offsetWidth;
		const gap = 24; // gap between cards from CSS
		return (cardWidth + gap) * 2; // Two full cards
	};

	useAutoScroll(speakersTrackRef,10,5000);
	useAutoScroll(organizersTrackRef,10,5000);

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
		<section className="team" id="team">
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


