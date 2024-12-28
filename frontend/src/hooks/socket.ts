import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:3001";
// const SOCKET_URL = "http://192.168.0.122:3001";
const SOCKET_URL = `${window.location.protocol}//${window.location.hostname}:3001`;

const socket: Socket = io(SOCKET_URL, { transports: ["websocket"] });

socket.on("connect", () => {
  console.log(
    `Connected to backend at ${SOCKET_URL} with socket ID: ${socket.id}`
  );

  console.log(`Connected to server with socket ID: ${socket.id}`);
  if (socket.id) {
    // alert(socket.id);
    sessionStorage.setItem("socketId", socket.id); // Save the socket ID in sessionStorage
  }
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
});

export default socket;
