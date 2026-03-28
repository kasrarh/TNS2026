'use client';
import { useEffect, useState } from 'react';
import GlobeSection from "./Globe";
import TicketModal from './TicketModal';

const HERO_STATS = [
  { target: 200, suffix: '+', label: 'Registered Attendees' },
  { target: 50, suffix: '+', label: 'Academic and Industry Speakers' },
  { target: 16, suffix: '', label: 'Expert Sponsors' },
];

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [statCounts, setStatCounts] = useState<number[]>(HERO_STATS.map(() => 0));

  useEffect(() => {
    const durationMs = 1800;
    let animationFrameId = 0;
    let animationStart: number | null = null;

    const animate = (timestamp: number) => {
      if (animationStart === null) {
        animationStart = timestamp;
      }

      const rawProgress = (timestamp - animationStart) / durationMs;
      const progress = Math.min(rawProgress, 1);
      const easedProgress = easeOutCubic(progress);

      setStatCounts(HERO_STATS.map((stat) => Math.round(stat.target * easedProgress)));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero" id="about">
      <div className="container hero-inner">
        <div className="hero-content">
          {/* new overlay wrapper so we can position top/bottom on mobile */}
          <div className="hero-overlay">
            <div className="hero-overlay-top">
              <h1>True North Spatial 2026</h1>
              <h3>By <span>Panoramics– A Vision Inc.</span>
              <br />
              25th - 27th March, 2026
               </h3>
            </div>

            <div className="hero-overlay-bottom">
              <p>
                Thank you to everyone who joined us for the <span>inaugural TNS2026</span> ,an incredible three-day journey at the MaRS Discovery District. As <span>North America’s first dedicated single-cell and spatial biology conference</span>, this event marked a historic milestone for the scientific community in Canada and beyond.
Because of your energy and engagement, we reached new heights:
              </p>

              <div className="hero-stats-showcase" aria-label="Event statistics">
                {HERO_STATS.map((stat, index) => (
                  <div className="hero-stat-pill" key={stat.label}>
                    <span className="hero-stat-value">{statCounts[index]}{stat.suffix}</span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <p>
               The scientific exchange was truly groundbreaking. From exploring the very beginnings of spatial biology to discussing the future of AI in medicine, the sessions highlighted how looking at cells in their natural environment is transforming our understanding of human health. By bridging the gap between complex data and real-world discovery, we are collectively pushing the boundaries of what’s possible in modern science.

              </p>
              <p className="tx-accent">
                Stay tuned! We are already looking ahead to next year and can’t wait to share what’s in store for 2027.
              </p>
              <div className="actions">
                {/* <a className="btn btn-secondary" type='button' href='/tickets'>Register</a> */}
                {/* <a className="btn btn-secondary" type='button' onClick={() => setTicketModal(true)}>Register</a> */}
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setModalOpen(true)}
                >
                  Call For Abstracts
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Add the Globe floated to the right */}
        <div className="hero-globe">
          <GlobeSection />
        </div>
      </div>

      {/* Modal instance */}
      {modalOpen && (
        <OpenModal
          onClose={() => setModalOpen(false)}
        />
      )}
      {ticketModal && (
        <TicketModal
          onClose={() => setTicketModal(false)}
        />
      )}
    </section>
  );
}

function OpenModal(
  { onClose }:
    { onClose: () => void }
) {
  return (
    <div className="person-modal-backdrop" onClick={onClose}>
      <div
        className="person-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Call for Abstracts"
      >
        <button
          type="button"
          className="person-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="person-modal-header">
          <div>
            <h3 className="person-modal-name">Call For Abstracts</h3>

            <p className="person-modal-role">Submit your abstract for True North Spatial 2026. Choose one of the options below to view guidelines or submit.</p>
            <p>Postdoc and Early Career Scientist (ECS) consist of the following:</p>
            <ul>
              <li>postdoctoral fellows</li>
              <li>research associates</li>
              <li>new principal investigators (within 2 years of opening their lab)</li>
              <li>industry scientists</li>
            </ul>
            <p>Trainees and students consist of the following:</p>
            <ul>
              <li>PhD candidates</li>
              <li>Master’s students</li>
              <li>Undergraduate students</li>
            </ul>
          </div>
        </div>


        {/* <p className="person-modal-desc">

        </p> */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScRWWEZs4FQynjtVXkOPn1nOjlof8pKxmDQdnrkBPW8jqxTLQ/viewform?usp=sharing&ouid=103366666487005061314"
          target="_blank"
          style={{ marginRight: '12px' }}
          rel="noreferrer"
          className="btn btn-secondary"
        >
          Postdoc/ECS
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScfOGTTe7q8XQMfkr6GA7KCVGFR7jbCp3O_pBO8VUUsEgF-3A/viewform"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Students
        </a>
      </div>
    </div>
  );
}


