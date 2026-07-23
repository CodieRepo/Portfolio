'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

export function ProjectHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track viewport scroll progress of this hero section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transitions mapped to scroll depth
  const yParallaxFast = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yParallaxSlow = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageTranslateY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  
  // Setup magnetic interaction refs and hook coordinates
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { x: buttonX, y: buttonY } = useMagnetic(buttonRef, 90, 0.4);

  const tagRef = useRef<HTMLDivElement>(null);
  const { x: tagX, y: tagY } = useMagnetic(tagRef, 70, 0.35);

  const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between pt-32 pb-16 px-6 md:px-12 lg:px-24 border-b border-white/10"
    >
      {/* Stark Brutalist Grid Gridline Overlay */}
      <div className="absolute inset-0 grid grid-cols-4 lg:grid-cols-12 pointer-events-none opacity-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white h-full" />
        ))}
      </div>

      {/* Hero Title Header */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white pb-8 gap-8">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
              className="text-6xl md:text-8xl lg:text-[11rem] font-black uppercase tracking-tighter leading-none"
            >
              Satwik Pal
            </motion.h1>
          </div>
          <div className="max-w-xs flex flex-col items-start gap-4">
            <motion.div
              ref={tagRef}
              style={{ x: tagX, y: tagY }}
              className="px-4 py-2 border border-white/30 text-xs font-mono uppercase tracking-widest cursor-pointer select-none bg-black/40 backdrop-blur-sm"
              data-cursor="pointer"
            >
              /* Portfolio 2026 */
            </motion.div>
            <p className="text-xs md:text-sm font-mono text-neutral-400 leading-relaxed uppercase">
              Java Full-Stack Developer & Computer Science Student. Engineering robust backend systems and fluid frontend architectures.
            </p>
          </div>
        </div>
      </div>

      {/* Main Structural Layout Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
        {/* Left Column: Parallaxing Image Showcase */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
          <motion.div
            style={{ y: yParallaxSlow }}
            className="group relative w-full aspect-[16/10] bg-neutral-900 border border-white/20 overflow-hidden cursor-pointer"
            data-cursor="view"
            onClick={() => {
              const el = document.getElementById('work');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {/* Dynamic Scaling Image Element */}
            <motion.div
              style={{ scale: imageScale, y: imageTranslateY }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Brutalist structural background grid dot pattern */}
              <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </motion.div>

            {/* Thumbnail Context Information Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  01 // LEADING FULL-STACK DEVELOPMENT
                </span>
                <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-white">
                  Trinetra Digital Solution
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase border border-white/30 px-3 py-1 text-white bg-black/60 backdrop-blur-sm">
                React.js / Node.js / SQL
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Text Information & Call to Action */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-8 lg:pt-24">
          <motion.div
            style={{ y: yParallaxFast }}
            className="flex flex-col gap-5 border border-white/20 p-6 md:p-8 bg-black/60 backdrop-blur-md"
          >
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              [ Engineering Ethos ]
            </span>
            <h4 className="text-lg md:text-xl font-bold uppercase tracking-wider">
              From Databases to UI Animation
            </h4>
            <p className="text-xs md:text-sm text-neutral-400 font-mono leading-relaxed">
              I build scalable REST APIs and services in Spring Boot and Node.js, and bring them to life on the web with responsive layouts and kinetic spring animations.
            </p>
          </motion.div>

          <div className="flex flex-col items-start gap-4">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
              [ Showcase ]
            </span>
            <motion.button
              ref={buttonRef}
              style={{ x: buttonX, y: buttonY }}
              onClick={() => {
                const el = document.getElementById('work');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-neutral-200 transition-colors duration-300 cursor-pointer select-none"
              data-cursor="pointer"
            >
              See Completed Works
            </motion.button>
          </div>
        </div>
      </div>

      {/* Footer Meta Section */}
      <div className="relative z-10 border-t border-white/10 pt-8 mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] font-mono text-neutral-500">
        <div className="tracking-widest animate-pulse">
          SCROLL TO DISCOVER ↓
        </div>
        <div className="flex gap-8">
          <span>[ B.TECH COMPUTER SCIENCE ]</span>
          <span>[ SHAPING DIGITAL FLOWS ]</span>
        </div>
      </div>
    </section>
  );
}
