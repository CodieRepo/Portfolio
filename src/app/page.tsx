'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SystemBootPreloader } from '@/components/ui/SystemBootPreloader';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { MechanicalCADOverlay } from '@/components/ui/MechanicalCADOverlay';
import { AudioToggle } from '@/components/ui/AudioToggle';
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

export default function Home() {
  return (
    <div className="bg-[#030407] text-white relative min-h-screen selection:bg-cyan-400 selection:text-black">
      {/* Boot Preloader */}
      <SystemBootPreloader />

      {/* Mechanical CAD Grid Overlay Layer */}
      <MechanicalCADOverlay />

      {/* R3F WebGL 3D Spatial Canvas */}
      <SpatialCanvas />

      {/* Sticky Header Nav HUD */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 lg:px-24 flex justify-between items-center bg-gradient-to-b from-black to-transparent backdrop-blur-[3px] border-b border-white/5">
        <div
          className="text-xs font-mono font-bold tracking-widest cursor-pointer select-none flex items-center gap-2"
          data-cursor="pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>SATWIK PAL // DEV</span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-mono tracking-widest uppercase">
            <a href="#about" className="hover:text-cyan-400 transition-colors" data-cursor="pointer">
              Mindset
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors" data-cursor="pointer">
              Case Studies
            </a>
            <a href="#process" className="hover:text-cyan-400 transition-colors" data-cursor="pointer">
              Process
            </a>
            <a href="#tech" className="hover:text-cyan-400 transition-colors" data-cursor="pointer">
              Stack
            </a>
            <a href="#credentials" className="hover:text-cyan-400 transition-colors" data-cursor="pointer">
              Timeline
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors" data-cursor="pointer">
              Contact
            </a>
          </nav>

          {/* Audio Haptic Toggle */}
          <AudioToggle />

          {/* Raycast-Style Command Palette Trigger */}
          <CommandPalette />
        </div>
      </header>

      {/* Narrative Page Flow */}
      <main className="relative z-10">
        {/* Stage 01 & 02: Hero */}
        <PersonalHero />

        {/* Stage 03: About & Mindset */}
        <AboutMindset />

        {/* Stage 04 & 05: Flagship Case Studies */}
        <FlagshipProjects />

        {/* Stage 06: Engineering Process */}
        <EngineeringProcess />

        {/* Stage 07: Interactive Tech Stack */}
        <InteractiveTechStack />

        {/* Stage 08: Credentials & Timeline */}
        <ExperienceTimeline />

        {/* Stage 09 & 10: Spatial Command Center */}
        <SpatialCommandCenter />
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-24 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-500 bg-black/90 z-10 relative">
        <p>© 2026 SATWIK PAL. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6 uppercase">
          <span>FOUNDER @ TRINETRA DIGITAL SOLUTION</span>
          <span>FULL STACK & AI AUTOMATION</span>
        </div>
      </footer>
    </div>
  );
}
