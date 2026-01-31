import React from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const gateLines = [
  "Student opens Gate Pass from the dashboard.",
  "Fills reason, destination and return time, then submits.",
  "System routes the pass to EffectiveApproverId → status: Pending HOD.",
  "Approver opens Pending Gate Passes (guard: isEffectiveApprover).",
  "Approver reviews details and clicks Approve or Decline.",
  "Status updates and student sees Approved / Declined instantly."
];

function GatePassCard({ step }) {
  return (
    <Motion.div
      animate={{
        scale: step === 1 || step === 4 ? 1.05 : 1,
        boxShadow: step >= 2 && step <= 4
          ? "0 0 40px rgba(0,255,136,0.7)"
          : "0 20px 40px rgba(0,0,0,0.7)"
      }}
      transition={{ duration: 0.4 }}
      className="flex-1 basis-[320px] max-w-[380px] bg-[rgba(15,15,25,0.9)] rounded-3xl border border-[rgba(0,255,136,0.35)] p-6 backdrop-blur-xl text-gray-100"
    >
      <div className="text-sm opacity-80 mb-4">
        {step <= 2 ? "Student – Gate Pass Form" : "Approver – Pending Gate Passes"}
      </div>

      {/* Step-specific content */}
      {step === 0 && (
        // Dashboard with Gate Pass quick action glowing
        <div className="p-5 text-center border border-dashed border-[rgba(0,255,136,0.5)] rounded-xl">
          <Motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-4 rounded-lg text-gray-900 font-bold text-lg shadow-[0_0_20px_rgba(0,255,136,0.7)]"
          >
            Gate Pass Request
          </Motion.div>
          <p className="mt-2.5 text-sm opacity-70">Click to open form</p>
        </div>
      )}

      {step === 1 && (
        // Form fields: Reason, Destination, Return Time + pulsing Submit
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Reason (e.g., Doctor's appt)"
            className="p-2.5 rounded-md border border-[rgba(0,255,136,0.4)] bg-[rgba(25,25,40,0.7)] text-gray-100"
          />
          <input
            type="text"
            placeholder="Destination (e.g., City Hospital)"
            className="p-2.5 rounded-md border border-[rgba(0,255,136,0.4)] bg-[rgba(25,25,40,0.7)] text-gray-100"
          />
          <input
            type="text"
            placeholder="Return Time (e.g., 2:00 PM)"
            className="p-2.5 rounded-md border border-[rgba(0,255,136,0.4)] bg-[rgba(25,25,40,0.7)] text-gray-100"
          />
          <Motion.button
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 py-3 px-5 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-gray-900 font-bold border-none cursor-pointer shadow-[0_0_15px_rgba(0,255,136,0.5)]"
          >
            Submit Request
          </Motion.button>
        </div>
      )}

      {step === 2 && (
        // Small line: "Assigned to EffectiveApproverId • Status: Pending HOD"
        <div className="text-center p-7 bg-[rgba(0,255,136,0.1)] rounded-xl border border-[rgba(0,255,136,0.4)]">
          <p className="text-lg text-green-400">Assigned to HOD Admin</p>
          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-2xl font-bold text-green-400 mt-2.5"
          >
            Status: Pending HOD
          </Motion.p>
        </div>
      )}

      {step === 3 && (
        // Approver pending list (one row highlighted)
        <div className="flex flex-col gap-2.5">
          <div className="text-sm opacity-70 mb-1">Pending Approvals (HOD)</div>
          <div className="bg-[rgba(0,255,136,0.15)] p-2.5 rounded-lg border border-[rgba(0,255,136,0.4)]">
            <p><strong>Student:</strong> Jane Doe</p>
            <p><strong>Reason:</strong> Doctor's Appointment</p>
            <p><strong>Status:</strong> Pending</p>
          </div>
          <div className="bg-[rgba(25,25,40,0.7)] p-2.5 rounded-lg opacity-60">
            <p>Student: John Smith</p>
            <p>Reason: Family Emergency</p>
            <p>Status: Pending</p>
          </div>
        </div>
      )}

      {step === 4 && (
        // Approve button pulsing
        <div className="flex flex-col gap-4">
          <div className="bg-[rgba(0,255,136,0.15)] p-2.5 rounded-lg border border-[rgba(0,255,136,0.4)]">
            <p><strong>Student:</strong> Jane Doe</p>
            <p><strong>Reason:</strong> Doctor's Appointment</p>
            <p><strong>Status:</strong> Pending</p>
          </div>
          <Motion.button
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="py-3 px-5 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-gray-900 font-bold border-none cursor-pointer shadow-[0_0_15px_rgba(0,255,136,0.5)]"
          >
            Approve Gate Pass
          </Motion.button>
          <button
            className="py-3 px-5 rounded-lg bg-gradient-to-r from-red-600 to-red-800 text-gray-100 font-bold border-none cursor-pointer mt-2.5"
          >
            Decline
          </button>
        </div>
      )}

      {step === 5 && (
        // Row badge turns green/red, "Approved" / "Declined"
        <div className="flex flex-col gap-2.5">
          <div className="text-sm opacity-70 mb-1">Pending Approvals (HOD)</div>
          <div className="bg-[rgba(0,255,136,0.25)] p-2.5 rounded-lg border border-green-400">
            <p><strong>Student:</strong> Jane Doe</p>
            <p><strong>Reason:</strong> Doctor's Appointment</p>
            <Motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-green-400 font-bold mt-1"
            >
              Status: Approved
            </Motion.p>
          </div>
        </div>
      )}
    </Motion.div>
  );
}

export default function GatePassScene() {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const t = setInterval(
      () => setStep(prev => (prev + 1) % gateLines.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="min-h-[70vh] flex items-center justify-center gap-10 flex-wrap py-20 px-5">
      <div className="flex-1 basis-[320px] max-w-lg">
        <h2 className="text-green-400 mb-4 text-3xl">Gate Pass – Single-Step Approval</h2>
        <AnimatePresence mode="wait">
          <Motion.p
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-[#b0ffe0] [text-shadow:0_0_16px_rgba(0,255,136,0.8)] min-h-[4em]"
          >
            {gateLines[step]}
          </Motion.p>
        </AnimatePresence>
      </div>
      <GatePassCard step={step} />
    </section>
  );
}