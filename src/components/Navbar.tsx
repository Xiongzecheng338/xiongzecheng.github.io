'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NavbarProps {
  items: string[];
}

export default function Navbar({ items }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center backdrop-blur-md bg-white/30"
    >
      <h2 className="text-2xl font-bold gradient-text cursor-pointer">A.P.</h2>
      <nav className="flex gap-8">
        {items.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-text-secondary hover:text-text-primary transition-colors font-medium relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gradient-start to-gradient-end transition-all group-hover:w-full" />
          </a>
        ))}
      </nav>
    </header>
  );
}