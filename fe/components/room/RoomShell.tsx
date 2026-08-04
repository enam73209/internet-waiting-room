"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dailySet from "@/data/dailySet.json";

// Specific interaction components
import MoodRoom from "./MoodRoom";
import RatingRoom from "./RatingRoom";
import ActionRoom from "./ActionRoom";
import PreferenceRoom from "./PreferenceRoom";
import TimerRoom from "./TimerRoom";
import GuessRoom from "./GuessRoom";
import DilemmaRoom from "./DilemmaRoom";
import SoundRoom from "./SoundRoom";
import TriviaRoom from "./TriviaRoom";
import CanvasRoom from "./CanvasRoom";

// Reusable components
import CommunityChart from "../charts/CommunityChart";
import InteractiveDoor from "../ui/InteractiveDoor";

interface RoomShellProps {
  room: any;
}

export default function RoomShell({ room }: RoomShellProps) {
  const router = useRouter();
  const [stage, setStage] = useState<"interact" | "reveal">("interact");
  const { submitResponse, completeRoom, setRoomIndex, responses } = useRoomStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  // Find index in daily set
  const roomIndex = dailySet.rooms.indexOf(Number(room.id));

  // Reset stage when room ID changes
  useEffect(() => {
    setStage("interact");
  }, [room.id]);

  // Smooth scroll to reveal on mobile only
  useEffect(() => {
    if (stage === "reveal" && typeof window !== "undefined") {
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          rightColRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    }
  }, [stage]);

  const handleResponseSubmit = (value: any) => {
    submitResponse(room.id, value);
    completeRoom(room.id);
    setStage("reveal");
  };

  const handleNextDoor = () => {
    const nextIndex = roomIndex + 1;
    if (nextIndex < dailySet.rooms.length) {
      setRoomIndex(nextIndex);
      router.replace(`/room/${dailySet.rooms[nextIndex]}`);
    } else {
      router.replace("/complete");
    }
  };

  // Canvas floating dust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = 20;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -0.1 - Math.random() * 0.15,
      size: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.1 + 0.03,
      originalAlpha: Math.random() * 0.1 + 0.03,
      wobbleSpeed: Math.random() * 0.01 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.vy;
        p.angle += p.wobbleSpeed;
        p.x += Math.sin(p.angle) * 0.08 + p.vx;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 122, 102, ${p.alpha})`; // subtle sage dust
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const renderInteractBlock = () => {
    const isSubmitted = stage === "reveal";
    const selectedResponse = responses[room.id];

    switch (room.type) {
      case "mood":
        return <MoodRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "rating":
        return <RatingRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "action":
        return <ActionRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "preference":
        return <PreferenceRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "timer":
        return <TimerRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "guess":
        return <GuessRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "dilemma":
        return <DilemmaRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "sound":
        return <SoundRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "trivia":
        return <TriviaRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      case "canvas":
        return <CanvasRoom room={room} onSubmit={handleResponseSubmit} isSubmitted={isSubmitted} selectedResponse={selectedResponse} />;
      default:
        return <div className="text-center font-mono text-xs py-12 text-charcoal-400">Undefined Interaction</div>;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-6 relative">
      
      {/* Ambient floating dust particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 opacity-70" />

      {/* Main room layout grid */}
      <div className="relative w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-20 px-4">
        
        {/* Left Side: MCQ Option Quiz */}
        <div className="flex-1 flex flex-col justify-center items-center max-w-xl w-full">
          {/* Header metadata */}
          <div className="text-center mb-6 w-full select-none">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] font-semibold">
              Door {roomIndex !== -1 ? roomIndex + 1 : "?"} of {dailySet.rooms.length}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 tracking-tight mt-2 leading-tight">
              {room.title}
            </h2>
            <p className="font-sans text-xs text-charcoal-400 max-w-sm mx-auto mt-3 leading-relaxed">
              {room.subtitle || room.description}
            </p>
          </div>

          {/* MCQ Quiz Content Card */}
          <div className="w-full bg-[#FFF9F6]/40 border border-cream-200 rounded-lg p-6 md:p-8 shadow-xs backdrop-blur-xs">
            {renderInteractBlock()}
          </div>

          {/* Desktop Reveal Segment (rendered side-by-side underneath the MCQ card) */}
          {stage === "reveal" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="hidden lg:flex flex-row gap-8 w-full mt-8 border-t border-cream-200/50 pt-6 items-center"
            >
              <div className="flex-1 text-left select-none">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] font-semibold">
                  Community Snapshot
                </span>
                <p className="font-serif text-sm italic text-charcoal-600 leading-relaxed mt-1.5">
                  &ldquo;{room.result?.story || room.revealNarrative || ""}&rdquo;
                </p>
              </div>
              <div className="w-64 flex justify-center py-2 bg-cream-50/10 rounded-md border border-cream-200/40">
                <CommunityChart type={room.type} data={room.result?.stats || room.revealStatistics || []} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Side: Door CTA / Mobile Reveal */}
        <div 
          ref={rightColRef}
          className="w-full lg:w-80 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-cream-200/50 pt-10 lg:pt-0 lg:pl-12 min-h-[380px] z-20"
        >
          {stage === "interact" ? (
            /* Locked State */
            <div className="flex flex-col items-center justify-center text-center gap-6">
              <InteractiveDoor 
                id={roomIndex !== -1 ? roomIndex + 1 : 1}
                isLocked={true}
                size="md"
              />
              <p className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 opacity-60 max-w-[200px] leading-relaxed">
                Choose an option to unlock the door
              </p>
            </div>
          ) : (
            /* Revealed State */
            <div className="flex flex-col items-center w-full gap-6">
              
              {/* Mobile-only Reveal Segment (hidden on desktop lg) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:hidden w-full flex flex-col items-center gap-6 mb-2"
              >
                <div className="text-center max-w-xs select-none">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] font-semibold">
                    Community Snapshot
                  </span>
                  <p className="font-serif text-sm italic text-charcoal-600 leading-relaxed mt-2">
                    &ldquo;{room.result?.story || room.revealNarrative || ""}&rdquo;
                  </p>
                </div>
                <div className="w-full max-w-xs flex justify-center py-2 bg-cream-50/10 rounded-md border border-cream-200/40">
                  <CommunityChart type={room.type} data={room.result?.stats || room.revealStatistics || []} />
                </div>
              </motion.div>

              {/* Door CTA (Stays vertically centered on desktop) */}
              <div className="flex flex-col items-center gap-4">
                <InteractiveDoor 
                  id={roomIndex !== -1 ? roomIndex + 2 : 2}
                  isLocked={false}
                  size="md"
                  onOpenComplete={handleNextDoor}
                  nextLabel={roomIndex + 1 < dailySet.rooms.length ? `Enter Door ${roomIndex + 2}` : "Enter Final Sanctuary"}
                />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] font-semibold animate-pulse">
                  Click the door to proceed
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
