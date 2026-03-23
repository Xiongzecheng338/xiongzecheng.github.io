'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';
import styles from './InteractiveButton.module.css';

interface InteractiveButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  fullWidth?: boolean;
}

export default function InteractiveButton({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  icon,
  iconPosition = 'right',
  className = '',
  fullWidth = false,
}: InteractiveButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { x, y, id: idRef.current++ };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    onClick?.();
  };

  const variantClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    gradient: styles.gradient,
  };

  const sizeClasses = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${styles.button} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setRipples([]);
      }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}

      <span className={styles.content}>{children}</span>

      {icon && iconPosition === 'right' && (
        <motion.span
          className={styles.iconRight}
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {icon}
        </motion.span>
      )}

      <span className={styles.glow} />

      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className={styles.ripple}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}

      {variant === 'gradient' && (
        <motion.span
          className={styles.gradientOverlay}
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}
    </motion.button>
  );
}

export function IconButton({
  children,
  onClick,
  size = 40,
  className = '',
}: {
  children: ReactNode;
  onClick?: () => void;
  size?: number;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{ width: size, height: size }}
    >
      <motion.span
        className={styles.iconGlow}
        animate={{
          opacity: isHovered ? 0.6 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      {children}
    </motion.button>
  );
}

export function ToggleButton({
  isActive,
  onClick,
  children,
  className = '',
}: {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      className={`${styles.toggleButton} ${isActive ? styles.toggleActive : ''} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className={styles.toggleIndicator}
        animate={{ x: isActive ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <span className={styles.toggleContent}>{children}</span>
    </motion.button>
  );
}

export function ProgressButton({
  children,
  progress,
  onClick,
  className = '',
}: {
  children: ReactNode;
  progress: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      className={`${styles.progressButton} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className={styles.progressFill}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
      <span className={styles.progressContent}>{children}</span>
    </motion.button>
  );
}
