import React, { FC, useEffect, useState } from "react";
import Player from "./Player";
import OtherPlayer from "./OtherPlayer";

interface Props {
  playerObjs: any;
  turnIndex?: number;
  currentPlayer?: any;
  selectedCards: number[];
  onClick: (index: number) => void;
}

const PlayArea: FC<Props> = ({
  playerObjs,
  turnIndex,
  currentPlayer,
  selectedCards,
  onClick,
}) => {
  const yourId = sessionStorage.getItem("yourId");
  const positions: { [key: number]: string } = {
    0: "bottom-screen",
    1: "right-screen",
    2: "top-screen",
    3: "left-screen",
  };

  return (
    // <div className="absolute bottom-[56px] w-full h-[70%]  ">
    <div className=" mb-4 mt-2 flex flex-1 flex-col-reverse justify-end gap-2 ">
      {playerObjs.map((player: any, index: number) => {
        return (
          <div key={index}>
            {index == 0 ? (
              <Player
                playerObj={player}
                selectedCards={selectedCards}
                onClick={onClick}
                transformClass={`player-box ${player.isTurn ? "isturn" : ""}`}
              />
            ) : (
              <OtherPlayer
                playerObj={player}
                isCardBack={true}
                transformClass={`player-box ${player.isTurn ? "isturn" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlayArea;
