// import React from "react";
import { FadeLoader } from "react-spinners";
// react-spinners provides beautiful and customizable loading indicators
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <FadeLoader color="#3db7" />
    </div>
  );
}

export default Loader;
