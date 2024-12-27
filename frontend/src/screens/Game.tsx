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
    gameInfo,
    isGettingGameInfo,
    isYourTurn,
    performAction,
    isGameOver,
    isKilled,
    affectedPlayer,
    winner,
    isWin,
  } = useGameInfo(roomCode, playerId);

  // Select cards logic
  const [selectedCards, setSelectedCards] = useState<Record<number, string>>(
    {}
  );
  const handleCardSelection = (index: number, cardValue: string) => {
    setSelectedCards((prevSelected) => {
      const isCardSelected = index in prevSelected;

      // If card is already selected, remove it
      if (isCardSelected) {
        const { [index]: removedCard, ...remainingCards } = prevSelected;
        return remainingCards;
      }

      // If already 3 cards are selected, show error
      if (Object.keys(prevSelected).length >= 3) {
        toast.error("You can only select 3 cards");
        return prevSelected;
      }

      // Add the new card to the selection
      return {
        ...prevSelected,
        [index]: cardValue,
      };
    });
  };

  //   Play logic:
  const handlePlay = () => {
    // const yourHand = gameInfo.players[0].playerCards;
    // const selectedCardsArr = selectedCards.map((index) => yourHand[index]);
    const action = {
      playerName: playerName,
      playerId: playerId,
      actionType: "play",
      cardsPlayed: selectedCards,
    };
    performAction(action, (success: boolean, message?: string) => {
      if (success) {
        setSelectedCards([]);
      }
    });
  };

  //   Challenge logic:
  const [isChallenged, setIsChallenged] = useState(false);
  const handleChallenge = () => {
    setIsChallenged(true);
  };

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

  //   Dummy Data:
  // 1) Actions:
  //   const actions = [
  //     {
  //       playerName: "Rapie",
  //       cardsPlayed: ["Jack", "Queen", "King"],
  //     },
  //   ];

  //   2) player objects:
  //   const playerObjects = [
  //     {
  //       playerId: "a1111",
  //       playerName: "Ryan Poy",
  //       playerCards: ["Jack", "Queen", "King", "Joker", "Jack"],
  //       playerLives: 4,
  //       isTurn: true,
  //       isAlive: true,
  //       isHost: true,
  //     },
  //     {
  //       playerId: "b1112",
  //       playerName: "Caitlin",
  //       playerCards: ["Jack", "Jack"],
  //       playerLives: 6,
  //       isTurn: false,
  //       isAlive: true,
  //       isHost: false,
  //     },
  //     {
  //       playerId: "c33333",
  //       playerName: "Rapie",
  //       playerCards: ["King", "Joker", "Jack"],
  //       playerLives: 4,
  //       isTurn: false,
  //       isAlive: true,
  //       isHost: false,
  //     },
  //     {
  //       playerId: "d44444",
  //       playerName: "Jen",
  //       playerCards: ["Queen", "King", "Joker", "Jack"],
  //       playerLives: 4,
  //       isTurn: false,
  //       isAlive: true,
  //       isHost: false,
  //     },
  //   ];

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
          />
          <PlayerAction
            gameInfo={gameInfo}
            selectedCards={selectedCards}
            isTurn={isYourTurn}
            playClick={handlePlay}
            challengeClick={handleChallenge}
          />
        </>
      )}
    </>
  );
};

export default Game;
