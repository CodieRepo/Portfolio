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
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useEffect(() => {
    // Dramatic Camera Flight Path
    gsap.to(state => state.camera.position, {
      z: 2,
      y: 2,
      duration: 1,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Rotation of the entire scene group
    gsap.to(groupRef.current!.rotation, {
      y: Math.PI * 2,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth camera lerp for mouse movement (optional but adds tech feel)
    // state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 2, 0.05);
    // state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 2 + 2, 0.05);
    // state.camera.lookAt(0, 0, 0);

    if (coreRef.current) {
      coreRef.current.rotation.z = time * 0.2;
      coreRef.current.rotation.y = time * 0.3;
      coreRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 5, 12]} fov={50} />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00e5ff" />
      
      <Grid
        ref={gridRef}
        infiniteGrid
        fadeDistance={40}
        fadeStrength={5}
        cellSize={0.5}
        sectionSize={2}
        sectionColor="#00e5ff"
        cellColor="#050505"
        position={[0, -2, 0]}
      />

      <FloatingDataNodes />

      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[2.5, 0]} />
          <MeshDistortMaterial
            color="#00e5ff"
            speed={4}
            distort={0.4}
            radius={1}
            emissive="#00e5ff"
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      </Float>

      <Sparkles count={400} scale={25} size={1.5} speed={0.5} color="#00e5ff" />
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
