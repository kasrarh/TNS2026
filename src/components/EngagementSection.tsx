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
        <p className="tag">Call to Action</p>
        <h2>Thank You, TNS2026 Attendees</h2>
        <p className="engagement-copy">
        We are grateful to all our sponsors, partners and attendees who joined us at the
MaRS Discovery District and in making True North Spatial 2026 an unforgettable
journey across time and space.
<br />
A convergence of thought leaders, re-imagining conversations in science,
elevating creativity and innovation in biological topography.
Join us to inspire, enlighten and challenge …. Into True North Spatial 2027
        </p>

        <h3 className="engagement-subtitle">Join the TNS2027 Journey</h3>
        <p className="engagement-copy">
          Sign up by email to receive early announcements, registration updates,
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

        <div className="engagement-contact">
          <p className="engagement-contact-title">Sponsorship Contact</p>
          <p>
            CEO, Panoramics - A Vision Inc.
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
    </section>
  );
}
