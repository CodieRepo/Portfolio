'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    num: '01',
    title: 'Architectural Blueprinting',
    desc: 'Deep analysis of business requirements followed by high-level system design and technology stack selection.'
  },
  {
    num: '02',
    title: 'Core Engine Development',
    desc: 'Building robust, scalable backend microservices and intelligent API gateways for real-time data processing.'
  },
  {
    num: '03',
    title: 'AI Workflow Integration',
    desc: 'Orchestrating LLMs and NLP agents to automate complex decision-making processes and customer interactions.'
  },
  {
    num: '04',
    title: 'Performance Hardening',
    desc: 'Rigorous testing, latency optimization, and system stress testing to ensure production-grade reliability.'
  }
];

export function EngineeringProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      id="process"
      ref={containerRef}
      className="py-32 px-6 bg-white text-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
          <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">
            Process.
          </h2>
          <div className="max-w-md text-right">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 mb-4 block">
              // Engineering Methodology
            </span>
            <p className="text-xl font-light uppercase">
              A systematic approach to building high-scale digital infrastructure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-12 flex flex-col justify-between aspect-square group hover:bg-black hover:text-white transition-colors duration-500"
            >
              <div className="text-4xl font-black font-mono">{step.num}</div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase">{step.title}</h3>
                <p className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors uppercase leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
