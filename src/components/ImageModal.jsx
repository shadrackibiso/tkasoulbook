import React from "react";
import "../css/testimonyForm.css";
import "../css/modal.css";
import { MdClose } from "react-icons/md";

function ImageModal(props) {
  return (
    <div className="Modal ImageModal row p-2">
      {/* Modal Backdrop */}
      <div className="ModalBlind" onClick={props.closeModal}></div>
      {/* modal close button */}
      <div className="imageModalCloseBtn" onClick={props.closeModal}>
        <MdClose />
      </div>
      {/* Modal Content */}
      <div className="ImageModalContainer d-flex align-items-center justify-content-center">
        {/* Main Modal content */}
        <img src={props.src} />
      </div>
    </div>
  );
}

export default ImageModal;
