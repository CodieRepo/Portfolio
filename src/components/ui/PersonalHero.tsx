'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export function PersonalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from('.char', {
        y: 150,
        opacity: 0,
        duration: 1.2,
        stagger: 0.03,
        ease: 'expo.out',
      });

      gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      // Scroll Trigger Animations
      gsap.to(bgTextRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.5,
        opacity: 0,
        y: -100,
      });

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: -50,
        opacity: 0.3,
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const name = "SATWIK PAL";

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-20"
    >
      <div 
        ref={bgTextRef}
        className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
      >
        <h1 className="text-[40vw] font-black whitespace-nowrap leading-none tracking-tighter">ARCHITECT</h1>
      </div>

      <div className="max-w-7xl w-full">
        <div className="flex flex-col items-center text-center gap-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hero-content px-4 py-1 border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-8"
          >
            System Architect & AI Engineer
          </motion.div>

          <h1 
            ref={titleRef}
            className="text-7xl md:text-[13rem] font-black uppercase tracking-tighter leading-[0.8] flex flex-wrap justify-center"
          >
            {name.split('').map((char, i) => (
              <span key={i} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>

          <div className="hero-content grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 w-full text-left border-t border-white/5 pt-12">
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// FOUNDER</h3>
              <p className="text-neutral-500 text-sm leading-relaxed uppercase font-light">
                Trinetra Digital Solution. Driving innovation through AI automation and scalable systems.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// CAPABILITIES</h3>
              <p className="text-neutral-500 text-sm leading-relaxed uppercase font-light">
                Full stack architecture, intelligent workflows, and high-performance WebGL interfaces.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// STATUS</h3>
              <p className="text-neutral-500 text-sm leading-relaxed uppercase font-light">
                Available for high-scale enterprise projects & consultations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Scroll to Initiate</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent animate-bounce" />
      </div>
    </section>
  );
}
