export default function LogosSection() {
    const sponsors = [
        { name: 'Sponsor 1', logo: '/sponsor-1.png' },
        { name: 'Sponsor 2', logo: '/sponsor-2.png' },
        { name: 'Sponsor 3', logo: '/sponsor-3.png' },
        { name: 'Sponsor 4', logo: '/sponsor-4.png' },
        { name: 'Sponsor 5', logo: '/sponsor-5.png' },
        { name: 'Sponsor 6', logo: '/sponsor-6.png' },
    ];

    return (
        <section className="sponsors" id="sponsors">
            <div className="container">
                <header className="section-title">
                    <span className="tag">Our Partners</span>
                    <h2>Proud Sponsors</h2>
                    <p>Supported by leading organizations in spatial biology and innovation.</p>
                </header>

                <div className="sponsors-grid row">
                    {sponsors.map((sponsor) => (
                        <div key={sponsor.name} className="logo-slab col-3">
                            <img 
                                src={sponsor.logo} 
                                alt={sponsor.name}
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}


