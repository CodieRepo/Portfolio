'use client';

import React, { useState, useEffect } from 'react';
import { webAudio } from '@/utils/WebAudioEngine';

export function AudioToggle() {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const toggleSound = () => {
    const nextState = webAudio.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <button
      onClick={toggleSound}
      className="group relative flex items-center gap-2 px-4 py-2 cursor-pointer"
    >
      <div className="flex gap-[2px] items-end h-3">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`w-[2px] bg-cyan-400 transition-all duration-300 ${!isMuted ? 'animate-pulse' : 'h-[2px]'}`}
            style={{ 
              height: !isMuted ? `${Math.random() * 100 + 20}%` : '2px',
              animationDelay: `${i * 0.1}s`
            }} 
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-neutral-400 group-hover:text-cyan-400 transition-colors tracking-widest uppercase">
        {isMuted ? 'Audio Off' : 'Audio On'}
      </span>
    </button>
  );
}
