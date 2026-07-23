'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  scope: string;
  role: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Trinetra Digital',
    scope: 'Full-Stack (E2E Dev)',
    role: 'Architected and built the entire core backend APIs, database models, and custom high-performance frontend interfaces.',
    description: 'A premium corporate digital solutions hub and automation orchestrator. Engineered to manage business service operations, automations, and digital brand transformations.',
    technologies: ['React.js', 'Node.js', 'Express', 'Tailwind CSS', 'SQL'],
    link: 'https://trinetradigitalsolution.com',
    image: '/trinetra_thumbnail.png',
  },
  {
    id: '02',
    title: 'Akuafi',
    scope: 'Full-Stack (E2E Dev)',
    role: 'Responsible for end-to-end design, database structure, secure RESTful API development, and client control dashboards.',
    description: 'A specialized commercial platform built for resource optimization and metrics monitoring, delivering real-time telemetry and management controls.',
    technologies: ['React.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'Tailwind'],
    link: 'https://akuafi.com',
    image: '/akuafi_thumbnail.png',
  },
  {
    id: '03',
    title: 'Vaastu Infra',
    scope: 'Frontend Layout',
    role: 'Designed and built the structural minimalist frontend website, implementing grid layouts and responsive architectures.',
    description: 'A stark, architectural landing platform created for a real estate and infrastructure development company, emphasizing whitespace and high-contrast grids.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://vaastuinfra.com',
    image: '/vaastu_thumbnail.png',
  },
];

export function WorkShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="work"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black text-white relative z-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-12 mb-16">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
            [ 03 // COMPLETED CONTRACTS ]
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-none">
            Selected Digital Systems
          </h2>
        </div>

        {/* Projects Column List */}
        <div className="flex flex-col divide-y divide-white/10">
          {projects.map((project, index) => {
            const rowRef = useRef<HTMLAnchorElement>(null);
            const isRowInView = useInView(rowRef, { once: true, margin: '-50px' });

            return (
              <motion.a
                key={project.id}
                ref={rowRef}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={isRowInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }}
                className="group py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer transition-colors duration-500 hover:bg-neutral-950/40 px-4"
                data-cursor="view"
                data-image={project.image}
              >
                {/* Thumbnail Image Column */}
                <div className="col-span-1 lg:col-span-3 aspect-[16/10] bg-neutral-900 overflow-hidden relative border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${project.image})` }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                  />
                  {/* Overlay grid dot and gradient patterns */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* ID & Title Column */}
                <div className="col-span-1 lg:col-span-3 flex items-start gap-4 lg:pl-4">
                  <span className="text-xs font-mono text-neutral-600 group-hover:text-white transition-colors duration-300">
                    {project.id}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-500 ease-out">
                      {project.title}
                    </h3>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-1 block">
                      {project.scope}
                    </span>
                  </div>
                </div>

                {/* Description & Role Column */}
                <div className="col-span-1 lg:col-span-4 flex flex-col gap-3">
                  <p className="text-xs md:text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors duration-300 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500 leading-relaxed">
                    <strong className="text-neutral-400 uppercase">[ Role ]</strong> {project.role}
                  </p>
                </div>

                {/* Tech Stack & External Anchor Column */}
                <div className="col-span-1 lg:col-span-2 flex flex-col lg:items-end justify-between h-full gap-4">
                  <div className="flex flex-wrap gap-1.5 lg:justify-end">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[8px] font-mono border border-white/20 px-1.5 py-0.5 uppercase tracking-wider bg-black group-hover:border-white/50 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 group-hover:text-white transition-colors duration-300 flex items-center gap-1 mt-auto lg:text-right">
                    VISIT SITE ↗
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
