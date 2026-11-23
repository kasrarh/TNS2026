const contactCards = [
  {
    title: "General Enquiries",
    description: "Questions about True North Spatial, registration, or the program.",
    value: "query@panoramics-a-vision.com",
    href: "mailto:query@panoramics-a-vision.com",
    linkLabel: "Send an email",
  },
  {
    title: "Phone",
    description: "Speak with our team directly.",
    value: "+1 (514) 965-2782",
    href: "tel:+15149652782",
    linkLabel: "Call us",
  },
];

export default function ContactDetails() {
  return (
    <section className="news-section sponsorship-section sponsorship-details contact-page">
      <div className="container">
        <a className="sponsorship-back" href="/">
          Back to home
        </a>

        <div className="section-title">
          <h1 className="tx-dark">Contact Us</h1>
          <p className="muted-dark">
            Have a question about True North Spatial 2027? Reach out to the
            right team below and we&apos;ll get back to you.
          </p>
        </div>

        <div className="contact-page-grid">
          {contactCards.map((card) => (
            <article key={card.title} className="contact-page-card">
              <h2 className="tx-dark">{card.title}</h2>
              <p className="contact-page-card-desc">{card.description}</p>
              <p className="contact-page-card-value">{card.value}</p>
              <a className="contact-page-link" href={card.href}>
                {card.linkLabel}
              </a>
            </article>
          ))}
        </div>

        <div className="contact-page-info">
          <div className="contact-page-event">
            <h2 className="tx-dark">The Summit</h2>
            <p>
              <strong>True North Spatial 2027</strong>
              <br />
              April 27 – 29, 2027
              <br />
              MaRS Discovery District
              <br />
              Toronto, ON, Canada
            </p>
            <a
              className="contact-page-link"
              href="https://maps.app.goo.gl/Y5ZPKtdFjtcrJCtZ7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </div>

          <div className="contact-page-event">
            <h2 className="tx-dark">Leadership</h2>
            <p>
              <strong>Shamini Ayyadhury, PhD</strong>
              <br />
              CEO, Founder | Panoramics - A Vision Inc.
              <br />
              <a href="mailto:shamini.ayyadhury@panoramics-a-vision.com">
                shamini.ayyadhury@panoramics-a-vision.com
              </a>
            </p>
          </div>

          <div className="contact-page-event">
            <h2 className="tx-dark">Follow Us</h2>
            <p>
              <a
                href="https://www.panoramics-a-vision.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                panoramics-a-vision.com
              </a>
              <br />
              <a
                href="https://www.linkedin.com/company/panoramics-a-vision/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </p>
          </div>
        </div>

        <div role="region" aria-label="Map showing MaRS Discovery District, Toronto">
          <iframe
            title="MaRS Discovery District, Toronto"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1443.2312087697694!2d-79.38942262019823!3d43.65935183642091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b7ccd8ba1f%3A0x7e6f7af0cc4e65f3!2sMaRS%20Discovery%20District!5e0!3m2!1sen!2sca!4v1762789558983!5m2!1sen!2sca"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
