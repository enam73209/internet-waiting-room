"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRoomStore } from "@/store/useRoomStore";
import { Trash2 } from "lucide-react";

interface CanvasRoomProps {
  room: {
    id: string;
    question: string;
    extra: {
      brushColor: string;
      backgroundColor: string;
      prompt: string;
    };
  };
  onSubmit: (value: string) => void;
}

export default function CanvasRoom({ room, onSubmit }: CanvasRoomProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const { unlockAchievement } = useRoomStore();

  // Resize canvas for parent bounding box
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on client size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initial canvas setup
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(26, 25, 24, 0.6)"; // Charcoal gray ink look
    ctx.lineWidth = 2.5;

    // Reset draw flag
    setHasDrawn(false);
  }, []);

  // Drawing Helper coords helper
  const getCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Prevent default scroll behaviors on mobile touch
    if (e.cancelable) e.preventDefault();

    const coords = getCoords(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();

    const coords = getCoords(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSubmit = () => {
    if (hasDrawn) {
      unlockAchievement("achieve-artist");
      
      // Convert canvas to image string to represent the " archived signature"
      const canvas = canvasRef.current;
      const dataUrl = canvas ? canvas.toDataURL() : "empty";
      onSubmit(dataUrl);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-4">
      <div className="text-center mb-8 max-w-sm">
        <h3 className="font-serif text-xl text-charcoal-900 leading-relaxed mb-2">
          {room.question}
        </h3>
        <p className="font-sans text-xs text-charcoal-400 italic">
          {room.extra.prompt}
        </p>
      </div>

      {/* Drawing board container */}
      <div className="relative w-full max-w-lg aspect-video border border-cream-300 rounded-lg overflow-hidden bg-cream-50/20 shadow-xs mb-8">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair touch-none"
        />

        {/* Clear Button floating inside canvas */}
        {hasDrawn && (
          <button
            onClick={clearCanvas}
            className="absolute bottom-4 right-4 p-2 rounded-full border border-cream-300 hover:border-red-300 bg-cream-50 hover:bg-red-50 text-charcoal-400 hover:text-red-500 transition-colors shadow-xs"
            aria-label="Clear canvas drawing"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Submit Choice */}
      <div className="h-14">
        {hasDrawn && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-98"
          >
            Archive Drawing
          </motion.button>
        )}
      </div>
    </div>
  );
}
