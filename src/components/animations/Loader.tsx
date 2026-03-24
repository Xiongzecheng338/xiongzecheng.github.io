'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './Loader.module.css';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const { t } = useLanguage();
  const taglines = t.loader.taglines;
  const [phase, setPhase] = useState(0);
  const [currentTagline, setCurrentTagline] = useState(0);

  useEffect(() => {
    const phase1 = setTimeout(() => setPhase(1), 600);
    const phase2 = setTimeout(() => setPhase(2), 1400);
    const taglineInterval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 500);
    const complete = setTimeout(() => {
      setPhase(3);
      setTimeout(onComplete, 800);
    }, 2800);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearInterval(taglineInterval);
      clearTimeout(complete);
    };
  }, [onComplete, taglines.length]);

  return (
    <motion.div
      className={styles.loader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className={styles.particles}>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) - 500,
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) - 400,
              scale: 0,
            }}
            animate={{
              x: [null, Math.random() * 200 - 100, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000) - 500],
              y: [null, Math.random() * 200 - 100, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) - 400],
              scale: phase >= 2 ? [0, 1, 0] : [0, 1, 1],
              opacity: phase >= 2 ? [1, 1, 0] : [0, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.05,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.logo}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: phase >= 1 ? 1 : 0,
          scale: phase >= 1 ? 1 : 0.8,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className={styles.bracket}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {'{'}
        </motion.div>
        <motion.span
          className={styles.logoText}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          bad
        </motion.span>
        <motion.span
          className={styles.logoHighlight}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          hope
        </motion.span>
        <motion.div
          className={styles.bracket}
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {'}'}
        </motion.div>
      </motion.div>

      <div className={styles.taglineContainer}>
        <AnimatePresence mode="wait">
          <motion.p
            key={currentTagline}
            className={styles.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {taglines[currentTagline]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        className={styles.progressBar}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase >= 2 ? 1 : phase >= 1 ? 0.5 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      <motion.button
        className={styles.skipButton}
        onClick={onComplete}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {t.loader.skip || '跳过'}
      </motion.button>

      <motion.div
        className={styles.decorLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: phase >= 1 ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
      />

      {phase >= 2 && (
        <motion.div
          className={styles.enterHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span>探索我的世界</span>
          <motion.div
            className={styles.scrollIndicator}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
