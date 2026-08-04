"use client";

import { useSoundContext } from "@/components/audio/SoundProvider";

export function useSound() {
  const {
    isMuted,
    activeSounds,
    toggleMute,
    toggleSoundChannel,
    playChime,
    playDoorOpen,
    playDoorHoverCreak,
    playHandleClick,
  } = useSoundContext();
  
  return {
    isMuted,
    activeSounds,
    toggleMute,
    toggleSoundChannel,
    playChime,
    playDoorOpen,
    playDoorHoverCreak,
    playHandleClick,
  };
}
