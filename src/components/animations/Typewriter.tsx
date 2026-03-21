'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Typewriter.module.css';

interface TypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  onComplete?: () => void;
}

export default function Typewriter({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
  onComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleTyping = useCallback(() => {
    const currentText = texts[currentIndex];

    if (!isDeleting && !isPaused) {
      if (displayText.length < currentText.length) {
        const randomSpeed = typingSpeed + Math.random() * 50;
        setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, randomSpeed);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else if (isDeleting && !isPaused) {
      if (displayText.length > 0) {
        setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        if (currentIndex === texts.length - 1 && onComplete) {
          onComplete();
        }
      }
    }
  }, [displayText, currentIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseDuration, onComplete]);

  useEffect(() => {
    handleTyping();
  }, [handleTyping]);

  const highlightText = (text: string) => {
    const words = ['Developer', 'Designer', 'Creator'];
    const parts = text.split(' ');
    return parts.map((part, i) => (
      <span key={i}>
        {words.includes(part) ? (
          <span className={styles.highlight}>{part}</span>
        ) : (
          part
        )}
        {i < parts.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>
        {highlightText(displayText)}
        <span className={styles.cursor}>|</span>
      </h1>
    </div>
  );
}