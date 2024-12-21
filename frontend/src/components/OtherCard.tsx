import React, { FC } from "react";

interface Props {
  back: boolean;
  name: string;
}

const OtherCard: FC<Props> = ({ back, name }) => {
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
      <div className="card-face backface-hidden">
        <img src={imageUrl} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default OtherCard;
