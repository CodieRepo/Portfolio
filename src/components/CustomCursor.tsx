'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ id: number; x: number; y: number; s: number }>>([]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const id = Date.now() + Math.random();
      const sparkle = { id, x: e.clientX, y: e.clientY, s: Math.random() * 8 + 4 };
      setTrail((prev) => [...prev.slice(-14), sparkle]);
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[120]">
      <motion.div
        className="absolute h-5 w-5 rounded-full border-2 border-black bg-[#00f0ff] mix-blend-difference"
        animate={{ x: pos.x - 10, y: pos.y - 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />

      {trail.map((item) => (
        <motion.span
          key={item.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: -8 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            left: item.x,
            top: item.y,
            width: item.s,
            height: item.s,
            background: item.id % 2 ? '#ccff00' : '#ff66c4',
          }}
          className="absolute rounded-full"
        />
      ))}
    </div>
  );
}
