# Liar's Deck game clone

Liar's Deck is a web app game clone and inspired by [Liar's Deck (click to view the actual game)](https://store.steampowered.com/app/3097560/Liars_Bar/). This project is developed for educational purposes, particularly for learning web sockets concepts. All credits to the game goes to the Liar's Bar game.

## Tech stacks

- React
- Typescript
- Tailwind css
- Node.js
- Express.js
- Socket.IO

## Features

- Responsive, mobile-friendly React client built using Tailwind
- Frontend developed with reusable components and hooks with Typescript's typesafe interface
- Real-time, 2 way communication between client and server using Socket.io, hosted on an Express server
- Backend server developed with reusable classes using OOP concepts
- Features lobby management and game management features.

## About the game

Liar's Deck is a high-stakes card game that combines deception, strategy, and psychological warfare.

Inspired by the classic bluff game, this version adds dramatic flair with a dose of danger.

The goal of the game is to clear your cards as fast as possible without being caught for bluffing. Every round, players take turns to either play 1-3 cards or to challenge the previous player's action.

## Game Rules

- This 4 player game starts with a deck containing 6x Queens, 6x Kings, 6x Ace and 2x Jokers (Jokers can take on any card value).
- Each player will also start with a virtual revolver with 1 bullet randomly placed in the chamber.
- At the start of each round, a liar card (either a Queen, King or Ace) will be determined. All cards played in this round will claim to be the liar card.
- Each turn, players can either choose to play 1-3 cards (claiming all cards played are the same value as the liar card), or challenge the previous player's action.
  Challenge: (if player A challenges player B)
- Successful Challenge: Successful challenge occurs if any of the cards that player B plays does no match the liar card or is not a Joker. Player B will take a shot at the death roulette
- Failed Challenge: Occurs when all of the cards played by player B matches the liar card or is a Joker. Player A will take a shot at the death roulette

- If a player is the last player to finish his cards in the round, he will also take a shot at the death roulette
- The death roulette means firing the gun at oneself. If it's an empty chamber, the game proceeds to the next round; if successful, the player is eliminated, and the game continues to the next round
- The last player alive is the winner

## Demo

## Getting started

### Dependencies

- node npm installed

### Installation

- Clone the repo

```
git clone https://github.com/RyanPoyyy/LiarsDeck.git
```

### Backend setup

- cd to the Backend Repository

```
cd backend
```

- Installing dependencies

```
npm install
```

- Running the backend server (on port 3001)

```
npm run start
```

### Frontend setup

- cd to the Frontend Repository

```
cd frontend
```

- Installing dependencies

```
npm install
```

- Running the frontend vite server (on port 5173)

```
npm run dev
```