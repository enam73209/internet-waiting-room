"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";
import dailySet from "@/data/dailySet.json";

const numberWords: Record<number, string> = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven"
};

export default function TodayRedirect() {
  const router = useRouter();
  const { completedRooms, setRoomIndex } = useRoomStore();
  const [step, setStep] = useState(0);
  const [roomName, setRoomName] = useState("One");

  useEffect(() => {
    // Determine the first uncompleted room
    const firstUncompletedId = dailySet.rooms.find((id) => !completedRooms.includes(id));
    let nextUrl = "/complete";
    let word = "One";

    if (firstUncompletedId) {
      const idx = dailySet.rooms.indexOf(firstUncompletedId);
      setRoomIndex(idx);
      nextUrl = `/room/${firstUncompletedId}`;
      word = numberWords[firstUncompletedId] || "One";
    }

    setRoomName(word);

    // Sequential steps
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 700);

    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1450);

    const timer3 = setTimeout(() => {
      router.replace(nextUrl);
    }, 2250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router, completedRooms, setRoomIndex]);

  const messages = [
    "Connecting today's visitors...",
    `Preparing Room ${roomName}...`,
    "Opening today's journey..."
  ];

  return (
    <div className="fixed inset-0 w-full h-full bg-[#FBF9F6] z-[60] flex flex-col items-center justify-center select-none">
      <div className="relative h-16 flex items-center justify-center w-full max-w-lg px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute font-serif text-lg md:text-xl italic text-charcoal-900/90 tracking-wide"
          >
            {messages[step]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
