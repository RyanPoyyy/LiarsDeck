import { FC, useEffect, useState } from "react";
import OtherCard from "./OtherCard";

interface Props {
  liarCard: string;
}

const StartRound: FC<Props> = ({ liarCard }) => {
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
    <>
      <div className="mt-8">
        <p className="text-lg font-bold text-center">
          The liar card for this round is{" "}
          <span className="text-red-500 font-bold">{liarCard}</span>
        </p>
      </div>
      <div className="flex mx-auto justify-center mt-6  ">
        <OtherCard back={isBack} name={liarCard} />
      </div>
    </>
  );
};

export default StartRound;
