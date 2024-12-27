import { useEffect, useState } from "react";
import BackCard from "./components/Card";
import Player from "./components/Player";
import OtherCard from "./components/OtherCard";
import OtherPlayer from "./components/OtherPlayer";
import PlayerAction from "./components/PlayerAction";
import HistoryArea from "./components/HistoryArea";
import RuleText from "./components/RuleText";
import Logo from "./components/Logo";
import PlayArea from "./components/PlayArea";

function App() {
  const [flip, setFlip] = useState(false);

  // FLip cards logic
  const flipMe = () => {
    console.log("Clicked");
    setFlip(!flip);
  };
  useEffect(() => {
    console.log(flip);
  }, [flip]);

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

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

  const actions = [
    {
      playerName: "Rapie",
      cardsPlayed: ["Ace", "Queen", "King"],
    },
  ];

  // Challenge logic:
  const [isChallenged, setIsChallenged] = useState(false);
  const handleChallenge = () => {
    console.log("Challenge");
    setIsChallenged(!isChallenged);
  };
  useEffect(() => {
    console.log(isChallenged);
  }, [isChallenged]);

  // dummy player objects:
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
      isTurn: true,
      isAlive: true,
      isHost: false,
    },
    {
      playerId: "c33333",
      playerName: "Rapie",
      playerCards: ["King", "Joker", "Ace"],
      playerLives: 4,
      isTurn: true,
      isAlive: true,
      isHost: false,
    },
    {
      playerId: "d44444",
      playerName: "Jen",
      playerCards: ["Queen", "King", "Joker", "Ace"],
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
        liarCard="Joker"
      />
      <RuleText liarCard="Queen" />
      {/* <OtherPlayer
        playerObj={{}}
        playerName="Caitlin"
        isAlive={true}
        cards={cards}
        lives={6}
        isTurn={true}
      />
      <h1 onClick={() => flipMe()}>CLICK</h1>
      <br />
      <br />
      <Player
        playerObj={{}}
        playerName="Ryan"
        isAlive={false}
        cards={cards}
        isTurn={true}
        lives={6}
        selectedCards={selectedCards}
        onClick={handleCardSelection}
      /> */}
      <PlayArea
        playerObjs={playerObjects}
        turnIndex={0}
        currentPlayer={1}
        selectedCards={selectedCards}
        onClick={handleCardSelection}
      />
      <PlayerAction
        gameInfo={{ actions: [] }}
        selectedCards={selectedCards}
        isTurn={true}
        playClick={() => console.log("Play")}
        challengeClick={() => handleChallenge()}
      />
    </>
  );
}

export default App;
