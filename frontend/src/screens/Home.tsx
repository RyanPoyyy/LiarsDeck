import { useNavigate } from "react-router";
import { easeInOut, motion } from "framer-motion";

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
          <div className="font-bold text-xl mt-4">Instructions</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
