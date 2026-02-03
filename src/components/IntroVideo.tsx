'use client';

import { useState, useEffect } from 'react';

export default function IntroVideo() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent scrolling when the modal is open
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsVisible(false);
            }
        };

        if (isVisible) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div className="intro-overlay" onClick={() => setIsVisible(false)}>
            <div className="intro-content">
                <button 
                    className="intro-close-btn" 
                    onClick={(e) => {
                         e.stopPropagation();
                         setIsVisible(false);
                    }}
                    aria-label="Close video"
                >
                    ✕
                </button>

                {/* --- Option 1: YouTube Video --- 
                <iframe
                    className="intro-video"
                    width="1000"
                    height="562" 
                    src="https://www.youtube.com/watch?v=AuJzMnH78wM?autoplay=1&mute=1&cc_load_policy=1"
                    title="Intro Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ aspectRatio: '16/9' }}
                ></iframe> */}

                {/* --- Option 2: Local Video --- */}
                
                <video 
                    className="intro-video" 
                    autoPlay 
                    muted 
                    playsInline 
                    controls
                    onClick={(e) => e.stopPropagation()}
                    onEnded={() => setIsVisible(false)}
                >
                    <source src="/videos/Social_Registration_Draft_Panoramics_TSN_V5.mp4" type="video/mp4" />
                    <track 
                        kind="captions" 
                        label="English" 
                        srcLang="en" 
                        src="/videos/captions.vtt" 
                        default 
                    />
                    Your browser does not support the video tag.
                </video> 
               
            </div>
        </div>
    );
}
