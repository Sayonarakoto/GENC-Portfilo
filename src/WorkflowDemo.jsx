import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const getLucideIcon = (iconName) => {
  const IconComponent = LucideIcons[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
  return IconComponent || LucideIcons.HelpCircle;
};

// REFINED COLOR PALETTE: Muted tech tones
const workflowSteps = [
  { title: "1. Secure Login", desc: "Email + Password → JWT Token", icon: "lock", status: "SECURED", color: "#10b981" }, // Emerald
  { title: "2. Dynamic Authority", desc: "loadUserAndAuth → EffectiveApproverId", icon: "crown", status: "SYNCED", color: "#38bdf8" }, // Sky
  { title: "3. Pass Approval", desc: "Student Submit → Temp HOD Approves", icon: "zap", status: "ACTIVE", color: "#6366f1" }, // Indigo
  { title: "4. Live Audit & Status", desc: "Audit Trail + Pass Status Dashboard", icon: "bar-chart-2", status: "IMMUTABLE", color: "#f59e0b" } // Amber
];

const WorkflowDemo = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % workflowSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-slate-950 py-32 px-5 relative overflow-hidden font-mono">
      {/* Editorial Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="relative z-20 max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <Motion.span className="text-emerald-500 text-xs tracking-[0.5em] font-bold block mb-4 uppercase">System_Architecture</Motion.span>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Execution <span className="text-slate-700">Sequence</span></h2>
        </div>

        <div className="flex gap-6 justify-center flex-wrap">
          {workflowSteps.map((step, index) => {
            const isActive = activeStep === index;
            const IconComponent = getLucideIcon(step.icon);

            return (
              <Motion.div
                key={index}
                animate={{
                  scale: isActive ? 1.02 : 0.98,
                  opacity: isActive ? 1 : 0.5,
                }}
                className="flex-1 min-w-[280px] group"
              >
                <div className={`relative h-full bg-slate-900/40 backdrop-blur-xl border transition-all duration-500 rounded-2xl p-8 
                    ${isActive ? 'border-slate-500 shadow-[0_0_40px_rgba(0,0,0,0.5)]' : 'border-slate-800'}`}>
                  
                  {/* Subtle Top Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]" 
                       style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />

                  {/* Icon & Index */}
                  <div className="flex justify-between items-start mb-12">
                    <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 transition-colors ${isActive ? 'text-white' : 'text-slate-600'}`}>
                        <IconComponent size={32} style={{ color: isActive ? step.color : 'inherit' }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Phase_0{index + 1}</span>
                  </div>

                  {/* Title & Status */}
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    {step.title}
                  </h3>
                  
                  <div className="text-[10px] font-bold tracking-[0.2em] mb-6" style={{ color: step.color }}>
                    {step.status}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-8">
                    {step.desc}
                  </p>

                  {/* Progress Indicator */}
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <Motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? '100%' : '0%' }}
                        transition={{ duration: 4, ease: "linear" }}
                        className="h-full" 
                        style={{ backgroundColor: step.color }} 
                    />
                  </div>
                </div>
              </Motion.div>
            );
          })}
        </div>

        {/* Footer Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-20">
          {["JWT_PROTOCOL", "AUTHORITY_LOGIC", "AUDIT_COMPLIANCE", "CRON_REVERSION"].map((tag, i) => (
            <span key={i} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded text-[10px] font-bold text-slate-500 tracking-widest">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowDemo;
