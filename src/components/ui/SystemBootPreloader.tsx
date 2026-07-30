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
          setTimeout(() => setIsComplete(true), 800);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] bg-black text-white flex items-center justify-center font-mono"
        >
          <div className="w-full max-w-xs space-y-8 px-6 overflow-hidden">
            <div className="flex flex-col items-center gap-2">
              <div className="text-[10px] tracking-[0.5em] text-neutral-500 uppercase">System OS v2.0</div>
              <div className="text-4xl font-black text-white tracking-tighter">{progress}%</div>
            </div>
            
            <div className="w-full h-[1px] bg-white/5 relative">
              <motion.div 
                className="absolute inset-0 bg-cyan-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="flex justify-between text-[8px] text-neutral-600 uppercase tracking-[0.3em]">
              <span>Memory // OK</span>
              <span>Shaders // OK</span>
              <span>R3F // OK</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
