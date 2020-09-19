import React from "react";
import "../css/notifications.css";
import Notification from "./Notification";
import NotificationModal from "./NotificationModal";
import ReactLoading from "react-loading";
import { MdAddAlert } from "react-icons/md";

function Notifications(props) {
  const showModal = () => {
    document.querySelector(".notificationModal").style.display = "flex";
  };
  return (
    <div className="notificationsContainer">
      {/* header */}
      <div className="notificationsHeader">
        <div className="notificationsHeaderTitle">Notifications</div>
        {/* add button */}
        <div
          className="notificationsSendBtn"
          onClick={showModal}
          style={{
            display:
              (props.accountType &&
                props.accountType.toLowerCase() === "member" &&
                "none") ||
              (props.accountType &&
                props.accountType.toLowerCase() === "soul establishment" &&
                "none"),
          }}
        >
          Add{" "}
          <span className="ml-2">
            <MdAddAlert />
          </span>
        </div>
      </div>
      {/* notification container showing each notification */}
      <div className="notificationsCardContainer">
        {!props.notifications && (
          <div className="reactLoaderContainer">
            <ReactLoading
              type="bars"
              color="#29abe2"
              height={30}
              width={30}
              className="reactLoader"
            />
          </div>
        )}
        {props.notifications && props.notifications.length > 0 ? (
          props.notifications.map((notification, i) => (
            <Notification key={i} {...notification} store={props} />
          ))
        ) : (
          <div className="emptyDisplayText">no notification...</div>
        )}
      </div>
      {/* add notification modal */}
      <NotificationModal {...props} />
    </div>
  );
}

export default Notifications;
