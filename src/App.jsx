import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

// Slide Components
import CoverPage from './components/CoverPage';
import FunStats from './components/FunStats';
import JourneyMap from './components/JourneyMap';
import FinalMessage from './components/FinalMessage';
import EndingScreen from './components/EndingScreen';
import Background3D from './components/Background3D';
import bgMusic from './media/Friends_BTS_Jimin_V_Instrumental_Ver.mp3';

const slides = [
  { id: 'cover', component: CoverPage, duration: 0 }, // 0 means it waits for user click
  { id: 'map', component: JourneyMap, duration: 30 }, // 30 seconds
  { id: 'stats', component: FunStats, duration: 10 }, // 10 seconds
  { id: 'message', component: FinalMessage, duration: 90 }, // 90 seconds (long message)
  { id: 'ending', component: EndingScreen, duration: 0 }, // Stops at the gift box
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const nextSlide = () => {
    // Autoplay music when starting from the cover page
    if (currentSlide === 0 && !isPlaying && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio autoplay blocked or failed:", err));
    }

    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
      setProgress(0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      setProgress(0);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Synchronized Progress and Auto-advance Timer
  useEffect(() => {
    let interval;
    if (isPlaying && slides[currentSlide].duration > 0) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextSlide();
            return 100;
          }
          // Calculate percentage increase per 100ms
          return prev + (100 / (slides[currentSlide].duration * 10));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  // Reset progress when moving manually
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const ActiveSlide = slides[currentSlide].component;

  return (
    <div className="relative h-screen w-full bg-wrapped-black overflow-hidden font-outfit text-white">
      {/* Dynamic Background */}
      <div className="wrapped-gradient-bg" />
      <Background3D currentSlide={currentSlide} />

      {/* Progress Bars */}
      <div className="fixed top-4 left-4 right-4 flex gap-2 z-50">
        {slides.map((slide, idx) => (
          slide.duration > 0 && (
            <div
              key={idx}
              className={`h-1 flex-1 bg-white/20 rounded-full overflow-hidden ${idx > currentSlide && slides[currentSlide].duration === 0 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: idx < currentSlide ? '100%' : idx === currentSlide ? `${progress}%` : '0%'
                }}
              />
            </div>
          )
        ))}
      </div>

      {/* Slide Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 h-full w-full flex items-center justify-center p-6"
        >
          <ActiveSlide onNext={nextSlide} />
        </motion.div>
      </AnimatePresence>

      {/* Controls Overlay */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center gap-6 z-50">
        {currentSlide > 0 && (
          <button onClick={prevSlide} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Rewind size={24} />
          </button>
        )}

        <button
          onClick={toggleMusic}
          className="p-4 bg-wrapped-green text-black rounded-full hover:scale-110 transition-transform shadow-xl shadow-wrapped-green/40"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        {currentSlide < slides.length - 1 && (
          <button onClick={nextSlide} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <FastForward size={24} />
          </button>
        )}
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={bgMusic}
        loop
      />

    </div>
  );
}

export default App;
