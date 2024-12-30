import { FC, useEffect, useState } from "react";
import Celebration from "./Celebration";
import { AnimatePresence, motion } from "framer-motion";

const containerVariant = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 1,
    },
  },
};

const textVariant = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

interface ModalProps {
  isVisible: boolean;
  player: any;
  isHost: boolean;
  onClick: () => void;
}

const WinnerModal: FC<ModalProps> = ({
  isVisible,
  player,
  isHost,
  onClick,
}) => {
  const [show, setShow] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 500);
      const timer2 = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(timer2);
      };
    }
  }, [isVisible]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-2 w-2/3 h-1/2 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {showAnimation ? (
            <motion.div
              key="celebration"
              //   initial={{ opacity: 0 }}
              //   animate={{ opacity: 1 }}
              //   exit={{ opacity: 0 }}
              //   transition={{ duration: 1 }}
              className="flex items-center justify-center"
            >
              <Celebration />
            </motion.div>
          ) : (
            <motion.div
              key="playerInfo"
              variants={containerVariant}
              initial="initial"
              animate="visible"
              className="text-center text-black"
            >
              <motion.p
                variants={textVariant}
                className="text-2xl font-bold mb-4"
              >
                Congratulations
              </motion.p>
              <motion.p variants={textVariant} className="text-base text-black">
                <span className="font-bold">Player </span> {player.playerName}{" "}
                wins!
              </motion.p>
              {isHost && (
                <motion.button
                  onClick={onClick}
                  className="create-button mt-6 "
                  variants={textVariant}
                >
                  Return to lobby
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default WinnerModal;
