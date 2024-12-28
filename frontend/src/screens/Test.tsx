import React, { useState } from "react";
import Player from "../components/Player";
import OtherPlayer from "../components/OtherPlayer";
import Barrel from "../components/Barrel";
import KilledModal from "../components/killedModal";
import WinnerModal from "../components/WinnerModal";

const Test = () => {
  const playerObj = {
    playerId: "a1111",
    playerName: "Ryan Poy",
    playerCards: ["Jack", "Queen", "King", "Joker", "Jack"],
    playerLives: 4,
    isTurn: false,
    isAlive: true,
    isHost: true,
  };

  const playerObj2 = {
    playerId: "a1111",
    playerName: "Caitlin Yap",
    playerCards: ["Jack", "Queen", "King", "Joker", "Jack"],
    playerLives: 4,
    isTurn: true,
    isAlive: true,
    isHost: true,
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const affectedPlayer = {
    playerName: "Ryan Poy",
    playerLives: 4,
    isAlive: false,
  };

  return (
    <>
      <div>
        <button onClick={() => setShow(true)} className="create-button">
          SHOW
        </button>
        <button onClick={() => setShow2(true)} className="create-button">
          SHOW 2
        </button>
        <br />
        <KilledModal
          isVisible={show}
          isKilled={true}
          affectedPlayer={affectedPlayer}
          isHost={true}
        />
        <WinnerModal isVisible={show2} isHost={false} player={affectedPlayer} />
      </div>
    </>
  );
};

export default Test;
