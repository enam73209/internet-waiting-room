"use client";

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface CommunityChartProps {
  type: "mood" | "rating" | "action" | "preference" | "timer" | "guess" | "dilemma" | "sound" | "trivia" | "canvas";
  data: any[];
}

export default function CommunityChart({ type, data }: CommunityChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-cream-50/50 rounded-lg animate-pulse" />;
  }

  // Common Tooltip Component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FBF9F6] border border-cream-300 p-2 px-3 rounded-md shadow-xs">
          <p className="font-mono text-[10px] text-charcoal-400 uppercase tracking-widest">
            {payload[0].name || "Value"}
          </p>
          <p className="font-mono text-sm font-semibold text-charcoal-900 mt-0.5">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  switch (type) {
    case "mood": {
      const colors = ["#2dd4bf", "#818cf8", "#fbbf24", "#94a3b8"];
      return (
        <div className="w-full h-64 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={4}
                dataKey="percentage"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} className="focus:outline-hidden" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center select-none pointer-events-none">
            <span className="font-serif text-2xl font-light text-charcoal-900">Today</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal-400 mt-1">
              Inner Colors
            </span>
          </div>
        </div>
      );
    }

    case "rating":
    case "trivia":
    case "guess":
    case "sound":
    case "canvas": {
      const formattedData = data.map((d) => ({
        name: d.noiseLevel || d.choice || d.guessRange || d.sound || d.strokeLength || "Option",
        value: d.percentage,
      }));

      return (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7A7875", fontSize: 10, fontFamily: "var(--font-inter)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7A7875", fontSize: 9, fontFamily: "var(--font-ibm-plex)" }}
                unit="%"
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(234,227,220,0.3)" }} />
              <Bar dataKey="value" fill="#6E7A66" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    case "action": {
      return (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="calmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6E7A66" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6E7A66" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="second"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7A7875", fontSize: 9, fontFamily: "var(--font-ibm-plex)" }}
                unit="s"
              />
              <YAxis
                domain={[50, 90]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#7A7875", fontSize: 9, fontFamily: "var(--font-ibm-plex)" }}
                unit="bpm"
              />
              <Tooltip
                content={({ active, payload }: any) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#FBF9F6] border border-cream-300 p-2 px-3 rounded-md shadow-xs font-mono text-xs">
                        <p className="text-charcoal-400">Heart Rate</p>
                        <p className="font-semibold text-charcoal-900 mt-0.5">{payload[0].value} BPM</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="heartRate"
                stroke="#6E7A66"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#calmGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
    }

    case "preference":
    case "dilemma":
    case "timer": {
      const formatted = data.map((d) => ({
        label: d.option || d.time || "Option",
        pct: d.percentage,
      }));

      if (formatted.length < 2) return null;

      return (
        <div className="w-full flex flex-col gap-6 py-6 select-none max-w-md mx-auto">
          {formatted.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline font-serif text-sm text-charcoal-900">
                <span className="max-w-[75%] truncate leading-normal">{item.label}</span>
                <span className="font-mono text-base font-light pl-4">{item.pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-cream-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    idx === 0 ? "bg-sage-500" : "bg-charcoal-400"
                  }`}
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
