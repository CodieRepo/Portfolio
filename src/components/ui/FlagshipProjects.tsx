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
    const ctx = gsap.context(() => {
      const pin = gsap.fromTo(
        sectionRef.current,
        { translateX: 0 },
        {
          translateX: "-200vw",
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );

      // Title animation for each project
      gsap.utils.toArray('.project-card').forEach((card: any) => {
        gsap.from(card.querySelector('.project-title'), {
          scrollTrigger: {
            trigger: card,
            containerAnimation: pin,
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      });
    }, triggerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-black">
      <div ref={triggerRef} className="overflow-hidden">
        <div ref={sectionRef} className="h-screen w-[300vw] flex flex-row relative">
          {caseStudies.map((study) => (
            <div key={study.id} className="project-card h-screen w-screen flex justify-center items-center p-6 md:p-24 relative">
              <div className="absolute top-12 left-12 md:left-24 text-[10px] font-mono text-cyan-400 tracking-[0.5em] uppercase z-20">
                // Case Study {study.id}
              </div>

              <div className="relative w-full h-full max-w-7xl flex flex-col md:flex-row overflow-hidden bg-[#050505] border border-white/5 group shadow-2xl">
                <div className="w-full md:w-3/5 h-1/2 md:h-full relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                    style={{ backgroundImage: `url(${study.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700" />
                </div>
                
                <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-between border-l border-white/5">
                  <div className="project-title">
                    <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                      {study.title}
                    </h2>
                    <p className="text-sm md:text-lg text-neutral-500 uppercase font-light leading-relaxed mb-8">
                      {study.tagline}
                    </p>
                    <div className="flex flex-col gap-6">
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">Role</span>
                        <div className="text-xs uppercase font-medium text-neutral-300">{study.role}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <button className="px-8 py-4 bg-white text-black hover:bg-cyan-400 transition-colors duration-500 text-xs font-bold uppercase tracking-[0.2em] w-fit">
                      View System Details
                    </button>
                    <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-widest">Available to explore ↗</span>
                  </div>
                </div>

                <div className="absolute bottom-0 right-0 text-[30vw] font-black text-white/[0.02] pointer-events-none select-none leading-none -mb-[5vw] -mr-[5vw]">
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
