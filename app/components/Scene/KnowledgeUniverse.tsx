// components/Scene/KnowledgeUniverse.tsx
"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function FloatingBook({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  // Premium continuous motion
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    ref.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={ref} position={position} scale={scale}>
        {/* Stylized Book Geometry */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.2, 2]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Pages */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.4, 0.15, 1.9]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

export default function KnowledgeUniverse() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]} 
      gl={{ antialias: true, alpha: true }}
    >
      {/* Soft ambient cinematic lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048} 
      />
      
      {/* Floating Books arranged in a premium museum layout */}
      <FloatingBook position={[-3, 1, -2]} color="#5B8DEF" />
      <FloatingBook position={[3, -1, -1]} color="#FFB74D" />
      <FloatingBook position={[0, 2, -3]} color="#AEE7FF" />
      <FloatingBook position={[-2, -2, 1]} color="#FFE082" />

      {/* Soft floor reflection */}
      <ContactShadows position={[0, -3, 0]} opacity={0.3} scale={20} blur={2} far={4} />
      
      {/* Environment provides realistic glassmorphism reflections */}
      <Environment preset="apartment" />
    </Canvas>
  );
}