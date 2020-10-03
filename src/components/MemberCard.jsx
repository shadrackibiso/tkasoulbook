import React, { useState } from "react";
import MemberProfileModal from "../components/MemberProfileModal";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdTextsms,
  MdDelete,
  MdDirectionsBus,
  MdBusinessCenter,
  MdPeople,
  MdMyLocation,
} from "react-icons/md";
import { FaTransgender, FaChurch } from "react-icons/fa";
import "../css/memberCard.css";
import OptionModal from "./OptionModal";
import moment from "moment";
import profilePic from "../pics/avatar.png";

function MemberCard(props) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayDeleteModal = (option) => {
    setShowDeleteModal(option);
  };
  return (
    <div className=" col-lg-4 col-md-6 col-xl-3 pl-0 pl-md-2 pl-lg-0 m-0 mobileContainer">
      <div className="soulCardContainer memberCardContainer">
        {/* border */}
        <div className="soulCardGradient"></div>

        {/* =====
         content
         ======= */}
        <div onClick={openModal}>
          {/* Date */}
          <div className="soulCardDate memberCardDate">
            {moment(props.createdAt.toDate()).format("LL")}
          </div>

          {/* Profile Pic */}
          <div className="memberProfilePicContainer">
            <img
              src={props.profilePic ? props.profilePic : profilePic}
              alt="memberProfilePic"
            />
          </div>

          {/* Name */}
          <div className="soulCardNameContainer memberNameContainer">
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
            {props.address.length < 28 ? (
              <span className="soulCardAddress">{props.address}</span>
            ) : (
              <span className="soulCardAddress">
                {props.address.slice(0, 28) + ` [...]`}
              </span>
            )}
          </div>

          {/* ===== Other Details ======== */}
          <div className="soulCardOtherDetails">
            {/* Phone Number */}
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdPhone />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Phone Number</span>
                {props.phoneNumber}
              </div>
            </div>

            {/* Occupation */}
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <MdBusinessCenter />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Occupation</span>
                {props.occupation}
              </div>
            </div>

            {/* Bus Stop */}
            <div className="soulProfileModalDetailContainer">
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
                <span>Souls won</span>
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {props.soulsWon.length}
                </span>
              </div>
            </div>

            {/* Satellite Church */}
            <div className="soulProfileModalDetailContainer">
              <div className="soulProfileModalIcon">
                <FaChurch />
              </div>
              <div className="soulProfileModalIconDetail">
                <span>Satellite Church</span>
                {props.satelliteChurch}
              </div>
            </div>

            {/* Service Group */}
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

        {/* =========
        ACTION BUTTONS
        ========== */}
        <div className="soulCardOptions">
          <span className="soulCardOptionIcon">
            <a href={`tel:${props.phoneNumber}`} title="call">
              <MdPhone />
            </a>
          </span>
          <span className="soulCardOptionIcon">
            <a href={`sms:${props.phoneNumber}`} title="message">
              <MdTextsms />
            </a>
          </span>
          <span
            className="soulCardOptionIcon"
            // onClick={() => displayDeleteModal(true)}
            style={{ color: "lightgrey " }}
          >
            <MdDelete />
          </span>
        </div>
      </div>
      {/* card end */}

      {/* ========
        PROFILE MODAL
        ========= */}
      <div
        className="soulProfileModalWrapper"
        style={{ display: showModal ? "flex" : "none" }}
      >
        <MemberProfileModal {...props} closeModal={closeModal} />
      </div>

      {/* ========
        DELETE MODAL
        ========= */}
      <div
        className="deleteOptionModal"
        style={{ display: !showDeleteModal && "none" }}
      >
        <OptionModal
          closeModal={() => displayDeleteModal(false)}
          message={"Are you sure you want to delete?"}
          action={() => {
            props.store.deleteMember(props.id);
            displayDeleteModal(false);
          }}
        />
      </div>
      {/*  */}
    </div>
  );
}

export default MemberCard;
