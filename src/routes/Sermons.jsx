import React, { useState } from "react";
import Header from "../components/Header";
import "../css/testimonies.css";
import "../css/sermon.css";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import SermonCard from "../components/SermonCard";
import SearchBar from "../components/SermonsSearchBar";
import Loader from "../components/Loader";
import { MdAdd } from "react-icons/md";
import SermonForm from "../components/SermonForm";
import OfflineError from "../components/OfflineError";

function Sermons(props) {
  const [displayForm, setDisplayForm] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const sermons =
    props.sermons &&
    props.sermons.filter((sermon) =>
      sermon.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div className="testimoniesPageContainer">
      <div className=" row section">
        {/* Header */}
        <div className="mobileContainer col-12">
          <Header {...props} page="Sermons" />
        </div>

        {/* Sidenav */}
        <div className="mobileContainer col-lg-2">
          <SideNav page="sermons" {...props} />
        </div>

        {/* loader */}
        <div
          className="mobileContainer col-lg-10"
          style={{
            display: props.sermons && "none",
          }}
        >
          {/* loading message */}
          {navigator.onLine && !props.sermons && (
            <div className="loaderContainer">
              <Loader />
            </div>
          )}
          {/* offline message */}
          {!navigator.onLine && !props.sermons && <OfflineError />}
        </div>

        {/* main content */}
        <div
          className="mobileContainer col-lg-10"
          style={{
            display: !props.sermons && "none",
          }}
        >
          {/* Top Menu */}
          <SearchBar
            {...props}
            changeSearchValue={(value) => setSearchValue(value)}
            displayForm={() => setDisplayForm(true)}
          />
          {/* Displayed Sermons */}
          <div className="soulsWonCardContainer sermonCardContainer row no-gutters">
            {props.sermons && sermons.length > 0 ? (
              sermons
                .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                .map((sermon, i) => (
                  <SermonCard key={i} {...sermon} store={props} />
                ))
            ) : (
              <div className="emptyDisplayText">no sermon found...</div>
            )}
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="mobileContainer col-12">
          <Navbar page="sermons" />
        </div>
      </div>

      {/* Sermon Form */}
      <div
        className="mobileContainer col-12"
        style={{ display: !displayForm && "none" }}
      >
        <SermonForm {...props} closeModal={() => setDisplayForm(false)} />
      </div>

      {/* Mobile Sermon Add Button */}
      <div
        className="addTestimonyBtnMobile"
        onClick={() => setDisplayForm(true)}
        style={{
          display:
            (props.accountType &&
              props.accountType.toLowerCase() === "member" &&
              "none") ||
            (props.accountType &&
              props.accountType.toLowerCase() === "soul establishment" &&
              "none") ||
            (!props.accountType && "none"),
        }}
      >
        <MdAdd />
      </div>
    </div>
  );
}

export default Sermons;
