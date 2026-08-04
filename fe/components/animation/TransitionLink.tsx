"use client";

import React from "react";
import { useDoorTransition } from "@/hooks/useDoorTransition";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function TransitionLink({ href, children, className = "", onClick }: TransitionLinkProps) {
  const { transitionTo } = useDoorTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick();
    transitionTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
