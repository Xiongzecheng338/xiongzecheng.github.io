'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LabelCarousel.module.css';

interface LabelCarouselProps {
  labels: string[];
  interval?: number;
}

export default function LabelCarousel({ labels, interval = 2500 }: LabelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labels.length);
    }, interval);

    return () => clearInterval(timer);
  }, [labels.length, interval]);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.label}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className={styles.text}>{labels[currentIndex]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}