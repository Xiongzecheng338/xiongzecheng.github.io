'use client';

import { useState } from 'react';
import Loader from '@/components/animations/Loader';
import Navigation from '@/components/ui/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navigation />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
        </main>
        <Footer />
      </div>
    </>
  );
}
