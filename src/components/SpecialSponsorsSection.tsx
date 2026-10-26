"use client";

import { useEffect, useRef, useState } from "react";
import {
  specialSponsors,
  specialSponsorsSectionContent,
  type SpecialSponsor,
} from "@/data/specialSponsors";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 60;

function SponsorLogo({
  name,
  logo,
  className = "",
}: {
  name: string;
  logo?: string | null;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (logo) {
    return <img src={logo} alt={`${name} logo`} className={className} />;
  }

  return (
    <div className={`special-sponsor-logo-fallback ${className}`} aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
}

function SponsorCard({ sponsor }: { sponsor: SpecialSponsor }) {
  return (
    <article className="special-sponsor-spotlight">
      <div className="special-sponsor-logo-panel">
        <SponsorLogo
          name={sponsor.name}
          logo={sponsor.logo}
          className="special-sponsor-logo"
        />
      </div>

      <div className="special-sponsor-copy">
        <span className="special-sponsor-tier">{sponsor.tier}</span>
        <h3 className="tx-dark">{sponsor.name}</h3>
        <p className="special-sponsor-tagline">{sponsor.tagline}</p>
        <p className="muted-dark special-sponsor-description">
          {sponsor.description}
        </p>
        {sponsor.website ? (
          <a
            className="btn btn-primary special-sponsor-link"
            href={sponsor.website}
            target="_blank"
            rel="noreferrer"
            draggable={false}
          >
            Visit partner
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function SpecialSponsorsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const isHorizontalDrag = useRef(false);
  const didDrag = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  const count = specialSponsors.length;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (count <= 1 || isPaused || isDragging) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [count, isPaused, isDragging]);

  const goTo = (index: number) => {
    setActiveIndex(((index % count) + count) % count);
    setDragOffset(0);
  };

  const endDrag = (clientX: number) => {
    if (!isDragging) return;

    const deltaX = clientX - pointerStartX.current;

    if (isHorizontalDrag.current && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        goTo(activeIndexRef.current + 1);
      } else {
        goTo(activeIndexRef.current - 1);
      }
    } else {
      setDragOffset(0);
    }

    setIsDragging(false);
    setIsPaused(false);
    isHorizontalDrag.current = false;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    isHorizontalDrag.current = false;
    didDrag.current = false;
    setIsDragging(true);
    setIsPaused(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = event.clientX - pointerStartX.current;
    const deltaY = event.clientY - pointerStartY.current;

    if (
      !isHorizontalDrag.current &&
      Math.abs(deltaX) > 8 &&
      Math.abs(deltaX) > Math.abs(deltaY)
    ) {
      isHorizontalDrag.current = true;
      didDrag.current = true;
    }

    if (isHorizontalDrag.current) {
      event.preventDefault();
      setDragOffset(deltaX);
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    endDrag(event.clientX);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    endDrag(event.clientX);
  };

  const trackStyle = {
    transform: `translateX(calc(var(--slide-inset) - ${activeIndex} * var(--slide-step) + ${dragOffset}px))`,
    transition: isDragging ? "none" : "transform 0.55s ease",
  };

  return (
    <section className="news-section special-sponsors-section" id="special-sponsors">
      <div className="container">
        <div className="section-title">
          <h2 className="tx-dark">{specialSponsorsSectionContent.title}</h2>
          <p className="muted-dark">{specialSponsorsSectionContent.subtitle}</p>
        </div>

        <div
          className={`special-sponsors-carousel${isDragging ? " is-dragging" : ""}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsPaused(false);
          }}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setIsPaused(false);
            }
          }}
        >
          <div
            className="special-sponsors-viewport"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            onClickCapture={(event) => {
              if (didDrag.current) {
                event.preventDefault();
                event.stopPropagation();
                didDrag.current = false;
              }
            }}
          >
            <div className="special-sponsors-track" style={trackStyle}>
              {specialSponsors.map((sponsor, index) => {
                const distance = Math.abs(index - activeIndex);
                const opacity =
                  distance === 0 ? 1 : distance === 1 ? 0.42 : 0.22;

                return (
                  <div
                    key={sponsor.id}
                    className={`special-sponsors-slide${
                      index === activeIndex ? " is-active" : ""
                    }`}
                    style={{ opacity }}
                    aria-hidden={index !== activeIndex}
                  >
                    <SponsorCard sponsor={sponsor} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="special-sponsors-controls">
            <div className="special-sponsors-dots" role="tablist" aria-label="Special sponsors">
              {specialSponsors.map((sponsor, index) => (
                <button
                  key={sponsor.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show ${sponsor.name}`}
                  className={`special-sponsors-dot${
                    index === activeIndex ? " is-active" : ""
                  }`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="special-sponsors-strip" aria-label="All special sponsors">
          {specialSponsors.map((sponsor, index) => (
            <button
              key={sponsor.id}
              type="button"
              className={`special-sponsors-strip-item${
                index === activeIndex ? " is-active" : ""
              }`}
              onClick={() => goTo(index)}
              aria-label={`Highlight ${sponsor.name}`}
            >
              <SponsorLogo
                name={sponsor.name}
                logo={sponsor.logo}
                className="special-sponsors-strip-logo"
              />
              <span className="special-sponsors-strip-name">{sponsor.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
