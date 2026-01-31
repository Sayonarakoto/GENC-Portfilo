// src/components/DFDVisualization.tsx
import React from 'react';

const DFDVisualization = ({ isVisible }) => {
  const steps = [
    { 
      id: '1.1', 
      title: 'AUTH_CHAIN', 
      desc: 'JWT Verify & loadUserAndAuth', 
      color: 'border-sky-400',
      status: 'VERIFIED'
    },
    { 
      id: '1.2', 
      title: 'AUTHORITY_CHECK', 
      desc: 'isEffectiveApprover (Delegation Check)', 
      color: 'border-emerald-400',
      status: 'DYNAMIC'
    },
    { 
      id: '1.3', 
      title: 'AUDIT_LEDGER', 
      desc: 'Immutable History Sync', 
      color: 'border-indigo-400',
      status: 'LOGGED'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-around items-center p-4 font-mono relative">
      {/* Background Flow Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[1px] bg-slate-800 z-0">
        <div className={`w-full bg-emerald-500 transition-all duration-[2000ms] ${isVisible ? 'h-full' : 'h-0'}`} />
      </div>

      {steps.map((step, index) => (
        <div key={step.id} 
          className={`relative z-10 w-full transition-all duration-700 
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
          style={{ transitionDelay: `${index * 400}ms` }}>
          
          <div className={`bg-slate-900/90 border border-slate-700 p-4 rounded-lg shadow-2xl backdrop-blur-md`}>
            {/* Phase Header */}
            <div className="flex justify-between items-center mb-2">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${step.color} bg-slate-950`}>
                PHASE_{step.id}
              </span>
              <span className="text-[8px] text-slate-500 animate-pulse">{step.status}</span>
            </div>

            {/* Content */}
            <h4 className="text-xs text-white font-bold tracking-widest uppercase">{step.title}</h4>
            <p className="text-[10px] text-slate-400 mt-1 leading-tight">{step.desc}</p>
            
            {/* Visual Indicator (The "Node") */}
            <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-950 border-2 ${step.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DFDVisualization;