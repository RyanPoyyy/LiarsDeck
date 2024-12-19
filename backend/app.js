const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const io = require("socket.io")(3000);

const rooms = {};

// Utility to generate unique room codes
function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on("connecton", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Create a new room
  socket.on("create_room", (playerName, callback) => {
    const roomCode = generateRoomCode();
    const room = new Room(roomCode, socket.id);

    const player = {
      playerId: socket.id,
      playerName: playerName,
      cards: [],
      isAlive: true,
      lives: 6,
    };

    room.addPlayer(player, true); // Add host
    rooms[roomCode] = room;

    socket.join(roomCode);
    callback({ roomCode, success: true });
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
      io.to(roomCode).emit("update_room", room.getRoomInfo(), player);
      callback({ success: true });
      console.log(`${playerName} joined room ${roomCode}`);
    } else {
      callback({
        success: false,
        message: "Failed to join the room. Room is full!",
      });
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
app.listen(port, () => console.log(`Listening on port ${port}...`));
