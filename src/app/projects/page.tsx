'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import ProjectCard from '@/components/cards/ProjectCard';
import ParticleBackground from '@/components/animations/ParticleBackground';
import type { Project } from '@/types';
import styles from './page.module.css';

const allProjects: Project[] = [
  { id: '1', title: 'E-Commerce Platform', description: 'Modern shopping experience with AI recommendations', emoji: '🛒', tags: ['React', 'Node.js', 'AI'], gradient: 'gradientPink' },
  { id: '2', title: 'Dashboard Analytics', description: 'Real-time data visualization for enterprise', emoji: '📊', tags: ['Next.js', 'D3.js'], gradient: 'gradientBlue' },
  { id: '3', title: 'Social App', description: 'Connect people with shared interests', emoji: '💬', tags: ['React Native', 'Firebase'], gradient: 'gradientGreen' },
  { id: '4', title: 'AI Assistant', description: 'Intelligent chatbot with natural language', emoji: '🤖', tags: ['Python', 'GPT'], gradient: 'gradientOrange' },
  { id: '5', title: 'Portfolio Site', description: 'Minimalist showcase for creative professionals', emoji: '🎨', tags: ['Next.js', 'Tailwind'], gradient: 'gradientPurple' },
  { id: '6', title: 'Mobile Game', description: 'Cross-platform casual gaming experience', emoji: '🎮', tags: ['Unity', 'C#'], gradient: 'gradientYellow' },
];

const categories = ['All', 'Web', 'Mobile', 'AI'];

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '/contact' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => {
        if (activeCategory === 'Web') return p.tags.some((t) => ['React', 'Next.js', 'Node.js'].includes(t));
        if (activeCategory === 'Mobile') return p.tags.some((t) => ['React Native', 'Unity'].includes(t));
        if (activeCategory === 'AI') return p.tags.some((t) => ['AI', 'Python', 'GPT'].includes(t));
        return true;
      });

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
          <span className={styles.gradientText}>Featured</span> Projects
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A collection of my recent work and personal projects
        </motion.p>
      </section>

      <section id="projects" className={styles.section}>
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

        <motion.div
          className={styles.grid}
          layout
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Anonymous Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}