'use client';

import { useEffect, useRef, useState } from 'react';
import TicketModal from './TicketModal';

export default function SiteHeader() {
	const [navOpen, setNavOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement | null>(null);
	const [scrolled, setScrolled] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
	const [ticketModal, setTicketModal] = useState(false);


	useEffect(() => {
		function onWindowClick(e: MouseEvent) {
			if (!dropdownRef.current) return;
			if (!dropdownRef.current.contains(e.target as Node)) {
				setDropdownOpen(false);
			}
		}
		window.addEventListener('click', onWindowClick);
		return () => window.removeEventListener('click', onWindowClick);
	}, []);


	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10); // trigger after scrolling 10px
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);


	return (
		<>
			<>
		<header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top">
				<nav className="navbar container" aria-label="Primary">
					<a className="logo" href="#top" aria-label="Home">
						<picture>
							<source media="(max-width: 800px)" srcSet="/TNS2026-logo-mobile.png" />
							<img src="/TNS2026-logo-new.png" alt="TNS 2026 Logo" />

						</picture>
						{/* <span className="logo-mark" aria-hidden="true"></span> */}
						{/* <span className="tx-light">Company</span> */}
					</a>

					<button
						className="nav-toggle"
						aria-expanded={navOpen}
						aria-controls="nav-menu"
						onClick={() => setNavOpen((v) => !v)}
					>
						Menu
					</button>

					<ul className={`nav-links ${navOpen ? 'is-open' : ''}`} id="nav-menu">
						<li><a href="#about">About</a></li>
						<li><a id='highlighted-link' href="#vision"
						onClick={(e) => {
						e.preventDefault();
						setIsModalOpen(true); // Open the modal
						}}
					>
						Our Vision
					</a></li>
						<li><a href="/#schedule">Schedule</a></li>
						<li><a href="/#sponsors">Sponsors</a></li>
						<li><a href="/#team">Speakers</a></li>
						<li><a href="/#faq">FAQs</a></li>
						<li><a href="/#contact">Contact</a></li>
						{/* <li className="nav-dropdown" ref={dropdownRef}>
							<button
								className="dropdown-trigger"
								aria-expanded={dropdownOpen}
								onClick={(e) => {
									e.preventDefault();
									setDropdownOpen((v) => !v);
								}}
							>
								More<span className="chevron" aria-hidden="true">▾</span>
							</button>
							<ul
								className="dropdown-menu"
								role="menu"
								style={{ display: dropdownOpen ? 'block' : 'none' }}
							>
								<li role="none"><a role="menuitem" href="#benefits">Research</a></li>
								<li role="none"><a role="menuitem" href="#faq">FAQs</a></li>
								<li role="none"><a role="menuitem" href="#contact">Contact</a></li>
							</ul>
						</li> */}
					</ul>
				<a className="btn btn-secondary btn-sponsors" href="/#sponsors">For Sponsors</a>
					<a className="btn btn-primary" type='button' href='/tickets'>Get Tickets</a>
					{/* <a className="btn btn-primary" type='button' onClick={() => setTicketModal(true)}>Get Tickets</a> */}

				</nav>

			</header>
		{/* Modal */}
		{isModalOpen && (
        <OpenModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
		</>

			{ticketModal && (
				<TicketModal onClose={() => setTicketModal(false)} />
			)}
		</>
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
    aria-label="What is True North Spatial"
  >
    <button
      type="button"
      className="person-modal-close"
      onClick={onClose}
      aria-label="Close"
    >
      ✕
    </button>

    <div className="person-modal-desc" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <img
      src="/TNS2026-logo.png"      // ← replace with your actual path
      alt="True North Spatial Logo"
      style={{
        width: "100px",                // small + clean
        height: "100px",
        objectFit: "contain",
        marginBottom: "0.75rem",
        opacity: 0.9,
		margin: "0 auto",
      }}
    />
      <h4 style={{ marginTop: "1rem", fontWeight: 600, textAlign: 'center' }}>Our Mission for True North Spatial 2026</h4>

      <p>
        Our inaugural True North Spatial 2026 is a convergence of our Panoramic Chapters,
        for global engagement through Canada - our True North. True North Spatial 2026 will
        set the stage, positioning Panoramics - A Vision Inc. as a pan-Canadian hub for
        spatial &amp; single cell biology and will assume a yearly occurrence.
      </p>

      <p>
        To elevate scientific exposition in spatial and single cell biology by creating a unique
        nexus, a convergence of minds right here in Canada - our True North that grounds our
        vision - through the mission statements of our Panoramic Chapters.
      </p>
    </div>
  </div>
</div>

    );
}

