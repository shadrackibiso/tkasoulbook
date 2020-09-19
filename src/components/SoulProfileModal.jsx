import React, { useState } from "react";
import "../css/soulProfileModal.css";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBusinessCenter,
  MdMyLocation,
  MdVerifiedUser,
} from "react-icons/md";
import { FaTransgender, FaChurch } from "react-icons/fa";
import { MdClose, MdArrowBack } from "react-icons/md";
import SoulProfileEditForm from "./SoulProfileEditForm";

function SoulProfileModal(props) {
  const [displayEditForm, setDisplayEditForm] = useState(false);
  // RENDERED COMPONENT
  return (
    <div className="soulProfileModal">
      <div className="Modal">
        {/* backdrop */}
        <div className="ModalBlind"></div>

        <div className="ModalContainer soulProfileModalContainer">
          {/* Header */}
          <div className="ModalHeader m-0">
            {/* normal header */}
            <span
              className="ModalTitle"
              style={{ display: displayEditForm && "none" }}
            >
              Profile
            </span>
            {/* edit form header */}
            <span
              className="ModalTitle align-items-center"
              style={{ display: !displayEditForm ? "none" : "flex" }}
            >
              <span
                className="ModalCloseBtn mr-2"
                onClick={() => setDisplayEditForm(false)}
              >
                <MdArrowBack />
              </span>
              Edit Soul Profile
            </span>
            {/* close button */}
            <div
              className="ModalCloseBtn"
              onClick={() => {
                props.closeModal();
                setDisplayEditForm(false);
              }}
            >
              <MdClose />
            </div>
          </div>
          {/* Main content */}
          <div className="ModalBody">
            <div style={{ display: displayEditForm && "none" }}>
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
              <div className="soulProfileModalDetailContainer">
                <div className="soulProfileModalIcon">
                  <MdLocationOn />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Address</span>
                  {props.address}
                </div>
              </div>
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
              {/* won by */}
              <div
                className="soulProfileModalDetailContainer"
                style={{
                  display:
                    (!props.wonBy && "none") ||
                    (props.store.accountType !== "admin" && "none"),
                }}
              >
                <div className="soulProfileModalIcon">
                  <MdPerson />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Won by</span>
                  {props.wonBy.name}
                  <span className="ml-1 mr-1">from</span>
                  {props.wonBy.satelliteChurch}
                </div>
              </div>
              {/* Verified */}
              <div
                className="soulProfileModalDetailContainer"
                style={{ display: props.verified !== "true" && "none" }}
              >
                <div className="soulProfileModalIcon">
                  <MdVerifiedUser />
                </div>
                <div className="soulProfileModalIconDetail">
                  <span>Verified</span>
                </div>
              </div>
              {/* Prayer Request */}
              <div className="soulProfileModalPrayerRequestContainer">
                <div
                  className="soulProfileModalPrayerRequestHeader"
                  style={{ display: !props.prayerRequest && "none" }}
                >
                  PRAYER REQUEST
                </div>
                <div className="soulProfileModalPrayerRequest">
                  {props.prayerRequest}
                </div>
              </div>

              {/* ======
              edit profile button 
              =========*/}
              <div className=" profileEditBtn">
                <button
                  className="mainBtn"
                  onClick={() => setDisplayEditForm(true)}
                >
                  Edit profile
                </button>
              </div>
              {/* ===== */}
            </div>

            {/* ======
            soul profile edit form 
            =========*/}
            <SoulProfileEditForm
              display={displayEditForm}
              setDisplay={setDisplayEditForm}
              {...props}
            />
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

export default SoulProfileModal;
