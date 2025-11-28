import React from 'react';

type SponsorTier = {
    title: string;
    size: 'large' | 'medium' | 'small';
    tierImage: string;
    sponsors: { name: string; logo: string }[];
};

export default function LogosSection2() {
    // Data structured by hierarchy
    const sponsorTiers: SponsorTier[] = [
        {
            title: 'Connectome Sponsors',
            size: 'large',
            tierImage: '/sponsors/tiers/connectome.png',
            sponsors: [
                { name: 'Miltenyi', logo: '/sponsors/Miltenyi.jpg' },
                // Add more top-tier sponsors here
            ]
        },
        {
            title: 'Cellular Sponsors',
            size: 'medium',
            tierImage: '/sponsors/tiers/cellular.png',
            sponsors: [
                { name: 'CBH Ontario', logo: '/sponsors/cbh_logo_whitebg.png' },
                // Add more mid-tier sponsors here
            ]
        },
        {
            title: 'Organelle Sponsors',
            size: 'small',
            tierImage: '/sponsors/tiers/organelle.png',
            sponsors: [
                { name: 'StandardBioTools', logo: '/sponsors/standardbio.png' },
                // Add more lower-tier sponsors here
            ]
        }
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

                <div className="sponsor-stack">
                    {sponsorTiers.map((tier, index) => (
                        tier.sponsors.length > 0 && (
                            <div key={index} className="sponsor-tier-section">
                                <h3 className="sponsor-tier-title">{tier.title}</h3>
                                <div className={`sponsor-grid-${tier.size}`}>
                                    {tier.sponsors.map((sponsor, sIndex) => (
                                        <div key={sIndex} className={`logo-slab-${tier.size}`}>
                                            <div className="sponsor-card-header">
                                                <img src={tier.tierImage} alt={`${tier.title} icon`} />
                                            </div>
                                            <div className="sponsor-card-body">
                                                {sponsor.logo ? (
                                                    <img
                                                        src={sponsor.logo}
                                                        alt={sponsor.name}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="logo-placeholder">
                                                        {sponsor.name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            
            <div className="container">
                <br/>
                <br/>
                <header className="section-title">
                    <div className="sponsors-header-content">
                        <h2>Our Exhibitors</h2>
                    </div>
                </header>

                <div className="sponsors-grid-horizontal">
                    {exhibitors.map((exhibitor, index) => (
                        <div key={index} className="logo-slab-exhibitor">
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

                <div className="sponsor-cta">
                    <h3><i>Become a sponsor today</i></h3>
                    <img src="/sponsors/tiers/become-a-sponsor.png" alt="Sponsorship" className="sponsor-cta-image" />
                    <p>Together, we can re-imagine conversations in science.</p>
                </div>
            </div>
        </section>
    );
}


