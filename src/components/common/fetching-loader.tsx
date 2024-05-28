import React from "react";
import { Bars } from "react-loader-spinner";

function LoaderComponent() {
  return (
    <div className="flex justify-center">
      <Bars
        height={40}
        width={40}
        color="#87CEEB"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default LoaderComponent;
