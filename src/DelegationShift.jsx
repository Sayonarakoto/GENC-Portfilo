// src/components/DelegationShift.tsx
import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react'; // Import the icon

const DelegationShift = ({ isVisible }) => {
  const [isDelegated, setIsDelegated] = useState(false);

  // Toggle the delegation state every 3 seconds to show the "Transfer"
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDelegated(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <p className="absolute top-0 left-0 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        Authority_Transfer_Protocol
      </p>

      <div className="flex items-center gap-12 relative">
        {/* Original HOD Node */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`relative w-24 transition-all duration-500 ${!isDelegated ? 'opacity-100' : 'opacity-40'}`}>            <div className="text-sm font-bold text-white flex items-center justify-center gap-1">
              ORIGINAL HOD
              {!isDelegated && (
                <ShieldCheck size={14} className="text-emerald-400" />
              )}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">USR_101_O</div>
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/2 rounded-full transition-all duration-500 ${!isDelegated ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          </div>
        </div>

        {/* Transfer Path */}
        <div className="w-24 h-[2px] bg-slate-800 relative">
          <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full blur-[2px] transition-all duration-1000 ease-in-out
            ${isDelegated ? 'left-[calc(100%-12px)] opacity-100' : 'left-0 opacity-0'}`} />
        </div>

        {/* Temp HOD Node */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className={`relative w-24 transition-all duration-500 ${isDelegated ? 'opacity-100' : 'opacity-40'}`}>            <div className="text-sm font-bold text-white flex items-center justify-center gap-1">
              TEMP HOD
              {isDelegated && (
                <ShieldCheck size={14} className="text-sky-400" />
              )}
            </div>
            <div className="text-[9px] text-slate-500 uppercase tracking-widest">USR_882_T</div>
            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1/2 rounded-full transition-all duration-500 ${isDelegated ? 'bg-sky-400' : 'bg-slate-700'}`} />
          </div>
        </div>
      </div>

      {/* Logic Readout */}
      <div className="mt-8 w-full font-mono text-[9px]">
        <div className="flex justify-between">
          <span className="text-slate-500">Status:</span>
          <span className={`${isDelegated ? "text-sky-400 [text-shadow:0_0_5px_theme(colors.sky.500)]" : "text-emerald-400 [text-shadow:0_0_5px_theme(colors.emerald.500)]"} transition-colors duration-500`}>
            {isDelegated ? "DELEGATION_ACTIVE" : "AUTHORITY_REVERTED"}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-slate-500">Effective_ID:</span>
          <span className="text-slate-300 [text-shadow:0_0_5px_theme(colors.slate.500)]">{isDelegated ? "USR_882_T" : "USR_101_O"}</span>
        </div>
      </div>
    </div>
  );
};

export default DelegationShift;