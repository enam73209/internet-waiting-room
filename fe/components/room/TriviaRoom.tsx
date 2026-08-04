"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TriviaRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    options?: string[];
    answer: string;
    buttonText?: string;
    result?: {
      fact?: string;
      story?: string;
    };
  };
  onSubmit: (value: string) => void;
  isSubmitted?: boolean;
  selectedResponse?: string;
}

export default function TriviaRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: TriviaRoomProps) {
  const [textGuess, setTextGuess] = useState("");
  const isTextMode = !room.options || room.options.length === 0;

  const selectedOption = selectedResponse || (isTextMode ? textGuess : null);
  const isCorrect = isTextMode
    ? (selectedResponse || textGuess).trim().toLowerCase() === room.answer.toLowerCase()
    : selectedOption === room.answer;

  const handleOptionSelect = (opt: string) => {
    if (isSubmitted) return;
    onSubmit(opt);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textGuess.trim() || isSubmitted) return;
    onSubmit(textGuess);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4 max-w-xl mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-8 max-w-md leading-relaxed">
        {room.question || room.subtitle || "Can you guess the answer?"}
      </h3>

      {isTextMode ? (
        /* Text Input Mode */
        <form onSubmit={handleTextSubmit} className="w-full max-w-sm mb-8 flex flex-col gap-4">
          <input
            type="text"
            disabled={isSubmitted}
            value={isSubmitted ? (selectedResponse || "") : textGuess}
            onChange={(e) => setTextGuess(e.target.value)}
            placeholder="Type your guess..."
            className="w-full bg-cream-50/50 border border-cream-300 rounded-lg px-4 py-3 font-sans text-sm text-charcoal-900 focus:outline-hidden focus:border-charcoal-900 text-center transition-all shadow-xs"
          />
          {!isSubmitted && (
            <button
              type="submit"
              disabled={!textGuess.trim()}
              className="px-6 py-2.5 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-[#FDFDFB] font-serif text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Verify Guess
            </button>
          )}
        </form>
      ) : (
        /* Multiple Choice Mode */
        <div className="flex flex-col gap-4 w-full mb-8">
          {room.options?.map((opt) => {
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
                onClick={() => handleOptionSelect(opt)}
                className={`w-full text-left p-4 rounded-lg border flex items-center justify-between transition-all duration-300 focus:outline-hidden ${
                  isSubmitted ? "cursor-default" : "cursor-pointer"
                } ${cardBorder}`}
              >
                <span className="font-serif text-sm text-charcoal-900 pr-6">
                  {opt}
                </span>
                
                {showColors && isOptCorrect && (
                  <span className="font-mono text-[9px] uppercase tracking-widest text-teal-600 font-semibold pl-2">
                    Correct
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* etymology reveal text */}
      <div className="w-full flex flex-col items-center justify-center">
        <AnimatePresence>
          {isSubmitted && (
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
                {room.result?.fact || room.result?.story || "Your guess has been recorded."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
