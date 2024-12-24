import { useEffect, useState } from "react";
import socket from "./socket";
import toast from "react-hot-toast";

interface Player {
  playerId: string;
  playerName: string;
  isAlive: boolean;
  cards: any[];
  lives: number;
  isHost: boolean;
}

export const useRoomInfo = (roomCode: string, playerCode: string) => {
  const [roomInfo, setRoomInfo] = useState<any | null>(null);
  const [areYouHost, setAreYouHost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Fetch initial room info
    socket.emit("get_room_info", roomCode, (response: any) => {
      if (response.success) {
        console.log(response.roomInfo);
        if (response.roomInfo.hostId === socket.id) {
          setAreYouHost(true);
        }

        setRoomInfo(response.roomInfo);
      } else {
        toast.error(response.message);
      }
      setIsLoading(false);
    });

    // Listen for room updates
    socket.on("room_updated", ({ updatedRoomInfo, updateType, playerName }) => {
      setRoomInfo(updatedRoomInfo);
      console.log(updatedRoomInfo);

      // Show appropriate toast message based on update type
      if (updateType === "join") {
        toast(`${playerName} has joined the room!`, {
          icon: "🎮",
          id: playerName,
        });
      } else if (updateType === "leave") {
        toast(`${playerName} has left the room.`, {
          icon: "👋",
          id: playerName,
        });
      } else if (updateType === "kick") {
        toast(`${playerName} has been kicked from the room.`, {
          icon: "🚨",
          id: playerName,
        });
      }
    });
    return () => {
      socket.off("update_room");
    };
  }, [roomCode]);
  return { roomInfo, isLoading, areYouHost };
};
