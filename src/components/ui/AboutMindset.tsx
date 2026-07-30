'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

export function AboutMindset() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-black"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          style={{ x: x1 }}
          className="text-[10vw] font-black text-white/5 whitespace-nowrap uppercase mb-[-5vw] select-none"
        >
          Engineering Mindset • Engineering Mindset
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-none">
              Building <span className="text-cyan-400">Intelligent</span> Systems.
            </h2>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              I specialize in bridging the gap between complex business logic and high-performance digital solutions. My approach combines rigorous backend architecture with fluid, interactive frontend experiences.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">// Vision</h4>
                <p className="text-neutral-500 text-sm uppercase">To automate the mundane and elevate human potential through AI.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">// Strategy</h4>
                <p className="text-neutral-500 text-sm uppercase">Scalable microservices meet intuitive, data-driven interfaces.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-8 border border-cyan-400/20 flex flex-col justify-between p-6">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-[1px] bg-cyan-400" />
                  <div className="text-[10px] font-mono text-cyan-400">01001010 01100001</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-white">3.5X</div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Conversion Velocity Increase</div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">System Integrity: 99.98%</div>
                  <div className="w-12 h-[1px] bg-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          style={{ x: x2 }}
          className="text-[10vw] font-black text-white/5 whitespace-nowrap uppercase mt-[-2vw] select-none text-right"
        >
          AI Automation • Digital Solutions
        </motion.div>
      </div>
    </section>
  );
}
