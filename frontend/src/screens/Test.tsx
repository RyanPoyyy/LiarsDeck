import React from "react";
import Player from "../components/Player";
import OtherPlayer from "../components/OtherPlayer";

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

  return (
    <>
      <div className="fixed bottom-[56px] h-[70%] w-[100%] bg-blue-300">
        <Player
          playerObj={playerObj}
          selectedCards={[]}
          onClick={() => console.log}
          transformClass={"player-box isturn"}
        />
        {/* <OtherPlayer
          playerObj={playerObj2}
          isCardBack={true}
          //   transformClass={"right-screen desktop:pl-[40%]"}
          transformClass={"right-screen2 "}
        />
        <OtherPlayer
          playerObj={playerObj2}
          isCardBack={true}
          //   transformClass={"right-screen desktop:pl-[40%]"}
          transformClass={"left-screen "}
        />
        <OtherPlayer
          playerObj={playerObj2}
          isCardBack={true}
          //   transformClass={"right-screen desktop:pl-[40%]"}
          transformClass={"top-screen"}
        /> */}
      </div>

      {/* sample button */}
      <div className="fixed bottom-2 left-0 right-0 bg-slate-500 h-[44px]">
        buttons
      </div>
    </>
  );
};

export default Test;
