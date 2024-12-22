import React, { FC } from "react";
interface Props {
  lives: number;
}

const Lives: FC<Props> = ({ lives }) => {
  return (
    <div className="flex items-center space-x-1">
      <span className="mobile:text-lg text-base">{`${lives}/6`}</span>
      <img
        src="/img/Barrel.png"
        className="w-5 h-5 mobile:w-8 mobile:h-8 object-contain"
      />
    </div>
  );
};

export default Lives;
