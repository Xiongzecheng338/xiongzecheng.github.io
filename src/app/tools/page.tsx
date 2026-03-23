'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import ToolCard from '@/components/cards/ToolCard';
import ParticleBackground from '@/components/animations/ParticleBackground';
import type { Tool } from '@/types';
import styles from './page.module.css';

const tools: Tool[] = [
  { id: '1', name: 'VS Code', description: 'The best code editor for web development', icon: '💻', category: 'editor', url: 'https://code.visualstudio.com/' },
  { id: '2', name: 'Figma', description: 'Collaborative design and prototyping', icon: '🎨', category: 'design', url: 'https://figma.com/' },
  { id: '3', name: 'GitHub', description: 'Code hosting and version control', icon: '🐙', category: 'devops', url: 'https://github.com/' },
  { id: '4', name: 'Vercel', description: 'Fast and easy deployments', icon: '▲', category: 'deploy', url: 'https://vercel.com/' },
  { id: '5', name: 'Docker', description: 'Container platform for developers', icon: '🐳', category: 'devops', url: 'https://docker.com/' },
  { id: '6', name: 'Postman', description: 'API testing and development', icon: '📮', category: 'devops', url: 'https://postman.com/' },
  { id: '7', name: 'Notion', description: 'All-in-one workspace for notes', icon: '📝', category: 'other', url: 'https://notion.so/' },
  { id: '8', name: 'Linear', description: 'Issue tracking for software teams', icon: '📊', category: 'other', url: 'https://linear.app/' },
];

const categories = [
  { id: 'all', label: 'All Tools' },
  { id: 'editor', label: 'Editors' },
  { id: 'design', label: 'Design' },
  { id: 'deploy', label: 'Deploy' },
  { id: 'devops', label: 'DevOps' },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = activeCategory === 'all'
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <main className={styles.main}>
      <ParticleBackground />
      <Navigation />

      <section className={styles.hero}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.gradientText}>Recommended</span> Tools
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          My favorite tools that boost productivity
        </motion.p>
      </section>

      <section id="tools" className={styles.section}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          className={styles.grid}
          layout
        >
          {filteredTools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </motion.div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Anonymous Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}