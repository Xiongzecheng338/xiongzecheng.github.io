'use client';

import { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02,
      });
    }

    return () => {
      if (cardRef.current) {
        const tilt = cardRef.current as HTMLElement & { vanillaTilt?: { destroy: () => void } };
        if (tilt.vanillaTilt) {
          tilt.vanillaTilt.destroy();
        }
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className={styles.front}>
        <span className={styles.emoji}>{project.emoji}</span>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <div className={`${styles.tags} ${project.gradient}`}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}