'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import styles from './page.module.css';

const navItems = [
  { label: '首页', href: '/' },
  { label: '关于', href: '/#about' },
  { label: '项目', href: '/#projects' },
  { label: '博客', href: '/blog' },
  { label: '工具', href: '/tools' },
  { label: '简历', href: '/resume' },
  { label: '联系', href: '/contact' },
];

const socials = [
  { platform: 'GitHub', url: 'https://github.com/badhope', icon: '🐙', desc: '开源项目与代码' },
  { platform: 'CSDN', url: 'https://blog.csdn.net/weixin_56622231', icon: '📚', desc: '技术博客文章' },
  { platform: '稀土掘金', url: 'https://juejin.cn/user/2350111542479753', icon: '💎', desc: '开发心得分享' },
  { platform: 'Email', url: 'mailto:x18825407105@outlook.com', icon: '📧', desc: '商务合作联系' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={styles.page}>
      <Navigation items={navItems} />

      <main className={styles.main}>
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.label}>联系</span>
            <h1 className={styles.title}>
              <span className="gradient-text">保持</span>联系
            </h1>
            <p className={styles.subtitle}>
              有项目合作或技术交流？随时欢迎联系我
            </p>
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
                <h2 className={styles.sectionTitle}>社交平台</h2>
                <div className={styles.socialGrid}>
                  {socials.map((social, i) => (
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
                        <p>{social.desc}</p>
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
                <h2 className={styles.sectionTitle}>发送消息</h2>
                {submitted ? (
                  <motion.div
                    className={styles.successMessage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className={styles.successIcon}>✨</span>
                    <h3>消息已发送！</h3>
                    <p>感谢你的留言，我会尽快回复。</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="name">姓名</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="你的名字"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="email">邮箱</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="message">留言</label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="想和我说些什么..."
                        rows={5}
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className={styles.submitBtn}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>发送消息</span>
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
