'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './Skills.module.css';

export default function Skills() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const skillCategories = [
    {
      title: t.skills.categories.frontend,
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP'],
      color: '#00d4ff',
    },
    {
      title: t.skills.categories.backend,
      skills: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
      color: '#bf5af2',
    },
    {
      title: t.skills.categories.ai,
      skills: ['Machine Learning', 'Data Analysis', 'Pandas', 'PyTorch', 'NLP', 'Computer Vision'],
      color: '#ff375f',
    },
    {
      title: t.skills.categories.devops,
      skills: ['Git', 'Docker', 'Linux', 'AWS', 'CI/CD', 'Vercel'],
      color: '#30d158',
    },
  ];

  return (
    <section ref={containerRef} className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.label}>{t.skills.label}</span>
          <h2 className={styles.title}>
            <span className="gradient-text">{t.skills.title}</span>{language === 'zh' ? '标签云' : ' Cloud'}
          </h2>
        </motion.div>

        <motion.div className={styles.grid} style={{ y }}>
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              style={{
                borderColor: `${category.color}33`,
              }}
            >
              <div
                className={styles.categoryHeader}
                style={{ color: category.color }}
              >
                <span className={styles.categoryDot} style={{ background: category.color }} />
                {category.title}
              </div>
              <div className={styles.tagCloud}>
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className={styles.tag}
                    style={{
                      borderColor: `${category.color}44`,
                      color: category.color,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: category.color,
                      boxShadow: `0 0 20px ${category.color}44`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}