import React, { useEffect, useState } from "react";
import Barrel from "./Barrel";
import { AnimatePresence, motion } from "framer-motion";
import { text } from "framer-motion/client";

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
  isKilled: boolean;
  affectedPlayer: any;
  isHost: boolean;
}
const killedModal: React.FC<ModalProps> = ({
  isVisible,
  isKilled,
  affectedPlayer,
  isHost,
}) => {
  const [show, setShow] = useState(false);
  const [showBarrel, setShowBarrel] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);
      const timer2 = setTimeout(() => {
        setShowBarrel(false);
      }, 2500);

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
        className="bg-white rounded-lg shadow-lg p-2 w-1/2 h-1/2 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {showBarrel ? (
            <motion.div
              key="barrel"
              //   initial={{ opacity: 0 }}
              //   animate={{ opacity: 1 }}
              //   exit={{ opacity: 0 }}
              //   transition={{ duration: 1 }}
              className="flex items-center justify-center"
            >
              <Barrel />
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
                Result
              </motion.p>
              <motion.p variants={textVariant} className="text-base">
                Player {affectedPlayer.playerName}
              </motion.p>
              {isKilled ? (
                <motion.p
                  variants={textVariant}
                  className="text-base text-red-500"
                >
                  has been killed!
                </motion.p>
              ) : (
                <>
                  <motion.p
                    variants={textVariant}
                    className="text-base text-green-500"
                  >
                    survived the challenge!
                  </motion.p>
                  <motion.p
                    variants={textVariant}
                    className="text-base text-black"
                  >
                    {affectedPlayer.playerLives} lives remaining
                  </motion.p>
                </>
              )}

              {isHost && (
                <motion.button
                  onClick={console.log}
                  className="create-button mt-6 "
                  variants={textVariant}
                >
                  Next Round
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default killedModal;
