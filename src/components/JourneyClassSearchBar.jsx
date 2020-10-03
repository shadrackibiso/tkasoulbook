import React from "react";
import { MdSearch, MdPersonAdd } from "react-icons/md";

function JourneyClassSearchBar(props) {
  return (
    <div className="searchBarContainer">
      <div
        className="tabMenu"
        style={{
          display:
            props.accountType &&
            props.accountType.toLowerCase() === "member" &&
            "none",
        }}
      >
        <span
          className={
            props.selectedTab === "evangelism"
              ? "tabOption selectedTabOption"
              : "tabOption"
          }
          onClick={() => props.changeTab("evangelism")}
        >
          Evangelism
        </span>
        <span
          className={
            props.selectedTab === "altarCall"
              ? "tabOption selectedTabOption"
              : "tabOption"
          }
          onClick={() => props.changeTab("altarCall")}
        >
          Altar call
        </span>
        <span
          className={
            props.selectedTab === "firstTimer"
              ? "tabOption selectedTabOption"
              : "tabOption"
          }
          onClick={() => props.changeTab("firstTimer")}
        >
          First Timers
        </span>
      </div>
      <div className="searchBar">
        <input
          type="text"
          name="soulsWonSearchBar"
          placeholder="search..."
          onChange={(e) => props.changeSearchValue(e.target.value)}
        />
        <MdSearch />
      </div>
      <div className="sortMenuContainer">
        <div
          className="sortMenu sortMenuMobile"
          style={{
            display:
              props.accountType &&
              props.accountType.toLowerCase() === "member" &&
              "none",
          }}
        >
          <select
            name="tabMenuMobile"
            className="tabMenuMobile"
            value={props.selectedTab}
            onChange={(e) => props.changeTab(e.target.value)}
          >
            <option value="evangelism">Evangelism</option>
            <option value="altarCall">Altar call</option>
            <option value="firstTimer">first Timers</option>
          </select>
        </div>
        {/* month */}
        <div className="sortMenu">
          {/* <span>Month</span> */}
          <select
            name="sortType"
            className="monthOptions"
            value={props.selectedMonth}
            onChange={(e) => props.changeMonth(e.target.value)}
          >
            <option value="all">Month</option>
            <option value="0">Jan</option>
            <option value="1">Feb</option>
            <option value="2">Mar</option>
            <option value="3">Apr</option>
            <option value="4">May</option>
            <option value="5">Jun</option>
            <option value="6">Jul</option>
            <option value="7">Aug</option>
            <option value="8">Sep</option>
            <option value="9">Oct</option>
            <option value="10">Nov</option>
            <option value="11">Dec</option>
          </select>
        </div>
        {/* journey */}
        <div className="sortMenu">
          {/* <span>Month</span> */}
          <select
            name="sortType"
            className="monthOptions"
            value={props.selectedJourney}
            onChange={(e) => props.setJourney(e.target.value)}
          >
            <option value="all">Journey</option>
            <option value="journey101">Journey 101</option>
            <option value="journey201">Journey 201</option>
            <option value="journey301">Journey 301</option>
            <option value="journey401">Journey 401</option>
          </select>
        </div>
        <div className="totalSoulsWonContainer sortMenu">
          <span className="totalSoulsWonText">Total </span>
          <span className="totalSoulsWonCount">{props.totalSouls}</span>
        </div>
      </div>
    </div>
  );
}

export default JourneyClassSearchBar;
