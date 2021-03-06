import React, { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import SideNav from "../components/SideNav";
import SoulCard from "../components/SoulCard";
import SearchBar from "../components/SoulsWonSearchBar";
import AddSoulModal from "../components/AddSoulModal";
import moment from "moment";
import "../css/soulsWon.css";
import "../css/soulCard.css";
import "../css/searchBar.css";
import Loader from "../components/Loader";
import OfflineError from "../components/OfflineError";

function SoulsWon(props) {
  const [selectedTab, setSelectedTab] = useState("evangelism");
  const [month, setMonth] = useState("all");
  const [journey, setJourney] = useState("");
  const [searchValue, setSetSearchValue] = useState("");

  // all souls
  const allSouls = () => {
    if (props.soulsWon && props.accountType && props.accountType === "member") {
      return props.soulsWon.filter((soul) => soul.wonBy.id === props.id);
    } else {
      return props.soulsWon && props.soulsWon;
    }
  };

  // displayed souls
  const displayedSouls = () => {
    // if a month is selected and a journey is selected
    if (props.soulsWon && month !== "all" && journey !== "") {
      return allSouls().filter(
        (soul) =>
          soul.wonThrough === selectedTab &&
          soul.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          moment(soul.createdAt.toDate()).month() === eval(month) &&
          soul.journeyClass[journey] === true
      );
    }
    // if a month is selected and no journey is selected
    else if (props.soulsWon && month !== "all" && journey === "") {
      return allSouls().filter(
        (soul) =>
          soul.wonThrough === selectedTab &&
          soul.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          moment(soul.createdAt.toDate()).month() === eval(month)
      );
    }
    //  if no month is selected and a journey is selected
    else if (props.soulsWon && month === "all" && journey !== "") {
      return allSouls().filter(
        (soul) =>
          soul.wonThrough === selectedTab &&
          soul.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          soul.journeyClass[journey] === true
      );
    }
    //  if no month is selected and no journey is selected
    else {
      return (
        props.soulsWon &&
        allSouls().filter(
          (soul) =>
            soul.wonThrough === selectedTab &&
            soul.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  };

  console.log(displayedSouls());
  // souls won
  const soulsWon =
    props.soulsWon &&
    displayedSouls()
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      .map((soul, i) => <SoulCard key={i} {...soul} store={props} />);

  const changeTab = (value) => {
    setSelectedTab(value);
    setMonth("all");
  };
  const showModal = () => {
    document.querySelector(".addSoulModal").style.display = "flex";
  };

  return (
    <>
      <div className="soulsWonContainer">
        <div className=" row section">
          <div className="mobileContainer col-12">
            <Header {...props} page="Souls Won" />
          </div>
          <div className="mobileContainer col-lg-2">
            <SideNav page="soulsWon" {...props} />
          </div>
          <div
            className="mobileContainer col-lg-10 pr-lg-0 scrollContainer"
            style={{ display: props.soulsWon && "none" }}
          >
            {/* loading component */}
            {!props.soulsWon && navigator.onLine && (
              <div className="loaderContainer">
                <Loader />
              </div>
            )}
            {/* offline component */}
            {!navigator.onLine && !props.soulsWon && <OfflineError />}
          </div>
          <div
            className="mobileContainer col-lg-10 pr-lg-0 scrollContainer"
            style={{ display: !props.soulsWon && "none" }}
          >
            <SearchBar
              {...props}
              showModal={showModal}
              changeTab={changeTab}
              selectedTab={selectedTab}
              totalSouls={props.soulsWon && displayedSouls().length}
              selectedMonth={month}
              changeMonth={(value) => setMonth(value)}
              selectedJourney={journey}
              setJourney={(value) => setJourney(value)}
              searchValue={searchValue}
              changeSearchValue={(value) => setSetSearchValue(value)}
            />
            <div className="soulsWonCardContainer row">
              {props.soulsWon && displayedSouls().length > 0 ? (
                soulsWon
              ) : (
                <div className="emptyDisplayText">no soul found...</div>
              )}
            </div>
          </div>
          <div className="mobileContainer col-12">
            <AddSoulModal
              {...props}
              changeTab={changeTab}
              selectedTab={selectedTab}
            />
          </div>
          <div className="mobileContainer col-12">
            <Navbar page="soulsWon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SoulsWon;
