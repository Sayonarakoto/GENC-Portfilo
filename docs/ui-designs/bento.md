# Bento UI — GEN-C Pattern Guide

> Asymmetrical grid layout with cards of varying sizes. This is the **primary layout system** for the restructured GEN-C site.

---

## Core Principles

1. **Grid-based structure:** All sections organized in a responsive CSS grid
2. **Card-based modular content:** Each workflow section becomes a "bento card"
3. **Asymmetrical spans:** Important content spans multiple columns or rows
4. **No neon, no decoration:** Clean, professional presentation of information

---

## Grid Structure

```
Desktop (lg+):
┌─────────────────────────────────────────────────────────┐
│ Hero Header (col-span-2)                                 │
├──────────────────────────────┬──────────────────────────┤
│ Workflow Cards (col-span-1)  │  Delegation Visualization│
│                              │  (col-span-1, larger)     │
├──────────────────────────────┴──────────────────────────┤
│ Latecomer Flow (col-span-2)                             │
├──────────────────────────────┬──────────────────────────┤
│ Gate Pass Flow (col-span-1)  │ Special Pass Flow        │
│                              │ (col-span-1)             │
└──────────────────────────────┴──────────────────────────┘
```

### Tailwind Grid Implementation
```tsx
// Root container
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">

  {/* Hero spans full width */}
  <div className="lg:col-span-3">
    <HeroSection />
  </div>

  {/* Standard card: 1 column */}
  <div className="lg:col-span-1">
    <BentoCard>
      <WorkflowDemo />
    </BentoCard>
  </div>

  {/* Large card: 2 columns */}
  <div className="lg:col-span-2 bg-card min-h-[400px]">
    <BentoCard>
      <DelegationShift />
    </BentoCard>
  </div>

  {/* Wide card: spans all 3 columns */}
  <div className="lg:col-span-3 bg-card">
    <BentoCard>
      <LatecomerFeature />
    </BentoCard>
  </div>
</div>
```

---

## Bento Card Component (Standard)

```tsx
// src/components/BentoCard.jsx
export default function BentoCard({ title, children, span = 1 }) {
  return (
    <div className={`
      bg-[rgba(30,41,59,0.8)]  /* slate-800 with translucency */
      backdrop-blur-md         /* ALLOWED blur level */
      border                   /* subtle border */
      border-slate-700
      rounded-xl
      p-6
      transition-all
      duration-300
      hover:border-slate-600
      hover:shadow-lg
      ${span === 'full' ? 'lg:col-span-3' : `lg:col-span-${span}`}
    `}>
      {title && (
        <h3 className="text-slate-300 text-xs font-mono uppercase tracking-wider mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
```

---

## GEN-C Layout Mapping (Post-Bento Restructure)

| Original Section | Bento Card | Span | New Role |
|---|---|---|---|
| `HeroAnimation` | Hero Header | col-span-3 | Welcome + CTA |
| `WorkflowDemo` | System Architecture | col-span-1 | 4-step overview |
| `DelegationShift` | Authority Transfer | col-span-2 | Visual + interactive |
| `LatecomerFeature` | Latecomer Flow | col-span-3 | Student → HOD demo |
| `GatePassScene` | Gate Pass Flow | col-span-1 | Student → HOD |
| `SpecialPassScene` | Special Pass Chain | col-span-1 | Student → Mentor → HOD |
| `LibraryAuditScene` | Audit Trail | col-span-2 | Immutable logging |
| `ResponsiveShowcase` | Device Demo | col-span-3 | Responsive preview |

---

## Animation Guidelines (Bento Cards)

- **Entrance:** Staggered fade-in (delay by grid position): `transition-delay-[index*100ms]`
- **Hover:** Subtle scale (1.02) + border color shift, **NO** neon glow
- **Active:** No pulsing, no shimmer — use border accent only

```tsx
// Grid-staggered entrance
{items.map((item, i) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1, duration: 0.4 }}
    className="lg:col-span-1"
  >
    <BentoCard {...item} />
  </motion.div>
))}
```

---

## Mobile Responsiveness

- **Breakpoints:** `grid-cols-1` (mobile) → `lg:grid-cols-3` (desktop)
- **Stacking order:** On mobile, cards stack vertically in content priority order
- **Touch targets:** Minimum 44px height, 44px width
- **Font scaling:** Use `text-sm` to `text-lg` — no `text-6xl` hero text on mobile