const Deck = require("./Deck");
const Host = require("./Host");

// actions array (structure for action objects):
// {
//     playerId : String,
//    actionType: String,
//     cardsPlayed: Array of Strings,

// }

class Game {
  deck;
  players;
  liarCard;
  currentTurnIndex;
  actions;

  constructor(players) {
    this.players = players;
    this.dealCards();
  }

  dealCards() {
    this.deck = new Deck();
    const cardTypes = ["Ace", "King", "Queen"];
    this.liarCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    this.currentTurnIndex = 0;
    this.actions = [];
    this.players.forEach((player) => {
      if (player.isAlive) {
        player.cards = this.deck.dealCards(5);
      }
    });
  }

  getCurrentPlayer() {
    return this.players[this.currentTurnIndex];
  }

  getPlayer(playerId) {
    return this.players.find((player) => player.playerId == playerId);
  }

  getGameState(playerId) {
    // TODO: Map the array to rearrange array
    const yourIndex = this.players.findIndex(
      (player) => player.playerId === playerId
    );
    const temp = this.players.map((player, index) => ({
      ...player,
      isHost: player instanceof Host ? true : false,
      isTurn: index === this.currentTurnIndex,
    }));
    const reorderedPlayers = [
      ...temp.slice(yourIndex),
      ...temp.slice(0, yourIndex),
    ];

    return {
      currentPlayerId: this.players[this.currentTurnIndex].playerId,
      players: reorderedPlayers.map((player) => {
        return {
          playerId: player.playerId,
          playerName: player.playerName,
          playerCards: player.cards,
          isAlive: player.isAlive,
          playerLives: player.lives,
          isHost: player.isHost,
          isTurn: player.isTurn,
        };
      }),
      currentTurn: this.currentTurnIndex,
      liarCard: this.liarCard,
      actions: this.actions,
    };
  }

  nextTurn() {
    this.currentTurnIndex = this.currentTurnIndex + 1;
    // Check if it exceeds the array size
    if (this.currentTurnIndex == 4) {
      this.currentTurnIndex = 0;
    }

    // Check if player is alive:
    while (!this.players[this.currentTurnIndex].isAlive) {
      this.currentTurnIndex = this.currentTurnIndex + 1;
    }

    // Check if player has cards left:
    while (this.players.cards.length != 0) {
      this.currentTurnIndex = this.currentTurnIndex + 1;
    }
  }

  processAction(action) {
    this.actions.push(action);

    // Context, person A challenges person B
    if (action.actionType == "challenge") {
      const challengeSuccessful = this.challenge();
      let isPlayerKilled = false;
      let challengedPerson;

      // Person B lied so challenge successful
      if (challengeSuccessful) {
        const previousAction = this.actions[this.actions.length - 1];
        const previousPlayerId = previousAction.playerId;
        const previousPlayerObj = this.getPlayer(previousPlayerId);

        // isPlayerKilled tells whether player B is killed
        isPlayerKilled = this.shoot(previousPlayerObj);
        challengedPerson = previousPlayerObj;
      }

      // Person B told the truth, so person A takes the chamber
      else {
        const currentPlayer = this.getCurrentPlayer();
        // isPlayerKilled tells whether player A is killed
        isPlayerKilled = this.shoot(currentPlayer);
        challengedPerson = currentPlayer;
      }
      //   EDIT BELOW, if player killed, need to let the Room know to proceed to next game
      // Should emit both isPlayerKilled and challengedPerson to FE
      //   if(isPlayerKilled){}
    }

    // Action is "play", dont need to do anything
    this.nextTurn();
  }

  challenge() {
    const currentPlayer = this.getCurrentPlayer();

    const previousAction = this.actions[this.actions.length - 1];
    const previousPlayer = this.getPlayer(previousAction.playerId);
    const previousPlayerMoves = previousAction.cardsPlayed;
    for (let i = 0; i < previousPlayerMoves.length; i++) {
      if (previousPlayerMoves[i] == "Joker") {
        continue;
      }
      if (previousPlayerMoves[i] != this.liarCard) {
        return false;
      }
    }
    return true;
  }

  shoot(playerObj) {
    const chamber = Math.floor(Math.random() * 6);
    // KILL
    if (chamber == 0) {
      playerObj.lives = 0;
      playerObj.isAlive = false;
      return true;
    } else {
      playerObj.lives = playerObj.lives - 1;
      if (playerObj.lives == 0) {
        playerObj.isAlive = false;
        return true;
      }
      return false;
    }
  }
}

module.exports = Game;
