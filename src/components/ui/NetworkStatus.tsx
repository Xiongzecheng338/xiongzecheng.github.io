'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './NetworkStatus.module.css';

export default function NetworkStatus() {
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  const isZh = language === 'zh';

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showBanner && !isOnline && (
        <motion.div
          className={styles.banner}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          role="alert"
          aria-live="assertive"
        >
          <span className={styles.icon}>⚡</span>
          <span>{isZh ? '网络连接已断开，部分功能可能不可用' : 'Network connection lost. Some features may be unavailable.'}</span>
          <button
            className={styles.dismiss}
            onClick={() => setShowBanner(false)}
            aria-label={isZh ? '关闭提示' : 'Dismiss'}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}