export default function HighlightsSection() {
	return (
		<section className="cards-3 bg-light" id="highlights">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">Our three chapters</span>
					<h2 className="tx-dark">Inspire, Enlighten, Challenge</h2>
					<p className="muted-dark">A space to learn, connect and reimagine the future of single cell and spatial biology</p>
				</div>
				<div className="card-grid">
					<article className="card">
						<div className="card-media" aria-hidden="true"></div>
						<div className="card-body">
							<span className="tag">March 25th</span>
							<h3>Be Enlightened</h3>
							<p>Dive into workshops and talks and learn from experts in spatial biology. Expand your scientific and professional skillset as our workshops guide you through spatial biology from the ground up – from experimental basics and computational resources, to commercialization insights and creative career planning</p>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
					<article className="card">
						<div className="card-media" aria-hidden="true"></div>
						<div className="card-body">
							<span className="tag">March 26th</span>
							<h3>Be Challenged</h3>
							<p>Engage with the critical questions and challenges shaping the landscape of spatial biology through panel discussions, fireside chats and debates. Challenge yourself with topics such as open-source data, artificial intelligence, and the evolving economics of single cell and spatial research. Join in with conversations that push the boundaries of what’s possible with the field.</p>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
					<article className="card">
						<div className="card-media" aria-hidden="true"></div>
						<div className="card-body">
							<span className="tag">March 27th</span>
							<h3>Be Inspired</h3>
							<p>Gain insight and inspiration from a diverse line-up of distinguished speakers as we map out the spatial biology landscape in Canada. Discover the innovative ways that researchers are using a single cell and spatial techniques to drive breakthroughs across basic, investigative, and translational science.</p>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}


