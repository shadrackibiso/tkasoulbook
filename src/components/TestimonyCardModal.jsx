import React from "react";
import "../css/testimonyCardModal.css";
import moment from "moment";
import { MdClose } from "react-icons/md";

function TestimonyCardModal(props) {
  return (
    <div className="testimonyCardModal">
      <div className="Modal">
        <div className="ModalBlind" onClick={props.closeModal}></div>
        <div className="ModalContainer testimonyCardModalContainer">
          {/* Header */}
          <div className="ModalHeader m-0">
            <span className="ModalTitle">Testimony</span>
            <div className="ModalCloseBtn" onClick={props.closeModal}>
              <MdClose />
            </div>
          </div>
          <div className="ModalBody">
            <div className="testimonyCardTitle">{props.title}</div>
            <div className="testimonyCardText">{props.text}</div>
            <div className="testimonyCardFrom">
              - {props.userName} from {props.satelliteChurch} satellite church
            </div>
          </div>
        </div>
        {/* Mobile Close Btn */}
        <div className="ModalCloseMobile" onClick={props.closeModal}>
          close
        </div>
      </div>
    </div>
  );
}

export default TestimonyCardModal;
