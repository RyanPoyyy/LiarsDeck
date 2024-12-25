import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HistoryArea from "../components/HistoryArea";
import RuleText from "../components/RuleText";
import PlayArea from "../components/PlayArea";
import PlayerAction from "../components/PlayerAction";

const Game = () => {
  const navigate = useNavigate();
  const gameCode = sessionStorage.getItem("gameCode") as string;
  const playerId = sessionStorage.getItem("socketId") as string;

  //   useEffect(() => {
  //     if (!gameCode || !playerId) {
  //       navigate("/");
  //       return;
  //     }
  //   }, []);

  // Select cards logic
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const handleCardSelection = (index: number) => {
    setSelectedCards(
      (prevSelected) =>
        prevSelected.includes(index)
          ? prevSelected.filter((i) => i !== index) // Deselect card
          : [...prevSelected, index] // Select card
    );
  };

  //   Challenge logic:
  const [isChallenged, setIsChallenged] = useState(false);
  const handleChallenge = () => {
    setIsChallenged(true);
  };

  //   Liar Card:
  const [liarCard, setLiarCard] = useState("Ace");

  // is it your turn?
  const [isYourTurn, setIsYourTurn] = useState(false);

  //   Dummy Data:
  // 1) Actions:
  const actions = [
    {
      playerName: "Rapie",
      cardsPlayed: ["Jack", "Queen", "King"],
    },
  ];

  //   2) player objects:
  const playerObjects = [
    {
      playerId: "a1111",
      playerName: "Ryan Poy",
      playerCards: ["Jack", "Queen", "King", "Joker", "Jack"],
      playerLives: 4,
      isTurn: true,
      isAlive: true,
      isHost: true,
    },
    {
      playerId: "b1112",
      playerName: "Caitlin",
      playerCards: ["Jack", "Jack"],
      playerLives: 6,
      isTurn: false,
      isAlive: true,
      isHost: false,
    },
    {
      playerId: "c33333",
      playerName: "Rapie",
      playerCards: ["King", "Joker", "Jack"],
      playerLives: 4,
      isTurn: false,
      isAlive: true,
      isHost: false,
    },
    {
      playerId: "d44444",
      playerName: "Jen",
      playerCards: ["Queen", "King", "Joker", "Jack"],
      playerLives: 4,
      isTurn: false,
      isAlive: true,
      isHost: false,
    },
  ];

  return (
    <>
      <HistoryArea
        actions={actions}
        isChallenged={isChallenged}
        liarCard={liarCard}
      />
      <RuleText liarCard={liarCard} />
      <PlayArea
        playerObjs={playerObjects}
        selectedCards={selectedCards}
        onClick={handleCardSelection}
      />
      <PlayerAction
        selectedCards={selectedCards}
        isTurn={isYourTurn}
        playClick={() => console.log()}
        challengeClick={handleChallenge}
      />
    </>
  );
};

export default Game;
