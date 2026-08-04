import React from "react";
import TransitionLink from "@/components/animation/TransitionLink";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] select-none text-center px-4">
      <span className="font-mono text-[9px] uppercase tracking-widest text-gold-500 font-semibold mb-3">
        404 Not Found
      </span>
      <h2 className="font-serif text-3xl text-charcoal-900 tracking-tight mb-4">
        This Doorway Does Not Exist
      </h2>
      <p className="font-sans text-xs text-charcoal-400 max-w-sm mx-auto mb-10 leading-relaxed">
        The corridor you searched for is empty. The chambers of stillness lie elsewhere. Let us return to the entrance.
      </p>
      
      <TransitionLink
        href="/"
        className="px-6 py-2.5 rounded-full border border-charcoal-900 hover:bg-charcoal-900 hover:text-cream-50 font-serif text-xs uppercase tracking-widest transition-all duration-300"
      >
        Return to Entrance
      </TransitionLink>
    </div>
  );
}
