"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoomState {
  currentRoomIndex: number;
  responses: Record<string, any>;
  completedRooms: (string | number)[];
  visitorCount: number;
  activeSounds: string[];
  unlockedAchievements: (string | number)[];
  isMuted: boolean;
  doorTransitionState: "idle" | "transitioning";
  transitionTargetUrl: string | null;

  setRoomIndex: (index: number) => void;
  submitResponse: (roomId: string | number, response: any) => void;
  completeRoom: (roomId: string | number) => void;
  randomizeVisitorCount: () => void;
  toggleSound: (soundId: string) => void;
  unlockAchievement: (achievementId: string | number) => void;
  setIsMuted: (muted: boolean) => void;
  setDoorTransition: (state: "idle" | "transitioning", targetUrl?: string | null) => void;
  resetStore: () => void;
}

export const useRoomStore = create<RoomState>()(
  persist(
    (set) => ({
      currentRoomIndex: 0,
      responses: {},
      completedRooms: [],
      visitorCount: 24903,
      activeSounds: [],
      unlockedAchievements: [],
      isMuted: true, // Default to muted for browser autoplay policies
      doorTransitionState: "idle",
      transitionTargetUrl: null,

      setRoomIndex: (index) => set({ currentRoomIndex: index }),
      submitResponse: (roomId, response) =>
        set((state) => ({
          responses: { ...state.responses, [String(roomId)]: response },
        })),
      completeRoom: (roomId) =>
        set((state) => {
          const nextCompleted = state.completedRooms.includes(roomId)
            ? state.completedRooms
            : [...state.completedRooms, roomId];
          return { completedRooms: nextCompleted };
        }),
      randomizeVisitorCount: () =>
        set((state) => {
          const change = Math.floor(Math.random() * 31) - 15; // -15 to +15
          return { visitorCount: Math.max(1000, state.visitorCount + change) };
        }),
      toggleSound: (soundId) =>
        set((state) => {
          const active = state.activeSounds.includes(soundId)
            ? state.activeSounds.filter((id) => id !== soundId)
            : [...state.activeSounds, soundId];
          return { activeSounds: active };
        }),
      unlockAchievement: (achievementId) =>
        set((state) => {
          if (state.unlockedAchievements.includes(achievementId)) return {};
          return { unlockedAchievements: [...state.unlockedAchievements, achievementId] };
        }),
      setIsMuted: (muted) => set({ isMuted: muted }),
      setDoorTransition: (doorState, targetUrl = null) =>
        set({ doorTransitionState: doorState, transitionTargetUrl: targetUrl }),
      resetStore: () =>
        set({
          currentRoomIndex: 0,
          responses: {},
          completedRooms: [],
          activeSounds: [],
          unlockedAchievements: [],
          doorTransitionState: "idle",
          transitionTargetUrl: null,
        }),
    }),
    {
      name: "waiting-room-store",
      partialize: (state) => ({
        currentRoomIndex: state.currentRoomIndex,
        responses: state.responses,
        completedRooms: state.completedRooms,
        visitorCount: state.visitorCount,
        unlockedAchievements: state.unlockedAchievements,
        isMuted: state.isMuted,
      }),
    }
  )
);
