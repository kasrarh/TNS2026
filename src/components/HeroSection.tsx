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
                            <h3>Organized by <span>Panoramics– A Vision Inc.</span> </h3>
                        </div>

                        <div className="hero-overlay-bottom">
                            <p>
                              Come experience the Panoramic Chapters collectively through our True North Spatial Summit as we inspire, enlighten, and challenge your mind.
                              <br />
                              <br />
                              Set in downtown Toronto,  the Queen City, at the iconic MaRS Discovery District, the beacon of Canada’s innovation, this landmark event opens
                              the doors to Canada’s first Spatial and Single Cell Summit, where thought leaders, scientists, and innovators unite to share ideas, spark
                              collaboration, and shape the future of discovery.

                            </p>
                            <p className="tx-accent">
                                Register now and explore the future of spatial biology!
                            </p>
                            <div className="actions">
                                <a className="btn btn-secondary" href="https://luma.com/tns2026">Register</a>
                                <button 
                                    type="button"
                                    className="btn btn-primary" 
                                    onClick={() => setModalOpen(true)}
                                >
                                    Call For Abstracts
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
			<p>Postdoc and Early Career Scientist (ECS) consist of the following:</p>
			<ul>
				<li>postdoctoral fellows</li>
				<li>research associates</li>
				<li>new principal investigators (within 2 years of opening their lab)</li>
				<li>industry scientists</li>
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


