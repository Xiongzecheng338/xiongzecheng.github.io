'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './DoorOpen.module.css';

interface DoorOpenProps {
  onComplete?: () => void;
  isActive: boolean;
}

export default function DoorOpen({ onComplete, isActive }: DoorOpenProps) {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to([leftRef.current, rightRef.current], {
      scaleX: 0,
      duration: 1.5,
      ease: 'power2.inOut',
      stagger: 0.1,
      transformOrigin: 'left center',
    })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.doorLeft} ref={leftRef}>
        <div className={styles.doorInner}>
          <span className={styles.doorText}>A</span>
        </div>
      </div>
      <div className={styles.doorRight} ref={rightRef}>
        <div className={styles.doorInner}>
          <span className={styles.doorText}>P</span>
        </div>
      </div>
    </div>
  );
}