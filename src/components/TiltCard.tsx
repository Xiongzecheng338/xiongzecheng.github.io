'use client';

import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (element) {
      VanillaTilt.init(element, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        scale: 1.05,
      });

      return () => {
        const tiltElement = element as unknown as { vanillaTilt?: { destroy: () => void } };
        if (tiltElement.vanillaTilt) {
          tiltElement.vanillaTilt.destroy();
        }
      };
    }
  }, []);

  return (
    <div ref={cardRef} className={className} data-tilt>
      {children}
    </div>
  );
}