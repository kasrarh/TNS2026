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
				description: "Enjoy a catered breakfast.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "09:00 — 09:30",
				title: "Opening Speech",
				description: "A warm welcome from the CEO and founder of Panoramics – A Vision Inc. Hear about Dr. Ayyadhury’s vision for the Canadian spatial biology landscape, and how she intends to help shape it.",
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
				time: "11:15 — 11:45",
				title: null,
				description: null,
				speaker: "Dr. Jeff Biernaskie (Professor, University of Calgary, Canada) ",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:45 — 12:15",
				title: null,
				description: null,
				speaker: "Dr. Hartland Jackson (Assistant Professor, Lunenfeld-Tanenbaum Research Institute, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:15 — 13:00",
				title: "Lunch",
				description: "Enjoy a catered lunch.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "13:00 — 14:30",
				title: "Sponsor speaking sessions",
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "14:30 — 15:00",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "15:00 — 16:00",
				title: "Investigative science",
				description: "Hear from a range of incredible investigative researchers who are developing and utilizing spatial biology techniques to uncover exciting new insights in basic scientific research.",
				speaker: "Dr. Robert Beattie (University of Manitoba Canada), and more!",
				venue: "MaRS Auditorium"
			},
			{
				time: "15:00 - 16:00",
				title: "Translational science",
				description: "Learn how scientists from across the country have been employing single cell and spatial biology methods to make discoveries that hold promise in the clinic.",
				speaker: "Speakers to be announced soon!",
				venue: "Jewel Box"
			},
		],
		day2: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: "Enjoy a catered breakfast.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "09:00 — 10:00",
				title: "Enlighten Me - Introduction",
				description: "Join the Creative Director at Panoramics - A Vision, Dr. Ashleigh Willis, as she walks through the importance of emerging leaders in the Canadian spatial biology space and highlights how Panoramics - A Vision Inc is trying to support them.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "10:00 — 11:15",
				title: "Enlighten Me - Perspective (Virtual)",
				description: "Gain valuable insight from world-renowned scientist, Prof. Garry Nolan from the University of Stanford. Prof. Nolan will share his unique perspective and experience in taking ideas from initial concept to innovative inventions that can be commercialized for the benefit of the scientific community.",
				speaker: " Prof. Garry Nolan from the University of Stanford. (USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:15 — 12:00",
				title: "Innovation in Canada",
				description: "Discover home-grown innovation in single cell and spatial biology.",
				speaker: "Dr. Maryam Faiz (University of Calgary, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:00 — 13:00",
				title: "Student lunch",
				description: "We invite students to join us at our roundtable networking. Pick the brains of leaders from academia and industry while enjoying lunch",
				speaker: null,
				venue: "Jewel Box"
			},
			{
				time: "13:00 — 14:00",
				title: "Sponsor speaking sessions",
				description: "Discover the latest advances in single cell and spatial biology technologies from our sponsor highlights.",
				speaker: null,
				venue: null
			},
			{
				time: "14:00 — 15:00",
				title: "Student showcase",
				description: "Celebrate the work of our incredible Canadian students as they present their single cell and spatial research in a rapid-fire format.",
				speaker: null,
				venue: null
			},
			{
				time: "15:00 — 16:15",
				title: "Professional skills development: Design thinking in science",
				description: "Our interactive workshop will guide you through the principles of “design thinking” and apply these concepts to scientific careers of all stages.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "16:15 — 17:00",
				title: "Back to basics: spatial biology",
				description: "This workshop, geared toward biologists, will provide foundational knowledge in single cell and spatial biology methods. From technology selection, experimental design and basic data analysis, participants will leave with a strong knowledge of foundational principles that can be applied in their work.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "16:15 — 17:00",
				title: "The good, the bad and the ugly: Compute resource management",
				description: "Understand the computational resources required for single cell and spatial biology datasets. Learn about the useful resources available, along with some of the pitfalls.",
				speaker: null,
				venue: "Jewel Box"
			},
			{
				time: "18:30",
				title: "Summit dinner",
				description: "Mingle with fellow attendees over dinner as we celebrate our first single cell and spatial biology summit.",
				speaker: null,
				venue: null
			},
		],
		day3: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: "Enjoy a catered breakfast.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "09:00 — 10:00",
				title: "Challenge me - Opinion",
				description: null,
				speaker: "Dr. Morag Park (McGill University, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:00 — 12:00",
				title: "Spatial Frontiers: The road ahead for spatial biology",
				description: "Engage in a moderated panel discussion which will focus on the future of single cell and spatial biology. ",
				speaker: "Dr Shaminin Ayyadhury (CEO, Panoramics - A Vision Inc), Dr. Gary Bader (University of Toronto, Canada), Dr. Michael Doyle (New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:00 — 12:15",
				title: "Challenge Me - Perspective",
				description: null,
				speaker: "Dr. Bo Wang (Chief Artificial Intelligence Officer, UHN, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:15 — 13:00",
				title: "Pioneers in Artificial Intelligence",
				description: "Hear from the pioneering scientists working at the frontier of artificial intelligence and its uses in the single cell and spatial field.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "16:00 — 17:00",
				title: "The Economics of Single Cell and Spatial Biology",
				description: "In this fireside discussion, a diverse range of stakeholders will discuss the current economic state of single cell and spatial biology research in Canada. This discussion will search for ideas on how we might improve feasibility and access for more researchers across the country.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
		]
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
									<h2>Three days of dynamic sessions</h2>
									<p>Here are some of the talks, workshops and panels led by academic and industry leaders that you can look forward to.</p>
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
								<div className="schedule-banner" aria-hidden="true"></div>
							</div>
						</div>

						<div className="col-xs-12 col-md-6">
							<div className="tab-panels">
								<div className={`tab-panel ${active === 0 ? 'is-active' : ''}`}>
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
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 1 ? 'is-active' : ''}`}>
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
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 2 ? 'is-active' : ''}`}>
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
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
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


