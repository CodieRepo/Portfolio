'use client';

import React from 'react';
import { motion } from 'framer-motion';

const tech = [
  { name: 'Java', category: 'Backend', level: 95 },
  { name: 'Spring Boot', category: 'Backend', level: 92 },
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'Next.js', category: 'Frontend', level: 92 },
  { name: 'Three.js', category: 'Creative', level: 85 },
  { name: 'PostgreSQL', category: 'Database', level: 88 },
  { name: 'AI/NLP', category: 'Automation', level: 85 },
];

export function InteractiveTechStack() {
  return (
    <section id="tech" className="py-32 px-6 bg-black border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">// Technology Stack</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Core Capabilities</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tech.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ delay: i * 0.05 }}
              className="p-8 border border-white/10 bg-neutral-950/50 flex flex-col justify-between aspect-square group hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{item.category}</span>
                <div className="w-2 h-2 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold uppercase">{item.name}</h3>
                <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute inset-0 bg-cyan-400" 
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-neutral-500 uppercase">
                  <span>Proficiency</span>
                  <span>{item.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
