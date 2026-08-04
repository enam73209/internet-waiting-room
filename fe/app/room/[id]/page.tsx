import rooms from "@/data/rooms.json";
import RoomShell from "@/components/room/RoomShell";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: PageProps) {
  const { id } = await params;
  const room = rooms.find((r) => r.id === Number(id));

  if (!room) {
    notFound();
  }

  return <RoomShell room={room} />;
}
