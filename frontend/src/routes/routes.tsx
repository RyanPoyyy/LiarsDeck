import { Route, Routes, useLocation } from "react-router";
import App from "../App";
import Home from "../screens/Home";
import { AnimatePresence } from "framer-motion";
import CreateGame from "../screens/CreateGame";
import JoinGame from "../screens/JoinGame";
import Lobby from "../screens/Lobby";
import Game from "../screens/Game";

const Screens = () => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/lobby/" element={<Lobby />} />
          <Route path="/game/" element={<Game />} />
          <Route path="/app" element={<App />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </AnimatePresence>
    </>
  );
};
export default Screens;
