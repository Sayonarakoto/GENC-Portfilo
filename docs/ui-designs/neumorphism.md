# Neumorphism — GEN-C Pattern Guide

> Subtle extruded depth effects for interactive elements (buttons, toggles, inputs). **NOT for card backgrounds — use Glassmorphism.**

---

## When to Use

- **Form inputs** (text fields, submit buttons)
- **Interactive toggles** (authority switch simulation)
- **Small action buttons** (approve, decline, forward)
- **Status indicators** (on/off states)

## When NOT to Use

- Full card backgrounds (conflict with Glassmorphism)
- Large sections or hero areas
- Text blocks or static content

---

## Core Technique

Neumorphism uses **two layered box shadows** to create an extruded effect:
- **Outer shadow:** Dark shadow on bottom-right (as if light comes from top-left)
- **Inner shadow:** Light shadow on top-left (as if the element is pressed into the surface)

### CSS Pattern
```css
.neumorphic {
  background: #1e293b;  /* Match surrounding surface */
  border-radius: 12px;
  box-shadow:
    8px 8px 15px #0f172a,   /* dark shadow */
    -8px -8px 15px #334155;  /* light shadow */
}

.neumorphic-pressed {
  box-shadow:
    inset 4px 4px 6px #0f172a,
    inset -4px -4px 6px #334155;
}

.neumorphic-flat {
  box-shadow:
    4px 4px 8px #0f172a,
    -4px -4px 8px #334155;
}
```

### Tailwind Implementation (Custom)
Since Tailwind doesn't have built-in neumorphic utilities, create custom classes in `src/index.css`:

```css
/* Add to index.css or a custom CSS file */
.neumorphic-inset {
  box-shadow:
    inset 2px 2px 4px rgba(15, 23, 42, 0.5),
    inset -2px -2px 4px rgba(51, 65, 85, 0.3);
}

.neumorphic-outset {
  box-shadow:
    2px 2px 4px rgba(15, 23, 42, 0.5),
    -2px -2px 4px rgba(51, 65, 85, 0.3);
}
```

---

## GEN-C Use Cases

### 1. Approval Toggle Switch (DelegationShift)
```tsx
<button
  className={`
    relative inline-flex h-6 w-12 items-center rounded-full
    transition-colors duration-300
    ${isDelegated
      ? "bg-emerald-900/30"
      : "bg-slate-700"
    }
    neumorphic-inset
  `}
>
  <span
    className={`
      absolute top-1 bottom-1 h-4 w-4 rounded-full
      transition-transform duration-300
      ${isDelegated ? "translate-x-[28px] bg-emerald-500" : "translate-x-1 bg-slate-500"}
      neumorphic-outset
    `}
  />
</button>
```

### 2. Form Input Field
```tsx
<input
  type="text"
  placeholder="Reason"
  className="
    w-full p-3 rounded-lg
    bg-[rgba(30,41,59,0.9)]
    border border-slate-700
    neumorphic-inset
    text-slate-100 placeholder-slate-500
    focus:outline-none
    focus:border-sky-500/50
    focus:neumorphic-outset
  "
/>
```

### 3. Action Button (Approve/Decline)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  className={`
    px-6 py-3 rounded-lg font-medium
    neumorphic-outset
    transition-all duration-200
    ${isApprove
      ? "bg-emerald-900/30 text-emerald-300 border border-emerald-800"
      : "bg-red-900/30 text-red-300 border border-red-800"
    }
    hover:neumorphic-inset
  `}
>
  {label}
</motion.button>
```

---

## Contrast & Accessibility

| Element | Background | Minimum Contrast | Notes |
|---|---|---|---|
| Inset input | `#1e293b` (dark surface) | 4.5:1 against text | Add border for better visibility |
| Toggle on | `#10b981` (emerald) at 30% | 3:1 against white | Acceptable for decorative, not for status |
| Toggle off | `#64748b` (slate) | 4.5:1 against background | Use lighter text for off state |

### Accessibility Checklist
- [ ] All neumorphic elements have a minimum border (1-2px)
- [ ] Text always uses solid color on top of neumorphic surface
- [ ] Focus rings are visible (`ring-2 ring-sky-500`)
- [ ] No neumorphic elements used for critical status indicators

---

## Anti-Patterns (DO NOT DO)

```
X DON'T: Large neumorphic panels as section backgrounds
X DON'T: Neon colors inside neumorphic elements
X DON'T: Heavy blur combined with neumorphic shadows
X DON'T: Use neumorphic for primary action buttons (use solid color)
```

Neumorphism should be **subtle** — if the user notices the shadow trick, it's too much.

---

## GEN-C Existing Usage Audit

| Component | Neumorphic? | Action |
|---|---|---|
| `WorkflowDemo.jsx` | ⚠️ Uses `shadow-[0_0_40px...]` | No change needed (this is glow, not neumorphic) |
| `LatecomerFeature.jsx` | ⚠️ Uses `boxShadow` animations | Keep as-is (magnetic hover, not neumorphic) |
| `SpecialPassScene.jsx` | ⚠️ Uses border/dropshadow for buttons | Consider adding neumorphic inset to form fields |

---

## Implementation Priority
1. **Add custom CSS classes** to `src/index.css` (30 min)
2. **Apply to form inputs** in GatePassScene, SpecialPassScene, LibraryAuditScene
3. **Apply to toggle/buttons** in DelegationShift visualization
4. **Test contrast** with accessibility tool
