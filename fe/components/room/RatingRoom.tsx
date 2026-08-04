"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface RatingRoomProps {
  room: {
    id: number | string;
    question?: string;
    subtitle?: string;
    scale?: number;
    buttonText?: string;
  };
  onSubmit: (value: number) => void;
  isSubmitted?: boolean;
  selectedResponse?: number;
}

export default function RatingRoom({ 
  room, 
  onSubmit, 
  isSubmitted = false, 
  selectedResponse 
}: RatingRoomProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const rating = selectedResponse || 0;
  const scaleLimit = room.scale || 5;

  const handleSelect = (starVal: number) => {
    if (isSubmitted) return;
    onSubmit(starVal);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-8 max-w-md mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-6 leading-relaxed">
        {room.question || room.subtitle || "How would you rate this?"}
      </h3>

      {/* Potato Image */}
      <div className="w-36 h-36 rounded-full overflow-hidden border border-cream-300 shadow-xs mb-8 bg-cream-50 flex items-center justify-center relative select-none">
        <img 
          src="/images/happy-potato.png" 
          alt="Today's Potato" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* star rating buttons row */}
      <div className="flex items-center gap-4">
        {Array.from({ length: scaleLimit }).map((_, idx) => {
          const starVal = idx + 1;
          const isActive = hovered !== null ? starVal <= hovered : starVal <= rating;

          return (
            <button
              key={starVal}
              type="button"
              disabled={isSubmitted}
              onClick={() => handleSelect(starVal)}
              onMouseEnter={() => !isSubmitted && setHovered(starVal)}
              onMouseLeave={() => !isSubmitted && setHovered(null)}
              className={`p-1 focus:outline-hidden transform transition-transform ${
                isSubmitted ? "cursor-default" : "active:scale-90 cursor-pointer"
              }`}
              aria-label={`Rate ${starVal} out of ${scaleLimit}`}
            >
              <motion.div
                whileHover={isSubmitted ? {} : { scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Star
                  className={`w-10 h-10 transition-colors duration-200 ${
                    isActive
                      ? "fill-gold-500 text-gold-500"
                      : "fill-transparent text-cream-400 hover:text-gold-400"
                  } ${isSubmitted && starVal > rating ? "opacity-30" : "opacity-100"}`}
                />
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
