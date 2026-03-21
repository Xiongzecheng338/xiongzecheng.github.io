'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './ParticlePortal.module.css';

interface ParticlePortalProps {
  onComplete?: () => void;
  isActive: boolean;
}

export default function ParticlePortal({ onComplete, isActive }: ParticlePortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number;
    targetY: number;
    size: number;
    alpha: number;
    color: string;
    speed: number;
  }

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#667EEA', '#764BA2', '#F093FB'];
    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        targetX: width / 2 + (Math.random() - 0.5) * 200,
        targetY: height / 2 + (Math.random() - 0.5) * 200,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 0.01 + Math.random() * 0.02,
      });
    }

    particlesRef.current = particles;

    let isAnimating = true;
    let phase: 'gather' | 'hold' | 'dissolve' = 'gather';
    let phaseTimer = 0;

    const animate = () => {
      if (!isAnimating) return;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, i) => {
        if (phase === 'gather') {
          p.x += (p.targetX - p.x) * p.speed;
          p.y += (p.targetY - p.y) * p.speed;
        } else if (phase === 'dissolve') {
          p.x += (Math.random() - 0.5) * 10;
          p.y -= 2 + Math.random() * 2;
          p.alpha -= 0.015;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', `, ${Math.max(0, p.alpha)})`).replace('rgb', 'rgba');
        ctx.fill();

        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(p.x + 5, p.y + 5, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(240, 147, 251, 0.3)';
          ctx.fill();
        }
      });

      phaseTimer += 16;
      if (phase === 'gather' && phaseTimer > 3000) {
        phase = 'hold';
        phaseTimer = 0;
      } else if (phase === 'hold' && phaseTimer > 500) {
        phase = 'dissolve';
        setTimeout(() => {
          isAnimating = false;
          onComplete?.();
        }, 1500);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isAnimating = false;
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, onComplete]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}