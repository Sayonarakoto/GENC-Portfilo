// HeroAnimation.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DelegationShift from './DelegationShift';

export default function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    // By including the class name `bg-slate-950` in this comment, we ensure
    // Tailwind's JIT compiler finds it and generates the corresponding CSS,
    // making it available for @apply in index.css.
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center relative overflow-hidden">      {/* === THE COMPLETE HYBRID BACKGROUND === */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
  
        {/* 1. React Bits: The Foundation (Subtle Grid & Radial Fade) */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: `radial-gradient(#475569 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* 2. Anime Editorial: The "Scanline" Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.015),rgba(0,0,255,0.02))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-25" />
      
        {/* 3. Tactical Framing (Editorial Borders) */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sky-500/10 to-transparent opacity-50" />
      
        {/* 4. Crosshair Corners (Anime Tactical Aesthetic) */}
        <motion.div
          className="absolute top-10 left-10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: isVisible ? '5rem' : 0, height: isVisible ? '5rem' : 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="w-full h-full border-t-2 border-l-2 border-emerald-500/20" />
        </motion.div>
        <motion.div
          className="absolute top-10 right-10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: isVisible ? '5rem' : 0, height: isVisible ? '5rem' : 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
        >
          <div className="w-full h-full border-t-2 border-r-2 border-slate-700/30" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: isVisible ? '5rem' : 0, height: isVisible ? '5rem' : 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
        >
          <div className="w-full h-full border-b-2 border-l-2 border-slate-700/30" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10"
          initial={{ width: 0, height: 0 }}
          animate={{ width: isVisible ? '5rem' : 0, height: isVisible ? '5rem' : 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: 'easeOut' }}
        >
          <div className="w-full h-full border-b-2 border-r-2 border-sky-500/20" />
        </motion.div>
      
        {/* 5. Floating Phase Markers (DFD Phase 1.1, 1.2, 1.3 Reference) */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-32">
          {['GATE_ACCESS_LOG', 'ADMIN_AUTH_SEQ', 'DB_AUDIT_SYNC'].map((phase) => (
            <div key={phase} className="flex items-center gap-4 group">
              <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping group-hover:scale-125 transition-transform duration-200" />
              <span className="text-[10px] font-mono text-emerald-500/40 group-hover:text-emerald-400 transition-colors duration-200">
                {phase}
              </span>
            </div>            
          ))}
        </div>
      
        {/* 6. Dynamic Glow (React Bits: Interactive focus) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] transition-opacity duration-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      </div>      

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 flex flex-col lg:flex-row items-center justify-between w-full">
        {/* LEFT SIDE: Text and CTAs (THE ILLUMINATED CONSOLE) */}
        <div className={`max-w-xl lg:max-w-2xl transform transition-all duration-1000 ease-out [transition-delay:100ms]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
        }>
          {/* STATS HEADER: Simple, clean separation */}
          <p className={`text-xs uppercase tracking-[0.3em] text-emerald-400 mb-8`}>
            GEN-C // CAMPUS MANAGEMENT ACCESS
          </p>

          {/* Headline - Now with "System Boot" Animation */}
          <div className="text-4xl md:text-6xl font-black leading-tight mb-8">
            <h1 className={`block mb-4 transition-all duration-[1500ms] ease-out 
    ${isVisible
      ? 'opacity-100 translate-y-0 scale-100'
      : 'opacity-0 translate-y-8 scale-95'
    } 
    /* This adds a 'breathing' glow effect once it finishes sliding in */
    ${isVisible ? 'animate-pulse-slow' : ''} 
  `}>
              GEN
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-sky-400">
                  -
                </span>
                {/* This is a hidden 'glow' layer behind the hyphen */}
                <span className={`absolute inset-0 blur-lg bg-emerald-400/40 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
              </span>
              C
            </h1>

            <p className={`text-2xl md:text-3xl font-light text-slate-300 transition-all duration-1000 [transition-delay:400ms] ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
            }`}>
              The central brain <span className="text-emerald-500/50 font-mono text-lg">[v1.1_active]</span>
            </p>
          </div>
          {/* Description */}
          <p className={`max-w-xl text-slate-400 mb-8 transition-all duration-1000 [transition-delay:700ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Handle gate passes, approvals, attendance, and student workflows from a single secure
            dashboard—built for modern campuses.
          </p>
          {/* CTAs */}
          <div className={`flex flex-wrap gap-4 mb-12 transition-all duration-1000 [transition-delay:900ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* PRIMARY CTA: View GEN-C Demo (Glows & Pops) */}
            <a
              href="https://github.com/Sayonarakoto/GEN-C_LOGIN"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-2xl shadow-emerald-700/50 hover:shadow-emerald-500/75 hover:scale-[1.02] transition-all duration-300 overflow-hidden ring-2 ring-emerald-500/0 hover:ring-emerald-300/50"
            >
              <span className="relative z-10">View GEN-C Demo</span>
              {/* Subtle inner light effect on hover for premium feel */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300" />
            </a>
          </div>
          {/* Add this at the very bottom of your Left Side Console Panel */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-[2px] bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full bg-emerald-500 transition-all duration-[2000ms] ease-in-out ${isVisible ? 'w-full' : 'w-0'}`} />
            </div>
            <span className="text-[10px] font-mono text-emerald-500 animate-pulse">
              {isVisible ? "SYSTEM_READY" : "BOOTING..."}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: The Structured Data Visualizer (like a simplified flow chart) */}
        <div className={`hidden lg:block w-full max-w-lg relative 
    transform transition-all duration-[1200ms] ease-out [transition-delay:500ms] 
    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`
        }>
          {/* The DelegationShift component now sits directly on the background */}
          <DelegationShift isVisible={isVisible} />

          {/* We can add back the authority/compliance cards here, floating near the visualization */}
          <div className={`mt-10 grid grid-cols-2 gap-4 transition-all duration-1000 delay-[1200ms] 
            ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-tighter">Authority Mode</span>
              <span className="text-[11px] text-slate-200 font-bold uppercase">Dynamic Delegation</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono text-sky-500 uppercase tracking-tighter">Compliance</span>
              <span className="text-[11px] text-slate-200 font-bold uppercase">Immutable Auditing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Connecting Line */}
      <motion.div
        className="absolute z-20 top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-sky-500/0 hidden lg:block"
        initial={{ width: 0, x: '-50%' }}
        animate={{ width: isVisible ? '20%' : 0 }}
        transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
      />

      <div className="absolute bottom-4 right-8 text-[9px] font-mono text-slate-600 hidden xl:block pointer-events-none">
        <p className="text-emerald-500/50 mb-1 border-b border-slate-800 pb-1">DELEGATION_HISTORY_LOG</p>
        <p>[2025-12-17 08:30] AUTH_GRANTED -&gt; USR_882_T</p>
        <p>[2025-12-17 12:00] AUTO_REVERT_INITIATED</p>
        <p>[2025-12-17 12:00] AUTH_REVERTED -&gt; USR_101_O</p>
      </div>
    </section>
  );
}
