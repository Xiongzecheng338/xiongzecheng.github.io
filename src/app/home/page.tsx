'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import Typewriter from '@/components/animations/Typewriter';
import LabelCarousel from '@/components/animations/LabelCarousel';
import Button from '@/components/ui/Button';
import ProjectCard from '@/components/cards/ProjectCard';
import ParticleBackground from '@/components/animations/ParticleBackground';
import type { Project } from '@/types';
import styles from './page.module.css';

const projects: Project[] = [
  { id: '1', title: 'E-Commerce Platform', description: 'Modern shopping experience with AI recommendations', emoji: '🛒', tags: ['React', 'Node.js', 'AI'], gradient: 'gradientPink', link: '#' },
  { id: '2', title: 'Dashboard Analytics', description: 'Real-time data visualization for enterprise', emoji: '📊', tags: ['Next.js', 'D3.js'], gradient: 'gradientBlue', link: '#' },
  { id: '3', title: 'Social App', description: 'Connect people with shared interests', emoji: '💬', tags: ['React Native', 'Firebase'], gradient: 'gradientGreen', link: '#' },
];

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tools', href: '/tools' },
  { label: 'Contact', href: '/contact' },
];

export default function HomePage() {
  const [typewriterDone, setTypewriterDone] = useState(false);

  return (
    <main className={styles.main}>
      <ParticleBackground />
      <Navigation items={navItems} />

      <section className={styles.hero}>
        <Typewriter
          texts={['Creative Developer', 'Open Source Contributor', 'AI Era Leader']}
          onComplete={() => setTypewriterDone(true)}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: typewriterDone ? 1 : 0, y: typewriterDone ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <LabelCarousel
            labels={['Open Source Contributor', 'Data Developer', 'AI Era Leader']}
          />
        </motion.div>
        <motion.div
          className={styles.heroActions}
          initial={{ opacity: 0 }}
          animate={{ opacity: typewriterDone ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Button href="#projects" variant="primary" size="lg">View Projects</Button>
          <Button href="/contact" variant="secondary" size="lg">Get in Touch</Button>
        </motion.div>
      </section>

      <section id="about" className={styles.section}>
        <motion.div
          className={styles.aboutCard}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.aboutText}>
            A passionate developer focused on creating innovative solutions with clean,
            efficient code and beautiful interfaces. Specialized in building scalable
            applications and immersive digital experiences.
          </p>
          <div className={styles.skills}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Three.js', 'Python'].map((skill) => (
              <span key={skill} className={styles.skillTag}>{skill}</span>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="projects" className={styles.section}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 Anonymous Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}