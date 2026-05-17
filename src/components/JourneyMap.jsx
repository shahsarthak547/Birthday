import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

// Import local images from media folder
import img1 from '../media/WhatsApp Image 2026-04-30 at 19.43.11.jpeg';
import img2 from '../media/WhatsApp Image 2026-04-30 at 19.43.17.jpeg';
import img3 from '../media/WhatsApp Image 2026-05-07 at 21.43.00.jpeg';
import img4 from '../media/WhatsApp Image 2026-05-07 at 21.43.05.jpeg';
import img5 from '../media/WhatsApp Image 2026-05-07 at 21.44.08.jpeg';
import img6 from '../media/f.jpeg';

const locations = [
  {
    id: 1,
    title: "From Classes to Memories 📚✨",
    note: "Some people just make every normal day feel special.",
    top: "20%", left: "15%", iconColor: "text-wrapped-green",
    images: [img2]
  },
  {
    id: 2,
    title: "Coffee, Conversations & Us ☕✨",
    note: "Just a café, random conversations, and lots of laughs ☕✨Funny how the simplest moments end up meaning the most.",
    top: "50%", left: "40%", iconColor: "text-wrapped-pink",
    images: [img4]
  },
  {
    id: 3,
    title: "Until the Call Ends ✨",
    note: "Smiles that make long calls feel short,and calls you never really want to end ✨",
    top: "30%", left: "75%", iconColor: "text-orange-500",
    images: [img1]
  },
  {
    id: 4,
    title: "A Little Ghibli Moment ✨",
    note: "Straight out of a Ghibli frame ✨ Warm lights, soft smiles, and the kind of moment you wish lasted longer.",
    top: "70%", left: "85%", iconColor: "text-wrapped-blue",
    images: [img5]
  },
  {
    id: 5,
    title: "Under the Same Sky 🌙✨",
    note: "Two close friends, two different birthday moons 🌙✨Still somehow connected under the same sky, just like us.",
    top: "70%", left: "85%", iconColor: "text-wrapped-blue",
    images: [img6]
  }
];

const JourneyMap = () => {
  const [activeLoc, setActiveLoc] = useState(null);
  const [hoveredLoc, setHoveredLoc] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedMemory = locations.find(m => m.id === activeLoc);

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedMemory) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedMemory.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedMemory) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedMemory.images.length) % selectedMemory.images.length);
    }
  };

  const handleOpenMemory = (id) => {
    setActiveLoc(id);
    setCurrentImageIndex(0);
  };

  // 3D Tilt Effect
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width - 0.5) * 20; // max rotation 20deg
    const yPct = (y / rect.height - 0.5) * -20;
    el.style.transform = `perspective(1000px) rotateX(${yPct}deg) rotateY(${xPct}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative z-10 perspective-[2000px]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-2">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Journey</span></h1>
        <p className="text-white/60 animate-pulse font-medium text-lg tracking-wide uppercase">Explore the coordinates</p>
      </motion.div>

      <motion.div
        className="relative w-full max-w-5xl h-[50vh] md:h-[65vh] bg-black/40 backdrop-blur-xl rounded-[30px] md:rounded-[40px] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)] p-4 overflow-visible transition-transform duration-200 ease-out preserve-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated High-Tech Grid Background */}
        <div className="absolute inset-0 rounded-[30px] md:rounded-[40px] opacity-20 pointer-events-none overflow-hidden">
          <div className="w-[200%] h-[200%] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] animate-[slide_20s_linear_infinite] -top-1/2 -left-1/2 absolute" />
        </div>

        {/* SVG Path drawing */}
        <svg className="absolute inset-0 w-full h-full rounded-[30px] md:rounded-[40px] pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f2ff" />
              <stop offset="50%" stopColor="#ff00d4" />
              <stop offset="100%" stopColor="#1DB954" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Base faint dashed line */}
          <motion.path
            d="M 15 20 C 25 60, 30 10, 40 50 S 60 80, 75 30 Q 80 10, 85 70"
            fill="transparent"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="0.5"
            strokeDasharray="1 2"
          />
          {/* Glowing animated trail */}
          <motion.path
            d="M 15 20 C 25 60, 30 10, 40 50 S 60 80, 75 30 Q 80 10, 85 70"
            fill="transparent"
            stroke="url(#neonGradient)"
            strokeWidth="0.8"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </svg>

        {/* Location Pins */}
        {locations.map((loc, index) => (
          <motion.div
            key={loc.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + index * 0.8, type: "spring", damping: 12 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group translate-z-10"
            style={{ top: loc.top, left: loc.left }}
            onClick={() => handleOpenMemory(loc.id)}
            onMouseEnter={() => setHoveredLoc(loc.id)}
            onMouseLeave={() => setHoveredLoc(null)}
          >
            {/* Radar Pulse Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`absolute w-10 h-10 md:w-16 md:h-16 rounded-full border-2 border-white/40 animate-ping opacity-75`} />
              <div className={`absolute w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 animate-ping [animation-delay:0.5s] opacity-50`} />
            </div>

            <div className="relative transform transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-2">
              <div className={`absolute inset-0 ${loc.iconColor.replace('text-', 'bg-')} opacity-60 blur-lg rounded-full animate-pulse`} />
              <MapPin className={`w-8 h-8 md:w-12 md:h-12 ${loc.iconColor} drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] relative z-20`} fill="white" strokeWidth={1.5} />
            </div>

            {/* Fancy Hover Tooltip (Hidden on mobile) */}
            <AnimatePresence>
              {hoveredLoc === loc.id && !activeLoc && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  className="hidden md:block absolute bottom-16 left-1/2 -translate-x-1/2 w-48 bg-black rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.9)] border border-white/20 pointer-events-none z-50"
                >
                  <div className="relative w-full h-56 flex items-center justify-center bg-gray-900 overflow-hidden">
                    {/* Blurred Background to fill empty space */}
                    <img src={loc.images[0]} alt="" className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-125" />
                    
                    {/* Actual Image without cropping */}
                    <img src={loc.images[0]} alt="Preview" className="relative w-full h-full object-contain z-10 drop-shadow-2xl" />
                    
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/95 via-black/20 to-transparent flex flex-col justify-end p-4">
                      {loc.date && <div className={`text-[10px] font-black ${loc.iconColor} uppercase tracking-widest mb-1 drop-shadow-md`}>{loc.date}</div>}
                      <div className="text-sm text-white font-bold leading-tight drop-shadow-lg">{loc.title}</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Small label below pin (hidden on hover) */}
            <div className="absolute top-10 md:top-14 left-1/2 -translate-x-1/2 text-center w-max opacity-100 group-hover:opacity-0 transition-opacity">
              <span className="text-white/90 font-bold text-[8px] md:text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/10">{loc.title}</span>
            </div>
          </motion.div>
        ))}

        {/* Animated traveler icon */}
        <motion.div
          className="absolute z-10 pointer-events-none drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
          initial={{ top: "20%", left: "15%", opacity: 0 }}
          animate={{
            top: ["20%", "50%", "30%", "70%"],
            left: ["15%", "40%", "75%", "85%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{ duration: 4, ease: "easeInOut", times: [0, 0.33, 0.66, 1] }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 mt-[-15px] ml-[-15px] bg-white rounded-full p-2 animate-bounce">
            <Navigation size={24} className="text-black rotate-[135deg]" fill="currentColor" />
          </div>
        </motion.div>
      </motion.div>

      {/* Full Screen Photo Gallery Modal */}
      <AnimatePresence>
        {activeLoc && selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLoc(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row border border-white/20"
            >
              {/* Image Section */}
              <div className="relative w-full md:w-2/3 h-[40vh] md:h-[80vh] bg-black flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={selectedMemory.images[currentImageIndex]}
                    alt="Memory"
                    className="max-w-full max-h-full object-contain"
                  />
                </AnimatePresence>

                {/* Navigation Arrows for multiple images */}
                {selectedMemory.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 border border-white/20"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all hover:scale-110 border border-white/20"
                    >
                      →
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedMemory.images.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/40'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Note Section */}
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center relative bg-gradient-to-br from-gray-900 to-black">
                <button
                  onClick={() => setActiveLoc(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  ✕
                </button>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={`text-sm ${selectedMemory.iconColor} font-bold tracking-widest uppercase mb-4`}
                >
                  {selectedMemory.date}
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-black mb-6 text-white drop-shadow-lg"
                >
                  {selectedMemory.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-12 h-1 bg-wrapped-pink mb-6 rounded-full"
                />
                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-white/80 leading-relaxed font-light"
                >
                  "{selectedMemory.note}"
                </motion.p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JourneyMap;
