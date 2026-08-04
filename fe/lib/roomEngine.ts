import dailySet from "@/data/dailySet.json";
import roomsData from "@/data/rooms.json";

export function getRoomById(id: string | number) {
  return roomsData.find((r) => r.id === Number(id)) || null;
}

export function getFirstRoomId() {
  return dailySet.rooms[0] || null;
}

export function getNextRoomId(currentId: string | number) {
  const idx = dailySet.rooms.indexOf(Number(currentId));
  if (idx !== -1 && idx + 1 < dailySet.rooms.length) {
    return dailySet.rooms[idx + 1];
  }
  return null;
}

export function getRoomIndex(id: string | number) {
  return dailySet.rooms.indexOf(Number(id));
}
