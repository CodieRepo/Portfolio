'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: '01',
    title: 'Trinetra Digital',
    tagline: 'Enterprise AI Operating System',
    role: 'Founder & Lead Architect',
    image: '/trinetra_thumbnail.png',
    color: '#00e5ff'
  },
  {
    id: '02',
    title: 'Akuafi.com',
    tagline: 'Commercial Water Telemetry',
    role: 'Growth Systems Architect',
    image: '/akuafi_thumbnail.png',
    color: '#3b82f6'
  },
  {
    id: '03',
    title: 'Vaastu Infra',
    tagline: 'Luxury Real Estate Experience',
    role: 'Lead Performance Engineer',
    image: '/vaastu_thumbnail.png',
    color: '#ffffff'
  }
];

export function FlagshipProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-200vw",
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <section id="projects" className="overflow-hidden bg-black">
      <div ref={triggerRef}>
        <div ref={sectionRef} className="h-screen w-[300vw] flex flex-row relative">
          {caseStudies.map((study) => (
            <div key={study.id} className="h-screen w-screen flex justify-center items-center p-6 md:p-24">
              <div className="relative w-full h-full border border-white/10 flex flex-col md:flex-row overflow-hidden group">
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                    style={{ backgroundImage: `url(${study.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
                </div>
                
                <div className="w-full md:w-1/2 h-1/2 md:h-full p-12 flex flex-col justify-between bg-[#050505]">
                  <div>
                    <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4 block">
                      // Case Study {study.id}
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                      {study.title}
                    </h2>
                    <p className="text-xl text-neutral-400 uppercase font-light max-w-md">
                      {study.tagline}
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Role</span>
                      <span className="text-lg uppercase font-bold">{study.role}</span>
                    </div>
                    <button className="px-8 py-4 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 text-xs font-mono uppercase tracking-widest w-fit">
                      View System Details
                    </button>
                  </div>
                </div>

                <div className="absolute top-12 right-12 text-[15vw] font-black text-white/5 pointer-events-none select-none">
                  {study.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
