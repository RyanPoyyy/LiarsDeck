import { useState, useEffect } from "react";
import socket from "./socket";
import { useNavigate } from "react-router-dom";

export const useStartGame = (roomCode: string) => {
  const navigate = useNavigate();
  const [isStartLoading, setIsStartLoading] = useState(false);

  const startGame = (
    callback: (success: boolean, message?: string) => void
  ) => {
    setIsStartLoading(true);

    socket.emit("start_game", roomCode, (response: any) => {
      setIsStartLoading(false);

      if (response.success) {
        callback(true);
      } else {
        callback(false, response.message);
      }
    });
  };

  //   useEffect(() => {
  //     // Listen for game_started event
  //     socket.on("game_started", (gameData: any) => {
  //       navigate("/game");
  //     });

  //     return () => {
  //       socket.off("game_started");
  //     };
  //   }, []);

  return { startGame, isStartLoading };
};
