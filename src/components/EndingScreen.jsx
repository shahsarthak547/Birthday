import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

const GiftBox3D = ({ onClick }) => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t) * 0.2;
    groupRef.current.position.y = Math.sin(t * 3) * 0.1;
  });

  return (
    <group ref={groupRef} onClick={onClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'default'}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Box Base */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#ff00d4" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Ribbon Horizontal */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.05, 2.05, 0.4]} />
          <meshStandardMaterial color="#00f2ff" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Ribbon Vertical */}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.4, 2.05, 2.05]} />
          <meshStandardMaterial color="#00f2ff" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Box Lid */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.2, 0.5, 2.2]} />
          <meshStandardMaterial color="#ff00d4" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Lid Ribbon Horizontal */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.25, 0.51, 0.4]} />
          <meshStandardMaterial color="#00f2ff" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Lid Ribbon Vertical */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[0.4, 0.51, 2.25]} />
          <meshStandardMaterial color="#00f2ff" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
};

const EndingScreen = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);
    document.body.style.cursor = 'default';

    // Trigger epic confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1DB954', '#ff00d4', '#00f2ff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1DB954', '#ff00d4', '#00f2ff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="text-center relative w-full h-full flex flex-col items-center justify-center">
      {/* Gift Box Layer */}
      <motion.div
        animate={{ 
          opacity: isOpened ? 0 : 1, 
          scale: isOpened ? 0.5 : 1, 
          y: isOpened ? -100 : 0 
        }}
        transition={{ duration: 0.8, ease: "anticipate" }}
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 ${isOpened ? 'pointer-events-none' : ''}`}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black mb-4 text-white drop-shadow-xl"
        >
          One Last Thing...
        </motion.h2>
        <p className="text-white/60 mb-8 animate-pulse text-lg">Tap the gift to open it</p>

        <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
          <Canvas camera={{ position: [0, 2, 6] }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <directionalLight position={[-10, 10, -10]} intensity={0.5} />
            <GiftBox3D onClick={handleOpenGift} />
          </Canvas>
        </div>
      </motion.div>

      {/* Birthday Message Layer */}
      <motion.div
        animate={{ 
          opacity: isOpened ? 1 : 0, 
          scale: isOpened ? 1 : 0.8,
          y: isOpened ? 0 : 50
        }}
        transition={{ duration: 1, delay: isOpened ? 0.5 : 0 }}
        className={`absolute inset-0 flex flex-col items-center justify-center z-30 ${!isOpened ? 'pointer-events-none' : ''}`}
      >
        <h1 className="text-7xl md:text-9xl font-black mb-8 drop-shadow-2xl">
          Happy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-wrapped-pink via-wrapped-purple to-wrapped-blue animate-gradient-x">
            Birthday!
          </span>
        </h1>

        <div className="flex justify-center items-center gap-4 text-xl md:text-2xl font-bold text-white/80 mb-12">
          <Gift className="text-wrapped-pink" />
          <span>To the best human I know</span>
          <Heart className="text-wrapped-pink fill-wrapped-pink" />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20 transition-colors text-lg uppercase tracking-widest font-bold shadow-2xl hover:scale-105"
        >
          Replay the Magic ✨
        </button>
      </motion.div>
    </div>
  );
};

export default EndingScreen;
