"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % width
      y: Math.random() * 100, // % height
      size: Math.random() * 3 + 2, // px
      delay: Math.random() * 5,
      duration: Math.random() * 6 + 6,
    }));
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "100%", x: `${p.x}%`, opacity: 0 }}
          animate={{
            y: "-10%",
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-sage-500/20 blur-xs"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}
