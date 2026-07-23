'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function AboutMindset() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const pillars = [
    {
      num: '01',
      title: 'Mechanical Precision',
      desc: 'My background in mechanical production engineering gives me a physical understanding of pipeline tolerances, structural stress, and load limits—principles I apply directly to software systems.',
    },
    {
      num: '02',
      title: 'Multi-Tier Microservices',
      desc: 'Architecting rock-solid backend services using Java, Spring Boot, Node.js, and optimized SQL schemas that handle high-throughput workloads with sub-50ms latency.',
    },
    {
      num: '03',
      title: 'AI & Process Automation',
      desc: 'Engineering automated lead workflows, WhatsApp API bots, custom CRM engines, and AI video avatars that turn manual business tasks into autonomous revenue loops.',
    },
    {
      num: '04',
      title: 'Kinetic Web Systems',
      desc: 'Crafting responsive, high-converting client UIs in React, Next.js, and WebGL driven by Framer Motion spring physics and Lenis smooth scrolling.',
    },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black/60 backdrop-blur-md text-white relative z-10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-white/10 pb-12 mb-16 items-end">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <motion.span
              variants={itemVariants}
              className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block"
            >
              [ 02 // WHO I AM & HOW I THINK ]
            </motion.span>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none"
            >
              Engineering Rigor,<br />Digital Intelligence
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <p className="text-lg md:text-2xl font-light leading-relaxed text-neutral-300 uppercase tracking-tight">
              "Engineering physical machines taught me structure, math, and tolerance. Engineering digital systems taught me full-stack fluidity, database normalization, and automated intelligence."
            </p>
          </motion.div>
        </div>

        {/* 4 Engineering Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p) => (
            <motion.div
              key={p.num}
              variants={itemVariants}
              className="border border-white/10 p-6 md:p-8 bg-neutral-950/40 flex flex-col justify-between min-h-[280px] hover:border-cyan-400/50 transition-colors duration-500 group"
            >
              <div>
                <span className="text-xs font-mono text-cyan-400 group-hover:text-white transition-colors">
                  [{p.num}]
                </span>
                <h3 className="text-lg font-bold uppercase tracking-tight mt-3 mb-4 text-white">
                  {p.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
              <div className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest mt-6 pt-4 border-t border-white/5">
                SATWIK PAL // CORE PILLAR
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
