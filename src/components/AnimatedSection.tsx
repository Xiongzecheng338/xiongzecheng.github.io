'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function AnimatedSection({ children, id, className = '' }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={`min-h-screen px-8 py-20 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

export function AnimatedCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={`p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-purple-100 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer ${className}`}
      whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)' }}
    >
      {children}
    </motion.div>
  );
}