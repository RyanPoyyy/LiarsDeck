import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterBar = () => {
  return (
    <div>
      <Toaster
        position="top-center"
        containerStyle={{ marginTop: "50px" }}
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default ToasterBar;
