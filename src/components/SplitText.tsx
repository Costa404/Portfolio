import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface SplitTextProps {
  /** The text to animate */
  text: string;
  /** Optional class names to apply to the wrapper element */
  className?: string;
  /** The HTML tag to render as the wrapper */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  /** The animation variant to use */
  variant?: 'cascade' | 'mask' | 'scramble';
  /** Whether to animate on mount or when scrolled into view */
  trigger?: 'load' | 'inView';
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Stagger time between characters or words (in seconds) */
  stagger?: number;
  /** Whether the animation should only play once when using inView trigger */
  once?: boolean;
}

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

/**
 * SplitText
 * 
 * A reusable component that decomposes text into individual characters or words 
 * and animates them. Ideal for hero headings and section titles.
 */
export default function SplitText({
  text,
  className = '',
  as = 'h1',
  variant = 'cascade',
  trigger = 'load',
  delay = 0,
  stagger,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once });
  
  const defaultStagger = variant === 'cascade' ? 0.03 : variant === 'mask' ? 0.08 : 0;
  const staggerTime = stagger ?? defaultStagger;

  // State for the scramble variant
  const [scrambleText, setScrambleText] = useState(text);
  
  useEffect(() => {
    if (variant !== 'scramble') return;
    
    const shouldAnimate = trigger === 'load' || (trigger === 'inView' && isInView);
    if (!shouldAnimate) return;

    let iteration = 0;
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setScrambleText((_prev) => 
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) {
            return text[index];
          }
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }).join('')
      );
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
      }
      
      iteration += 1;
    }, 30);

    return () => clearInterval(interval);
  }, [text, variant, trigger, isInView]);

  if (variant === 'scramble') {
    const Tag = as as React.ElementType;
    return (
      <Tag ref={ref} className={className}>
        {scrambleText}
      </Tag>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerTime,
        delayChildren: delay,
      }
    }
  };

  const cascadeVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const maskVariants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: { 
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const words = text.split(' ');
  const MotionTag = motion[as as keyof typeof motion] as React.ElementType;

  const renderContent = () => {
    if (variant === 'cascade') {
      return words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={cascadeVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          {wordIndex !== words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ));
    }

    if (variant === 'mask') {
      return words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          <motion.span
            variants={maskVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
          {wordIndex !== words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ));
    }

    return null;
  };

  const animationProps = trigger === 'load' 
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once } };

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      {...animationProps}
    >
      {renderContent()}
    </MotionTag>
  );
}
