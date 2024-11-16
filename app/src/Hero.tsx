import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Hero = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      const isMobile = p.windowWidth < 640;
      const memoryLimit = navigator.deviceMemory || 4;
      let particles = [];
      const noiseScale = isMobile ? 0.004 : 0.003;
      const speedMultiplier = isMobile ? 4 : 2;
      const numParticles = isMobile
        ? 2500
        : memoryLimit > 4
        ? 11000
        : 2500;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.noFill();
        for (let i = 0; i < numParticles; i++) {
          particles.push(p.createVector(p.random(p.width), p.random(p.height)));
        }
        p.stroke(255, isMobile ? 100 : 80);
        p.strokeWeight(isMobile ? 1.5 : 1);
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0, 20);

        // Get elapsed time in seconds, scaled for smooth movement
        const timeFactor = p.millis() * 0.0001;

        particles.forEach((pnt) => {
          p.stroke(255, 100);
          p.point(pnt.x, pnt.y);

          // Modify angle with a time factor for dynamic movement
          const angle = p.TWO_PI * p.noise(pnt.x * noiseScale, pnt.y * noiseScale, timeFactor);
          pnt.x += p.cos(angle) * speedMultiplier;
          pnt.y += p.sin(angle) * speedMultiplier;

          if (!onScreen(pnt)) {
            pnt.set(p.random(p.width), p.random(p.height));
          }
        });
      };

      const onScreen = (v) => v.x >= 0 && v.x <= p.width && v.y >= 0 && v.y <= p.height;

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        particles = [];
        for (let i = 0; i < numParticles; i++) {
          particles.push(p.createVector(p.random(p.width), p.random(p.height)));
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => p5Instance.remove();
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen text-white bg-black overflow-hidden">
      <div ref={sketchRef} className="absolute inset-0 m-0 p-0" />
      <div className="relative z-10 text-center max-w-xl mx-auto px-4">
        <h1 className="font-semibold text-6xl md:text-8xl mb-4 leading-tight">
          retomizer
        </h1>
        <p className="text-sm sm:text-lg leading-relaxed max-w-md mx-auto ">
          Simplified and optimized state management solution for your React apps
        </p>
      </div>
    </div>
  );
};

export default Hero;
