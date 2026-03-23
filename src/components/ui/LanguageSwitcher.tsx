'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.switcher}>
      <motion.button
        className={`${styles.button} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch to English"
      >
        <span className={styles.flag}>EN</span>
      </motion.button>
      <motion.button
        className={`${styles.button} ${language === 'zh' ? styles.active : ''}`}
        onClick={() => setLanguage('zh')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="切换到中文"
      >
        <span className={styles.flag}>中文</span>
      </motion.button>
    </div>
  );
}