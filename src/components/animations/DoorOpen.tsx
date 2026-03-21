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
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const left = leftRef.current;
    const right = rightRef.current;
    const overlay = overlayRef.current;

    if (!left || !right || !overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.set([left, right], { scaleX: 1 })
      .to(left, {
        scaleX: 0,
        duration: 1.2,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      })
      .to(
        right,
        {
          scaleX: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          transformOrigin: 'right center',
        },
        '<'
      )
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.2'
      );

    return () => {
      tl.kill();
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.doorContainer}>
        <div ref={leftRef} className={styles.doorLeft}>
          <div className={styles.doorGradient} />
          <div className={styles.doorShine} />
        </div>
        <div ref={rightRef} className={styles.doorRight}>
          <div className={styles.doorGradient} />
          <div className={styles.doorShine} />
        </div>
      </div>
    </div>
  );
}