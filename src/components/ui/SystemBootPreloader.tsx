'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SystemBootPreloader() {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const bootLogs = [
    'INIT // TRINETRA_AI_CORE_V3.8',
    'ALLOCATING // SPATIAL_MEMORY_BUFFERS',
    'COMPILING // GLSL_DISPLACEMENT_SHADERS',
    'LOADING // SATWIK_PAL_FOUNDATION_MATRIX',
    'MOUNTING // R3F_RENDER_PIPELINE',
    'STATUS // SYSTEM_OPTIMAL_60FPS',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18) + 8;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const logTimer = setInterval(() => {
      setLogIndex((prev) => (prev < bootLogs.length - 1 ? prev + 1 : prev));
    }, 280);

    return () => clearInterval(logTimer);
  }, [bootLogs.length]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 bg-[#030407] text-white flex flex-col justify-between p-8 md:p-16 select-none font-mono"
        >
          {/* Top Header */}
          <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest">
            <span>[ SYSTEM BOOT SEQUENCE ]</span>
            <span> Gorakhpur, UP // IN</span>
          </div>

          {/* Center Progress Display */}
          <div className="flex flex-col items-start gap-6 max-w-xl">
            <div className="text-6xl md:text-8xl font-black font-sans tracking-tighter text-white">
              {progress}%
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 overflow-hidden relative">
              <motion.div
                className="h-full bg-cyan-400"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Terminal Diagnostic Log */}
            <div className="text-xs text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{bootLogs[logIndex]}</span>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] text-neutral-600 uppercase tracking-widest gap-2">
            <span>SATWIK PAL // CREATIVE TECHNOLOGIST</span>
            <span>FOUNDER OF TRINETRA DIGITAL SOLUTION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
