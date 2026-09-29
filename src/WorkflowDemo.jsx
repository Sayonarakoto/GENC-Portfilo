import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

const getLucideIcon = (iconName) => {
  const IconComponent = LucideIcons[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
  return IconComponent || LucideIcons.HelpCircle;
};

const workflowSteps = [
  { title: "Secure Login", desc: "Email + Password → JWT Token", icon: "lock", status: "SECURED", color: "#10b981" },
  { title: "Dynamic Authority", desc: "loadUserAndAuth → EffectiveApproverId", icon: "crown", status: "SYNCED", color: "#38bdf8" },
  { title: "Pass Approval", desc: "Student Submit → Temp HOD Approves", icon: "zap", status: "ACTIVE", color: "#6366f1" },
  { title: "Live Audit & Status", desc: "Audit Trail + Pass Status Dashboard", icon: "bar-chart-2", status: "IMMUTABLE", color: "#f59e0b" }
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
    <section className="bg-white py-32 px-5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-slate-800 tracking-tighter">Execution Sequence</h2>
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
                <div className={`relative h-full bg-white border border-slate-200 transition-all duration-500 rounded-2xl p-8 shadow-md 
                    ${isActive ? 'border-slate-300 shadow-md' : ''}`}>
                  
                  <div className="flex justify-between items-start mb-8">
                    <div className={`p-3 rounded-lg border border-slate-200 transition-colors`}>
                      <IconComponent size={32} style={{ color: step.color }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Phase_0{index + 1}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold mb-2 transition-colors text-slate-700`}>
                    {step.title}
                  </h3>
                  
                  <div className="text-[10px] font-bold tracking-[0.2em] mb-4" style={{ color: step.color }}>
                    {step.status}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
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
      </div>
    </section>
  );
};

export default WorkflowDemo;