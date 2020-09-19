import React, { useState } from "react";
import "../css/profileEditForm.css";
import { MdClose } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import fb from "../config/config.jsx";
import profilePic from "../pics/pic1.png";
import AlertBox from "../components/AlertBox";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/app";

function SignUpForm(props) {
  const [alertMessage, setAlertMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [user, setUser] = useState({
    accountType: "member",
    createdAt: new Date(),
    name: "",
    address: "",
    satelliteChurch: "",
    profilePic: "",
    phoneNumber: "",
    occupation: "",
    country: "",
    state: "",
    busStop: "",
    gender: "male",
    serviceGroup: "",
  });

  const handleRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (e) => {
    let detail = { [e.target.name]: e.target.value };
    setUser((prevState) => ({ ...prevState, ...detail }));
  };

  const signUp = (e) => {
    e.preventDefault();
    fb.auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then((data) => {
        const profile = {
          id: `${user.name}-${data.user.uid}`,
          uid: `${data.user.uid}`,
          ...user,
        };

        firebase
          .firestore()
          .collection("members")
          .doc(`${profile.id}`)
          .set(profile)
          .then(props.checkData())
          .catch((error) => console.log(error));

        setRedirect(true);
      })
      .catch((error) => {
        console.log(error);
        setAlertMessage(error.message);
        setTimeout(() => setAlertMessage(null), 5000);
      });
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const imageName = `img_${uuidv4()}`;

      const uploadTask = firebase
        .storage()
        .ref(`images/${imageName}.jpg`)
        .put(image);

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
          setTimeout(() => setAlertMessage(null), 1500);
        },
        () => {
          // resize image to smaller size
          function resizeAgain() {
            getResizedImage();
          }

          function getResizedImage() {
            firebase
              .storage()
              .ref(`images/${imageName}_1080x1080.jpg`)
              .getDownloadURL()
              .then((url) => {
                setAlertMessage("upload complete");
                setTimeout(() => setAlertMessage(null), 1500);
                setImageUrl(url);
                setUser((prevState) => ({ ...prevState, profilePic: url }));

                // Delete original uploaded images
                firebase
                  .storage()
                  .ref(`images/${imageName}.jpg`)
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
                console.log(error);
              });
          }

          getResizedImage();
        }
      );
    }
  };

  return (
    <>
      {handleRedirect()}
      <div className="Modal">
        <div className="ModalBlind" onClick={props.closeForm}></div>
        <div className="ModalContainer profileModalContainer">
          {/* Header */}
          <div className="ModalHeader m-0">
            <span className="ModalTitle">Create Profile</span>
            <div className="ModalCloseBtn" onClick={props.closeForm}>
              <MdClose />
            </div>
          </div>
          {/* Main content */}
          <div className="ModalBody profileModalBody">
            <form className="profileEditForm" onSubmit={signUp}>
              <div style={{ display: !alertMessage && "none" }}>
                <AlertBox message={alertMessage} />
              </div>
              {/* profile image input */}
              <input
                type="file"
                name="imageInput"
                id="profileImageInput"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              {/* profile image */}
              <div className="profileEditPicContainer">
                <img src={imageUrl ? imageUrl : profilePic} alt="profilePic" />
                <label htmlFor="profileImageInput">
                  <div
                    className="profileEditFormEditBtnContainer"
                    title="change profile picture"
                  >
                    <FaRegImage className="profileEditFormEditBtn" />
                  </div>
                </label>
              </div>
              {/* profile details */}
              <div className="profileDetailsContainer  row no-gutters">
                {/* profile name */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">name</div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="name"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* profile address */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">address</div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="address"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* phone number */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    {" "}
                    <div className="profileEitFormLInputLabel">
                      phone number
                    </div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="phoneNumber"
                        className="profileEditFormInputBox"
                        type="number"
                        onChange={handleChange}
                        maxLength="11"
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* country */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">country</div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="country"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* state */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">state</div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="state"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* satellite church */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">
                      satellite church
                    </div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="satelliteChurch"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* occupation */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">occupation</div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="occupation"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* bus stop */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">bus stop</div>
                    <div className="profileEditFormInputBoxContainer">
                      <input
                        name="busStop"
                        className="profileEditFormInputBox"
                        type="text"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* gender */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">gender</div>
                    <div className="profileEditFormInputBoxContainer">
                      <select
                        name="gender"
                        className="profileEditFormInputBox"
                        onChange={handleChange}
                        defaultValue="male"
                      >
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </div>
                  </div>
                </div>
                {/* service group */}
                <div className="profileDetailContainer col-12">
                  <div className="profileDetail">
                    <div className="profileEitFormLInputLabel">
                      service group
                    </div>
                    <div className="profileEditFormInputBoxContainer">
                      <select
                        name="serviceGroup"
                        className="profileEditFormInputBox"
                        onChange={handleChange}
                      >
                        <option value="none">None</option>
                        {props.defaults.serviceGroups.map((serviceGroup, i) => (
                          <option value={serviceGroup.toLowerCase()} key={i}>
                            {serviceGroup}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mainBtn">Sign Up</button>
            </form>
          </div>
        </div>
        {/* Mobile Close Btn */}
        <div className="ModalCloseMobile" onClick={props.closeForm}>
          close
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
