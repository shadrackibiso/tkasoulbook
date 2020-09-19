import React, { useState } from "react";
import { MdPerson, MdPeople, MdMyLocation } from "react-icons/md";
import { FaChurch } from "react-icons/fa";
import "../css/memberCard.css";
import moment from "moment";
import profilePic from "../pics/avatar.png";
import MemberProfileModal from "../components/MemberProfileModal";

function LeaderBoardCard(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className=" col-lg-4 col-xl-4 col-md-6 pl-0 pl-md-2 pl-lg-0 m-0 mobileContainer">
      <div
        className="soulCardContainer leaderBoardCardContainer"
        onClick={() => setShowModal(true)}
      >
        <div className="soulCardGradient"></div>
        <div>
          <div className="soulCardDate memberCardDate"># {props.rank + 1}</div>
          <div className="memberProfilePicContainer">
            <img
              src={props.profilePic ? props.profilePic : profilePic}
              alt="memberProfilePic"
            />
          </div>
          <div className="soulCardNameContainer leaderBoardNameContainer">
            <span className="soulCardMainIcon">
              <MdPerson />
            </span>
            {props.name.length < 25 ? (
              <span className="soulCardName">{props.name}</span>
            ) : (
              <span className="soulCardName">
                {props.name.slice(0, 25) + ` [...]`}
              </span>
            )}
          </div>
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <MdPeople />
            </div>
            <div className="soulProfileModalIconDetail">
              <span>Souls won</span>
              <span style={{ fontWeight: "bold", color: "black" }}>
                {props.soulsWon.length}
              </span>
            </div>
          </div>
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <FaChurch />
            </div>
            <div className="soulProfileModalIconDetail">
              <span>Satellite Church</span>
              {props.satelliteChurch.length < 20 ? (
                <span>{props.satelliteChurch}</span>
              ) : (
                <span>{props.satelliteChurch.slice(0, 20) + ` [...]`}</span>
              )}
            </div>
          </div>
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <MdMyLocation />
            </div>
            <div className="soulProfileModalIconDetail">
              <span>Service group</span>
              {props.serviceGroup}
            </div>
          </div>
        </div>
      </div>
      <div
        className="soulProfileModalWrapper"
        style={{ display: showModal ? "flex" : "none" }}
      >
        <MemberProfileModal
          {...props}
          closeModal={() => setShowModal(false)}
          page="leaderBoard"
        />
      </div>
    </div>
  );
}

export default LeaderBoardCard;
