'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './Footer.module.css';

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/badhope', icon: '🐙' },
  { label: 'CSDN', href: 'https://blog.csdn.net/weixin_56622231', icon: '📚' },
  { label: '掘金', href: 'https://juejin.cn/user/2350111542479753', icon: '💎' },
  { label: 'Email', href: 'mailto:x18825407105@outlook.com', icon: '📧' },
];

export default function Footer() {
  const { t, language } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/#about' },
    { label: t.nav.projects, href: '/#projects' },
    { label: t.nav.blog, href: '/blog' },
    { label: t.nav.tools, href: '/tools' },
    { label: t.nav.resume, href: '/resume' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <motion.div
          className={styles.top}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoBracket}>{"{"}</span>
              <span className={styles.logoText}>bad</span>
              <span className={styles.logoHighlight}>hope</span>
              <span className={styles.logoBracket}>{"}"}</span>
            </div>
            <p className={styles.tagline}>
              {language === 'zh'
                ? '全栈开发者 · AI时代探索者 · 开源贡献者'
                : 'Full-Stack Developer · AI Era Explorer · Open Source Contributor'}
            </p>
          </div>

          <div className={styles.navSection}>
            <span className={styles.navTitle}>{language === 'zh' ? '导航' : 'Navigation'}</span>
            <div className={styles.navLinks}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.socialSection}>
            <span className={styles.navTitle}>{language === 'zh' ? '社交' : 'Social'}</span>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  title={link.label}
                >
                  <span>{link.icon}</span>
                  <span className={styles.socialLabel}>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.divider} />
          <div className={styles.copyright}>
            <span className={styles.year}>2024 - {new Date().getFullYear()}</span>
            <span className={styles.separator}>·</span>
            <span className={styles.name}>badhope</span>
            <span className={styles.separator}>·</span>
            <span className={styles.location}>深圳 · 广东 · 中国</span>
          </div>
          <div className={styles.build}>
            <span className={styles.buildLabel}>{t.footer.builtWith}</span>
            <span className={styles.buildTech}>Next.js · TypeScript · Framer Motion</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}