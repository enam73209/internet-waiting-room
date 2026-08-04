"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2.5 rounded-full font-serif text-xs uppercase tracking-widest transition-all duration-300 transform active:scale-98 disabled:opacity-30 disabled:pointer-events-none focus:outline-hidden";

  const variants = {
    primary: "bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 shadow-md hover:shadow-lg",
    secondary: "bg-cream-200 hover:bg-cream-300 text-charcoal-900 border border-cream-300",
    outline: "border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50 text-charcoal-900",
    ghost: "text-charcoal-400 hover:text-charcoal-900 hover:bg-cream-50/50",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
