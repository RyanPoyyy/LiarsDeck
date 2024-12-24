import socket from "./socket";

export const useKickPlayer = () => {
  const kickPlayer = (
    roomCode: string,
    playerId: string,
    callback: (success: boolean, message?: string) => void
  ) => {
    socket.emit("kick_player", roomCode, playerId, (response: any) => {
      if (response.success) {
        callback(true);
      } else {
        callback(false, response.message);
      }
    });
  };

  return { kickPlayer };
};
