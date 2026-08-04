"use client";

import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CommunityChart from "@/components/charts/CommunityChart";
import { ChevronDown, ChevronUp, Clock, Users, Feather, Volume2, Globe } from "lucide-react";
import TransitionLink from "@/components/animation/TransitionLink";

interface VaultClientProps {
  statistics: any;
  rooms: any[];
  dailySet: number[];
}

// Local mock fallback for historical mood chart
const historicalMoodsFallback = [
  { "month": "March", "Serenity": 25, "Wonder": 15, "Reflection": 35, "Fatigue": 25 },
  { "month": "April", "Serenity": 28, "Wonder": 17, "Reflection": 32, "Fatigue": 23 },
  { "month": "May", "Serenity": 30, "Wonder": 20, "Reflection": 28, "Fatigue": 22 },
  { "month": "June", "Serenity": 32, "Wonder": 18, "Reflection": 30, "Fatigue": 20 },
  { "month": "July", "Serenity": 34, "Wonder": 18, "Reflection": 29, "Fatigue": 19 }
];

export default function VaultClient({ statistics, rooms, dailySet }: VaultClientProps) {
  const [expandedRoomId, setExpandedRoomId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedRoomId(expandedRoomId === id ? null : id);
  };

  const CustomAreaTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FBF9F6] border border-cream-300 p-3 rounded-md shadow-xs font-mono text-[10px]">
          <p className="font-semibold text-charcoal-900 mb-2 uppercase tracking-wider">{payload[0].payload.month}</p>
          <div className="flex flex-col gap-1.5">
            <p className="text-teal-600 flex justify-between gap-4">Serenity: <span>{payload[0].value}%</span></p>
            <p className="text-indigo-600 flex justify-between gap-4">Wonder: <span>{payload[1].value}%</span></p>
            <p className="text-amber-600 flex justify-between gap-4">Reflection: <span>{payload[2].value}%</span></p>
            <p className="text-slate-500 flex justify-between gap-4">Fatigue: <span>{payload[3].value}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-16">
      
      {/* 4 grid stats widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg shadow-xs select-none">
          <div className="flex items-center gap-2 text-charcoal-400 mb-3">
            <Users className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Active Visitors</span>
          </div>
          <span className="font-mono text-2xl font-light text-charcoal-900">
            {(statistics.onlineVisitors || statistics.totalHistoricalSouls || 0).toLocaleString()}
          </span>
        </div>

        <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg shadow-xs select-none">
          <div className="flex items-center gap-2 text-charcoal-400 mb-3">
            <Feather className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Total Participants</span>
          </div>
          <span className="font-mono text-2xl font-light text-charcoal-900">
            {(statistics.todayParticipants || statistics.drawingsArchived || 0).toLocaleString()}
          </span>
        </div>

        <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg shadow-xs select-none">
          <div className="flex items-center gap-2 text-charcoal-400 mb-3">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Avg Session</span>
          </div>
          <span className="font-mono text-2xl font-light text-charcoal-900">
            {statistics.averageSession || "3m 48s"}
          </span>
        </div>

        <div className="bg-cream-50/50 border border-cream-200 p-6 rounded-lg shadow-xs select-none">
          <div className="flex items-center gap-2 text-charcoal-400 mb-3">
            <Globe className="w-4 h-4" />
            <span className="font-mono text-[9px] uppercase tracking-widest">Countries Today</span>
          </div>
          <span className="font-mono text-2xl font-light text-charcoal-900">
            {statistics.countriesToday || 91}
          </span>
        </div>
      </div>

      {/* Historical Mood Area Chart */}
      <div className="w-full bg-cream-50/30 border border-cream-200 rounded-lg p-6 md:p-8 shadow-xs">
        <div className="mb-6 select-none">
          <h3 className="font-serif text-lg text-charcoal-900">Historical Mood Oscillations</h3>
          <p className="font-sans text-xs text-charcoal-400 mt-1">
            Tracking shifts in collective emotional color coordinates over the last few months.
          </p>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalMoodsFallback} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7A7875", fontSize: 9, fontFamily: "var(--font-inter)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7A7875", fontSize: 9, fontFamily: "var(--font-ibm-plex)" }}
                unit="%"
              />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area type="monotone" dataKey="Serenity" stackId="1" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.15} />
              <Area type="monotone" dataKey="Wonder" stackId="1" stroke="#818cf8" fill="#818cf8" fillOpacity={0.15} />
              <Area type="monotone" dataKey="Reflection" stackId="1" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.15} />
              <Area type="monotone" dataKey="Fatigue" stackId="1" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Accordion List of All Doors */}
      <div className="flex flex-col gap-4">
        <h3 className="font-serif text-lg text-charcoal-900 mb-2 select-none">Collection of Doors</h3>
        
        {dailySet.map((roomId, idx) => {
          const room = rooms.find((r) => r.id === roomId);
          if (!room) return null;

          const isExpanded = expandedRoomId === room.id;
          const roomSubtitle = room.subtitle || room.description;
          const roomStory = room.result?.story || room.revealNarrative;
          const roomStats = room.result?.stats || room.revealStatistics || [];

          return (
            <div
              key={room.id}
              className="border border-cream-200 rounded-lg bg-cream-50/20 hover:bg-cream-50/40 transition-colors"
            >
              {/* Accordion trigger */}
              <button
                onClick={() => toggleExpand(room.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-hidden cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs font-semibold text-sage-500 opacity-60">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-serif text-sm md:text-base text-charcoal-900">
                    {room.title}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 border border-cream-300 rounded-sm px-2 py-0.5 ml-2">
                    {room.type}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-charcoal-400" /> : <ChevronDown className="w-4 h-4 text-charcoal-400" />}
              </button>

              {/* Accordion content */}
              {isExpanded && (
                <div className="border-t border-cream-200 p-6 flex flex-col gap-8 bg-cream-50/10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Details column */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold">
                          Description
                        </span>
                        <p className="font-sans text-xs text-charcoal-600 leading-relaxed">
                          {roomSubtitle}
                        </p>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold">
                          Philosophical Narrative
                        </span>
                        <p className="font-serif text-xs italic text-charcoal-500 leading-relaxed">
                          &ldquo;{roomStory}&rdquo;
                        </p>
                      </div>

                      {room.result?.fact && (
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold">
                            Interesting Fact
                          </span>
                          <p className="font-sans text-xs text-charcoal-600 leading-relaxed bg-cream-200/30 p-3 border border-cream-300/50 rounded-sm">
                            {room.result.fact}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Chart column */}
                    <div className="flex flex-col gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 font-semibold text-center md:text-left">
                        Visitor Distribution
                      </span>
                      {roomStats.length > 0 ? (
                        <CommunityChart type={room.type} data={roomStats} />
                      ) : (
                        <div className="h-64 flex items-center justify-center font-mono text-[10px] text-charcoal-400 select-none">
                          No graphical dataset available.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Return to main screen */}
      <div className="flex justify-center mt-6">
        <TransitionLink
          href="/"
          className="px-8 py-3 rounded-full border border-charcoal-900 bg-cream-50 hover:bg-charcoal-900 hover:text-cream-50 text-charcoal-900 font-serif text-sm tracking-wide shadow-md transition-all duration-300 transform active:scale-98"
        >
          Return to Entrance
        </TransitionLink>
      </div>

    </div>
  );
}
