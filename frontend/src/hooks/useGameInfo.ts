import { useEffect, useState } from "react";
import socket from "./socket";

export const useGameInfo = (roomCode: string, playerId: string) => {
  const [gameInfo, setGameInfo] = useState<any>(null);

  // Fetching game info:
  useEffect(() => {
    // Initial game info
    socket.emit("get_game_state", roomCode, playerId, (response: any) => {
      if (response.success) {
        setGameInfo(response.gameState);
      } else {
        console.log(response.message);
      }
    });

    // Listening for real time updates:
    socket.on("game_update", (gameUpdates: any) => {
      setGameInfo(gameUpdates);
    });

    return () => {
      socket.off("game_update");
    };
  }, [roomCode, playerId]);

  //   Sending actions to backend
  const performAction = (
    action: any,
    callback: (success: boolean, message?: string) => void
  ) => {
    socket.emit("game_action", roomCode, action, (response: any) => {
      if (response.success) {
        callback(true);
      } else {
        callback(false, response.message);
      }
    });
  };
};
