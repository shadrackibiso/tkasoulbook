import React, { useState } from "react";
import "../css/soulProfileModal.css";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBusinessCenter,
  MdPeople,
  MdMyLocation,
  MdTextsms,
  MdDelete,
} from "react-icons/md";
import { FaTransgender, FaChurch } from "react-icons/fa";
import { MdClose, MdArrowBack } from "react-icons/md";
import profilePic from "../pics/avatar.png";
import OptionModal from "./OptionModal";
import moment from "moment";

function MemberProfileModal(props) {
  const [displaySoulsWon, setDisplaySoulsWon] = useState(false);

  // souls won by member
  const SoulsWon = () => (
    <div style={{ display: !displaySoulsWon && "none" }}>
      {props.soulsWon &&
        props.soulsWon.map((soul, i) => (
          <SoulCard key={i} {...soul} store={props} page="members" />
        ))}
    </div>
  );

  // soul card
  const SoulCard = () => {
    return (
      <div className="pl-0 pl-md-2 pl-lg-0 mobileContainer">
        <div className="soulCardContainer" style={{ cursor: "initial" }}>
          {/* ========
         blue border 
         ====== */}
          <div className="soulCardGradient"></div>

          {/* =====
         content
         ======= */}
          <div>
            {/* date */}
            <div className="soulCardDate">
              {moment(props.createdAt.toDate()).format("LL")}
            </div>

            {/* Name */}
            <div className="soulCardNameContainer">
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

            {/* Address */}
            <div className="soulCardAddressContainer">
              <span className="soulCardMainIcon">
                <MdLocationOn />
              </span>
              {props.address.length < 26 ? (
                <span className="soulCardAddress">{props.address}</span>
              ) : (
                <span className="soulCardAddress">
                  {props.address.slice(0, 26) + ` [...]`}
                </span>
              )}
            </div>
          </div>

          {/* =========
        ACTION BUTTONS
        ========== */}
          <div className="soulCardOptions">
            {/* Call */}
            <span className="soulCardOptionIcon">
              <a
                href={`tel:${props.phoneNumber}`}
                style={{ display: !props.phoneNumber && "none" }}
                title="call"
              >
                <MdPhone />
              </a>
            </span>
            {/* SMS */}
            <span className="soulCardOptionIcon">
              <a href={`sms:${props.phoneNumber}`} title="message">
                <MdTextsms />
              </a>
            </span>
            {/* Delete */}
            <span
              className="soulCardOptionIcon"
              style={{ color: "lightgrey ", cursor: "initial" }}
            >
              <MdDelete />
            </span>
            {/*  */}
          </div>
          {/* ======= */}
        </div>
      </div>
    );
  };

  // RENDERED COMPONENT
  return (
    <div className="soulProfileModal">
      <div className="Modal">
        {/* backdrop */}
        <div className="ModalBlind"></div>

        <div className="ModalContainer soulProfileModalContainer">
          {/* =====
          Header 
          ======*/}
          <div className="ModalHeader m-0">
            {/* normal header */}
            <span
              className="ModalTitle"
              style={{ display: displaySoulsWon && "none" }}
            >
              Profile
            </span>

            {/* edit form header */}
            <span
              className="ModalTitle align-items-center"
              style={{ display: !displaySoulsWon ? "none" : "flex" }}
            >
              <span
                className="ModalCloseBtn mr-2"
                onClick={() => setDisplaySoulsWon(false)}
              >
                <MdArrowBack />
              </span>
              Souls Won
            </span>

            {/* close button */}
            <div
              className="ModalCloseBtn"
              onClick={() => {
                props.closeModal();
                setDisplaySoulsWon(false);
              }}
            >
              <MdClose />
            </div>
            {/*  */}
          </div>

          {/* ======
          Main content 
          ======== */}
          <div className="ModalBody">
            {/* member profile details */}
            <div style={{ display: displaySoulsWon && "none" }}>
              {/* Profile Pic */}
              <div className="soulProfileModalImageContainer">
                <div>
                  <img src={props.profilePic ? props.profilePic : profilePic} />
                </div>
              </div>
              {/* Name*/}
              <div className="soulProfileModalDetailContainer">
                <div className="soulProfileModalIcon">
                  <MdPerson />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Name</span>
                  {props.name}
                </div>
              </div>
              {/* Address */}
              <div
                className="soulProfileModalDetailContainer"
                style={{
                  display: props.page && props.page === "leaderBoard" && "none",
                }}
              >
                <div className="soulProfileModalIcon">
                  <MdLocationOn />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Address</span>
                  {props.address}
                </div>
              </div>
              {/* Phone Number */}
              <div
                className="soulProfileModalDetailContainer"
                style={{
                  display: props.page && props.page === "leaderBoard" && "none",
                }}
              >
                <div className="soulProfileModalIcon">
                  <MdPhone />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Phone Number</span>
                  {props.phoneNumber}
                </div>
              </div>
              {/* Occupation */}
              <div
                className="soulProfileModalDetailContainer"
                style={{
                  display: props.page && props.page === "leaderBoard" && "none",
                }}
              >
                <div className="soulProfileModalIcon">
                  <MdBusinessCenter />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Occupation</span>
                  {props.occupation}
                </div>
              </div>
              {/* Bus stop */}
              <div
                className="soulProfileModalDetailContainer"
                style={{
                  display: props.page && props.page === "leaderBoard" && "none",
                }}
              >
                <div className="soulProfileModalIcon">
                  <MdDirectionsBus />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Bus Stop</span>
                  {props.busStop}
                </div>
              </div>
              {/* Gender */}
              <div className="soulProfileModalDetailContainer">
                <div className="soulProfileModalIcon">
                  <FaTransgender />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Gender</span>
                  {props.gender}
                </div>
              </div>
              {/* Souls Won */}
              <div className="soulProfileModalDetailContainer">
                <div className="soulProfileModalIcon">
                  <MdPeople />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Souls Won</span>
                  {props.soulsWon && props.soulsWon.length}
                </div>
              </div>
              {/* Satellite Church */}
              <div
                className="soulProfileModalDetailContainer"
                style={{ display: !props.satelliteChurch && "none" }}
              >
                <div className="soulProfileModalIcon">
                  <FaChurch />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Satellite Church</span>
                  {props.satelliteChurch}
                </div>
              </div>
              {/* Service Group */}
              <div
                className="soulProfileModalDetailContainer"
                style={{ display: !props.serviceGroup && "none" }}
              >
                <div className="soulProfileModalIcon">
                  <MdMyLocation />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Service Group</span>
                  {props.serviceGroup}
                </div>
              </div>
              {/* ======
              view souls
              =========*/}
              <div
                className=" profileEditBtn"
                style={{
                  display:
                    (props.page && props.page === "leaderBoard" && "none") ||
                    (props.soulsWon && props.soulsWon.length < 1 && "none"),
                }}
              >
                <button
                  className="mainBtn mt-3"
                  onClick={() => setDisplaySoulsWon(true)}
                >
                  View Souls Won
                </button>
              </div>
              {/* ===== */}
            </div>
            {/* ====== 
            souls won 
            ======== */}
            <SoulsWon />
            {/* ===== */}
          </div>
        </div>

        {/* ========
         Mobile Close Btn 
         ======== */}
        <div className="ModalCloseMobile" onClick={props.closeModal}>
          close
        </div>
      </div>
    </div>
  );
}

export default MemberProfileModal;
