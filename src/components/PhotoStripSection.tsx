// Full-bleed photo band (same idea as .tns-showcase-bg): a gapless collage that
// fills the page width. The portrait photo spans both rows; landscapes fill the rest.
const photos = [
	{
		name: 'yonge-street-winter', area: 'a', width: 1600, height: 1066,
		sizes: '(max-width: 768px) 60vw, 40vw',
		alt: 'Yonge Street in Toronto on a snowy winter evening',
	},
	{
		name: 'maple-leaf-park', area: 'p', width: 1600, height: 2402,
		sizes: '(max-width: 768px) 40vw, 24vw',
		alt: 'Red maple leaves in a Toronto park',
	},
	{
		name: 'autumn-skyline', area: 'b', width: 1600, height: 991,
		sizes: '(max-width: 768px) 60vw, 40vw',
		alt: 'Toronto skyline framed by autumn foliage',
	},
	{
		name: 'skyline-dusk', area: 'c', width: 1600, height: 939,
		sizes: '(max-width: 768px) 50vw, 40vw',
		alt: 'Toronto skyline and CN Tower at dusk',
	},
	{
		name: 'toronto-sign', area: 'd', width: 1600, height: 1068,
		sizes: '(max-width: 768px) 50vw, 40vw',
		alt: 'The illuminated Toronto sign at Nathan Phillips Square',
	},
];

export default function PhotoStripSection() {
	return (
		<section className="photo-strip" aria-label="Toronto photo gallery">
			<ul className="photo-strip-list">
				{photos.map((photo) => (
					<li key={photo.name} className={`photo-strip-item photo-strip-item--${photo.area}`}>
						<figure className="photo-strip-figure">
							<img
								src={`/strip/${photo.name}-800.webp`}
								srcSet={`/strip/${photo.name}-800.webp 800w, /strip/${photo.name}-1600.webp 1600w`}
								sizes={photo.sizes}
								width={photo.width}
								height={photo.height}
								loading="lazy"
								decoding="async"
								alt={photo.alt}
							/>
						</figure>
					</li>
				))}
			</ul>
		</section>
	);
}
