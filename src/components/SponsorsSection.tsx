export default function SponsorsSection() {

    return (
        <section className="faq" id="faq" >
            <div className="container">
                <img src="/sponsors/sponsor-template.png" alt="" width={'100%'} />
                <div className="accordion" data-accordion style={{margin:'20px'}}>
					<details className="item" open>
						<summary>What sponsorship opportunities are available?</summary>
						<p className="muted-light">We offer multi-tier packages (Panorama, Spatial, Connectome, Cellular, Nuclear, Organelle), with customizable options. For further details, please download our TNS2026 prospectus here.
                            <br />
                            <a href="/sponsors/TNS2026_Reception_Dinner_Sponsorship_Package.pdf">Dinner Sponsorship</a>
                            <br />
                            <a href="/sponsors/TNS2026_General_Prospectus_And_Sponsorship.pdf">General Prospectus And Sponsorship</a>
                            <br />
                            <a href="/sponsors/pitch_deck_panoramics_tns2026.pdf">Pitch Deck Panoramics</a>
							<br />
							For information regarding sponsorship opportunities, please click here or contact <a href="mailto:sponsorship@panoramics-a-vision.com">sponsorship@panoramics-a-vision.com</a> .
						</p>
					</details>
				</div>
            </div>
        </section>
    );
}


