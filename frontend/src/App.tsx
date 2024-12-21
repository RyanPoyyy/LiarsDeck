import { useEffect, useState } from "react";
import BackCard from "./components/Card";
import Player from "./components/Player";
import OtherCard from "./components/OtherCard";

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
  return (
    <>
      <OtherCard back={flip} name={"Jack"} />
      <OtherCard back={flip} name={"Queen"} />
      <OtherCard back={flip} name={"King"} />
      <OtherCard back={flip} name={"Joker"} />
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
    </>
  );
}

export default App;
