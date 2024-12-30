import { FC } from "react";
import ChallengedCard from "./ChallengedCard";

interface Props {
  actions: any;
  isChallenged: boolean;
  liarCard: string;
}

const HistoryArea: FC<Props> = ({ actions, isChallenged, liarCard }) => {
  const lastAction = actions.length ? actions[actions.length - 1] : null;

  const calculateCardValidity = (value: string, liarCard: string) => {
    if (value == "Joker" || value == liarCard) {
      return true;
    }
    return false;
  };

  return (
    <div className="mt-0  relative flex justify-center">
      {actions.length > 0 ? (
        <div className="bottom-0 ">
          <p className="flex flex-row align-middle justify-center mobile:text-base text-sm text-white">{`${lastAction.playerName} claims ${lastAction.cardsPlayed.length} ${liarCard}`}</p>
          <div className="flex flex-row align-middle justify-center gap-4">
            {lastAction.cardsPlayed.map((card: string, index: number) => {
              return (
                <ChallengedCard
                  key={index}
                  name={card}
                  back={!isChallenged}
                  isValid={calculateCardValidity(card, liarCard)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-[92px]" />
      )}
    </div>
  );
};

export default HistoryArea;
