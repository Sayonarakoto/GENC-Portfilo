# AGENTS.md — GEN-C Frontend Development Guide

> AI coding agents: **READ THIS FIRST** before generating or modifying any UI code.

---

## Project Overview

**GEN-C** is a front-end-only portfolio website showcasing a fictional campus management system. It visualizes workflows (gate passes, latecomer passes, special passes) through animated, interactive components.

- **Framework:** React 18 + Vite 7 + Tailwind CSS v4
- **Animation:** Framer Motion v11
- **Icons:** Lucide React
- **Deployment:** GitHub Pages (`gh-pages -d dist`)

---

## Design Constraints (Read Before Writing Any UI Code)

### Explicitly FORBIDDEN
- **Neon gradients** (`from-emerald-500 to-cyan-400`, etc.) — use **desaturated, professional tones**
- **Unnecessary particle systems** — the canvas-based `ParticleBackground.jsx` is the only particle element allowed
- **Decorative grid overlays** (`#fff 1px` grid backgrounds) — remove unless serving a functional purpose
- **Excessive blur** (`blur-3xl`, `backdrop-blur-2xl`) — max allowed: `backdrop-blur-md`
- **"AI-looking" effects** — no generic shimmer glows, no auto-typing placeholders, no rotating gradient borders

### Allowed Aesthetic
- **Dark, professional palette:** slates, muted teals, amber for status
- **Clean typography hierarchy:** sans-serif body text, monospace labels
- **Subtle motion:** purposeful transitions (0.3s ease), not endless looping animations
- **Functional depth:** shadows and layers should communicate information hierarchy, not decoration

### GEN-C Color Palette (Light Mode)
```css
/* Reference colors - use these exact values */
--bg-primary:     #ffffff;  /* white - main background */
--bg-surface:     #f8fafc;   /* slate-50 - section backgrounds */
--bg-card:        #ffffff;   /* white - card background */
--bg-glass:       rgba(255, 255, 255, 0.8);  /* light glassmorphism */
--text-primary:   #0f172a;   /* slate-950 - primary text */
--text-secondary: #475569;   /* slate-600 - secondary text */
--text-tertiary:  #94a3b8;   /* slate-400 - labels, captions */
--accent-success: #059669;   /* emerald-600 - approvals, active states */
--accent-warning: #d97706;   /* amber-600 - pending status */
--accent-info:    #0284c7;   /* sky-600 - informational elements */
--accent-muted:   #64748b;   /* slate-500 - disabled/inactive */
```

### Light Mode Enforcement
- The site forces **light mode** — do not use dark backgrounds or dark text
- Always use `text-slate-800` for primary text, `text-slate-600` for secondary
- Cards should be `bg-white` with `border border-slate-200`
- 3D scene backgrounds should be `#f8fafc` (slate-50), not `#0f172a`

---

## Project Structure

```
src/
├── App.jsx                    → Root component (imports all sections)
├── main.jsx                   → React entry point (StrictMode)
├── index.css                  → Tailwind CSS v4 import (@import "tailwindcss")
├── ParticleBackground.jsx     → Canvas particle background (ONLY particle effect allowed)
├── HeroAnimation.jsx          → Hero section + section header
├── DelegationShift.jsx        → Authority transfer visualization
├── WorkflowDemo.jsx           → 4-step system architecture workflow
├── LatecomerFeature.jsx       → Student/HOD latecomer pass flow (3 sub-scenes)
├── GatePassScene.jsx          → Student/HOD gate pass flow (6 steps)
├── SpecialPassScene.jsx       → Student/Faculty/HOD special pass chain (10 steps)
├── LibraryAuditScene.jsx      → Library + immutable audit trail (4 steps)
├── ResponsiveShowcase.jsx     → Device responsiveness demo (laptop ↔ phone)
└── DFDVisualization.jsx       → UNUSED - orphaned component, safe to delete
```

New components go in `src/` following the existing naming convention: `PascalCase.jsx`.

---

## Component Creation Guidelines

1. **Follow existing patterns** — look at sibling components for structure
2. **Use Framer Motion** for all non-CSS transitions
3. **Use Lucide icons** — do NOT add new icon libraries
4. **Props over context** — pass data explicitly via props (like `isVisible` in `DelegationShift`)
5. **Component-scoped state** — use `useState`/`useEffect` inside the component, not external stores
6. **Auto-cycling pattern** — reuse the `setInterval` + `useState` pattern from `WorkflowDemo.jsx`

### Standard Component Template
```jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ComponentName({ isVisible }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % SOME_ARRAY.length);
    }, 2500); // 2.5s cycle - standard timing
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="...">
      {/* Content */}
    </section>
  );
}
```

---

## Build & Test Commands

```bash
# Development server (port 5173)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Lint (max-warnings 0 - fix ALL errors before committing)
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

**Linting must pass with zero warnings before finishing any work.**

---

## UI Design System References

Detailed pattern documentation lives in [`docs/ui-designs/`](./docs/ui-designs/README.md).

Key references:
- [Bento UI](./docs/ui-designs/bento.md) — Grid structure for restructuring App layout
- [3D Spatial](./docs/ui-designs/3d-spatial.md) — Three.js integration for workflow visualization
- [Glassmorphism](./docs/ui-designs/glassmorphism.md) — Allowed blur/transparency usage
- [Neumorphism](./docs/ui-designs/neumorphism.md) — Shadow technique for interactive elements
- [Editorial](./docs/ui-designs/editorial.md) — Typography hierarchy and layout principles

---

## Constraints on New Libraries

- **DO NOT** add `styled-components`, `emotion`, or CSS-in-JS — use Tailwind CSS classes only
- **DO NOT** add icon libraries beyond `lucide-react`
- **DO NOT** add charting libraries (D3, chart.js) unless explicitly requested — use CSS for visualization
- **DO NOT** add UI component libraries (Material UI, Ant Design, shadcn) — build from scratch
- **DO** add `@react-three/fiber` + `@react-three/drei` if implementing 3D spatial elements (approved)
- **DO** add `@splinetool/react-spline` for spline scene integration (approved)

Consult the user before adding any new npm dependency.