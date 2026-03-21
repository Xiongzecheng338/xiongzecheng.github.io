'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    particlesJS: (tagId: string, options: object) => void;
  }
}

export default function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadParticles = async () => {
      if (typeof window !== 'undefined' && containerRef.current) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
          if (window.particlesJS) {
            window.particlesJS('particles-container', {
              particles: {
                number: {
                  value: 80,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: ['#667EEA', '#764BA2', '#F093FB'],
                },
                shape: {
                  type: 'circle',
                  stroke: {
                    width: 0,
                    color: '#000000',
                  },
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 4,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: '#667EEA',
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: 'none',
                  random: true,
                  straight: false,
                  out_mode: 'out',
                  attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              interactivity: {
                detect_on: 'canvas',
                events: {
                  onhover: {
                    enable: true,
                    mode: 'grab',
                  },
                  onclick: {
                    enable: true,
                    mode: 'push',
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 200,
                    line_linked: {
                      opacity: 0.5,
                    },
                  },
                  push: {
                    particles_nb: 4,
                  },
                },
              },
              retina_detect: true,
            });
          }
        };
        document.body.appendChild(script);
      }
    };

    loadParticles();

    return () => {
      const script = document.querySelector('script[src*="particles.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  return (
    <div
      id="particles-container"
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}