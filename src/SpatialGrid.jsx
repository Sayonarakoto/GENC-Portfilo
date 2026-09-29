import { motion } from "framer-motion";

const SpatialGrid = () => {
  return (
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
  );
};

export default SpatialGrid;