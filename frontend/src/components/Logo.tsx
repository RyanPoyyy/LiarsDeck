import { useNavigate } from "react-router";
import socket from "../hooks/socket";

const Logo = () => {
  const navigate = useNavigate();
  return (
    // <div className="w-full top-0 left-0 z-10">
    <div className="z-10 flex ">
      <div
        className="mx-auto w-1/7 flex justify-center items-center"
        onClick={() => {
          sessionStorage.removeItem("roomCode");
          socket.removeAllListeners();
          navigate("/");
        }}
      >
        <img
          src="/img/Logo-White.png"
          className="object-contain h-12 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Logo;
