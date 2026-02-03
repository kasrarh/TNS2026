export default function LogosSection() {
    const sponsors = [
        { name: 'Miltenyi', tier: 'CONNECTOME Sponsor', logo: '/sponsors/Miltenyi.jpg' },
        { name: 'CBH Ontario', tier: 'CELLULAR Sponsor', logo: '/sponsors/cbh_logo_whitebg.png' },
        { name: 'StandardBioTools', tier: 'ORGANELLE Sponsor', logo: '/sponsors/standardbio.png' },
    ];
    const exhibitors = [
        { name: 'Lunaphore - Biotechne', logo: '/sponsors/luna.png' },
        { name: 'Stellaromics', logo: '/sponsors/stellaromicslogo.png' },
        { name: 'Novo Gene', logo: '/sponsors/novogene-logo-01.png' },
    ];

    return (
        <section className="sponsors" id="sponsors">
            <div className="container">
                <header className="section-title">
                    <div className="sponsors-header-content">
                        <span className="tag">Sponsors &amp; Exhibitors</span>
                        <h2>Panoramics - A Vision Inc. thanks our sponsors!</h2>
                    </div>
                </header>

                <div className="sponsors-grid-vertical">
                    {sponsors.map((sponsor) => (
                        <div key={sponsor.name} className="logo-slab-sponsor">
                            <h5 className="sponsor-tier">{sponsor.tier}</h5>
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
            <div className="container">
                <br/>
                <br/>
                <header className="section-title">
                    <div className="sponsors-header-content">
                        <h2><i>Also supported by</i></h2>
                    </div>
                </header>

                <div className="sponsors-grid-horizontal">
                    {exhibitors.map((exhibitor) => (
                        <div key={exhibitor.name} className="logo-slab-exhibitor">
                            {exhibitor.logo ? (
                                <img
                                    src={exhibitor.logo}
                                    alt={exhibitor.name}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="logo-placeholder" aria-label={exhibitor.name}>
                                    {exhibitor.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


