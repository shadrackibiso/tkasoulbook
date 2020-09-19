import React from "react";
import "../css/navbar.css";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillPlusCircle,
  AiOutlinePlusCircle,
  AiOutlineRead,
  AiFillRead,
} from "react-icons/ai";
import {
  MdPeopleOutline,
  MdPeople,
  MdChatBubbleOutline,
  MdChatBubble,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="navbarContainer">
      {/* HOME */}
      <NavLink to="/">
        <div className="navbarIconContainer">
          <div className="navIcon ">
            {props.page === "home" ? <AiFillHome /> : <AiOutlineHome />}
          </div>
          <div className="navIconLabel">Home</div>
        </div>
      </NavLink>
      {/* SOULS WON */}
      <NavLink to="/soulsWon">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "soulsWon" ? <MdPeople /> : <MdPeopleOutline />}
          </div>
          <div className="navIconLabel">Souls won</div>
        </div>
      </NavLink>
      {/* ADD SOUL */}
      <NavLink to="/addSoul">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "addSoul" ? (
              <AiFillPlusCircle />
            ) : (
              <AiOutlinePlusCircle />
            )}
          </div>
          <div className="navIconLabel">Add soul</div>
        </div>
      </NavLink>
      {/* TESTIMONIES */}
      <NavLink to="/testimonies">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "testimonies" ? (
              <MdChatBubble />
            ) : (
              <MdChatBubbleOutline />
            )}
          </div>
          <div className="navIconLabel">Testimonies</div>
        </div>
      </NavLink>
      {/* SERMONS */}
      <NavLink to="/sermons">
        <div className="navbarIconContainer">
          <div className="navIcon">
            {props.page === "sermons" ? <AiFillRead /> : <AiOutlineRead />}
          </div>
          <div className="navIconLabel">Sermons</div>
        </div>
      </NavLink>
    </div>
  );
}

export default Navbar;
