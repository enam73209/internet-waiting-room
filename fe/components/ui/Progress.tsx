import React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
  barClassName?: string;
}

export default function Progress({ value, className, barClassName }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn("w-full h-1.5 bg-cream-200 rounded-full overflow-hidden select-none", className)}>
      <div
        className={cn("h-full bg-sage-500 rounded-full transition-all duration-500 ease-out", barClassName)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
