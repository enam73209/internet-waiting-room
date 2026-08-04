"use client";

import React, { useState } from "react";
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
}

export default function GuessRoom({ room, onSubmit }: GuessRoomProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  const isCorrect = selectedOption === room.answer;

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4 max-w-xl mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-8 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Can you spot the difference?"}
      </h3>

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
          } else {
            cardBorder = "border-cream-300 hover:border-charcoal-400 bg-cream-50/50 hover:bg-cream-50";
          }

          return (
            <button
              key={opt}
              disabled={isSubmitted}
              onClick={() => handleSelect(opt)}
              className={`p-6 rounded-lg border text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 focus:outline-hidden cursor-pointer ${cardBorder}`}
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
      <div className="min-h-[120px] w-full flex flex-col items-center justify-center">
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full bg-cream-200/40 border border-cream-300/80 p-5 rounded-lg flex flex-col gap-2 mb-6"
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

      {/* continue button */}
      <div className="h-14">
        {isSubmitted && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="px-8 py-3 rounded-full border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50 font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            {room.buttonText || "Continue"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
