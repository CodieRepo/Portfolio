'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Capability {
  metric: string;
  title: string;
  description: string;
  specs: string[];
}

const capabilities: Capability[] = [
  {
    metric: '99.9% UPTIME',
    title: 'API & Backend Architecture',
    description: 'Developing highly optimized, multi-tier services and RESTful APIs. Leveraging robust type safety, dependency injection, and secure request controllers.',
    specs: ['Java / Spring Boot', 'Spring MVC / Hibernate', 'Node.js / Express', 'Security & Filters']
  },
  {
    metric: 'INDEXED & TUNED',
    title: 'Database Pipeline Designs',
    description: 'Structuring clean relational database schemas, handling key indexing, connection pooling, and writing efficient SQL queries to limit network roundtrips.',
    specs: ['PostgreSQL & SQL', 'Database Normalization', 'Entity Mapping (JPA)', 'Connection Management']
  },
  {
    metric: '60 FPS ANIMATION',
    title: 'Interactive Frontend Systems',
    description: 'Crafting responsive client interfaces using modular, reusable components. Driven by spring physics and state delegation for fluid kinetic interactions.',
    specs: ['React.js / Next.js', 'Framer Motion Engine', 'Tailwind CSS Layouts', 'Strict TypeScript UI']
  },
  {
    metric: 'ZERO REGRESSIONS',
    title: 'Quality & System Testing',
    description: 'Ensuring code health and architectural integrity through strict endpoint checks, API validation, modular repository commits, and regression tests.',
    specs: ['Postman Integration', 'Git Version Control', 'Strict Lint Standards', 'Modular Code Reviews']
  }
];

export function SystemCapabilities() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="capabilities"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black text-white relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-12 mb-16">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
            [ 05 // SYSTEM CAPABILITIES ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none">
            Architectural Capacities
          </h2>
        </div>

        {/* Brutalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10">
          {capabilities.map((cap, index) => {
            const capRef = useRef<HTMLDivElement>(null);
            const isCapInView = useInView(capRef, { once: true, margin: '-50px' });

            return (
              <motion.div
                key={cap.title}
                ref={capRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isCapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="p-8 md:p-12 border-r border-b border-white/10 flex flex-col justify-between min-h-[340px] hover:bg-neutral-950/20 transition-colors duration-500 group"
              >
                {/* Top Readout */}
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[9px] font-mono border border-white/20 px-2 py-0.5 uppercase tracking-widest text-neutral-500 group-hover:text-white group-hover:border-white transition-colors duration-300">
                    {cap.metric}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-600">
                    SYS // 0{index + 1}
                  </span>
                </div>

                {/* Center Title & Details */}
                <div className="my-8">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4">
                    {cap.title}
                  </h3>
                  <p className="text-xs md:text-sm font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300 leading-relaxed max-w-md">
                    {cap.description}
                  </p>
                </div>

                {/* Bottom Spec Chips */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mt-auto">
                  {cap.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[9px] font-mono text-neutral-400 bg-neutral-950 border border-white/10 px-2 py-0.5 uppercase"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
