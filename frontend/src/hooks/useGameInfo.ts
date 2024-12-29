import { useEffect, useState } from "react";
import socket from "./socket";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isChallenged, setIsChallenged] = useState(false);

  const [gameInfo, setGameInfo] = useState<GameInfo>({
    currentPlayerId: "",
    players: [],
    currentTurn: 0,
    liarCard: "",
    actions: [],
  });

  //   Rounds constants
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isKilled, setIsKilled] = useState<boolean>(false);
  const [affectedPlayer, setAffectedPlayer] = useState();

  //   Winner constants:
  const [winner, setWinner] = useState();
  const [isWin, setIsWin] = useState<boolean>(false);

  useEffect(() => {
    console.log(isChallenged);
  }, [isChallenged]);

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
        if (playerId == response.gameState.currentPlayerId) {
        }
      } else {
        console.log(response.message);
      }
    });

    // Listening for real time updates:
    socket.on("game_update", (gameUpdates: GameInfo, result: any) => {
      console.log(gameUpdates);
      setSelectedCards([]);
      gameUpdates.players = remapGameData(gameUpdates, playerId);
      if (result.eventType == "play") {
        setGameInfo(gameUpdates);

        return;
      }

      //   Challenge (success and fail), and only person remaining
      else {
        setIsChallenged(true);
        setAffectedPlayer(result.player);
        setIsKilled(result.isPlayerKilled);
        setIsGameOver(true);
        return;
      }
    });

    // Listening for next round updates:
    socket.on("start_next_round", (gameState: GameInfo) => {
      setIsGameOver(false);
      setIsChallenged(false);
      gameState.players = remapGameData(gameState, playerId);
      setGameInfo(gameState);
    });

    // listening for winners updates:
    socket.on("game_finished", (playerObj: any) => {
      setIsGameOver(false);
      setIsChallenged(false);
      setWinner(playerObj);
      setIsWin(true);
    });

    // Return to lobby:
    socket.on("navigate_lobby", () => {
      console.log("Navigating to lobby");
      navigate("/lobby");
      return;
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

  const nextRoundHandler = () => {
    socket.emit("next_round", roomCode, (response: any) => {
      if (response.success) {
        console.log("Next Round");
      } else {
        console.log(response.message);
      }
    });
  };

  const returnToLobbyHandler = () => {
    socket.emit("return_to_lobby", roomCode, (response: any) => {
      if (response.success) {
        console.log("Returned to lobby");
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
    isChallenged,
    gameInfo,
    playCards,
    challengeHandler,
    nextRoundHandler,
    isGameOver,
    isKilled,
    affectedPlayer,
    winner,
    isWin,
    returnToLobbyHandler,
  };
};
