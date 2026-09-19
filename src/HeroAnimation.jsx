import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

export default function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDelegated, setIsDelegated] = useState(false);

  const statsRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const statusBarRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setIsDelegated((prev) => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const tl = anime.timeline({ easing: "easeOutQuart" });

    tl.add(
      {
        targets: statsRef.current,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 600,
      },
      "-=200"
    );

    if (titleRef.current) {
      const chars = titleRef.current.textContent.split("");
      titleRef.current.innerHTML = chars
        .map(
          (c) =>
            '<span class="hero-char" style="opacity:0;display:inline-block;">' +
            (c === " " ? "&nbsp;" : c) +
            "</span>"
        )
        .join("");

      tl.add({
        targets: ".hero-char",
        opacity: [0, 1],
        translateY: [24, 0],
        delay: anime.stagger(50),
        duration: 1200,
      });
    }

    tl.add(
      {
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 800,
      },
      "+=200"
    );

    tl.add(
      {
        targets: descriptionRef.current,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 800,
      },
      "+=100"
    );

    tl.add(
      {
        targets: ctaRef.current,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 800,
      },
      "+=100"
    );

    tl.add(
      {
        targets: statusBarRef.current,
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 800,
      },
      "+=100"
    );
  }, [isVisible]);

  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between min-h-screen gap-12 lg:gap-16">
        {/* LEFT SIDE: Editorial Text + CTAs */}
        <div className="w-full lg:max-w-xl flex flex-col">
          <p
            ref={statsRef}
            className="text-xs font-mono text-emerald-600 uppercase tracking-[0.3em] mb-8 opacity-0"
          >
            GEN-C
          </p>

          <h1
            ref={titleRef}
            className="text-5xl md:text-6xl font-black text-slate-800 leading-tight mb-6 opacity-0"
          >
            GEN-C
          </h1>

          <p
            ref={subtitleRef}
            className="text-2xl md:text-3xl font-light text-slate-600 mb-6 opacity-0"
          >
            The central brain{" "}
            <span className="text-emerald-600/70 font-mono text-base">
              [v1.1_active]
            </span>
          </p>

          <p
            ref={descriptionRef}
            className="text-slate-500 max-w-md mb-8 opacity-0"
          >
            Handle gate passes, approvals, attendance, and student workflows
            from a single secure dashboard — built for modern campuses.
          </p>

          <div ref={ctaRef} className="opacity-0">
            <a
              href="https://github.com/Sayonarakoto/GEN-C_LOGIN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors duration-200"
            >
              View GEN-C Demo
            </a>
          </div>

          <div
            ref={statusBarRef}
            className="mt-12 flex items-center gap-4 opacity-0"
          >
            <div className="flex-1 h-[2px] bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-[2000ms] ease-in-out"
                style={{ width: isVisible ? "100%" : "0%" }}
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              SYSTEM_READY
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: CSS 3D Spatial Grid (pure CSS, no Three.js) */}
        <div className="relative w-full max-w-sm h-[360px]">
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

              <motion.div
                className="absolute flex flex-col items-center"
                style={{ left: "18%", top: "30%", transform: "translateZ(60px)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
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
                <span className="text-[9px] font-mono text-slate-400">
                  ORIGINAL HOD
                </span>
              </motion.div>

              <motion.div
                className="absolute flex flex-col items-center"
                style={{ left: "68%", top: "28%", transform: "translateZ(100px)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
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
                <span className="text-[9px] font-mono text-slate-400">
                  TEMP HOD
                </span>
              </motion.div>

              <ConnectionPath isDelegated={isDelegated} />
            </motion.div>
          </div>

          <div className="mt-8 font-mono text-[9px] text-slate-500">
            <div className="flex justify-between mb-1">
              <span>Authority_Transfer_Protocol</span>
              <span
                className={`${
                  isDelegated ? "text-sky-600" : "text-emerald-600"
                } transition-colors duration-500`}
              >
                {isDelegated ? "DELEGATION_ACTIVE" : "AUTHORITY_REVERTED"}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Effective_ID:</span>
              <span className="text-slate-600">
                {isDelegated ? "USR_882_T" : "USR_101_O"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectionPath({ isDelegated }) {
  const pathRef = useRef(null);
  const particleRef = useRef(null);

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
          particleRef.current.style.left = 18 + p * 50 + "%";
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
    <div
      ref={pathRef}
      className="absolute top-[34%] h-[2px] bg-slate-300 opacity-40 transition-opacity duration-300"
      style={{ left: "22%", width: "52%" }}
    >
      <div
        ref={particleRef}
        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-600 rounded-full shadow-[0_0_6px_rgba(5,150,105,0.4)]"
        style={{ opacity: 0, left: "0%" }}
      />
    </div>
  );
}