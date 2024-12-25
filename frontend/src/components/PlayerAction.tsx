import React, { FC } from "react";

interface Props {
  selectedCards: number[];
  isTurn: boolean;
  playClick: () => void;
  challengeClick: () => void;
}

const PlayerAction: FC<Props> = ({
  selectedCards,
  isTurn,
  playClick,
  challengeClick,
}) => {
  return (
    <div className="flex justify-center mt-2 space-x-4 mx-auto mb-4">
      {/* Play Button */}
      <button
        onClick={playClick}
        disabled={selectedCards.length === 0}
        className={`px-2 py-2 rounded text-white text-sm mobile:text-base w-32 mobile:w-48 ${
          selectedCards.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        Play
      </button>

      {/* Challenge Button */}
      <button
        onClick={challengeClick}
        disabled={!isTurn}
        className={`px-2 py-2 text-sm mobile:text-base w-32 mobile:w-48 text-center text-white rounded ${
          !isTurn
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Challenge
      </button>
    </div>
  );
};

export default PlayerAction;
