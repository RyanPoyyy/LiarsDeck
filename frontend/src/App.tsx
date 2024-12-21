import { useEffect, useState } from "react";
import BackCard from "./components/Card";
import Player from "./components/Player";
import OtherCard from "./components/OtherCard";
import OtherPlayer from "./components/OtherPlayer";
import PlayerAction from "./components/PlayerAction";
import HistoryArea from "./components/HistoryArea";
import RuleText from "./components/RuleText";
import Logo from "./components/Logo";

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

  const cards = ["Jack", "Queen", "King", "Joker", "Jack"];
  const actions = [
    {
      playerName: "Rapie",
      cardsPlayed: ["Jack", "Queen", "King"],
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
  return (
    <>
      <Logo />
      <HistoryArea
        actions={actions}
        isChallenged={isChallenged}
        liarCard="Joker"
      />
      <RuleText liarCard="Queen" />
      <OtherPlayer
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
        isTurn={false}
        lives={6}
        selectedCards={selectedCards}
        onClick={handleCardSelection}
      />
      <PlayerAction
        selectedCards={selectedCards}
        isTurn={true}
        playClick={() => console.log("Play")}
        challengeClick={() => handleChallenge()}
      />
    </>
  );
}

export default App;
