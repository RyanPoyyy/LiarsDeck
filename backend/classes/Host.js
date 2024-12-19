const Player = require("./Player");

class Host extends Player {
  constructor(playerId, playerName, cards, isAlive, bulletArray, bulletNumber) {
    super(playerId, playerName, cards, isAlive, bulletArray, bulletNumber);
  }
}

module.exports = Host;
