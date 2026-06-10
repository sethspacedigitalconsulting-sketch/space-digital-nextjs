'use client';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  className?: string;
}

// Scale(0.85→1) + opacity + blur — matches wibify scroll reveal
export function RevealBlock({ children, delay = 0, style, className }: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
