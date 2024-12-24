const Player = require("./Player");

class Host extends Player {
  constructor(playerId, playerName, cards, isAlive, lives) {
    super(playerId, playerName, cards, isAlive);
  }
}

module.exports = Host;
