import { useEffect, useState } from "react";
import socket from "./socket";

interface Player {
  playerId: string;
  playerName: string;
  playerCards: string[];
  isAlive: boolean;
  playerLives: number;
  isHost: boolean;
  isTurn: boolean;
}

interface Action {
  playerId: string;
  playerName: string;
  actionType: string;
  cardsPlayed: string[];
}

interface GameInfo {
  currentPlayerId: string;
  players: Player[];
  currentTurn: number;
  liarCard: string;
  actions: Action[];
}

export const useGameInfo = (roomCode: string, playerId: string) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    currentPlayerId: "",
    players: [],
    currentTurn: 0,
    liarCard: "",
    actions: [],
  });
  const [isGettingGameInfo, setIsGettingGameInfo] = useState<boolean>(true);
  const [isYourTurn, setIsYourTurn] = useState<boolean>(false);

  //   Rounds constants
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isKilled, setIsKilled] = useState<boolean>(false);
  const [affectedPlayer, setAffectedPlayer] = useState();

  //   Winner constants:
  const [winner, setWinner] = useState();
  const [isWin, setIsWin] = useState<boolean>(false);

  // Fetching game info:
  useEffect(() => {
    // Initial game info
    socket.emit("get_game_state", roomCode, playerId, (response: any) => {
      if (response.success) {
        setGameInfo(response.gameState);
        setIsYourTurn(false);
        if (playerId == response.gameState.currentPlayerId) {
          setIsYourTurn(true);
        }

        setIsGettingGameInfo(false);
      } else {
        console.log(response.message);
      }
    });

    // Listening for real time updates:
    socket.on("game_update", (gameUpdates: GameInfo, result: any) => {
      console.log(gameUpdates);
      if (result.eventType == "play") {
        setGameInfo(gameUpdates);
        setIsYourTurn(false);
        if (playerId == gameUpdates.currentPlayerId) {
          setIsYourTurn(true);
        }
        return;
      }

      //   Challenge (success and fail), and only person remaining
      else {
        setAffectedPlayer(result.player);
        setIsKilled(result.isPlayerKilled);
        setIsGameOver(true);
        return;
      }
    });

    // Listening for next round updates:
    socket.on("start_next_round", (gameState: GameInfo) => {
      setIsGameOver(false);
      setGameInfo(gameState);
      setIsYourTurn(false);
      if (playerId == gameState.currentPlayerId) {
        setIsYourTurn(true);
      }
    });

    // listening for winners updates:
    socket.on("game_finished", (playerObj: any) => {
      setWinner(playerObj);
      setIsWin(true);
    });

    return () => {
      socket.off("game_update");
      socket.off("start_next_round");
      socket.off("game_finished");
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

  const nextRoundHandler = (roomCode: string) => {
    socket.emit("next_round", roomCode, (response: any) => {
      if (response.success) {
        console.log("Next Round");
      } else {
        console.log(response.message);
      }
    });
  };

  return {
    gameInfo,
    isGettingGameInfo,
    isYourTurn,
    performAction,
    isGameOver,
    isKilled,
    affectedPlayer,
    winner,
    isWin,
  };
};
