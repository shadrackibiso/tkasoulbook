import React, { useState } from "react";
import "../css/addSoulModal.css";
import "../css/modal.css";
import { MdClose } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function AddSoulForm(props) {
  const [userType, setUserType] = useState("evangelism");

  const changeUserType = (type) => {
    setUserType(type);
  };
  const closeModal = () => {
    document.querySelector(".addSoulModal").style.display = "none";
  };
  const addSoul = (e) => {
    e.preventDefault();
    const form = document.querySelector("form.addSoulFormBox");
    const gender = document.querySelector("select.genderOptions");
    const prayerRequest = document.querySelector("textarea.inputBoxTextArea");
    const soul = {
      id: `${form.fullName.value}-${uuidv4()}`,
      name: form.fullName.value,
      address: form.address.value,
      phoneNumber: form.phoneNumber.value,
      occupation: form.occupation.value,
      busStop: form.busStop.value,
      gender: gender.value,
      createdAt: new Date(),
      wonBy: {
        id: props.id,
        name: props.name,
        satelliteChurch: props.satelliteChurch,
      },
      wonThrough: userType,
      prayerRequest: prayerRequest.value,
      serviceGroup: "none",
      verified: false,
    };
    closeModal();
    props.addSoul(soul);
    props.changeTab && props.changeTab(userType);
    form.fullName.value = "";
    form.address.value = "";
    form.phoneNumber.value = "";
    form.occupation.value = "";
    form.busStop.value = "";
    gender.value = "male";
    prayerRequest.value = "";
    setUserType("evangelism");
  };

  return (
    <div className="addSoulModal">
      <div className="Modal row">
        <div className="ModalBlind" onClick={closeModal}></div>
        <div className="ModalContainer col-lg-6">
          <div className="ModalHeader">
            <span className="ModalTitle">Add Soul</span>
            <div className="ModalCloseBtn" onClick={closeModal}>
              <MdClose />
            </div>
          </div>
          <div className="ModalBody">
            <div className="AddSoulForm">
              <div
                className="addSoulModalTab"
                style={{
                  display:
                    props.accountType &&
                    props.accountType.toLowerCase() === "member" &&
                    "none",
                }}
              >
                <div
                  className={
                    userType === "evangelism"
                      ? "addSoulModalTabBtn selectedTab"
                      : "addSoulModalTabBtn"
                  }
                  onClick={() => changeUserType("evangelism")}
                >
                  Evangelism
                </div>
                <div
                  className={
                    userType === "altarCall"
                      ? "addSoulModalTabBtn selectedTab"
                      : "addSoulModalTabBtn"
                  }
                  onClick={() => changeUserType("altarCall")}
                >
                  Altar call
                </div>
                <div
                  className={
                    userType === "firstTimer"
                      ? "addSoulModalTabBtn selectedTab"
                      : "addSoulModalTabBtn"
                  }
                  onClick={() => changeUserType("firstTimer")}
                >
                  First timer
                </div>
              </div>
              <div
                className="addSoulModalForm"
                style={{
                  paddingTop:
                    props.accountType &&
                    props.accountType.toLowerCase() === "member" &&
                    "0px",
                }}
              >
                <form className="addSoulFormBox row" onSubmit={addSoul}>
                  <div className="inputBoxRow row">
                    <div className="inputBoxContainer col-lg-6">
                      <div className="inputBoxLabel">Full Name</div>
                      <input
                        name="fullName"
                        type="text"
                        className="inputBox"
                        required
                      />
                    </div>
                    <div className="inputBoxContainer col-lg-6">
                      <div className="inputBoxLabel">Address</div>
                      <input
                        name="address"
                        type="text"
                        className="inputBox"
                        required
                      />
                    </div>
                  </div>
                  <div className="inputBoxRow row">
                    <div className="inputBoxContainer col-lg-6">
                      <div className="inputBoxLabel">Gender</div>
                      <select
                        className="inputBox selectBox genderOptions"
                        required
                        name="gender"
                      >
                        <option value="male">male</option>
                        <option value="female">female</option>
                      </select>
                    </div>
                    <div className="inputBoxContainer col-lg-6">
                      <div className="inputBoxLabel">Nearest Bus-stop</div>
                      <input
                        name="busStop"
                        type="text"
                        className="inputBox"
                        required
                      />
                    </div>
                  </div>
                  <div className="inputBoxRow row">
                    <div className="inputBoxContainer col-lg-6">
                      <div className="inputBoxLabel">Phone Number</div>
                      <input
                        name="phoneNumber"
                        type="number"
                        className="inputBox"
                        required
                      />
                    </div>
                    <div className="inputBoxContainer col-lg-6">
                      <div className="inputBoxLabel">Occupation</div>
                      <input
                        name="occupation"
                        type="text"
                        className="inputBox"
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="inputBoxRow">
                    <div className="inputBoxContainer">
                      <div className="inputBoxLabel">
                        Member of Salvation Ministries?
                      </div>
                      <select className="inputBox selectBox" required>
                        <option value="no">no</option>
                        <option value="yes">yes</option>
                      </select>
                    </div>
                    <div className="inputBoxContainer">
                      <div className="inputBoxLabel">
                        Be reminded about major events?
                      </div>
                      <select className="inputBox selectBox" required>
                        <option value="no">no</option>
                        <option value="yes">yes</option>
                      </select>
                    </div>
                  </div> */}
                  <div className="inputBoxRow row">
                    <div className="inputBoxContainer col-lg-12">
                      <div className="inputBoxLabel">Prayer request</div>
                      <textarea
                        name="prayerRequest"
                        type="text"
                        className="inputBox inputBoxTextArea"
                      />
                    </div>
                  </div>
                  <button className="mainBtn">Add soul</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSoulForm;
