'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MechanicalCADOverlay() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'B' || e.key === 'b')) {
        setIsActive((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* HUD Trigger Button */}
      <button
        onClick={() => setIsActive((prev) => !prev)}
        className={`px-3 py-1 border text-[10px] font-mono uppercase transition-colors flex items-center gap-1.5 cursor-pointer bg-black/40 backdrop-blur-md ${
          isActive
            ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40'
            : 'border-white/20 text-neutral-400 hover:text-white'
        }`}
        data-cursor="pointer"
      >
        <span>CAD GRID</span>
        <kbd className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 text-[9px] text-cyan-400">
          ⇧B
        </kbd>
      </button>

      {/* CAD Blueprint Overlay Layer */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 pointer-events-none overflow-hidden select-none"
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff0a_1px,transparent_1px)] bg-[size:128px_128px]" />

            {/* Corner CAD Alignment Markers */}
            <div className="absolute top-20 left-8 text-[9px] font-mono text-cyan-400 tracking-widest bg-black/60 p-2 border border-cyan-400/30">
              CAD_DRAFT // SCALE 1:1 // MECH_PRODUCTION_TOLERANCE ±0.005mm
            </div>
            <div className="absolute top-20 right-8 text-[9px] font-mono text-cyan-400 tracking-widest bg-black/60 p-2 border border-cyan-400/30">
              AXIS: X-104.2 Y-89.4 Z-0.0
            </div>
            <div className="absolute bottom-12 left-8 text-[9px] font-mono text-cyan-400 tracking-widest bg-black/60 p-2 border border-cyan-400/30">
              SATWIK PAL // MECHANICAL STRUCTURAL BLUEPRINT LAYER
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
