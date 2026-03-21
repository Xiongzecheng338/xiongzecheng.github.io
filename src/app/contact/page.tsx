'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import ParticleBackground from '@/components/animations/ParticleBackground';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  description: string;
}

const socials: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/', icon: '🐙', description: 'Open source projects and code' },
  { platform: 'CSDN', url: 'https://csdn.net/', icon: '📚', description: 'Technical articles and tutorials' },
  { platform: '稀土掘金', url: 'https://juejin.cn/', icon: '💎', description: 'Dev community and insights' },
  { platform: 'Email', url: 'mailto:contact@example.dev', icon: '📧', description: 'Get in touch directly' },
];

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Projects', href: '/projects' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '#contact' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.main}>
      <ParticleBackground />
      <Navigation items={navItems} />

      <section className={styles.hero}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.gradientText}>Get in</span> Touch
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Interested in working together? Feel free to reach out!
        </motion.p>
      </section>

      <section id="contact" className={styles.section}>
        <div className={styles.content}>
          <motion.div
            className={styles.socials}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Platforms</h2>
            {socials.map((social, i) => (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <span className={styles.socialIcon}>{social.icon}</span>
                <div className={styles.socialInfo}>
                  <h3>{social.platform}</h3>
                  <p>{social.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>Send a Message</h2>
            {submitted ? (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <span className={styles.successIcon}>✓</span>
                <p>Message sent successfully! I will get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={styles.input}
                  required
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textarea}
                  required
                />
                <Button type="submit" variant="primary" size="lg">Send Message</Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Anonymous Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}