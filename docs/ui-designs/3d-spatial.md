# 3D Spatial Elements — GEN-C Pattern Guide

> Three.js-based spatial visualizations for workflow data. **Used for the DelegationShift authority transfer graph.**

---

## When to Use

- **Authority delegation visualization** (HOD ↔ Temp HOD)
- **Process flow diagrams** with depth and spatial relationships
- **Interactive node graphs** where connections between entities matter

## When NOT to Use

- Simple text content or static information
- Background decoration (no floating particles/geometric shapes)
- Replacing standard 2D cards or typography

---

## Tech Stack

| Library | Purpose | Install |
|---|---|---|
| `@react-three/fiber` | React renderer for Three.js | `npm i three @react-three/fiber @react-three/drei` |
| `@react-three/drei` | Helper components, controls | Included with above |
| `three` | Core 3D engine | Included with above |

---

## Component Structure

```
src/components/DelegationShift.jsx  →  (Replace 2D version)
src/components/DelegationGraph.jsx   →  (New: 3D scene)
```

### DelegationGraph.jsx (3D Scene)
```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Node({ position, label, color, isActive }) {
  const meshRef = useRef();

  useFrame((state) => {
    // Subtle breathing animation when active
    if (meshRef.current && isActive) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      );
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.4, 32, 32]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 0.3 : 0.1}
          toneMapped={false}
        />
      </Sphere>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.2}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function ConnectionLine({ start, end, isActive }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const lineRef = useRef();

  useFrame((state) => {
    if (lineRef.current && isActive) {
      const progress = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5;
      // Animate line draw
    }
  });

  return (
    <line ref={lineRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap((v) => v.toArray()))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        attach="material"
        color="#64748b"
        opacity={isActive ? 0.8 : 0.3}
        transparent
        toneMapped={false}
      />
    </line>
  );
}

// Main Scene Component
export default function DelegationGraph({ isDelegated }) {
  const nodes = [
    { position: [-1.5, 0, 0], label: "ORIGINAL HOD", color: "#10b981", id: "hod" },
    { position: [1.5, 0, 0], label: "TEMP HOD", color: "#0ea5e0", id: "temp-hod" },
  ];

  return (
    <Canvas
      camera={{ position: [0, 2, 5 ], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.5}
        castShadow
      />

      {/* Nodes */}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          label={node.label}
          color={node.color}
          isActive={isDelegated && node.id === "temp-hod"}
        />
      ))}

      {/* Connecting Line */}
      <ConnectionLine
        start={[-1.5, 0, 0]}
        end={[1.5, 0, 0]}
        isActive={isDelegated}
      />

      {/* OrbitControls for desktop interaction (disabled on mobile) */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
```

---

## Color Palette (3D Nodes)

| Entity | Color | Hex |
|---|---|---|
| Original HOD | Emerald (dim) | `#10b981` at 50% emissive |
| Temp HOD | Sky Blue (active) | `#0ea5e0` at 80% emissive |
| Connection Line | Slate | `#64748b` |
| Background | Transparent | `transparent` (lets CSS bg show through) |

---

## Animation Rules

- **Auto-rotation:** Slow orbit (0.3 speed) — never fast or dizzying
- **Node breathing:** Only when active (sin wave, ±5% scale)
- **Line glow:** Subtle emissive boost on active state
- **NO:** Particle trails, lens flares, bloom effects (unless approved)

---

## GEN-C Workflow Integration

```tsx
// In App.jsx — replaces 2D DelegationShift
<BentoCard title="Authority_Transfer_Protocol" span="large">
  <div className="h-[300px] w-full">
    <DelegationGraph isDelegated={isDelegated} />
  </div>
  {/* Text readout below */}
  <div className="mt-4 font-mono text-xs text-slate-400">
    {isDelegated ? "DELEGATION_ACTIVE → USR_882_T" : "AUTHORITY_REVERTED → USR_101_O"}
  </div>
</BentoCard>
```

---

## Fallback for SSR / Mobile

- Provide a 2D static SVG fallback for mobile (3D controls are difficult on touch)
- Or simplify to static nodes without orbit controls on mobile
- Always include alt text for the spatial visualization

```tsx
// Mobile fallback pattern
<div className="hidden md:block h-[300px]">
  <DelegationGraph />
</div>
<div className="md:hidden">
  <StaticAuthorityDiagram />
</div>
```
