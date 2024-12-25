import React, { useEffect, useState } from "react";
import ToasterBar from "../components/ToasterBar";
import { useRoomInfo } from "../hooks/useRoomInfo";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import { useKickPlayer } from "../hooks/useKickPlayer";
import { useLeaveRoom } from "../hooks/useLeaveRoom";
import { useNavigate } from "react-router";
import socket from "../hooks/socket";
import { useStartGame } from "../hooks/useStartGame";
interface Player {
  playerId: string;
  playerName: string;
  isAlive: boolean;
  cards: any[];
  lives: number;
  isHost: boolean;
}
const Lobby = () => {
  const navigate = useNavigate();
  const roomCode = sessionStorage.getItem("roomCode");
  const playerCode = sessionStorage.getItem("playerCode");
  const { roomInfo, isLoading, areYouHost } = useRoomInfo(
    roomCode || "",
    playerCode || ""
  );
  const { kickPlayer } = useKickPlayer();
  const { leaveRoom } = useLeaveRoom();
  const { startGame, isStartLoading } = useStartGame(
    sessionStorage.getItem("roomCode") || ""
  );

  const copyToClipboard = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      toast(`Code copied to clipboard!`, {
        icon: "📋",
      });
    }
  };
  const handleKickPlayer = (playerId: string) => {
    console.log(`Kicking player with id ${playerId}`);
    if (sessionStorage.getItem("roomCode")) {
      kickPlayer(
        sessionStorage.getItem("roomCode") || "",
        playerId,
        (success, message) => {
          return;
        }
      );
    }
  };

  const handleLeaveRoom = () => {
    if (sessionStorage.getItem("roomCode")) {
      leaveRoom(
        sessionStorage.getItem("roomCode") || "",
        (success, message) => {
          if (success) {
            sessionStorage.removeItem("roomCode");
            navigate("/");
          }
        }
      );
    }
  };

  const handleStartGame = () => {
    startGame((success, message) => {
      if (!success) {
        toast.error(message || "Failed to start game");
        return;
      }
    });
  };

  useEffect(() => {
    if (!sessionStorage.getItem("roomCode")) {
      navigate("/");
      return;
    }
  }, []);

  useEffect(() => {
    socket.on("kicked_from_room", () => {
      sessionStorage.removeItem("roomCode");
      navigate("/");
    });

    return () => {
      socket.off("kicked_from_room");
    };
  }, [navigate]);

  const [isGameStarting, setIsGameStarting] = useState(false);
  useEffect(() => {
    socket.on("game_starting", () => {
      setIsGameStarting(true);
    });
    socket.on("game_started", () => {
      navigate("/game");
    });
    return () => {
      socket.off("game_started");
      socket.off("game_starting");
    };
  }, [isGameStarting]);

  return (
    <div className="flex mobile:w-1/2 w-3/4 justify-center flex-col mx-auto">
      <ToasterBar />
      <div className="mt-[10%] flex flex-row justify-between">
        <div></div>
        <p className="text-white text-2xl text-center font-bold mb-8">
          Game Lobby
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 h-fit py-3 rounded-md text-sm"
          onClick={handleLeaveRoom}
        >
          Leave
        </button>
      </div>
      {/* Room Code Bar */}
      <div className="w-[90%] mx-auto">
        <p>Room Code</p>
        <div className="flex items-center gap-4">
          <div className="flex-grow border-[2px] border-gray-500 h-fit p-3 rounded-xl bg-gray-800">
            <p className="text-base text-white">{roomCode}</p>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded-md text-sm hover:bg-blue-600"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      </div>
      <div className="mt-4 border-t-[2px] border-gray-700 text-center" />

      {isLoading ? (
        <Loading message="Getting game info..." />
      ) : !isLoading && !isGameStarting ? (
        <div className="mt-4">
          {roomInfo &&
            roomInfo.players.map((player: Player, index: number) => {
              return (
                <div
                  key={index}
                  className="relative w-[90%] border-[2px] border-gray-500 h-fit p-3 rounded-xl mx-auto flex justify-between mb-4"
                >
                  <p className="text-base text-white">
                    {player.playerName} {"   "}{" "}
                    <span className="text-red-500">
                      {player.playerId == roomInfo.hostId ? "(Host)" : ""}{" "}
                    </span>
                  </p>
                  {areYouHost &&
                  player.playerId != sessionStorage.getItem("socketId") ? (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                      onClick={() => handleKickPlayer(player.playerId)}
                    >
                      Kick
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}

          {/* Start Button */}
          {areYouHost && (
            <>
              {roomInfo.players && roomInfo.players.length == 4 ? (
                <button
                  className="mt-5 bg-green-500 hover:bg-green-700 text-white px-4 py-3 rounded-md text-base w-[100%] mx-auto"
                  onClick={handleStartGame}
                >
                  Start Game
                </button>
              ) : (
                <button
                  disabled
                  className="mt-5 bg-gray-500 text-white px-4 py-3 rounded-md text-base w-[100%] mx-auto cursor-not-allowed"
                >
                  Start Game
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <Loading message="Starting game..." />
      )}
    </div>
  );
};

export default Lobby;
