'use client';

import { useEffect, useRef, useState } from 'react';
import TicketModal from './TicketModal';

export default function SiteHeader() {
	const [navOpen, setNavOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement | null>(null);
	const [scrolled, setScrolled] = useState(false);
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
						<li><a id='highlighted-link' href="#vision">Our Vision</a></li>
						<li><a href="#schedule">Schedule</a></li>
						<li><a href="#sponsors">Sponsors</a></li>
						<li><a href="#team">Speakers</a></li>
						<li><a href="#faq">FAQs</a></li>
						<li><a href="#contact">Contact</a></li>
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

					<a className="btn btn-primary" type='button' onClick={() => setTicketModal(true)}>Get Tickets</a>
				</nav>
			</header>

			{ticketModal && (
				<TicketModal onClose={() => setTicketModal(false)} />
			)}
		</>
	);
}


