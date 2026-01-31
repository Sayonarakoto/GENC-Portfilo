import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const deviceVariants = {
  laptop: {
    width: "900px",
    height: "520px",
    borderRadius: "24px",
    borderWidth: "12px",
  },
  phone: {
    width: "320px",
    height: "620px",
    borderRadius: "36px",
    borderWidth: "10px",
  },
};

const MiniCard = ({ title }) => (
  <div className="bg-white/10 rounded-lg p-3 text-xs text-center">
    {title}
  </div>
);

function PreviewContent({ mode }) {
  const isPhone = mode === "phone";

  return (
    <div
      className={`w-full h-full flex gap-6 text-gray-100 font-['Inter',_sans-serif] overflow-auto ${isPhone ? "p-6 flex-col" : "p-8 flex-row"}`}
    >
      {/* Left: hero text */}
      <div
        className={`flex-shrink-0 ${isPhone ? "text-center" : "text-left pt-5 basis-1/2"}`}
      >
        <motion.div
          key={mode + 'title'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`font-bold mb-2 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent ${isPhone ? "text-[clamp(1.5rem,6vw,1.8rem)]" : "text-[clamp(1.8rem,2.5vw,2.2rem)]"}`}
        >
          GENC – A Responsive UI
        </motion.div>
        <motion.div
          key={mode + 'desc'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={`opacity-80 ${isPhone ? "text-sm max-w-[250px] mx-auto" : "text-base max-w-[350px] mx-0"}`}
        >
          Workflows, animations, and components adapt seamlessly to any screen size.
        </motion.div>
      </div>

      {/* Right: mini glass card showing your workflow cards stacked / side by side */}
      <motion.div
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`flex-1 grid gap-3 content-start ${isPhone ? "grid-cols-1" : "grid-cols-2"}`}
      >
        <MiniCard title="Latecomer Flow" />
        <MiniCard title="Gate Pass Flow" />
        <MiniCard title="Special Pass" />
        <MiniCard title="Audit Trail" />
      </motion.div>
    </div>
  );
}


export default function ResponsiveShowcase() {
  const [mode, setMode] = useState("laptop");

  useEffect(() => {
    const t = setInterval(() => {
      setMode(prev => (prev === "laptop" ? "phone" : "laptop"));
    }, 5000); // 5s laptop → 5s phone
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_#05070b,_#020308)] p-4 overflow-hidden"
    >
        <h2 className="text-gray-100 font-['Inter',_sans-serif] mb-10 [text-shadow:0_0_20px_rgba(0,212,255,0.5)] text-3xl">
            Designed for Every Device
        </h2>
      <motion.div
        variants={deviceVariants}
        animate={mode}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="relative overflow-hidden bg-slate-800 shadow-[0_30px_80px_rgba(0,0,0,0.9),_0_0_40px_rgba(0,212,255,0.3)] border border-[rgba(0,212,255,0.4)]"
      >
        {/* Animated Label */}
        <AnimatePresence>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute top-3 left-0 right-0 text-center text-xs text-white/40 font-mono"
            >
              {mode.toUpperCase()}
            </motion.div>
        </AnimatePresence>

        {/* Fake camera notch for phone */}
        <motion.div
            animate={{ opacity: mode === 'phone' ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-lg z-10"
        />

        <div
          className="w-full h-full origin-top-left"
        >
          <PreviewContent mode={mode} />
        </div>
      </motion.div>
    </section>
  );
}
