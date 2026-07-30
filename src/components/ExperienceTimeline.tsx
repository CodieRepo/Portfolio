'use client';

import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    year: '2023 - Present',
    role: 'Founder & Lead Architect',
    company: 'Trinetra Digital Solution',
    desc: 'Leading a team to build AI-powered business engines. Architected core microservices and automated client workflows.'
  },
  {
    year: '2022 - 2023',
    role: 'Full Stack Developer',
    company: 'Akuafi',
    desc: 'Developed customer telemetry systems and brand engagement funnels. Scaled data collection architecture.'
  },
  {
    year: '2021 - 2022',
    role: 'Frontend Performance Engineer',
    company: 'Vaastu Infra',
    desc: 'Optimized real-time rendering for architectural visualization. Improved conversion rates through UX engineering.'
  }
];

export function ExperienceTimeline() {
  return (
    <section id="credentials" className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h2 className="text-6xl font-black uppercase tracking-tighter leading-none sticky top-32">
              Career Path.
            </h2>
          </div>
          
          <div className="lg:col-span-8 space-y-24">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative pl-12 border-l border-neutral-200"
              >
                <div className="absolute left-0 top-0 w-[2px] h-0 bg-black group-hover:h-full transition-all duration-700" />
                
                <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-4 block">
                  {exp.year}
                </span>
                <h3 className="text-3xl font-bold uppercase mb-2">{exp.role}</h3>
                <h4 className="text-xl font-medium text-neutral-500 uppercase mb-6">{exp.company}</h4>
                <p className="text-neutral-600 max-w-2xl leading-relaxed">
                  {exp.desc}
                </p>
                
                <div className="mt-8 flex gap-4">
                  <div className="h-10 w-10 border border-neutral-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-xs font-mono">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
