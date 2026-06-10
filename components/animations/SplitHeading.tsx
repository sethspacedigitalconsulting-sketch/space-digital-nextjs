'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
  className?: string;
  delay?: number;
}

export function SplitHeading({ text, as: Tag = 'h2', style, className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-10% 0px' });
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} style={{ ...style, overflow: 'hidden' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
          {ready ? (
            word.split('').map((char, ci) => {
              const totalIndex = words.slice(0, wi).reduce((a, w) => a + w.length, 0) + ci;
              return (
                <motion.span
                  key={ci}
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                    delay: delay + totalIndex * 0.022,
                  }}
                >
                  {char}
                </motion.span>
              );
            })
          ) : word}
        </span>
      ))}
    </Tag>
  );
}
