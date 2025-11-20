'use client';

import { useEffect } from 'react';
import createGlobe from 'cobe';

export default function GlobeSection() {
  useEffect(() => {
    let phi = 0;
    const canvas = document.getElementById('cobe') as HTMLCanvasElement;

    if (canvas) {
      createGlobe(canvas, {
        devicePixelRatio: 2,
        width: 500,
        height: 500,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        scale: 1,
        mapSamples: 16000,
        mapBrightness: 6,
		baseColor: [0, 0.157, 0.224],
		markerColor: [0.89, 0.42, 0.16],  // sunset orange markers
		glowColor: [0.698, 0.510, 0.408],
        offset: [0, 0],
        markers: [
        //   { location: [37.7595, -122.4367], size: 0.03 },
          { location: [43.65107, -79.347015], size: 0.2 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });
    }
  }, []);

  return (
    // <section className="globe">
      <canvas
        id="cobe"
        style={{ width: '250px', height: '250px' }}
        width="1000"
        height="1000"
      ></canvas>
    // </section>
  );
}