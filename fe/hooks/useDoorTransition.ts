"use client";

import { useRouter } from "next/navigation";
import { useRoomStore } from "@/store/useRoomStore";
import { useSound } from "./useSound";

export function useDoorTransition() {
  const router = useRouter();
  const { setDoorTransition } = useRoomStore();
  const { playDoorOpen } = useSound();

  const transitionTo = (href: string) => {
    playDoorOpen();
    setDoorTransition("transitioning", href);

    setTimeout(() => {
      router.push(href);
    }, 600);

    setTimeout(() => {
      setDoorTransition("idle");
    }, 1200);
  };

  return {
    transitionTo,
  };
}
