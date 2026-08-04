import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "paper" | "simple";
}

export default function Card({
  variant = "paper",
  className,
  children,
  ...props
}: CardProps) {
  const baseStyles = "rounded-lg border transition-all duration-300";

  const variants = {
    paper: "bg-cream-50/50 border-cream-200 shadow-xs hover:shadow-md",
    glass: "bg-cream-50/30 border-cream-100 shadow-xs", // Minimal transparency but no heavy glassmorphism
    simple: "border-cream-300 bg-transparent",
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
