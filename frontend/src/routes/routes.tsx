import { Route, Routes } from "react-router";
import App from "../App";
import Test from "../screens/Test";

const Screens = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
};
export default Screens;
