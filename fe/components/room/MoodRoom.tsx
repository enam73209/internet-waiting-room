"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";

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

export default function MoodRoom({ room, onSubmit }: MoodRoomProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { unlockAchievement } = useRoomStore();

  const handleSubmit = () => {
    if (selected) {
      // Unlock badge 1 on completing a door
      unlockAchievement(1);
      onSubmit(selected);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-10 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Select the vibe that best matches your day."}
      </h3>

      {/* watercolor bubbles grid */}
      <div className="grid grid-cols-2 gap-8 md:gap-12 w-full max-w-sm mb-12">
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
              onClick={() => setSelected(opt.label)}
              className="flex flex-col items-center gap-3 group focus:outline-hidden cursor-pointer"
            >
              {/* Floating gradient circle */}
              <div className="relative w-28 h-28 flex items-center justify-center">
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
                  whileHover={{ scale: 1.05 }}
                  animate={isSelected ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className={`w-full h-full rounded-full bg-gradient-to-br ${theme.gradient} border ${theme.ring} shadow-inner flex flex-col items-center justify-center transition-all`}
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

      {/* confirm button */}
      <div className="h-14">
        {selected && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50 font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            {room.buttonText || "Record Landscape"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
