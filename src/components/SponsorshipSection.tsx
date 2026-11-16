import {
  specialSponsors,
  sponsorTierOrder,
} from "@/data/specialSponsors";

const partners = specialSponsors
  .filter((sponsor) => sponsor.logo)
  .sort(
    (a, b) => sponsorTierOrder.indexOf(a.tier) - sponsorTierOrder.indexOf(b.tier),
  );

const teaserCards = [
  {
    name: "Corporate Dinner",
    benefit:
      "Bring science, academia, and business together.",
  },
  {
    name: "Spatial Technology",
    benefit:
      "Be recognized for the role you play in spatial discovery, from specialist to visionary.",
  },
  {
    name: "Blue Chip",
    benefit:
      "Stand with the community and help turn a meeting into global engagement.",
  },
];

export default function SponsorshipSection() {
  return (
    <section className="news-section sponsorship-section sponsorship-teaser" id="sponsorship">
      <div className="container">
        <div className="partner-strip">
          <h2 className="tx-dark partner-strip-title">
            Thank you to our 2027 partners
          </h2>
          <ul className="partner-strip-list">
            {partners.map((sponsor) => {
              const logo = (
                <img
                  src={sponsor.logo!}
                  alt={`${sponsor.name} logo`}
                />
              );

              return (
                <li key={sponsor.id}>
                  {sponsor.website ? (
                    <a
                      className="partner-strip-link"
                      href={sponsor.website}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {logo}
                    </a>
                  ) : (
                    <span className="partner-strip-link">{logo}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="section-title">
          <h2 className="tx-dark">Become a TNS2027 Sponsor</h2>
        </div>

        <p className="sponsorship-teaser-pitch muted-dark">
          Canada is well positioned to be the spatial nexus for global scientific engagement.
          Sponsorship opportunities are now open, and tiers are limited.
        </p>

        <div className="sponsorship-teaser-grid">
          {teaserCards.map((card) => (
            <article key={card.name} className="sponsorship-teaser-card">
              <h3 className="tx-dark">{card.name}</h3>
              <p className="sponsorship-teaser-benefit">{card.benefit}</p>
            </article>
          ))}
        </div>

        <div className="sponsorship-teaser-actions">
          <a className="btn btn-primary" href="/sponsorship">
           Become a Sponsor
          </a>
          <a
            className="sponsorship-teaser-contact"
            href="mailto:shamini.ayyadhury@panoramics-a-vision.com"
          >
            Contact us about sponsorship
          </a>
        </div>
      </div>
    </section>
  );
}
