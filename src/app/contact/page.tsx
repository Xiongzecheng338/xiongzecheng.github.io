'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './page.module.css';

const socialsData = [
  { platform: 'GitHub', url: 'https://github.com/badhope', icon: '🐙' },
  { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_56622231', icon: '📚' },
  { platform: 'Juejin', url: 'https://juejin.cn/user/2350111542479753', icon: '💎' },
  { platform: 'Email', url: 'mailto:x18825407105@outlook.com', icon: '📧' },
];

export default function ContactPage() {
  const { t, language } = useLanguage();
  const contact = t.contact;
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || submitted) return;

    setIsSubmitting(true);

    const mailtoLink = `mailto:x18825407105@outlook.com?subject=${encodeURIComponent(`Contact from ${formData.name} (${formData.email})`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

    window.location.href = mailtoLink;

    await new Promise(resolve => setTimeout(resolve, 500));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (!mounted) {
    return (
      <div className={styles.page}>
        <Navigation />
        <main className={styles.main}>
          <div className={styles.loading}>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const isZh = language === 'zh';

  return (
    <div className={styles.page}>
      <Navigation />

      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>{contact.label}</span>
            <h1 className={styles.title}>
              <span className="gradient-text">{isZh ? '保持' : 'Get in'}</span>{isZh ? '联系' : ' Touch'}
            </h1>
            <p className={styles.subtitle}>{contact.subtitle}</p>
          </motion.div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <motion.div
                className={styles.socials}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.sectionTitle}>{contact.socialsTitle}</h2>
                <div className={styles.socialGrid}>
                  {socialsData.map((social, i) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10, borderColor: 'rgba(0, 212, 255, 0.5)' }}
                    >
                      <span className={styles.socialIcon}>{social.icon}</span>
                      <div className={styles.socialInfo}>
                        <h3>{social.platform}</h3>
                        <p>{contact.socialsDesc[i]}</p>
                      </div>
                      <svg className={styles.socialArrow} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className={styles.formContainer}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className={styles.sectionTitle}>{contact.formTitle}</h2>
                {submitted ? (
                  <motion.div
                    className={styles.successMessage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className={styles.successIcon}>✨</span>
                    <h3>{contact.successTitle}</h3>
                    <p>{contact.successDesc}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="name">{contact.nameLabel}</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={contact.namePlaceholder}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">{contact.email}</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={contact.emailPlaceholder}
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="message">{contact.message}</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={contact.messagePlaceholder}
                        rows={5}
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={isSubmitting}
                      whileHover={isSubmitting ? {} : { scale: 1.02 }}
                      whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    >
                      <span>{isSubmitting ? (isZh ? '发送中...' : 'Sending...') : contact.send}</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}