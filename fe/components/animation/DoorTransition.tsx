"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";

export default function DoorTransition({ children }: { children: React.ReactNode }) {
  const { doorTransitionState } = useRoomStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full flex-1 flex flex-col bg-[#FBF9F6]">{children}</div>;
  }

  const isTransitioning = doorTransitionState === "transitioning";

  return (
    <div className="w-full flex-1 flex flex-col bg-cream-100 relative">
      
      {/* Page Content */}
      {children}

      {/* Signature Door Animation Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/60 backdrop-blur-xs"
          >
            {/* 3D Perspective Wrapper */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-80 h-[460px] flex items-center justify-center"
              style={{ perspective: "1500px" }}
            >
              {/* Backlight (Warm Golden Glow Behind Door) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.9, scale: 1.1 }}
                transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
                className="absolute inset-4 z-0 rounded-sm bg-gradient-to-r from-amber-400 via-gold-500 to-amber-500 blur-2xl"
              />

              {/* Door Frame */}
              <div className="absolute inset-0 z-10 border-[6px] border-cream-300 rounded-xs shadow-2xl flex items-center justify-center overflow-hidden bg-cream-400">
                {/* Yellow light wash in doorway */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-300/90 via-amber-100 to-white z-0" />

                {/* Door Leaf */}
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -105 }}
                  transition={{ delay: 0.15, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                  }}
                  className="absolute inset-0 bg-cream-200 border-l-[3px] border-cream-300 flex flex-col items-end justify-center pr-6 shadow-md z-10"
                >
                  {/* Wooden Paneling Lines */}
                  <div className="absolute inset-3 border border-cream-300/70 rounded-xs pointer-events-none" />
                  <div className="absolute inset-6 border border-cream-300/40 rounded-xs pointer-events-none" />

                  {/* Center panel carve simulation */}
                  <div className="absolute inset-y-12 left-8 right-12 border border-cream-300/80 bg-cream-50/20 rounded-xs shadow-inner pointer-events-none" />

                  {/* Door Handle */}
                  <div className="relative mr-1 flex flex-col items-center z-20">
                    {/* Metal plate */}
                    <div className="w-3 h-10 bg-gold-600 rounded-xs border border-gold-500 shadow-xs" />

                    {/* Handle bar rotating */}
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: 48 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ transformOrigin: "5px 5px" }}
                      className="absolute top-1 right-[-4px] w-8 h-2 bg-gold-500 rounded-sm border border-gold-600 shadow-sm"
                    />
                  </div>
                </motion.div>

                {/* Zoom Flash Light Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.4 }}
                  className="absolute inset-0 bg-white z-30 pointer-events-none"
                />
              </div>

              {/* Camera Zoom Motion Effect */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 4.8 }}
                transition={{ delay: 0.28, duration: 0.72, ease: [0.55, 0.055, 0.675, 0.19] }}
                className="absolute inset-0 pointer-events-none z-40"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
