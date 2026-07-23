'use client';

import React, { useState } from 'react';
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
      className={`px-3 py-1 border text-[10px] font-mono uppercase transition-colors flex items-center gap-1.5 cursor-pointer bg-black/40 backdrop-blur-md ${
        !isMuted
          ? 'border-cyan-400 text-cyan-400 bg-cyan-950/40'
          : 'border-white/20 text-neutral-400 hover:text-white'
      }`}
      data-cursor="pointer"
    >
      <span>AUDIO</span>
      <span>{isMuted ? '[OFF]' : '[ON 🔊]'}</span>
    </button>
  );
}
