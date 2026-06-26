import {
  sponsorshipDownloads,
  sponsorshipPackages,
  sponsorshipSectionContent,
  type SponsorshipMessageParagraph,
} from "@/data/sponsorshipPackages";

function renderParagraph(paragraph: SponsorshipMessageParagraph, key: number) {
  return (
    <p key={key} className="muted-dark">
      {paragraph.map((segment, index) =>
        segment.bold ? (
          <strong key={index}>{segment.text}</strong>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

export default function SponsorshipSection() {
  const { message } = sponsorshipSectionContent;

  return (
    <section className="news-section sponsorship-section" id="sponsorship">
      <div className="container">
        <div className="section-title">
          <h2 className="tx-dark">{sponsorshipSectionContent.title}</h2>
          <p className="muted-dark">{sponsorshipSectionContent.subtitle}</p>
        </div>

        <div className="sponsorship-message">
          <p className="sponsorship-message-subtitle">{message.subtitle}</p>
          {message.paragraphs.map((paragraph, index) =>
            renderParagraph(paragraph, index),
          )}
        </div>

        <div className="sponsorship-packages">
          {sponsorshipPackages.map((pkg) => (
            <article key={pkg.id} className="sponsorship-package-card">
              <header className="sponsorship-package-header">
                <h3 className="tx-dark">{pkg.name}</h3>
              </header>

              <div className="sponsorship-package-tiers">
                {pkg.tiers.map((tier, index) => (
                  <div
                    key={tier.id}
                    className={`sponsorship-tier${index > 0 ? " sponsorship-tier-divided" : ""}`}
                  >
                    <div className="sponsorship-tier-head">
                      <div className="sponsorship-tier-title-group">
                        <h4 className="tx-dark">{tier.name}</h4>
                        {tier.subtitle ? (
                          <p className="sponsorship-tier-subtitle">{tier.subtitle}</p>
                        ) : null}
                      </div>
                      <span className="sponsorship-tier-price">{tier.price}</span>
                    </div>
                    <p className="sponsorship-tier-description">{tier.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="sponsorship-footer">
          <div className="sponsorship-downloads">
            {sponsorshipDownloads.map((download) => (
              <a
                key={download.label}
                className="btn btn-primary sponsorship-download-btn"
                href={download.href}
                download={download.fileName}
              >
                {download.label}
              </a>
            ))}
          </div>

          <div className="sponsorship-contact">
            <p className="sponsorship-contact-title">
              Please contact our CEO for further sponsorship details
            </p>
            <p>
              Shamini Ayyadhury, PhD
              <br />
              CEO, Founder | Panoramics - A Vision INC
              <br />
              Email:{" "}
              <a href="mailto:shamini.ayyadhury@panoramics-a-vision.com">
                shamini.ayyadhury@panoramics-a-vision.com
              </a>
              <br />
              Phone: <a href="tel:+15149652782">+1 (514) 965-2782</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
