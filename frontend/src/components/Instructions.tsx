import { useEffect, useState } from "react";
import ChallengedCard from "./ChallengedCard";

const Instructions = () => {
  const [isBack, setIsBack] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBack(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="mt-6 flex w-max text-center justify-center flex-col mx-auto">
      <p className="text-xl font-bold text-white mb-4">Cards in the deck</p>
      <table className="border-spacing-y-5 border-separate">
        <CardRow cardValue="Queen" quantity={6} isBack={isBack} />
        <CardRow cardValue="King" quantity={6} isBack={isBack} />
        <CardRow cardValue="Ace" quantity={6} isBack={isBack} />
        <CardRow cardValue="Joker" quantity={2} isBack={isBack} />
      </table>
    </div>
  );
};

const CardRow = ({
  cardValue,
  quantity,
  isBack,
}: {
  cardValue: string;
  quantity: number;
  isBack: boolean;
}) => {
  return (
    // <div className="flex gap-2 justify-center mt-4">
    <tr className="align-middle border-spacing-y-8">
      <td>
        <p className="text-base mr-2">
          {quantity}x {cardValue}
        </p>
      </td>
      <td>
        <div className="flex justify-start gap-1">
          {Array(quantity)
            .fill(0)
            .map((_, index) => (
              <ChallengedCard
                key={index}
                back={isBack}
                isValid={true}
                name={cardValue}
              />
            ))}
        </div>
      </td>
      {/* </div>
    </div> */}
    </tr>
  );
};

export default Instructions;
