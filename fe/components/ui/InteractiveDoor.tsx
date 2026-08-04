"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/useSound";

interface InteractiveDoorProps {
  id: number;
  isLocked?: boolean;
  onOpenComplete?: () => void;
  onIdleEvent?: (event: "flicker" | "wiggle") => void;
  size?: "sm" | "md" | "lg";
  nextLabel?: string;
}

export default function InteractiveDoor({
  id,
  isLocked = false,
  onOpenComplete,
  onIdleEvent,
  size = "md",
  nextLabel,
}: InteractiveDoorProps) {
  const { playDoorHoverCreak, playHandleClick, playDoorOpen, playChime, isMuted } = useSound();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [handleWiggle, setHandleWiggle] = useState(false);
  const [lightFlicker, setLightFlicker] = useState(1.0);
  const [hasPlayedHoverCreak, setHasPlayedHoverCreak] = useState(false);

  // Track mouse coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Idle animations (every 12 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (isOpening || isLocked) return;

      // Notify parent of wiggle/flicker event
      if (onIdleEvent) onIdleEvent("wiggle");

      // Handle wiggle
      setHandleWiggle(true);
      setTimeout(() => setHandleWiggle(false), 600);

      // Light flicker under door
      let ticks = 0;
      const flicker = setInterval(() => {
        setLightFlicker(0.5 + Math.random() * 0.5);
        ticks++;
        if (ticks > 12) {
          clearInterval(flicker);
          setLightFlicker(1.0);
        }
      }, 70);

      // Faint ambient sound (bird chirp or piano chime or hover creak)
      if (Math.random() < 0.4 && !isMuted) {
        const rand = Math.random();
        if (rand < 0.45) {
          playDoorHoverCreak();
        } else {
          playChime();
        }
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [isMuted, isOpening, isLocked, playChime, playDoorHoverCreak, onIdleEvent]);

  // Hover sound plays exactly once per hover
  const handleMouseEnter = () => {
    if (isLocked || isOpening) return;
    setIsHovering(true);
    if (!hasPlayedHoverCreak) {
      playDoorHoverCreak();
      setHasPlayedHoverCreak(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHasPlayedHoverCreak(false); // Reset trigger so it plays on next enter
  };

  const handleClick = () => {
    if (isLocked || isOpening) return;
    setIsOpening(true);
    playHandleClick();

    setTimeout(() => {
      playDoorOpen();
      setTimeout(() => {
        if (onOpenComplete) onOpenComplete();
      }, 1700);
    }, 300);
  };

  // Sizing mappings
  const sizeClasses = {
    sm: "w-40 h-[240px] md:w-44 md:h-[270px]",
    md: "w-48 h-[290px] md:w-56 md:h-[340px]",
    lg: "w-64 h-[380px] md:w-72 md:h-[430px]"
  };

  const numberWords: Record<number, string> = {
    1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six", 7: "Seven", 8: "Eight", 9: "Nine"
  };
  const targetLabel = nextLabel || (id === 1 ? "Click to Open Today's First Door" : `Enter Door ${numberWords[id] || id}`);

  // Reflected specular highlights on brass handle based on mouse pos
  const handleSpecularAngle = 135 + mousePos.x * 20 + mousePos.y * 10;

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Perspective Wrapper */}
      <div 
        className={`relative flex items-center justify-center transition-all duration-1000 ease-out ${sizeClasses[size]}`}
        style={{ 
          perspective: "1200px",
          transform: `translate3d(${mousePos.x * -4}px, ${mousePos.y * -4}px, 0) scale(${isOpening ? 6 : 1})`,
          transformStyle: "preserve-3d",
          pointerEvents: isOpening || isLocked ? "none" : "auto",
          opacity: isOpening ? 0 : 1,
          transition: isOpening ? "transform 1.7s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.4s ease-out 1.2s" : "transform 0.8s ease-out"
        }}
      >
        
        {/* Tooltip */}
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 z-30"
          style={{
            opacity: isHovering && !isOpening && !isLocked ? 1 : 0,
            transform: `translate3d(-50%, ${isHovering && !isOpening ? 0 : 8}px, 0)`
          }}
        >
          <div className="bg-[#1A1918] border border-cream-300 text-[#FDFDFB] px-4 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-widest whitespace-nowrap shadow-xl">
            {targetLabel}
          </div>
        </div>

        {/* Breathing backlight glow */}
        <motion.div 
          animate={
            isOpening 
              ? { opacity: 0.95, scale: 1.4 } 
              : isHovering 
                ? { opacity: 0.65, scale: 1.15 } 
                : { opacity: [0.25, 0.42, 0.25], scale: [1.0, 1.05, 1.0] }
          }
          transition={
            isOpening || isHovering 
              ? { duration: 0.6 } 
              : { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }
          className="absolute inset-2 bg-gradient-to-tr from-amber-400/20 via-gold-500/10 to-transparent rounded-md blur-xl z-0"
          style={{ transform: "translateZ(-12px)" }}
        />

        {/* Warm light leaking underneath the door frame */}
        <div 
          className="absolute -bottom-1.5 left-2 right-2 h-[3.5px] rounded-full z-0 transition-all duration-500"
          style={{
            background: "radial-gradient(ellipse at center, #ffca6b 0%, #a88145 60%, rgba(0,0,0,0) 100%)",
            boxShadow: isLocked 
              ? "none" 
              : `0 0 ${13 * lightFlicker + (isHovering ? 6 : 0)}px ${4 * lightFlicker + (isHovering ? 2 : 0)}px #e3c485, 
                 0 0 ${25 * lightFlicker}px ${10 * lightFlicker}px rgba(168, 129, 69, 0.3)`,
            opacity: isOpening ? 0 : 1,
          }}
        />

        {/* Door Frame (Fixed border box in 3D) with physical shadow tracking */}
        <div 
          className="absolute inset-0 bg-[#EAE3DC] border-[8px] border-[#DFD5CB] rounded-md flex items-center justify-center overflow-hidden z-10"
          style={{
            transform: `rotateY(${isOpening || isLocked ? 0 : mousePos.x * 5.2}deg) rotateX(${isOpening || isLocked ? 0 : -mousePos.y * 5.2}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.4s ease-out",
            boxShadow: `${mousePos.x * -8}px ${16 + mousePos.y * -8}px 32px rgba(26,25,24,${isHovering ? 0.08 : 0.05}), inset 0 2px 10px rgba(255,255,255,0.4)`
          }}
        >
          
          {/* Internal glowing doorway */}
          <div className="absolute inset-0 bg-[#FFF9F6] flex items-center justify-center z-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isOpening ? { opacity: 1, scale: [1, 2.2] } : { opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-t from-amber-200 via-[#FFF9F6] to-white"
            />
          </div>

          {/* Door Leaf (White Oak Wood panel) */}
          <div 
            className="absolute inset-0 bg-[#EDE6DD] border-l-2 border-l-[#EAE3DC] flex flex-col justify-between p-6 select-none z-10 transition-transform duration-1000 shadow-xl rounded-sm"
            style={{
              transformOrigin: "left center",
              transform: isOpening ? "rotateY(-92deg) translateZ(1.5px)" : "rotateY(0deg)",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isOpening ? "6px 0 20px rgba(0,0,0,0.12)" : "none",
            }}
          >
            {/* Fine white oak wood grain lines (SVG) */}
            <svg 
              className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none select-none" 
              viewBox="0 0 100 200" 
              preserveAspectRatio="none"
            >
              <path d="M 8 0 C 13 40, 4 90, 9 200" stroke="#735422" strokeWidth="0.35" fill="none" />
              <path d="M 18 0 C 12 60, 22 130, 16 200" stroke="#735422" strokeWidth="0.35" fill="none" />
              <path d="M 32 0 C 37 50, 28 110, 34 200" stroke="#735422" strokeWidth="0.35" fill="none" />
              <path d="M 52 0 C 47 70, 56 120, 50 200" stroke="#735422" strokeWidth="0.35" fill="none" />
              <path d="M 68 0 C 72 30, 66 110, 71 200" stroke="#735422" strokeWidth="0.35" fill="none" />
              <path d="M 82 0 C 77 60, 86 140, 80 200" stroke="#735422" strokeWidth="0.35" fill="none" />
              <path d="M 92 0 C 95 80, 89 150, 93 200" stroke="#735422" strokeWidth="0.35" fill="none" />
            </svg>

            {/* Subtle horizontal grain mesh */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage: "repeating-linear-gradient(90deg, #1A1918 0px, #1A1918 1px, transparent 1px, transparent 4px)"
              }}
            />

            {/* Premium Wood Panels with rounded details */}
            <div className="w-full flex-1 flex flex-col gap-4 relative z-10 pb-4 pointer-events-none">
              
              {/* Top Panel */}
              <div className="w-full h-1/2 border border-[#DFD5CB] bg-[#F5EFEB]/50 rounded-sm shadow-[inset_1px_1px_4px_rgba(26,25,24,0.1),1px_1px_0_rgba(255,255,255,0.7)] relative">
                <div className="absolute inset-1.5 border border-[#EAE3DC]/55 rounded-xs" />
              </div>

              {/* Bottom Panel */}
              <div className="w-full h-1/2 border border-[#DFD5CB] bg-[#F5EFEB]/50 rounded-sm shadow-[inset_1px_1px_4px_rgba(26,25,24,0.1),1px_1px_0_rgba(255,255,255,0.7)] relative">
                <div className="absolute inset-1.5 border border-[#EAE3DC]/55 rounded-xs" />
              </div>
            </div>

            {/* Brass Door Handle with Specular specularity catching light */}
            <div 
              className="absolute right-3.5 top-[55%] -translate-y-1/2 flex items-center gap-1 z-20 transition-transform duration-300"
              style={{
                transform: handleWiggle ? "rotate(3deg) translateY(-1px)" : "none"
              }}
            >
              
              {/* Lock plate with light reflection */}
              <div 
                className="w-3.5 h-10 rounded-xs border shadow-[1px_1px_3px_rgba(0,0,0,0.18)] flex flex-col items-center justify-between py-1.5"
                style={{
                  background: `linear-gradient(${handleSpecularAngle}deg, #fceecb 0%, #d8b26e 40%, #a0783c 75%, #684818 100%)`,
                  borderColor: "rgba(168, 129, 69, 0.4)"
                }}
              >
                <div className="w-1 h-1 rounded-full bg-[#3d2e17] shadow-inner" />
                <div className="w-[2px] h-2.5 bg-charcoal-900 rounded-full" />
              </div>

              {/* Handle bar w/ responsive rotation */}
              <div 
                className="relative origin-[3px_3px] transition-transform duration-300"
                style={{
                  transform: isOpening ? "rotate(42deg)" : isHovering ? "rotate(6deg)" : "rotate(0deg)",
                  marginLeft: "-5px"
                }}
              >
                {/* Joint */}
                <div 
                  className="w-1.5 h-1.5 rounded-full border shadow-xs" 
                  style={{
                    background: `linear-gradient(${handleSpecularAngle}deg, #fceecb, #a88145)`,
                    borderColor: "rgba(168, 129, 69, 0.4)"
                  }}
                />
                
                {/* Horizontal Lever */}
                <div 
                  className="absolute left-[2px] top-[0.5px] w-7.5 h-1.5 rounded-r-full border shadow-[1px_1.5px_2px_rgba(0,0,0,0.12)]"
                  style={{
                    background: `linear-gradient(${handleSpecularAngle}deg, #fceecb 0%, #d8b26e 40%, #a0783c 75%, #684818 100%)`,
                    borderColor: "rgba(168, 129, 69, 0.4)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition zoom-in flash overlay */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="fixed inset-0 bg-[#FBF9F6] z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
