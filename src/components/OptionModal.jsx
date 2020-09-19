import React from "react";
import "../css/optionModal.css";

function OptionModal(props) {
  return (
    <div className="optionModal">
      <div className="optionModalBlind" onClick={props.closeModal}></div>
      <div className="optionModalContainer">
        <div className="optionModalTitle">{props.title}</div>
        <div className="optionModalMessage">{props.message}</div>
        <div className="optionModalOptions">
          <div className="optionModalOption" onClick={props.closeModal}>
            Cancel
          </div>
          <div
            className="optionModalOption"
            onClick={props.action && props.action}
          >
            {props.type === "delete" && "Delete"}
            {props.type === "logout" && "Log out"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OptionModal;
