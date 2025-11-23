'use client';
import { useState } from 'react';

export default function ScheduleSection() {
	const [active, setActive] = useState(0);

	// Schedule data with time, description, speaker, and venue
	const scheduleData = {
		day1: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: "Inspire me: A bold introduction",
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
				title: "Inspire-Me Keynote",
				description: "Hear about the evolution of the field from its very beginnings to its current state from Dr. Michael Doyle, the father of spatial biology.",
				speaker: " Dr. Michael Doyle (Professor, New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: null,
				description: null,
				speaker: "Dr. Freda Miller (Professor, University of British Columbia, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:00 — 11:30",
				title: "Break",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "11:30 — 12:00",
				title: null,
				description: null,
				speaker: "Dr. Jeff Biernaskie (Professor, University of Calgary, Canada) ",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:00 — 12:30",
				title: null,
				description: null,
				speaker: "Dr. Hartland Jackson (Assistant Professor, Lunenfeld-Tanenbaum Research Institute, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:30 — 13:30",
				title: "Lunch & Networking",
				description: "Enjoy a catered lunch.",
				speaker: null,
				venue: "MaRS Auditorium / MaRS Concourse"
			},
			{
				time: "13:30 — 14:30",
				title: "Sponsor/Exhibitor Scientific Sessions",
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights. Here you will hear from the tech industry and how their latest innovations in spatial and single cell technologies are powering scientific breakthroughs.",
				speaker: null,
				venue: "MaRS Auditorium / MaRS Jewel Box"
			},
			{
				time: "14:30 — 15:00",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "15:00 — 15:30",
				title: null,
				description: null,
				speaker: "Dr. Robert Beattie (University of Manitoba Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "16:00 — 17:30",
				title: "SCIENTIFIC DEBATE",
				description: "Debaters to be announced soon!",
				speaker: null,
				venue: "MaRS Auditorium"
			},
		],
		day2: [
			{
				time: "08:00 — 09:00",
				title: "Enlighten me: Innovation and leadership in single cell and spatial biology",
				description: "Breakfast & Registration",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "09:00 — 10:00",
				title: "Panoramic Insight",
				description: "Join the Creative Director at Panoramics - A Vision Inc., Dr. Ashleigh Willis, as she walks through the importance of emerging leaders in the Canadian spatial biology space and highlights how Panoramics - A Vision Inc. is trying to support them.",
				speaker: null,
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
				title: "BREAK + Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "11:00 — 11:50",
				title: "Innovation in Spatial and Single Cell Biology",
				description: "Watch this space for speakers to be announced who will enlighten the audience with their innovative ideas in the spatial and single cell space.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "11:50 — 12:50",
				title: "Postdoc / Early career Scientists’ - selected talks",
				description: "Watch this space for speakers to be announced who will enlighten the audience with their innovative ideas in the spatial and single cell space.",
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
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights. Here you will hear from our featured speakers from the tech industry and how their latest innovations in spatial and single cell technologies are powering scientific breakthroughs",
				speaker: null,
				venue: "MaRS Auditorium / MaRS Jewel Box"
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
				title: "BREAK + Networking",
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
				title: "“Challenge me”: A Panorama of the future",
				description: "Breakfast & Registration",
				speaker: null,
				venue: "MaRS Auditorium concourse"
			},
			{
				time: "09:00 — 09:30",
				title: "Challenge me - Opinion",
				description: "We invite you to hear Dr. Morag Park as she delivers our most important introductory speech as we brace to step into the future. Dr. Morag is a well respected scientist, who has truly shown us what it means to think above and beyond and sets the stage for our day 3 agenda.",
				speaker: "Dr. Morag Park (McGill University, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:30",
				title: "Crossing Boundaries",
				description: "Dr. Morag Park will host this important session to pick the brains of scientists and dive deep deep into what it truly means to have meaningful public impact and the challenges that we need to face and ‘cross’ to drive a truly meaningful scientific journey.",
				speaker: "TBD",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: "BREAK + Networking",
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
				description: "Hear from the pioneering scientists working at the frontier of artificial intelligence and its uses in the single cell and spatial field.",
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
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights. Here you will hear from our featured speakers from the tech industry and how their latest innovations in spatial and single cell technologies are powering scientific breakthroughs.",
				speaker: null,
				venue: "MaRS Auditorium / MaRS Jewel Box"
			},
			{
				time: "15:00 — 15:30",
				title: "BREAK + Networking",
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
		<section className="schedule" id="schedule">
			<div className="schedule-bg" aria-hidden="true"></div>
			<div className="container">
				<div className="schedule-grid">
					<div className="row">
						<div className="col-xs-12 col-md-6">

							<div className="schedule-header">
								<div className="section-title">
									<span className="tag">Agenda Highlights</span>
									<h2>Three days of dynamic sessions across our three chapters.</h2>
									<p>What to expect at True North Spatial</p>
								</div>
								<div className="tab-list" role="tablist">
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
								<div className="schedule-banner" aria-hidden="true">
									<img src={dayImages[active as keyof typeof dayImages]} alt={`Schedule for day ${active + 1}`} />
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-md-6">
							<div className="tab-panels">
								<div className={`tab-panel ${active === 0 ? 'is-active' : ''}`}>
									<h1 className='section-title'>Day 1 - March 25th</h1>
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
												
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 1 ? 'is-active' : ''}`}>
								<h1 className='section-title'>Day 2 - March 26th</h1>
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
												
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 2 ? 'is-active' : ''}`}>
								<h1 className='section-title'>Day 3 - March 27th</h1>

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
												
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</section>
	);
}


