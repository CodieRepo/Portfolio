'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Toggle Command Palette on Cmd+K or Ctrl+K
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
    { label: '01. GO TO HERO // SATWIK PAL', action: () => scrollTo('#hero') },
    { label: '02. GO TO ABOUT // MINDSET & PHILOSOPHY', action: () => scrollTo('#about') },
    { label: '03. GO TO PROJECTS // FLAGSHIP CASE STUDIES', action: () => scrollTo('#projects') },
    { label: '04. GO TO PROCESS // ENGINEERING METHODOLOGY', action: () => scrollTo('#process') },
    { label: '05. GO TO TECH STACK // NODE TOPOLOGY', action: () => scrollTo('#tech') },
    { label: '06. GO TO TIMELINE // EDUCATION & CREDENTIALS', action: () => scrollTo('#credentials') },
    { label: '07. GO TO CONTACT // COMMAND CENTER', action: () => scrollTo('#contact') },
    { label: '★ LAUNCH TRINETRA DIGITAL SOLUTION', action: () => window.open('https://trinetradigitalsolution.com', '_blank') },
    { label: '★ LAUNCH AKUAFI.COM', action: () => window.open('https://akuafi.com', '_blank') },
    { label: '★ LAUNCH VAASTUINFRA.COM', action: () => window.open('https://vaastuinfra.com', '_blank') },
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
      {/* HUD Trigger Button in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1 border border-white/20 text-[10px] font-mono uppercase text-neutral-400 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-2 cursor-pointer bg-black/40 backdrop-blur-md"
        data-cursor="pointer"
      >
        <span>COMMAND PALETTE</span>
        <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 text-[9px] text-cyan-400">
          ⌘K
        </kbd>
      </button>

      {/* Command Palette Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full max-w-xl bg-neutral-950 border border-cyan-400/40 p-6 text-white font-mono shadow-[0_0_80px_rgba(0,229,255,0.15)]"
            >
              {/* Header & Input */}
              <div className="flex justify-between items-center text-[10px] text-cyan-400 mb-4 border-b border-white/10 pb-3">
                <span>[ RAYCAST COMMAND PALETTE V1.0 ]</span>
                <span className="text-neutral-500">ESC TO CLOSE</span>
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or jump to section..."
                autoFocus
                className="w-full bg-black border border-white/20 p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 mb-4"
              />

              {/* Command List */}
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {filteredCommands.map((cmd) => (
                  <button
                    key={cmd.label}
                    onClick={cmd.action}
                    className="w-full text-left p-2.5 text-xs text-neutral-300 hover:text-white hover:bg-cyan-950/40 hover:border-l-2 hover:border-cyan-400 transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>{cmd.label}</span>
                    <span className="text-[10px] text-neutral-600">ENTER ↵</span>
                  </button>
                ))}
                {filteredCommands.length === 0 && (
                  <div className="p-4 text-xs text-neutral-500 text-center">
                    No matching commands found.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
