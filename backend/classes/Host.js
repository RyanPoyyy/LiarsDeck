const Player = require("./Player");

class Host extends Player {
  constructor(playerId, playerName, cards, isAlive, playerLives) {
    super(playerId, playerName, cards, isAlive, playerLives);
  }
}

module.exports = Host;
