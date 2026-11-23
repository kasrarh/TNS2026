"use client";

import { FormEvent, useState } from "react";

export default function EngagementSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/tns2027-signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Unable to register your email right now.");
        setMessageType("error");
        return;
      }

      setMessage(result.message || "You are now subscribed for TNS2027 updates.");
      setMessageType("success");
      setEmail("");
    } catch {
      setMessage("Unable to register your email right now.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="engagement" id="engagement">
      <div className="container engagement-inner">
        <div className="engagement-content">
          <h2>Join the TNS2027 Journey</h2>

          <div className="engagement-theme">
            <p className="engagement-theme-label">True North Spatial 2027 Theme</p>
            <h3 className="engagement-theme-title">
              Find your True North. Find your Panorama.
            </h3>
            <div className="engagement-theme-body">
              <p>
                Panoramics - A Vision invites you to find your <strong><em>True North</em></strong>: the
                identity you hold as an individual, as a team, as an organization.
              </p>
              <p>
                Your identity is the foundation of your creative individuality -
                and the responsibility you carry in shaping the experience of
                those around you. It is what allows you to move from tunnel
                vision to panorama: the expansive view that connects your work to
                the collective, and let&apos;s you respond, react, and collaborate
                meaningfully.
              </p>
              <p>
                In a field as multi-scaled and multi-institutional as spatial and
                single cell biology, finding your True North is what makes
                collective vision possible.
              </p>
              <p className="engagement-theme-closing">
                True North Spatial 2027 is built on this idea.
                <br />
                In the second edition of True North Spatial, we now level up.
              </p>
            </div>
          </div>

          <p className="engagement-copy">
            Sign up by email to receive regular announcements, registration updates,
            and speaker news for TNS2027.
          </p>

          <form className="engagement-form" onSubmit={handleSubmit}>
            <label htmlFor="tns2027-email" className="sr-only">
              Email address
            </label>
            <input
              id="tns2027-email"
              className="engagement-email-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
            <button
              type="submit"
              className="btn btn-secondary engagement-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Join the TNS2027 Email List"}
            </button>
          </form>

          {message && (
            <p
              className={`engagement-message ${
                messageType === "error" ? "is-error" : "is-success"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </div>

        <aside className="engagement-media" aria-label="TNS2026 CEO address video">
          <figure className="engagement-video-card">
            <div className="engagement-video-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/0DpOyLIvV3k?rel=0&start=100"
                title="CEO's address at True North Spatial 2026"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="engagement-video-caption">
              <span className="engagement-video-label">From the TNS2026 stage</span>
              <span className="engagement-video-title">Our CEO&apos;s address at True North Spatial 2026</span>
            </figcaption>
          </figure>
        </aside>
      </div>
    </section>
  );
}
