export default function LogosSection() {
    const sponsors = [
        { name: 'CBH Ontario', logo: '/sponsors/cbh_logo_whitebg.png' },
        { name: 'Miltenyi', logo: null },
        { name: 'StandardBioTools', logo: '/sponsors/standardbio.png' },
        { name: 'Lunaphore - Biotechne', logo: null },
        { name: 'Novo Gene', logo: '/sponsors/novogene-logo-01.png' },
        { name: 'Stellaromics', logo: '/sponsors/stellaromicslogo.png' },
    ];

    return (
        <section className="sponsors" id="sponsors">
            <div className="container">
                <header className="section-title">
                    <div className="sponsors-header-content">
                        <span className="tag">Our Partners</span>
                        <h2>Proud Sponsors</h2>
                        <p className="sponsors-lead">
                            Supported by leading organizations driving innovation in spatial biology.
                            We thank our sponsors for helping make True North Spatial 2026 possible.
                        </p>
                    </div>
                </header>

                <div className="sponsors-grid row">
                    {sponsors.map((sponsor) => (
                        <div key={sponsor.name} className="logo-slab col-3">
                            {sponsor.logo ? (
                                <img
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="logo-placeholder" aria-label={sponsor.name}>
                                    {sponsor.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


