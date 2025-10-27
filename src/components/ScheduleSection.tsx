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
				description: "Exploring the latest trends in computer vision and the frontiers of AI technology.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "09:00 — 09:30",
				title: "Vision + LLMs Workshop",
				description: "Hands-on workshop combining computer vision with large language models for multimodal AI applications.",
				speaker: "Shamini Ayyadhury (CEO, Founder of Panoramics - A Vision, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:30",
				title: "Efficient Training Methods",
				description: "Learn cutting-edge techniques for training computer vision models more efficiently.",
				speaker: " Dr. Michael Doyle (Professor, New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: "Opening Keynote",
				description: "Exploring the latest trends in computer vision and the frontiers of AI technology.",
				speaker: "Dr. Freda Miller (Professor, University of British Columbia, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:15 — 11:45",
				title: "Vision + LLMs Workshop",
				description: "Hands-on workshop combining computer vision with large language models for multimodal AI applications.",
				speaker: "Dr. Jeff Biernaskie (Professor, University of Calgary, Canada) ",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:45 — 12:15",
				title: "Efficient Training Methods",
				description: "Learn cutting-edge techniques for training computer vision models more efficiently.",
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
				description: "Learn cutting-edge techniques for training computer vision models more efficiently.",
				speaker: "Dr. Hartland Jackson (Assistant Professor, Lunenfeld-Tanenbaum Research Institute, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "14:30 — 15:00",
				title: "Break & Networking",
				description: "Take a break and network with other attendees.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "11:45 — 12:15",
				title: "Efficient Training Methods",
				description: "Learn cutting-edge techniques for training computer vision models more efficiently.",
				speaker: "Dr. Hartland Jackson (Assistant Professor, Lunenfeld-Tanenbaum Research Institute, Canada)",
				venue: "MaRS Auditorium"
			},
		],
		day2: [
			{
				time: "10:00 — 12:00",
				title: "Research Showcase",
				description: "Lightning talks and live demos from leading research labs and innovative startups.",
				speaker: null,
				venue: "Exhibition Hall"
			},
			{
				time: "14:00 — 15:30",
				title: "Industry Panel",
				description: "Discussion on the future of computer vision in industry applications.",
				speaker: "Panel of Industry Leaders",
				venue: "Main Auditorium"
			}
		],
		day3: [
			{
				time: "09:30 — 11:00",
				title: "Advanced CV Techniques",
				description: "Deep dive into advanced computer vision techniques and their practical applications.",
				speaker: "Dr. Emma Watson",
				venue: "Conference Room 1"
			},
			{
				time: "11:30 — 13:00",
				title: "Closing Ceremony",
				description: "Wrap-up session with key takeaways and future directions in computer vision.",
				speaker: "Conference Organizers",
				venue: "Main Auditorium"
			}
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
									<span className="tag">Schedule</span>
									<h2>Two days of sessions</h2>
									<p>Talks, workshops, and panels led by industry and academia.</p>
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
												<div className="session-venue">{session.venue}</div>
											</div>
											<div className="session-content col-xs-8 col-md-9">
												<h3>{session.title}</h3>
												<p className="session-description">{session.description}</p>
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
												<div className="session-venue">{session.venue}</div>
											</div>
											<div className="session-content col-xs-8 col-md-9">
												<h3>{session.title}</h3>
												<p className="session-description">{session.description}</p>
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
												<div className="session-venue">{session.venue}</div>
											</div>
											<div className="session-content col-xs-8 col-md-9">
												<h3>{session.title}</h3>
												<p className="session-description">{session.description}</p>
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


