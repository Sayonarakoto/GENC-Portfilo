import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

/**
 * DelegationShift — pure CSS 3D authority transfer visualization.
 *
 * Replaces the previous Three.js scene (removed) with the same
 * CSS 3D spatial approach used in HeroAnimation.jsx: a perspective
 * wrapper, a slowly rotating preserve-3d plane, and two authority
 * nodes with an animated connection particle.
 */
const DelegationShift = ({ isVisible = true }) => {
  const [isDelegated, setIsDelegated] = useState(false);
  const particleRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDelegated((prev) => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isDelegated || !particleRef.current) return;

    const anim = anime({
      targets: { x: 0 },
      x: [0, 100],
      duration: 3000,
      easing: "easeInOutQuart",
      update: function (a) {
        const p = a.targets[0].x / 100;
        if (particleRef.current) {
          particleRef.current.style.left = 22 + p * 52 + "%";
        }
      },
      complete: function () {
        if (particleRef.current) {
          particleRef.current.style.opacity = "0";
        }
      },
    });

    if (particleRef.current) {
      particleRef.current.style.opacity = "1";
    }

    return () => anim.pause();
  }, [isDelegated]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-4">
        Authority_Transfer_Protocol
      </p>

      <div className="relative w-full h-[320px]">
        <div className="perspective-1200 w-full h-full">
          <motion.div
            className="w-full h-full preserve-3d"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-0 preserve-3d opacity-[0.12]"
              style={{ transform: "rotateX(62deg) translateZ(-30px)" }}
            >
              <div className="grid grid-cols-8 gap-4 p-6">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-slate-500 rounded-sm"
                  />
                ))}
              </div>
            </div>

            <div
              className="absolute flex flex-col items-center"
              style={{ left: "16%", top: "34%", transform: "translateZ(60px)" }}
            >
              <div className="relative">
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                    !isDelegated
                      ? "bg-emerald-600 shadow-[0_0_12px_rgba(5,150,105,0.3)]"
                      : "bg-slate-400"
                  }`}
                />
                {!isDelegated && (
                  <div className="absolute -inset-1 border border-emerald-600/20 rounded-full animate-pulse-ring" />
                )}
              </div>
              <span className="mt-3 text-[10px] font-mono text-slate-500">
                USR_101_O
              </span>
            </div>

            <div
              className="absolute flex flex-col items-center"
              style={{ left: "68%", top: "34%", transform: "translateZ(100px)" }}
            >
              <div className="relative">
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                    isDelegated
                      ? "bg-sky-600 shadow-[0_0_12px_rgba(2,132,199,0.3)]"
                      : "bg-slate-400"
                  }`}
                />
                {isDelegated && (
                  <div className="absolute -inset-1 border border-sky-600/20 rounded-full animate-pulse-ring" />
                )}
              </div>
              <span className="mt-3 text-[10px] font-mono text-slate-500">
                USR_882_T
              </span>
            </div>

            <div
              className="absolute top-[34%] h-[2px] bg-slate-300 opacity-40 transition-opacity duration-300"
              style={{ left: "24%", width: "48%" }}
            >
              <div
                ref={particleRef}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full shadow-[0_0_6px_rgba(5,150,105,0.4)]"
                style={{ opacity: 0, left: "0%" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-6 w-full font-mono text-[9px]">
        <div className="flex justify-between">
          <span className="text-slate-500">Status:</span>
          <span
            className={`${
              isDelegated ? "text-sky-600" : "text-emerald-600"
            } transition-colors duration-500`}
          >
            {isDelegated ? "DELEGATION_ACTIVE" : "AUTHORITY_REVERTED"}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-slate-500">Effective_ID:</span>
          <span className="text-slate-600">
            {isDelegated ? "USR_882_T" : "USR_101_O"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DelegationShift;