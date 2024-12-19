class Player {
  playerId;
  playerName;
  cards;
  isAlive;
  lives;

  constructor(playerId, playerName, cards, isAlive, lives) {
    this.playerId = playerId;
    this.playerName = playerName;
    this.cards = cards;
    this.isAlive = isAlive;
    this.lives = lives;
  }

  playCards(playedCards) {
    // playedCards is an array of indexes
    this.cards = this.cards.filter(
      (card, index) => !playedCards.includes(index)
    );
  }
  getPlayerInfo() {
    return {
      playerId: this.playerId,
      playerName: this.playerName,
      playerCards: this.cards,
      isAlive: this.isAlive,
      playerLives: this.lives,
    };
  }
}

module.exports = Player;
