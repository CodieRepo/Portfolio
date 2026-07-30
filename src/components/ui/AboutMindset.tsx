'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';

export function AboutMindset() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });

      gsap.to('.scroll-text-left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        x: -500,
      });

      gsap.to('.scroll-text-right', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        x: 500,
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-black"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-[180px]" />
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto relative z-10">
        <div className="scroll-text-left text-[15vw] font-black text-white/5 whitespace-nowrap uppercase mb-[-5vw] select-none leading-none">
          Engineering Mindset • Engineering Mindset
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20">
          <div className="space-y-8 about-content">
            <h2 className="text-4xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
              Building <span className="text-cyan-400">Intelligent</span> Systems.
            </h2>
            <p className="text-xl text-neutral-400 font-light leading-relaxed uppercase">
              I specialize in bridging the gap between complex business logic and high-performance digital solutions. My approach combines rigorous backend architecture with fluid, interactive frontend experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div>
                <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">// Vision</h4>
                <p className="text-neutral-500 text-sm uppercase leading-relaxed font-light">To automate the mundane and elevate human potential through AI.</p>
              </div>
              <div>
                <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-2">// Strategy</h4>
                <p className="text-neutral-500 text-sm uppercase leading-relaxed font-light">Scalable microservices meet intuitive, data-driven interfaces.</p>
              </div>
            </div>
          </div>

          <div className="relative about-content">
            <div className="aspect-square border border-white/10 relative overflow-hidden group bg-neutral-950/50 backdrop-blur-3xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-8 border border-cyan-400/20 flex flex-col justify-between p-8">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-[1px] bg-cyan-400" />
                  <div className="text-[10px] font-mono text-cyan-400 tracking-[0.2em]">01001010 01100001</div>
                </div>
                <div className="space-y-4">
                  <div className="text-7xl font-black text-white tracking-tighter">3.5X</div>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Conversion Velocity Increase</div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">System Integrity: 99.98%</div>
                  <div className="w-16 h-[1px] bg-cyan-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-text-right text-[15vw] font-black text-white/5 whitespace-nowrap uppercase mt-[-2vw] select-none text-right leading-none">
          AI Automation • Digital Solutions
        </div>
      </div>
    </section>
  );
}
