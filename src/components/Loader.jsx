import React from "react";
import ReactLoading from "react-loading";

function Loader() {
  return (
    <div className="reactLoaderContainer">
      <ReactLoading
        type="spin"
        color="#29abe2"
        height={50}
        width={50}
        className="reactLoader"
      />
      <div className="mt-2">Loading</div>
    </div>
  );
}

export default Loader;
