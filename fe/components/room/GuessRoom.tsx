"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GuessRoomProps {
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

export default function GuessRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: GuessRoomProps) {
  const selectedOption = selectedResponse || null;
  const isCorrect = selectedOption === room.answer;

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    onSubmit(opt);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4 max-w-xl mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-6 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Can you spot the difference?"}
      </h3>

      {/* The image to guess */}
      <div className="w-full max-w-xs aspect-square rounded-lg overflow-hidden border border-cream-300 shadow-xs mb-6 relative bg-cream-100 flex items-center justify-center select-none">
        <img 
          src="/images/room6-guess.png" 
          alt="AI or Real?" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Choice split cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
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
              className={`p-6 rounded-lg border text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 focus:outline-hidden ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              } ${cardBorder}`}
            >
              {/* Outer check circle */}
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  isClicked ? "border-charcoal-900 bg-charcoal-900" : "border-cream-400"
                }`}
              >
                {isClicked && <div className="w-1.5 h-1.5 rounded-full bg-cream-50" />}
              </div>

              <span className="font-serif text-base text-charcoal-900">
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
                {isCorrect ? "✨ Correct Guess!" : `❌ Incorrect Guess`}
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
