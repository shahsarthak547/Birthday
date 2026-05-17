import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const FinalMessage = () => {
  const message = "Kabhi socha nai tha ki itni pyaari si, adorable, kind-hearted, caring, understanding dost naseeb hogi mujhe jiss tarah se life kat rahi thi 2023 mai 😭..just a normal Convo amidst a physics class jo chalu hua tha still continues....legit u were the person who made me believe again that genuine female friendship do exist in this cruel world...woh calls,midnight conversations, voice notes etc etc kaun hi bhool sakta tha...unpaid therapy tha wah..like imagine having a bad day n just hearing all that again n again..just so beautiful ❤️....achchi jaa rahi thi yeh journey ekdam lekin saat saat mai disappointments maine bot saare create kiye the tere liye...ahhh I'M SORRY FOR THAT😭...but still u stayed never left😭...and last July just ek argument ke wajah se I almost left u physically but mentally u always stayed within me 😭 coz this wasn't normal...it was special...july-december mai kya kya hua tha i only know so many bad incidents😭...but still u showed up in December n udr bhi not being nice to u was a bad option...which late toh sahi but REALIZE BOT ACHCHE SE HUA FEB MAI...and I'm grateful ki I got u backkkkk!!! I'll always be grateful of this...n what u hold in this life...best person ever met who supports a lot cares a lot..kinko hi aise dost miltay...And A BIG BIG HAPPY BIRTHDAY TO U....SWARA...HAPPY 20...GOOD BLESS U...ALL OF UR DREAMS COME TRUE...MAY HAPPINESS SERVE U FIRST EVERYWHERE AND EVERYTIME...I MAY HAVE FAILED GIVING U AT TIMES BUT THIS TIME I PROMISE WONT LET U DOWN!!!🥹~SARTHAK";
  const [displayText, setDisplayText] = useState('');

    useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(message.slice(0, i));
      i++;
      if (i > message.length) clearInterval(interval);
    }, 30); // Faster typing to accommodate long text
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-4xl mx-auto px-4 text-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="glass-card !p-8 md:!p-12 relative overflow-hidden group shadow-[0_0_50px_rgba(255,0,212,0.1)] hover:shadow-[0_0_80px_rgba(255,0,212,0.2)] transition-shadow duration-700 border border-white/20"
      >
        {/* Cinematic animated gradients */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-wrapped-pink/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-wrapped-blue/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 group-hover:scale-150 transition-transform duration-1000 pointer-events-none" />

        <Quote size={80} className="absolute top-4 left-4 text-white/5 -rotate-12 pointer-events-none" />
        <Quote size={80} className="absolute bottom-4 right-4 text-white/5 rotate-12 pointer-events-none" />

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-wrapped-pink text-sm md:text-base font-bold mb-8 uppercase tracking-[0.4em]"
        >
          A Final Note ❤️
        </motion.h2>

        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-[1.6] min-h-[300px] text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
            {displayText}<span className="animate-pulse text-wrapped-green drop-shadow-[0_0_10px_rgba(30,215,96,0.8)]">|</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FinalMessage;
