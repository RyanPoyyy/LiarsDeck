import Lottie from "react-lottie";
import * as animationData from "./../assets/barrel.json";
const animationDataAny: any = animationData;

const Barrel = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataAny.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div style={{ pointerEvents: "none", margin: "auto" }}>
      <Lottie options={defaultOptions} height={"80%"} width="80%" />
    </div>
  );
};

export default Barrel;
