'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function QuantumCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRefRef = useRef<THREE.Group>(null);
  const secondaryRingRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.y = time * 0.2;
    }
    if (ringRefRef.current) {
      ringRefRef.current.rotation.z = time * 0.12;
      ringRefRef.current.rotation.y = time * 0.06;
    }
    if (secondaryRingRef.current) {
      secondaryRingRef.current.rotation.z = -time * 0.08;
      secondaryRingRef.current.rotation.x = time * 0.04;
    }
  });

  return (
    <group>
      {/* Central Procedural Liquid Shader Orb */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1.8}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#00e5ff"
            emissive="#004455"
            roughness={0.1}
            metalness={0.9}
            distort={0.42}
            speed={3.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
      </Float>

      {/* Primary Orbiting Telemetry Ring */}
      <group ref={ringRefRef}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.8, 0.015, 16, 100]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.45} />
        </mesh>
      </group>

      {/* Secondary Counter-Rotating Ring */}
      <group ref={secondaryRingRef}>
        <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <torusGeometry args={[3.4, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Ambient Data Particles */}
      <Sparkles
        count={90}
        scale={12}
        size={2.8}
        speed={0.45}
        opacity={0.6}
        color="#00e5ff"
      />
    </group>
  );
}

export function SpatialCanvas() {
  const [isSupported, setIsSupported] = useState(true);
  const [lightColor, setLightColor] = useState('#00e5ff');

  useEffect(() => {
    // Solar time-reactive lighting adjustment
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 17) {
      setLightColor('#00e5ff'); // Day: Crisp Electric Cyan
    } else if (hour >= 17 && hour < 20) {
      setLightColor('#ffaa00'); // Dusk: Warm Amber
    } else {
      setLightColor('#00c2ff'); // Night: Deep Obsidian Cyan
    }

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setIsSupported(false);
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-80">
      <Canvas gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.4} color={lightColor} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ffffff" />
        <QuantumCore />
      </Canvas>
    </div>
  );
}
