import React, { useState } from "react";
import "../css/addSoul.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import Header from "../components/Header";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";
import OfflineError from "../components/OfflineError";

function AddSoul(props) {
  const [selectedTab, setSelectedTab] = useState("evangelism");
  const [redirect, setRedirect] = useState(false);
  const addSoul = (e) => {
    e.preventDefault();
    const form = document.querySelector("form.addSoulForm");
    const gender = document.querySelector("select.genderOptions");
    const prayerRequest = document.querySelector(
      "textarea.inputBoxTextAreaMobile"
    );
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
      wonThrough: selectedTab,
      prayerRequest: prayerRequest.value,
      serviceGroup: "none",
      verified: false,
      journeyClass: {
        journey101: false,
        journey201: false,
        journey301: false,
        journey401: false,
      },
    };
    props.addSoul(soul);
    setRedirect(true);
  };
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/soulsWon" />;
    }
  };
  return (
    <>
      <div className="AddSoulPage">
        {renderRedirect()}
        <Header {...props} page="Add Soul" />
        <Navbar page="addSoul" />
        <SideNav page="addSoul" />
        <div className="addSoulContainer">
          {/* loader */}
          <div style={{ display: !props.loading && "none" }}>
            {/* loading component */}
            {navigator.onLine && props.loading && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {/* offline message */}
            {!navigator.onLine && <OfflineError />}
          </div>
          {/* add soul form component */}
          <div style={{ display: props.loading && "none" }}>
            <div
              className="addSoulTabMenu"
              style={{
                display: props.accountType.toLowerCase() === "member" && "none",
              }}
            >
              <div
                className={
                  selectedTab === "evangelism"
                    ? "addSoulTabSelected"
                    : "addSoulTab"
                }
                onClick={() => setSelectedTab("evangelism")}
              >
                Evangelism
              </div>
              <div
                className={
                  selectedTab === "alterCall"
                    ? "addSoulTabSelected"
                    : "addSoulTab"
                }
                onClick={() => setSelectedTab("alterCall")}
              >
                Altar call
              </div>
              <div
                className={
                  selectedTab === "firstTimer"
                    ? "addSoulTabSelected"
                    : "addSoulTab"
                }
                onClick={() => setSelectedTab("firstTimer")}
              >
                First timer
              </div>
            </div>
            {/* form */}
            <form
              className="addSoulForm"
              onSubmit={addSoul}
              style={{
                paddingTop:
                  props.accountType.toLowerCase() === "member" && "15px",
              }}
            >
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Full Name</div>
                <input
                  name="fullName"
                  type="text"
                  className="inputBox"
                  required
                />
              </div>
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Address</div>
                <input
                  name="address"
                  type="text"
                  className="inputBox"
                  required
                />
              </div>
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Gender</div>
                <select
                  className="inputBox selectBox genderOptions"
                  defaultValue="male"
                  required
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Nearest Bus-stop</div>
                <input
                  name="busStop"
                  type="text"
                  className="inputBox"
                  required
                />
              </div>
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Phone Number</div>
                <input
                  name="phoneNumber"
                  type="number"
                  className="inputBox"
                  required
                />
              </div>
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Occupation</div>
                <input
                  name="occupation"
                  type="text"
                  className="inputBox"
                  required
                />
              </div>
              <div className="inputBoxContainer inputBoxContainerMobile">
                <div className="inputBoxLabel">Prayer request</div>
                <textarea
                  name="prayerRequest"
                  type="text"
                  className="inputBox inputBoxTextAreaMobile"
                />
              </div>
              <button className="mainBtn">Add soul</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSoul;
