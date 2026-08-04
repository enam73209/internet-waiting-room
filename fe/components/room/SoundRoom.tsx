"use client";

import React, { useState } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { useSound } from "@/hooks/useSound";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Play } from "lucide-react";

interface SoundRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    options: string[];
    answer: string;
    buttonText?: string;
    result?: {
      correct?: number;
      story?: string;
    };
  };
  onSubmit: (value: string) => void;
  isSubmitted?: boolean;
  selectedResponse?: string;
}

export default function SoundRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: SoundRoomProps) {
  const { playChime } = useSound();
  const { isMuted } = useRoomStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const selectedOption = selectedResponse || null;
  const isCorrect = selectedOption === room.answer;

  const handlePlaySound = () => {
    setIsPlaying(true);
    playChime();
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    onSubmit(opt);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4 max-w-lg mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-6 leading-relaxed">
        {room.question || room.subtitle || "Listen carefully before answering."}
      </h3>

      {isMuted && (
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#A88145] mb-8 border border-[#e3c485]/20 bg-[#e3c485]/5 px-3 py-1 rounded-sm">
          Please unmute sound at the top of the page to hear this landscape.
        </p>
      )}

      {/* play button */}
      <button
        onClick={handlePlaySound}
        disabled={isSubmitted}
        className={`mb-10 w-16 h-16 rounded-full border border-charcoal-900 flex items-center justify-center transition-all cursor-pointer ${
          isPlaying ? "bg-charcoal-900 text-[#FDFDFB] animate-pulse" : "bg-transparent text-charcoal-900 hover:bg-cream-50"
        }`}
        aria-label="Play mystery sound"
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <Play className="w-6 h-6 translate-x-[2px]" />}
      </button>

      {/* choices panels */}
      <div className="grid grid-cols-2 gap-6 w-full mb-8">
        {room.options.map((opt) => {
          const isClicked = selectedOption === opt;
          const isOptCorrect = opt === room.answer;
          const showColors = isSubmitted;

          let cardBorder = "border-cream-300";
          if (showColors) {
            if (isOptCorrect) cardBorder = "border-teal-500 bg-teal-50/20";
            else if (isClicked) cardBorder = "border-red-400 bg-red-50/10";
            else cardBorder = "border-cream-200 opacity-30";
          } else {
            cardBorder = "border-cream-300 hover:border-charcoal-400 bg-cream-50/50 hover:bg-cream-50";
          }

          return (
            <button
              key={opt}
              disabled={isSubmitted}
              onClick={() => handleSelect(opt)}
              className={`p-6 rounded-lg border text-center flex flex-col items-center justify-center gap-3 transition-all duration-300 focus:outline-hidden ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              } ${cardBorder}`}
            >
              <span className="font-serif text-sm text-charcoal-900">
                {opt}
              </span>
            </button>
          );
        })}
      </div>

      {/* result reveal text */}
      <div className="w-full flex flex-col items-center justify-center">
        <AnimatePresence>
          {isSubmitted && selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-cream-200/40 border border-cream-300/80 p-5 rounded-lg flex flex-col gap-2"
            >
              <h4 className="font-serif text-xs text-charcoal-400 uppercase tracking-widest font-semibold">
                {isCorrect ? "✨ Correct!" : `❌ Answer is ${room.answer}`}
              </h4>
              <p className="font-sans text-xs text-charcoal-600 leading-relaxed">
                {room.result?.story || "Your guess has been recorded."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
