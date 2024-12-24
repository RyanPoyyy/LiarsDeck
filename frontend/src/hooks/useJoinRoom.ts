import { useState } from "react";
import socket from "./socket";

export const useJoinRoom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const joinRoom = (
    roomCode: string,
    playerName: string,
    callback: (success: boolean, message?: string) => void
  ) => {
    setIsLoading(true);
    if (!roomCode.trim() || !playerName.trim()) {
      callback(false, "Missing name or room code");
      setIsLoading(false);
      return;
    }

    socket.emit("join_room", roomCode, playerName, (response: any) => {
      if (response.success) {
        callback(true);
      } else {
        callback(false, response.message);
      }
      setIsLoading(false);
    });
  };

  return { joinRoom, isLoading };
};
