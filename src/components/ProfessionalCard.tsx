import type { ReactNode } from 'react';

import styles from './ProfessionalCard.module.css';

export interface ProfessionalCardProps {
	title: string;
	subtitle: string;
	content: ReactNode;
	/** When omitted, the card renders text only (gradient frame still wraps the card). */
	picture?: string;
	/** Defaults to `title` when `picture` is set; pass `""` for decorative images. */
	pictureAlt?: string;
	className?: string;
}

export default function ProfessionalCard({
	title,
	subtitle,
	content,
	picture,
	pictureAlt,
	className,
}: ProfessionalCardProps) {
	const alt = picture ? (pictureAlt ?? title) : undefined;

	return (
		<article
			className={[
				styles.card,
				picture ? styles.hasMedia : '',
				className ?? '',
			]
				.filter(Boolean)
				.join(' ')}
		>
			<div className={styles.inner}>
				{picture ? (
					<div className={styles.media}>
						<img src={picture} alt={alt ?? ''} />
						<div className={styles.mediaGlow} aria-hidden />
					</div>
				) : null}
				<div className={styles.body}>
					<p className={styles.subtitle}>{subtitle}</p>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.content}>{content}</div>
				</div>
			</div>
		</article>
	);
}
