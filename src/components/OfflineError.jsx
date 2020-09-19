import React from "react";
import { MdErrorOutline } from "react-icons/md";
import "../css/offlineError.css";

function OfflineError() {
  return (
    <div className="errorContainer">
      <MdErrorOutline />
      <div>Oops...no internet connection!</div>
    </div>
  );
}

export default OfflineError;
