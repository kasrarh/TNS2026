'use client';

import { useEffect, useRef, useState } from 'react';

export default function SiteHeader() {
	const [navOpen, setNavOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLLIElement | null>(null);

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

	return (
		<header className="site-header" id="top">
			<nav className="navbar container" aria-label="Primary">
				<a className="logo" href="#top" aria-label="Home">
					<span className="logo-mark" aria-hidden="true"></span>
					<span className="tx-light">Company</span>
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
					<li><a href="#schedule">Schedule</a></li>
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

				<a className="btn btn-primary" href="#tickets">Get Tickets</a>
			</nav>
		</header>
	);
}


