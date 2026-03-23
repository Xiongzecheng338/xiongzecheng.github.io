'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const titles = [
  '全栈开发者',
  'AI时代探索者',
  '开源贡献者',
  '数据工程师',
];

const symbols = ['< >', '{ }', '[ ]', '( )', '/ *', '=>', '&&', '||'];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#00d4ff', '#bf5af2', '#ff375f', '#667EEA'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      };
    };

    for (let i = 0; i < 100; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 120) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowTitle(false);
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % titles.length);
        setShowTitle(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className={styles.symbol}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        >
          <span className={styles.symbolText}>{'{ }'}</span>
        </motion.div>

        <motion.h1
          className={styles.name}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          badhope
        </motion.h1>

        <motion.div
          className={styles.titleContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: showTitle ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.title}>{titles[titleIndex]}</span>
        </motion.div>

        <motion.div
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className={styles.location}>深圳 · 广东 · 中国</span>
          <span className={styles.dot}>·</span>
          <span className={styles.major}>数据科学与大数据技术</span>
        </motion.div>

        <motion.div
          className={styles.codeSymbols}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {symbols.map((sym, i) => (
            <motion.span
              key={sym}
              className={styles.codeSymbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
            >
              {sym}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="#about"
            className={styles.ctaPrimary}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>探索更多</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </motion.a>
          <motion.a
            href="/contact"
            className={styles.ctaSecondary}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            联系我
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className={styles.scrollLine}
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className={styles.scrollText}>scroll</span>
      </motion.div>
    </section>
  );
}
