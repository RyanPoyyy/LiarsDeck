import React, { FC } from "react";

interface Props {
  back: boolean;
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const Card: FC<Props> = ({ back, name, isSelected, onClick }) => {
  const imageUrl = `/img/${name}.jpg`;
  return (
    <div
      className={`your-card group ${back ? "" : "flipped"} 
    ${isSelected ? "selected" : ""}
    `}
      onClick={onClick}
    >
      {/* <div className="card-inner"> */}

      {/* Frontface of card */}
      <div className="your-card-face backface-hidden">
        <img src={imageUrl} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Card;
