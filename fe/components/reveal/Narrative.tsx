"use client";

import React from "react";
import { motion } from "framer-motion";

interface NarrativeProps {
  text: string;
}

export default function Narrative({ text }: NarrativeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full mb-10 text-center select-none"
    >
      <p className="font-mono text-[10px] uppercase tracking-widest text-sage-500 font-medium mb-3">
        The Narrative
      </p>
      <p className="font-serif text-base md:text-lg text-charcoal-600 leading-relaxed max-w-lg mx-auto">
        &ldquo;{text}&rdquo;
      </p>
    </motion.div>
  );
}
