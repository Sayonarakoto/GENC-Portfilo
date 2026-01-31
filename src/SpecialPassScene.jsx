import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShieldCheck, User, Users, FileText } from "lucide-react";
  import "./index.css";

// Phase 4: Update text to be more explicit
const specialLines = [
  "Student opens the 'Special Pass' form for exceptional leave.",
  "Fills in dates, reason, attaches documents, and selects a Faculty Mentor.",
  "Backend creates SpecialPass with status: 'Pending Faculty'.",
  "The request appears on the Faculty Mentor's dashboard.",
  "Mentor reviews and clicks 'Forward to HOD' for final decision.",
  "System calls getApproverForDept, setting hodId = EffectiveApproverId.",
  "The request now appears on the HOD/Temp HOD's guarded dashboard.",
  "Effective Approver (HOD) reviews details and mentor's approval.",
  "Approver makes the final decision: Approve or Decline.",
  "The final 'Approved' status is reflected on the student's pass history.",
];

// Phase 5: Overhauled multi-step UI card
const SpecialPassUI = ({ step }) => {
  const getHeader = () => {
    if (step <= 2) return "Student – Special Pass";
    if (step <= 5) return "Faculty Mentor – Special Pass";
    return "HOD / Delegatee – Special Pass (Guarded)";
  };

  const renderContent = () => {
    // Student View
    if (step <= 2) {
      return (
        <div>
          {step === 0 && <p>Side menu tile 'Special Pass' is glowing...</p>}
          {step === 1 && (
            <div>
              <p><strong>From Date:</strong> 2025-12-10</p>
              <p><strong>To Date:</strong> 2025-12-15</p>
              <p><strong>Reason:</strong> National Robotics Competition</p>
              <p><strong>Mentor:</strong> Dr. Evelyn Reed [SELECTED]</p>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="bg-green-500/20 text-green-400 p-2 rounded-md mb-4">
                Toast: Request Created → Pending Faculty
              </div>
              <p><strong>My Requests:</strong></p>
              <div className="border border-gray-500 p-2.5 rounded-md">
                <p>Robotics Competition - <span className="text-orange-400">Pending Faculty</span></p>
              </div>
            </div>
          )}
        </div>
      );
    }
    // Faculty Mentor View
    if (step <= 5) {
      return (
        <div>
          {step === 3 && <p>Pending list has one request highlighted...</p>}
          {step === 4 && (
            <div className="text-center">
              <p>Details for Alice's request are visible.</p>
              <motion.button whileHover={{ scale: 1.1 }} className="bg-green-600 text-white py-2.5 px-5 border-none rounded-md mr-2.5">Approve & Forward</motion.button>
              <motion.button whileHover={{ scale: 1.1 }} className="bg-red-600 text-white py-2.5 px-5 border-none rounded-md">Decline</motion.button>
            </div>
          )}
          {(step === 5) && (
            <div className="text-center text-green-400">
              <Users size={48} className="mx-auto" />
              <p>Forwarding to EffectiveApproverId...</p>
            </div>
          )}
        </div>
      );
    }
    // Effective Approver (HOD) View
    return (
      <div>
        {step === 6 && (
          <div className="text-cyan-400 text-center">
            <ShieldCheck size={32} className="mx-auto" />
            <p>Guard Passed: isEffectiveApprover</p>
            <p>Displaying pending list...</p>
          </div>
        )}
        {step === 7 && <p>Viewing details, including mentor's approval notes...</p>}
        {step === 8 && (
            <div className="text-center">
                <p>Making final decision...</p>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Check size={64} color="lightgreen" className="mx-auto" />
                </motion.div>
            </div>
        )}
        {step === 9 && (
          <div className="text-center">
            <p>Status pill flips to:</p>
            <motion.span
              key="approved"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-300 text-black py-1 px-4 rounded-full inline-block"
            >
              Approved
            </motion.span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-white font-['Inter',_sans-serif] min-h-[350px] flex flex-col">
      <h4 className="text-yellow-300 border-b border-yellow-300/50 pb-2.5 mb-5">
        {getHeader()}
      </h4>
      {renderContent()}
    </div>
  );
};


export default function SpecialPassScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setStep((prev) => (prev + 1) % specialLines.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 bg-[radial-gradient(ellipse_at_50%_100%,_#2a003a,_#05050f)]">
      {/* Phase 1 & 6: Combined Intro Text */}
      <div className="py-0 px-5 pb-16 max-w-4xl mx-auto text-center">
        <h2 className="text-yellow-300 mb-3 [text-shadow:0_0_16px_rgba(255,221,136,0.9)] text-4xl">
          Special Pass – Multi‑Step Approval
        </h2>
        <p className="max-w-3xl text-yellow-200/70 mx-auto mb-4">
          Used for multi‑day or exceptional leave requests like competitions, major
          family events or extended medical leave. Requests first go to the student’s
          Faculty Mentor, then to the current Effective Approver (HOD or delegated Temp HOD)
          using the same dynamic delegation system.
        </p>
        {/* Phase 6 Intro */}
        <p className="max-w-3xl text-yellow-200/70 mt-2 mx-auto italic opacity-80">
          In many colleges, exceptional leave is treated with extra care, similar to how senior figures supervise important permissions. Special Pass models this by first asking the student’s direct Faculty Mentor, then routing the final decision to whoever currently holds HOD authority through the dynamic delegation system. That authority can be the Original HOD or a delegated Temp HOD, but the chain and audit are always clear.
        </p>
      </div>

      <div className="flex gap-10 items-center max-w-6xl mx-auto">
        {/* Phase 4: Left Neon Text */}
        <div className="flex-1 basis-[400px] max-w-lg p-5">
            <h3 className="text-yellow-300 mb-3 [text-shadow:0_0_16px_rgba(255,221,136,0.9)] text-2xl">
                Special Pass – Mentor + HOD Chain
            </h3>
            <AnimatePresence mode="wait">
                <motion.p
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-lg text-yellow-200/80 [text-shadow:0_0_14px_rgba(255,200,150,0.8)] min-h-[6em] font-mono"
                >
                {specialLines[step]}
                </motion.p>
            </AnimatePresence>
        </div>

        {/* Right Pane */}
        <div className="flex-1 basis-[450px] p-5">
          <SpecialPassUI step={step} />
        </div>
      </div>
    </section>
  );
}
