import React, { FC } from "react";

interface Props {
  back: boolean;
  name: string;
  isValid: boolean;
}

const ChallengedCard: FC<Props> = ({ back, name, isValid }) => {
  const imageUrl = `/img/${name}.jpg`;
  return (
    <div
      className={`card group ${back ? "" : "flipped"} 
    `}
    >
      {/* <div className="card-inner"> */}
      {/* Backface of card */}
      <div className="card-back backface-hidden">
        <img src="/img/Back.jpg" />
      </div>

      {/* Frontface of card */}
      <div
        className={`card-face backface-hidden ${
          isValid ? `correct-border` : `wrong-border`
        }`}
      >
        <img src={imageUrl} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default ChallengedCard;
