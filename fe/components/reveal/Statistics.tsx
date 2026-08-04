"use client";

import React from "react";
import { motion } from "framer-motion";

interface StatisticsProps {
  label: string;
  value: string | number;
  description?: string;
}

export default function Statistics({ label, value, description }: StatisticsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#FBF9F6] border border-cream-200/80 p-5 rounded-lg text-center shadow-xs w-full max-w-xs"
    >
      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 block mb-2">
        {label}
      </span>
      <span className="font-mono text-3xl font-light text-charcoal-900 block">
        {value}
      </span>
      {description && (
        <span className="font-sans text-[10px] text-charcoal-400 block mt-2 leading-relaxed">
          {description}
        </span>
      )}
    </motion.div>
  );
}
