'use client';
import { useState } from 'react';

type ScheduleSession = {
  time: string;
  title: string | null;
  description?: string | null;
  speaker?: string | null;
  venue?: string | null;
  subtitle?: string | null;
  abstract?: string | null;
};


export default function ScheduleSection({ fullPage = false }: { fullPage?: boolean }) {
	const [active, setActive] = useState(0);
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSession | null>(null);

	// Schedule data with time, description, speaker, and venue
	const scheduleData: Record<string, ScheduleSession[]> = {
		day1: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium concourse"
			},
			{
				time: "09:00 — 09:30",
				title: "Opening Speech",
				description: "A warm welcome from the CEO and founder of Panoramics - A Vision Inc. Hear about Dr. Ayyadhury’s vision for the Canadian single cell and spatial biology landscape, and how she intends to help shape it.",
				speaker: "Shamini Ayyadhury (CEO, Founder of Panoramics - A Vision, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:30",
				title: "From Visible Embryos to Spatial Omics",
				subtitle: "From Visible Embryos to Spatial Omics",
				abstract: "Spatial biology did not begin as a platform. It began as a goal that was simply “too early.” In the early 1990s, the Visible Embryo Project (VEP) set out to digitize and reconstruct human embryonic development into a navigable, distributed 3D atlas built on the high‑performance computing and communications concepts of its era. In 1993, VEP collaborators articulated an even more ambitious extension: “Spatial Genomics,” a framework to correlate emerging Human Genome Project discoveries with precise location in tissue, turning gene activity into a quantitative layer inside a shared anatomical coordinate space. This keynote traces how those original VEP goals were impossible with the technologies available at the time, and how that gap between vision and capability forced a full-stack invention across imaging, computation, data models, and molecular measurement. At the center is the SAGA system (Spatial Analysis of Genomic Activity), designed in the late 1990s (patent applied for in 2000), which introduced the architectural pattern that defines modern spatial omics: build a 3D morphology, rasterize tissue, preserve coordinate identity via barcoding, perform broad-spectrum assays, then computationally remap signals back into anatomy for visualization and spatial analysis. The talk then explains why spatial omics took years to become dominant: early workflows were technically feasible but too costly and difficult to scale, and broad adoption required enabling innovations (including in situ and array-based approaches) before commercialization and standardization accelerated the field. The talk concludes with the state of the art and the most exciting near-future advances, 3D/4D biology, spatial multiomics, and AI-driven spatial models, followed by Dr. Doyle’s plan to establish a National Center for Spatial Science within the newly formed Institute for Medical Innovation at the University of Dubuque.",
				description: "Hear about the evolution of the field from its very beginnings to its current state from Dr. Michael Doyle, the father of spatial biology.",
				speaker: " Dr. Michael Doyle (Professor, New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: "Understanding endogenous mammalian stem cells using spatial transcriptomics",
				subtitle: "Understanding endogenous mammalian stem cells using spatial transcriptomics",
				abstract: "This talk will focus on work using single cell spatial transcriptomics to understand how endogenous stem cell populations contribute to the repair and regeneration of complex adult mammalian tissues. ",
				description: "This talk will focus on work using single cell spatial transcriptomics to understand how endogenous stem cell populations contribute to the repair and regeneration of complex adult mammalian tissues. ",
				speaker: "Dr. Freda Miller (Professor, University of British Columbia, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:00 — 11:15",
				title: "Break",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "11:15 — 11:45",
				title: "Unconventional species to understand regenerative healing",
				subtitle: "Unconventional species to understand regenerative healing",
				abstract: "Adult mammals typically heal deep skin wounds heal by forming fibrotic scar in order to most efficiently close the wound and ultimately prevent infection. But it is unclear as to the mechanisms that drive this propensity and whether there are ways to re-awaken a pro-regenerative process in order to better restore normal function to the skin. Here, I will describe our unconventional approach using captive adult reindeer that provides a powerful comparative model of scarless versus fibrotic skin wound healing. Full-thickness injuries in reindeer antler skin (velvet) exhibit near-complete regeneration, whereas back skin forms fibrotic scar. By employing  single-cell multi-omics we describe site-specific fibroblast transcriptional ground states that orchestrate distinct immune responses to injury, ultimately leading to regenerative or scar-forming healing outcomes. ",
				description: null,
				speaker: "Dr. Jeff Biernaskie (Professor, University of Calgary, Canada) ",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:45 — 12:05",
				title: "Connectome Sponsored Talk (Miltenyi Biotec)",
				subtitle: null,
				abstract: null,
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "12:05 — 12:15",
				title: "Organelle Sponsored Talk (PMGC)",
				subtitle: null,
				abstract: null,
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "12:15 — 12:25",
				title: "Sponsored Talk (Novogene)",
				subtitle: null,
				abstract: null,
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
			
			{
				time: "12:25 — 13:25",
				title: "Lunch & Networking",
				description: "Enjoy a catered lunch.",
				speaker: null,
				venue: "MaRS Auditorium / MaRS Concourse"
			},
			{
				time: "13:25 — 13:55",
				title: "Parsing human pancreatic cancer genotype to phenotype using spatial proteomics",
				subtitle: "Parsing human pancreatic cancer genotype to phenotype using spatial proteomics",
				abstract: "Distinctively, pancreatic ductal adenocarcinoma (PDAC) consists of sparse tumour lesions intertwined with extensive desmoplastic stroma which poses a challenge for accurate tumour profiling and patient stratification, and contributes to all tumours becoming profoundly resistant to therapy. Here we mapped the spatial relationships between tumour, stroma, and immune cell compartments delineating tumour and microenvironment types that expand the classical to basal spectrum of human PDAC. Combining multiplexed imaging with deep spatial proteomics and genomics, We show that the connections between tumour phenotype, vascularization, immune response, and stromal biophysical state are reinforced by genomic aberrations, altered by treatment, and associated with patient outcome. Machine-learning models using spatial single cell data outperformed genomic or clinical features but integrated multi-omics models provide the best prediction of patient survival. Together, these findings define a phenotypic and molecular framework of PDAC that captures tumour–microenvironment co-dependencies and offers a refined basis for patient stratification and therapeutic targeting.",
				description: null,
				speaker: "Dr. Hartland Jackson (Assistant Professor, Lunenfeld-Tanenbaum Research Institute, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "13:55 — 14:25",
				title: "“Inspire-me” Scientific Talk",
				description: "Dr. Robert Beattie is a developmental neurobiologist specializing in single-cell genetic lineage tracing using Mosaic Analysis with Double Markers (MADM). His work dissects how individual neural stem cells generate diversity in the developing brain. By resolving clonal relationships in vivo, his research provides insight into neurodevelopmental and neuropsychiatric disorders.",
				speaker: "Dr. Robert Beattie (University of Manitoba, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "14:25 — 14:35",
				title: "Sponsored Talk (Lunaphore)",
				description: null,
				speaker: null,
				venue: "MaRS Auditoriumx"
			},
			{
				time: "14:35 — 14:45",
				title: "Sponsored Talk (AmberGen)",
				description: null,
				speaker: null,
				venue: "MaRS Auditoriumx"
			},
			{
				time: "14:45 — 15:00",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "15:00 — 15:10",
				title: "Sponsored Talk (Stellaromics)",
				description: null,
				speaker: null,
				venue: "MaRS Auditoriumx"
			},
			{
				time: "15:10 — 15:20",
				title: "Groundbreaking insights with high-plex, high-resolution spatial biology",
				subtitle: "Groundbreaking insights with high-plex, high-resolution spatial biology",
				abstract: "Spatially resolved gene expression, or spatial transcriptomics, is a quantitative readout of either whole transcriptome or targeted gene expression mapped to specific locations in a tissue section, and a proven powerful method to understand cellular composition and activity in the native tissue context.  Spatial transcriptomics can also be achieved through imaging-based approaches—often referred to as microscopy-based spatial methods—where hundreds to thousands of mRNAs are imaged in situ. Our Xenium In Situ platform leverages this approach. A spatial gene expression readout can be combined with a histological stain or immunofluorescence protein detection in the same tissue section to elevate insights into tissue complexity.  Spatial transcriptomics can also be achieved through next-generation sequencing-based approaches, where mRNA is mapped in tissues at the whole transcriptome level and then sequenced ex vivo. Our Visium Spatial platform leverages this approach. ",
				description: null,
				speaker: "Rami Mechael, Sr. Account Executive - Central Canada, 10x Genomics",
				venue: "MaRS Auditoriumx"
			},
			{
				time: "15:20 — 15:50",
				title: "“Inspire-me” Scientific Talk",
				description: null,
				speaker: "Dr. Paul Robson (Professor at the Jackson Laboratory for Genomic Medicine Connecticut, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "15:50 — 17:15",
				title: "“Inspire-me” Scientific Talk + scientific debate co-moderator",
				description: "Dr. Jasmine Plummer directs the Center for Spatial OMICs at St. Jude and is an Associate Member of the St. Jude Faculty. Her research applies genomic and spatial technologies to understand disease mechanisms, with an emphasis on diverse populations. She is also a co-founder of GESTALT, the Global Alliance for Spatial Technologies.",
				speaker: "Dr. Jasmine Plummer (Director, Center for Spatial OMICs, St. Jude Children’s Research Hospital Tennessee, United States)",
				venue: "MaRS Auditorium"
			},
		],
		day2: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: null,
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "09:00 — 10:00",
				title: "Panoramic Insight",
				description: "Join the Creative Director at Panoramics - A Vision Inc., Dr. Ashleigh Willis, as she walks through the importance of trainees and emerging leaders in the Canadian spatial biology space and highlights how Panoramics - A Vision Inc. is trying to support them.",
				speaker: "Dr. Ashleigh Willis (	Creative Director, Panoramics - A Vision Inc., Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:00 — 10:30",
				title: "Enlighten Me - Perspective (Virtual)",
				description: "Gain valuable insight from world-renowned scientist, Prof. Garry Nolan from the University of Stanford. Prof. Nolan will share his unique perspective and experience in taking ideas from initial concept to innovative inventions that can be commercialized for the benefit of the scientific community.",
				speaker: " Prof. Garry Nolan (University of Stanford, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: "Break + Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "11:00 — 11:50",
				title: "Innovation in Spatial and Single Cell Biology",
				description: "This session will feature speakers who are driving innovation and pushing the boundaries of what’s possible in single cell and spatial biology. Stay tuned for the announcement of these exciting scientists.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "11:50 — 12:50",
				title: "Postdoctoral Fellow and Early Career Scientist selected talks",
				description: "Speakers for this session will be chosen from the top abstracts submitted and represent some of the most innovative and impactful work coming from our early career scientist community. These researchers are driving the future of science and discovery. Watch this space for the announcement of these outstanding speakers.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "12:50 — 13:50",
				title: "Student lunch",
				description: "We invite students to join us at our roundtable networking. Pick the brains of leaders from academia and industry while enjoying lunch.",
				speaker: null,
				venue: "TBD"
			},
			{
				time: "12:50 — 13:50",
				title: "General lunch + networking",
				description: null,
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "13:50 — 14:40",
				title: "Sponsor speaking sessions",
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights. Here you will hear from our featured speakers from the tech industry about how their latest innovations in spatial and single cell technologies are powering scientific breakthroughs.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "14:40 — 15:40",
				title: "Student showcase",
				description: "Celebrate the work of our incredible students as they present their single cell and spatial research.",
				speaker: null,
				venue: null
			},
			{
				time: "15:40 — 16:00",
				title: "Break + Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "16:00 — 17:30",
				title: "Professional skills development:  TBC",
				description: null,
				speaker: null,
				venue: null
			},
		],
		day3: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium concourse"
			},
			{
				time: "09:00 — 09:30",
				title: "Challenge Me - Opinion",
				description: "We invite you to hear Dr. Morag Park as she delivers an important introductory speech as we brace to step into the future. Dr. Morag is a well respected scientist, who has truly shown us what it means to think above and beyond and sets the stage for our day 3 agenda.",
				speaker: "Dr. Morag Park (McGill University, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:30",
				title: "Crossing Boundaries",
				description: "Dr. Morag Park will host this important session to pick the brains of scientists and dive deep into what it truly means to have meaningful public impact and the challenges that we need to face and ‘cross’ to drive a truly meaningful scientific journey.",
				speaker: "TBD",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "11:00 — 12:00",
				title: "Spatial Frontiers: The road ahead for spatial biology",
				description: "Engage in a moderated panel discussion which will focus on the future of single cell and spatial biology. ",
				speaker: "Dr. Shamini Ayyadhury (CEO, Panoramics - A Vision Inc.), Dr. Gary Bader (University of Toronto, Canada), Dr. Michael Doyle (New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:00 — 13:00",
				title: "Pioneers in Artificial Intelligence",
				description: "Hear from the pioneering scientists working at the frontier of artificial intelligence and its uses in the single cell and its spatial field.",
				speaker: "Dr. Xin Tang (Assistant Professor, University of British Columbia) + others TBC",
				venue: "MaRS Auditorium"
			},
			{
				time: "13:00 — 13:50",
				title: "General lunch + networking",
				description: null,
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "13:50 — 15:00",
				title: "Sponsor/Exhibitor Scientific Sessions",
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights. Here you will hear from our featured speakers from the tech industry about how their latest innovations in spatial and single cell technologies are powering scientific breakthroughs.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "15:00 — 15:30",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "15:30 — 16:30",
				title: "The Economics of Single Cell and Spatial Biology",
				description: "In this fireside discussion, a diverse range of stakeholders will discuss the current economic state of single cell and spatial biology research in Canada. This discussion will search for ideas on how we might improve feasibility and access for more researchers across the country.",
				speaker: null,
				venue: "MaRS Atrium"
			},
			{
				time: "16:30 — 17:00",
				title: "Closing speech",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
		]
	};

	const dayImages = {
        0: '/Inspire-me-banner.png', // Day 1 image
        1: '/Enlighten-me-banner.png', // Day 2 image
        2: '/Challenge-me-banner.png', // Day 3 image
    };

	
	return (
		<section className="schedule" id="schedule" style={fullPage ? { borderTop: 'none' } : {}}>
			<div className="schedule-bg" aria-hidden="true"></div>
			<div className="container">
				<div className="schedule-grid">
					<div className="row">
						<div className={`col-xs-12 ${fullPage ? '' : 'col-md-6'}`} style={fullPage ? { textAlign: 'center', marginBottom: '40px' } : {}}>

							<div className="schedule-header" style={fullPage ? { position: 'static' } : {}}>
								<div className="section-title">
									<span className="tag">Agenda Highlights</span>
									<h2>Three days of dynamic sessions across our three chapters.</h2>
									<p>What to expect at True North Spatial</p>
								</div>
								<div className="tab-list" role="tablist" style={fullPage ? { justifyContent: 'center' } : {}}>
									<button
										role="tab"
										aria-selected={active === 0}
										className="tab"
										onClick={() => setActive(0)}
									>
										25th March
									</button>
									<button
										role="tab"
										aria-selected={active === 1}
										className="tab"
										onClick={() => setActive(1)}
									>
										26th March
									</button>
									<button
										role="tab"
										aria-selected={active === 2}
										className="tab"
										onClick={() => setActive(2)}
									>
										27th March
									</button>
								</div>
								{fullPage && (
									<div className="schedule-banner" aria-hidden="true" style={{ marginTop: '24px', maxWidth: '500px', height: '250px', marginLeft: 'auto', marginRight: 'auto' }}>
										<img src={dayImages[active as keyof typeof dayImages]} alt={`Schedule for day ${active + 1}`} />
									</div>
								)}
								{!fullPage && (
									<div className="schedule-banner" aria-hidden="true">
										<img src={dayImages[active as keyof typeof dayImages]} alt={`Schedule for day ${active + 1}`} />
									</div>
								)}
							</div>
						</div>
						<div className={`col-xs-12 ${fullPage ? '' : 'col-md-6'}`} style={fullPage ? { marginTop: '32px' } : {}}>
							<div className="tab-panels">
								<div className={`tab-panel ${active === 0 ? 'is-active' : ''}`}>
									<h1 className='section-title'>Day 1 - March 25th - Inspire Me: A bold introduction</h1>
									{scheduleData.day1.map((session, index) => (
										<div key={index} className="session-card row">
											<div className="session-aside col-xs-4 col-md-3">
												<div className="session-time">{session.time}</div>
												{session.venue && (
													<div className="session-venue">{session.venue}</div>
												)}
											</div>
											<div className="session-content col-xs-8 col-md-9">
												
												{session.title && (
													<h3>{session.title}</h3>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{(session.subtitle || session.abstract) && (
													<button 
														className="btn btn-secondary" 
														onClick={() => setSelectedSchedule(session)}
													>
														Abstract
													</button>
												)}
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 1 ? 'is-active' : ''}`}>
								<h1 className='section-title'>Day 2 - March 26th  - Enlighten Me: Innovation and leadership in single cell and spatial biology</h1>
									{scheduleData.day2.map((session, index) => (
										<div key={index} className="session-card row">
											<div className="session-aside col-xs-4 col-md-3">
												<div className="session-time">{session.time}</div>
												{session.venue && (
													<div className="session-venue">{session.venue}</div>
												)}
											</div>
											<div className="session-content col-xs-8 col-md-9">
												{session.title && (
													<h3>{session.title}</h3>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{(session.subtitle || session.abstract) && (
													<button 
														className="btn btn-link" 
														onClick={() => setSelectedSchedule(session)}
													>
														See More
													</button>
												)}
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 2 ? 'is-active' : ''}`}>
								<h1 className='section-title'>Day 3 - March 27th - Challenge Me: A Panorama of the future</h1>

									{scheduleData.day3.map((session, index) => (
										<div key={index} className="session-card row">
											<div className="session-aside col-xs-4 col-md-3">
												<div className="session-time">{session.time}</div>
												{session.venue && (
													<div className="session-venue">{session.venue}</div>
												)}
											</div>
											<div className="session-content col-xs-8 col-md-9">
												{session.title && (
													<h3>{session.title}</h3>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{(session.subtitle || session.abstract) && (
													<button 
														className="btn btn-link" 
														onClick={() => setSelectedSchedule(session)}
													>
														See More
													</button>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			{selectedSchedule && (
        <ScheduleModal
          session={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
        />
      )}
		</section>
	);

	function ScheduleModal({
  session,
  onClose,
}: {
  session: ScheduleSession;
  onClose: () => void;
}) {
  return (
    <div className="person-modal-backdrop" onClick={onClose}>
      <div
        className="person-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={session.title || 'Session Details'}
      >
        <button
          type="button"
          className="person-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="person-modal-header">
          <div>
            {session.time && (
              <p className="person-modal-time" style={{ marginBottom: '8px', fontWeight: 'bold' }}>{session.time}</p>
            )}
            
            {session.subtitle && (
              <h3 className="person-modal-subtitle">{session.subtitle}</h3>
            )}
            {session.speaker && (
              <p className="person-modal-speaker"><strong>Speaker:</strong> {session.speaker}</p>
            )}
          </div>
        </div>

        {session.abstract && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ marginBottom: '8px' }}>Abstract</h4>
            <p className="person-modal-desc">
              {session.abstract}
            </p>
          </div>
        )}

        {session.description && !session.abstract && (
          <p className="person-modal-desc">
            {session.description}
          </p>
        )}

      </div>
    </div>
  );
}
}


