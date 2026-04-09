"use client";
import { useEffect, useState } from "react";
import GlobeSection from "./Globe";
import TicketModal from "./TicketModal";

export interface HeroStat {
  target: number;
  suffix: string;
  label: string;
}

export interface HeroAction {
  label: string;
  href?: string;
  variant?: "btn-primary" | "btn-secondary";
  onClick?: () => void;
}

export interface HeroSectionProps {
  title: string;
  subtitle: React.ReactNode;
  intro: React.ReactNode;
  stats: HeroStat[];
  body: React.ReactNode;
  accentText?: string;
  actions?: HeroAction[];
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

export default function HeroSection({
  title,
  subtitle,
  intro,
  stats= [],
  body,
  accentText,
  actions = [],
}: HeroSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [ticketModal, setTicketModal] = useState(false);
  const [statCounts, setStatCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    setStatCounts(stats.map(() => 0));
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
      setStatCounts(
        stats.map((stat) => Math.round(stat.target * easedProgress)),
      );
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [stats]);

  return (
    <section className="hero" id="about">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-overlay">
            <div className="hero-overlay-top">
              <h1>{title}</h1>
              <h3>{subtitle}</h3>
            </div>

            <div className="hero-overlay-bottom">
              <p>{intro}</p>

              {stats.length > 0 && (
                <div
                  className="hero-stats-showcase"
                  aria-label="Event statistics"
                >
                  {stats.map((stat, index) => (
                    <div className="hero-stat-pill" key={stat.label}>
                      <span className="hero-stat-value">
                        {statCounts[index]}
                        {stat.suffix}
                      </span>
                      <span className="hero-stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {body}

              {accentText && <p className="tx-accent">{accentText}</p>}

              {actions.length > 0 && (
                <div className="actions">
                  {actions.map((action) =>
                    action.href ? (
                      <a
                        key={action.label}
                        className={`btn ${action.variant ?? "btn-primary"}`}
                        href={action.href}
                      >
                        {action.label}
                      </a>
                    ) : (
                      <button
                        key={action.label}
                        type="button"
                        className={`btn ${action.variant ?? "btn-primary"}`}
                        onClick={action.onClick}
                      >
                        {action.label}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hero-globe">
          <GlobeSection />
        </div>
      </div>

      {modalOpen && <OpenModal onClose={() => setModalOpen(false)} />}
      {ticketModal && <TicketModal onClose={() => setTicketModal(false)} />}
    </section>
  );
}

function OpenModal({ onClose }: { onClose: () => void }) {
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
          &#x2715;
        </button>

        <div className="person-modal-header">
          <div>
            <h3 className="person-modal-name">Call For Abstracts</h3>
            <p className="person-modal-role">
              Submit your abstract for True North Spatial 2026. Choose one of
              the options below to view guidelines or submit.
            </p>
            <p>
              Postdoc and Early Career Scientist (ECS) consist of the following:
            </p>
            <ul>
              <li>postdoctoral fellows</li>
              <li>research associates</li>
              <li>
                new principal investigators (within 2 years of opening their
                lab)
              </li>
              <li>industry scientists</li>
            </ul>
            <p>Trainees and students consist of the following:</p>
            <ul>
              <li>PhD candidates</li>
              <li>Master&apos;s students</li>
              <li>Undergraduate students</li>
            </ul>
          </div>
        </div>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScRWWEZs4FQynjtVXkOPn1nOjlof8pKxmDQdnrkBPW8jqxTLQ/viewform?usp=sharing&ouid=103366666487005061314"
          target="_blank"
          style={{ marginRight: "12px" }}
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
