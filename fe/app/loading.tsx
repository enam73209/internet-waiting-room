export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] select-none text-center">
      <div className="relative w-12 h-12 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border border-charcoal-400/20 animate-ping" />
        <div className="w-8 h-8 rounded-full border border-charcoal-300 animate-pulse" />
      </div>
      <p className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold mb-1">
        Aligning Chamber
      </p>
      <h3 className="font-serif text-lg italic text-charcoal-900">
        Adjusting focus...
      </h3>
    </div>
  );
}
