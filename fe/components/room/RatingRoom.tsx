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
}

export default function RatingRoom({ room, onSubmit }: RatingRoomProps) {
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const scaleLimit = room.scale || 5;

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center select-none py-8 max-w-md mx-auto">
      <h3 className="font-serif text-lg text-charcoal-900 text-center mb-10 leading-relaxed">
        {room.question || room.subtitle || "How would you rate this?"}
      </h3>

      {/* star rating buttons row */}
      <div className="flex items-center gap-4 mb-12">
        {Array.from({ length: scaleLimit }).map((_, idx) => {
          const starVal = idx + 1;
          const isActive = hovered !== null ? starVal <= hovered : starVal <= rating;

          return (
            <button
              key={starVal}
              type="button"
              onClick={() => setRating(starVal)}
              onMouseEnter={() => setHovered(starVal)}
              onMouseLeave={() => setHovered(null)}
              className="p-1 focus:outline-hidden transform transition-transform active:scale-90 cursor-pointer"
              aria-label={`Rate ${starVal} out of ${scaleLimit}`}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Star
                  className={`w-10 h-10 transition-colors duration-200 ${
                    isActive
                      ? "fill-gold-500 text-gold-500"
                      : "fill-transparent text-cream-400 hover:text-gold-400"
                  }`}
                />
              </motion.div>
            </button>
          );
        })}
      </div>

      <div className="h-14">
        {rating > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-sm tracking-wide transition-all duration-300 transform active:scale-98 cursor-pointer"
          >
            {room.buttonText || "Submit Rating"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
