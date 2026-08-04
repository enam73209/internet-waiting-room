"use client";

import { useRoomStore } from "@/store/useRoomStore";
import roomsData from "@/data/rooms.json";
import dailySet from "@/data/dailySet.json";

export function useRoom(roomId?: string | number) {
  const {
    responses,
    completedRooms,
    submitResponse,
    completeRoom,
    currentRoomIndex,
    setRoomIndex,
  } = useRoomStore();

  const activeRoom = roomId ? roomsData.find((r) => r.id === Number(roomId)) : null;
  const isCompleted = roomId ? completedRooms.includes(Number(roomId)) : false;
  const userResponse = roomId ? responses[String(roomId)] : null;

  const getNextRoomUrl = () => {
    if (!roomId) return "/";
    const idx = dailySet.rooms.indexOf(Number(roomId));
    if (idx !== -1 && idx + 1 < dailySet.rooms.length) {
      return `/room/${dailySet.rooms[idx + 1]}`;
    }
    return "/complete";
  };

  return {
    activeRoom,
    isCompleted,
    userResponse,
    currentRoomIndex,
    setRoomIndex,
    responses,
    completedRooms,
    submitResponse,
    completeRoom,
    getNextRoomUrl,
  };
}
