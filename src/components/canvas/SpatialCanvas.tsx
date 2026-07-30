'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Sparkles, 
  PerspectiveCamera, 
  Text,
  Grid,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FloatingDataNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.2 + 0.1,
      speed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={node.speed} rotationIntensity={1} floatIntensity={1}>
          <mesh position={node.position} scale={node.scale}>
            <boxGeometry />
            <meshStandardMaterial color="#00e5ff" wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function Scene() {
  const coreRef = useRef<THREE.Mesh>(null);
  const gridRef = useRef<any>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    gsap.to(groupRef.current!.position, {
      z: -5,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.z = time * 0.1;
      coreRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
      
      <Grid
        ref={gridRef}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
        cellSize={1}
        sectionSize={5}
        sectionColor="#00e5ff"
        cellColor="#111111"
        position={[0, -5, 0]}
      />

      <FloatingDataNodes />

      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshDistortMaterial
            color="#00e5ff"
            speed={2}
            distort={0.3}
            radius={1}
            emissive="#00e5ff"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      <Sparkles count={200} scale={20} size={1} speed={0.3} color="#00e5ff" />
    </group>
  );
}

export function SpatialCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
    </div>
  );
}
