'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import styles from './Navigation.module.css';

export default function Navigation() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/#about' },
    { label: t.nav.projects, href: '/#projects' },
    { label: t.nav.blog, href: '/blog/' },
    { label: t.nav.aiAssistant, href: '/ai/' },
    { label: t.nav.tools, href: '/tools/' },
    { label: t.nav.resume, href: '/resume/' },
    { label: t.nav.contact, href: '/contact/' },
  ];

  const socials = [
    { label: 'GitHub', href: 'https://github.com/badhope' },
    { label: 'CSDN', href: 'https://blog.csdn.net/weixin_56622231' },
    { label: '掘金', href: 'https://juejin.cn/user/2350111542479753' },
  ];

  return (
    <motion.nav
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      aria-label={t.nav.home ? 'Main navigation' : '主导航'}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoBracket}>{"{"}</span>
          <span className={styles.logoText}>bad</span>
          <span className={styles.logoHighlight}>hope</span>
          <span className={styles.logoBracket}>{"}"}</span>
        </Link>

        <div className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <div className={styles.socials}>
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                title={social.label}
              >
                {social.label === 'GitHub' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                )}
                {social.label === 'CSDN' && (
                  <span className={styles.socialIcon}>📚</span>
                )}
                {social.label === '掘金' && (
                  <span className={styles.socialIcon}>💎</span>
                )}
              </a>
            ))}
          </div>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="菜单"
        >
          <span className={`${styles.hamburger} ${isMobileOpen ? styles.open : ''}`} />
        </button>
      </div>

      <motion.div
        className={styles.mobileMenu}
        initial={false}
        animate={{ height: isMobileOpen ? 'auto' : 0, opacity: isMobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            onClick={() => setIsMobileOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </motion.div>
    </motion.nav>
  );
}