import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/testimonyCard.css";
import OptionModal from "./OptionModal";
import moment from "moment";

function SermonCard(props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayDeleteModal = (option) => {
    setShowDeleteModal(option);
  };

  return (
    <>
      <div className="col-lg-4 pr-md-2 pr-0">
        <div className="testimonyCardContainer sermonCard">
          {/* BLUE LINE AT THE LEFT */}
          <div className="testimonyCardGradient"></div>
          {/* Sermon HEADER */}
          <div className="testimonyCardHeader">
            {/* Sermon Date */}
            <div className="testimonyCardDate">
              {moment(props.createdAt.toDate()).format("LL")}
            </div>
            {/* Sermon Options Menu */}
            <div className="testimonyCardOptions">
              {/* Delete Button */}
              <span
                className="testimonyCardOption"
                style={{
                  display:
                    (props.store.accountType.toLowerCase() === "member" &&
                      "none") ||
                    (props.store.accountType.toLowerCase() ===
                      "soul establishment" &&
                      "none"),
                }}
                onClick={() => displayDeleteModal(true)}
              >
                delete
              </span>
              {/*  */}
            </div>
          </div>
          <NavLink to={`/sermon/${props.id}`}>
            <div className="testimonyCardBody">
              {/* Sermon Title */}
              <div className="testimonyCardTitle">{props.title}</div>
              {/* Sermon Author */}
              <div className="testimonyCardFrom">{props.author}</div>
            </div>
          </NavLink>
        </div>
      </div>
      {/* Delete Dialog Box */}
      <div
        className="deleteOptionModal"
        style={{ display: !showDeleteModal && "none" }}
      >
        <OptionModal
          type="delete"
          closeModal={() => displayDeleteModal(false)}
          title="Delete Sermon?"
          message={
            "sermon would be permanently deleted and cannot be recovered"
          }
          action={() => {
            props.store.deleteSermon(props);
            displayDeleteModal(false);
          }}
        />
      </div>
    </>
  );
}

export default SermonCard;
