import React, { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import OptionModal from "./OptionModal";
import moment from "moment";

function Notification(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayDeleteModal = (option) => {
    setShowDeleteModal(option);
  };
  return (
    <div className="notificationContainer">
      <div className="notificationIcon">
        <AiOutlineBell />
      </div>
      <div className="notificationMessage">{props.message}</div>
      <div className="notificationDate">
        <div>{moment(props.createdAt.toDate()).format("LL")}</div>
        <div
          className="notificationDeleteBtn"
          onClick={() => displayDeleteModal(true)}
          style={{
            display:
              (props.store.accountType &&
                props.store.accountType.toLowerCase() === "member" &&
                "none") ||
              (props.store.accountType &&
                props.store.accountType.toLowerCase() ===
                  "soul establishment" &&
                "none"),
          }}
        >
          delete
        </div>
      </div>
      <div
        className="deleteOptionModal"
        style={{ display: !showDeleteModal && "none" }}
      >
        <OptionModal
          closeModal={() => displayDeleteModal(false)}
          type="delete"
          title="Delete Notification?"
          message={
            "notification would be permanently deleted and members will no longer see it"
          }
          action={() => {
            props.store.deleteNotification(props.id);
            displayDeleteModal(false);
          }}
        />
      </div>
    </div>
  );
}

export default Notification;
