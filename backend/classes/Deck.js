class Deck {
  dealerCards;

  constructor() {
    this.dealerCards = [];
    this.createDeck();
  }

  createDeck() {
    const deck = [];
    for (let i = 0; i < 6; i++) {
      deck.push("Ace", "King", "Queen");
    }
    deck.push("Joker", "Joker");
    this.dealerCards = deck.sort(() => Math.random() - 0.5);
  }

  dealCards(count) {
    return this.dealerCards.splice(0, count);
  }
}

module.exports = Deck;
