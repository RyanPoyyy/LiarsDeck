import React, { FC } from "react";
import Lives from "./Lives";
import OtherCard from "./OtherCard";
interface Props {
  playerObj: any;
  playerName: string;
  isAlive: boolean;
  cards: string[];
  lives: number;
  isTurn: boolean;
}

const OtherPlayer: FC<Props> = ({
  playerObj,
  playerName,
  isAlive,
  cards,
  lives,
  isTurn,
}) => {
  return (
    <div className="player-box">
      {/* Bar containing Cards */}
      <div className="card-row">
        {cards.map((card, index) => {
          return <OtherCard key={index} name={card} back={isTurn} />;
        })}
      </div>

      {/* Bar containing name and lives/death info */}
      <div className="info-row">
        <span className="player-name">{playerName}</span>
        <span className="info">
          {isAlive ? (
            <Lives lives={lives} />
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

export default OtherPlayer;
