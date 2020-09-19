import React, { useState } from "react";
import SoulProfileModal from "../components/SoulProfileModal";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdTextsms,
  MdDelete,
  MdDirectionsBus,
  MdBusinessCenter,
  MdVerifiedUser,
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import OptionModal from "./OptionModal";
import moment from "moment";

function SoulCard(props) {
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
    <div className=" col-lg-4 col-md-6 col-xl-3 pl-0 pl-md-2 pl-lg-0 mobileContainer">
      <div className="soulCardContainer">
        {/* ========
         blue border 
         ====== */}
        <div className="soulCardGradient"></div>

        {/* =====
         content
         ======= */}
        <div onClick={openModal}>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* date */}
            <div className="soulCardDate">
              {moment(props.createdAt.toDate()).format("LL")}
            </div>
            {/* verified */}
            <div
              className="soulCardMainIcon"
              style={{ display: props.verified !== "true" && "none" }}
            >
              <MdVerifiedUser />
            </div>
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

          {/* Other Details */}
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

            {/* Bus stop */}
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
          <span className="soulCardOptionIcon">
            <span
              onClick={() => displayDeleteModal(true)}
              title="delete"
              className="optionBtn"
            >
              <MdDelete />
            </span>
          </span>
        </div>

        {/* ========
        PROFILE MODAL
        ========= */}
        <div
          className="soulProfileModalWrapper"
          style={{ display: showModal ? "flex" : "none" }}
        >
          <SoulProfileModal
            {...props}
            closeModal={closeModal}
            page="soulsWon"
          />
        </div>

        {/* ========
        DELETE MODAL
        ========= */}
        <div
          className="deleteOptionModal"
          style={{ display: !showDeleteModal && "none" }}
        >
          <OptionModal
            type="delete"
            closeModal={() => displayDeleteModal(false)}
            title="Delete Soul?"
            message={
              "soul would be permanently deleted and cannot be recovered"
            }
            action={() => {
              props.store.deleteSoul(props);
              displayDeleteModal(false);
            }}
          />
        </div>
        {/* ======= */}
      </div>
    </div>
  );
}

export default SoulCard;
