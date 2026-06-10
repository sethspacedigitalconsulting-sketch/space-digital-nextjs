'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface WorkflowItem {
  title: string;
  subtitle: string;
  description: string;
  nodes: string[];
  accentColor: string;
  element: React.ReactNode;
}

interface ZoomParallaxProps {
  items: WorkflowItem[];
}

export function ZoomParallax({ items }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative" style={{ height: '300vh' }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh' }}
      >
        {items.map(({ element }, index) => {
          const scale = scales[index % scales.length];
          const positions = [
            {},
            { top: '-30vh', left: '5vw', height: '30vh', width: '35vw' },
            { top: '-10vh', left: '-25vw', height: '45vh', width: '20vw' },
            { left: '27.5vw', height: '25vh', width: '25vw' },
            { top: '27.5vh', left: '5vw', height: '25vh', width: '20vw' },
            { top: '27.5vh', left: '-22.5vw', height: '25vh', width: '30vw' },
            { top: '22.5vh', left: '25vw', height: '15vh', width: '15vw' },
          ];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div
                className="relative overflow-hidden rounded-2xl"
                style={{
                  height: '25vh',
                  width: '25vw',
                  ...positions[index] as React.CSSProperties,
                }}
              >
                {element}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
