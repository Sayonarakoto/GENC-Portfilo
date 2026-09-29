import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function HeroAnimation() {
  const genCTextRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!genCTextRef.current || animationRef.current) return;

    const colors = ['#059669', '#0284c7', '#d97706', '#64748b'];
    let colorIndex = 0;

    const cycleColors = () => {
      if (!genCTextRef.current) return;

      const element = genCTextRef.current;
      const toColor = colors[(colorIndex + 1) % colors.length];
      colorIndex = (colorIndex + 1) % colors.length;

      animationRef.current = anime({
        targets: element,
        color: {
          value: toColor,
          duration: 800
        },
        easing: 'easeInOutQuad',
        complete: () => {
          cycleColors();
        }
      });
    };

    cycleColors();

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between min-h-screen gap-12 lg:gap-16">
        <div className="w-full lg:max-w-xl flex flex-col">
          <h1
            ref={genCTextRef}
            className="text-5xl md:text-6xl font-black mb-6"
            style={{ color: '#059669' }}
          >
            GEN-C
          </h1>

          <p
            className="text-slate-500 max-w-md mb-8"
          >
            Handle gate passes, approvals, attendance, and student workflows
            from a single secure dashboard — built for modern campuses.
          </p>

          <a
            href="https://github.com/Sayonarakoto/GEN-C_LOGIN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors duration-200 mb-8"
          >
            View GEN-C Demo
          </a>
        </div>
      </div>
    </section>
  );
}