'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const, // Snappy easeOutExpo
      },
    },
  };

  return (
    <section
      ref={ref}
      id="about"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black text-white relative z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      >
        {/* Left column: Tag and Section header */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <motion.span
            variants={itemVariants}
            className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block"
          >
            [ 02 // MANIFESTO ]
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none"
          >
            Mechanical Rigor,<br />
            Digital Architecture
          </motion.h2>
        </div>

        {/* Right column: Long form text and credentials */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl font-light leading-relaxed text-neutral-300 uppercase tracking-tight"
          >
            "Engineering physical machines taught me structure, math, and tolerance. Engineering digital systems taught me full-stack fluidity and logic flow."
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="text-sm font-mono text-neutral-400 leading-relaxed max-w-2xl"
          >
            I am a full-stack engineer and computer science developer specializing in Java, Spring Boot, React, and Node.js. My career began with a foundation in mechanical production systems, which now shapes how I design web applications—focusing on tight performance limits, clean architectural layers, and solid pipeline robustness. From building complex APIs to crafting fluid front-end animations, I engineer the digital stack from the database up.
          </motion.p>

          {/* Quick Skill Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 mt-6"
          >
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2">[ Backend Stack ]</span>
              <ul className="text-xs font-mono uppercase text-neutral-300 space-y-1">
                <li>Java / Spring Boot</li>
                <li>Node.js / Express</li>
                <li>RESTful API Design</li>
                <li>SQL / Relational DBs</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2">[ Frontend Stack ]</span>
              <ul className="text-xs font-mono uppercase text-neutral-300 space-y-1">
                <li>React.js / Next.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
              </ul>
            </div>
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-2">[ Engineering Tools ]</span>
              <ul className="text-xs font-mono uppercase text-neutral-300 space-y-1">
                <li>Git Versioning</li>
                <li>Postman</li>
                <li>System Architecture</li>
                <li>VS Code</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
