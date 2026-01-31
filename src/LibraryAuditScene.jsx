import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

const auditLines = [
  "Librarian or Admin opens the Audit & Library dashboard.",
  "Every Library Pass and authority change is logged immutably.",
  "Filters highlight delegations, approvals and returns per user.",
  "Clicking an entry reveals full context: who, when, why."
];

function LibraryAuditCard({ step }) {
  const libraryPhase = step <= 1; // 0,1 = library; 2,3,4 = audit

  return (
    <Motion.div
      animate={{
        scale: step === 1 || step === 3 ? 1.05 : 1,
        boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
      }}
      transition={{ duration: 0.4 }}
      className="flex-1 basis-[320px] max-w-md bg-[rgba(20,10,30,0.9)] rounded-3xl border border-[rgba(255,155,255,0.4)] p-6 backdrop-blur-xl text-[#fdf5ff]"
    >
      {/* Tabs */}
      <div className="flex mb-4">
        <div className={`flex-1 py-2 px-0 rounded-full text-center text-sm font-semibold ${step <= 1 ? "bg-gradient-to-r from-cyan-400 to-green-400 text-black" : "bg-transparent text-gray-400"}`}>
          Library
        </div>
        <div className={`flex-1 py-2 px-0 rounded-full text-center text-sm font-semibold ${step >= 2 ? "bg-gradient-to-r from-pink-400 to-yellow-400 text-black" : "bg-transparent text-gray-400"}`}>
          Audit
        </div>
      </div>

      {/* Library states */}
      {step === 0 && (
        <div className="p-5 text-center border border-dashed border-[rgba(255,155,255,0.5)] rounded-xl">
          <Motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-r from-pink-400 to-yellow-400 px-6 py-4 rounded-lg text-gray-900 font-bold text-lg shadow-[0_0_20px_rgba(255,155,255,0.7)]"
          >
            Library Section
          </Motion.div>
          <p className="mt-2.5 text-sm opacity-70">Search books & resources</p>
        </div>
      )}
      {step === 1 && (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Book ID / Name"
            className="p-2.5 rounded-md border border-[rgba(255,155,255,0.4)] bg-[rgba(30,15,40,0.7)] text-[#fdf5ff]"
          />
          <input
            type="text"
            placeholder="Borrower ID"
            className="p-2.5 rounded-md border border-[rgba(255,155,255,0.4)] bg-[rgba(30,15,40,0.7)] text-[#fdf5ff]"
          />
          <Motion.button
            animate={{ scale: [1, 1.01, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="mt-5 py-3 px-5 rounded-lg bg-gradient-to-r from-pink-400 to-yellow-400 text-gray-900 font-bold border-none cursor-pointer shadow-[0_0_15px_rgba(255,155,255,0.5)]"
          >
            Issue/Return Book
          </Motion.button>
        </div>
      )}

      {/* Audit states */}
      {step === 2 && (
        <div className="flex flex-col gap-2.5">
          <div className="text-sm opacity-70 mb-1">Audit Trail (Filtered)</div>
          <div className="bg-[rgba(255,155,255,0.15)] p-2.5 rounded-lg border border-[rgba(255,155,255,0.4)]">
            <p><strong>Event:</strong> DELEGATED</p>
            <p><strong>User:</strong> HOD Admin (ID: U005)</p>
            <p><strong>Timestamp:</strong> 2023-11-20</p>
          </div>
          <div className="bg-[rgba(30,15,40,0.7)] p-2.5 rounded-lg opacity-60">
            <p>Event: LIBRARY_ISSUED</p>
            <p>User: Librarian (ID: U012)</p>
            <p>Timestamp: 2023-11-21</p>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="bg-[rgba(255,155,255,0.25)] p-5 rounded-xl border border-pink-400">
          <p className="text-xl font-bold text-pink-400 mb-4">Audit Event Details</p>
          <p><strong>Actor:</strong> HOD Admin (ID: U005)</p>
          <p><strong>Action:</strong> DELEGATED Authority</p>
          <p><strong>Target:</strong> Librarian (ID: U012)</p>
          <p><strong>Timestamp:</strong> 2023-11-20 09:30:00</p>
          <p><strong>Reason:</strong> Temporary Coverage</p>
          <p className="mt-2.5 text-xs opacity-80">Immutable Record</p>
        </div>
      )}
    </Motion.div>
  );
}

export default function LibraryAuditScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setStep(prev => (prev + 1) % auditLines.length),
      2500
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section className="min-h-[70vh] flex items-center justify-center gap-10 flex-wrap py-20 px-5">
      <div className="flex-1 basis-[320px] max-w-lg">
        <h2 className="text-pink-400 mb-4 text-3xl">
          Library & Immutable Audit
        </h2>
        <AnimatePresence mode="wait">
          <Motion.p
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-[#ffdfff] [text-shadow:0_0_16px_rgba(255,155,255,0.8)] min-h-[4em]"
          >
            {auditLines[step]}
          </Motion.p>
        </AnimatePresence>
      </div>
      <LibraryAuditCard step={step} />
    </section>
  );
}
