import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei';

const AnimatedShape = ({ currentSlide }) => {
  // Change color based on slide to make it dynamic
  const colors = [
    "#1DB954", // Green
    "#ff00d4", // Pink
    "#00f2ff", // Blue
    "#ff8800", // Orange
    "#9d00ff", // Purple
    "#1DB954",
    "#ff00d4"
  ];
  const color = colors[currentSlide % colors.length] || "#1DB954";

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const Background3D = ({ currentSlide }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#00f2ff" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={currentSlide + 1} />
        <AnimatedShape currentSlide={currentSlide} />
      </Canvas>
    </div>
  );
};

export default Background3D;
