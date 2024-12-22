import React, { FC } from "react";
import Lives from "./Lives";
import Card from "./Card";
interface Props {
  playerObj: any;
  selectedCards: number[];
  onClick: (index: number) => void;
  transformClass: any;
}

const Player: FC<Props> = ({
  playerObj,
  selectedCards,
  onClick,
  transformClass,
}) => {
  return (
    <div className={transformClass}>
      {/* Bar containing Cards */}
      {playerObj.isAlive && (
        <div className="card-row">
          {playerObj.playerCards.map((card: any, index: number) => {
            return (
              <Card
                key={index}
                name={card}
                back={playerObj.isTurn}
                isSelected={selectedCards.includes(index)}
                onClick={() => onClick(index)}
              />
            );
          })}
        </div>
      )}

      {/* Bar containing name and lives/death info */}
      <div className="info-row">
        <span className={`player-name ${playerObj.isTurn ? "isturn" : ""}`}>
          {playerObj.playerName}
        </span>
        <span className="info">
          {playerObj.isAlive ? (
            <Lives lives={playerObj.playerLives} />
          ) : (
            <img
              src={"/img/Skull2.png"}
              className="w-8 h-8 mobile:w-10 mobile:h-10 object-contain"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default Player;
