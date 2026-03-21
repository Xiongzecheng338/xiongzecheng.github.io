'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from '@/components/ErrorBoundary';
import ParticlePortal from '@/components/animations/ParticlePortal';
import DoorOpen from '@/components/animations/DoorOpen';
import styles from './page.module.css';

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinner} />
      <p>Loading...</p>
    </div>
  );
}

export default function EntryPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'particle' | 'door' | 'done'>('particle');
  const [showSkip, setShowSkip] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleParticleComplete = () => {
    setPhase('door');
  };

  const handleDoorComplete = () => {
    setPhase('done');
    setTimeout(() => {
      setShowContent(true);
      router.push('/home');
    }, 500);
  };

  const handleSkip = () => {
    setPhase('done');
    setShowContent(true);
    router.push('/home');
  };

  return (
    <ErrorBoundary fallback={<LoadingSpinner />}>
      <main className={styles.main}>
        <AnimatePresence mode="wait">
          {phase === 'particle' && (
            <ErrorBoundary key="particle" fallback={<LoadingSpinner />}>
              <ParticlePortal
                isActive={true}
                onComplete={handleParticleComplete}
              />
            </ErrorBoundary>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {phase === 'door' && (
            <ErrorBoundary key="door" fallback={<LoadingSpinner />}>
              <DoorOpen
                isActive={true}
                onComplete={handleDoorComplete}
              />
            </ErrorBoundary>
          )}
        </AnimatePresence>

        <div className={styles.overlay}>
          <motion.div
            className={styles.titleContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'particle' ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={styles.title}>Anonymous</h1>
            <p className={styles.subtitle}>Creative Developer</p>
          </motion.div>
        </div>

        <AnimatePresence>
          {showSkip && phase !== 'done' && (
            <motion.button
              className={styles.skipButton}
              onClick={handleSkip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Skip Animation
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div
              className={styles.loading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.spinner} />
              <p>Loading...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </ErrorBoundary>
  );
}