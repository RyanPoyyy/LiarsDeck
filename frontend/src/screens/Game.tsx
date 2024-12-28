import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import HistoryArea from "../components/HistoryArea";
import RuleText from "../components/RuleText";
import PlayArea from "../components/PlayArea";
import PlayerAction from "../components/PlayerAction";
import { useGameInfo } from "../hooks/useGameInfo";
import toast from "react-hot-toast";
import ToasterBar from "../components/ToasterBar";
import KilledModal from "../components/killedModal";

const Game = () => {
  const navigate = useNavigate();
  const roomCode = sessionStorage.getItem("roomCode") as string;
  const playerId = sessionStorage.getItem("socketId") as string;
  const playerName = sessionStorage.getItem("playerName") as string;
  const isHost = sessionStorage.getItem("isHost") == "true";

  useEffect(() => {
    if (!roomCode || !playerId || !playerName) {
      console.log(
        "Missing roomCode or playerId or playerName. Redirecting to home..."
      );
      navigate("/");
    }
  }, [roomCode, playerId, navigate]);

  const {
    selectedCards,
    setSelectedCards,
    gameInfo,
    isYourTurn,
    playCards,
    challengeHandler,
    nextRoundHandler,
    isGameOver,
    isKilled,
    affectedPlayer,
    winner,
    isWin,
  } = useGameInfo(roomCode, playerId);

  // Select cards logic
  const handleCardSelection = (index: number) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else if (prevSelected.length == 3) {
        toast.error("You can only select 3 cards");
        return prevSelected;
      } else {
        return [...prevSelected, index];
      }
    });
  };

  //   Play logic:
  const handlePlay = () => {
    const yourHand = gameInfo.players[0].playerCards;
    const selectedCardsArr = selectedCards.map((index) => yourHand[index]);
    const action = {
      playerName: playerName,
      playerId: playerId,
      actionType: "play",
      cardsPlayed: selectedCardsArr,
      cardsIndex: selectedCards,
    };
    playCards(action, (success: boolean, message?: string) => {});
  };

  //   Challenge logic:
  const [isChallenged, setIsChallenged] = useState(false);
  const handleChallenge = () => {
    setIsChallenged(true);
  };

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

  return (
    <>
      <ToasterBar />
      <KilledModal
        isVisible={isGameOver}
        isKilled={isKilled}
        affectedPlayer={affectedPlayer}
        isHost={isHost}
      />
      {gameInfo.players.length > 0 && (
        <>
          <HistoryArea
            actions={gameInfo.actions}
            isChallenged={isChallenged}
            liarCard={gameInfo.liarCard}
          />
          <RuleText liarCard={gameInfo.liarCard} />
          <PlayArea
            playerObjs={gameInfo.players}
            selectedCards={selectedCards}
            onClick={handleCardSelection}
            isTurn={gameInfo.players[0].isTurn}
          />
          <PlayerAction
            gameInfo={gameInfo}
            selectedCards={selectedCards}
            // isTurn={isYourTurn}
            isTurn={gameInfo.players[0].isTurn}
            playClick={handlePlay}
            challengeClick={handleChallenge}
          />
        </>
      )}
    </>
  );
};

export default Game;
