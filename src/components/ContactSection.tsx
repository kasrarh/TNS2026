export default function ContactSection() {
    return (
        <section className="contact bg-light" id="contact">
            <div className="container">
                <div className="contacts">
                    <div className="contact-card">
                        <div className="icon" aria-hidden="true">✉️</div>
                        <h3>Email</h3>
                        <p>true-north-2026@panoramics-a-vision.com</p>
                        <a className="text-link" href="mailto:true-north-2026@panoramics-a-vision.com">Send mail</a>
                    </div>
                    <div className="contact-card">
                        <div className="icon" aria-hidden="true">📞</div>
                        <h3>Phone</h3>
                        <p>+1 (514) 965-2782</p>
                        <a className="text-link" href="tel:+15149652782">Call us</a>
                    </div>
                    <div className="contact-card">
                        <div className="icon" aria-hidden="true">📍</div>
                        <h3>Location</h3>
                        <p>Toronto, ON, Canada</p>
                        <a className="text-link" href="https://maps.app.goo.gl/Y5ZPKtdFjtcrJCtZ7">Get directions</a>
                    </div>
                </div>
                <div className="map" role="region" aria-label="Map showing MaRS Discovery District, Toronto">
                    <iframe
                        title="MaRS Discovery District, Toronto"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1443.2312087697694!2d-79.38942262019823!3d43.65935183642091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34b7ccd8ba1f%3A0x7e6f7af0cc4e65f3!2sMaRS%20Discovery%20District!5e0!3m2!1sen!2sca!4v1762789558983!5m2!1sen!2sca"
                        width="100%"
                        height="450"
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


