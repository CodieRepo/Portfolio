'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function EngineeringProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      step: 'STEP 01',
      title: 'Workflow Framing',
      desc: 'Analyzing client bottlenecks, mapping data flows, and defining system primitives before writing a single line of code.',
    },
    {
      step: 'STEP 02',
      title: 'Backend & DB Blueprint',
      desc: 'Designing relational database schemas (PostgreSQL), RESTful microservices (Spring Boot/Node.js), and security controllers.',
    },
    {
      step: 'STEP 03',
      title: 'Kinetic Client UI',
      desc: 'Building responsive frontends in Next.js, React, and Tailwind CSS driven by Framer Motion spring physics and Lenis scroll controls.',
    },
    {
      step: 'STEP 04',
      title: 'Automated CI/CD Deployment',
      desc: 'Performing rigorous Postman API validation, SQL query tuning, and deployment testing to guarantee 99.9% uptime.',
    },
  ];

  return (
    <section
      ref={ref}
      id="process"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black/80 text-white relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-12 mb-16">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
            [ 04 // ENGINEERING METHODOLOGY ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none">
            How I Build Systems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: idx * 0.1 }}
              className="border border-white/10 p-8 bg-neutral-950/40 relative flex flex-col justify-between min-h-[260px]"
            >
              <div className="text-xs font-mono text-cyan-400 mb-4">{s.step}</div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
                  {s.title}
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="text-[9px] font-mono text-neutral-600 uppercase mt-6 pt-4 border-t border-white/5">
                SATWIK PAL // STAGE {idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
