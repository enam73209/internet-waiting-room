"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";
import appConfig from "@/data/appConfig.json";
import RevealCard from "./RevealCard";
import Narrative from "./Narrative";
import Counter from "../animation/Counter";

interface RevealSequenceProps {
  roomId: string;
  revealNarrative: string;
  onNextDoor: () => void;
  children: React.ReactNode;
}

const loadingMessages = [
  "Connecting to today's visitors...",
  "Gathering today's choices...",
  "Finding your crowd...",
  "Comparing with thousands..."
];

export default function RevealSequence({
  roomId,
  revealNarrative,
  onNextDoor,
  children,
}: RevealSequenceProps) {
  const { visitorCount, randomizeVisitorCount } = useRoomStore();
  const [step, setStep] = useState<"connecting" | "gathering" | "counting" | "revealed">("connecting");
  const [loadingText, setLoadingText] = useState(loadingMessages[0]);

  useEffect(() => {
    randomizeVisitorCount();
  }, [randomizeVisitorCount]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep("gathering");
      setLoadingText(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
    }, 1400);

    const t2 = setTimeout(() => {
      setStep("counting");
    }, 2800);

    const t3 = setTimeout(() => {
      setStep("revealed");
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
      <AnimatePresence mode="wait">
        {(step === "connecting" || step === "gathering") && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <RevealCard step={step} loadingText={loadingText} />
          </motion.div>
        )}

        {step === "counting" && (
          <motion.div
            key="counting"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -15 }}
            className="py-12"
          >
            <Counter
              target={visitorCount}
              className="font-mono text-5xl md:text-6xl font-light text-charcoal-900 tracking-tight"
              label="souls paused here today"
            />
          </motion.div>
        )}

        {step === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* Storytelling Narrative */}
            <Narrative text={revealNarrative} />

            {/* Custom Visualizations */}
            <div className="w-full flex justify-center mb-12">
              {children}
            </div>

            {/* Next Room Action */}
            <motion.button
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              onClick={onNextDoor}
              className="px-8 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-98 cursor-pointer"
            >
              Open Next Door
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
