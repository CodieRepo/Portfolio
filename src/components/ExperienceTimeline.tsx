'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimelineItem {
  year: string;
  institution: string;
  role: string;
  details: string[];
}

const timelineData: TimelineItem[] = [
  {
    year: '2025 — 2028',
    institution: 'Buddha Institute of Technology',
    role: 'Bachelor of Technology — Computer Science Engineering',
    details: [
      'Focusing on Algorithms, Data Structures, and Database Management Systems.',
      'Constructing desktop software and system models for network architectures.',
      'Applying object-oriented principles using Java and structural engineering logic.'
    ]
  },
  {
    year: '2024 — 2025',
    institution: 'Mindscripts Tech',
    role: 'Java Full Stack Web Development Certification',
    details: [
      'Intense, hands-on syllabus covering Java SE/EE, Spring Boot, Spring MVC, and Hibernate.',
      'Built multi-tier applications utilizing RESTful API structures and SQL databases.',
      'Connected decoupled architectures with React.js client frontends and Tailwind styling.'
    ]
  },
  {
    year: '2017 — 2020',
    institution: 'Maharana Pratap Polytechnic',
    role: 'Diploma in Mechanical Production Engineering',
    details: [
      'Gained deep structural knowledge in mechanical assembly, thermodynamics, and layout drafting.',
      'Learned industrial tolerance limits and pipeline systems—translating to modern software design.',
      'Developed rigorous problem-solving skills analyzing physical production pipelines.'
    ]
  },
  {
    year: '2015 — 2016',
    institution: 'Stepping Stone School',
    role: 'High School Matriculation',
    details: [
      'Acquired fundamental mathematical and analytical reasoning bases.'
    ]
  }
];

export function ExperienceTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="credentials"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black text-white relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-12 mb-16">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
            [ 04 // TIMELINE & CREDENTIALS ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none">
            Educational Blueprint
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-white/10 pl-6 md:pl-12 ml-4 md:ml-8 space-y-16">
          {timelineData.map((item, index) => {
            const itemRef = useRef<HTMLDivElement>(null);
            const isItemInView = useInView(itemRef, { once: true, margin: '-50px' });

            return (
              <div key={item.institution} ref={itemRef} className="relative">
                {/* Visual Timeline Marker Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isItemInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-black z-20"
                />

                {/* Content Block */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isItemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-4"
                >
                  {/* Left: Year range */}
                  <div className="lg:col-span-3">
                    <span className="text-lg font-mono font-bold tracking-tight text-neutral-400">
                      {item.year}
                    </span>
                  </div>

                  {/* Right: Institution & details */}
                  <div className="lg:col-span-9 flex flex-col gap-2">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight">
                      {item.institution}
                    </h3>
                    <h4 className="text-xs md:text-sm font-mono uppercase text-neutral-400 tracking-wider">
                      {item.role}
                    </h4>
                    <ul className="mt-4 space-y-2 max-w-3xl">
                      {item.details.map((detail, dIndex) => (
                        <li
                          key={dIndex}
                          className="text-xs md:text-sm font-mono text-neutral-500 leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-neutral-400 mt-1 select-none">↳</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
