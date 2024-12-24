import { useState } from "react";
import socket from "./socket";

export const useCreateRoom = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createRoom = (
    playerName: string,
    // this is a call back function that the backend calls and sends back to the frontend
    callback: (success?: boolean, roomCode?: string) => void
  ) => {
    setIsLoading(true);
    if (!playerName.trim()) {
      alert("Please enter your name");
      callback(false);
      setIsLoading(false);
      return;
    }

    socket.emit("create_room", playerName, (response: any) => {
      console.log(response);
      if (response.success) {
        setRoomCode(response.roomCode);
        setIsLoading(false);
        callback(true, response.roomCode);
      } else {
        setIsLoading(false);
        callback(false);
      }
    });
  };

  return { roomCode, createRoom, isLoading };
};
