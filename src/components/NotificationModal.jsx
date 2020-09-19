import React from "react";
import "../css/notificationModal.css";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function NotificationModal(props) {
  const closeModal = () => {
    document.querySelector(".notificationModal").style.display = "none";
  };
  const addNotification = (e) => {
    e.preventDefault();
    const message = document.querySelector(".notificationInputBoxTextArea")
      .value;
    props.createNotification({
      message: message,
      createdAt: new Date(),
      id: uuidv4(),
      from: props.satelliteChurch,
    });
    closeModal();
  };
  return (
    <div className="notificationModal">
      <div className="Modal row mobileContainer">
        <div className="ModalBlind" onClick={closeModal}></div>
        <div className="ModalContainer col-lg-6">
          <div className="ModalHeader">
            <span className="ModalTitle">Send Notification</span>
            <div className="ModalCloseBtn" onClick={closeModal}>
              <MdClose />
            </div>
          </div>
          <div className="ModalBody">
            <form onSubmit={addNotification}>
              <div className="notificationModalForm">
                <div className="inputBoxRow">
                  <div className="inputBoxContainer">
                    <div className="inputBoxLabel">Message</div>
                    <textarea
                      name="message"
                      type="text"
                      className="inputBox notificationInputBoxTextArea"
                      required
                    />
                  </div>
                </div>
              </div>
              <button className="mainBtn">Send Notification</button>
            </form>
          </div>
        </div>
        {/* Mobile Close Btn */}
        <div className="ModalCloseMobile" onClick={closeModal}>
          close
        </div>
      </div>
    </div>
  );
}

export default NotificationModal;
