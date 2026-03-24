'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './page.module.css';

export default function ResumePage() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePrint = () => {
    window.print();
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

  const resume = t.resume;
  const currentLocation = language === 'zh' ? resume.location.zh : resume.location.en;

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
            <span className={styles.label}>{resume.label}</span>
            <h1 className={styles.title}>
              <span className="gradient-text">bad</span>hope
            </h1>
            <p className={styles.subtitle}>{resume.subtitle}</p>
            <div className={styles.contact}>
              <span>📍 {currentLocation}</span>
              <span>📧 x18825407105@outlook.com</span>
            </div>
          </motion.div>

          <div className={styles.buttonGroup}>
            <motion.a
              href="/resume.pdf"
              download="badhope_resume.pdf"
              className={styles.downloadBtn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              <span>{resume.download}</span>
            </motion.a>

            <motion.button
              onClick={handlePrint}
              className={styles.printBtn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6z"/>
              </svg>
              <span>{resume.print}</span>
            </motion.button>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.sectionNumber}>01</span>
              {resume.sections.summary}
            </motion.h2>
            <motion.div
              className={styles.summary}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>{resume.summary.p1}</p>
              <p>{resume.summary.p2}</p>
              <p>{resume.summary.p3}</p>
            </motion.div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.sectionNumber}>02</span>
              {resume.sections.skills}
            </motion.h2>
            <div className={styles.skillsGrid}>
              <motion.div
                className={styles.skillCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <h3 className={styles.skillCategory}>{resume.skills.frontend}</h3>
                <div className={styles.skillTags}>
                  {resume.skills.frontendTags.map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className={styles.skillCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className={styles.skillCategory}>{resume.skills.backend}</h3>
                <div className={styles.skillTags}>
                  {resume.skills.backendTags.map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className={styles.skillCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className={styles.skillCategory}>{resume.skills.aiTools}</h3>
                <div className={styles.skillTags}>
                  {resume.skills.aiToolsTags.map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.sectionNumber}>03</span>
              {resume.sections.experience}
            </motion.h2>
            {resume.experience.map((exp, i) => (
              <motion.div
                key={i}
                className={styles.expCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.expHeader}>
                  <div>
                    <h3 className={styles.expTitle}>{exp.title}</h3>
                    <span className={styles.expCompany}>{exp.company}</span>
                  </div>
                  <span className={styles.expPeriod}>{exp.period}</span>
                </div>
                <p className={styles.expDesc}>{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <motion.h2
              className={styles.sectionTitle}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={styles.sectionNumber}>04</span>
              {resume.sections.education}
            </motion.h2>
            {resume.education.map((edu, i) => (
              <motion.div
                key={i}
                className={styles.eduCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={styles.eduHeader}>
                  <div>
                    <h3 className={styles.eduDegree}>{edu.degree}</h3>
                    <span className={styles.eduSchool}>{edu.school}</span>
                  </div>
                  <span className={styles.eduPeriod}>{edu.period}</span>
                </div>
                <p className={styles.eduDesc}>{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className={styles.cta}>
          <div className={styles.container}>
            <motion.div
              className={styles.ctaContent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={styles.ctaTitle}>{language === 'zh' ? '对我感兴趣？' : 'Interested?'}</h2>
              <p className={styles.ctaDesc}>{language === 'zh' ? '期待与志同道合的朋友交流合作' : 'Looking forward to connecting with like-minded friends'}</p>
              <motion.a
                href="/contact/"
                className={styles.ctaBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.nav.contact}
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}