'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import Footer from '@/components/sections/Footer';
import styles from './page.module.css';

const projects = [
  {
    id: 1,
    title: 'AI驱动的电商平台',
    description: '融合AI推荐的现代化购物体验，支持智能搜索与个性化推荐。',
    tags: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    emoji: '🛒',
    gradient: 'linear-gradient(135deg, #00d4ff, #bf5af2)',
    stars: 230,
    forks: 45,
    link: 'https://github.com/badhope',
  },
  {
    id: 2,
    title: '实时数据可视化平台',
    description: '企业级数据分析仪表盘，支持多维度实时数据监控与自定义报表。',
    tags: ['React', 'D3.js', 'Node.js', 'Redis'],
    emoji: '📊',
    gradient: 'linear-gradient(135deg, #bf5af2, #ff375f)',
    stars: 189,
    forks: 32,
    link: 'https://github.com/badhope',
  },
  {
    id: 3,
    title: '跨平台社交应用',
    description: '基于兴趣图谱的社交网络，支持实时聊天与内容分享。',
    tags: ['React Native', 'Firebase', 'Node.js'],
    emoji: '💬',
    gradient: 'linear-gradient(135deg, #ff375f, #ff6b35)',
    stars: 156,
    forks: 28,
    link: 'https://github.com/badhope',
  },
  {
    id: 4,
    title: '智能爬虫系统',
    description: '分布式爬虫框架，支持大规模数据采集与清洗。',
    tags: ['Python', 'Scrapy', 'MongoDB', 'Docker'],
    emoji: '🤖',
    gradient: 'linear-gradient(135deg, #30d158, #00d4ff)',
    stars: 312,
    forks: 67,
    link: 'https://github.com/badhope',
  },
  {
    id: 5,
    title: 'AI写作助手',
    description: '基于大语言模型的智能写作工具，支持多场景内容生成。',
    tags: ['Python', 'GPT', 'FastAPI', 'React'],
    emoji: '✍️',
    gradient: 'linear-gradient(135deg, #ff9500, #ff375f)',
    stars: 275,
    forks: 52,
    link: 'https://github.com/badhope',
  },
  {
    id: 6,
    title: '自动化测试平台',
    description: '支持UI、API、性能测试的一站式测试解决方案。',
    tags: ['Python', 'Selenium', 'Pytest', 'Docker'],
    emoji: '🧪',
    gradient: 'linear-gradient(135deg, #5e5ce6, #bf5af2)',
    stars: 98,
    forks: 21,
    link: 'https://github.com/badhope',
  },
];

const categories = ['All', 'Web', 'AI', 'Data', 'Mobile'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filterProjects = () => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => {
      if (activeCategory === 'Web') return p.tags.some((t) => ['Next.js', 'React', 'Node.js', 'Firebase'].includes(t));
      if (activeCategory === 'AI') return p.tags.some((t) => ['Python', 'GPT', 'TensorFlow'].includes(t));
      if (activeCategory === 'Data') return p.tags.some((t) => ['D3.js', 'MongoDB', 'PostgreSQL'].includes(t));
      if (activeCategory === 'Mobile') return p.tags.some((t) => ['React Native'].includes(t));
      return true;
    });
  };

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
            <span className={styles.label}>作品集</span>
            <h1 className={styles.title}>
              <span className="gradient-text">精选</span>项目
            </h1>
            <p className={styles.subtitle}>
              每一个项目都是一次技术探索与创新的尝试
            </p>
          </motion.div>
        </section>

        <section className={styles.projects}>
          <div className={styles.container}>
            <div className={styles.categories}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <motion.div className={styles.grid} layout>
              {filterProjects().map((project, index) => (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCard}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={styles.cardGlow} style={{ background: project.gradient }} />
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <span className={styles.emoji}>{project.emoji}</span>
                      <div className={styles.cardStats}>
                        <span className={styles.stat}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 15.77l-6.18 3.25L7 12.14 2 7.27l6.91-1.01L12 0z"/>
                          </svg>
                          {project.stars}
                        </span>
                        <span className={styles.stat}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 2l2 6h8l2-6h-2v14H8V2H6zm2 2h4v4H8V4zm0 6h4v4H8v-4z"/>
                          </svg>
                          {project.forks}
                        </span>
                      </div>
                    </div>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                    <div className={styles.cardTags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.cardArrow}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
