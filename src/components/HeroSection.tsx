'use client';
import { useState } from 'react';
import GlobeSection from "./Globe";

export default function HeroSection() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section className="hero" id="about">
            <div className="container hero-inner">
                <div className="hero-content">
                    {/* new overlay wrapper so we can position top/bottom on mobile */}
                    <div className="hero-overlay">
                        <div className="hero-overlay-top">
                            <h1>True North Spatial 2026</h1>
                            <h3>Hosted by <span>Panoramics– A Vision Inc.</span> </h3>
                        </div>

                        <div className="hero-overlay-bottom">
                            <p>
                                Discover the latest breakthroughs in single cell and spatial biology at True North Spatial 2026, 
                                Canada's first summit for spatial biology innovators. Connect with academic and industry leaders 
                                for three days of groundbreaking research, thought-provoking discussions, and hands-on workshops designed 
                                to spark new ideas and collaborations.
                            </p>
                            <p className="tx-accent">
                                Register now and explore the future of single cell and spatial biology!
                            </p>
                            <div className="actions">
                                <a className="btn btn-secondary" href="https://www.eventbrite.ca/e/true-north-spatial-2026-tickets-1972675813461?aff=oddtdtcreator">Register</a>
                                <button 
                                    type="button"
                                    className="btn btn-primary" 
                                    onClick={() => setModalOpen(true)}
                                >
                                    Call For Abstract
                                </button>
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
        </section>
    );
}

function OpenModal(
    { onClose }:
    { onClose: () => void }
) {
    return(
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
          </div>
        </div>

        
          <p className="person-modal-desc">

          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScRWWEZs4FQynjtVXkOPn1nOjlof8pKxmDQdnrkBPW8jqxTLQ/viewform?usp=sharing&ouid=103366666487005061314"
            target="_blank"
            rel="noreferrer"
            className="person-modal-link"
          >
            Postdoc/ECS
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScfOGTTe7q8XQMfkr6GA7KCVGFR7jbCp3O_pBO8VUUsEgF-3A/viewform"
            target="_blank"
            rel="noreferrer"
            className="person-modal-link"
          >
            Students
          </a>
      </div>
    </div>
    );
}


