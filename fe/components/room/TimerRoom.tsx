"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimerRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    target?: number;
    buttonText?: string;
  };
  onSubmit: (value: number) => void;
  isSubmitted?: boolean;
  selectedResponse?: number;
}

export default function TimerRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: TimerRoomProps) {
  const targetSeconds = room.target || 8;
  const [gameState, setGameState] = useState<"idle" | "running" | "stopped">(isSubmitted ? "stopped" : "idle");
  const [elapsedTime, setElapsedTime] = useState(selectedResponse || 0);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleStart = () => {
    if (isSubmitted) return;
    setGameState("running");
    setElapsedTime(0);
    startTimeRef.current = performance.now();
    
    const updateTimer = () => {
      if (startTimeRef.current !== null) {
        setElapsedTime((performance.now() - startTimeRef.current) / 1000);
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      }
    };
    animationFrameRef.current = requestAnimationFrame(updateTimer);
  };

  const handleStop = () => {
    if (isSubmitted) return;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setGameState("stopped");
    startTimeRef.current = null;
    
    // Calculate final time and submit immediately
    const finalTime = Number(((performance.now() - (startTimeRef.current ?? performance.now())) / 1000).toFixed(2));
    setElapsedTime(finalTime);
    onSubmit(finalTime);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const difference = Math.abs(elapsedTime - targetSeconds);
  const accuracy = Math.max(0, 100 - (difference / targetSeconds) * 100).toFixed(1);

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-6 max-w-md mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-4 leading-relaxed">
        {room.question || room.subtitle || `Stop at Exactly ${targetSeconds} Seconds`}
      </h3>
      <p className="font-sans text-xs text-charcoal-400 text-center mb-10 max-w-xs leading-relaxed">
        Close your eyes, count the rhythm in your head, and press stop when you think you've hit the mark.
      </p>

      {/* Visual ring area */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-10">
        {/* Pulsing ring during game */}
        <AnimatePresence>
          {gameState === "running" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [0.95, 1.15, 0.95],
                opacity: [0.2, 0.5, 0.2]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border-2 border-sage-500/40"
            />
          )}
        </AnimatePresence>

        <div className="w-48 h-48 rounded-full border border-cream-200 bg-cream-50/50 shadow-inner flex flex-col items-center justify-center text-center p-6 relative">
          <AnimatePresence mode="wait">
            {gameState === "idle" && (
              <motion.span
                key="ready"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="font-mono text-xs uppercase tracking-widest text-charcoal-400 font-semibold"
              >
                Ready
              </motion.span>
            )}

            {gameState === "running" && (
              <motion.div
                key="running"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-mono text-3xl font-light text-charcoal-300">
                  ? ? . ?
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 opacity-60">
                  Counting...
                </span>
              </motion.div>
            )}

            {gameState === "stopped" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="font-mono text-4xl font-light text-charcoal-900">
                  {elapsedTime.toFixed(2)}s
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-sage-600 font-bold">
                  {accuracy}% Accuracy
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="h-16 flex items-center justify-center">
        {gameState === "idle" && (
          <button
            onClick={handleStart}
            className="px-8 py-3 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-[#FDFDFB] font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            Start
          </button>
        )}

        {gameState === "running" && (
          <button
            onClick={handleStop}
            className="px-8 py-3 rounded-full border border-red-500 bg-red-500 hover:bg-red-600 text-[#FDFDFB] font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer shadow-md"
          >
            {room.buttonText || "Stop"}
          </button>
        )}
      </div>
    </div>
  );
}
