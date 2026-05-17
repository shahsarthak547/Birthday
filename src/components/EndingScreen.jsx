import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const EndingScreen = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Single, safe confetti burst that won't crash mobile browsers
    confetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
      colors: ['#1DB954', '#ff00d4', '#00f2ff'],
      startVelocity: 45,
    });
    
    // A secondary burst for extra flair
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#ffffff', '#ff00d4'],
      });
    }, 400);
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
          className="text-4xl md:text-5xl font-black mb-12 text-white drop-shadow-xl"
        >
          One Last Thing...
        </motion.h2>

        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -5, 5, -5, 5, 0],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={handleOpenGift}
          className="relative cursor-pointer group"
        >
          <div className="absolute inset-0 bg-wrapped-pink opacity-40 blur-[80px] rounded-full group-hover:opacity-70 transition-opacity duration-500" />
          <Gift 
            size={180} 
            className="text-white drop-shadow-[0_0_30px_rgba(255,0,212,0.8)] relative z-10 transition-transform duration-300 group-hover:scale-110" 
            strokeWidth={1}
          />
        </motion.div>
        
        <p className="text-white/60 mt-12 animate-pulse text-lg tracking-widest uppercase font-bold">Tap to open</p>
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
        <h1 className="text-6xl md:text-9xl font-black mb-8 drop-shadow-2xl leading-tight">
          Happy <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-wrapped-pink via-wrapped-purple to-wrapped-blue animate-gradient-x">
            Birthday!
          </span>
        </h1>

        <div className="flex justify-center items-center gap-3 md:gap-4 text-lg md:text-2xl font-bold text-white/80 mb-12">
          <Gift className="text-wrapped-pink w-6 h-6 md:w-8 md:h-8" />
          <span>To the best human I know</span>
          <Heart className="text-wrapped-pink fill-wrapped-pink w-6 h-6 md:w-8 md:h-8" />
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 rounded-full hover:bg-white/20 transition-colors text-sm md:text-lg uppercase tracking-widest font-bold shadow-2xl hover:scale-105"
        >
          Replay the Magic ✨
        </button>
      </motion.div>
    </div>
  );
};

export default EndingScreen;
