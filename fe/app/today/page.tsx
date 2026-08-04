"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRoomStore } from "@/store/useRoomStore";
import dailySet from "@/data/dailySet.json";

export default function TodayRedirect() {
  const router = useRouter();
  const { completedRooms, setRoomIndex } = useRoomStore();

  useEffect(() => {
    // Find the first room ID that is not completed
    const firstUncompletedId = dailySet.rooms.find((id) => !completedRooms.includes(id));

    if (firstUncompletedId) {
      const idx = dailySet.rooms.indexOf(firstUncompletedId);
      setRoomIndex(idx);
      router.replace(`/room/${firstUncompletedId}`);
    } else {
      // If all rooms are completed, redirect to complete landing
      router.replace("/complete");
    }
  }, [router, completedRooms, setRoomIndex]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] select-none text-center">
      <div className="relative w-12 h-12 flex items-center justify-center mb-6">
        <div className="absolute inset-0 rounded-full border border-charcoal-400/20 animate-ping" />
        <div className="w-8 h-8 rounded-full border border-sage-500 animate-pulse" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-sage-500 font-semibold mb-1">
        Restoring Session
      </p>
      <h3 className="font-serif text-lg italic text-charcoal-900">
        Finding your open door...
      </h3>
    </div>
  );
}
