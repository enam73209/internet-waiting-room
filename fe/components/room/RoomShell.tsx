"use client";

import React, { useState } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { useDoorTransition } from "@/hooks/useDoorTransition";
import dailySet from "@/data/dailySet.json";

// Specific interaction components
import MoodRoom from "./MoodRoom";
import RatingRoom from "./RatingRoom";
import ActionRoom from "./ActionRoom";
import PreferenceRoom from "./PreferenceRoom";
import TimerRoom from "./TimerRoom";
import GuessRoom from "./GuessRoom";
import DilemmaRoom from "./DilemmaRoom";
import SoundRoom from "./SoundRoom";
import TriviaRoom from "./TriviaRoom";
import CanvasRoom from "./CanvasRoom";

// Reveal components
import RevealSequence from "../reveal/RevealSequence";
import CommunityChart from "../charts/CommunityChart";

interface RoomShellProps {
  room: any;
}

export default function RoomShell({ room }: RoomShellProps) {
  const [stage, setStage] = useState<"interact" | "reveal">("interact");
  const { submitResponse, completeRoom, setRoomIndex } = useRoomStore();
  const { transitionTo } = useDoorTransition();

  // Find index in daily set
  const roomIndex = dailySet.rooms.indexOf(Number(room.id));
  
  const handleResponseSubmit = (value: any) => {
    submitResponse(room.id, value);
    completeRoom(room.id);
    setStage("reveal");
  };

  const handleNextDoor = () => {
    const nextIndex = roomIndex + 1;
    if (nextIndex < dailySet.rooms.length) {
      setRoomIndex(nextIndex);
      transitionTo(`/room/${dailySet.rooms[nextIndex]}`);
    } else {
      transitionTo("/complete");
    }
  };

  // Render correct interaction block
  const renderInteractBlock = () => {
    switch (room.type) {
      case "mood":
        return <MoodRoom room={room} onSubmit={handleResponseSubmit} />;
      case "rating":
        return <RatingRoom room={room} onSubmit={handleResponseSubmit} />;
      case "action":
        return <ActionRoom room={room} onSubmit={handleResponseSubmit} />;
      case "preference":
        return <PreferenceRoom room={room} onSubmit={handleResponseSubmit} />;
      case "timer":
        return <TimerRoom room={room} onSubmit={handleResponseSubmit} />;
      case "guess":
        return <GuessRoom room={room} onSubmit={handleResponseSubmit} />;
      case "dilemma":
        return <DilemmaRoom room={room} onSubmit={handleResponseSubmit} />;
      case "sound":
        return <SoundRoom room={room} onSubmit={handleResponseSubmit} />;
      case "trivia":
        return <TriviaRoom room={room} onSubmit={handleResponseSubmit} />;
      case "canvas":
        return <CanvasRoom room={room} onSubmit={handleResponseSubmit} />;
      default:
        return <div className="text-center font-mono text-xs py-12 text-charcoal-400">Undefined Interaction</div>;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center py-6">
      {stage === "interact" ? (
        <div className="w-full max-w-xl flex flex-col items-center">
          {/* Header metadata */}
          <div className="text-center mb-8 select-none">
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage-500 font-semibold">
              Door {roomIndex !== -1 ? roomIndex + 1 : "?"} of {dailySet.rooms.length}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-900 tracking-tight mt-2">
              {room.title}
            </h2>
            <p className="font-sans text-xs text-charcoal-400 max-w-sm mx-auto mt-3 leading-relaxed">
              {room.subtitle || room.description}
            </p>
          </div>

          {/* Interaction Content */}
          <div className="w-full bg-cream-50/30 border border-cream-200 rounded-lg p-6 md:p-8 shadow-xs">
            {renderInteractBlock()}
          </div>
        </div>
      ) : (
        /* Reveal Sequence Stage */
        <RevealSequence
          roomId={room.id}
          revealNarrative={room.result?.story || room.revealNarrative || ""}
          onNextDoor={handleNextDoor}
        >
          <CommunityChart type={room.type} data={room.result?.stats || room.revealStatistics || []} />
        </RevealSequence>
      )}
    </div>
  );
}
