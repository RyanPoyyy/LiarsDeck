import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const createGame = () => {
    console.log("create game");
    navigate("/create", { state: {} });
  };
  const joinGame = () => {
    navigate("/join", { state: {} });
    console.log("join game");
  };

  const containerVariant = {
    initial: {
      opacity: "0",
      x: "100vw",
    },
    visible: {
      opacity: "1",
      x: "0",
      transition: { duration: 0.4, type: "stiffness" },
    },
    exit: {
      x: "-100vw",
      transition: {
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      className="flex mobile:w-1/2 w-3/4 justify-center flex-col mx-auto"
      variants={containerVariant}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      {/* button groups */}
      <div className="mt-[25%]">
        <button onClick={createGame} className="create-button">
          Create Game
        </button>
        <div className="line-behind">
          <span className="line"></span>
          <p className="strikethrough-text">Or</p>
        </div>
        <button onClick={joinGame} className="create-button mt-6">
          Join Game
        </button>
      </div>
      <div className="w-full mt-12">
        <div className=" border-t-[2px] border-gray-700 text-center">
          <div className="font-bold text-xl mt-4 mb-4">About</div>

          <p className="text-left">
            Liar's Deck is a high-stakes card game that combines deception,
            strategy, and psychological warfare.{" "}
          </p>
          <br />

          <p className="text-left">
            Inspired by the classic bluff game, this version adds dramatic flair
            with a dose of danger.
          </p>
          <br />
          <p className="text-left">
            Whether you're a truth-teller or a bold-faced liar, every move could
            lead to glory—or disaster. With unique mechanics like "death
            roulette" and a dynamic card deck, Liar's Deck is more than a card
            game—it's a battle of wits and nerves.
          </p>
          <br />
          <p className="text-left">
            This game is inspired and adapted from{" "}
            <a
              href="https://store.steampowered.com/app/3097560/Liars_Bar/"
              className=" text-blue-600 dark:text-blue-500 hover:underline"
            >
              Liar's Bar
            </a>
          </p>
          <div className="font-bold text-xl mt-4 mb-4">Instructions</div>
          <p className="text-left">
            Liar's Deck is a 4 player game. The deck contains 6x{" "}
            <span className="text-blue-500 font-bold">Queens</span>, 6x{" "}
            <span className="text-blue-500 font-bold">Kings</span>, 6x{" "}
            <span className="text-blue-500 font-bold">Aces</span> and 2x{" "}
            <span className="text-blue-500 font-bold">Jokers</span>
          </p>
          <br />
          <p className="text-left">
            Each player will be dealt 5 cards. Each player will also start with
            a virtual revolver with{" "}
            <span className="text-blue-500">one bullet</span> randomly loaded in
            the <span className="text-blue-500">6 chambers</span>
          </p>
          <br />
          <p className="text-left">
            At the start of the round, a{" "}
            <span className="text-blue-500">liar card</span> will be determined,
            which can be either a Queen, King or Ace.
          </p>
          <br />

          <p className="text-left">
            Each turn, players can choose to do either of the following:
          </p>
          <br />
          <p className="text-left">
            <span className="font-bold">1. </span> Believe the previous player’s
            play and play <span className="text-blue-500">1-3 cards</span> from
            their own hand. The <span className="text-blue-500">Joker</span> can
            be substituted for any value.
          </p>
          <br />
          <p className="text-left">
            <span className="font-bold">2. </span>
            <span className="text-blue-500">Challenge </span> the previous
            player's cards if you think they are bluffing.
          </p>
        </div>
        <br />
        <p className="text-left">
          The <span className="text-blue-500">death roulette </span>means firing
          the gun at oneself. If it's an empty chamber, the game proceeds to the
          next round; if successful, the player is eliminated, and the game
          continues to the next round
        </p>
        <br />
        <p className="text-left">
          If the challenge is <span className="text-blue-500">successful </span>
          , the previous player participates in the death roulette. Otherwise,
          for a <span className="text-blue-500">failed challenge</span>, the
          challenger will participate in the death roulette.
        </p>
        <br />
        <p className="text-left">
          The <span className="text-blue-500">goal</span> of each round is to{" "}
          <span className="text-blue-500">clear your cards</span> as quickly as
          possible. If you are the last player to clear your card, you will also
          take a shot at the death roulette.
        </p>
        <br />

        <br />
        <p className="text-left mb-44">
          The game continues until only one player remains, who becomes the
          winner.
        </p>
      </div>
    </motion.div>
  );
};

export default Home;
