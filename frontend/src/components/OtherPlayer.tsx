import { FC } from "react";
import Lives from "./Lives";
import OtherCard from "./OtherCard";
interface Props {
  playerObj: any;
  isCardBack: boolean;
  transformClass: any;
}

const OtherPlayer: FC<Props> = ({
  playerObj,
  isCardBack = true,
  transformClass,
}) => {
  return (
    <div className={transformClass}>
      {/* Bar containing Cards */}
      {playerObj.isAlive && (
        <div className="card-row">
          {playerObj.playerCards.map((card: any, index: number) => {
            return <OtherCard key={index} name={card} back={isCardBack} />;
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
              src={"/img/Death.png"}
              className="w-8 h-8 mobile:w-10 mobile:h-10 object-contain"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default OtherPlayer;
