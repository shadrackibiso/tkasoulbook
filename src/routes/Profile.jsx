import React, { useState } from "react";
import Header from "../components/Header";
import SideNav from "../components/SideNav";
import Navbar from "../components/Navbar";
import ProfileEditForm from "../components/ProfileEditForm";
import "../css/profile.css";
import {
  MdPerson,
  MdLocationOn,
  MdPhone,
  MdDirectionsBus,
  MdBusinessCenter,
  MdMyLocation,
} from "react-icons/md";
import { FaTransgender, FaChurch } from "react-icons/fa";
import profilePic from "../pics/pic1.png";
import Loader from "../components/Loader";
import OfflineError from "../components/OfflineError";

function Profile(props) {
  const [showEditForm, setShowEditForm] = useState(false);
  return (
    <div className="profilePage">
      <Header {...props} page="Profile" />
      <SideNav page="profile" {...props} />
      <Navbar />
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
      {/* main content */}
      <div style={{ display: props.loading && "none" }}>
        <div className="profileContainer">
          <div className="profilePicContainer">
            <img
              src={props.profilePic ? props.profilePic : profilePic}
              alt="profilePic"
            />
          </div>
          <div className="profileDetailsContainer">
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdPerson />
              </div>
              <div className="profileDetail">{props.name}</div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdLocationOn />
              </div>
              <div className="profileDetail">{props.address}</div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdPhone />
              </div>
              <div className="profileDetail">{props.phoneNumber}</div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <FaChurch />
              </div>
              <div className="profileDetail">{props.satelliteChurch}</div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdBusinessCenter />
              </div>
              <div className="profileDetail">{props.occupation}</div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <MdDirectionsBus />
              </div>
              <div className="profileDetail">{props.busStop}</div>
            </div>
            <div className="profileDetailContainer">
              <div className="profileDetailIcon">
                <FaTransgender />
              </div>
              <div className="profileDetail">{props.gender}</div>
            </div>
            <div
              className="profileDetailContainer"
              style={{ display: props.accountType === "admin" && "none" }}
            >
              <div className="profileDetailIcon">
                <MdMyLocation />
              </div>
              <div className="profileDetail">{props.serviceGroup}</div>
            </div>
            <div className=" profileEditBtn">
              <div className="mainBtn" onClick={() => setShowEditForm(true)}>
                Edit profile
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="profileEditFormWrap"
        style={{ display: !showEditForm && "none" }}
      >
        <ProfileEditForm {...props} closeForm={() => setShowEditForm(false)} />
      </div>
    </div>
  );
}

export default Profile;
