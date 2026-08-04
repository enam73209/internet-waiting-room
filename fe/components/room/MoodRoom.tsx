"use client";

import React from "react";
import { motion } from "framer-motion";

interface Option {
  label: string;
  emoji: string;
}

interface MoodRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    options: Option[];
    buttonText?: string;
  };
  onSubmit: (value: string) => void;
  isSubmitted?: boolean;
  selectedResponse?: string;
}

const moodThemes: Record<string, { gradient: string; text: string; ring: string }> = {
  "Peaceful": {
    gradient: "from-teal-300/40 via-emerald-200/20 to-transparent",
    text: "text-teal-900",
    ring: "border-teal-300/50"
  },
  "Motivated": {
    gradient: "from-amber-300/40 via-orange-200/20 to-transparent",
    text: "text-amber-900",
    ring: "border-amber-300/50"
  },
  "Exhausted": {
    gradient: "from-blue-300/40 via-sky-200/20 to-transparent",
    text: "text-blue-900",
    ring: "border-blue-300/50"
  },
  "Reflective": {
    gradient: "from-purple-300/40 via-indigo-200/20 to-transparent",
    text: "text-purple-900",
    ring: "border-purple-300/50"
  }
};

export default function MoodRoom({ room, onSubmit, isSubmitted = false, selectedResponse }: MoodRoomProps) {
  const selected = selectedResponse || null;

  const handleSelect = (label: string) => {
    if (isSubmitted) return;
    onSubmit(label);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-8 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Select the vibe that best matches your day."}
      </h3>

      {/* watercolor bubbles grid */}
      <div className="grid grid-cols-2 gap-8 md:gap-12 w-full max-w-sm">
        {room.options.map((opt) => {
          const theme = moodThemes[opt.label] || {
            gradient: "from-cream-300/40 via-cream-200/20 to-transparent",
            text: "text-charcoal-900",
            ring: "border-cream-300"
          };
          const isSelected = selected === opt.label;

          return (
            <button
              key={opt.label}
              disabled={isSubmitted}
              onClick={() => handleSelect(opt.label)}
              className={`flex flex-col items-center gap-3 group focus:outline-hidden ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
            >
              {/* Floating gradient circle */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                {/* Soft outer pulse on hover or select */}
                <motion.div
                  animate={
                    isSelected
                      ? { scale: 1.15, opacity: 0.6 }
                      : { scale: 1.0, opacity: 0 }
                  }
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className={`absolute inset-[-4px] rounded-full bg-gradient-to-tr ${theme.gradient} blur-md`}
                />

                {/* Main circle */}
                <motion.div
                  whileHover={isSubmitted ? {} : { scale: 1.05 }}
                  animate={isSelected ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`w-full h-full rounded-full bg-gradient-to-br ${theme.gradient} border ${theme.ring} shadow-inner flex flex-col items-center justify-center transition-all ${
                    isSubmitted && !isSelected ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <span className="text-3xl mb-1 filter drop-shadow-sm select-none">
                    {opt.emoji}
                  </span>
                  <span className={`font-mono text-[9px] uppercase tracking-widest ${theme.text} font-semibold opacity-70`}>
                    {opt.label}
                  </span>
                </motion.div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
