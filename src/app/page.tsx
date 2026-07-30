'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { AudioToggle } from '@/components/ui/AudioToggle';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { PersonalHero } from '@/components/ui/PersonalHero';
import { AboutMindset } from '@/components/ui/AboutMindset';
import { FlagshipProjects } from '@/components/ui/FlagshipProjects';
import { EngineeringProcess } from '@/components/ui/EngineeringProcess';
import { InteractiveTechStack } from '@/components/ui/InteractiveTechStack';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { SpatialCommandCenter } from '@/components/ui/SpatialCommandCenter';

// Dynamic SSR-free import for WebGL Canvas
const SpatialCanvas = dynamic(
  () => import('@/components/canvas/SpatialCanvas').then((mod) => mod.SpatialCanvas),
  { ssr: false }
);

import { SystemBootPreloader } from '@/components/ui/SystemBootPreloader';
import { CustomCursor } from '@/components/CustomCursor';

export default function Home() {
  return (
    <div className="bg-black text-white relative min-h-screen selection:bg-cyan-400 selection:text-black">
      <SystemBootPreloader />
      <CustomCursor />
      
      {/* 3D Background */}
      <SpatialCanvas />

      {/* Header HUD */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference">
        <div
          className="text-xs font-mono font-bold tracking-[0.3em] cursor-pointer select-none flex items-center gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-2 h-2 bg-cyan-400" />
          <span>SATWIK PAL // ARCHITECT</span>
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8 text-[9px] font-mono tracking-widest uppercase text-neutral-400">
            {['about', 'projects', 'process', 'tech', 'credentials', 'contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item}`} 
                className="hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <AudioToggle />
            <CommandPalette />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div id="hero">
          <PersonalHero />
        </div>

        <AboutMindset />
        
        <div id="projects">
          <FlagshipProjects />
        </div>

        <div id="process">
          <EngineeringProcess />
        </div>

        <div id="tech">
          <InteractiveTechStack />
        </div>

        <div id="credentials">
          <ExperienceTimeline />
        </div>

        <div id="contact">
          <SpatialCommandCenter />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-neutral-800">
            Let's Build the Future.
          </div>
          <div className="flex flex-col md:flex-row gap-8 text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
            <span>Satwik Pal © 2026</span>
            <span className="hidden md:inline">•</span>
            <span>Founder @ Trinetra Digital Solution</span>
            <span className="hidden md:inline">•</span>
            <span>Full Stack & AI Automation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
