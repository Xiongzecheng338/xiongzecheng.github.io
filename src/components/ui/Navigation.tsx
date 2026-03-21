'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Navigation.module.css';

interface NavigationProps {
  items: { label: string; href: string }[];
}

export default function Navigation({ items }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);

      items.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(href);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.container}>
        <a href="/home" className={styles.logo}>
          <span className={styles.logoText}>A.P.</span>
        </a>
        <div className={styles.links}>
          {items.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`${styles.link} ${activeSection === href ? styles.active : ''}`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}