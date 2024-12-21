import React, { FC } from "react";
import OtherCard from "./OtherCard";

interface Props {
  actions: any;
  isChallenged: boolean;
  liarCard: string;
}

const HistoryArea: FC<Props> = ({ actions, isChallenged, liarCard }) => {
  const lastAction = actions[actions.length - 1];

  return (
    <div className="mt-4 h-[150px] relative flex justify-center">
      <div className="bottom-0 absolute">
        <p className="flex flex-row align-middle justify-center mobile:text-xl text-lg text-black">{`${lastAction.playerName} claims ${lastAction.cardsPlayed.length} ${liarCard}`}</p>
        <div className="flex flex-row align-middle justify-center gap-4">
          {lastAction.cardsPlayed.map((card: string, index: number) => {
            return <OtherCard key={index} name={card} back={isChallenged} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HistoryArea;
