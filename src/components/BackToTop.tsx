'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<button
			className={`to-top ${visible ? 'is-visible' : ''}`}
			aria-label="Back to top"
			onClick={() => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}}
		>
			↑
		</button>
	);
}


