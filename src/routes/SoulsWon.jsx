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
  const [searchValue, setSetSearchValue] = useState("");
  const allSouls = () => {
    if (props.soulsWon && props.accountType && props.accountType === "member") {
      return props.soulsWon.filter((soul) => soul.wonBy.id === props.id);
    } else {
      return props.soulsWon && props.soulsWon;
    }
  };
  const displayedSouls =
    props.soulsWon && month !== "all"
      ? allSouls().filter(
          (soul) =>
            soul.wonThrough === selectedTab &&
            soul.name.toLowerCase().includes(searchValue.toLowerCase()) &&
            moment(soul.createdAt.toDate()).month() === eval(month)
        )
      : props.soulsWon &&
        allSouls().filter(
          (soul) =>
            soul.wonThrough === selectedTab &&
            soul.name.toLowerCase().includes(searchValue.toLowerCase())
        );

  const soulsWon =
    props.soulsWon &&
    displayedSouls
      .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      .map((soul, i) => <SoulCard key={i} {...soul} store={props} />);

  const totalSoulsWon = props.soulsWon && displayedSouls.length;

  const changeTab = (value) => {
    setSelectedTab(value);
    setMonth("all");
  };
  const changeMonth = (value) => {
    setMonth(value);
  };
  const changeSearchValue = (value) => {
    setSetSearchValue(value);
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
              totalSouls={totalSoulsWon}
              selectedMonth={month}
              changeMonth={changeMonth}
              searchValue={searchValue}
              changeSearchValue={changeSearchValue}
            />
            <div className="soulsWonCardContainer row">
              {props.soulsWon && displayedSouls.length > 0 ? (
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
