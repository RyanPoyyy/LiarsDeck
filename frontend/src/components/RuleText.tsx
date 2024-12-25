import React, { FC } from "react";

interface Props {
  liarCard: string;
}

const RuleText: FC<Props> = ({ liarCard }) => {
  return (
    <div className="flex justify-center mt-2 border-t border-gray-300">
      <span className={"text-red-500 mobile:text-base text-sm font-extrabold"}>
        {liarCard}'s &nbsp;
      </span>
      <span className={"text=black mobile:text-base text-sm"}> Table</span>
    </div>
  );
};

export default RuleText;
