"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";

interface ActionRoomProps {
  room: {
    id: number | string;
    title?: string;
    subtitle?: string;
    icon?: string;
    accent?: string;
    illustrationId?: string;
    buttonText?: string;
    result?: {
      headline?: string;
      story?: string;
    };
  };
  onSubmit: (value: string) => void;
}

export default function ActionRoom({ room, onSubmit }: ActionRoomProps) {
  const { playChime } = useSound();
  const [highFived, setHighFived] = useState(false);

  const handleHighFive = () => {
    if (highFived) return;
    setHighFived(true);
    playChime();

    // Submit after animation finishes
    setTimeout(() => {
      onSubmit("high-five");
    }, 1800);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-6 max-w-md mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-2 leading-relaxed">
        {room.subtitle || "He's been waiting all day."}
      </h3>
      <p className="font-sans text-xs text-charcoal-400 text-center mb-8 max-w-xs leading-relaxed">
        Tap the penguin to give him a high five.
      </p>

      {/* Interactive Penguin Canvas */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8">
        <motion.div
          onClick={handleHighFive}
          animate={
            highFived
              ? { y: [0, -35, 0], rotate: [0, 4, -4, 0] }
              : { y: [-4, 4, -4] }
          }
          transition={
            highFived
              ? { duration: 1.0, ease: "easeOut" }
              : { duration: 4.0, repeat: Infinity, ease: "easeInOut" }
          }
          className="w-44 h-48 relative flex items-center justify-center cursor-pointer"
        >
          {/* Shadow underneath */}
          <motion.div
            animate={
              highFived
                ? { scale: [1, 0.6, 1], opacity: [0.2, 0.05, 0.2] }
                : { scale: [0.95, 1.05, 0.95] }
            }
            transition={
              highFived
                ? { duration: 1.0 }
                : { duration: 4.0, repeat: Infinity, ease: "easeInOut" }
            }
            className="absolute bottom-0 w-28 h-4 bg-charcoal-900/10 rounded-full blur-xs z-0"
          />

          {/* SVG Penguin Body */}
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full drop-shadow-md z-10 overflow-visible"
          >
            {/* Left Flipper (Waving or idle) */}
            <motion.path
              d="M 22 65 C 10 65, 8 85, 12 90 C 18 95, 25 75, 25 70"
              fill="#2D3436"
              animate={
                highFived
                  ? { rotate: [0, -35, 0], y: [0, -10, 0] }
                  : { rotate: [-5, 5, -5] }
              }
              transition={{
                duration: 1.5,
                repeat: highFived ? 1 : Infinity,
                ease: "easeInOut",
              }}
              className="origin-[25px_65px]"
            />

            {/* Right Flipper (Raised for high-five) */}
            <motion.path
              d="M 78 65 C 92 65, 96 35, 94 30 C 88 25, 75 55, 75 60"
              fill="#2D3436"
              animate={
                highFived
                  ? { rotate: [0, 45, 0], scale: [1, 1.1, 1] }
                  : { rotate: [0, -10, 0] }
              }
              transition={{ duration: 1.0, ease: "easeInOut" }}
              className="origin-[75px_60px]"
            />

            {/* Main Body */}
            <ellipse cx="50" cy="70" rx="30" ry="40" fill="#2D3436" />

            {/* White Tummy */}
            <ellipse cx="50" cy="75" rx="22" ry="32" fill="#FFFFFF" />

            {/* Eyes */}
            <circle cx="42" cy="46" r="3" fill="#2D3436" />
            <circle cx="58" cy="46" r="3" fill="#2D3436" />
            {/* Eye highlights */}
            <circle cx="43.5" cy="44.5" r="1" fill="#FFFFFF" />
            <circle cx="59.5" cy="44.5" r="1" fill="#FFFFFF" />

            {/* Beak */}
            <polygon points="45,50 55,50 50,60" fill="#FF9F43" />

            {/* Left Foot */}
            <path d="M 32 108 C 22 108, 22 118, 38 116" fill="#FF9F43" />

            {/* Right Foot */}
            <path d="M 68 108 C 78 108, 78 118, 62 116" fill="#FF9F43" />
          </svg>

          {/* High Five Glow Sparkles */}
          <AnimatePresence>
            {highFived && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 1.6] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-8 right-0 text-xl pointer-events-none"
              >
                ✨👋
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* High five confirmation message */}
      <div className="h-16 flex items-center justify-center text-center">
        {highFived ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-serif text-sm italic text-sage-500 font-medium"
          >
            Thank you! High-five recorded.
          </motion.span>
        ) : (
          <button
            onClick={handleHighFive}
            className="px-8 py-3 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            {room.buttonText || "High Five!"}
          </button>
        )}
      </div>
    </div>
  );
}
