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

// interface Response {
//   gameState: GameInfo;
//   result: any;
// }

export const useGameInfo = (roomCode: string, playerId: string) => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [gameInfo, setGameInfo] = useState<GameInfo>({
    currentPlayerId: "",
    players: [],
    currentTurn: 0,
    liarCard: "",
    actions: [],
  });
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
        response.gameState.players = remapGameData(
          response.gameState,
          playerId
        );
        setGameInfo(response.gameState);
        setIsYourTurn(false);
        if (playerId == response.gameState.currentPlayerId) {
          setIsYourTurn(true);
        }
      } else {
        console.log(response.message);
      }
    });

    // Listening for real time updates:
    socket.on("game_update", (gameUpdates: GameInfo, result: any) => {
      console.log(gameUpdates);
      gameUpdates.players = remapGameData(gameUpdates, playerId);
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
      gameState.players = remapGameData(gameState, playerId);
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

  //   Play function, sending actions obj to backend
  const playCards = (
    action: any,
    callback: (success: boolean, message?: string) => void
  ) => {
    setSelectedCards([]);
    socket.emit("play_cards", roomCode, playerId, action, (response: any) => {
      if (response.success) {
        callback(true);
      } else {
        callback(false, response.message);
      }
    });
  };

  //   Challenge function:
  const challengeHandler = () => {
    socket.emit("challenge_cards", roomCode, playerId, (response: any) => {
      if (response.success) {
        console.log("Challenged");
      } else {
        console.log(response.message);
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

  const remapGameData = (gameData: GameInfo, playerId: string) => {
    const yourIndex = gameData.players.findIndex(
      (player: any) => player.playerId == playerId
    );

    const reorderedPlayers = [
      ...gameData.players.slice(yourIndex),
      ...gameData.players.slice(0, yourIndex),
    ];
    return reorderedPlayers;
  };

  return {
    selectedCards,
    setSelectedCards,
    gameInfo,
    isYourTurn,
    playCards,
    challengeHandler,
    nextRoundHandler,
    isGameOver,
    isKilled,
    affectedPlayer,
    winner,
    isWin,
  };
};
