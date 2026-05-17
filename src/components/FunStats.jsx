import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, Laugh, Volume2 } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, color, delay }) => (
  <motion.div
    initial={{ y: 50, scale: 0.8, opacity: 0 }}
    animate={{ y: 0, scale: 1, opacity: 1 }}
    transition={{ delay, type: "spring", damping: 12, stiffness: 100 }}
    whileHover={{ y: -10, rotate: [-1, 1, 0], scale: 1.05 }}
    className={`relative overflow-hidden glass-card !p-3 md:!p-6 flex flex-col items-center justify-center text-center group border-2 border-transparent hover:border-white/20 transition-all duration-300`}
  >
    {/* Animated background glow */}
    <div className={`absolute -inset-10 ${color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500 rounded-full pointer-events-none`} />

    <div className={`p-3 md:p-6 rounded-[20px] md:rounded-3xl ${color} mb-2 md:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
      <Icon className="w-7 h-7 md:w-10 md:h-10 text-white drop-shadow-md" />
    </div>

    <h3 className="text-white/50 text-[9px] md:text-xs font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mb-1 md:mb-3">{title}</h3>
    <p className="text-sm md:text-xl lg:text-2xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)] leading-tight">
      {value}
    </p>
  </motion.div>
);

const FunStats = () => {
  const stats = [
    { icon: MessageSquare, title: "Top Catchphrase", value: 'Lambu Tang😒😭😂', color: "bg-wrapped-blue", delay: 0.2 },
    { icon: Zap, title: "Most Chaotic Moment", value: "Me Speaking in Gujarati, And U In Marathi😂😂", color: "bg-wrapped-pink", delay: 0.4 },
    { icon: Laugh, title: "Laughter Score", value: "9,999+ Decibels", color: "bg-wrapped-green", delay: 0.6 },
    { icon: Volume2, title: "Your Most Used Dialogue", value: 'BOT MAARUNGI MAI😂', color: "bg-wrapped-purple", delay: 0.8 },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-6xl mx-auto px-4 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-16"
      >
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-wrapped-green font-bold tracking-[0.3em] uppercase text-sm mb-4"
        >
          The Math Is Mathing
        </motion.p>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black drop-shadow-xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-wrapped-green via-wrapped-blue to-wrapped-pink animate-gradient-x">Stats</span> Don't Lie
        </h1>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-5xl mx-auto w-full">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default FunStats;
