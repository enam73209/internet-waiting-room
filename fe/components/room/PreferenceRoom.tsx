"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface PreferenceRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    options: string[];
    buttonText?: string;
  };
  onSubmit: (value: string) => void;
}

export default function PreferenceRoom({ room, onSubmit }: PreferenceRoomProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSubmit = () => {
    if (selected) {
      onSubmit(selected);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-6">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-10 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Select your preference."}
      </h3>

      {/* Options Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mb-12">
        {room.options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              className={`flex-1 text-center p-6 md:p-8 rounded-lg border bg-cream-50/50 hover:bg-cream-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 focus:outline-hidden focus:ring-1 focus:ring-charcoal-400 group relative cursor-pointer ${
                isSelected ? "border-charcoal-900 shadow-md" : "border-cream-300 shadow-xs"
              }`}
            >
              {/* Checkmark overlay circle */}
              <div
                className={`absolute top-4 right-4 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? "border-charcoal-900 bg-charcoal-900" : "border-cream-400"
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cream-50" />}
              </div>

              <span className="font-serif text-base text-charcoal-900 leading-snug group-hover:text-charcoal-600 transition-colors">
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Confirm Button */}
      <div className="h-14">
        {selected && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50 font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            {room.buttonText || "Confirm Preference"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
