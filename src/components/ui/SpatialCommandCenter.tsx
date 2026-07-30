'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function SpatialCommandCenter() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <section id="contact" className="min-h-screen py-32 px-6 bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))] opacity-[0.03] pointer-events-none">
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className="border-[0.5px] border-white" />
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="border border-cyan-400/30 bg-black p-8 md:p-16 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-2 block">// Establish Connection</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Contact.</h2>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-[10px] font-mono text-neutral-500 uppercase">System Status</div>
              <div className="text-cyan-400 text-xs font-mono flex items-center gap-2 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                ONLINE
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Identification</label>
                <input 
                  type="text" 
                  placeholder="NAME / ORGANIZATION"
                  className="w-full bg-neutral-900/50 border border-white/10 p-4 text-sm font-mono focus:border-cyan-400 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Communication Channel</label>
                <input 
                  type="email" 
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-neutral-900/50 border border-white/10 p-4 text-sm font-mono focus:border-cyan-400 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Transmission Payload</label>
              <textarea 
                rows={4}
                placeholder="PROJECT_REQUIREMENTS // SYSTEM_CONSULTATION"
                className="w-full bg-neutral-900/50 border border-white/10 p-4 text-sm font-mono focus:border-cyan-400 outline-none transition-colors resize-none"
              />
            </div>

            <button className="w-full py-6 bg-cyan-400 text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors duration-300">
              Initiate Transmission
            </button>
          </form>

          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-2">Location</span>
              <span className="text-[10px] font-mono uppercase">Global / Remote</span>
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase block mb-2">Social</span>
              <span className="text-[10px] font-mono uppercase">LinkedIn / GitHub</span>
            </div>
            <div className="col-span-2 text-right flex flex-col justify-end">
              <span className="text-[9px] font-mono text-neutral-600 uppercase">© 2026 SATWIK PAL SYSTEMS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
