"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import InteractiveDoor from "@/components/ui/InteractiveDoor";

export default function MarketingPage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [totalVisitors, setTotalVisitors] = useState(18492);
  const [activeExplorers, setActiveExplorers] = useState(2184);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const triggerBurstRef = useRef<(() => void) | null>(null);

  // Mouse tracking for subtle background shift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Canvas floating dust particles (light-sage, with door idle bursts)
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

    // Initial particles
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -0.1 - Math.random() * 0.2, // slow upward float
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.15 + 0.05,
      originalAlpha: Math.random() * 0.15 + 0.05,
      wobbleSpeed: Math.random() * 0.015 + 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    // SPECULAR DUST BURST: spawn 12 warm rising particles near door base
    triggerBurstRef.current = () => {
      const doorX = width > 1024 ? width / 2 + 200 : width / 2;
      const doorY = height / 2 + 100;
      for (let i = 0; i < 12; i++) {
        particles.push({
          x: doorX + (Math.random() - 0.5) * 80,
          y: doorY + 40,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.7 - Math.random() * 0.9, // float upwards faster
          size: Math.random() * 2.0 + 0.6,
          alpha: 0.65, // brighter
          originalAlpha: Math.random() * 0.12 + 0.04,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          angle: Math.random() * Math.PI * 2,
        });
      }
      
      // Clean up overflow particles
      if (particles.length > 100) {
        particles.splice(0, particles.length - 100);
      }
    };

    let pxMouseX = width / 2;
    let pxMouseY = height / 2;
    const updatePxMouse = (e: MouseEvent) => {
      pxMouseX = e.clientX;
      pxMouseY = e.clientY;
    };
    window.addEventListener("mousemove", updatePxMouse);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.angle += p.wobbleSpeed;
        p.x += Math.sin(p.angle) * 0.1 + p.vx;

        // Mouse repelling
        const dx = p.x - pxMouseX;
        const dy = p.y - pxMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 1.0;
          p.y += Math.sin(angle) * force * 1.0;
          p.alpha = Math.min(0.4, p.alpha + 0.01);
        } else {
          if (p.alpha > p.originalAlpha) {
            p.alpha -= 0.002;
          }
        }

        // Loop edges
        if (p.y < -10) {
          p.y = height + 15;
          p.x = Math.random() * width;
          p.alpha = p.originalAlpha;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

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
      window.removeEventListener("mousemove", updatePxMouse);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Increment total daily visitors (every 9-16 seconds)
  useEffect(() => {
    const updateCount = () => {
      setTotalVisitors((c) => c + 1);
      const nextDelay = 9000 + Math.random() * 7000;
      setTimeout(updateCount, nextDelay);
    };
    const timer = setTimeout(updateCount, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Fluctuating active explorers (every 5-9 seconds)
  useEffect(() => {
    const updateActive = () => {
      setActiveExplorers((c) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const change = Math.floor(Math.random() * 2) + 1;
        const result = c + delta * change;
        return Math.max(2150, Math.min(2230, result));
      });
      const nextDelay = 5000 + Math.random() * 4000;
      setTimeout(updateActive, nextDelay);
    };
    const timer = setTimeout(updateActive, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger particle burst on door idle flicker/wiggle
  const handleDoorIdle = (event: "flicker" | "wiggle") => {
    if (triggerBurstRef.current) {
      triggerBurstRef.current();
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-center relative select-none">
      
      {/* Background soft spotlight following cursor */}
      <div 
        className="fixed inset-0 pointer-events-none transition-transform duration-1000 ease-out z-0 animate-pulse"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 3.5}% ${42 + mousePos.y * 3.5}%, rgba(196, 175, 140, 0.05) 0%, rgba(251, 249, 246, 0) 70%)`,
          animationDuration: "8s"
        }}
      />

      {/* Floating dust particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 opacity-80" />

      {/* MAIN CONTAINER: Placard + Door */}
      <main className="relative flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 z-20 py-8 max-w-5xl mx-auto px-4">
        
        {/* Left Side: Placard (Museum Label) */}
        <div 
          className="flex flex-col max-w-sm md:max-w-md text-left transition-transform duration-1000 ease-out z-20"
          style={{
            transform: `translate3d(${mousePos.x * -1.8}px, ${mousePos.y * -1.8}px, 0)`
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#A88145] mb-2 font-medium">
            Room One
          </span>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-charcoal-900 mb-4 leading-tight">
            The Internet Waiting Room
          </h2>
          <p className="font-serif text-sm md:text-base italic text-charcoal-600 mb-6 leading-relaxed">
            Seven tiny rooms. Seven tiny moments. <br />
            Shared with thousands of people today.
          </p>
          
          <div className="border-t border-cream-300 pt-6 flex flex-col gap-4">
            <p className="font-sans text-xs md:text-sm text-charcoal-400 leading-relaxed">
              No accounts. No endless feeds. No algorithms. Just beautiful little moments waiting behind seven doors.
            </p>

            {/* Animated double counters */}
            <div className="flex flex-col gap-1.5 mt-2">
              <span className="text-[9px] text-charcoal-400/40 font-mono uppercase tracking-wider">Live Activity</span>
              
              {/* Daily total count */}
              <div className="font-mono text-[10px] uppercase text-charcoal-600 font-semibold leading-none">
                Today{" "}
                <span className="inline-flex overflow-hidden relative align-bottom h-4 px-0.5">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={totalVisitors}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="font-mono text-charcoal-900 font-bold"
                    >
                      {totalVisitors.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                visitors have already opened Door One.
              </div>

              {/* Active explorers right now */}
              <div className="flex items-center gap-1.5 text-sage-500 font-mono text-[10px] uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse" />
                <span>
                  <span className="inline-flex overflow-hidden relative align-bottom h-4 px-0.5">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={activeExplorers}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="font-mono text-sage-600 font-bold"
                      >
                        {activeExplorers.toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                  </span>{" "}
                  visitors exploring right now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Reusable Door (Hero/CTA) */}
        <div 
          className="relative z-20 transition-transform duration-1000 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -4}px, ${mousePos.y * -4}px, 0)`
          }}
        >
          <InteractiveDoor 
            id={1} 
            size="lg" 
            onIdleEvent={handleDoorIdle}
            onOpenComplete={() => router.push("/today")} 
          />
        </div>

      </main>
    </div>
  );
}
