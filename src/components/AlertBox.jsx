import React from "react";
import "../css/alertBox.css";

function AlertBox(props) {
  return (
    <div className="alertBox">
      <div className="alertBoxWrap">
        <div>{props.message}</div>
      </div>
    </div>
  );
}

export default AlertBox;
