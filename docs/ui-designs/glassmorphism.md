# Glassmorphism — GEN-C Pattern Guide

> Translucent surfaces with subtle blur. **Already used extensively in GEN-C — this is the standard card style.**

---

## When to Use

- **Card backgrounds** for workflow steps
- **Modal/dialog overlays**
- **Sidebar panels** with content
- **Floating action elements** (non-primary CTAs)

## When NOT to Use

- Primary buttons or CTAs (use solid color)
- Background elements (would cause visual noise)
- Text containers where readability is critical (use solid background)

---

## Implementation

### Core CSS
```css
.glass-panel {
  background: rgba(30, 41, 59, 0.7);  /* slate-800 at 70% opacity */
  border: 1px solid rgba(148, 163, 189, 0.2);  /* slate-300 border */
  backdrop-filter: blur(12px);  /* max 12px - per AGENTS.md constraints */
  border-radius: 0.75rem;  /* rounded-xl */
}
```

### Tailwind Equivalents
```tsx
// Standard glass card
className="bg-[rgba(30,41,59,0.8)] backdrop-blur-md border border-slate-700 rounded-xl"

// Darker glass (for contrast sections)
className="bg-[rgba(15,23,42,0.9)] backdrop-blur-md border border-slate-800 rounded-xl"

// Lighter glass (for secondary info)
className="bg-[rgba(51,65,85,0.6)] backdrop-blur-sm border border-slate-600 rounded-xl"
```

---

## Opacity & Blur Guidelines

| Usage | Background Opacity | Blur Level | Border Opacity |
|---|---|---|---|
| Primary card | 70-80% | `backdrop-blur-md` (12px) | 15-20% |
| Secondary card | 50-60% | `backdrop-blur-sm` (8px) | 10-15% |
| Panel overlay | 85-95% | `backdrop-blur-md` | 20-25% |
| Mobile fallback | 95% solid | `backdrop-blur-sm` | 10% |

---

## Existing Usage in GEN-C Codebase

| Component | Pattern Used | Notes |
|---|---|---|
| `LatecomerFeature.jsx` | ✅ `bg-[rgba(15,15,25,0.9)]` + `backdrop-blur-xl` | **Reduce blur to `md`** — currently too heavy |
| `GatePassScene.jsx` | ✅ `bg-[rgba(15,15,25,0.9)]` + `backdrop-blur-xl` | Same issue — reduce blur |
| `LibraryAuditScene.jsx` | ✅ `bg-[rgba(20,10,30,0.9)]` + `backdrop-blur-xl` | Same issue — reduce blur |
| `WorkflowDemo.jsx` | ✅ `bg-slate-900/40` + `backdrop-blur-xl` | Reduce to `backdrop-blur-md` |
| `HeroAnimation.jsx` | ✅ `bg-slate-950/40` card | OK, minimal blur needed here |

### Action Items
- **Replace all `backdrop-blur-xl`** with `backdrop-blur-md` in existing components
- **Standardize on** `bg-[rgba(30,41,59,0.8)] border border-slate-700 rounded-xl` as the base card style

---

## Text Readability Inside Glass Panels

| Text Element | Recommended Class | Notes |
|---|---|---|
| Heading | `text-slate-100` (white-ish) | Always readable |
| Body text | `text-slate-300` | Good contrast on glass |
| Secondary text | `text-slate-400` | Reduced opacity for hierarchy |
| Status tags | Use theme colors (emerald/sky/amber) | But keep at 80% opacity, not full neon |

```
DON'T: text-white with full opacity on glass
DO:   text-slate-100 or text-slate-300
```

---

## Performance Notes

- Each `backdrop-blur` instance triggers a separate render layer
- Keep count under 10 simultaneously visible panels per viewport
- On mobile, consider disabling blur entirely (use solid background)

```tsx
// Conditional blur for mobile
const isMobile = useMediaQuery("(max-width: 768px)");
className={isMobile ? "bg-slate-800" : "bg-[rgba(30,41,59,0.8)] backdrop-blur-md"}
```
