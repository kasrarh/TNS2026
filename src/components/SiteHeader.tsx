'use client';

import { useEffect, useRef, useState } from 'react';
import TicketModal from './TicketModal';

/** Matches the 800px breakpoint where globals.css switches to the collapsible mobile menu. */
const isDesktopNav = () => window.matchMedia('(min-width: 801px)').matches;

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
					<a className="logo" href="/" aria-label="Home">
						<img src="/Panoramics-transparent-cropped.png" alt="Panoramics - A Vision Logo" />
						{/* <span className="logo-mark" aria-hidden="true"></span> */}
						{/* <span className="tx-light">Company</span> */}
					</a>

					<button
						className="nav-toggle"
						aria-expanded={navOpen}
						aria-controls="nav-menu"
						onClick={() => {
							setNavOpen((v) => !v);
							setDropdownOpen(false);
						}}
					>
						Menu
					</button>

					<ul className={`nav-links ${navOpen ? 'is-open' : ''}`} id="nav-menu">
						<li><a href="/">Home</a></li>
						<li><a id='highlighted-link' href="#vision"
						onClick={(e) => {
						e.preventDefault();
						setIsModalOpen(true); // Open the modal
						}}
					>
						Our Vision
					</a></li>
						<li><a href="/special-sponsors">Sponsors</a></li>
						<li
							className={`nav-dropdown${dropdownOpen ? ' is-open' : ''}`}
							ref={dropdownRef}
							onPointerEnter={(e) => {
								if (e.pointerType === 'mouse' && isDesktopNav()) setDropdownOpen(true);
							}}
							onPointerLeave={(e) => {
								if (e.pointerType === 'mouse' && isDesktopNav()) setDropdownOpen(false);
							}}
						>
							<button
								className="dropdown-trigger"
								aria-expanded={dropdownOpen}
								aria-haspopup="true"
								onClick={(e) => {
									e.preventDefault();
									// On desktop, hover already opened it; a click shouldn't close it again
									if (isDesktopNav()) setDropdownOpen(true);
									else setDropdownOpen((v) => !v);
								}}
							>
								Previous Editions<span className="chevron" aria-hidden="true">▾</span>
							</button>
							<ul className="nav-dropdown-menu" role="menu">
								<li role="none">
									<a role="menuitem" href="/TNS2026" onClick={() => setNavOpen(false)}>
										TNS2026
									</a>
								</li>
							</ul>
						</li>
						<li><a href="https://www.panoramics-a-vision.com">Panoramics - A Vision</a></li>
						<li><a href="/#contact">Contact</a></li>
					</ul>
				{/* <a className="btn btn-secondary btn-sponsors" href="/sponsors">For Sponsors</a> */}
					{/* <a className="btn btn-primary" type='button' href='/tickets'>Get Tickets</a> */}
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
      src="/Panoramics-transparent-cropped.png"
      alt="Panoramics - A Vision Logo"
      style={{
        width: "100px",                // small + clean
        height: "100px",
        objectFit: "contain",
        marginBottom: "0.75rem",
        opacity: 0.9,
		margin: "0 auto",
      }}
    />
      <h4 style={{ marginTop: "1rem", fontWeight: 600, textAlign: 'center' }}>Our Mission for True North Spatial</h4>

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

