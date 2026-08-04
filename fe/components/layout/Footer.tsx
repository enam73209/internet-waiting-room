"use client";

import React from "react";
import TransitionLink from "@/components/animation/TransitionLink";

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between border-t border-cream-200/50 mt-16 select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
      <p className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 text-center sm:text-left mb-4 sm:mb-0">
        No loops. No notifications. Just a pause.
      </p>
      
      <div className="flex gap-6 font-mono text-[9px] uppercase tracking-widest text-charcoal-400">
        <TransitionLink href="/vault" className="hover:text-charcoal-900 transition-colors">
          The Archives
        </TransitionLink>
        <TransitionLink href="/" className="hover:text-charcoal-900 transition-colors">
          Entrance
        </TransitionLink>
      </div>
    </footer>
  );
}
