"use client";

import React, { useEffect, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number;
  className?: string;
  label?: string;
}

export default function Counter({ target, duration = 1200, className = "", label = "" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = Math.max(0, target - 50);
    setCount(start);

    let current = start;
    const increment = 1;
    const intervalTime = Math.max(15, duration / (target - start));

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className={className}>{count}</span>
      {label && <p className="font-serif text-sm italic text-charcoal-400">{label}</p>}
    </div>
  );
}
