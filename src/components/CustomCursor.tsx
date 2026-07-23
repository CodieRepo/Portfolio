'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view'>('default');
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    // Event delegation to capture target hovers globally
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine cursor scale type
      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor') as 'pointer' | 'view';
        setCursorType(type || 'pointer');
      } else {
        setCursorType('default');
      }

      // Check if target element requests an image preview
      const imageEl = target.closest('[data-image]');
      if (imageEl) {
        const imgUrl = imageEl.getAttribute('data-image');
        setActiveImage(imgUrl);
      } else {
        setActiveImage(null);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Snappy layout transitions using spring physics matching our elite aesthetics
  const springConfig = {
    type: 'spring' as const,
    stiffness: 350,
    damping: 28,
    mass: 0.6,
  };

  const isPointer = cursorType === 'pointer';
  const isView = cursorType === 'view';
  
  // Custom cursor diameters for different states
  // Shrink the cursor ring slightly when showing the floating image preview card
  const size = activeImage ? 16 : isView ? 80 : isPointer ? 48 : 12;

  return (
    <>
      {/* Main Cursor Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-50 pointer-events-none mix-blend-difference flex items-center justify-center bg-white"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: size,
          height: size,
        }}
        transition={springConfig}
      >
        {isView && !activeImage && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] uppercase font-bold tracking-widest text-black select-none pointer-events-none"
          >
            View
          </motion.span>
        )}
      </motion.div>

      {/* Floating Spring-interpolated Image Preview Card */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotate: -4 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
              mass: 0.8,
            }}
            className="fixed top-0 left-0 z-40 pointer-events-none w-64 aspect-[16/10] border border-white/20 bg-neutral-950 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
            style={{
              x,
              y,
              translateX: '32px',
              translateY: '-110%',
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${activeImage})` }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
