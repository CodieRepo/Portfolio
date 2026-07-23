'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

export function PersonalHero() {
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const { x: ctaX, y: ctaY } = useMagnetic(ctaRef, 90, 0.4);

  const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative min-h-screen bg-transparent text-white overflow-hidden flex flex-col justify-between pt-36 pb-20 px-6 md:px-12 lg:px-24 border-b border-white/10 z-10">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid grid-cols-4 lg:grid-cols-12 pointer-events-none opacity-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white h-full" />
        ))}
      </div>

      {/* Main Title Banner */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_OUT_EXPO }}
            className="flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 border border-white/10 px-3 py-1 bg-black/40 backdrop-blur-md">
              Available for High-Scale Enterprise Projects & Consultations
            </span>
          </motion.div>

          {/* Name Title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.1 }}
              className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-black uppercase tracking-tighter leading-none text-white select-none"
            >
              Satwik Pal
            </motion.h1>
          </div>

          {/* Subheader & Positioning Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 }}
              className="lg:col-span-8 flex flex-col gap-4"
            >
              <h2 className="text-xl md:text-3xl font-bold uppercase tracking-tight text-neutral-200">
                Full Stack Developer & AI Automation Engineer
              </h2>
              <p className="text-sm md:text-lg font-mono text-neutral-400 leading-relaxed max-w-3xl uppercase">
                Building AI-powered digital systems that solve real business problems. Founder of Trinetra Digital Solution. Engineering scalable backend microservices, intelligent workflows, and high-performance WebGL interfaces.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.4 }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4"
            >
              <motion.a
                ref={ctaRef}
                style={{ x: ctaX, y: ctaY }}
                href="#projects"
                className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs md:text-sm hover:bg-neutral-200 transition-colors duration-300 cursor-pointer select-none bg-white shadow-[0_0_40px_rgba(0,229,255,0.2)]"
                data-cursor="pointer"
              >
                Explore Flagship Projects ↓
              </motion.a>
              <a
                href="#contact"
                className="text-xs font-mono text-cyan-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
                data-cursor="pointer"
              >
                Book System Consultation ↗
              </a>
            </motion.div>
          </div>

          {/* Expensive Live Metrics Telemetry Ticker Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-12 border-t border-white/10"
          >
            <div className="border border-white/10 p-4 bg-black/40 backdrop-blur-md">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">[ AUTOMATED LEADS ]</span>
              <span className="text-2xl md:text-3xl font-black font-mono text-cyan-400">14,200+</span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase block mt-1">Processed by AI Bots</span>
            </div>

            <div className="border border-white/10 p-4 bg-black/40 backdrop-blur-md">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">[ API LATENCY ]</span>
              <span className="text-2xl md:text-3xl font-black font-mono text-white">&lt; 35ms</span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase block mt-1">REST Microservices</span>
            </div>

            <div className="border border-white/10 p-4 bg-black/40 backdrop-blur-md">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">[ SYSTEM UPTIME ]</span>
              <span className="text-2xl md:text-3xl font-black font-mono text-cyan-400">99.98%</span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase block mt-1">Production Reliability</span>
            </div>

            <div className="border border-white/10 p-4 bg-black/40 backdrop-blur-md">
              <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-1">[ CLIENT ROI SPEED ]</span>
              <span className="text-2xl md:text-3xl font-black font-mono text-white">3.5x</span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase block mt-1">Conversion Velocity</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Metrics Indicator */}
      <div className="relative z-10 border-t border-white/10 pt-8 mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] font-mono text-neutral-500 max-w-7xl mx-auto w-full">
        <div className="flex gap-8 uppercase">
          <span>[ FOUNDER: TRINETRA DIGITAL ]</span>
          <span>[ JAVA / SPRING BOOT / NODE.JS ]</span>
          <span>[ REACT / NEXT.JS / R3F ]</span>
        </div>
        <div className="tracking-widest animate-pulse">
          SCROLL TO NAVIGATE SYSTEM ↓
        </div>
      </div>
    </section>
  );
}
