export default function HighlightsSection() {
	return (
		<section className="cards-3" id="highlights">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">The Panoramics Chapters</span>
					<h2 className="tx-dark">"Inspire Me", "Enlighten Me", "Challenge Me"</h2>
					<p className="muted-dark">Re-imagining conversations in science</p>
				</div>
				<div className="card-grid">
					<article className="card">
						<div className="card-media" aria-hidden="true">
							<img src="./Inspire-me.png" alt="Inspire me" />
						</div>
						<div className="card-body">
							<span className="tag">March 25th</span>
							<h3>Be Inspired</h3>
							<p>Our “Inspire-Me” chapter celebrates the curiosity, creativity and imagination 
								that sparks scientific discovery. This chapter is a focus for inspiration and 
								motivation, aimed to ignite the scientist in us and to give us purpose and hope.
								 Here we have carefully curated a selection of innovative scientists working in 
								 the single cell and spatial biology field.
								 <br />
								 <br />
								Gain insight and inspiration from our distinguished speakers as we map out the single
								 cell and spatial biology landscape in Canada. Discover the novel ways that researchers
								  are using a single cell and spatial techniques to drive breakthroughs across basic,
								   investigative, and translational science.
							</p>
							<a className="btn btn-primary" href="/agenda" style={{ marginTop: 'auto' }}>See More</a>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
					<article className="card">
						<div className="card-media" aria-hidden="true">
							<img src="./Enlighten-me.png" alt="Enlighten me" />
						</div>
						<div className="card-body">
							<span className="tag">March 26th</span>
							<h3>Be Enlightened</h3>
							<p>Our "Enlighten-Me" chapter is focused on high quality, meaningful training and pedagogy.
								 This chapter emphasizes skills development, encourages innovation and aims to form a
								  support structure for creativity and training. Join us on day two as we engage with students and future leaders.
								<br />
								<br />
								Dive into pedagogy and innovation centered talks where you’ll learn from experts in spatial biology.
								 Expand your scientific and professional skillset as our professional development sessions guide you through single cell and spatial biology.

							</p>
							<a className="btn btn-primary" href="/agenda" style={{ marginTop: 'auto' }}>See More</a>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
					<article className="card">
						<div className="card-media" aria-hidden="true">
							<img src="./Challenge-me.png" alt="Challenge me" />
		
						</div>
						<div className="card-body">
							<span className="tag">March 27th</span>
							<h3>Be Challenged</h3>
							<p>
								Our "Challenge-Me" chapter nurtures out-of the box and future-forward thinking in our scientific community. This chapter strives to expand horizons that will shape the future of the field. Join us on day three as we tackle bold topics and grand challenges.
								<br />
								<br />
								
								Engage with the critical questions and challenges shaping the landscape of spatial biology through panel discussions, fireside chats and debates. Challenge yourself with topics such as open-source data, artificial intelligence, and the evolving economics of single cell and spatial research. Join in with conversations that push the boundaries of what’s possible in the field.</p>
							<a className="btn btn-primary" href="/agenda" style={{ marginTop: 'auto' }}>See More</a>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}


