import React, { FC } from "react";

interface Props {
  liarCard: string;
}

const RuleText: FC<Props> = ({ liarCard }) => {
  return (
    <div className="flex justify-center mt-2">
      <span className={"text-red-500 mobile:text-xl text-lg font-extrabold"}>
        {liarCard}'s &nbsp;
      </span>
      <span className={"text=black mobile:text-xl text-lg"}> Table</span>
    </div>
  );
};

export default RuleText;
