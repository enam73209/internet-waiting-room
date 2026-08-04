"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressChartProps {
  title: string;
  children: React.ReactNode;
}

export default function ProgressChart({ title, children }: ProgressChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full flex flex-col items-center gap-4"
    >
      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold block text-center">
        {title}
      </span>
      <div className="w-full flex justify-center">
        {children}
      </div>
    </motion.div>
  );
}
