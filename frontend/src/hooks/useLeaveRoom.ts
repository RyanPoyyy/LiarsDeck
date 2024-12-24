import socket from "./socket";

export const useLeaveRoom = () => {
  const leaveRoom = (
    roomCode: string,
    callback: (success: boolean, message?: string) => void
  ) => {
    socket.emit("leave_room", roomCode, (response: any) => {
      console.log(response);
      if (response.success) {
        callback(true);
      } else {
        callback(false, response.message);
      }
    });
  };

  return { leaveRoom };
};
