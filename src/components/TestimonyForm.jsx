import React, { useState } from "react";
import "../css/testimonyForm.css";
import "../css/modal.css";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AlertBox from "./AlertBox";
import firebase from "firebase/app";

function TestimonyForm(props) {
  const [images, setImages] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  const createTestimony = (e) => {
    e.preventDefault();
    const title = document.querySelector("input.testimonyFormTitle");
    const text = document.querySelector("textarea.testimonyFormText");
    const name = document.querySelector("input.inputName");
    const testimony = {
      id: `${title.value}-${uuidv4()}`,
      userId: props.id,
      title: title.value,
      text: text.value,
      userName: name.value,
      satelliteChurch: props.satelliteChurch,
      createdAt: new Date(),
      images: [...images],
    };
    props.createTestimony(testimony);
    props.closeModal();
    setImages([]);
    title.value = "";
    text.value = "";
  };
  const uploadAttachment = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageName = `img_${uuidv4()}`;
      const uploadTask = firebase
        .storage()
        .ref(`testimonyImages/${imageName}.jpg`)
        .put(image);
      console.log(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setAlertMessage(`uploading image...(${progress}%)`);
        },
        (error) => {
          console.log(error);
          setAlertMessage(error.message);
        },
        () => {
          // resize image to smaller size
          function resizeAgain() {
            getResizedImage();
          }

          function getResizedImage() {
            firebase
              .storage()
              .ref(`testimonyImages/${imageName}_1080x1080.jpg`)
              .getDownloadURL()
              .then((url) => {
                setAlertMessage("upload complete");
                setTimeout(() => setAlertMessage(null), 1500);
                setImages((prevState) => [
                  ...prevState,
                  { src: url, id: uuidv4() },
                ]);
                // Delete original uploaded images
                firebase
                  .storage()
                  .ref(`testimonyImages/${imageName}.jpg`)
                  .delete()
                  .catch((error) => {
                    console.log(error);
                  });
              })
              .catch((error) => {
                error.code === "storage/object-not-found"
                  ? resizeAgain()
                  : setAlertMessage(error.message);
                setTimeout(() => setAlertMessage(null), 1500);
              });
          }

          getResizedImage();
        }
      );
    }
  };

  return (
    <div className="Modal row">
      {/* Modal Backdrop */}
      <div
        className="ModalBlind"
        onClick={() => {
          props.closeModal();
          setImages([]);
        }}
      ></div>
      {/* Modal Content */}
      <div className="ModalContainer col-lg-6">
        {/* Modal Header */}
        <div className="ModalHeader">
          <span className="ModalTitle">Add Testimony</span>
          <div
            className="ModalCloseBtn"
            onClick={() => {
              props.closeModal();
              setImages([]);
            }}
          >
            <MdClose />
          </div>
        </div>
        {/* Main Modal content */}
        <div className="ModalBody">
          {/* Alert box */}
          <div style={{ display: !alertMessage && "none" }}>
            <AlertBox message={alertMessage} />
          </div>
          <form onSubmit={createTestimony} className="row no-gutters">
            {/*  */}
            <div className="col-md-6 pr-md-3">
              {/* Name */}
              <div className="testimonyFormInputLabel">name</div>
              <input
                type="text"
                name="name"
                className="testimonyFormInput inputName"
                defaultValue={props.name}
                readOnly={props.accountType && props.accountType === "member"}
              />
            </div>
            {/* Testimony Title */}
            <div className="col-md-6">
              <div className="testimonyFormInputLabel">testimony title</div>
              <input
                type="text"
                name="testimonyTitle"
                className="testimonyFormInput testimonyFormTitle"
                placeholder="e.g divine breakthrough"
                required
              />
            </div>
            {/*  */}
            {/* Testimony Content */}
            <div className="col-12">
              <div className="testimonyFormInputLabel">testimony</div>
              <textarea
                name="testimony"
                className="testimonyFormTextArea testimonyFormText"
                required
              />
            </div>
            <div className="col-12">
              {/* Testimony Images */}
              <div className="testimonyFormInputLabel">testimony images</div>
              {/* Attached Images */}
              <div className="testimonyAttachmentContainer row ">
                {images.map((image, i) => (
                  <div
                    className="testimonyAttachmentWrapper col-md-2 col-4"
                    key={i}
                  >
                    <div className="testimonyAttachmentImage">
                      <img src={image.src} />
                    </div>
                  </div>
                ))}
                {/* testimony image input */}
                <input
                  type="file"
                  name="imageInput"
                  id="testimonyImageInput"
                  accept="image/*"
                  onChange={uploadAttachment}
                  className="d-none"
                />
                {/* Add Image Button */}
                <div className="testimonyAttachmentWrapper col-md-2 col-4">
                  <label htmlFor="testimonyImageInput">
                    <div className="testimonyAttachmentImage testimonyAttachmentBtn">
                      <AiOutlinePlusCircle />
                      <div>Add Image</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* Send Button */}
            <button className="mainBtn">Send</button>
          </form>
        </div>
      </div>
      {/* Mobile Close Btn */}
      <div
        className="ModalCloseMobile"
        onClick={() => {
          props.closeModal();
          setImages([]);
        }}
      >
        close
      </div>
    </div>
  );
}

export default TestimonyForm;
