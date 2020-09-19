import React, { useState } from "react";
import SoulProfileModal from "./SoulProfileModal";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdTextsms,
  MdDelete,
  MdDirectionsBus,
  MdBusinessCenter
} from "react-icons/md";
import { FaTransgender } from "react-icons/fa";
import OptionModal from "./OptionModal";
import moment from "moment";

function FcCard(props) {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const displayDeleteModal = option => {
    setShowDeleteModal(option);
  };
  return (
    <div className="soulCardContainer">
      <div className="soulCardGradient"></div>
      <div onClick={openModal}>
        <div className="soulCardDate">
          {moment(props.createdAt).format("LL")}
        </div>
        <div className="soulCardNameContainer">
          <span className="soulCardMainIcon">
            <MdPerson />
          </span>
          {props.name.length < 30 ? (
            <span className="soulCardName">{props.name}</span>
          ) : (
            <span className="soulCardName">{props.name.slice(0, 30)}...</span>
          )}
        </div>
        <div className="soulCardAddressContainer">
          <span className="soulCardMainIcon">
            <MdLocationOn />
          </span>
          {props.address.length < 35 ? (
            <span className="soulCardAddress">{props.address}</span>
          ) : (
            <span className="soulCardAddress">
              {props.address.slice(0, 35)}...
            </span>
          )}
        </div>
        <div className="soulCardOtherDetails">
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <MdPhone />
            </div>
            <div className="soulProfileModalIconDetail">
              {props.phoneNumber}
            </div>
          </div>
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <MdBusinessCenter />
            </div>
            <div className="soulProfileModalIconDetail">{props.occupation}</div>
          </div>
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <MdDirectionsBus />
            </div>
            <div className="soulProfileModalIconDetail">{props.busStop}</div>
          </div>
          <div className="soulProfileModalDetailContainer">
            <div className="soulProfileModalIcon">
              <FaTransgender />
            </div>
            <div className="soulProfileModalIconDetail">{props.gender}</div>
          </div>
        </div>
      </div>
      <div className="soulCardOptions">
        <span className="soulCardOptionIcon">
          <a href={`tel:${props.phoneNumber}`}>
            <MdPhone />
          </a>
        </span>
        <span className="soulCardOptionIcon">
          <a href={`sms:${props.phoneNumber}`}>
            <MdTextsms />
          </a>
        </span>
        <span
          className="soulCardOptionIcon"
          onClick={() => displayDeleteModal(true)}
        >
          <MdDelete />
        </span>
      </div>
      <div
        className="soulProfileModalWrapper"
        style={{ display: showModal ? "flex" : "none" }}
      >
        <SoulProfileModal {...props} closeModal={closeModal} />
      </div>
      <div
        className="deleteOptionModal"
        style={{ display: !showDeleteModal && "none" }}
      >
        <OptionModal
          {...props}
          closeModal={() => displayDeleteModal(false)}
          message={"Are you sure you want to delete?"}
        />
      </div>
    </div>
  );
}

export default FcCard;
