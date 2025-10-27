export default function HighlightsSection() {
	return (
		<section className="cards-3 bg-light" id="highlights">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">Browse Research Highlights</span>
					<h2 className="tx-dark">What you'll learn</h2>
					<p className="muted-dark">From cutting-edge models to real-world deployment, get practical insights you can apply.</p>
				</div>
				<div className="card-grid">
					<article className="card">
						<div className="card-media" aria-hidden="true"></div>
						<div className="card-body">
							<span className="tag">Vision</span>
							<h3>Foundation models in production</h3>
							<p>Architectures, safety, evaluation, and scaling tactics used by leading teams.</p>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
					<article className="card">
						<div className="card-media" aria-hidden="true"></div>
						<div className="card-body">
							<span className="tag">3D</span>
							<h3>NeRFs and 3D reconstruction</h3>
							<p>Capture, optimize, and render photoreal scenes for research and products.</p>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
					<article className="card">
						<div className="card-media" aria-hidden="true"></div>
						<div className="card-body">
							<span className="tag">Edge</span>
							<h3>On-device AI</h3>
							<p>Quantization, distillation, and deployment strategies for mobile and embedded.</p>
							{/* <a className="text-link" href="#">Read more</a> */}
						</div>
					</article>
				</div>
			</div>
		</section>
	);
}


