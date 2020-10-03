import React, { useState } from "react";
import "../css/header.css";
import { AiOutlineMenu } from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { NavLink, Redirect } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import OptionModal from "../components/OptionModal";
import fb from "../config/config.jsx";
import profilePic from "../pics/avatar.png";

function Navbar(props) {
  const [showModal, setShowModal] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const showSideNav = () => {
    document.querySelector(".sideNavContainer").style.display = "block";
  };
  const displayLogOutModal = (option) => {
    setShowModal(option);
  };
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };
  const logOut = () => {
    fb.auth().signOut().then(localStorage.clear("loginDetail"));
    setRedirect(true);
  };

  return (
    <div className="header">
      {renderRedirect()}
      <div className="headerMenu" onClick={showSideNav}>
        <AiOutlineMenu />
      </div>
      <div className="headerTitle">{props.page}</div>
      <div className="headerAppName">THE KINGS ASSEMBLY SOUL BOOK</div>
      <NavLink to="/profile" className="profileBtn" title="profile">
        <div className="headerProfilePic">
          <div className="headerUserNameLabel">
            <span
              className="headerUserNameVerifiedIcon"
              style={{
                display:
                  props.accountType && props.accountType === "member" && "none",
              }}
            >
              <MdVerifiedUser />
            </span>
            {props.name && props.name.length > 15 ? (
              <span>{props.name.slice(0, 15)}...</span>
            ) : (
              props.name
            )}
          </div>
          <div className="headerProfilePicContainer">
            <img
              src={props.profilePic ? props.profilePic : profilePic}
              alt="profilePic"
            />
          </div>
        </div>
      </NavLink>
      <div
        className="logOutBtn"
        title="log out"
        onClick={() => displayLogOutModal(true)}
      >
        <IoMdLogOut />
      </div>
      <div
        className="logOutOptionModal"
        style={{ display: !showModal && "none" }}
      >
        <OptionModal
          {...props}
          type="logout"
          closeModal={() => displayLogOutModal(false)}
          action={logOut}
          title="Logout?"
          message={"your account would be logged out"}
        />
      </div>
    </div>
  );
}

export default Navbar;
