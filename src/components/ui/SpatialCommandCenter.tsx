'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

export function SpatialCommandCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const emailRef = useRef<HTMLAnchorElement>(null);
  const { x: emailX, y: emailY } = useMagnetic(emailRef, 80, 0.4);

  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const { x: linkedinX, y: linkedinY } = useMagnetic(linkedinRef, 80, 0.4);

  const phoneRef = useRef<HTMLAnchorElement>(null);
  const { x: phoneX, y: phoneY } = useMagnetic(phoneRef, 80, 0.4);

  return (
    <section
      ref={ref}
      id="contact"
      className="py-36 px-6 md:px-12 lg:px-24 bg-black text-white relative z-10 border-b border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
        className="max-w-7xl mx-auto flex flex-col items-center text-center"
      >
        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-6">
          [ 06 // COMMAND CENTER & CONSULTATION ]
        </span>

        <h2
          className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 hover:text-neutral-300 transition-colors cursor-pointer select-none"
          data-cursor="pointer"
        >
          LET'S BUILD
        </h2>

        <p className="max-w-xl text-xs md:text-sm font-mono text-neutral-400 uppercase leading-relaxed mb-12">
          Ready to engineer your next AI automation pipeline, high-throughput backend, or kinetic web system? Book a system consultation or reach out directly.
        </p>

        {/* Diagnostic Command Line Widget */}
        <div className="w-full max-w-2xl bg-neutral-950 border border-white/10 p-6 text-left font-mono text-xs mb-12 rounded-none">
          <div className="flex items-center gap-2 text-neutral-500 pb-3 border-b border-white/10 mb-4 text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>SATWIK_PAL // SYSTEM_TERMINAL</span>
          </div>
          <p className="text-cyan-400 mb-2">$ init consultation --founder="Satwik Pal"</p>
          <p className="text-neutral-400 mb-2">↳ STATUS: ACCEPTING HIGH-SCALE PROJECTS & CONTRACTS</p>
          <p className="text-neutral-500">↳ LOCATION: Gorakhpur, UP, India // Remote Worldwide</p>
        </div>

        {/* Magnetic Action Triggers */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full max-w-3xl">
          <motion.a
            ref={emailRef}
            style={{ x: emailX, y: emailY }}
            href="mailto:satwikpal786@gmail.com"
            className="w-full md:w-auto px-8 py-4 bg-white text-black font-bold font-mono uppercase text-xs tracking-widest hover:bg-neutral-200 transition-colors cursor-pointer select-none"
            data-cursor="pointer"
          >
            satwikpal786@gmail.com
          </motion.a>

          <motion.a
            ref={linkedinRef}
            style={{ x: linkedinX, y: linkedinY }}
            href="https://linkedin.com/in/satwik-pal-129374189"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 border border-white/20 font-mono uppercase text-xs tracking-widest hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors cursor-pointer select-none bg-black"
            data-cursor="pointer"
          >
            LinkedIn ↗
          </motion.a>

          <motion.a
            ref={phoneRef}
            style={{ x: phoneX, y: phoneY }}
            href="tel:+917388625622"
            className="w-full md:w-auto px-8 py-4 border border-white/20 font-mono uppercase text-xs tracking-widest hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors cursor-pointer select-none bg-black"
            data-cursor="pointer"
          >
            +91 7388625622
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
