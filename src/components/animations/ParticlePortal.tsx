'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './ParticlePortal.module.css';

interface ParticlePortalProps {
  onComplete?: () => void;
  isActive: boolean;
}

export default function ParticlePortal({ onComplete, isActive }: ParticlePortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const phaseRef = useRef<'gather' | 'dissolve'>('gather');
  const progressRef = useRef(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(0, 0, width, height);

    const colors = ['#667EEA', '#764BA2', '#F093FB'];
    const particleCount = 120;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      angle: number;
      radius: number;
      speed: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 50 + Math.random() * 150;
      particles.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.6 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle,
        radius,
        speed: 0.02 + Math.random() * 0.015,
      });
    }

    let frameCount = 0;
    const gatherDuration = 180;
    const holdDuration = 60;
    const dissolveDuration = 120;

    const animationLoop = () => {
      frameCount++;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.fillRect(0, 0, width, height);

      const totalFrames = gatherDuration + holdDuration + dissolveDuration;

      if (frameCount <= gatherDuration) {
        progressRef.current = frameCount / gatherDuration;
        const ease = 1 - Math.pow(1 - progressRef.current, 3);

        particles.forEach((p, i) => {
          const targetRadius = 80 + Math.sin(i * 0.5) * 60;
          const targetX = width / 2 + Math.cos(p.angle) * targetRadius * (1 - ease);
          const targetY = height / 2 + Math.sin(p.angle) * targetRadius * (1 - ease);

          p.x += (targetX - p.x) * p.speed * ease * 3;
          p.y += (targetY - p.y) * p.speed * ease * 3;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.7 + ease * 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      } else if (frameCount <= gatherDuration + holdDuration) {
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.9;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x + 3, p.y + 3, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(240, 147, 251, 0.3)';
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      } else if (frameCount <= totalFrames) {
        const dissolveProgress = (frameCount - gatherDuration - holdDuration) / dissolveDuration;
        const ease = 1 - Math.pow(1 - dissolveProgress, 2);

        particles.forEach((p) => {
          p.x += (Math.random() - 0.5) * 8 * ease;
          p.y -= 3 * ease + Math.random() * 2 * ease;
          p.alpha = Math.max(0, 1 - dissolveProgress);

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      } else {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        onComplete?.();
        return;
      }

      animationRef.current = requestAnimationFrame(animationLoop);
    };

    animationRef.current = requestAnimationFrame(animationLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    const cleanup = animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      cleanup?.();
    };
  }, [isActive, animate]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}