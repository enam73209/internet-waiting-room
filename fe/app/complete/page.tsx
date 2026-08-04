"use client";

import React, { useEffect, useState } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { useDoorTransition } from "@/hooks/useDoorTransition";
import achievementsData from "@/data/achievements.json";
import dailySet from "@/data/dailySet.json";
import { Palette, Wind, Hourglass, Compass, Feather, Volume2, Award, ArrowRight, RotateCcw } from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  Palette,
  Wind,
  Hourglass,
  Compass,
  Feather,
  Volume2,
  Award,
};

export default function CompletePage() {
  const { unlockedAchievements, completedRooms, resetStore, unlockAchievement } = useRoomStore();
  const { transitionTo } = useDoorTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Automatically unlock the overall complete achievement if they did everything
    if (completedRooms.length >= dailySet.rooms.length) {
      unlockAchievement("achieve-complete");
    }
  }, [completedRooms, unlockAchievement]);

  if (!mounted) {
    return <div className="min-h-[50vh] w-full flex items-center justify-center bg-[#FBF9F6]" />;
  }

  const handleReset = () => {
    resetStore();
    transitionTo("/");
  };

  const completedCount = completedRooms.length;

  return (
    <div className="flex-1 flex flex-col items-center py-10 select-none">
      <div className="max-w-2xl w-full flex flex-col items-center">
        
        {/* completion copy */}
        <div className="text-center mb-12">
          <span className="font-mono text-[9px] uppercase tracking-widest text-sage-500 font-semibold">
            Journey Completed
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 tracking-tight mt-3">
            You Have Left the Noise Behind
          </h2>
          <p className="font-serif text-sm italic text-charcoal-400 max-w-sm mx-auto mt-4 leading-relaxed">
            &ldquo;Within you there is a stillness and a sanctuary to which you can retreat at any time.&rdquo;
          </p>
        </div>

        {/* stats cards */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-12">
          <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg text-center shadow-xs">
            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 block mb-2">
              Doors Opened
            </span>
            <span className="font-mono text-3xl font-light text-charcoal-900">
              {completedCount} <span className="text-xs text-charcoal-400">/ {dailySet.rooms.length}</span>
            </span>
          </div>
          <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg text-center shadow-xs">
            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 block mb-2">
              Mindfulness
            </span>
            <span className="font-mono text-3xl font-light text-charcoal-900">
              4.2 <span className="text-xs text-charcoal-400">min</span>
            </span>
          </div>
        </div>

        {/* achievements checklist */}
        <div className="w-full bg-cream-50/30 border border-cream-200 rounded-lg p-6 md:p-8 shadow-xs mb-12">
          <h3 className="font-serif text-lg text-charcoal-900 mb-6 text-center">
            Earned Sanctuary Badges
          </h3>

          <div className="flex flex-col gap-4">
            {achievementsData.map((ach) => {
              const isUnlocked = unlockedAchievements.includes(ach.id);
              const IconComp = iconMap[ach.icon] || Award;

              return (
                <div
                  key={ach.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                    isUnlocked
                      ? "border-cream-300 bg-cream-50/70"
                      : "border-cream-200 bg-cream-50/10 opacity-30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isUnlocked ? "bg-gold-500/10 border-gold-500 text-gold-600" : "bg-transparent border-cream-300 text-charcoal-400"
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-serif text-sm text-charcoal-900 font-medium">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-[11px] text-charcoal-400 mt-0.5 leading-normal">
                      {ach.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            onClick={() => transitionTo("/vault")}
            className="px-6 py-3 rounded-full border border-charcoal-900 bg-charcoal-900 hover:bg-charcoal-600 text-cream-50 font-serif text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            Enter the Museum Vault <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full border border-cream-300 bg-cream-50 hover:bg-cream-200 text-charcoal-600 hover:text-charcoal-900 font-serif text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Sit Again
          </button>
        </div>

      </div>
    </div>
  );
}
