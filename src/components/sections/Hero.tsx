'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './Hero.module.css';

const ThreeScene = dynamic(() => import('@/components/3d/ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className={styles.threeLoader}>
      <div className={styles.loaderSpinner} />
    </div>
  ),
});

const symbols = ['< >', '{ }', '[ ]', '( )', '/ *', '=>', '&&', '||'];

export default function Hero() {
  const { t, language } = useLanguage();
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const titles = t.hero.titles;
    const currentText = titles[titleIndex];
    setDisplayedText('');

    let charIndex = 0;
    const typeSpeed = language === 'zh' ? 100 : 80;
    const eraseSpeed = language === 'zh' ? 50 : 40;
    const pauseDuration = 2000;

    const type = () => {
      if (charIndex < currentText.length) {
        setDisplayedText(currentText.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        setTimeout(() => {
          erase();
        }, pauseDuration);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        setDisplayedText(currentText.substring(0, charIndex - 1));
        charIndex--;
        setTimeout(erase, eraseSpeed);
      } else {
        setTitleIndex((prev) => (prev + 1) % titles.length);
      }
    };

    const timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, [titleIndex, t.hero.titles, language]);

  return (
    <section className={styles.hero}>
      <div className={styles.threeContainer}>
        <ThreeScene />
      </div>

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
          whileHover={{ rotate: 360, scale: 1.1 }}
        >
          <span className={styles.symbolText}>{'{ }'}</span>
        </motion.div>

        <motion.h1
          className={styles.name}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t.hero.name}
        </motion.h1>

        <motion.div
          className={styles.titleContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className={styles.title}>
            {displayedText}
            <span className={`${styles.cursor} ${cursorVisible ? styles.cursorVisible : ''}`}>|</span>
          </span>
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
            <span>{language === 'zh' ? '探索更多' : 'Explore More'}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </motion.a>

          <motion.a
            href="/projects"
            className={styles.ctaSecondary}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{language === 'zh' ? '查看项目' : 'View Projects'}</span>
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
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className={styles.scrollText}>{t.hero.scrollHint}</span>
      </motion.div>
    </section>
  );
}