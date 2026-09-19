# Editorial Design — GEN-C Pattern Guide

> Typography-driven layout with clear hierarchy, consistent spacing, and grid-based structure.

---

## Core Principles

1. **Typography hierarchy rules the page** — no decorative backgrounds competing with text
2. **Consistent vertical rhythm** — 8px spacing grid (base unit)
3. **Monospace for technical labels** — system names, status codes, audit logs
4. **Sans-serif for readable content** — headers, descriptions
5. **No neon, no gradients on text** (unless desaturated theme colors)

---

## Typography Hierarchy

| Element | Size | Weight | Color | Font | Usage |
|---|---|---|---|---|---|
| Page Title (h1) | `text-5xl` (3.5rem) | `font-black` | `text-slate-50` | Inter | Hero headers |
| Section Header (h2) | `text-3xl` (1.875rem) | `font-bold` | `text-slate-200` | Inter | Bento card titles |
| Card Title (h3) | `text-xl` (1.25rem) | `font-bold` | `text-slate-100` | Inter | Component titles |
| Body Text (p) | `text-base` (1rem) | `font-normal` | `text-slate-300` | Inter | Descriptions |
| Label | `text-xs` (0.75rem) | `font-medium` | `text-slate-500` | `font-mono` | Technical labels |
| Caption | `text-xs` (0.75rem) | `font-normal` | `text-slate-500` | Inter | Subtext, timestamps |

---

## Spacing System (8px Grid)

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `space-xs` | 4px | `gap-1` | Icon spacing |
| `space-sm` | 8px | `gap-2` | Form field gaps |
| `space-md` | 16px | `gap-4` | Component sections |
| `space-lg` | 24px | `gap-6` | Card content gaps |
| `space-xl` | 32px | `gap-8` | Section gaps |
| `space-2xl` | 48px | `gap-12` | Major section gaps |

```
Spacing must always be multiples of 4px.
Preferred: multiples of 8px (space-md = 16px, space-lg = 24px).
```

---

## Color Text Usage (Desaturated Palette)

```
DON'T: text-emerald-400, text-cyan-300, text-sky-400 (neon)
DO:   text-emerald-500/80, text-slate-300, text-slate-400
```

### Label Colors (Status-Specific, Desaturated)
| Status | Text | Text Shadow |
|---|---|---|
| Success/Active | `text-emerald-500/80` | `0_0_5px_rgba(16,185,135,0.3)` |
| Pending/Warn | `text-amber-500/80` | `0_0_5px_rgba(245,158,11,0.3)` |
| Info | `text-sky-500/80` | `0_0_5px_rgba(14,165,230,0.3)` |
| Neutral | `text-slate-500` | `none` |
| Accent (links) | `text-sky-400/90` | `0_0_5px_rgba(14,165,230,0.4)` |

---

## Layout Grid (Post-Bento Restructure)

```
max-width: 1280px (max-w-7xl)
padding: 24px (p-6)
gap: 24px (gap-6)
columns: 3 (lg:grid-cols-3)

[.card--full]  → grid-column: span 3
[.card--wide]  → grid-column: span 2
[.card--wide-right] → grid-column: span 2 (offset)
[.card--compact] → grid-column: span 1
```

---

## Editorial Component Patterns

### Header Block
```tsx
<div className="mb-8">
  <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em] mb-2">
    System_Architecture
  </p>
  <h2 className="text-3xl font-bold text-white tracking-tighter">
    Execution Sequence
  </h2>
</div>
```

### Code/Status Label
```tsx
<span className="text-[10px] font-bold text-emerald-500/80 font-mono uppercase tracking-wider">
  SECURED
</span>
```

### Audit Log Entry
```tsx
<div className="text-[9px] font-mono text-slate-600">
  <p className="text-emerald-500/50 mb-1 border-b border-slate-800 pb-1">
    DELEGATION_HISTORY_LOG
  </p>
  <p>[2025-12-17 08:30] AUTH_GRANTED -&gt; USR_882_T</p>
</div>
```

---

## Motion in Editorial Context

### Staggered Text Reveal
```tsx
// Letter-by-letter reveal (magic text)
const staggerChildren = 0.05;

<motion.h1
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren,
        delayChildren: 0.3,
      }
    }
  }}
>
  {text.split("").map((char, i) => (
    <motion.span
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {char}
    </motion.span>
  ))}
</motion.h1>
```

### Section Entrance
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1, duration: 0.4 }}
  className="lg:col-span-1"
>
  <BentoCard />
</motion.div>
```

---

## GEN-C Text Audit (Current Issues)

| Component | Issue | Fix |
|---|---|---|
| `HeroAnimation.jsx` | Comment says `bg-slate-950` — unused reference | Remove stale comments |
| `HeroAnimation.jsx` | `animate-pulse-slow` — custom animation not defined | Add to `tailwind.config.js` or use `animate-pulse` |
| `SpecialPassScene.jsx` | `text-yellow-300` — borderline neon | Use `text-amber-400/80` instead |
| `ResponsiveShowcase.jsx` | `text-gray-100` — inconsistent palette | Change to `text-slate-100` |

---

## Font Loading (Vite Config)

```js
// vite.config.js — no custom fonts needed
// All text uses system font stack via Tailwind defaults
// font-sans: system-ui, -apple-system, BlinkMacSystemFont, ...
// font-mono: ui-monospace, SFMono-Regular, Menlo, ...
```

Do NOT import custom Google Fonts — system fonts are sufficient for the professional, clean aesthetic.
