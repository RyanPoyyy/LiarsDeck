const Game = require("./Game");
const Host = require("./Host");

class Room {
  roomCode;
  hostId;
  players;
  game;

  constructor(roomCode, hostId) {
    this.roomCode = roomCode;
    this.hostId = hostId;
    this.players = [];
    this.game = null;
  }

  addPlayer(playerObj, isHost = false) {
    if (isHost) {
      this.players.push(playerObj);
      return true;
    }
    if (this.players.length == 4) {
      return false;
    }
    this.players.push(playerObj);
    return true;
  }

  removePlayer(playerId) {
    let player;
    player = this.players.find((p) => p.playerId === playerId);
    this.players = this.players.filter((player) => player.playerId != playerId);
    return player;
  }

  startGame() {
    if (this.players.length == 4) {
      for (let i = 0; i < this.players.length; i++) {
        this.players[i].lives = 6;
        this.players[i].isAlive = true;
      }
      this.game = new Game(this.players);
      return true;
    }
    return false;
  }

  //   To see if there is only 1 player still alive (signify end of game):
  checkWinner() {
    let alivePlayers = this.players.filter((player) => player.isAlive);
    if (alivePlayers.length == 1) {
      return alivePlayers[0];
    }
    return null;
  }

  restartGame() {
    this.players.forEach((player) => {
      player.isAlive = true;
      player.lives = 6;
    });
    this.startGame();
  }

  getRoomInfo() {
    return {
      roomCode: this.roomCode,
      players: this.players.map((player) => {
        return {
          playerId: player.playerId,
          playerName: player.playerName,
          // playerCards: player.cards,
          // isAlive: player.isAlive,
          // playerLives: player.lives,
          isHost: player instanceof Host ? true : false,
        };
      }),
    };
  }
}

module.exports = Room;
