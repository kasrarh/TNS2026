'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AbstractItem {
	_id: string;
	firstName: string;
	lastName: string;
	title: string;
	description?: string;
	backgroundBlobUrl?: string | null;
	status: string;
}

export default function AbstractPresentersPreviewSection() {
	const [abstracts, setAbstracts] = useState<AbstractItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchAbstracts() {
			try {
				const res = await fetch('/api/abstracts');
				if (!res.ok) throw new Error('Failed to fetch abstracts');
				const data = await res.json();
				setAbstracts(data.abstracts || []);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}

		fetchAbstracts();
	}, []);

	const presenters = abstracts
		.filter((item) => item.status.toLowerCase() === 'approved')
		.slice(0, 3);

	return (
		<section className="news-section">
			<div className="container">
				<div className="section-title">
					<span className="tag muted-dark">Abstract Presenters</span>
					<h2 className="tx-dark">Featured Abstract Presenters</h2>
				</div>

				<div className="news-grid">
					{loading && <p>Loading abstract presenters...</p>}
					{error && <p className="text-danger">Error: {error}</p>}
					{!loading && !error && presenters.length === 0 && (
						<p>No approved abstract presenters available yet.</p>
					)}

					{presenters.map((abstract) => (
						<article className="news-card" key={abstract._id}>
							{abstract.backgroundBlobUrl ? (
								<div className="news-image">
									<img src={abstract.backgroundBlobUrl} alt={`${abstract.firstName} ${abstract.lastName}`} />
								</div>
							) : null}
							<div className="news-content">
								<span className="news-date">
									{abstract.firstName} {abstract.lastName}
								</span>
								<h3>{abstract.title}</h3>
								{abstract.description ? (
									<p>
										{abstract.description.length > 180
											? `${abstract.description.slice(0, 180)}...`
											: abstract.description}
									</p>
								) : null}
							</div>
						</article>
					))}
				</div>

				<div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
					<Link className="btn btn-primary" href="/abstracts">
						View All Abstracts
					</Link>
				</div>
			</div>
		</section>
	);
}
