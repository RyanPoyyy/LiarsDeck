const Deck = require("./Deck");
const Host = require("./Host");

// actions array (structure for action objects):
// {
// playerName: String,
//     playerId : String,
//    actionType: String,
//     cardsPlayed:
// obj of structure {
//         index (number): cardValue (string)}

// }

class Game {
  deck;
  players;
  liarCard;
  currentTurnIndex;
  actions;

  constructor(players) {
    this.players = players;
    this.currentTurnIndex = 0;
    this.dealCards();
  }

  dealCards() {
    this.deck = new Deck();
    const cardTypes = ["Ace", "King", "Queen"];
    this.liarCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
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
    console.log("PLAYERS:" + this.players[0]);
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
    while (this.players[this.currentTurnIndex].cards.length == 0) {
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
        return {
          eventType: "challenge_successful",
          isPlayerKilled: isPlayerKilled,
          player: previousPlayerObj,
        };
      }

      // Person B told the truth, so person A takes the chamber
      else {
        const currentPlayer = this.getCurrentPlayer();
        // isPlayerKilled tells whether player A is killed
        isPlayerKilled = this.shoot(currentPlayer);
        challengedPerson = currentPlayer;
        return {
          eventType: "challenge_failed",
          isPlayerKilled: isPlayerKilled,
          player: currentPlayer,
        };
      }
    }

    // Action is "play", process cards
    else {
      const currentPlayerId = action.playerId;
      const currentPlayer = this.getPlayer(currentPlayerId);
      const cardsPlayedObj = action.cardsPlayed;
      let tempCardArray;
      tempCardArray = currentPlayer.cards.filter(
        (card, index) => !(index in cardsPlayedObj)
      );
      currentPlayer.cards = tempCardArray;
      this.nextTurn();
      // After going next turn, need to check if only 1 player has cards left:
      if (this.checkPlayers()) {
        // need to kill the next fella
        const currentPlayer = this.getCurrentPlayer();
        const isKilled = this.shoot(this.getCurrentPlayer());
        return {
          eventType: "game_over",
          isPlayerKilled: isKilled,
          player: currentPlayer,
        };
      }
      // else, next turn, return none?
      return {
        eventType: "play",
        isPlayerKilled: false,
        player: currentPlayer,
      };
    }
  }

  challenge() {
    const currentPlayer = this.getCurrentPlayer();

    const previousAction = this.actions[this.actions.length - 1];
    const previousPlayer = this.getPlayer(previousAction.playerId);
    for ([index, cardValue] of Object.entries(previousAction.cardsPlayed)) {
      if (cardValue == "Joker") {
        continue;
      }
      if (cardValue != this.liarCard) {
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

  // Function to check if there is only 1 player with cards left:
  checkPlayers() {
    let only1Playerleft = false;
    for (player of this.players) {
      if (player.isAlive && player.cards.length == 0) {
        only1Playerleft = true;
      }
    }
    return only1Playerleft;
  }

  // go to next round: return True if can go, false if game finish
  nextRound() {
    // go to next round:
    this.nextTurn();

    // Check if there is only 1 player remaining:
    let isAlive = 0;
    for (player of this.players) {
      if (player.isAlive) {
        isAlive += 1;
      }
    }
    if (isAlive == 1) {
      return false;
    }
    this.dealCards();
    return true;
  }
}

module.exports = Game;
