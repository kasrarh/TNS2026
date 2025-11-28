export default function SponsorsSection() {

    return (
        <section className="sponsors" id="sponsorship-resources">
            <div className="container">
                <header className="section-title" style={{marginTop: '50px'}}>
                    {/* <span className="tag">Resources</span> */}
                    <h2>Sponsorship Opportunities</h2>
                    <p className="muted-light">
                        We offer multi-tier packages (Panorama, Spatial, Connectome, Cellular, Nuclear, Organelle), with customizable options. 
                        Explore our prospectus and packages below to find the right fit for your organization.
                    </p>
                </header>

                <div className="download-buttons-grid">
                    <a href="/sponsors/TNS2026_Reception_Dinner_Sponsorship_Package.pdf" className="download-btn" target="_blank" rel="noopener noreferrer">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
                            </svg>
                        </span>
                        <span className="label">Dinner Sponsorship Package</span>
                        <span className="sub">Download PDF</span>
                    </a>
                    <a href="/sponsors/TNS2026_General_Prospectus_And_Sponsorship.pdf" className="download-btn" target="_blank" rel="noopener noreferrer">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
                            </svg>
                        </span>
                        <span className="label">General Prospectus</span>
                        <span className="sub">Download PDF</span>
                    </a>
                    <a href="/sponsors/pitch_deck_panoramics_tns2026.pdf" className="download-btn" target="_blank" rel="noopener noreferrer">
                        <span className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                            </svg>
                        </span>
                        <span className="label">Panoramics Pitch Deck</span>
                        <span className="sub">Download PDF</span>
                    </a>
                </div>
                
                <div style={{ textAlign: 'center', margin: '40px 0', color: 'var(--text-light)' }}>
                    <p>For information regarding sponsorship opportunities, please contact <a style={{color: "orange"}} href="mailto:sponsorship@panoramics-a-vision.com" className="text-link">sponsorship@panoramics-a-vision.com</a>.</p>
                </div>

                <div className="sponsor-cta">
                    <h3><i>Become a sponsor today</i></h3>
                    <img src="/sponsors/tiers/become-a-sponsor.png" alt="Sponsorship" className="sponsor-cta-image" />
                    <p>Together, we can re-imagine conversations in science.</p>
                </div>
            </div>
        </section>
    );
}


