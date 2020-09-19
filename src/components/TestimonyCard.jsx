import React, { useState } from "react";
import "../css/testimonyCard.css";
import TestimonyCardModal from "../components/TestimonyCardModal";
import OptionModal from "./OptionModal";
import moment from "moment";
import ImageModal from "./ImageModal";

function TestimonyCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
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
  const Text = () => {
    if (props.text.length > 550) {
      return (
        <span>
          {props.text.slice(0, 550)}
          <span className="expandText ml-1" onClick={openModal}>
            continue reading [...]
          </span>
        </span>
      );
    }
    if (props.text.length < 550) {
      return props.text;
    }
  };

  return (
    <>
      <div className="testimonyCardContainer">
        {/* BLUE LINE AT THE LEFT */}
        <div className="testimonyCardGradient"></div>
        {/* TESTIMONY HEADER */}
        <div className="testimonyCardHeader">
          {/* tTestimony Date */}
          <div className="testimonyCardDate">
            {moment(props.createdAt.toDate()).format("LL")}
          </div>
          {/* Testimony Options Menu */}
          <div className="testimonyCardOptions">
            {/* Delete Button */}
            <span
              className="testimonyCardOption"
              style={{
                display:
                  (props.store.accountType &&
                    props.store.accountType.toLowerCase() === "member" &&
                    props.userId !== props.store.id &&
                    "none") ||
                  (props.store.accountType &&
                    props.store.accountType.toLowerCase() ===
                      "soul establishment" &&
                    props.userId !== props.store.id &&
                    "none"),
              }}
              onClick={() => displayDeleteModal(true)}
            >
              delete
            </span>
            {/*  */}
          </div>
        </div>
        <div className="testimonyCardBody">
          <div onClick={openModal} className="testimonyMainContent">
            {/* Testimony Title */}
            <div className="testimonyCardTitle">{props.title}</div>
            {/* Testimony Text */}
            <div className="testimonyCardText">
              <Text />
            </div>
          </div>
          {/* Testimony Images */}
          <div className="testimonyAttachmentContainer row ">
            {props.images &&
              props.images.map((image, i) => (
                <div
                  className="testimonyAttachmentWrapper col-md-2 col-4"
                  key={i}
                  onClick={() => setModalImage(image.src)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="testimonyAttachmentImage">
                    <img src={image.src} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* Modal to display single images */}
        <div style={{ display: !modalImage && "none" }}>
          <ImageModal src={modalImage} closeModal={() => setModalImage(null)} />
        </div>
        {/* Testimony User Detail */}
        <div className="testimonyCardFrom">
          <span>{props.userName}</span> from {props.satelliteChurch} satellite
          church
        </div>
      </div>
      {/* Testimony Modal To Display Long Testimonies */}
      <div
        className="testimonyCardModalContainer"
        style={{ display: !showModal && "none" }}
      >
        <TestimonyCardModal {...props} closeModal={closeModal} />
      </div>
      {/* Delete Dialog Box */}
      <div
        className="deleteOptionModal"
        style={{ display: !showDeleteModal && "none" }}
      >
        <OptionModal
          type="delete"
          closeModal={() => displayDeleteModal(false)}
          title="Delete Testimony?"
          message={
            "testimony would be permanently deleted and cannot be recovered"
          }
          action={() => {
            props.store.deleteTestimony(props);
            displayDeleteModal(false);
          }}
        />
      </div>
    </>
  );
}

export default TestimonyCard;
