'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TechCategory {
  domain: string;
  skills: { name: string; level: string; desc: string }[];
}

const techData: TechCategory[] = [
  {
    domain: '01 // BACKEND & MICROSERVICES',
    skills: [
      { name: 'Java', level: 'ADVANCED', desc: 'Object-oriented systems, multi-threading, & core language features.' },
      { name: 'Spring Boot', level: 'EXPERT', desc: 'Enterprise microservices, dependency injection, & RESTful controllers.' },
      { name: 'Node.js & Express', level: 'ADVANCED', desc: 'Event-driven API gateways, authentication middleware, & async queues.' },
      { name: 'REST APIs', level: 'EXPERT', desc: 'Sub-50ms JSON responses, pagination, & secure endpoint design.' },
    ],
  },
  {
    domain: '02 // DATABASE & DATA PIPELINES',
    skills: [
      { name: 'PostgreSQL & SQL', level: 'ADVANCED', desc: 'Relational schema modeling, index optimization, & transaction safety.' },
      { name: 'Hibernate / JPA', level: 'ADVANCED', desc: 'Entity mappings, connection pooling, & ORM persistence layers.' },
      { name: 'Data Normalization', level: 'EXPERT', desc: 'Structuring relational integrity to eliminate redundancy.' },
    ],
  },
  {
    domain: '03 // FRONTEND & SPATIAL UX',
    skills: [
      { name: 'React.js & Next.js 15', level: 'EXPERT', desc: 'Server Components, client hooks, code-splitting, & SEO metadata.' },
      { name: 'TypeScript', level: 'EXPERT', desc: 'Strict static typing across API contracts & UI component props.' },
      { name: 'Tailwind CSS', level: 'EXPERT', desc: 'Custom design systems, obsidian glass tokens, & responsive layouts.' },
      { name: 'Framer Motion & R3F', level: 'ADVANCED', desc: 'Spring physics micro-interactions & WebGL 3D canvas integration.' },
    ],
  },
  {
    domain: '04 // TOOLS & METHODOLOGIES',
    skills: [
      { name: 'Git & Version Control', level: 'EXPERT', desc: 'Branch workflows, code reviews, & repository management.' },
      { name: 'Postman & Testing', level: 'EXPERT', desc: 'Endpoint automation, payload validation, & integration tests.' },
      { name: 'Mechanical Systems', level: 'BACKGROUND', desc: 'Structural production engineering tolerances applied to software.' },
    ],
  },
];

export function InteractiveTechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="tech"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black text-white relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-12 mb-16">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            [ 05 // TECHNOLOGY NODE TOPOLOGY ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none">
            Technical Stack & Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {techData.map((cat, catIdx) => (
            <motion.div
              key={cat.domain}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: catIdx * 0.1 }}
              className="border border-white/10 p-8 bg-neutral-950/40 flex flex-col gap-6"
            >
              <div className="text-xs font-mono text-cyan-400 tracking-wider pb-4 border-b border-white/10">
                {cat.domain}
              </div>

              <div className="space-y-6">
                {cat.skills.map((s) => (
                  <div key={s.name} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center text-sm font-bold uppercase">
                      <span className="text-white">{s.name}</span>
                      <span className="text-[9px] font-mono text-cyan-400 border border-cyan-400/30 px-2 py-0.5 bg-cyan-950/20">
                        {s.level}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
