const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:3030",
      "https://admin.socket.io",
    ],
    // origin: "*",
    credentials: true,
  },
});

const Room = require("./classes/Room");
const Player = require("./classes/Player");
const Game = require("./classes/Game");
const Host = require("./classes/Host");

const rooms = {};

// Utility to generate unique room codes
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // get Room info:
  socket.on("get_room_info", (roomCode, callback) => {
    const room = rooms[roomCode];
    if (room) {
      callback({ success: true, roomInfo: room });
    } else {
      callback({ success: false, message: "Room not found" });
    }
  });

  // Create a new room
  socket.on("create_room", (playerName, callback) => {
    const roomCode = generateRoomCode();
    const room = new Room(roomCode, socket.id);

    const host = new Host(socket.id, playerName, [], true, 6);

    room.addPlayer(host, true); // Add host
    rooms[roomCode] = room;

    socket.join(roomCode);
    callback({ roomCode: roomCode, success: true });
    console.log(`Room created: ${roomCode} by ${playerName}`);
  });

  // Join an existing room
  socket.on("join_room", (roomCode, playerName, callback) => {
    const room = rooms[roomCode];
    const player = {
      playerId: socket.id,
      playerName: playerName,
      cards: [],
      isAlive: true,
      lives: 6,
    };
    if (!room) {
      return callback({ success: false, message: "Room not found" });
    }

    if (room.addPlayer(player)) {
      socket.join(roomCode);
      io.to(roomCode).emit("room_updated", {
        updatedRoomInfo: room,
        updateType: "join",
        playerName: player.playerName,
      });
      callback({ success: true });
      console.log(`${playerName} joined room ${roomCode}`);
    } else {
      callback({
        success: false,
        message: "Failed to join the room. Room is full!",
      });
    }
  });

  // Disconnecting/leaving a room:
  socket.on("leave_room", (roomCode, callback) => {
    const room = rooms[roomCode];
    if (!room) {
      return callback({ success: false, message: "Room not found" });
    }

    const removedPlayer = room.removePlayer(socket.id);
    if (removedPlayer) {
      socket.leave(roomCode);

      // Notify room about updated player list
      io.to(roomCode).emit("room_updated", {
        updatedRoomInfo: room,
        updateType: "leave",
        playerName: removedPlayer.playerName,
      });
      // If no players remain, delete the room
      if (room.players.length === 0) {
        delete rooms[roomCode];
      }

      callback({ success: true });
    } else {
      callback({ success: false, message: "Player not in room" });
    }
  });

  //   Kick a player from the room
  // Disconnect a player
  socket.on("kick_player", (roomCode, playerCode, callback) => {
    console.log(`Kicking player with ID: ${socket.id}`);
    const room = rooms[roomCode];
    if (!room) {
      console.log(`Room Code not found: ${roomCode}`);
      return callback({ success: false, message: "Room not found" });
    }

    const removedPlayer = room.removePlayer(playerCode);

    if (removedPlayer) {
      console.log(`Removing player with ID: ${socket.id}`);
      io.to(roomCode).emit("room_updated", {
        updatedRoomInfo: room,
        updateType: "kick",
        playerName: removedPlayer.playerName,
      });
      io.to(playerCode).emit("kicked_from_room");

      return callback({
        success: true,
        message: `Player ${removedPlayer.playerName} kicked`,
      });
    }
    return callback({ success: false, message: "Player not found" });
  });

  // Start a game in the room
  socket.on("start_game", (roomCode, callback) => {
    const room = rooms[roomCode];
    if (!room) {
      return callback({ success: false, message: "Room not found" });
    }

    if (room.hostId !== socket.id) {
      return callback({
        success: false,
        message: "Only the host can start the game",
      });
    }

    if (room.startGame()) {
      io.to(roomCode).emit("game_started", room.game.getGameState());
      callback({ success: true });
      console.log(`Game started in room ${roomCode}`);
    } else {
      callback({
        success: false,
        message: "Not enough players to start the game",
      });
    }
  });

  // Process game actions (play or challenge)
  socket.on("game_action", (roomCode, action, callback) => {
    const room = rooms[roomCode];
    if (!room || !room.game) {
      return callback({ success: false, message: "Game not found" });
    }

    const game = room.game;
    game.processAction(action);
    io.to(roomCode).emit("game_update", game.getGameState());
    callback({ success: true });
  });
});
instrument(io, { auth: false, mode: "development" });
server.listen(port, "0.0.0.0", () =>
  console.log(`Listening on port ${port}...`)
);
