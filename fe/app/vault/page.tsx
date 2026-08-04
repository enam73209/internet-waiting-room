import React from "react";
import roomsData from "@/data/rooms.json";
import statsData from "@/data/statistics.json";
import dailySet from "@/data/dailySet.json";
import VaultClient from "./VaultClient";

export default async function VaultPage() {
  // Load data on the server (SSR)
  const statistics = statsData;
  const rooms = roomsData;

  return (
    <div className="w-full flex flex-col py-10 select-none">
      <div className="max-w-4xl w-full mx-auto">
        {/* Header copy */}
        <div className="text-center mb-16">
          <span className="font-mono text-[9px] uppercase tracking-widest text-sage-500 font-semibold">
            Museum Archives
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 tracking-tight mt-3">
            The Stillness Chronicles
          </h2>
          <p className="font-sans text-xs text-charcoal-400 max-w-sm mx-auto mt-4 leading-relaxed">
            A repository of collective pauses, silent selections, and the
            etymology of anticipation.
          </p>
        </div>

        {/* Client side dashboard */}
        <VaultClient
          statistics={statistics}
          rooms={rooms}
          dailySet={dailySet.rooms}
        />
      </div>
    </div>
  );
}
