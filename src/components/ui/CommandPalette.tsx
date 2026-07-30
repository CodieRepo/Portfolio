'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commands = [
    { label: '01. GO TO HERO', action: () => scrollTo('#hero') },
    { label: '02. GO TO ABOUT', action: () => scrollTo('#about') },
    { label: '03. GO TO PROJECTS', action: () => scrollTo('#projects') },
    { label: '04. GO TO PROCESS', action: () => scrollTo('#process') },
    { label: '05. GO TO TECH STACK', action: () => scrollTo('#tech') },
    { label: '06. GO TO TIMELINE', action: () => scrollTo('#credentials') },
    { label: '07. GO TO CONTACT', action: () => scrollTo('#contact') },
    { label: '★ TRINETRA DIGITAL', action: () => window.open('https://trinetradigitalsolution.com', '_blank') },
    { label: '★ AKUAFI.COM', action: () => window.open('https://akuafi.com', '_blank') },
    { label: '★ VAASTUINFRA.COM', action: () => window.open('https://vaastuinfra.com', '_blank') },
  ];

  const scrollTo = (selector: string) => {
    setIsOpen(false);
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[10px] font-mono text-neutral-400 hover:text-cyan-400 transition-colors tracking-widest uppercase border border-white/10 px-4 py-2 hover:border-cyan-400/50"
      >
        Command ⌘K
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-neutral-950 border border-white/10 p-8 shadow-2xl"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="EXECUTE COMMAND..."
                autoFocus
                className="w-full bg-transparent border-b border-white/10 pb-4 mb-8 text-2xl font-black uppercase tracking-tighter outline-none focus:border-cyan-400 transition-colors"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCommands.map((cmd) => (
                  <button
                    key={cmd.label}
                    onClick={cmd.action}
                    className="group text-left p-4 border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all flex items-center justify-between"
                  >
                    <span className="text-xs font-mono text-neutral-400 group-hover:text-white uppercase tracking-widest">{cmd.label}</span>
                    <span className="text-[10px] font-mono text-neutral-700 group-hover:text-cyan-400">EXE</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between items-center text-[9px] font-mono text-neutral-600 uppercase tracking-[0.2em]">
                <span>System Console v2.0.0</span>
                <span>Esc to terminate</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
