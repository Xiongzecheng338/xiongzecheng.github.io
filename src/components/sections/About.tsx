'use client';

import { motion } from 'framer-motion';
import styles from './About.module.css';

const timeline = [
  { year: '20XX', title: '入学数据科学专业', desc: '开始系统学习数据科学与大数据技术' },
  { year: '20XX', title: '全栈开发之路', desc: '从前端到后端，拥抱AI辅助开发' },
  { year: '20XX', title: '开源贡献者', desc: '积极参与开源项目，贡献代码' },
  { year: 'Now', title: 'AI时代探索者', desc: '探索前沿技术，做时代的弄潮儿' },
];

export default function About() {
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
          <span className={styles.label}>关于我</span>
          <h2 className={styles.title}>
            <span className="gradient-text">全栈</span>开发者
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
              你好！我是 <span className={styles.highlight}>badhope</span>，
              一名来自深圳的<span className={styles.highlight}>全栈开发者</span>。
              数据科学与大数据技术专业背景，热衷于用代码创造价值。
            </p>
            <p className={styles.bio}>
              我是 <span className={styles.highlight}>AI时代探索者</span>，
              坚信AI是提升生产力的关键。善用AI辅助开发，追求技术卓越。
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
              { value: '100+', label: 'GitHub Stars' },
              { value: '50+', label: '项目数' },
              { value: '10+', label: '开源贡献' },
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
          {timeline.map((item, i) => (
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
