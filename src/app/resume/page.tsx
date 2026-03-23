'use client';

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

const experience = [
  {
    title: '全栈开发工程师',
    company: '个人项目 / 自由职业',
    period: '2022 - Present',
    description: '独立完成多个全栈项目，涵盖电商、数据可视化、社交应用等领域。熟练运用AI工具提升开发效率。',
  },
];

const education = [
  {
    degree: '数据科学与大数据技术',
    school: '大学 · 深圳',
    period: '2020 - 2024',
    description: '主修数据分析、机器学习、后端开发。 GPA: 3.8/4.0',
  },
];

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'] },
  { category: 'AI & Tools', items: ['TensorFlow', 'PyTorch', 'Docker', 'Git', 'Linux'] },
];

export default function ResumePage() {
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
            <span className={styles.label}>简历</span>
            <h1 className={styles.title}>
              <span className="gradient-text">bad</span>hope
            </h1>
            <p className={styles.subtitle}>全栈开发者 · AI时代探索者 · 开源贡献者</p>
            <div className={styles.contact}>
              <span>📍 深圳 · 广东 · 中国</span>
              <span>📧 x18825407105@outlook.com</span>
            </div>
          </motion.div>

          <motion.a
            href="#"
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
            <span>下载PDF简历</span>
          </motion.a>
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
              个人简介
            </motion.h2>
            <motion.div
              className={styles.summary}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p>
                我是一名来自深圳的全栈开发者，毕业于数据科学与大数据技术专业。
                对新技术充满热情，热衷于用代码创造价值。
              </p>
              <p>
                作为<strong>AI时代的探索者</strong>，我积极拥抱AI工具，
                善用AI辅助开发，大幅提升生产效率。我相信AI不是取代者，
                而是强大的增效器。
              </p>
              <p>
                同时，我也是活跃的<strong>开源贡献者</strong>，
                相信代码的价值在于分享和改进。
              </p>
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
              技术栈
            </motion.h2>
            <div className={styles.skillsGrid}>
              {skills.map((skillGroup, i) => (
                <motion.div
                  key={skillGroup.category}
                  className={styles.skillCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
                  <div className={styles.skillTags}>
                    {skillGroup.items.map((skill) => (
                      <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
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
              经验
            </motion.h2>
            {experience.map((exp, i) => (
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
              教育
            </motion.h2>
            {education.map((edu, i) => (
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
              <h2 className={styles.ctaTitle}>对我感兴趣？</h2>
              <p className={styles.ctaDesc}>期待与志同道合的朋友交流合作</p>
              <motion.a
                href="/contact"
                className={styles.ctaBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                联系我
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
