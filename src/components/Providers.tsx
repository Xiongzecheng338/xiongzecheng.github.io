'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import NetworkStatus from './ui/NetworkStatus';

const ParticleRain = dynamic(() => import('./effects/ParticleRain'), { ssr: false });

export default function Providers() {
  return (
    <LanguageProvider>
      <NetworkStatus />
      <ParticleRain color="rgba(0, 212, 255, 0.25)" count={80} />
    </LanguageProvider>
  );
}