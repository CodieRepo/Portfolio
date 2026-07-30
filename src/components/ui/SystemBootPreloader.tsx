'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SystemBootPreloader() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center font-mono"
        >
          <div className="w-full max-w-xs space-y-4 px-6">
            <div className="flex justify-between text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
              <span>Initializing</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-px bg-white/10 relative">
              <motion.div 
                className="absolute inset-0 bg-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[9px] text-neutral-600 uppercase tracking-widest text-center">
              Satwik Pal // System OS v2.0
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
