"use client";

import React from "react";
import TransitionLink from "@/components/animation/TransitionLink";
import SoundControl from "@/components/audio/SoundControl";

export default function Navbar() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-40 select-none">
      <TransitionLink
        href="/"
        className="group flex flex-col focus:outline-hidden"
      >
        <h1 className="font-serif text-xl tracking-tight text-charcoal-900 group-hover:opacity-80 transition-opacity">
          The Waiting Room
        </h1>
      </TransitionLink>

      <SoundControl />
    </header>
  );
}
