import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const studentLines = [
  "Student logs in to GENC Latecomer portal (JWT-secured).",
  "Dashboard shows the Latecomer quick action.",
  "Student fills reason + ETA and submits the form.",
  "System routes pass to EffectiveApproverId → status: Pending."
];

const approverLines = [
  "HOD logs in to GENC portal (JWT-secured).",
  "System performs Guard Check: isEffectiveApproverId? True.",
  "HOD views pending Latecomer passes for their department.",
  "HOD approves Latecomer pass #123 (status update, notification).",
  "Audit Log updated, Student notified: Latecomer pass Approved."
];

const historyLines = [
  "Immutable Audit Trail: All actions logged and secured.",
  "Student's perspective: View their pass history and statuses.",
  "Approver's perspective: Track approvals, rejections, and notifications."
];

function StudentCard({ step }) {
  return (
    <motion.div
      animate={{
        scale: step === 0 ? 1.03 : 1,
        boxShadow: step === 3
          ? "0 0 40px rgba(0,212,255,0.7)"
          : "0 20px 40px rgba(0,0,0,0.7)"
      }}
      transition={{ duration: 0.4 }}
      className="flex-1 basis-[320px] max-w-[380px] bg-[rgba(15,15,25,0.9)] rounded-3xl border border-[rgba(0,212,255,0.35)] p-6 backdrop-blur-xl text-gray-100"
    >
      {/* header */}
      <div className="text-sm opacity-80 mb-4">
        {step < 3 ? "Student Login & Form" : "My Requests – Latest"}
      </div>

      {step === 0 && (
        <>
          {/* Login view */}
          <div className="mb-2.5">Email: <input type="email" value="student@genc.edu" readOnly className="w-full p-2 rounded border border-[#00d4ff55] bg-[#ffffff11] text-gray-100" /></div>
          <div className="mb-5">Password: <input type="password" value="********" readOnly className="w-full p-2 rounded border border-[#00d4ff55] bg-[#ffffff11] text-gray-100" /></div>
          <motion.button
            animate={{
                scale: [1, 1.02, 1],
                boxShadow: ["0 0 10px #00d4ff55", "0 0 20px #00d4ffaa", "0 0 10px #00d4ff55"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full p-2.5 rounded-lg border-none bg-gradient-to-r from-cyan-400 to-green-400 text-gray-900 font-bold cursor-pointer"
          >
            Login
          </motion.button>
        </>
      )}

      {step === 1 && (
        <>
          {/* Dashboard with glowing Latecomer tile */}
          <div className="flex flex-wrap gap-2.5 mb-5">
            <div className="flex-1 basis-[100px] bg-[#ffffff11] p-4 rounded-xl text-center opacity-70">My Passes</div>
            <div className="flex-1 basis-[100px] bg-[#ffffff11] p-4 rounded-xl text-center opacity-70">HOD Approvals</div>
            <div className="flex-1 basis-[100px] bg-[#ffffff11] p-4 rounded-xl text-center opacity-70">Audit Log</div>
          </div>
          <motion.div
            animate={{
                scale: [1, 1.03, 1],
                boxShadow: ["0 0 15px #00d4ff88", "0 0 30px #00d4ffaa", "0 0 15px #00d4ff88"]
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="bg-gradient-to-r from-cyan-400 to-green-400 p-5 rounded-xl text-center text-gray-900 font-bold text-lg"
          >
            Latecomer Pass Request
          </motion.div>
        </>
      )}

      {step === 2 && (
        <>
          {/* Form filled + glowing submit */}
          <div className="mb-2.5">Reason: <input type="text" value="Traffic delay" readOnly className="w-full p-2 rounded border border-[#00d4ff55] bg-[#ffffff11] text-gray-100" /></div>
          <div className="mb-5">ETA: <input type="text" value="10:30 AM" readOnly className="w-full p-2 rounded border border-[#00d4ff55] bg-[#ffffff11] text-gray-100" /></div>
          <motion.button
            animate={{
                scale: [1, 1.02, 1],
                boxShadow: ["0 0 10px #00ff8855", "0 0 20px #00ff88aa", "0 0 10px #00ff8855"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-full p-2.5 rounded-lg border-none bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 font-bold cursor-pointer"
          >
            Submit Request
          </motion.button>
        </>
      )}

      {step === 3 && (
        <>
          {/* History row: Latecomer #123 – Pending Approver */}
          <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff11] rounded-lg">
            <span>Latecomer #123</span>
            <span className="text-orange-400">Pending</span>
          </div>
          <div className="flex justify-between p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
            <span>ID Lost #045</span>
            <span className="text-gray-400">Approved</span>
          </div>
        </>
      )}
    </motion.div>
  );
}

function ApproverCard({ step }) {
    return (
        <motion.div
            animate={{
                scale: (step === 0 || step === 3) ? 1.03 : 1, // Pulse for login and approve
                boxShadow: step === 1 // Guard check pass
                    ? "0 0 40px rgba(0,255,136,0.7)"
                    : step === 3 // Approve
                        ? "0 0 40px rgba(0,255,136,0.7)"
                        : "0 20px 40px rgba(0,0,0,0.7)"
            }}
            transition={{ duration: 0.4 }}
            className="flex-1 basis-[320px] max-w-[380px] bg-[rgba(15,25,15,0.9)] rounded-3xl border border-[rgba(0,255,136,0.35)] p-6 backdrop-blur-xl text-gray-100"
        >
            {/* header */}
            <div className="text-sm opacity-80 mb-4">
                {step < 2 ? "HOD Login & Guard Check" : "Pending Approvals"}
            </div>

            {step === 0 && (
                <>
                    {/* Login view */}
                    <div className="mb-2.5">Email: <input type="email" value="hod@genc.edu" readOnly className="w-full p-2 rounded border border-[#00ff8855] bg-[#ffffff11] text-gray-100" /></div>
                    <div className="mb-5">Password: <input type="password" value="********" readOnly className="w-full p-2 rounded border border-[#00ff8855] bg-[#ffffff11] text-gray-100" /></div>
                    <motion.button
                        animate={{
                            scale: [1, 1.02, 1],
                            boxShadow: ["0 0 10px #00ff8855", "0 0 20px #00ff88aa", "0 0 10px #00ff8855"]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-full p-2.5 rounded-lg border-none bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 font-bold cursor-pointer"
                    >
                        Login as HOD
                    </motion.button>
                </>
            )}

            {step === 1 && (
                <>
                    {/* Guard check passed */}
                    <div className="flex items-center justify-center h-32 text-xl text-green-400 [text-shadow:0_0_15px_rgba(0,255,136,0.8)]">
                        Guard Check Passed: isEffectiveApproverId!
                        <span className="ml-2.5 text-3xl">✅</span>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    {/* List of pending passes */}
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff11] rounded-lg border-l-4 border-orange-400">
                        <span>Latecomer #123</span>
                        <span className="text-orange-400">Pending</span>
                    </div>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>Uniform #001</span>
                        <span className="text-gray-400">Pending</span>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    {/* Approve button pulse → row turns green */}
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff11] rounded-lg">
                        <span>Latecomer #123</span>
                        <motion.button
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: ["0 0 10px #00ff8855", "0 0 20px #00ff88aa", "0 0 10px #00ff8855"]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="bg-gradient-to-r from-green-400 to-green-600 text-gray-900 font-bold border-none py-1 px-4 rounded cursor-pointer"
                        >
                            Approve
                        </motion.button>
                    </div>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>Uniform #001</span>
                        <span className="text-gray-400">Pending</span>
                    </div>
                </>
            )}

            {step === 4 && (
                <>
                    {/* List showing updated "Approved" with timestamp */}
                    <div className="flex justify-between mb-2.5 p-2.5 bg-gradient-to-r from-[#00ff8833] to-transparent rounded-lg border-l-4 border-green-400">
                        <span>Latecomer #123</span>
                        <span className="text-green-400">Approved</span>
                    </div>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>Uniform #001</span>
                        <span className="text-gray-400">Pending</span>
                    </div>
                </>
            )}
        </motion.div>
    );
}

function HistoryCard({ step }) {
    const [tabWidth, setTabWidth] = useState(0);
    const [tabLeft, setTabLeft] = useState(0);
    const studentTabRef = React.useRef(null);
    const approverTabRef = React.useRef(null);

    useEffect(() => {
        if (step % 2 === 0 && studentTabRef.current) { // Student History Active
            setTabWidth(studentTabRef.current.offsetWidth);
            setTabLeft(studentTabRef.current.offsetLeft);
        } else if (step % 2 !== 0 && approverTabRef.current) { // Approver History Active
            setTabWidth(approverTabRef.current.offsetWidth);
            setTabLeft(approverTabRef.current.offsetLeft);
        }
    }, [step]);

    return (
        <motion.div
            className="flex-1 basis-[320px] max-w-[380px] bg-[rgba(15,15,25,0.9)] rounded-3xl border border-[rgba(255,170,0,0.35)] p-6 backdrop-blur-xl text-gray-100 relative"
        >
            <div className="flex mb-5 relative">
                <motion.div
                    ref={studentTabRef}
                    onClick={() => {}} // Placeholder for click handler
                    className={`py-2.5 px-4 cursor-pointer font-bold relative z-20 ${step % 2 === 0 ? "text-amber-400" : "text-gray-100/30"}`}
                >
                    Student History
                </motion.div>
                <motion.div
                    ref={approverTabRef}
                    onClick={() => {}} // Placeholder for click handler
                    className={`py-2.5 px-4 cursor-pointer font-bold relative z-20 ${step % 2 !== 0 ? "text-amber-400" : "text-gray-100/30"}`}
                >
                    Approver History
                </motion.div>
                <motion.div
                    animate={{ x: tabLeft, width: tabWidth }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 h-0.5 bg-amber-400 z-10"
                />
            </div>

            {step % 2 === 0 ? (
                // Student History View
                <>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff11] rounded-lg">
                        <span>Latecomer #123</span>
                        <span className="text-green-400">Approved</span>
                    </div>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>ID Lost #045</span>
                        <span className="text-green-400">Approved</span>
                    </div>
                    <div className="flex justify-between p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>Latecomer #120</span>
                        <span className="text-orange-400">Pending</span>
                    </div>
                </>
            ) : (
                // Approver History View
                <>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff11] rounded-lg">
                        <span>Latecomer #123 (by Student)</span>
                        <span className="text-green-400">Approved</span>
                    </div>
                    <div className="flex justify-between mb-2.5 p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>Mosque Pass #001 (by HOD)</span>
                        <span className="text-green-400">Approved</span>
                    </div>
                    <div className="flex justify-between p-2.5 bg-[#ffffff05] rounded-lg opacity-70">
                        <span>Uniform #001 (by Student)</span>
                        <span className="text-red-500">Rejected</span>
                    </div>
                </>
            )}
        </motion.div>
    );
}

function StudentScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setStep(prev => (prev + 1) % studentLines.length),
      2500
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center gap-10 flex-wrap p-10">
      {/* Left: text */}
      <div className="flex-1 basis-[320px] max-w-lg">
        <h2 className="text-cyan-400 mb-4 text-3xl">Latecomer – Student Flow</h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-xl text-[#66f3ffaa] [text-shadow:0_0_16px_rgba(0,212,255,0.8)] min-h-[4em]"
          >
            {studentLines[step]}
          </motion.p>
        </AnimatePresence>
      </div>
      {/* Right: fake UI card */}
      <StudentCard step={step} />
    </div>
  );
}

function ApproverScene() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setStep(prev => (prev + 1) % approverLines.length),
            2500
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[70vh] flex items-center justify-center gap-10 flex-wrap p-10">
            {/* Left: text */}
            <div className="flex-1 basis-[320px] max-w-lg">
                <h2 className="text-green-400 mb-4 text-3xl">Latecomer – HOD Approver Flow</h2>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl text-[#99ffccaa] [text-shadow:0_0_16px_rgba(0,255,136,0.8)] min-h-[4em]"
                    >
                        {approverLines[step]}
                    </motion.p>
                </AnimatePresence>
            </div>
            {/* Right: fake UI card */}
            <ApproverCard step={step} />
        </div>
    );
}

function HistoryScene() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setStep(prev => (prev + 1) % historyLines.length), // Cycle through all historyLines
            2500
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-[70vh] flex items-center justify-center gap-10 flex-wrap p-10">
            {/* Left: text */}
            <div className="flex-1 basis-[320px] max-w-lg">
                <h2 className="text-amber-400 mb-4 text-3xl">Immutable Audit & History</h2>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl text-[#ffcc66aa] [text-shadow:0_0_16px_rgba(255,170,0,0.8)] min-h-[4em]"
                    >
                        {historyLines[step]}
                    </motion.p>
                </AnimatePresence>
            </div>
            {/* Right: fake UI card */}
            <HistoryCard step={step} />
        </div>
    );
}

export default function LatecomerFeature() {
  return (
    <section className="bg-gradient-to-b from-[rgba(10,10,10,0.95)] to-[rgba(26,26,46,0.9)] py-20 px-5 font-['Inter',_sans-serif] text-white overflow-hidden relative backdrop-blur-xl">
      {/* Animated Background Blobs from HeroAnimation */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] left-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle_at_30%_30%,_rgba(0,212,255,0.15),_transparent_50%)] rounded-full filter blur-2xl"
        />
        <motion.div
          animate={{
            x: [-50, 0, -50],
            y: [0, 100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[5%] w-[400px] h-[400px] bg-[radial-gradient(circle_at_70%_70%,_rgba(0,255,136,0.12),_transparent_50%)] rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10"> {/* Content wrapper */}
        <StudentScene />
        <div className="h-16" /> {/* Spacing */}
        <ApproverScene />
        <div className="h-16" /> {/* Spacing */}
        <HistoryScene />
      </div>
    </section>
  );
}
