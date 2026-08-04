"use client";

import React from "react";

interface PreferenceRoomProps {
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

export default function PreferenceRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: PreferenceRoomProps) {
  const selected = selectedResponse || null;

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    onSubmit(opt);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-8 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Select your preference."}
      </h3>

      {/* Options Cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        {room.options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              disabled={isSubmitted}
              onClick={() => handleSelect(opt)}
              className={`flex-1 text-center p-6 md:p-8 rounded-lg border bg-cream-50/50 hover:bg-cream-50 transition-all duration-300 flex flex-col items-center justify-center gap-3 focus:outline-hidden focus:ring-1 focus:ring-charcoal-400 group relative ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              } ${
                isSelected 
                  ? "border-charcoal-900 shadow-md opacity-100" 
                  : isSubmitted 
                    ? "border-cream-200 opacity-30" 
                    : "border-cream-300 shadow-xs"
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
    </div>
  );
}
