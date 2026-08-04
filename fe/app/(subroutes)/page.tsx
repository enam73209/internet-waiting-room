"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TransitionLink from "@/components/animation/TransitionLink";
import appConfig from "@/data/appConfig.json";

export default function MarketingPage() {
  const [particles, setParticles] = useState<any[]>([]);

  // Generate random particles positions on client side to avoid hydration mismatch
  useEffect(() => {
    const list = Array.from({ length: 24 }).map((_, i) => ({
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
    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[70vh] selection:bg-cream-300 select-none">
      {/* Drift Particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "100%", x: `${p.x}%`, opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            className="absolute rounded-full bg-sage-500/25 blur-xs"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl text-center flex flex-col items-center gap-12 z-10 px-4">
        {/* Floating Door Graphic */}
        <div className="relative w-48 h-64 flex items-center justify-center">
          {/* Subtle Golden Glow behind the door */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 rounded-sm bg-gradient-to-tr from-amber-200/50 via-gold-500/30 to-amber-100/10 blur-xl z-0"
          />

          {/* Floating Wood Door leaf */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-36 h-56 rounded-sm bg-cream-200 border-2 border-cream-300 shadow-xl flex items-center justify-end px-3 relative z-10"
          >
            {/* Wooden detail lining */}
            <div className="absolute inset-2 border border-cream-300/80 rounded-xs pointer-events-none" />
            <div className="absolute inset-4 border border-cream-300/40 rounded-xs pointer-events-none" />
            {/* Door handle */}
            <div className="w-[6px] h-6 bg-gold-600 rounded-xs border border-gold-500 shadow-xs mr-1" />
          </motion.div>
        </div>

        {/* Hero Copy */}
        <div className="flex flex-col gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl md:text-5xl tracking-tight text-charcoal-900 leading-tight"
          >
            {appConfig.siteName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-sans text-sm md:text-base text-charcoal-400 max-w-lg mx-auto leading-relaxed"
          >
            {appConfig.tagline}
          </motion.p>
        </div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <TransitionLink
            href="/today"
            className="px-8 py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-98"
          >
            {appConfig.buttons.start}
          </TransitionLink>
        </motion.div>

        {/* Footer info */}
        <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 opacity-60 mt-4">
          {appConfig.description}
        </span>
      </div>
    </div>
  );
}
