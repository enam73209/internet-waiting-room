"use client";

import { useSoundContext } from "@/components/audio/SoundProvider";

export function useSound() {
  const { isMuted, activeSounds, toggleMute, toggleSoundChannel, playChime, playDoorOpen } = useSoundContext();
  
  return {
    isMuted,
    activeSounds,
    toggleMute,
    toggleSoundChannel,
    playChime,
    playDoorOpen,
  };
}
