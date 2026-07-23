'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMagnetic } from '@/hooks/useMagnetic';

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Magnetic references for interactive links
  const emailRef = useRef<HTMLAnchorElement>(null);
  const { x: emailX, y: emailY } = useMagnetic(emailRef, 80, 0.45);

  const linkedinRef = useRef<HTMLAnchorElement>(null);
  const { x: linkedinX, y: linkedinY } = useMagnetic(linkedinRef, 80, 0.45);

  const phoneRef = useRef<HTMLAnchorElement>(null);
  const { x: phoneX, y: phoneY } = useMagnetic(phoneRef, 80, 0.45);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="py-40 px-6 md:px-12 lg:px-24 bg-black text-white relative z-10 border-b border-white/10"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto flex flex-col items-center justify-center text-center"
      >
        <motion.span
          variants={itemVariants}
          className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-6"
        >
          [ 04 // CONNECTIONS ]
        </motion.span>
        
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-7xl lg:text-9xl font-black uppercase tracking-tighter mb-12 hover:line-through cursor-pointer transition-all duration-300 select-none"
          data-cursor="pointer"
        >
          LET'S TALK
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="max-w-md text-xs md:text-sm font-mono text-neutral-400 uppercase leading-relaxed mb-16"
        >
          Available for full-stack engineering roles, software development contracts, and technical collaborations. Located in Gorakhpur, UP, India.
        </motion.p>

        {/* Contact list with magnetic offsets */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center w-full"
        >
          {/* Email */}
          <motion.a
            ref={emailRef}
            style={{ x: emailX, y: emailY }}
            href="mailto:satwikpal786@gmail.com"
            className="px-8 py-4 border border-white font-mono uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer select-none bg-black"
            data-cursor="pointer"
          >
            satwikpal786@gmail.com
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            ref={linkedinRef}
            style={{ x: linkedinX, y: linkedinY }}
            href="https://linkedin.com/in/satwik-pal-129374189"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-white/20 font-mono uppercase text-xs tracking-widest hover:border-white hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer select-none bg-black"
            data-cursor="pointer"
          >
            LinkedIn ↗
          </motion.a>

          {/* Phone */}
          <motion.a
            ref={phoneRef}
            style={{ x: phoneX, y: phoneY }}
            href="tel:+917388625622"
            className="px-8 py-4 border border-white/20 font-mono uppercase text-xs tracking-widest hover:border-white hover:bg-white hover:text-black transition-colors duration-500 cursor-pointer select-none bg-black"
            data-cursor="pointer"
          >
            +91 7388625622
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
