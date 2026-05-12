'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const allImages = [
  '/tns2026/pic1.jpg',
  '/tns2026/pic2.jpg',
  '/tns2026/pic3.jpg',
  '/tns2026/pic4.jpg',
  '/tns2026/pic5.jpg',
  '/tns2026/pic6.jpg',
  '/tns2026/pic7.jpg',
  '/tns2026/pic8.jpg',
  '/tns2026/pic9.jpg',
  '/tns2026/pic10.jpg',
  '/tns2026/pic11.jpg',
  '/tns2026/pic12.jpg',
  '/tns2026/pic13.jpg',
  '/tns2026/pic14.jpg',
  '/tns2026/pic16.jpg',
  '/tns2026/pic17.jpg',
  '/tns2026/pic18.jpg',
  '/tns2026/pic19.jpg',
  '/tns2026/pic20.jpg',
  '/tns2026/pic21.jpg',
  '/tns2026/pic22.jpg',
  '/tns2026/pic23.jpg',
  '/tns2026/pic24.jpg',
  '/tns2026/pic25.jpg',
  '/tns2026/pic26.jpg',
  '/tns2026/pic27.jpg',
];

export default function ThankYouSection({ tileCount = 18, overlayText = 'TNS 2026' }: { tileCount?: number; overlayText?: string }) {
    const [tiles, setTiles] = useState<string[]>([]);
    const [flippingIndex, setFlippingIndex] = useState<number | null>(null);

    useEffect(() => {
        // Initial shuffle to prevent same order every time
        const shuffled = [...allImages].sort(() => 0.5 - Math.random());
        // Fill tiles to count, cycling through images
        const initial = Array.from({ length: tileCount }).map((_, i) => shuffled[i % shuffled.length]);
        setTiles(initial);

        // Change one image every 10 seconds
        const intervalId = setInterval(() => {
            // Determine visible range based on screen width
            // If < 768px (mobile), we only show 12 tiles (4x3). If >= 768px, we show tileCount tiles.
            const isMobile = window.innerWidth < 768;
            const maxVisible = isMobile ? 12 : tileCount;
            
            const randomIndex = Math.floor(Math.random() * maxVisible);
            setFlippingIndex(randomIndex);

            // Wait for half rotation (300ms), then swap image
            setTimeout(() => {
                setTiles(prev => {
                    const next = [...prev];
                    let randomImage = allImages[Math.floor(Math.random() * allImages.length)];
                    // Ensure different image so flip is meaningful
                    while (randomImage === next[randomIndex]) {
                        randomImage = allImages[Math.floor(Math.random() * allImages.length)];
                    }
                    next[randomIndex] = randomImage;
                    return next;
                });
            }, 300); 

            // Reset flipping state after full rotation
            setTimeout(() => {
                setFlippingIndex(null);
            }, 600);

        }, 3000); 

        return () => clearInterval(intervalId);
    }, [tileCount]);

    if (tiles.length === 0) return <div className="thankyou-container" style={{ height: '300px' }} />;

    return (
        <section className="thankyou-container" aria-label="Thank You Gallery">
            <div className="thankyou-grid">
                {tiles.map((src, i) => (
                    <div 
                        key={i} 
                        className={`thankyou-tile ${flippingIndex === i ? 'is-flipping' : ''}`}
                    >
                        <div className="thankyou-tile-inner">
                            <Image
                                src={src}
                                alt="Gallery highlight"
                                fill
                                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw"
                                className="thankyou-tile-image"
                            />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="thankyou-overlay">
                  <h1 style={{ fontFamily: 'FinalSix', fontSize: '500%', color: 'rgba(255, 255, 255, 0.75)', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                    {overlayText}
                  </h1>
            </div>
        </section>
    );
}
