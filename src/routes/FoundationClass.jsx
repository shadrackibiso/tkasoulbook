import React from "react";
import "../css/foundationClass.css";
import SearchBar from "../components/FoundationClassSearchBar";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import FcCard from "../components/FcCard";
import AddSoulModal from "../components/AddSoulModal";

function FoundationClass(props) {
  const showModal = () => {
    document.querySelector(".addSoulModal").style.display = "flex";
  };
  return (
    <div className="foundationClassContainer">
      <Header {...props} page="Foundation Class" />
      <SearchBar {...props} showModal={showModal} />
      <div className="FcCardContainer">
        {props.soulsWon.map((soul, i) => (
          <FcCard key={i} {...soul} />
        ))}
      </div>
      <Navbar page="foundationClass" />
      <SideNav page="foundationClass" {...props} />
      <AddSoulModal />
    </div>
  );
}

export default FoundationClass;
