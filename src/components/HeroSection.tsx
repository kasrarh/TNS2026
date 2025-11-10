export default function HeroSection() {
	return (
		<section className="hero" id="about">
			<div className="container hero-inner">
				<div className="hero-content">
					{/* new overlay wrapper so we can position top/bottom on mobile */}
					<div className="hero-overlay">
						<div className="hero-overlay-top">
							<h1>True North Spatial 2026</h1>
							<h3>Hosted by Panoramics – A Vision Inc.</h3>
						</div>

						<div className="hero-overlay-bottom">
							<p>
								Discover the latest breakthroughs in single cell and spatial biology at True North Spatial 2026, 
								Canada’s first summit for spatial biology innovators. Connect with academic and industry leaders 
								for three days of groundbreaking research, thought-provoking discussions, and hands-on workshops designed 
								to spark new ideas and collaborations.
							</p>
							<p>
								<span className="tx-light">Register now and explore the future of spatial biology!</span>
							</p>
							<div className="actions">
								<a className="btn btn-secondary" href="#tickets">Register</a>
							</div>
						</div>
					</div>
				</div>
				{/* <figure className="hero-media" aria-label="Conference preview image" role="img"></figure> */}
					{/* <img src="/TNS2026_logo_V12.png" alt="True North Spatial 2026" style={{ height: 'auto', maxWidth: '70%' }} /> */}
			</div>
		</section>
	);
}


