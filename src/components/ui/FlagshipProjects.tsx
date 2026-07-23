'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  id: string;
  isFlagship?: boolean;
  title: string;
  tagline: string;
  role: string;
  architecture: string;
  challenge: string;
  outcome: string;
  modules: string[];
  techStack: string[];
  link: string;
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '01',
    isFlagship: true,
    title: 'Trinetra Digital Solution',
    tagline: 'Enterprise AI Operating System & Business Engine',
    role: 'Founder & Lead Architect',
    architecture: 'Java / Spring Boot Microservices, Node.js API Gateway, PostgreSQL, React.js Client',
    challenge: 'Orchestrating real-time lead ingestion, NLP intent classification, and multi-channel WhatsApp bot responses with sub-50ms execution.',
    outcome: 'Automated 80% of client lead processing and increased conversion velocity by 3.5x.',
    modules: ['AI Automation Engine', 'Custom CRM Pipeline', 'WhatsApp Business Bot', 'AI Video Avatars', 'Web Systems', 'SEO / PPC Ads'],
    techStack: ['Java', 'Spring Boot', 'Node.js', 'Express', 'React.js', 'PostgreSQL', 'Tailwind'],
    link: 'https://trinetradigitalsolution.com',
    image: '/trinetra_thumbnail.png',
  },
  {
    id: '02',
    title: 'Akuafi.com',
    tagline: 'Commercial Water Brand & Customer Telemetry System',
    role: 'Full Stack Developer & Growth Systems Architect',
    architecture: 'React.js Client, Node.js REST API Layer, PostgreSQL Telemetry DB',
    challenge: 'Structuring dynamic QR code scan analytics and customer engagement funnels with zero latency.',
    outcome: 'Digitized brand engagement and automated customer retention tracking across retail channels.',
    modules: ['Brand Identity', 'Web Experience', 'Marketing Automation', 'QR Engagement Funnel', 'Analytics'],
    techStack: ['React.js', 'Node.js', 'REST APIs', 'PostgreSQL', 'Tailwind CSS'],
    link: 'https://akuafi.com',
    image: '/akuafi_thumbnail.png',
  },
  {
    id: '03',
    title: 'VaastuInfra.com',
    tagline: 'Luxury Real Estate Experience & Lead Generation Engine',
    role: 'Lead Frontend Architect & Performance Engineer',
    architecture: 'Next.js App Router, Tailwind CSS, Framer Motion Spring Engine',
    challenge: 'Maintaining 60 FPS kinetic rendering for dense architectural blueprint layouts on mobile browsers.',
    outcome: 'Increased luxury real estate lead conversion by 40% and cut load times to under 800ms.',
    modules: ['Luxury Architectural UI', 'Real Estate Lead Capture', 'Performance Optimization', '3D Grid'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://vaastuinfra.com',
    image: '/vaastu_thumbnail.png',
  },
];

export function FlagshipProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Interactive Live Simulator State
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    setTimeout(() => setSimStep(2), 700);
    setTimeout(() => setSimStep(3), 1400);
    setTimeout(() => setSimStep(4), 2100);
    setTimeout(() => setSimStep(5), 2800);
    setTimeout(() => setIsSimulating(false), 3600);
  };

  const simStepsData = [
    { label: '01. INGEST', detail: 'Form Submitted ➔ JSON Payload Ingested [2ms]' },
    { label: '02. QUALIFY', detail: 'NLP Intent Classifier ➔ Score: 94/100 High Lead [14ms]' },
    { label: '03. CRM SYNC', detail: 'PostgreSQL DB Insert ➔ Contact & Deal Created [28ms]' },
    { label: '04. WHATSAPP', detail: 'WhatsApp API Bot ➔ Instant Auto-Reply Sent [42ms]' },
    { label: '05. BOOKED', detail: 'Calendar Slot Confirmed ➔ Executive Alerted [55ms]' },
  ];

  return (
    <section
      ref={ref}
      id="projects"
      className="py-32 px-6 md:px-12 lg:px-24 border-b border-white/10 bg-black text-white relative z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-12 mb-16 gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
              [ 03 // FLAGSHIP CASE STUDIES ]
            </span>
            <h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tight leading-none">
              Featured Engineering Works
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-md uppercase leading-relaxed">
            Detailed breakdowns of production systems, architecture decisions, and business outcomes engineered by Satwik Pal.
          </p>
        </div>

        {/* Case Studies List */}
        <div className="flex flex-col gap-24">
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
              className={`border ${study.isFlagship ? 'border-cyan-400/40 bg-neutral-950/80' : 'border-white/10 bg-neutral-950/30'} p-8 md:p-12 relative group`}
              data-cursor="view"
              data-image={study.image}
            >
              {study.isFlagship && (
                <div className="absolute -top-3 left-8 px-3 py-0.5 bg-cyan-400 text-black text-[9px] font-mono font-bold uppercase tracking-widest flex items-center gap-1">
                  <span>★ HERO CASE STUDY</span>
                  <span>// TRINETRA AI OS</span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Thumbnail & Link */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="aspect-[16/10] bg-neutral-900 overflow-hidden relative border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-500">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${study.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <a
                    href={study.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-white/20 text-xs font-mono uppercase tracking-widest text-center hover:border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-300"
                    data-cursor="pointer"
                  >
                    Launch Live System ↗
                  </a>
                </div>

                {/* Right: Technical Case Study Breakdown */}
                <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono text-cyan-400">
                        [{study.id}] CASE STUDY
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase">
                        ROLE: {study.role}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-xs md:text-sm font-mono text-neutral-400 uppercase tracking-wide mb-6">
                      {study.tagline}
                    </p>

                    {/* Integrated Modules Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.modules.map((mod) => (
                        <span
                          key={mod}
                          className="text-[9px] font-mono border border-cyan-400/30 text-cyan-300 px-2 py-0.5 uppercase bg-cyan-950/30"
                        >
                          + {mod}
                        </span>
                      ))}
                    </div>

                    {/* Technical Narrative Grid */}
                    <div className="space-y-3 border-t border-white/10 pt-4 text-xs font-mono">
                      <div>
                        <strong className="text-neutral-300 uppercase block mb-1">[ Architecture ]</strong>
                        <p className="text-neutral-400 leading-relaxed">{study.architecture}</p>
                      </div>
                      <div>
                        <strong className="text-neutral-300 uppercase block mb-1">[ Engineering Challenge ]</strong>
                        <p className="text-neutral-400 leading-relaxed">{study.challenge}</p>
                      </div>
                      <div>
                        <strong className="text-neutral-300 uppercase block mb-1">[ Business Outcome ]</strong>
                        <p className="text-cyan-300 leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Live Lead Pipeline Simulator (Only for Trinetra Hero Case Study) */}
                  {study.isFlagship && (
                    <div className="mt-4 p-4 border border-cyan-400/30 bg-black/60 font-mono text-xs">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-cyan-400 uppercase tracking-wider">
                          [ INTERACTIVE AI OS PIPELINE SIMULATOR ]
                        </span>
                        <button
                          onClick={runSimulation}
                          disabled={isSimulating}
                          className="px-3 py-1 bg-cyan-400 text-black text-[9px] font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                          data-cursor="pointer"
                        >
                          {isSimulating ? 'EXECUTING PIPELINE...' : '▶ RUN LIVE LEAD SIMULATION'}
                        </button>
                      </div>

                      <div className="space-y-2 text-[10px]">
                        {simStepsData.map((stepData, idx) => {
                          const stepNum = idx + 1;
                          const isActive = simStep >= stepNum;
                          const isCurrent = simStep === stepNum;

                          return (
                            <div
                              key={stepData.label}
                              className={`p-2 border transition-all duration-300 flex items-center justify-between ${
                                isCurrent
                                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                                  : isActive
                                  ? 'border-white/20 text-neutral-300'
                                  : 'border-white/5 text-neutral-600'
                              }`}
                            >
                              <span className="font-bold">{stepData.label}</span>
                              <span>{stepData.detail}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {study.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono bg-black border border-white/10 px-2.5 py-1 uppercase text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
