"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealCardProps {
  step: "connecting" | "gathering";
  loadingText: string;
}

export default function RevealCard({ step, loadingText }: RevealCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center select-none py-8">
      {step === "connecting" ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border border-charcoal-400/20 flex items-center justify-center relative opacity-60"
        >
          {/* Longitude lines */}
          <div className="absolute inset-x-0 inset-y-0 border border-charcoal-400/30 rounded-full scale-x-50" />
          <div className="absolute inset-x-0 inset-y-0 border border-charcoal-400/30 rounded-full scale-y-50" />
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-charcoal-400/30" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-charcoal-400/30" />
        </motion.div>
      ) : (
        <div className="relative w-16 h-16 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-sage-500"
          />
          <motion.div
            animate={{ scale: [1, 0.6, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-10 h-10 rounded-full border border-charcoal-600 flex items-center justify-center"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-sage-500 font-medium">
          {step === "connecting" ? "Establishing Bridge" : "Mining Datasets"}
        </p>
        <h2 className="font-serif text-lg italic text-charcoal-900">
          {loadingText}
        </h2>
      </div>
    </div>
  );
}
