import React from 'react';
import { motion } from 'framer-motion';

const CoverPage = ({ onNext }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center">
      {/* Content Overlay */}
      <div className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-none">

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="mb-4"
        >
          <p className="text-wrapped-pink uppercase tracking-[0.5em] font-bold text-sm md:text-base drop-shadow-lg">Friendship Wrapped</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-wrapped-green via-white to-wrapped-blue drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            A Journey to Remember
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="glass-card !p-8 md:!p-10 mb-12 max-w-2xl pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/20 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-wrapped-pink/10 to-wrapped-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[40px] pointer-events-none" />
          <p className="text-xl md:text-2xl text-white/90 font-light leading-[1.8] relative z-10">
            Every friendship has its own little story.
            Ours just happens to be full of chaos, nonstop laughter, and memories we’ll carry forever. ✨
            So, let’s begin 💛
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(29, 185, 84, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={onNext}
          className="pointer-events-auto px-12 py-5 bg-gradient-to-r from-wrapped-green to-green-400 text-black font-black uppercase tracking-widest rounded-full text-lg md:text-xl shadow-[0_0_20px_rgba(29,185,84,0.5)] transition-all duration-300 flex items-center gap-3 relative overflow-hidden group border-none"
        >
          <span className="relative z-10">Begin the Journey</span>
          <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
        </motion.button>
      </div>
    </div>
  );
};

export default CoverPage;
