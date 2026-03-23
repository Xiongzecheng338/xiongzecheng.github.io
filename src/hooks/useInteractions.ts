'use client';

import { useCallback, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function useMagneticEffect(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    setIsHovered(false);
  }, []);

  return {
    ref,
    handleMouseMove,
    handleMouseLeave,
    isHovered,
    setIsHovered,
  };
}

export function useRippleEffect() {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: idRef.current++ };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  return { ripples, handleClick };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const newProgress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
    setProgress(newProgress);
    setScrollY(currentScroll);
  }, []);

  return { progress, scrollY, handleScroll };
}

export function useSpringHover(scale = 1.05) {
  const scaleValue = useSpring(1, { stiffness: 400, damping: 17 });

  return {
    scaleValue,
    onMouseEnter: () => scaleValue.set(scale),
    onMouseLeave: () => scaleValue.set(1),
  };
}
