"use client";

import React, { useEffect } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { audioEngine } from "@/lib/audioEngine";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function SoundControl() {
  const { isMuted, setIsMuted, activeSounds } = useRoomStore();

  useEffect(() => {
    // Sync the background ambient drone and chimes based on isMuted
    if (!audioEngine) return;

    if (!isMuted) {
      audioEngine.startDrone();
      audioEngine.startChimes();
      
      // Also start any custom room sounds if they were toggled
      if (activeSounds.includes("rain")) audioEngine.startRain();
      if (activeSounds.includes("fire")) audioEngine.startFire();
    } else {
      audioEngine.stopDrone();
      audioEngine.stopChimes();
      audioEngine.stopRain();
      audioEngine.stopFire();
    }
  }, [isMuted, activeSounds]);

  const handleToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-3 px-4 py-2 rounded-full border border-cream-300 hover:border-charcoal-400 bg-cream-50/50 hover:bg-cream-50 transition-all duration-300 text-charcoal-900 group shadow-sm z-50 pointer-events-auto"
      aria-label={isMuted ? "Unmute ambient museum sounds" : "Mute ambient museum sounds"}
    >
      <span className="font-mono text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
        {isMuted ? "Sound Off" : "Sound On"}
      </span>
      
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isMuted ? (
          <VolumeX className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="flex gap-[2px] items-end h-3 w-4">
            {/* Elegant bobbing equalizer bars */}
            <motion.span
              animate={{ height: ["20%", "90%", "20%"] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              className="w-[2px] bg-charcoal-900 rounded-xs"
            />
            <motion.span
              animate={{ height: ["40%", "100%", "40%"] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              className="w-[2px] bg-charcoal-900 rounded-xs"
            />
            <motion.span
              animate={{ height: ["30%", "80%", "30%"] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="w-[2px] bg-charcoal-900 rounded-xs"
            />
          </div>
        )}
      </div>
    </button>
  );
}
