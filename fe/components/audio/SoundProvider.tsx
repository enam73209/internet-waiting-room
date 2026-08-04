"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { audioEngine } from "@/lib/audioEngine";

interface SoundContextType {
  isMuted: boolean;
  activeSounds: string[];
  toggleMute: () => void;
  toggleSoundChannel: (channel: string) => void;
  playChime: (pitch?: number) => void;
  playDoorOpen: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const { isMuted, setIsMuted, activeSounds, toggleSound } = useRoomStore();

  useEffect(() => {
    if (!audioEngine) return;

    if (!isMuted) {
      audioEngine.startDrone();
      audioEngine.startChimes();

      // Start layer channels if they are toggled active
      if (activeSounds.includes("rain") || activeSounds.includes("synth-rain")) {
        audioEngine.startRain();
      } else {
        audioEngine.stopRain();
      }

      if (activeSounds.includes("fire") || activeSounds.includes("synth-fire")) {
        audioEngine.startFire();
      } else {
        audioEngine.stopFire();
      }
    } else {
      audioEngine.stopDrone();
      audioEngine.stopChimes();
      audioEngine.stopRain();
      audioEngine.stopFire();
    }
  }, [isMuted, activeSounds]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSoundChannel = (channel: string) => {
    toggleSound(channel);
  };

  const playChime = (pitch?: number) => {
    if (!isMuted && audioEngine) {
      audioEngine.playChimeNode(pitch);
    }
  };

  const playDoorOpen = () => {
    if (!isMuted && audioEngine) {
      audioEngine.playDoorOpen();
    }
  };

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        activeSounds,
        toggleMute,
        toggleSoundChannel,
        playChime,
        playDoorOpen,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return ctx;
}
