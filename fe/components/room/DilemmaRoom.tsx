"use client";

import React from "react";
import { useRoomStore } from "@/store/useRoomStore";

interface DilemmaRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    options: string[];
    buttonText?: string;
  };
  onSubmit: (value: string) => void;
  isSubmitted?: boolean;
  selectedResponse?: string;
}

export default function DilemmaRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: DilemmaRoomProps) {
  const { unlockAchievement } = useRoomStore();
  const selected = selectedResponse || null;

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    // Unlock badge 2 on completing multiple rooms
    unlockAchievement(2);
    onSubmit(opt);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4 max-w-xl mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-8 leading-relaxed max-w-md">
        {room.question || room.subtitle || "Choose one."}
      </h3>

      {/* Dilemma cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        {room.options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              disabled={isSubmitted}
              onClick={() => handleSelect(opt)}
              className={`flex-1 text-center p-8 rounded-lg border bg-cream-50/50 hover:bg-cream-50 transition-all duration-300 flex flex-col items-center gap-4 focus:outline-hidden focus:ring-1 focus:ring-charcoal-400 group relative ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              } ${
                isSelected 
                  ? "border-charcoal-900 shadow-md opacity-100" 
                  : isSubmitted 
                    ? "border-cream-200 opacity-30" 
                    : "border-cream-300 shadow-xs"
              }`}
            >
              {/* Outer check indicator */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isSelected ? "border-charcoal-900 bg-charcoal-900" : "border-cream-400"
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cream-50" />}
              </div>

              <span className="font-serif text-base text-charcoal-900 leading-snug">
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
