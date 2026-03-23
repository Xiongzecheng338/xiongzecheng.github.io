'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './About.module.css';

export default function About() {
  const { t, language } = useLanguage();

  const timelineData = t.about.timeline;

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t.about.label}</span>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.about.title}</span>{language === 'zh' ? '开发者' : ' Developer'}
          </h2>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.intro}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.bio}>
              {language === 'zh' ? (
                <>
                  你好！我是 <span className={styles.highlight}>badhope</span>，
                  一名来自深圳的<span className={styles.highlight}>全栈开发者</span>。
                  数据科学与大数据技术专业背景，热衷于用代码创造价值。
                </>
              ) : (
                <>
                  Hello! I am <span className={styles.highlight}>badhope</span>,
                  a <span className={styles.highlight}>full-stack developer</span> from Shenzhen.
                  With a background in Data Science and Big Data Technology, I am passionate about creating value through code.
                </>
              )}
            </p>
            <p className={styles.bio}>
              {language === 'zh' ? (
                <>
                  我是 <span className={styles.highlight}>AI时代探索者</span>，
                  坚信AI是提升生产力的关键。善用AI辅助开发，追求技术卓越。
                </>
              ) : (
                <>
                  I am an <span className={styles.highlight}>AI Era Explorer</span>,
                  convinced that AI is key to boosting productivity. I leverage AI-assisted development and pursue technical excellence.
                </>
              )}
            </p>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { value: '100+', label: t.about.stats.githubStars },
              { value: '50+', label: t.about.stats.projects },
              { value: '10+', label: t.about.stats.contributions },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.5)' }}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className={styles.timeline}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {timelineData.map((item, i) => (
            <motion.div
              key={item.year}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.timelineDot} />
              <span className={styles.timelineYear}>{item.year}</span>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>{item.title}</h4>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}