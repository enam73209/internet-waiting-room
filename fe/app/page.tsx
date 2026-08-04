"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import InteractiveDoor from "@/components/ui/InteractiveDoor";

export default function MarketingPage() {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [visitorCount, setVisitorCount] = useState(18492);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  // Canvas floating dust particles (light sage-500 tint, subtle against light background)
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
        if (dist < 130) {
          const force = (130 - dist) / 130;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 1.0;
          p.y += Math.sin(angle) * force * 1.0;
          p.alpha = Math.min(0.45, p.alpha + 0.01);
        } else {
          if (p.alpha > p.originalAlpha) {
            p.alpha -= 0.002;
          }
        }

        // Loop edges
        if (p.y < -10) {
          p.y = height + 10;
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

  // Increment visitor count slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount((c) => c + 1);
    }, 16000 + Math.random() * 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col justify-center relative select-none">
      
      {/* Background soft spotlight following cursor */}
      <div 
        className="fixed inset-0 pointer-events-none transition-transform duration-1000 ease-out z-0"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 3}% ${40 + mousePos.y * 3}%, rgba(196, 175, 140, 0.04) 0%, rgba(251, 249, 246, 0) 70%)`
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
            transform: `translate3d(${mousePos.x * -2}px, ${mousePos.y * -2}px, 0)`
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

            {/* Live activity count */}
            <div className="flex flex-col gap-1 font-mono text-[10px] uppercase tracking-wider text-sage-500 font-semibold mt-2">
              <span className="text-[9px] text-charcoal-400/40 font-mono">Live Activity</span>
              <div className="text-charcoal-600">
                Today{" "}
                <span className="inline-flex overflow-hidden relative align-bottom h-4 px-0.5">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={visitorCount}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="font-mono text-charcoal-900 font-bold"
                    >
                      {visitorCount.toLocaleString()}
                    </motion.span>
                  </AnimatePresence>
                </span>{" "}
                visitors have already opened Door One.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Reusable Door (Hero/CTA) */}
        <div className="relative z-20">
          <InteractiveDoor 
            id={1} 
            size="lg" 
            onOpenComplete={() => router.push("/today")} 
          />
        </div>

      </main>
    </div>
  );
}
