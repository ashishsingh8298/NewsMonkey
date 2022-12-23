import React from "react";
import { BallTriangle } from "react-loader-spinner";

function Loader(props) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }} className="my-3">
      <BallTriangle
        height={80}
        width={80}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        visible={props.loading}
      />
    </div>
  );
}

export default Loader;
