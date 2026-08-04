"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { doorTransitionState } = useRoomStore();
  const isTransitioning = doorTransitionState === "transitioning";

  return (
    <motion.div
      animate={
        isTransitioning
          ? { scale: 0.94, filter: "blur(3px)", opacity: 0.5 }
          : { scale: 1, filter: "blur(0px)", opacity: 1 }
      }
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}
